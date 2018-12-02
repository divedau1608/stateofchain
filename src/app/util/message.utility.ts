

//declare var swal: any;
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

/**
 * 
 */
export class MessageUtitlity {

    /**
     * 
     * @param confirmCallBack 
     * @param cancelCallBack 
     */
    public static confirmMessage(confirmMsg: string, confirmCallBack?: () => void, cancelCallBack?: () => void) {
       
        swal({
            title: 'Information',
            text: confirmMsg,
            icon: 'warning',
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: false,
                    className: "btn btn-success",
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true
                }
            },
            closeOnClickOutside: false,
        }).then(function () {
            if (confirmCallBack != null) {
                confirmCallBack();
            }

        }, function (dismiss) {
            if (cancelCallBack != null) {
                cancelCallBack();
            }
        })
    }

    /**
     * 
     * @param title 
     */
    public static showDialogInformation(title) {
        swal({
            title: title,        
            buttons: {               
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-success",
                    closeModal: true
                }
            },
            closeOnEsc: true,
        });
    }

    /**
    * 
    * @param title 
    */
    public static showDialogInformationHtml(title, content) {
        swal({
            title: title,
            buttons: {               
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-success",
                    closeModal: true
                }
            },
            text: content,           
        });
    }

    /**
     * 
     */
    public static showErrorServer() {
        swal({
            title: "Server is error.",            
            buttons: {               
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-success",
                    closeModal: true
                }
            },
        });
    }

}