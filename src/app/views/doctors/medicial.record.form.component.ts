import { Component } from "@angular/core";
import { MessageUtitlity } from "../../util/message.utility";
import { BaseService } from "../../services/base.services";
import { Subject } from "rxjs";
import { MedicalProfile } from "../../model/medical.profile.model";
import { environment } from "../../../environments/environment";

@Component({
    templateUrl: 'medicial.record.form.component.html'
})
export class MedicialRecordFormComponent {
    medicialRecord: MedicalProfile = new MedicalProfile();

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
            
            let medical = this.medicialRecord;
            let data = JSON.stringify(medical);

            this.baseSerice.issueNonFungibleToken(environment.pKey, environment.prefixMD, 'MR', data).then(res => {
                MessageUtitlity.showDialogInformation('Add new medicial record successful');
                this.isShow = 'hide';
                this.onSubmitForm.next();
            }).catch(err => {
                this.isDisable = false;
                MessageUtitlity.showDialogInformation('Add new medicial record unsuccessful');
            });;

            // MessageUtitlity.showDialogInformation('Add new medicial record successful');
            // this.isShow = 'hide';
            // this.onCloseForm.next();
        } catch (error) {
            MessageUtitlity.showDialogInformation('Add new medicial record unsuccessful');
        }
    }

    addRow() {
        if (this.medicialRecord.recipienceItems == null) {
            this.medicialRecord.recipienceItems = [];
        }

        this.medicialRecord.recipienceItems.push({ drugName: '', quantity: 0, drugUsingTime: '', useInDay: 0, drugId: '' })
    }

    delete(i) {
        this.medicialRecord.recipienceItems.splice(i, 1);
    }
}