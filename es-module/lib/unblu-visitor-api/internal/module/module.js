var InternalModule = /** @class */ (function () {
    function InternalModule(bridge, moduleName) {
        this.bridge = bridge;
        this.moduleName = moduleName;
    }
    InternalModule.prototype.callApiFunction = function (functionName, args) {
        return this.bridge.callApiFunction(this.moduleName, functionName, args);
    };
    InternalModule.prototype.on = function (eventName, listener) {
        return this.bridge.on(this.moduleName, eventName, listener);
    };
    InternalModule.prototype.off = function (eventName, listener) {
        return this.bridge.off(this.moduleName, eventName, listener);
    };
    return InternalModule;
}());
export { InternalModule };
//# sourceMappingURL=module.js.map