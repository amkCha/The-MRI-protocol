export declare const invokerAbi: readonly [{
    readonly type: "function";
    readonly name: "execute";
    readonly inputs: readonly [{
        readonly name: "execData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }, {
        readonly name: "signature";
        readonly type: "tuple";
        readonly internalType: "struct Auth.Signature";
        readonly components: readonly [{
            readonly name: "signer";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "yParity";
            readonly type: "uint8";
            readonly internalType: "uint8";
        }, {
            readonly name: "r";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "s";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "getDigest";
    readonly inputs: readonly [{
        readonly name: "execData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }, {
        readonly name: "nonce";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "digest";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "multiSend";
    readonly inputs: readonly [{
        readonly name: "transactions";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "nextNonce";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "error";
    readonly name: "BadAuth";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidNonce";
    readonly inputs: readonly [{
        readonly name: "authority";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "attempted";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}];
//# sourceMappingURL=abis.d.ts.map