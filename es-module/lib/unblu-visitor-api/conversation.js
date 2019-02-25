var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { UnbluApiError } from './unblu-api-error';
import { EventEmitter } from './internal/util/event-emitter';
/**
 * #### This class gives API access to the currently active conversation.
 *
 * As long as a conversation is active one can register and receive the events provided by this class and call the methods.
 * Once the conversation is closed this API object will be destroyed and no more event callbacks will be called.
 * Any subsequent calls will fail.
 *
 * Use the [[CLOSE]] event to de-init any code connected to this conversation.
 */
var Conversation = /** @class */ (function () {
    /**
     * @hidden
     */
    function Conversation(internalApi, conversationId) {
        var _this = this;
        this.internalApi = internalApi;
        this.conversationId = conversationId;
        this.eventEmitter = new EventEmitter();
        this.internalListeners = {};
        this.destroyed = false;
        // clean up all listeners when the conversation disconnects.
        this.on(Conversation.CLOSE, function () { return _this.destroy(); });
    }
    Conversation.prototype.on = function (event, listener) {
        this.checkNotDestroyed();
        var needsInternalSubscription = !this.eventEmitter.hasListeners(event);
        this.eventEmitter.on(event, listener);
        if (needsInternalSubscription)
            this.onInternal(event);
    };
    /**
     * Removes a previously registered listener
     * @param event The event to unregister from.
     * @param listener The listener to remove.
     */
    Conversation.prototype.off = function (event, listener) {
        this.checkNotDestroyed();
        var removed = this.eventEmitter.off(event, listener);
        if (!this.eventEmitter.hasListeners(event))
            this.offInternal(event);
        return removed;
    };
    Conversation.prototype.onInternal = function (eventName) {
        var _this = this;
        var internalListener;
        switch (eventName) {
            case Conversation.CONNECTION_STATE_CHANGE:
                internalListener = function (event) {
                    if (event.data.conversationId == _this.conversationId)
                        _this.eventEmitter.emit(event.name, event.data.connectionState);
                };
                break;
            case Conversation.CALL_STATE_CHANGE:
                internalListener = function (event) {
                    if (event.data.conversationId == _this.conversationId)
                        _this.eventEmitter.emit(event.name, event.data.callState);
                };
                break;
            default:
                internalListener = function (event) {
                    if (event.data == _this.conversationId) {
                        _this.eventEmitter.emit(event.name);
                    }
                };
                break;
        }
        this.internalListeners[eventName] = internalListener;
        this.internalApi.conversation.on(eventName, internalListener).catch(function (e) { return console.warn('Error registering internal listener for event:', eventName, 'error:' + e, e); });
    };
    Conversation.prototype.offInternal = function (eventName) {
        var listener = this.internalListeners[eventName];
        if (listener == null)
            return;
        delete this.internalListeners[eventName];
        this.internalApi.conversation.off(eventName, listener).catch(function (e) { return console.warn('Error removing internal listener for event:', eventName, 'error:' + e, e); });
    };
    /**
     * Returns the ID of this conversation.
     */
    Conversation.prototype.getConversationId = function () {
        return this.conversationId;
    };
    /**
     * Returns the current connection state the conversation is in.
     *
     * If the connection is lost, the conversation will automatically try to reconnect using an exponential back-off strategy.
     * If a fatal error is detected, the state will change to [[ConnectionState.ERROR]].
     *
     * If this happens, the conversation is in it's terminal state. A dialog or other UI will be displayed to the user with details on the failure.
     * The conversation is not automatically closed in this case.
     * It may either be closed through a manual action by the visitor (confirming the error) or via the API.
     *
     * @see [[CONNECTION_STATE_CHANGE]] If you need to listen to changes.
     * @return A promise that resolves to the current connection state of the conversation
     * or is rejected with a [[UnbluApiError]] if the call fails.
     */
    Conversation.prototype.getConnectionState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkNotDestroyed();
                return [2 /*return*/, this.internalApi.conversation.getConnectionState(this.conversationId)];
            });
        });
    };
    /**
     * Returns the current state the conversation is in.
     * @see [[END]]  If you need to listen to changes of the end event.
     * @return A promise that resolves to the current state of the conversation
     * or is rejected with a [[UnbluApiError]] if the call fails.
     */
    Conversation.prototype.getConversationState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkNotDestroyed();
                return [2 /*return*/, this.internalApi.conversation.getConversationState(this.conversationId)];
            });
        });
    };
    /**
     * @see [[CALL_STATE_CHANGE]] If you need to listen to changes.
     * @return A promise that resolves to the current call state of the local user
     * or is rejected with a [[UnbluApiError]] if the call fails.
     */
    Conversation.prototype.getCallState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkNotDestroyed();
                return [2 /*return*/, this.internalApi.conversation.getCallState(this.conversationId)];
            });
        });
    };
    /**
     * Starts a voice call in this conversation.
     *
     * - If a call is already active, this call will be ignored.
     * - If the local person doesn't have the right to start a voice call,
     * the returned promise will be rejected with the unblu error category [[UnbluErrorCategory.ACTION_NOT_GRANTED]].
     * @see [[CALL_STATE_CHANGE]] If you need to listen to changes.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    Conversation.prototype.startAudioCall = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkNotDestroyed();
                return [2 /*return*/, this.internalApi.conversation.startAudioCall(this.conversationId)];
            });
        });
    };
    /**
     * Starts a video call in this conversation.
     *
     * - If a call is already active, this call will be ignored.
     * - If the local person doesn't have the right to start a video call,
     * the returned promise will be rejected with the unblu error category [[UnbluErrorCategory.ACTION_NOT_GRANTED]].
     * @see [[CALL_STATE_CHANGE]] If you need to listen to changes.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    Conversation.prototype.startVideoCall = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkNotDestroyed();
                return [2 /*return*/, this.internalApi.conversation.startVideoCall(this.conversationId)];
            });
        });
    };
    /**
     * Ends and closes this conversation.
     *
     * If the local person doesn't have the right to end the conversation,
     * the returned promise will be rejected with the unblu error category [[UnbluErrorCategory.ACTION_NOT_GRANTED]].
     * @see [[END]] fired after this call.
     * @see [[closeConversation]] for details on closing a conversation.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    Conversation.prototype.endConversation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkNotDestroyed();
                return [2 /*return*/, this.internalApi.conversation.endConversation(this.conversationId)];
            });
        });
    };
    /**
     * Leaves and closes this conversation.
     *
     * By leaving, the visitor is removed from the active participant list of the conversation.
     * Once a conversation is left, the visitor can not re-open it. It will not be visible in the conversation history either.
     *
     * If the local person doesn't have the right to leave the conversation,
     * the returned promise will be rejected with the unblu error category [[UnbluErrorCategory.ACTION_NOT_GRANTED]].
     * @see [[CLOSE]] fired after this call.
     * @see [[closeConversation]] for details on closing a conversation without leaving.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    Conversation.prototype.leaveConversation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkNotDestroyed();
                return [2 /*return*/, this.internalApi.conversation.leaveConversation(this.conversationId)];
            });
        });
    };
    /**
     * Closes this conversation locally.
     *
     * When called, the connection to this conversation is closed and the overview is displayed.
     *
     * **Note that:**
     * - Closing does NOT end the conversation.
     * - The person does NOT leave the conversation.
     * - All Conversation api instances for this conversation will be destroyed.
     *
     * The conversation can be joined again either via the UI or using [[UnbluApi.openConversation]].
     * @see [[CLOSE]] fired after this call.
     * @see [[endConversation]] for details on ending a conversation.
     * @see [[leavingConversation]] for details on leaving a conversation.
     * @see [[destroy]] for details on destroying a conversation.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    Conversation.prototype.closeConversation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkNotDestroyed();
                return [2 /*return*/, this.internalApi.conversation.closeConversation(this.conversationId)];
            });
        });
    };
    Conversation.prototype.checkNotDestroyed = function () {
        if (this.destroyed)
            throw new UnbluApiError("ILLEGAL_STATE" /* ILLEGAL_STATE */, 'Error: trying to execute method on destroyed conversation object.');
    };
    /**
     * Returns weather this conversation is destroyed or not.
     *
     * Conversations are either destroyed if [[destroy]] is called or the conversation is closed.
     * This usually happens when the user navigates back to an overview or into an other conversation.
     * @see [[destroy]]
     * @see [[CLOSE]]
     * @return Weather this conversation is destroyed or not.
     */
    Conversation.prototype.isDestroyed = function () {
        return this.destroyed;
    };
    /**
     * Destroys this conversation API instance.
     *
     * Calling destroy will unregister all event listeners and prohibit any further calls to this object.
     * Once the conversation is destroyed, any subsequent calls will reject the returned promise with [[UnbluErrorCategory.ILLEGAL_STATE]] as reason.
     *
     * **Note that:**
     * - Destroying does NOT close the conversation .
     * - Destroying does NOT end the conversation.
     * - Destroying does NOT leave the conversation.
     * - Other instances of the same Conversation will NOT be destroyed.
     *
     * This call simply destroys this local API instance to the conversation.
     *
     * A destroyed but still open conversation can be accessed again using [[UnbluApi.getActiveConversation]].
     *
     * @see [[isDestroyed]]
     * @see [[closeConversation]] for details on how to close a conversation
     * @see [[endConversation]] for details on how to end a conversation
     */
    Conversation.prototype.destroy = function () {
        if (this.destroyed)
            return;
        this.destroyed = true;
        this.eventEmitter.reset();
        for (var event_1 in this.internalListeners) {
            this.offInternal(event_1);
        }
    };
    /**
     * Event emitted when the [[ConnectionState]] of this conversation changes.
     * @event connectionStateChange
     * @see [[on]] for listener registration
     */
    Conversation.CONNECTION_STATE_CHANGE = 'connectionStateChange';
    /**
     * Event emitted when the [[CallState]] of this conversation changes.
     * @event callStateChange
     * @see [[on]] for listener registration
     */
    Conversation.CALL_STATE_CHANGE = 'callStateChange';
    /**
     * Event emitted when the conversation ends.
     *
     * @event end
     * @see [[on]] for listener registration
     */
    Conversation.END = 'end';
    /**
     * Event emitted when the conversation is closed.
     *
     * This may happen due to a UI-navigation or an API-call.
     *
     * @event close
     * @see [[on]] for listener registration
     */
    Conversation.CLOSE = 'close';
    return Conversation;
}());
export { Conversation };
//# sourceMappingURL=conversation.js.map