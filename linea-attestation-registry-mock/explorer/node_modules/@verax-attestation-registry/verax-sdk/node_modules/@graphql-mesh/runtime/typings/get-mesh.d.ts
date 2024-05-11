import { DocumentNode, GraphQLSchema } from 'graphql';
import { envelop, Plugin } from '@envelop/core';
import { KeyValueCache, Logger, MeshFetch, MeshPlugin, MeshPubSub, RawSourceOutput } from '@graphql-mesh/types';
import { ExecuteMeshFn, GetMeshOptions, MeshExecutor, SubscribeMeshFn } from './types.js';
type SdkRequester = (document: DocumentNode, variables?: any, operationContext?: any) => any;
export interface MeshInstance {
    execute: ExecuteMeshFn;
    subscribe: SubscribeMeshFn;
    schema: GraphQLSchema;
    createExecutor(globalContext: any): MeshExecutor;
    rawSources: RawSourceOutput[];
    destroy(): void;
    pubsub: MeshPubSub;
    cache: KeyValueCache;
    logger: Logger;
    plugins: Plugin[];
    getEnveloped: ReturnType<typeof envelop>;
    sdkRequesterFactory(globalContext: any): SdkRequester;
}
export declare function wrapFetchWithPlugins(plugins: MeshPlugin<any>[]): MeshFetch;
export declare function getMesh(options: GetMeshOptions): Promise<MeshInstance>;
export {};
