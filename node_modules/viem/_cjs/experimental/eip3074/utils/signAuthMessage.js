"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAuthMessage = void 0;
const sign_js_1 = require("../../../accounts/utils/sign.js");
const keccak256_js_1 = require("../../../utils/hash/keccak256.js");
const serializeSignature_js_1 = require("../../../utils/signature/serializeSignature.js");
const toAuthMessage_js_1 = require("./toAuthMessage.js");
async function signAuthMessage(parameters) {
    const { privateKey } = parameters;
    const signature = await (0, sign_js_1.sign)({
        hash: (0, keccak256_js_1.keccak256)((0, toAuthMessage_js_1.toAuthMessage)(parameters)),
        privateKey,
    });
    return (0, serializeSignature_js_1.serializeSignature)(signature);
}
exports.signAuthMessage = signAuthMessage;
//# sourceMappingURL=signAuthMessage.js.map