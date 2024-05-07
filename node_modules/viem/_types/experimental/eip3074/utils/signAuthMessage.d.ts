import { type SignErrorType } from '../../../accounts/utils/sign.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Hex } from '../../../types/misc.js';
import { type SerializeSignatureErrorType } from '../../../utils/signature/serializeSignature.js';
import { type ToAuthMessageErrorType, type ToAuthMessageParameters } from './toAuthMessage.js';
export type SignAuthMessageParameters = ToAuthMessageParameters & {
    /** The private key to sign with. */
    privateKey: Hex;
};
export type SignAuthMessageReturnType = Hex;
export type SignAuthMessageErrorType = SignErrorType | ToAuthMessageErrorType | SerializeSignatureErrorType | ErrorType;
/**
 * Computes a EIP-3074 authorization signature in format: `keccak256(MAGIC || chainId || nonce || invokerAddress || commit))`.
 */
export declare function signAuthMessage(parameters: SignAuthMessageParameters): Promise<SignAuthMessageReturnType>;
//# sourceMappingURL=signAuthMessage.d.ts.map