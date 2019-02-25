import { UnbluApi } from './unblu-api';
import { Listener } from './internal/util/event-emitter';
export interface Configuration {
    /**
     * An API-Key of the account to be used.
     * This is a mandatory configuration.
     *
     * API keys can be retrieved from the unblu Agent Desk in the settings section.
     * Keep in mind, that an Admin role is needed.
     */
    apiKey: string;
    /**
     * The url of the unblu server to connect to.
     *
     * @default If not set, the domain of the current page will be used.
     */
    serverUrl?: string;
    /**
     * The public path to unblu which will be used in combination with [[serverUrl]] to connect to unblu.
     *
     * @default If not set, '/unblu' will be used.
     */
    entryPath?: string;
    /**
     * The locale to be used for all unblu translation texts.
     *
     * @default If not set, the browsers locale will be used.
     */
    locale?: string;
    /**
     * The named area to be used. The named area determines the agent availability, the queue that conversation requests go to, and the configuration.
     *
     * @default If not set, if the `<meta name="unblu:named-area" content="<your-named-area>"/>` will be used if present and if not, the domain will be used.
     */
    namedArea?: string;
    /**
     * The timeout im milliseconds that should be waited for the unblu integration to load.
     *
     * @default 30'000 (30 seconds).
     */
    initTimeout?: number;
}
export declare const enum ApiState {
    INITIAL = "INITIAL",
    INITIALIZING = "INITIALIZING",
    INITIALIZED = "INITIALIZED",
    ERROR = "ERROR"
}
export declare type ReadyListener = (api: UnbluApi) => void;
export declare type ErrorListener = (e: Error) => void;
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
export declare class UnbluStaticApi {
    private state;
    private error;
    private eventEmitter;
    private configuration;
    private initializedApi;
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
    static readonly READY: 'ready';
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
    static readonly ERROR: 'error';
    /**
     * @hidden
     */
    constructor();
    /**
     * Registers an event listener for the given event.
     *
     * **Note** If the API is already initialized, this listener will be called directly.
     * @param event The ready event
     * @param listener The listener to be called.
     * @see [[READY]]
     */
    on(event: typeof UnbluStaticApi.READY, listener: ReadyListener): void;
    /**
     * Registers an event listener for the given event.
     *
     * **Note** If the API has already failed, this listener will be called directly.
     * @param event The error event
     * @param listener The listener to be called.
     * @see [[ERROR]]
     */
    on(event: typeof UnbluStaticApi.ERROR, listener: ErrorListener): void;
    /**
     * Removes a previously registered listener.
     * @param event The event unregister.
     * @param listener The listener to be removed.
     * @return `true` if the listener was removed, `false` otherwise.
     */
    off(event: string, listener: Listener): boolean;
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
    isConfigurationNeeded(): boolean;
    /**
     * Returns the current state of the API
     * @return the current API state.
     * @see [[isInitialized]] for a simpler check
     */
    getApiState(): ApiState;
    /**
     * Checks whether the API is initialized or not.
     * @return `true` if the API is initialzed, `false` for any other state.
     * @see [[getApiState]] for the full state
     */
    isInitialized(): boolean;
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
    configure(config: Configuration): UnbluStaticApi;
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
    initialize(): Promise<UnbluApi>;
    private initializeApi;
    private injectUnblu;
    private handleError;
}
