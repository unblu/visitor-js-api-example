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
var UnbluApiError = /** @class */ (function (_super) {
    __extends(UnbluApiError, _super);
    function UnbluApiError(category, detail) {
        var _this = _super.call(this, "category: " + category + ", detail: " + detail) || this;
        _this.category = category;
        _this.detail = detail;
        _this.name = 'UnbluApiError';
        return _this;
    }
    return UnbluApiError;
}(Error));
export { UnbluApiError };
//# sourceMappingURL=unblu-api-error.js.map