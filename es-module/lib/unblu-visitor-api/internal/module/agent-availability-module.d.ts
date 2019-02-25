import { InternalModule } from './module';
import { ApiBridge } from '../api-bridge';
import { AgentAvailabilityState } from '../../model/agent-availability-state';
export declare type AgentAvailabilityEventType = 'availabilityChange';
declare const enum AgentAvailabilityFunction {
    isAgentAvailable = "isAgentAvailable",
    getAgentAvailabilityState = "getAgentAvailabilityState"
}
export declare class AgentAvailabilityModule extends InternalModule<AgentAvailabilityFunction, AgentAvailabilityEventType> {
    constructor(bridge: ApiBridge);
    isAgentAvailable(): Promise<boolean>;
    getAgentAvailabilityState(): Promise<AgentAvailabilityState>;
}
export {};
