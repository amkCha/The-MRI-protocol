import { getAddress, } from '../../../utils/address/getAddress.js';
import { isAddressEqual, } from '../../../utils/address/isAddressEqual.js';
import { recoverAuthMessageAddress, } from './recoverAuthMessageAddress.js';
/**
 * Verify that a auth message was signed by the provided address.
 *
 * @param parameters - {@link VerifyAuthMessageParameters}
 * @returns Whether or not the signature is valid. {@link VerifyAuthMessageReturnType}
 */
export async function verifyAuthMessage({ address, ...parameters }) {
    return isAddressEqual(getAddress(address), await recoverAuthMessageAddress(parameters));
}
//# sourceMappingURL=verifyAuthMessage.js.map