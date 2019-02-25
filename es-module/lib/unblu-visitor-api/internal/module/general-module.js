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
var GeneralModule = /** @class */ (function (_super) {
    __extends(GeneralModule, _super);
    function GeneralModule(bridge) {
        return _super.call(this, bridge, 'general') || this;
    }
    GeneralModule.prototype.startConversation = function (type, visitorName) {
        return this.callApiFunction("startConversation" /* startConversation */, [type, visitorName]);
    };
    GeneralModule.prototype.joinConversation = function (pin, visitorName) {
        return this.callApiFunction("joinConversation" /* joinConversation */, [pin, visitorName]);
    };
    GeneralModule.prototype.openConversation = function (conversationId) {
        return this.callApiFunction("openConversation" /* openConversation */, [conversationId]);
    };
    GeneralModule.prototype.getActiveConversation = function () {
        return this.callApiFunction("getActiveConversation" /* getActiveConversation */, []);
    };
    GeneralModule.prototype.getNotificationCount = function () {
        return this.callApiFunction("getNotificationCount" /* getNotificationCount */, []);
    };
    GeneralModule.prototype.getPersonInfo = function () {
        return this.callApiFunction("getPersonInfo" /* getPersonInfo */, []);
    };
    return GeneralModule;
}(InternalModule));
export { GeneralModule };
//# sourceMappingURL=general-module.js.map