import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PatientComponent } from "./patient.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../general/general.module";
import { PatientFormComponent } from "./patient.form.componet";

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'patients',
            component: PatientComponent
        }]
    }
]

@NgModule(
    {
        imports: [CommonModule,
            FormsModule,
            SharedModule,
            RouterModule.forChild(routes)
        ],
        declarations: [PatientComponent, PatientFormComponent],
        entryComponents: [PatientFormComponent]
    }
)
export class PatientModule { }