import { signAuthMessage, } from '../actions/signAuthMessage.js';
/**
 * A suite of EIP-3074 Wallet Actions.
 *
 * - Docs: https://viem.sh/experimental
 *
 * @example
 * import { createPublicClient, createWalletClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { walletActionsEip3074 } from 'viem/experimental'
 *
 * const walletClient = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * }).extend(walletActionsEip3074())
 *
 * const signature = await walletClient.signAuthMessage({...})
 */
export function walletActionsEip3074() {
    return (client) => {
        return {
            signAuthMessage: (parameters) => signAuthMessage(client, parameters),
        };
    };
}
//# sourceMappingURL=eip3074.js.map