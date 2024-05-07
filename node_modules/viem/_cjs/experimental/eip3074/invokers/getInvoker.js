"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoker = void 0;
const getTransactionCount_js_1 = require("../../../actions/public/getTransactionCount.js");
const writeContract_js_1 = require("../../../actions/wallet/writeContract.js");
const accounts_js_1 = require("../../../utils/accounts.js");
const isAddressEqual_js_1 = require("../../../utils/address/isAddressEqual.js");
const getAction_js_1 = require("../../../utils/getAction.js");
const keccak256_js_1 = require("../../../utils/hash/keccak256.js");
const parseSignature_js_1 = require("../../../utils/signature/parseSignature.js");
const signAuthMessage_js_1 = require("../actions/signAuthMessage.js");
const abis_js_1 = require("../constants/abis.js");
function getInvoker(parameters) {
    const { address, client, coder } = parameters;
    return {
        address,
        async execute(parameters) {
            const { executor: executor_ = client.account, authority: authority_, args, chain = client.chain, signature, } = parameters;
            const authority = (0, accounts_js_1.parseAccount)(authority_);
            const executor = (0, accounts_js_1.parseAccount)(executor_);
            const execData = await coder.toExecData(args, {
                authority: authority.address,
                client,
                invokerAddress: address,
            });
            const { r, s, yParity } = (0, parseSignature_js_1.parseSignature)(signature);
            return (0, getAction_js_1.getAction)(client, writeContract_js_1.writeContract, 'writeContract')({
                abi: abis_js_1.invokerAbi,
                address,
                account: executor,
                chain,
                functionName: 'execute',
                args: [execData, { signer: authority.address, r, s, yParity }],
            });
        },
        async sign(parameters) {
            const { args, authority, executor: executor_ = client.account, chain = client.chain, } = parameters;
            const executor = (0, accounts_js_1.parseAccount)(executor_);
            const [execData, nonce] = await Promise.all([
                await coder.toExecData(args, {
                    authority: authority.address,
                    client,
                    invokerAddress: address,
                }),
                (0, getAction_js_1.getAction)(client, getTransactionCount_js_1.getTransactionCount, 'getTransactionCount')({
                    address: authority.address,
                    blockTag: 'pending',
                }),
            ]);
            const signature = await (0, getAction_js_1.getAction)(client, signAuthMessage_js_1.signAuthMessage, 'signAuthMessage')({
                account: authority,
                chain,
                commit: (0, keccak256_js_1.keccak256)(execData),
                invokerAddress: address,
                nonce: (0, isAddressEqual_js_1.isAddressEqual)(authority.address, executor.address)
                    ? nonce + 1
                    : nonce,
            });
            return signature;
        },
    };
}
exports.getInvoker = getInvoker;
//# sourceMappingURL=getInvoker.js.map