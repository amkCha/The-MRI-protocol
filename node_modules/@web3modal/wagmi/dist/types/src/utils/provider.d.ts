import type { Chain } from '@wagmi/core/chains';
interface Options {
    projectId: string;
}
export declare function walletConnectProvider({ projectId }: Options): (chain: Chain) => import("viem").HttpTransport | null;
export {};
