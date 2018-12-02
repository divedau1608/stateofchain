import { OnInit, Component } from "@angular/core";
import { Doctor } from "../../model/doctor.model";
import { BaseService } from "../../services/base.services";
import { Subject } from "rxjs";
import { MessageUtitlity } from "../../util/message.utility";
import { environment } from "../../../environments/environment";

@Component(
    {
        templateUrl: 'doctor.form.component.html'
    }
)
export class DoctorFormComponent implements OnInit {
    doctor: Doctor = new Doctor();
    isDisable = false;
    isShow = 'hide';
    onCloseForm = new Subject<any>();
    onSubmitForm = new Subject<any>();

    constructor(private baseSerice: BaseService) {

    }

    ngOnInit() {

    }

    close() {
        this.isShow = 'hide';
        this.onCloseForm.next();
    }

    issue() {
        try {
            this.isDisable = true;
            let doctor = this.doctor;

            let data = JSON.stringify(doctor);

            this.baseSerice.
                issueNonFungibleToken(environment.pKey, environment.prefixDR, 'DR', data).then(res => {
                    MessageUtitlity.showDialogInformation('Add new doctor successful');
                    this.isShow = 'hide';
                    this.onSubmitForm.next();
                }).catch(err => {
                    this.isDisable = false;
                    MessageUtitlity.showDialogInformation('Add new doctor unsuccessful');
                });
        } catch (error) {
            alert(error.message);
        }
    }
}
