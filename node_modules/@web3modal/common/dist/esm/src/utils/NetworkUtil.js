export const NetworkUtil = {
    caipNetworkIdToNumber(caipnetworkId) {
        return caipnetworkId ? Number(caipnetworkId.split(':')[1]) : undefined;
    }
};
//# sourceMappingURL=NetworkUtil.js.map