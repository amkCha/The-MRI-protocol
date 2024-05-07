"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthMessage = void 0;
const getAddress_js_1 = require("../../../utils/address/getAddress.js");
const isAddressEqual_js_1 = require("../../../utils/address/isAddressEqual.js");
const recoverAuthMessageAddress_js_1 = require("./recoverAuthMessageAddress.js");
async function verifyAuthMessage({ address, ...parameters }) {
    return (0, isAddressEqual_js_1.isAddressEqual)((0, getAddress_js_1.getAddress)(address), await (0, recoverAuthMessageAddress_js_1.recoverAuthMessageAddress)(parameters));
}
exports.verifyAuthMessage = verifyAuthMessage;
//# sourceMappingURL=verifyAuthMessage.js.map