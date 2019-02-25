import { UnbluApi } from './unblu-api';
import { Conversation } from './conversation';
import { UnbluStaticApi } from './unblu-static-api';
export { UnbluApi } from './unblu-api';
export { Conversation } from './conversation';
/**
 * The main unblu namespace which gives access to the unblu api.
 *
 * Access:
 * ```javascript
 * window.unblu.api;
 * ```
 *
 * **Note:** all fields inside the unblu namespace except for the [[api]] are not public and may change without any notice.
 */
export interface Unblu {
    /**
     * Access to the unblu API.
     *
     * This field will be available as soon as the unblu API has been loaded.
     */
    api?: UnbluStaticApi;
    UnbluApi?: typeof UnbluApi;
    Conversation?: typeof Conversation;
}
/**
 * Global window scope definition of the unblu namespace on the window.
 * Access:
 * ```javascript
 * window.unblu.api;
 * ```
 */
declare global {
    interface Window {
        /**
         * The main unblu namespace
         */
        unblu: Unblu;
    }
}
/**
 * The central access point to the unblu JS API.
 * This api object gives static access to configure and initialize the full unblu `UnbluApi`.
 * When loaded in the global space use `Unblu.Api` to access it.
 * @hidden
 */
export declare const api: UnbluStaticApi;
