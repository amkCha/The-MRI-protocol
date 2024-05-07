import { keccak256 } from '../../../utils/hash/keccak256.js';
import { recoverAddress, } from '../../../utils/signature/recoverAddress.js';
import { toAuthMessage } from './toAuthMessage.js';
export async function recoverAuthMessageAddress({ signature, ...parameters }) {
    const hash = keccak256(toAuthMessage(parameters));
    return recoverAddress({ hash, signature });
}
//# sourceMappingURL=recoverAuthMessageAddress.js.map