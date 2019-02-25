// Typedef Helpers
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
/**
 * @hidden
 */
var UnbluUtil = /** @class */ (function () {
    function UnbluUtil() {
    }
    UnbluUtil.loadScript = function (uri, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var timeoutTime, script;
            return __generator(this, function (_a) {
                timeoutTime = timeout || 30000;
                script = document.createElement('script');
                script.setAttribute('charset', 'UTF-8');
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('async', 'true');
                script.setAttribute('timeout', timeoutTime.toString());
                script.src = uri;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var timeoutId;
                        var cleanup = function () {
                            // avoid mem leaks in IE.
                            script.onerror = script.onload = null;
                            window.clearTimeout(timeoutId);
                        };
                        var onError = function (error) {
                            cleanup();
                            console.error('Failed to load script! Uri:', uri, 'Error:', error);
                            reject(error);
                        };
                        script.onload = function () {
                            cleanup();
                            resolve();
                        };
                        script.onerror = onError;
                        timeoutId = window.setTimeout(function () { return onError('Timeout'); }, timeoutTime);
                        var head = document.getElementsByTagName('HEAD')[0];
                        head.appendChild(script);
                    })];
            });
        });
    };
    UnbluUtil.setNamedArea = function (namedArea) {
        var metaTag = window.document.querySelector('meta[name="unblu:named-area"]') || window.document.createElement('meta');
        metaTag.setAttribute('content', namedArea);
        if (!metaTag.parentElement) {
            window.document.head.appendChild(metaTag);
        }
    };
    UnbluUtil.setLocale = function (locale) {
        // unblu.l will be read in user-locale-util.js
        UnbluUtil.getUnbluObject().l = locale;
    };
    UnbluUtil.isUnbluLoaded = function () {
        return UnbluUtil.getUnbluObject() && !!UnbluUtil.getUnbluObject().APIKEY;
    };
    UnbluUtil.getUnbluObject = function () {
        return window.unblu;
    };
    UnbluUtil.createUnbluObject = function () {
        return window.unblu = {};
    };
    return UnbluUtil;
}());
export { UnbluUtil };
//# sourceMappingURL=unblu-util.js.map