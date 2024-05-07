import type { Address } from 'abitype';
import { type GetTransactionCountErrorType } from '../../../actions/public/getTransactionCount.js';
import { type WriteContractErrorType } from '../../../actions/wallet/writeContract.js';
import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Account, LocalAccount } from '../../../types/account.js';
import type { Chain, GetChainParameter } from '../../../types/chain.js';
import type { Hex } from '../../../types/misc.js';
import type { IsUndefined } from '../../../types/utils.js';
import { type IsAddressEqualErrorType } from '../../../utils/address/isAddressEqual.js';
import { type Keccak256ErrorType } from '../../../utils/hash/keccak256.js';
import { type ParseSignatureErrorType } from '../../../utils/signature/parseSignature.js';
import { type SignAuthMessageErrorType } from '../actions/signAuthMessage.js';
import type { InvokerCoder } from './coders/defineInvokerCoder.js';
type GetExecutorParameter<TAccount extends Account | undefined = Account | undefined, TAccountOverride extends Account | Address | undefined = Account | Address, TRequired extends boolean = true> = IsUndefined<TAccount> extends true ? TRequired extends true ? {
    executor: TAccountOverride | Account | Address;
} : {
    executor?: TAccountOverride | Account | Address | undefined;
} : {
    executor?: TAccountOverride | Account | Address | undefined;
};
export type InvokerExecuteParameters<account extends Account | undefined = Account | undefined, chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined, args = unknown> = {
    args: args;
    authority: Account | Address;
    signature: Hex;
} & GetExecutorParameter<account> & GetChainParameter<chain, chainOverride>;
export type InvokerExecuteErrorType = WriteContractErrorType | ParseSignatureErrorType | ErrorType;
export type InvokerSignParameters<account extends Account | undefined = Account | undefined, chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined, args = unknown> = {
    args: args;
    authority: LocalAccount;
} & GetExecutorParameter<account, Account | Address, false> & GetChainParameter<chain, chainOverride>;
export type InvokerSignErrorType = GetTransactionCountErrorType | SignAuthMessageErrorType | Keccak256ErrorType | IsAddressEqualErrorType | ErrorType;
export type Invoker<account extends Account | undefined = Account | undefined, chain extends Chain | undefined = Chain | undefined, args = unknown> = {
    address: Address;
    execute<chainOverride extends Chain | undefined = undefined>(parameters: InvokerExecuteParameters<account, chain, chainOverride, args>): Promise<Hex>;
    sign<chainOverride extends Chain | undefined = undefined>(parameters: InvokerSignParameters<account, chain, chainOverride, args>): Promise<Hex>;
};
export type GetInvokerParameters<account extends Account | undefined = Account | undefined, chain extends Chain | undefined = Chain | undefined, args = unknown> = {
    address: Address;
    client: Client<Transport, chain, account>;
    coder: InvokerCoder<args>;
};
export type GetInvokerErrorType = ErrorType;
export type InvokerArgs<invoker extends Invoker<any, any, any> = Invoker> = invoker extends Invoker<any, any, infer args> ? args : unknown;
export declare function getInvoker<account extends Account | undefined, chain extends Chain | undefined, args>(parameters: GetInvokerParameters<account, chain, args>): Invoker<account, chain, args>;
export {};
//# sourceMappingURL=getInvoker.d.ts.map