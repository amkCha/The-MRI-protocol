"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApprovalBasedPaymasterInput = void 0;
const index_js_1 = require("../../../utils/index.js");
const abis_js_1 = require("../../constants/abis.js");
function getApprovalBasedPaymasterInput(parameters) {
    const { innerInput, minAllowance, token } = parameters;
    const innerInputHex = typeof innerInput === 'string' ? innerInput : (0, index_js_1.bytesToHex)(innerInput);
    return (0, index_js_1.encodeFunctionData)({
        abi: abis_js_1.paymasterAbi,
        functionName: 'approvalBased',
        args: [token, minAllowance, innerInputHex],
    });
}
exports.getApprovalBasedPaymasterInput = getApprovalBasedPaymasterInput;
//# sourceMappingURL=getApprovalBasedPaymasterInput.js.map