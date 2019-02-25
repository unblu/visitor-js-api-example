var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.listeners = {};
    }
    /**
     * Resets the emitter by removing all registered listeners.
     */
    EventEmitter.prototype.reset = function () {
        this.listeners = {};
    };
    /**
     * Adds an event listeners
     * @param event the event to listen to
     * @param listener the listener to be called.
     */
    EventEmitter.prototype.on = function (event, listener) {
        this.listeners[event] = this.listeners[event] || [];
        if (this.listeners[event].indexOf(listener) === -1)
            this.listeners[event].push(listener);
    };
    /**
     * removes a previously registered listener
     * @param event the event
     * @param listener the listener that should be removed.
     * @return `true` if the listener was removed, `false` otherwise.
     */
    EventEmitter.prototype.off = function (event, listener) {
        var listeners = this.listeners[event] || [];
        var index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * removes all listeners for the given event.
     * @param event the event for which all listeners will be removed.
     */
    EventEmitter.prototype.offAll = function (event) {
        delete this.listeners[event];
    };
    /**
     * Checks weather at least one listener exists for a given event.
     * @param event the event to check for
     * @return weather or not any listeners for the given event are registered.
     */
    EventEmitter.prototype.hasListeners = function (event) {
        return this.listeners[event] != null && this.listeners[event].length > 0;
    };
    /**
     * Returns all events that have at least one listeners registered to them.
     * @return An array containing all events that have at least one listener.
     * If no listeners are registered at all, an empty array will be returned.
     */
    EventEmitter.prototype.getEventsWithListeners = function () {
        var events = [];
        for (var event_1 in this.listeners) {
            if (this.listeners[event_1].length)
                events.push(event_1);
        }
        return events;
    };
    /**
     * Emits an event dispatching it to all listeners registered for it.
     * @param event the event name.
     * @param data the event data.
     */
    EventEmitter.prototype.emit = function (event, data) {
        var listeners = this.listeners[event];
        if (listeners) {
            listeners.forEach(function (l) {
                try {
                    l(data);
                }
                catch (e) {
                    console.warn('Error dispatching event:', event, 'in listener:', l, e);
                }
            });
        }
    };
    return EventEmitter;
}());
export { EventEmitter };
//# sourceMappingURL=event-emitter.js.map