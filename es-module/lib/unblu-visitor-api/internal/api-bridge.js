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
import { UnbluApiError } from '../unblu-api-error';
import { CATEGORY_ACTION_NOT_GRANTED, CATEGORY_EXECUTION_EXCEPTION, CATEGORY_INVALID_FUNCTION_ARGUMENTS, CATEGORY_INVALID_FUNCTION_CALL } from './java-error-codes';
var SUPPORTED_MAJOR_VERSION = 2;
var ApiBridge = /** @class */ (function () {
    /**
     * instantiates the bridge that links the UNBLU internal API provided by the collaboration server with the UNBLU JS-API
     * @param mountPoint the global unblu object under which the internal API is registered.
     */
    function ApiBridge(mountPoint) {
        this.mountPoint = mountPoint;
    }
    ApiBridge.prototype.waitUntilLoaded = function (timeout, promise) {
        return __awaiter(this, void 0, void 0, function () {
            var timeoutTimestamp;
            var _this = this;
            return __generator(this, function (_a) {
                timeoutTimestamp = Date.now() + timeout;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var waitForLoaded = function () {
                            if (timeoutTimestamp - Date.now() > 0) {
                                if (_this.checkLoaded())
                                    return resolve();
                                setTimeout(waitForLoaded, 50);
                            }
                            else {
                                reject(new UnbluApiError("INITIALIZATION_TIMEOUT" /* INITIALIZATION_TIMEOUT */, 'Timeout while waiting for collaboration server API to be loaded.'));
                            }
                        };
                        waitForLoaded();
                    })];
            });
        });
    };
    ApiBridge.prototype.checkLoaded = function () {
        this.internal = this.mountPoint['internal'];
        return this.internal != null;
    };
    ApiBridge.prototype.checkCompatibility = function () {
        if (!this.internal) {
            throw new UnbluApiError("INCOMPATIBLE_UNBLU_VERSION" /* INCOMPATIBLE_UNBLU_VERSION */, 'Incompatible unblu collaboration server, no API bridge provided.');
        }
        else if (typeof this.internal.getApiVersion !== 'function') {
            throw new UnbluApiError("INCOMPATIBLE_UNBLU_VERSION" /* INCOMPATIBLE_UNBLU_VERSION */, 'Incompatible unblu collaboration server, incompatible API bridge.');
        }
        var version = this.internal.getApiVersion();
        if (+version[0] != SUPPORTED_MAJOR_VERSION) {
            throw new UnbluApiError("INCOMPATIBLE_UNBLU_VERSION" /* INCOMPATIBLE_UNBLU_VERSION */, "Incompatible collaboration server version. \n                Supported API version: " + SUPPORTED_MAJOR_VERSION + ".x.x.\n                collaboration server API version: " + version + ".");
        }
    };
    /**
     * Calls an API function of the internal unblu collaboration server API.
     * @param moduleName The module to which the function belongs.
     * @param functionName The function to call.
     * @param args The arguments to pass to the function.
     */
    ApiBridge.prototype.callApiFunction = function (moduleName, functionName, args) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.internal.execute(moduleName, functionName, args)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        switch (e_1.category) {
                            case CATEGORY_INVALID_FUNCTION_CALL:
                                throw new UnbluApiError("INVALID_FUNCTION_CALL" /* INVALID_FUNCTION_CALL */, e_1.message);
                            case CATEGORY_INVALID_FUNCTION_ARGUMENTS:
                                throw new UnbluApiError("INVALID_FUNCTION_ARGUMENTS" /* INVALID_FUNCTION_ARGUMENTS */, e_1.message);
                            case CATEGORY_ACTION_NOT_GRANTED:
                                throw new UnbluApiError("ACTION_NOT_GRANTED" /* ACTION_NOT_GRANTED */, e_1.message);
                            case CATEGORY_EXECUTION_EXCEPTION:
                                throw new UnbluApiError("EXECUTION_EXCEPTION" /* EXECUTION_EXCEPTION */, e_1.message);
                            default:
                                throw new UnbluApiError("EXECUTION_EXCEPTION" /* EXECUTION_EXCEPTION */, '' + e_1);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Registers a callback for an event emitted by the internal unblu collaboration server API.
     * @param module The module that emits the event.
     * @param event The event name.
     * @param callback The callback which will be called every time the event is emitted.
     */
    ApiBridge.prototype.on = function (module, event, callback) {
        return this.internal.registerEventListener(module, event, callback);
    };
    /**
     * Unregisters a callback for an event emitted by the internal unblu collaboration server API.
     * @param module The module that emits the event.
     * @param event The event name.
     * @param callback Optionally callback which will be removed, if none is provided all listeners of the event will be removed.
     */
    ApiBridge.prototype.off = function (module, event, callback) {
        return this.internal.removeEventListener(module, event, callback);
    };
    return ApiBridge;
}());
export { ApiBridge };
//# sourceMappingURL=api-bridge.js.map