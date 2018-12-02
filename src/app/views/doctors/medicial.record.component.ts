import { Component, OnInit, ViewChild, ComponentFactoryResolver, ChangeDetectorRef } from "@angular/core";
import { FormDirective } from "../../general/form.directive";
import { BaseService } from "../../services/base.services";
import { MedicialRecordFormComponent } from "./medicial.record.form.component";
import { environment } from "../../../environments/environment";
import { MedicalProfile } from "../../model/medical.profile.model";

@Component(
    {
        templateUrl: 'medicial.record.component.html'
    }
)
export class MedicialRecordComponent implements OnInit {

    //Detail form component
    public componentRef: any;

    formComponent: any;
    isShow = 'hide';
    medicialRecords: MedicalProfile[];

    @ViewChild(FormDirective) formHost: FormDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private service: BaseService,
        private cdr: ChangeDetectorRef) {
        this.formComponent = MedicialRecordFormComponent;
    }

    ngOnInit(): void {
        this.getMedicialRecords();
    }

    issue() {
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

            this.isShow = 'show';
            this.componentRef.instance.onCloseForm.subscribe(x => {
                this.isShow = 'hide';
            });

            this.componentRef.instance.onSubmitForm.subscribe(() => {
                this.isShow = 'hide';
                this.getMedicialRecords();
                //this.showListForm();
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description:
     */
    getMedicialRecords() {
        this.medicialRecords = [];

        let tokens = this.service.getOwnedToken(environment.pKey);

        tokens.then(res => {
            if (res != null) {
                res.forEach(element => {

                    if (element.name.startsWith(environment.prefixMD)) {
                        let detail = this.service.getToken('smac', element.name);

                        detail.then(detailTK => {

                            if (detailTK.metas.length > 0) {
                                let val = detailTK.metas[0].value;
                                this.medicialRecords.push(JSON.parse(val));
                            }
                        });

                        this.cdr.detectChanges();
                    }
                });
            }
        });
    }
}