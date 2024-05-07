import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-icon/index.js';
import '../wui-avatar/index.js';
import '../../layout/wui-flex/index.js';
export declare class WuiPreviewItem extends LitElement {
    static styles: import("lit").CSSResult[];
    text: string;
    address: string;
    imageSrc?: string;
    isAddress: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private imageTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-preview-item': WuiPreviewItem;
    }
}
