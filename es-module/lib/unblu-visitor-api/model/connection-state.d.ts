export declare const enum ConnectionState {
    /**
     * Initial state before connection establishment has started
     */
    INITIAL = "INITIAL",
    /**
     * State during the first connection to the server
     */
    CONNECTING = "CONNECTING",
    /**
     * The connection has been successfully established.
     */
    CONNECTED = "CONNECTED",
    /**
     * The connection has been lost, reconnect is active.
     */
    RECONNECTING = "RECONNECTING",
    /**
     * The connection has been successfully closed.
     *
     */
    CLOSED = "CLOSED",
    /**
     * A fatal error has occurred. The connection has been permanently lost. No reconnect will be be possible.
     */
    ERROR = "ERROR"
}
