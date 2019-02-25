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
var ConversationModule = /** @class */ (function (_super) {
    __extends(ConversationModule, _super);
    function ConversationModule(bridge) {
        return _super.call(this, bridge, 'conversation') || this;
    }
    ConversationModule.prototype.getConnectionState = function (conversationId) {
        return this.callApiFunction("getConnectionState" /* getConnectionState */, [conversationId]);
    };
    ConversationModule.prototype.getConversationState = function (conversationId) {
        return this.callApiFunction("getConversationState" /* getConversationState */, [conversationId]);
    };
    ConversationModule.prototype.getCallState = function (conversationId) {
        return this.callApiFunction("getCallState" /* getCallState */, [conversationId]);
    };
    ConversationModule.prototype.startAudioCall = function (conversationId) {
        return this.callApiFunction("startAudioCall" /* startAudioCall */, [conversationId]);
    };
    ConversationModule.prototype.startVideoCall = function (conversationId) {
        return this.callApiFunction("startVideoCall" /* startVideoCall */, [conversationId]);
    };
    ConversationModule.prototype.endConversation = function (conversationId) {
        return this.callApiFunction("endConversation" /* endConversation */, [conversationId]);
    };
    ConversationModule.prototype.leaveConversation = function (conversationId) {
        return this.callApiFunction("leaveConversation" /* leaveConversation */, [conversationId]);
    };
    ConversationModule.prototype.closeConversation = function (conversationId) {
        return this.callApiFunction("closeConversation" /* closeConversation */, [conversationId]);
    };
    return ConversationModule;
}(InternalModule));
export { ConversationModule };
//# sourceMappingURL=conversation-module.js.map