import { OnInit, Component } from "@angular/core";
import { Patient } from "../../model/patient.model";
import { BaseService } from "../../services/base.services";
import { Subject } from "rxjs";
import { MessageUtitlity } from "../../util/message.utility";
import { environment } from "../../../environments/environment";

@Component(
    {
        templateUrl: './patient.form.component.html'
    }
)
export class PatientFormComponent implements OnInit {
    patient: Patient = new Patient();

    isDisable = false;
    isShow = 'hide';
    onCloseForm = new Subject<any>();
    onSubmitForm = new Subject<any>();

    constructor(private service: BaseService) {

    }

    ngOnInit() {

    }

    onSubmit() {
        try {
            this.isDisable = true;

            let patient = this.patient;

            let data = JSON.stringify(patient);
            this.service.
                issueNonFungibleToken(environment.prefixPT, environment.prefixPT, 'PT', data).then(res => {
                    MessageUtitlity.showDialogInformation('Add new patient successful');
                    this.isShow = 'hide';
                    this.onSubmitForm.next();
                }).catch(err => {
                    this.isDisable = false;
                    MessageUtitlity.showDialogInformation('Add new patient unsuccessful');
                });;;

            // MessageUtitlity.showDialogInformation('Add new patient successful');
            // this.isShow = 'hide';
            // this.onCloseForm.next();
        } catch (error) {
            MessageUtitlity.showDialogInformation('Add new patient unsuccessful');
            this.isDisable = false;
        }
    }

    close() {
        this.isShow = 'hide';
        this.onCloseForm.next();
    }
}