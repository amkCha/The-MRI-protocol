"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchInvokerCoder = void 0;
const readContract_js_1 = require("../../../../actions/public/readContract.js");
const encodeAbiParameters_js_1 = require("../../../../utils/abi/encodeAbiParameters.js");
const encodePacked_js_1 = require("../../../../utils/abi/encodePacked.js");
const concat_js_1 = require("../../../../utils/data/concat.js");
const size_js_1 = require("../../../../utils/data/size.js");
const abis_js_1 = require("../../constants/abis.js");
const defineInvokerCoder_js_1 = require("./defineInvokerCoder.js");
function batchInvokerCoder() {
    return (0, defineInvokerCoder_js_1.defineInvokerCoder)({
        async toExecData(args, { authority, client, invokerAddress }) {
            const nonce = await (0, readContract_js_1.readContract)(client, {
                abi: abis_js_1.invokerAbi,
                address: invokerAddress,
                functionName: 'nextNonce',
                args: [authority],
            });
            const calls = (0, concat_js_1.concat)(args.map(({ data = '0x', to, value = 0n }) => (0, encodePacked_js_1.encodePacked)(['uint8', 'address', 'uint256', 'uint256', 'bytes'], [2, to, value, BigInt((0, size_js_1.size)(data)), data])));
            return (0, encodeAbiParameters_js_1.encodeAbiParameters)([{ type: 'uint256' }, { type: 'bytes' }], [nonce, calls]);
        },
    });
}
exports.batchInvokerCoder = batchInvokerCoder;
//# sourceMappingURL=batchInvokerCoder.js.map