var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { InternalModule } from './module';
var GeneralLazyModule = /** @class */ (function (_super) {
    __extends(GeneralLazyModule, _super);
    function GeneralLazyModule(bridge) {
        return _super.call(this, bridge, 'generallazy') || this;
    }
    GeneralLazyModule.prototype.getNotificationCount = function () {
        return this.callApiFunction("getNotificationCount" /* getNotificationCount */, []);
    };
    GeneralLazyModule.prototype.getPersonInfo = function () {
        return this.callApiFunction("getPersonInfo" /* getPersonInfo */, []);
    };
    return GeneralLazyModule;
}(InternalModule));
export { GeneralLazyModule };
//# sourceMappingURL=general-lazy-module.js.map