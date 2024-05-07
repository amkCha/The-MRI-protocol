import { LitElement } from 'lit';
export declare class WuiInputAmount extends LitElement {
    static styles: import("lit").CSSResult[];
    inputElementRef: import("lit-html/directives/ref.js").Ref<HTMLInputElement>;
    disabled: boolean;
    value: string;
    placeholder: string;
    render(): import("lit-html").TemplateResult<1>;
    private dispatchInputChangeEvent;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-input-amount': WuiInputAmount;
    }
}
