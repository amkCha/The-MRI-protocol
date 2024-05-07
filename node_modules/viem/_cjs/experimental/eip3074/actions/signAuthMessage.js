"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAuthMessage = void 0;
const getTransactionCount_js_1 = require("../../../actions/public/getTransactionCount.js");
const account_js_1 = require("../../../errors/account.js");
const getAction_js_1 = require("../../../utils/getAction.js");
async function signAuthMessage(client, parameters) {
    const { account = client.account, chain = client.chain, commit, invokerAddress, } = parameters;
    if (!account)
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/experimental/eip5792/signAuthMessage',
        });
    const nonce = await (() => {
        if (typeof parameters.nonce === 'number')
            return parameters.nonce;
        return (0, getAction_js_1.getAction)(client, getTransactionCount_js_1.getTransactionCount, 'getTransactionCount')({
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
exports.signAuthMessage = signAuthMessage;
//# sourceMappingURL=signAuthMessage.js.map