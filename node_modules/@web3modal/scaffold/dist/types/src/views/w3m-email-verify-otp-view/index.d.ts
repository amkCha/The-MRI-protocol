import { W3mEmailOtpWidget } from '../../utils/w3m-email-otp-widget/index.js';
import type { OnOtpSubmitFn, OnOtpResendFn } from '../../utils/w3m-email-otp-widget/index.js';
export declare class W3mEmailVerifyOtpView extends W3mEmailOtpWidget {
    private unsubscribe;
    private smartAccountDeployed;
    constructor();
    onOtpSubmit: OnOtpSubmitFn;
    onOtpResend: OnOtpResendFn;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-email-verify-otp-view': W3mEmailVerifyOtpView;
    }
}
