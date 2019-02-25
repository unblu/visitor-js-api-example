import { UnbluApi } from './unblu-api';
import { Conversation } from './conversation';
import { UnbluStaticApi } from './unblu-static-api';
import { UnbluUtil } from './unblu-util';
export { UnbluApi } from './unblu-api';
export { Conversation } from './conversation';
var unblu = (UnbluUtil.getUnbluObject() || UnbluUtil.createUnbluObject());
unblu.UnbluApi = UnbluApi;
unblu.Conversation = Conversation;
/**
 * The central access point to the unblu JS API.
 * This api object gives static access to configure and initialize the full unblu `UnbluApi`.
 * When loaded in the global space use `Unblu.Api` to access it.
 * @hidden
 */
export var api = new UnbluStaticApi();
//# sourceMappingURL=index.js.map