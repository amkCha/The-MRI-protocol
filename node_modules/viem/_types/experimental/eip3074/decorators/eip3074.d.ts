import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { Account } from '../../../types/account.js';
import type { Chain } from '../../../types/chain.js';
import { type SignAuthMessageParameters, type SignAuthMessageReturnType } from '../actions/signAuthMessage.js';
export type WalletActionsEip3074<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = {
    signAuthMessage: <chainOverride extends Chain | undefined = undefined, accountOverride extends Account | undefined = undefined>(parameters: SignAuthMessageParameters<chain, account, chainOverride, accountOverride>) => Promise<SignAuthMessageReturnType>;
};
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
export declare function walletActionsEip3074(): <transport extends Transport, chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined>(client: Client<transport, chain, account>) => WalletActionsEip3074<chain, account>;
//# sourceMappingURL=eip3074.d.ts.map