import { getTransactionCount } from '../../../actions/public/getTransactionCount.js';
import { AccountNotFoundError } from '../../../errors/account.js';
import { getAction } from '../../../utils/getAction.js';
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
export async function signAuthMessage(client, parameters) {
    const { account = client.account, chain = client.chain, commit, invokerAddress, } = parameters;
    if (!account)
        throw new AccountNotFoundError({
            docsPath: '/experimental/eip5792/signAuthMessage',
        });
    const nonce = await (() => {
        if (typeof parameters.nonce === 'number')
            return parameters.nonce;
        return getAction(client, getTransactionCount, 'getTransactionCount')({
            address: account.address,
            blockTag: 'pending',
        });
    })();
    return account.experimental_signAuthMessage({
        chainId: chain.id,
        commit,
        invokerAddress,
        nonce,
    });
}
//# sourceMappingURL=signAuthMessage.js.map