import { ApiBridge } from '../api-bridge';
import { EventCallback } from '../event';
export declare class InternalModule<T extends string, E extends string> {
    private bridge;
    moduleName: string;
    constructor(bridge: ApiBridge, moduleName: string);
    protected callApiFunction(functionName: T, args: any[]): Promise<any>;
    on(eventName: E, listener: EventCallback): Promise<void>;
    off(eventName: E, listener: EventCallback): Promise<void>;
}
