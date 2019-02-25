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
import { UnbluApi } from './unblu-api';
import { EventEmitter } from './internal/util/event-emitter';
import { UnbluUtil } from './unblu-util';
import { UnbluApiError } from './unblu-api-error';
import { ApiBridge } from './internal/api-bridge';
import { InternalApi } from './internal/internal-api';
/**
 * #### The central entry point that allows to configure an initialize the unblu JS API.
 * The static unblu API works without actually loading the rest of unblu.
 * It can do some general checks and load unblu or connect the API to a loaded version of unblu.
 * The JS API is an optional add-on to the unblu visitor site integration.
 *
 * Depending on how unblu is integrated into the local website the API has to be initialized differently.
 *
 * **a.) API-only integration**
 * If no unblu-snippet is loaded into the page, unblu can be fully initialized with the API.
 * In this case, both the `configure` and the `initialize` methods have to be called.
 * Example:
 * ```ts
 *  const api = await unblu.api
 *      // configure the unblu server
 *      .configure({
 *          apiKey: "<your-api-key>",
 *          serverUrl: "<unblu-server-url>"
 *      })
 *      // initialize the api.
 *      .initialize();
 * ```
 * This implementation will load the unblu snippet and initialize both unblu and the JS API.
 *
 * **b.) Snippet and JS API integration**
 * If the unblu-snippet is already present in the local website, unblu doesn't have to be loaded
 * and only the API has to be initialized.
 * Example:
 * ```ts
 * // directly initialize the api without configuring.
 * const api = await unblu.api.initialize();
 *
 * ```
 */
var UnbluStaticApi = /** @class */ (function () {
    /**
     * @hidden
     */
    function UnbluStaticApi() {
        //TODO: detect browser support;
        var _this = this;
        this.state = "INITIAL" /* INITIAL */;
        this.eventEmitter = new EventEmitter();
        // store the error
        this.eventEmitter.on(UnbluStaticApi.ERROR, function (e) { return _this.error = e; });
        // install globally
        var unblu = UnbluUtil.getUnbluObject();
        if (unblu.api) {
            this.handleError(new UnbluApiError("ILLEGAL_STATE" /* ILLEGAL_STATE */, 'Unblu API has already been loaded.'));
        }
        else {
            unblu.api = this;
        }
        if (UnbluUtil.isUnbluLoaded()) {
            // Auto init if snippet is already loaded.
            this.initializeApi().catch(function (e) { return console.warn('Error during auto initialization', e); });
        }
    }
    UnbluStaticApi.prototype.on = function (event, listener) {
        if (event == UnbluStaticApi.READY && this.state == "INITIALIZED" /* INITIALIZED */)
            listener(this.initializedApi);
        else if (event == UnbluStaticApi.ERROR && this.state == "ERROR" /* ERROR */)
            listener(this.error);
        else
            this.eventEmitter.on(event, listener);
    };
    /**
     * Removes a previously registered listener.
     * @param event The event unregister.
     * @param listener The listener to be removed.
     * @return `true` if the listener was removed, `false` otherwise.
     */
    UnbluStaticApi.prototype.off = function (event, listener) {
        return this.eventEmitter.off(event, listener);
    };
    /**
     * Checks whether the API has to be configured or not.
     *
     * - If no snippet is present and the API state is still [[ApiState.INITIAL]] a configuration is necessary.
     * - If a snippet is present or the API is already loaded, configuration is not necessary.
     *
     * @return `true` if a configuration is needed to initialize the API, `false` otherwise.
     * @see [[configure]] to configure the API
     * @see [[initialize]] to initialize the API
     */
    UnbluStaticApi.prototype.isConfigurationNeeded = function () {
        return this.state === "INITIAL" /* INITIAL */ && !UnbluUtil.isUnbluLoaded();
    };
    /**
     * Returns the current state of the API
     * @return the current API state.
     * @see [[isInitialized]] for a simpler check
     */
    UnbluStaticApi.prototype.getApiState = function () {
        return this.state;
    };
    /**
     * Checks whether the API is initialized or not.
     * @return `true` if the API is initialzed, `false` for any other state.
     * @see [[getApiState]] for the full state
     */
    UnbluStaticApi.prototype.isInitialized = function () {
        return this.state === "INITIALIZED" /* INITIALIZED */;
    };
    /**
     * Configures the way that unblu should be initialized.
     *
     * The configuration of the unblu API is needed when, and only when no unblu snippet is already present in the website.
     *
     * **Note:**
     * - Calling this method when there already is an unblu-snippet will result in an [[UnbluApiError]].
     * - This method must be called BEFORE [[initialize]]. If it is called afterwards an [[UnbluApiError]] will be thrown.
     *
     * @param config The configuration to be set.
     * @return an instance of `this` allowing chaining like `unblu.api.configure({...}).initialize();`
     * @see [[isConfigurationNeeded]] to check if configuration is needed or not.
     */
    UnbluStaticApi.prototype.configure = function (config) {
        if (UnbluUtil.isUnbluLoaded()) {
            throw new UnbluApiError("ILLEGAL_STATE" /* ILLEGAL_STATE */, 'Configure called when unblu was already loaded.');
        }
        else if (this.state !== "INITIAL" /* INITIAL */) {
            throw new UnbluApiError("ILLEGAL_STATE" /* ILLEGAL_STATE */, 'Error configure called after API was already initialized.');
        }
        this.configuration = config;
        return this;
    };
    /**
     * Initializes the API and resolves to the fully initialized API.
     *
     * If the API has already been initialized or is already in the initializing process, the existing API will be returned.
     * There is only ever one instance of the API which will be returned by any call of this method which makes it safe to call this multiple times.
     *
     * *The initialization may fail with a [[UnbluApiError]] for the following reasons*
     * - A configuration is needed but none was provided: [[UnbluErrorCategory.INITIALIZATION_FAILED]]
     * - The initialization timed out: [[UnbluErrorCategory.INITIALIZATION_FAILED]]
     * - The unblu API is incompatible with the unblu server: [[UnbluErrorCategory.INCOMPATIBLE_UNBLU_VERSION]]
     * - The browser is unsupported: [[UnbluErrorCategory.UNSUPPORTED_BROWSER]]
     */
    UnbluStaticApi.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.state === "INITIALIZED" /* INITIALIZED */) {
                    return [2 /*return*/, this.initializedApi];
                }
                else if (this.state === "INITIALIZING" /* INITIALIZING */) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.on(UnbluStaticApi.READY, resolve);
                            _this.on(UnbluStaticApi.ERROR, reject);
                        })];
                }
                else {
                    return [2 /*return*/, this.initializeApi()];
                }
                return [2 /*return*/];
            });
        });
    };
    UnbluStaticApi.prototype.initializeApi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apiBridge, internalApi, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.state = "INITIALIZING" /* INITIALIZING */;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!!UnbluUtil.isUnbluLoaded()) return [3 /*break*/, 3];
                        if (!this.configuration) {
                            throw new UnbluApiError("CONFIGURATION_MISSING" /* CONFIGURATION_MISSING */, 'No unblu snippet present and no configuration provided. Use configure if you want to initialize unblu without having the unblu snippet loaded.');
                        }
                        if (this.configuration.namedArea) {
                            UnbluUtil.setNamedArea(this.configuration.namedArea);
                        }
                        if (this.configuration.locale) {
                            UnbluUtil.setLocale(this.configuration.locale);
                        }
                        return [4 /*yield*/, this.injectUnblu(this.configuration)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        apiBridge = new ApiBridge(UnbluUtil.getUnbluObject());
                        return [4 /*yield*/, apiBridge.waitUntilLoaded(this.configuration ? this.configuration.initTimeout || 30000 : 30000)];
                    case 4:
                        _a.sent();
                        internalApi = new InternalApi(apiBridge);
                        internalApi.checkCompatibility();
                        this.initializedApi = new UnbluApi(internalApi);
                        this.state = "INITIALIZED" /* INITIALIZED */;
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this.handleError(e_1);
                        return [3 /*break*/, 6];
                    case 6:
                        this.eventEmitter.emit(UnbluStaticApi.READY, this.initializedApi);
                        return [2 /*return*/, this.initializedApi];
                }
            });
        });
    };
    UnbluStaticApi.prototype.injectUnblu = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var serverUrl, apiKey, unbluPath, unbluUrl, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serverUrl = config.serverUrl || '';
                        apiKey = config.apiKey || '';
                        unbluPath = config.entryPath || '/unblu';
                        unbluUrl = "" + serverUrl + unbluPath + "/visitor.js?x-unblu-apikey=" + apiKey;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UnbluUtil.loadScript(unbluUrl, config.initTimeout)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        throw new UnbluApiError("ERROR_LOADING_UNBLU" /* ERROR_LOADING_UNBLU */, 'Error loading unblu snippet: ' + e_2 + ' check the configuration: ' + config);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UnbluStaticApi.prototype.handleError = function (error) {
        this.state = "ERROR" /* ERROR */;
        this.eventEmitter.emit(UnbluStaticApi.ERROR, error);
        console.error(error);
        throw error;
    };
    /**
     * Event emitted as soon as the API is initialized.
     *
     * It usually makes sense to use this event if there is some general action that has to be triggered when the API is initialized,
     * but there are several places in the integration code that may trigger the initialization.
     *
     * In most cases however, it is better to use
     * ```ts
     * unblu.api.initialize().then(api => { //use api here });
     * ```
     * or
     * ```ts
     * let api = await unblu.api.initialize();
     * // use api here
     * ```
     *
     * @event ready
     * @see [[on]] for listener registration
     */
    UnbluStaticApi.READY = 'ready';
    /**
     * Event emitted if the API initialization fails.
     *
     * It usually makes sense to use this event if there is some general action that has to be triggered when the API initialization fails,
     * but there are several places in the integration code that may trigger the initialization.
     *
     * In most cases however, it is better to use
     * ```ts
     * unblu.api.initialize().catch(error=> { //handle error here });
     * ```
     * or
     * ```ts
     * try{
     *      let api = await unblu.api.initialize();
     * }catch(e){
     *     // handle error here
     * }
     *
     * ```
     *
     * @event error
     * @see [[on]] for listener registration
     */
    UnbluStaticApi.ERROR = 'error';
    return UnbluStaticApi;
}());
export { UnbluStaticApi };
//# sourceMappingURL=unblu-static-api.js.map