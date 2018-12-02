import { Component, OnInit, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from "@angular/core";
import { FormDirective } from "../../general/form.directive";
import { BaseService } from "../../services/base.services";
import { PatientFormComponent } from "./patient.form.componet";
import { Patient } from "../../model/patient.model";
import { environment } from "../../../environments/environment";

@Component(
    {
        templateUrl: 'patient.component.html'
    }
)
export class PatientComponent implements OnInit
{ public componentRef: any;

    formComponent: any;
    isShow = 'hide';
    patients : Patient[];

    @ViewChild(FormDirective) formHost: FormDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private service: BaseService,
        private cdr: ChangeDetectorRef) {
        this.formComponent = PatientFormComponent;
    }
    ngOnInit()
    {
        this.getPatients();
    }

    public issuePatientProfile()
    {
        this.loadComponent('show');
    }

    loadComponent(isShow) {
        try {
            const componentFactory = this.componentFactoryResolver.
                resolveComponentFactory(this.formComponent);

            const viewContainerRef = this.formHost.viewContainerRef;
            viewContainerRef.clear();

            this.componentRef = viewContainerRef.createComponent(componentFactory);
            // set parameter for component to load form
            this.componentRef.instance.isShow = isShow;

            this.isShow = 'show'
            this.componentRef.instance.onCloseForm.subscribe(x => {
                this.isShow = 'hide';
            });

            this.componentRef.instance.onSubmitForm.subscribe(() => {
                this.isShow = 'hide';
                this.getPatients();
                //this.showListForm();
            });
        } catch (error) {
            console.log(error);
        }
    }

    getPatients()
    {
        this.patients = [];
        let tokens = this.service.getOwnedToken(environment.pKey);

        tokens.then(res => {
            if (res != null) {
                res.forEach(element => {

                    if (element.name.startsWith(environment.prefixPT)) {
                        let detail = this.service.getToken('smac', element.name);

                        detail.then(detailTK => {

                            if (detailTK.metas.length > 0) {
                                let val = detailTK.metas[0].value;
                                this.patients.push(JSON.parse(val));
                            }
                        });

                        this.cdr.detectChanges();
                    }
                });
            }
        });
    }
}