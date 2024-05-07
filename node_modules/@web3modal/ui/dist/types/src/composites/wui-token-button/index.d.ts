import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../../components/wui-image/index.js';
import '../wui-icon-box/index.js';
export declare class WuiTokenButton extends LitElement {
    static styles: import("lit").CSSResult[];
    imageSrc?: string;
    text: string;
    render(): import("lit-html").TemplateResult<1>;
    private tokenTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-token-button': WuiTokenButton;
    }
}
