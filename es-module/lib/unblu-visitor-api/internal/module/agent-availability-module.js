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
import { InternalModule } from './module';
var AgentAvailabilityModule = /** @class */ (function (_super) {
    __extends(AgentAvailabilityModule, _super);
    function AgentAvailabilityModule(bridge) {
        return _super.call(this, bridge, 'agentavailability') || this;
    }
    AgentAvailabilityModule.prototype.isAgentAvailable = function () {
        return this.callApiFunction("isAgentAvailable" /* isAgentAvailable */, []);
    };
    AgentAvailabilityModule.prototype.getAgentAvailabilityState = function () {
        return this.callApiFunction("getAgentAvailabilityState" /* getAgentAvailabilityState */, []);
    };
    return AgentAvailabilityModule;
}(InternalModule));
export { AgentAvailabilityModule };
//# sourceMappingURL=agent-availability-module.js.map