import { readContract } from '../../../../actions/public/readContract.js';
import { encodeAbiParameters } from '../../../../utils/abi/encodeAbiParameters.js';
import { encodePacked } from '../../../../utils/abi/encodePacked.js';
import { concat } from '../../../../utils/data/concat.js';
import { size } from '../../../../utils/data/size.js';
import { invokerAbi } from '../../constants/abis.js';
import { defineInvokerCoder } from './defineInvokerCoder.js';
export function batchInvokerCoder() {
    return defineInvokerCoder({
        async toExecData(args, { authority, client, invokerAddress }) {
            const nonce = await readContract(client, {
                abi: invokerAbi,
                address: invokerAddress,
                functionName: 'nextNonce',
                args: [authority],
            });
            const calls = concat(args.map(({ data = '0x', to, value = 0n }) => encodePacked(['uint8', 'address', 'uint256', 'uint256', 'bytes'], [2, to, value, BigInt(size(data)), data])));
            return encodeAbiParameters([{ type: 'uint256' }, { type: 'bytes' }], [nonce, calls]);
        },
    });
}
//# sourceMappingURL=batchInvokerCoder.js.map