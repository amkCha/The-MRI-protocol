import type { Address } from 'abitype';
import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Account, DeriveAccount, LocalAccount } from '../../../types/account.js';
import type { Chain, GetChainParameter } from '../../../types/chain.js';
import type { Hash, Hex } from '../../../types/misc.js';
import type { IsUndefined } from '../../../types/utils.js';
type GetAccountParameter<account extends Account | undefined = Account | undefined, accountOverride extends Account | Address | undefined = Account | Address> = IsUndefined<account> extends true ? {
    account: accountOverride | LocalAccount;
} : account extends LocalAccount ? {
    account?: accountOverride | LocalAccount | undefined;
} : {
    account: accountOverride | LocalAccount;
};
type GetNonceParameter<account extends Account | Address | undefined> = account extends Address | Account ? {
    nonce?: number | undefined;
} : {
    nonce: number;
};
export type SignAuthMessageParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined, accountOverride extends Account | Address | undefined = Account | Address> = {
    commit: Hash;
    invokerAddress: Address;
} & GetAccountParameter<account, accountOverride> & GetChainParameter<chain, chainOverride> & GetNonceParameter<DeriveAccount<account, accountOverride>>;
export type SignAuthMessageReturnType = Hex;
export type SignAuthMessageErrorType = ErrorType;
/**
 * Calculates an [EIP-3074](https://eips.ethereum.org/EIPS/eip-3074) auth signature.
 *
 * With the calculated signature, you can:
 *  - pass it to an EIP-3074 compatible invoker contract,
 *  - use [`verifyAuthMessage`](/experimental/eip3074/verifyAuthMessage) to verify the signature,
 *  - use [`recoverAuthMessageAddress`](/experimental/eip3074/recoverAuthMessageAddress) to recover the signing address from a signature.
 *
 * @param client - Client to use
 * @param parameters - {@link SignAuthMessageParameters}
 * @returns The signed auth message. {@link SignAuthMessageReturnType}
 *
 * @example
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { signAuthMessage } from 'viem/experimental'
 *
 * const account = privateKeyToAccount('0x...')
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const signature = await signAuthMessage(client, {
 *   account,
 *   chainId: 1,
 *   commit: keccak256('0x1234'),
 *   invokerAddress: '0x0000000000000000000000000000000000000000',
 *   nonce: 69,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { signAuthMessage } from 'viem/experimental'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const signature = await signAuthMessage(client, {
 *   chainId: 1,
 *   commit: keccak256('0x1234'),
 *   invokerAddress: '0x0000000000000000000000000000000000000000',
 *   nonce: 69,
 * })
 */
export declare function signAuthMessage<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined, accountOverride extends Account | undefined = undefined>(client: Client<Transport, chain, account>, parameters: SignAuthMessageParameters<chain, account, chainOverride, accountOverride>): Promise<SignAuthMessageReturnType>;
export {};
//# sourceMappingURL=signAuthMessage.d.ts.map