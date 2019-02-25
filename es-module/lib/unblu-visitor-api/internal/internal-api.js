import { MetaModule } from './module/meta-module';
import { GeneralModule } from './module/general-module';
import { GeneralLazyModule } from './module/general-lazy-module';
import { ConversationModule } from './module/conversation-module';
import { AgentAvailabilityModule } from './module/agent-availability-module';
var InternalApi = /** @class */ (function () {
    function InternalApi(bridge) {
        this.bridge = bridge;
        this.meta = new MetaModule(bridge);
        this.general = new GeneralModule(bridge);
        this.generalLazy = new GeneralLazyModule(bridge);
        this.conversation = new ConversationModule(bridge);
        this.agentAvailability = new AgentAvailabilityModule(bridge);
    }
    InternalApi.prototype.checkCompatibility = function () {
        this.bridge.checkCompatibility();
    };
    return InternalApi;
}());
export { InternalApi };
//# sourceMappingURL=internal-api.js.map