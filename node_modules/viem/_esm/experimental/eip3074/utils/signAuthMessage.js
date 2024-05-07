import { sign } from '../../../accounts/utils/sign.js';
import { keccak256 } from '../../../utils/hash/keccak256.js';
import { serializeSignature, } from '../../../utils/signature/serializeSignature.js';
import { toAuthMessage, } from './toAuthMessage.js';
/**
 * Computes a EIP-3074 authorization signature in format: `keccak256(MAGIC || chainId || nonce || invokerAddress || commit))`.
 */
export async function signAuthMessage(parameters) {
    const { privateKey } = parameters;
    const signature = await sign({
        hash: keccak256(toAuthMessage(parameters)),
        privateKey,
    });
    return serializeSignature(signature);
}
//# sourceMappingURL=signAuthMessage.js.map