import { getTransactionCount, } from '../../../actions/public/getTransactionCount.js';
import { writeContract, } from '../../../actions/wallet/writeContract.js';
import { parseAccount } from '../../../utils/accounts.js';
import { isAddressEqual, } from '../../../utils/address/isAddressEqual.js';
import { getAction } from '../../../utils/getAction.js';
import { keccak256, } from '../../../utils/hash/keccak256.js';
import { parseSignature, } from '../../../utils/signature/parseSignature.js';
import { signAuthMessage, } from '../actions/signAuthMessage.js';
import { invokerAbi } from '../constants/abis.js';
export function getInvoker(parameters) {
    const { address, client, coder } = parameters;
    return {
        address,
        async execute(parameters) {
            const { executor: executor_ = client.account, authority: authority_, args, chain = client.chain, signature, } = parameters;
            const authority = parseAccount(authority_);
            const executor = parseAccount(executor_);
            const execData = await coder.toExecData(args, {
                authority: authority.address,
                client,
                invokerAddress: address,
            });
            const { r, s, yParity } = parseSignature(signature);
            return getAction(client, writeContract, 'writeContract')({
                abi: invokerAbi,
                address,
                account: executor,
                chain,
                functionName: 'execute',
                args: [execData, { signer: authority.address, r, s, yParity }],
            });
        },
        async sign(parameters) {
            const { args, authority, executor: executor_ = client.account, chain = client.chain, } = parameters;
            const executor = parseAccount(executor_);
            const [execData, nonce] = await Promise.all([
                await coder.toExecData(args, {
                    authority: authority.address,
                    client,
                    invokerAddress: address,
                }),
                getAction(client, getTransactionCount, 'getTransactionCount')({
                    address: authority.address,
                    blockTag: 'pending',
                }),
            ]);
            const signature = await getAction(client, signAuthMessage, 'signAuthMessage')({
                account: authority,
                chain,
                commit: keccak256(execData),
                invokerAddress: address,
                nonce: isAddressEqual(authority.address, executor.address)
                    ? nonce + 1
                    : nonce,
            });
            return signature;
        },
    };
}
//# sourceMappingURL=getInvoker.js.map