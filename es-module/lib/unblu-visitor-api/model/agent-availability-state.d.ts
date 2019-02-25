export declare const enum AgentAvailabilityState {
    /**
     * There is at least one agent available for the specified named area and language.
     */
    AVAILABLE = "AVAILABLE",
    /**
     * There is at least one agent watching the inbound queue for the specified named area and language but the max capacity of pararallel conversations is reached.
     *
     * It is very likely, that an agent will be available in a short time.
     */
    BUSY = "BUSY",
    /**
     * There is no agent watching the inbound queue for the specified named area and language.
     *
     * It is unlikely, that an agent will be available in a short time.
     */
    UNAVAILABLE = "UNAVAILABLE",
    /**
     * There is currently no agent handling any inbound queue items.
     *
     * It is very unlikely, that an agent will be available in a short time.
     */
    OFFLINE = "OFFLINE"
}
