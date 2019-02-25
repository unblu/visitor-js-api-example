/**
 * Category of an unblu error. This can be used to check what kind of error occurred.
 */
export declare const enum UnbluErrorCategory {
    /**
     * Thrown if the browser is not supported by unblu.
     */
    UNSUPPORTED_BROWSER = "UNSUPPORTED_BROWSER",
    /**
     * Thrown if the initialization of the unblu API failed due to a timeout.
     */
    INITIALIZATION_TIMEOUT = "INITIALIZATION_TIMEOUT",
    /**
     * Thrown if the initialization is called with no existing snippet and no configuration.
     */
    CONFIGURATION_MISSING = "CONFIGURATION_MISSING",
    /**
     * Thrown during initialization if the snippet can't be loaded or unblu can't be initialized from the snippet.
     */
    ERROR_LOADING_UNBLU = "ERROR_LOADING_UNBLU",
    /**
     * Thrown if the unblu JS API is not compatible with the unblu collaboration server.
     */
    INCOMPATIBLE_UNBLU_VERSION = "INCOMPATIBLE_UNBLU_VERSION",
    /**
     * Thrown if a function call was invalid.
     * This is usually do to an incompatibility between the unblu JS API and the unblu collaboration server.
     */
    INVALID_FUNCTION_CALL = "INVALID_FUNCTION_CALL",
    /**
     * Thrown if the arguments passed to a function where invalid.
     */
    INVALID_FUNCTION_ARGUMENTS = "INVALID_FUNCTION_ARGUMENTS",
    /**
     * Thrown if a called action is not permitted for the local person.
     * The details message usually has more information about the required permissions.
     */
    ACTION_NOT_GRANTED = "ACTION_NOT_GRANTED",
    /**
     * Thrown if an unexpected exception occurrs during a function execution.
     */
    EXECUTION_EXCEPTION = "EXECUTION_EXCEPTION",
    /**
     * Thrown if a method is called in an invalid context. E.g. if the Object called upon was already destroyed.
     */
    ILLEGAL_STATE = "ILLEGAL_STATE"
}
/**
 * General unblu JS API error class that will be thrown whenever something goes wrong.
 *
 * - Use the [[UnbluApiError.category]] to check what kind of error occurred.
 * - Use the [[UnbluApiError.detail]] for human readable details.
 *
 * Check the documentation of [[UnbluErrorCategory]] for more details on the different categories.
 *
 * Example:
 * ```ts
 * unblu.api.initialize().then(api){
 *      // use the api
 * }).catch(e) {
 *     if(e.category === 'INITIALIZATION_TIMEOUT') {
 *          //retry
 *     } else if(e.category === 'UNSUPPORTED_BROWSER') {
 *          // display unsupported browser dialog
 *     } else {
 *          // show generic error message
 *     }
 * }
 * ```
 *
 * or using async / await:
 *
 * ```ts
 * try {
 *     const api = await unblu.api.initialize();
 *     // use the api
 * } catch(e) {
 *     if(e.category === 'INITIALIZATION_TIMEOUT') {
 *          //retry
 *     } else if(e.category === 'UNSUPPORTED_BROWSER') {
 *          // display unsupported browser dialog
 *     } else {
 *          // show generic error message
 *     }
 * }
 * ```
 */
export declare class UnbluApiError extends Error {
    category: UnbluErrorCategory;
    detail: string;
    constructor(category: UnbluErrorCategory, detail: string);
}
