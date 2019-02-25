import { InternalApi } from './internal/internal-api';
import { GeneralEventType } from './internal/module/general-module';
import { Conversation } from './conversation';
import { PersonInfo } from './model/person-info';
import { Listener } from './internal/util/event-emitter';
import { ConversationType } from './model/conversation-type';
import { AgentAvailabilityState } from './model/agent-availability-state';
import { AgentAvailabilityEventType } from './internal/module/agent-availability-module';
/**
 * Listener called whenever the active conversation changes.
 *
 * **Note:** If no conversation is currently active the passed conversation object will be `null`
 * @param conversation API object for the active conversation or `null` if no conversation is active.
 */
export declare type ConversationChangeListener = (conversation?: Conversation) => void;
/**
 * Listener called whenever the notification count of a person (i.e. unread messages) changes.
 * @param count The number of unseen notifications.
 */
export declare type NotificationCountChangeListener = (count: number) => void;
/**
 * Listener called whenever the local person changes.
 * @param person Info about the person.
 */
export declare type PersonChangeListener = (person: PersonInfo) => void;
/**
 * Listener called whenever the agent availability changes.
 * @param availability The new availability.
 */
export declare type AgentAvailabilityChangeListener = (availability: AgentAvailabilityState) => void;
/**
 * #### This class represents the initialized unblu JS API for site integration.
 *
 * There is only ever one instance of this api which can be retrieved via `unblu.api.initialize()`,
 * see [[UnbluStaticApi]] for more details on configuring and initializing the UnbluApi.
 *
 * The Api connects to a integrated version of unblu. All actions performed via the UnbluApi are executed in
 * the name of and with the rights of current visitor and may have direct effect on the displayed unblu UI.
 *
 * For example if a conversation is started from the UnbluApi, the unblu UI will navigate to it.
 * If a conversation is closed via the Api, it will also be closed on the unblu UI of the visitor.
 * For more information on UI side effects please check the documentation for each method call.
 *
 *  For programmatic admin access and configuration of unblu please use the unblu WebApi.
 */
export declare class UnbluApi {
    private internalApi;
    /**
     * Event emitted every time the active conversation changed.
     *
     * This may happen due to a UI-navigation or an API-call.
     *
     * @event activeConversationChange
     * @see [[on]] for listener registration
     * @see [[ConversationChangeListener]]
     */
    static readonly ACTIVE_CONVERSATION_CHANGE: 'activeConversationChange';
    /**
     * Event emitted every time the notification count (unread messages) changes.
     *
     * @event notificationCountChange
     * @see [[on]] for listener registration
     * @see [[NotificationCountChangeListener]]
     */
    static readonly NOTIFICATION_COUNT_CHANGE: 'notificationCountChange';
    /**
     * Event emitted every time the local person changes. This may be i.e. due to the person setting its name.
     *
     * @event personChange
     * @see [[on]] for listener registration
     * @see [[PersonChangeListener]]
     */
    static readonly PERSON_CHANGE: 'personChange';
    /**
     * Event emitted every time the agent availability changes for the current named area and locale.
     *
     * @event availabilityChange
     * @see [[on]] for listener registration
     * @see [[AgentAvailabilityChangeListener]]
     */
    static readonly AGENT_AVAILABILITY_CHANGE: 'availabilityChange';
    private internalListeners;
    private upgradeListeners;
    private eventEmitter;
    /**
     * @hidden
     */
    constructor(internalApi: InternalApi);
    /**
     * Registers an event listener for the given event.
     * @param event The activeConversationChange event.
     * @param listener The listener to be called.
     * @see [[ACTIVE_CONVERSATION_CHANGE]]
     */
    on(event: typeof UnbluApi.ACTIVE_CONVERSATION_CHANGE, listener: ConversationChangeListener): void;
    /**
     * Registers an event listener for the given event.
     * @param event The notificationCountChange event.
     * @param listener The listener to be called.
     * @see [[NOTIFICATION_COUNT_CHANGE]]
     */
    on(event: typeof UnbluApi.NOTIFICATION_COUNT_CHANGE, listener: NotificationCountChangeListener): void;
    /**
     * Registers an event listener for the given event.
     * @param event The personChange event.
     * @param listener The listener to be called.
     * @see [[PERSON_CHANGE]]
     */
    on(event: typeof UnbluApi.PERSON_CHANGE, listener: PersonChangeListener): void;
    /**
     * Registers an event listener for the given event.
     * @param event The personChange event.
     * @param listener The listener to be called.
     * @see [[PERSON_CHANGE]]
     */
    on(event: typeof UnbluApi.AGENT_AVAILABILITY_CHANGE, listener: AgentAvailabilityChangeListener): void;
    /**
     * Removes a previously registered listener
     * @param event The event to unregister from.
     * @param listener The listener to remove.
     */
    off(event: GeneralEventType | AgentAvailabilityEventType, listener: Listener): boolean;
    private onInternal;
    private offInternal;
    /**
     * Returns information about the visitor.
     * @return A promise that resolves to the current visitors person info.
     */
    getPersonInfo(): Promise<PersonInfo>;
    /**
     * Returns the number of unread messages.
     * @return A promise that resolves to the current number of unread messages.
     */
    getNotificationCount(): Promise<number>;
    /**
     * Starts a new Conversation and places it into the inbound conversation queue.
     *
     * **NOTE:** calling this method will open the unblu UI and navigate to the started conversation.
     *
     * @param type The conversation type that shall be started.
     * @param visitorName The name the local visitor should have. This is only taken into account if the visitor is not already authenticated.
     * @return A promise that resolves to the conversation object giving API access to the started conversation.
     */
    startConversation(type: ConversationType, visitorName?: string): Promise<Conversation>;
    /**
     * Joins an existing conversation with a given PIN.
     *
     * **NOTE:** calling this method will open the unblu UI and navigate to the joined conversation.
     *
     * @param pin The PIN retrieved from tha unblu Agent Desk.
     * @param visitorName The name the local visitor should have. This is only taken into account if the visitor is not already authenticated.
     * @return A promise that resolves to the conversation object giving API access to the joined conversation.
     */
    joinConversation(pin: string, visitorName?: string): Promise<Conversation>;
    /**
     * Opens the existing conversation with the given conversation ID.
     *
     * **NOTE:** calling this method will open the unblu UI and navigate to the opened conversation.
     *
     * @param conversationId The PIN retrieved from tha unblu Agent Desk.
     * @return A promise that resolves to the conversation object giving API access to the opened conversation.
     */
    openConversation(conversationId: string): Promise<Conversation>;
    /**
     * Returns the currently active conversation or `null` if no conversation is active.
     *
     * **NOTE:** calling this method twice while the same conversation is active, will result in two individual conversation API instances being returned.
     * destroying one of them will not cause the other one to also be destroyed. If however the active conversation is closed, all returned Conversation instances will be destroyed.
     *
     * @return A promise that either resolves to the currently active conversation or `null` if no conversation is open.
     * @see [[ACTIVE_CONVERSATION_CHANGE]]
     */
    getActiveConversation(): Promise<Conversation>;
    /**
     * Checks if an agent is available for the current named area and language.
     *
     * @return Promise that resolves to `true` if the availability state is [AVAILABLE](AgentAvailabilityState.AVAILABLE) or [BUSY](AgentAvailabilityState.BUSY), `false` otherwise.
     * @see [[getAgentAvailabilityState]] for a more detailed check.
     */
    isAgentAvailable(): Promise<boolean>;
    /**
     * Returns the current availability state for the current named area and language.
     * @return Promise that resolves to the current availability state.
     * @see [[isAgentAvailable]] for a simpler check.
     */
    getAgentAvailabilityState(): Promise<AgentAvailabilityState>;
    private requireUpgrade;
    private onUpgraded;
}
