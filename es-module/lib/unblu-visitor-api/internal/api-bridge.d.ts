import { EventCallback } from './event';
export declare class ApiBridge {
    private mountPoint;
    private internal;
    private readonly eventHandler;
    /**
     * instantiates the bridge that links the UNBLU internal API provided by the collaboration server with the UNBLU JS-API
     * @param mountPoint the global unblu object under which the internal API is registered.
     */
    constructor(mountPoint: any);
    waitUntilLoaded(timeout: number, promise?: Promise<void>): Promise<void>;
    private checkLoaded;
    checkCompatibility(): void;
    /**
     * Calls an API function of the internal unblu collaboration server API.
     * @param moduleName The module to which the function belongs.
     * @param functionName The function to call.
     * @param args The arguments to pass to the function.
     */
    callApiFunction(moduleName: string, functionName: string, args: any[]): Promise<any>;
    /**
     * Registers a callback for an event emitted by the internal unblu collaboration server API.
     * @param module The module that emits the event.
     * @param event The event name.
     * @param callback The callback which will be called every time the event is emitted.
     */
    on(module: string, event: string, callback: EventCallback): Promise<void>;
    /**
     * Unregisters a callback for an event emitted by the internal unblu collaboration server API.
     * @param module The module that emits the event.
     * @param event The event name.
     * @param callback Optionally callback which will be removed, if none is provided all listeners of the event will be removed.
     */
    off(module: string, event: string, callback?: EventCallback): Promise<void>;
}
