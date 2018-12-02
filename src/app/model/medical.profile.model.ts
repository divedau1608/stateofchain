import { RecipienceItem } from "./recipence.item.model";

export class MedicalProfile {
    patientAddress: string;
    patientDoctor: string;
    conclusion: String;
    dateOfIssue: Date;
    recipienceItems: RecipienceItem[];
}