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
var MetaModule = /** @class */ (function (_super) {
    __extends(MetaModule, _super);
    function MetaModule(bridge) {
        return _super.call(this, bridge, 'meta') || this;
    }
    MetaModule.prototype.isUpgraded = function () {
        return this.callApiFunction("isUpgraded" /* isUpgraded */, []);
    };
    MetaModule.prototype.upgrade = function (openUi) {
        return this.callApiFunction("upgrade" /* upgrade */, [openUi]);
    };
    return MetaModule;
}(InternalModule));
export { MetaModule };
//# sourceMappingURL=meta-module.js.map