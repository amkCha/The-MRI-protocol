import type { Address } from 'abitype';
import type { Client } from '../../../../clients/createClient.js';
import type { Hex } from '../../../../types/misc.js';
export type InvokerCoder<args = unknown> = {
    toExecData: (args: args, options: {
        authority: Address;
        client: Client;
        invokerAddress: Hex;
    }) => Promise<Hex>;
};
export type DefineInvokerCoderParameters<args = unknown> = InvokerCoder<args>;
export type DefineInvokerCoderReturnType<args = unknown> = InvokerCoder<args>;
export declare function defineInvokerCoder<args>(parameters: DefineInvokerCoderParameters<args>): DefineInvokerCoderReturnType<args>;
//# sourceMappingURL=defineInvokerCoder.d.ts.map