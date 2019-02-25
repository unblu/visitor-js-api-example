export declare type Listener = (data?: any) => void;
export declare class EventEmitter {
    private listeners;
    /**
     * Resets the emitter by removing all registered listeners.
     */
    reset(): void;
    /**
     * Adds an event listeners
     * @param event the event to listen to
     * @param listener the listener to be called.
     */
    on(event: string, listener: Listener): void;
    /**
     * removes a previously registered listener
     * @param event the event
     * @param listener the listener that should be removed.
     * @return `true` if the listener was removed, `false` otherwise.
     */
    off(event: string, listener: any): boolean;
    /**
     * removes all listeners for the given event.
     * @param event the event for which all listeners will be removed.
     */
    offAll(event: string): void;
    /**
     * Checks weather at least one listener exists for a given event.
     * @param event the event to check for
     * @return weather or not any listeners for the given event are registered.
     */
    hasListeners(event: string): boolean;
    /**
     * Returns all events that have at least one listeners registered to them.
     * @return An array containing all events that have at least one listener.
     * If no listeners are registered at all, an empty array will be returned.
     */
    getEventsWithListeners(): string[];
    /**
     * Emits an event dispatching it to all listeners registered for it.
     * @param event the event name.
     * @param data the event data.
     */
    emit(event: string, data?: any): void;
}
