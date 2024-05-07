"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAuthMessage = void 0;
const encodePacked_js_1 = require("../../../utils/abi/encodePacked.js");
const pad_js_1 = require("../../../utils/data/pad.js");
const toHex_js_1 = require("../../../utils/encoding/toHex.js");
function toAuthMessage({ chainId, commit, invokerAddress, nonce, }) {
    return (0, encodePacked_js_1.encodePacked)(['uint8', 'bytes32', 'uint256', 'bytes32', 'bytes32'], [
        0x04,
        (0, toHex_js_1.numberToHex)(chainId, { size: 32 }),
        BigInt(nonce),
        (0, pad_js_1.padHex)(invokerAddress, { size: 32 }),
        commit,
    ]);
}
exports.toAuthMessage = toAuthMessage;
//# sourceMappingURL=toAuthMessage.js.map