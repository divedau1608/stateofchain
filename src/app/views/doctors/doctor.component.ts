import { OnInit, Component, ComponentFactoryResolver, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { BaseService } from "../../services/base.services";
import { FormDirective } from '../../general/form.directive';
import { DoctorFormComponent } from "./doctor.form.component";
import { environment } from "../../../environments/environment";
import { Doctor } from "../../model/doctor.model";

@Component(
    {
        templateUrl: 'doctor.component.html'
    }
)
export class DoctorComponent implements OnInit, AfterViewInit {

    //Detail form component
    public componentRef: any;

    formComponent: any;
    isShow = 'hide';
    doctors: Doctor[] = [];

    @ViewChild(FormDirective) formHost: FormDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private service: BaseService, private def: ChangeDetectorRef) {
        this.formComponent = DoctorFormComponent;
    }

    ngAfterViewInit(): void {

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
                this.getDoctors();
                //this.showListForm();
            });

            // this.componentRef.instance.onEditForm.subscribe(item => {
            //     //this.editItem(item);
            // });
        } catch (error) {
            console.log(error);
        }
    }

    ngOnInit() {
        try {
            this.getDoctors();
        } catch (error) {
            console.log(error);
        }

    }

    register() {
        this.loadComponent('show');
    }

    getDoctors() {
        this.doctors = [];
        let tokens = this.service.getOwnedToken(environment.pKey);

        tokens.then(res => {
            if (res != null) {
                res.forEach(element => {

                    if (element.name.startsWith(environment.prefixDR)) {
                        let detail = this.service.getToken('smac', element.name);

                        detail.then(detailTK => {

                            if (detailTK.metas.length > 0) {
                                let val = detailTK.metas[0].value;
                                this.doctors.push(JSON.parse(val));
                            }
                        });

                        this.def.detectChanges();
                    }
                });
            }
        });
    }
}