import { NgModule } from "@angular/core";
import { FormDirective } from "./form.directive";

@NgModule(
    {
        declarations: [FormDirective],
        exports: [FormDirective]
    }
)
export class SharedModule{}