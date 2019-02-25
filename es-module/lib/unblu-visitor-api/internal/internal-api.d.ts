import { ApiBridge } from './api-bridge';
import { MetaModule } from './module/meta-module';
import { GeneralModule } from './module/general-module';
import { GeneralLazyModule } from './module/general-lazy-module';
import { ConversationModule } from './module/conversation-module';
import { AgentAvailabilityModule } from './module/agent-availability-module';
export declare class InternalApi {
    private bridge;
    meta: MetaModule;
    general: GeneralModule;
    generalLazy: GeneralLazyModule;
    conversation: ConversationModule;
    agentAvailability: AgentAvailabilityModule;
    constructor(bridge: ApiBridge);
    checkCompatibility(): void;
}
