import { LitElement } from 'lit';
import '../../layout/wui-flex/index.js';
export declare class WuiDetailsGroupItem extends LitElement {
    static styles: import("lit").CSSResult[];
    name: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-details-group-item': WuiDetailsGroupItem;
    }
}
