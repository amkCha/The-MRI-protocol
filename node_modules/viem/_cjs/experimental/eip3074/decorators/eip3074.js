"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletActionsEip3074 = void 0;
const signAuthMessage_js_1 = require("../actions/signAuthMessage.js");
function walletActionsEip3074() {
    return (client) => {
        return {
            signAuthMessage: (parameters) => (0, signAuthMessage_js_1.signAuthMessage)(client, parameters),
        };
    };
}
exports.walletActionsEip3074 = walletActionsEip3074;
//# sourceMappingURL=eip3074.js.map