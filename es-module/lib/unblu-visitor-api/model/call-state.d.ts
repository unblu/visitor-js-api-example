export declare const enum CallState {
    /**
     * A some one is trying to call, the phone is ringing
     */
    INBOUND = "INBOUND",
    /**
     * You are trying to call someone
     */
    OUTBOUND = "OUTBOUND",
    /**
     * A call is active and the local tab is connected to the call.
     */
    ACTIVE_JOINED = "ACTIVE_JOINED",
    /**
     * A call is active but the local person has declined it.
     */
    ACTIVE_NOT_JOINED = "ACTIVE_NOT_JOINED",
    /**
     * A call is active and the local person has joined it on an other device.
     */
    ACTIVE_JOINED_ELSEWHERE = "ACTIVE_JOINED_ELSEWHERE",
    /**
     * No inbound, outgoing or active call.
     */
    NONE = "NONE"
}
