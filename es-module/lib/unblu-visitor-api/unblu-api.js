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
import { Conversation } from './conversation';
import { EventEmitter } from './internal/util/event-emitter';
import { UnbluApiError } from './unblu-api-error';
/**
 * #### This class represents the initialized unblu JS API for site integration.
 *
 * There is only ever one instance of this api which can be retrieved via `unblu.api.initialize()`,
 * see [[UnbluStaticApi]] for more details on configuring and initializing the UnbluApi.
 *
 * The Api connects to a integrated version of unblu. All actions performed via the UnbluApi are executed in
 * the name of and with the rights of current visitor and may have direct effect on the displayed unblu UI.
 *
 * For example if a conversation is started from the UnbluApi, the unblu UI will navigate to it.
 * If a conversation is closed via the Api, it will also be closed on the unblu UI of the visitor.
 * For more information on UI side effects please check the documentation for each method call.
 *
 *  For programmatic admin access and configuration of unblu please use the unblu WebApi.
 */
var UnbluApi = /** @class */ (function () {
    /**
     * @hidden
     */
    function UnbluApi(internalApi) {
        var _this = this;
        this.internalApi = internalApi;
        this.internalListeners = {};
        this.upgradeListeners = {};
        this.eventEmitter = new EventEmitter();
        internalApi.meta.on('upgraded', function () { return _this.onUpgraded(); });
    }
    UnbluApi.prototype.on = function (event, listener) {
        var needsInternalSubscription = !this.eventEmitter.hasListeners(event);
        this.eventEmitter.on(event, listener);
        if (needsInternalSubscription)
            this.onInternal(event).catch(function (e) { return console.warn('Error registering internal listener for event:', event, 'error:' + e, e); });
    };
    /**
     * Removes a previously registered listener
     * @param event The event to unregister from.
     * @param listener The listener to remove.
     */
    UnbluApi.prototype.off = function (event, listener) {
        var removed = this.eventEmitter.off(event, listener);
        if (!this.eventEmitter.hasListeners(event))
            this.offInternal(event).catch(function (e) { return console.warn('Error removing internal listener for event:', event, 'error:' + e, e); });
        return removed;
    };
    UnbluApi.prototype.onInternal = function (eventName) {
        return __awaiter(this, void 0, void 0, function () {
            var internalListener, internalModule, needsUpgrade, _a, e_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        switch (eventName) {
                            case UnbluApi.AGENT_AVAILABILITY_CHANGE:
                                internalListener = function (event) {
                                    _this.eventEmitter.emit(event.name, event.data);
                                };
                                internalModule = this.internalApi.agentAvailability;
                                needsUpgrade = false;
                                break;
                            case UnbluApi.ACTIVE_CONVERSATION_CHANGE:
                                internalListener = function (event) {
                                    _this.eventEmitter.emit(event.name, event.data ? new Conversation(_this.internalApi, event.data) : null);
                                };
                                internalModule = this.internalApi.general;
                                needsUpgrade = true;
                                break;
                            case UnbluApi.NOTIFICATION_COUNT_CHANGE:
                            case UnbluApi.PERSON_CHANGE:
                                internalListener = function (event) {
                                    _this.eventEmitter.emit(event.name, event.data);
                                };
                                internalModule = this.internalApi.general;
                                needsUpgrade = true;
                                break;
                            default:
                                throw new UnbluApiError("INVALID_FUNCTION_ARGUMENTS" /* INVALID_FUNCTION_ARGUMENTS */, 'Registration to unknown event:' + eventName);
                        }
                        _a = !needsUpgrade;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.internalApi.meta.isUpgraded()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 6];
                        this.internalListeners[eventName] = internalListener;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, internalModule.on(eventName, internalListener)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        delete this.internalListeners[eventName];
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UnbluApi.prototype.offInternal = function (eventName) {
        return __awaiter(this, void 0, void 0, function () {
            var listener, internalModule;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listener = this.internalListeners[eventName];
                        if (listener == null) {
                            return [2 /*return*/];
                        }
                        delete this.internalListeners[eventName];
                        switch (eventName) {
                            case UnbluApi.AGENT_AVAILABILITY_CHANGE:
                                internalModule = this.internalApi.agentAvailability;
                                break;
                            default:
                                internalModule = this.internalApi.general;
                                break;
                        }
                        return [4 /*yield*/, internalModule.off(eventName, listener)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // General
    /**
     * Returns information about the visitor.
     * @return A promise that resolves to the current visitors person info.
     */
    UnbluApi.prototype.getPersonInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requireUpgrade()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.internalApi.general.getPersonInfo()];
                }
            });
        });
    };
    /**
     * Returns the number of unread messages.
     * @return A promise that resolves to the current number of unread messages.
     */
    UnbluApi.prototype.getNotificationCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalApi.meta.isUpgraded()];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, this.internalApi.general.getNotificationCount()];
                        }
                        else {
                            return [2 /*return*/, this.internalApi.generalLazy.getNotificationCount()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Conversation
    /**
     * Starts a new Conversation and places it into the inbound conversation queue.
     *
     * **NOTE:** calling this method will open the unblu UI and navigate to the started conversation.
     *
     * @param type The conversation type that shall be started.
     * @param visitorName The name the local visitor should have. This is only taken into account if the visitor is not already authenticated.
     * @return A promise that resolves to the conversation object giving API access to the started conversation.
     */
    UnbluApi.prototype.startConversation = function (type, visitorName) {
        return __awaiter(this, void 0, void 0, function () {
            var conversationId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requireUpgrade()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.internalApi.general.startConversation(type, visitorName)];
                    case 2:
                        conversationId = _a.sent();
                        return [2 /*return*/, new Conversation(this.internalApi, conversationId)];
                }
            });
        });
    };
    /**
     * Joins an existing conversation with a given PIN.
     *
     * **NOTE:** calling this method will open the unblu UI and navigate to the joined conversation.
     *
     * @param pin The PIN retrieved from tha unblu Agent Desk.
     * @param visitorName The name the local visitor should have. This is only taken into account if the visitor is not already authenticated.
     * @return A promise that resolves to the conversation object giving API access to the joined conversation.
     */
    UnbluApi.prototype.joinConversation = function (pin, visitorName) {
        return __awaiter(this, void 0, void 0, function () {
            var conversationId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requireUpgrade()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.internalApi.general.joinConversation(pin, visitorName)];
                    case 2:
                        conversationId = _a.sent();
                        return [2 /*return*/, new Conversation(this.internalApi, conversationId)];
                }
            });
        });
    };
    /**
     * Opens the existing conversation with the given conversation ID.
     *
     * **NOTE:** calling this method will open the unblu UI and navigate to the opened conversation.
     *
     * @param conversationId The PIN retrieved from tha unblu Agent Desk.
     * @return A promise that resolves to the conversation object giving API access to the opened conversation.
     */
    UnbluApi.prototype.openConversation = function (conversationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requireUpgrade()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.internalApi.general.openConversation(conversationId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new Conversation(this.internalApi, conversationId)];
                }
            });
        });
    };
    /**
     * Returns the currently active conversation or `null` if no conversation is active.
     *
     * **NOTE:** calling this method twice while the same conversation is active, will result in two individual conversation API instances being returned.
     * destroying one of them will not cause the other one to also be destroyed. If however the active conversation is closed, all returned Conversation instances will be destroyed.
     *
     * @return A promise that either resolves to the currently active conversation or `null` if no conversation is open.
     * @see [[ACTIVE_CONVERSATION_CHANGE]]
     */
    UnbluApi.prototype.getActiveConversation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conversationId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalApi.meta.isUpgraded()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.internalApi.general.getActiveConversation()];
                    case 2:
                        conversationId = _a.sent();
                        return [2 /*return*/, conversationId != null ? new Conversation(this.internalApi, conversationId) : null];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Checks if an agent is available for the current named area and language.
     *
     * @return Promise that resolves to `true` if the availability state is [AVAILABLE](AgentAvailabilityState.AVAILABLE) or [BUSY](AgentAvailabilityState.BUSY), `false` otherwise.
     * @see [[getAgentAvailabilityState]] for a more detailed check.
     */
    UnbluApi.prototype.isAgentAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.internalApi.agentAvailability.isAgentAvailable()];
            });
        });
    };
    /**
     * Returns the current availability state for the current named area and language.
     * @return Promise that resolves to the current availability state.
     * @see [[isAgentAvailable]] for a simpler check.
     */
    UnbluApi.prototype.getAgentAvailabilityState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.internalApi.agentAvailability.getAgentAvailabilityState()];
            });
        });
    };
    UnbluApi.prototype.requireUpgrade = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalApi.meta.upgrade(false)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UnbluApi.prototype.onUpgraded = function () {
        for (var _i = 0, _a = this.eventEmitter.getEventsWithListeners(); _i < _a.length; _i++) {
            var event_1 = _a[_i];
            // register internal listeners for all events that need upgrade.
            if (!this.internalListeners[event_1])
                this.onInternal(event_1);
        }
    };
    /**
     * Event emitted every time the active conversation changed.
     *
     * This may happen due to a UI-navigation or an API-call.
     *
     * @event activeConversationChange
     * @see [[on]] for listener registration
     * @see [[ConversationChangeListener]]
     */
    UnbluApi.ACTIVE_CONVERSATION_CHANGE = 'activeConversationChange';
    /**
     * Event emitted every time the notification count (unread messages) changes.
     *
     * @event notificationCountChange
     * @see [[on]] for listener registration
     * @see [[NotificationCountChangeListener]]
     */
    UnbluApi.NOTIFICATION_COUNT_CHANGE = 'notificationCountChange';
    /**
     * Event emitted every time the local person changes. This may be i.e. due to the person setting its name.
     *
     * @event personChange
     * @see [[on]] for listener registration
     * @see [[PersonChangeListener]]
     */
    UnbluApi.PERSON_CHANGE = 'personChange';
    /**
     * Event emitted every time the agent availability changes for the current named area and locale.
     *
     * @event availabilityChange
     * @see [[on]] for listener registration
     * @see [[AgentAvailabilityChangeListener]]
     */
    UnbluApi.AGENT_AVAILABILITY_CHANGE = 'availabilityChange';
    return UnbluApi;
}());
export { UnbluApi };
//# sourceMappingURL=unblu-api.js.map