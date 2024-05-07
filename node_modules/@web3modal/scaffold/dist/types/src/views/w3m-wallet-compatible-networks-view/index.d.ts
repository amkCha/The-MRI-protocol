import { LitElement } from 'lit';
export declare class W3mWalletCompatibleNetworksView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private preferredAccountType;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    networkTemplate(): import("lit-html").TemplateResult<1>[] | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-wallet-compatible-networks-view': W3mWalletCompatibleNetworksView;
    }
}
