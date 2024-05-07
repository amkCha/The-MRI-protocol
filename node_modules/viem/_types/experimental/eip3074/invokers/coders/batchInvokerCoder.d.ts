import type { Address } from 'abitype';
import type { Hex } from '../../../../types/misc.js';
type Calls = readonly {
    to: Address;
    data?: Hex | undefined;
    value?: bigint | undefined;
}[];
export type BatchInvokerArgs = Calls;
export declare function batchInvokerCoder(): import("./defineInvokerCoder.js").DefineInvokerCoderReturnType<Calls>;
export {};
//# sourceMappingURL=batchInvokerCoder.d.ts.map