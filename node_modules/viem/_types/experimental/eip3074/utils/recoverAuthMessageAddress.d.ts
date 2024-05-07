import type { Address } from 'abitype';
import type { ByteArray, Hex, Signature } from '../../../types/misc.js';
import type { ErrorType } from '../../../errors/utils.js';
import { type RecoverAddressErrorType } from '../../../utils/signature/recoverAddress.js';
import { type ToAuthMessageParameters } from './toAuthMessage.js';
export type RecoverAuthMessageAddressParameters = ToAuthMessageParameters & {
    signature: Hex | ByteArray | Signature;
};
export type RecoverAuthMessageAddressReturnType = Address;
export type RecoverAuthMessageAddressErrorType = RecoverAddressErrorType | ErrorType;
export declare function recoverAuthMessageAddress({ signature, ...parameters }: RecoverAuthMessageAddressParameters): Promise<RecoverAuthMessageAddressReturnType>;
//# sourceMappingURL=recoverAuthMessageAddress.d.ts.map