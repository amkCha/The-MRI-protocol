import { http } from '@wagmi/core';
import { CoreHelperUtil } from '@web3modal/scaffold';
import { ConstantsUtil, PresetsUtil } from '@web3modal/scaffold-utils';
const RPC_URL = CoreHelperUtil.getBlockchainApiUrl();
export function walletConnectProvider({ projectId }) {
    return function provider(chain) {
        if (!PresetsUtil.WalletConnectRpcChainIds.includes(chain.id)) {
            return null;
        }
        const baseHttpUrl = `${RPC_URL}/v1/?chainId=${ConstantsUtil.EIP155}:${chain.id}&projectId=${projectId}`;
        return http(baseHttpUrl);
    };
}
//# sourceMappingURL=provider.js.map