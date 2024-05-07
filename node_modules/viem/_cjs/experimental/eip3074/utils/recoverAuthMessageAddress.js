"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverAuthMessageAddress = void 0;
const keccak256_js_1 = require("../../../utils/hash/keccak256.js");
const recoverAddress_js_1 = require("../../../utils/signature/recoverAddress.js");
const toAuthMessage_js_1 = require("./toAuthMessage.js");
async function recoverAuthMessageAddress({ signature, ...parameters }) {
    const hash = (0, keccak256_js_1.keccak256)((0, toAuthMessage_js_1.toAuthMessage)(parameters));
    return (0, recoverAddress_js_1.recoverAddress)({ hash, signature });
}
exports.recoverAuthMessageAddress = recoverAuthMessageAddress;
//# sourceMappingURL=recoverAuthMessageAddress.js.map