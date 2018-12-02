import { Routes, RouterModule } from "@angular/router";
import { DoctorComponent } from "./doctor.component";
import { NgModule } from "@angular/core";
import { DoctorFormComponent } from "./doctor.form.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormDirective } from "../../general/form.directive";
import { SharedModule } from "../../general/general.module";
import { MedicialRecordComponent } from "./medicial.record.component";
import { MedicialRecordFormComponent } from "./medicial.record.form.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Doctors'
        },
        children: [
            {
                path: 'doctors',
                component: DoctorComponent,
                // data: {
                //     title: 'Doctors'
                // }
            },
            {
                path: 'medicialrecord',
                component: MedicialRecordComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        MedicialRecordComponent,
        MedicialRecordFormComponent,
        DoctorComponent,
        DoctorFormComponent],
    entryComponents: [DoctorFormComponent, MedicialRecordFormComponent],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class DoctorModule { }