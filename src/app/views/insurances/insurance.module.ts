import { Routes, RouterModule } from "@angular/router";
import { InsuranceComponent } from "./insurance.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'insurances',
                component: InsuranceComponent
            }
        ]
    }
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [InsuranceComponent]
})
export class InsuranceModule { }