import { getWeb3Modal } from '@web3modal/scaffold-vue';
import { Web3Modal } from '../src/client.js';
import { ConstantsUtil } from '@web3modal/scaffold-utils';
let modal = undefined;
export function createWeb3Modal(options) {
    if (!modal) {
        modal = new Web3Modal({
            ...options,
            _sdkVersion: `vue-wagmi-${ConstantsUtil.VERSION}`
        });
        getWeb3Modal(modal);
    }
    return modal;
}
export { useWeb3ModalTheme, useWeb3Modal, useWeb3ModalState, useWeb3ModalEvents, useWalletInfo } from '@web3modal/scaffold-vue';
export { defaultWagmiConfig } from '../src/utils/defaultWagmiCoreConfig.js';
//# sourceMappingURL=vue.js.map