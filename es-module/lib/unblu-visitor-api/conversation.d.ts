import { InternalApi } from './internal/internal-api';
import { CallState } from './model/call-state';
import { ConversationEventType } from './internal/module/conversation-module';
import { Listener } from './internal/util/event-emitter';
import { ConversationState } from './model/conversation-state';
import { ConnectionState } from './model/connection-state';
export declare type ConnectionStateListener = (connectionState: ConnectionState) => void;
export declare type CallStateListener = (callState: CallState) => void;
/**
 * #### This class gives API access to the currently active conversation.
 *
 * As long as a conversation is active one can register and receive the events provided by this class and call the methods.
 * Once the conversation is closed this API object will be destroyed and no more event callbacks will be called.
 * Any subsequent calls will fail.
 *
 * Use the [[CLOSE]] event to de-init any code connected to this conversation.
 */
export declare class Conversation {
    private internalApi;
    private conversationId;
    /**
     * Event emitted when the [[ConnectionState]] of this conversation changes.
     * @event connectionStateChange
     * @see [[on]] for listener registration
     */
    static readonly CONNECTION_STATE_CHANGE: 'connectionStateChange';
    /**
     * Event emitted when the [[CallState]] of this conversation changes.
     * @event callStateChange
     * @see [[on]] for listener registration
     */
    static readonly CALL_STATE_CHANGE: 'callStateChange';
    /**
     * Event emitted when the conversation ends.
     *
     * @event end
     * @see [[on]] for listener registration
     */
    static readonly END: 'end';
    /**
     * Event emitted when the conversation is closed.
     *
     * This may happen due to a UI-navigation or an API-call.
     *
     * @event close
     * @see [[on]] for listener registration
     */
    static readonly CLOSE: 'close';
    private eventEmitter;
    private internalListeners;
    private destroyed;
    /**
     * @hidden
     */
    constructor(internalApi: InternalApi, conversationId: string);
    /**
     * Registers an event listener for the given event.
     * @param event The call state change event.
     * @param listener The listener to be called.
     * @see [[CONNECTION_STATE_CHANGE]]
     */
    on(event: typeof Conversation.CONNECTION_STATE_CHANGE, listener: ConnectionStateListener): void;
    /**
     * Registers an event listener for the given event.
     * @param event The call state change event.
     * @param listener The listener to be called.
     * @see [[CALL_STATE_CHANGE]]
     */
    on(event: typeof Conversation.CALL_STATE_CHANGE, listener: CallStateListener): void;
    /**
     * Registers an event listener for the given event.
     * @param event The end event.
     * @param listener The listener to be called.
     * @see [[END]]
     */
    on(event: typeof Conversation.END, listener: () => void): void;
    /**
     * Registers an event listener for the given event.
     * @param event The close event.
     * @param listener The listener to be called.
     * @see [[CLOSE]]
     */
    on(event: typeof Conversation.CLOSE, listener: () => void): void;
    /**
     * Removes a previously registered listener
     * @param event The event to unregister from.
     * @param listener The listener to remove.
     */
    off(event: ConversationEventType, listener: Listener): boolean;
    private onInternal;
    private offInternal;
    /**
     * Returns the ID of this conversation.
     */
    getConversationId(): string;
    /**
     * Returns the current connection state the conversation is in.
     *
     * If the connection is lost, the conversation will automatically try to reconnect using an exponential back-off strategy.
     * If a fatal error is detected, the state will change to [[ConnectionState.ERROR]].
     *
     * If this happens, the conversation is in it's terminal state. A dialog or other UI will be displayed to the user with details on the failure.
     * The conversation is not automatically closed in this case.
     * It may either be closed through a manual action by the visitor (confirming the error) or via the API.
     *
     * @see [[CONNECTION_STATE_CHANGE]] If you need to listen to changes.
     * @return A promise that resolves to the current connection state of the conversation
     * or is rejected with a [[UnbluApiError]] if the call fails.
     */
    getConnectionState(): Promise<ConnectionState>;
    /**
     * Returns the current state the conversation is in.
     * @see [[END]]  If you need to listen to changes of the end event.
     * @return A promise that resolves to the current state of the conversation
     * or is rejected with a [[UnbluApiError]] if the call fails.
     */
    getConversationState(): Promise<ConversationState>;
    /**
     * @see [[CALL_STATE_CHANGE]] If you need to listen to changes.
     * @return A promise that resolves to the current call state of the local user
     * or is rejected with a [[UnbluApiError]] if the call fails.
     */
    getCallState(): Promise<CallState>;
    /**
     * Starts a voice call in this conversation.
     *
     * - If a call is already active, this call will be ignored.
     * - If the local person doesn't have the right to start a voice call,
     * the returned promise will be rejected with the unblu error category [[UnbluErrorCategory.ACTION_NOT_GRANTED]].
     * @see [[CALL_STATE_CHANGE]] If you need to listen to changes.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    startAudioCall(): Promise<void>;
    /**
     * Starts a video call in this conversation.
     *
     * - If a call is already active, this call will be ignored.
     * - If the local person doesn't have the right to start a video call,
     * the returned promise will be rejected with the unblu error category [[UnbluErrorCategory.ACTION_NOT_GRANTED]].
     * @see [[CALL_STATE_CHANGE]] If you need to listen to changes.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    startVideoCall(): Promise<void>;
    /**
     * Ends and closes this conversation.
     *
     * If the local person doesn't have the right to end the conversation,
     * the returned promise will be rejected with the unblu error category [[UnbluErrorCategory.ACTION_NOT_GRANTED]].
     * @see [[END]] fired after this call.
     * @see [[closeConversation]] for details on closing a conversation.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    endConversation(): Promise<void>;
    /**
     * Leaves and closes this conversation.
     *
     * By leaving, the visitor is removed from the active participant list of the conversation.
     * Once a conversation is left, the visitor can not re-open it. It will not be visible in the conversation history either.
     *
     * If the local person doesn't have the right to leave the conversation,
     * the returned promise will be rejected with the unblu error category [[UnbluErrorCategory.ACTION_NOT_GRANTED]].
     * @see [[CLOSE]] fired after this call.
     * @see [[closeConversation]] for details on closing a conversation without leaving.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    leaveConversation(): Promise<void>;
    /**
     * Closes this conversation locally.
     *
     * When called, the connection to this conversation is closed and the overview is displayed.
     *
     * **Note that:**
     * - Closing does NOT end the conversation.
     * - The person does NOT leave the conversation.
     * - All Conversation api instances for this conversation will be destroyed.
     *
     * The conversation can be joined again either via the UI or using [[UnbluApi.openConversation]].
     * @see [[CLOSE]] fired after this call.
     * @see [[endConversation]] for details on ending a conversation.
     * @see [[leavingConversation]] for details on leaving a conversation.
     * @see [[destroy]] for details on destroying a conversation.
     * @return A Promise that resolves to null or is rejected with a [[UnbluApiError]] if the call fails.
     */
    closeConversation(): Promise<void>;
    private checkNotDestroyed;
    /**
     * Returns weather this conversation is destroyed or not.
     *
     * Conversations are either destroyed if [[destroy]] is called or the conversation is closed.
     * This usually happens when the user navigates back to an overview or into an other conversation.
     * @see [[destroy]]
     * @see [[CLOSE]]
     * @return Weather this conversation is destroyed or not.
     */
    isDestroyed(): boolean;
    /**
     * Destroys this conversation API instance.
     *
     * Calling destroy will unregister all event listeners and prohibit any further calls to this object.
     * Once the conversation is destroyed, any subsequent calls will reject the returned promise with [[UnbluErrorCategory.ILLEGAL_STATE]] as reason.
     *
     * **Note that:**
     * - Destroying does NOT close the conversation .
     * - Destroying does NOT end the conversation.
     * - Destroying does NOT leave the conversation.
     * - Other instances of the same Conversation will NOT be destroyed.
     *
     * This call simply destroys this local API instance to the conversation.
     *
     * A destroyed but still open conversation can be accessed again using [[UnbluApi.getActiveConversation]].
     *
     * @see [[isDestroyed]]
     * @see [[closeConversation]] for details on how to close a conversation
     * @see [[endConversation]] for details on how to end a conversation
     */
    destroy(): void;
}
