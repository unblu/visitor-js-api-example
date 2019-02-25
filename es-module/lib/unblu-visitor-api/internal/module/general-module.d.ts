import { InternalModule } from './module';
import { ApiBridge } from '../api-bridge';
import { PersonInfo } from '../../model/person-info';
import { ConversationType } from '../../model/conversation-type';
export declare type GeneralEventType = 'activeConversationChange' | 'notificationCountChange' | 'personChange';
declare const enum GeneralFunction {
    startConversation = "startConversation",
    joinConversation = "joinConversation",
    openConversation = "openConversation",
    getActiveConversation = "getActiveConversation",
    getNotificationCount = "getNotificationCount",
    getPersonInfo = "getPersonInfo"
}
export declare class GeneralModule extends InternalModule<GeneralFunction, GeneralEventType> {
    constructor(bridge: ApiBridge);
    startConversation(type: ConversationType, visitorName?: string): Promise<string>;
    joinConversation(pin: string, visitorName?: string): Promise<string>;
    openConversation(conversationId: string): Promise<void>;
    getActiveConversation(): Promise<string>;
    getNotificationCount(): Promise<number>;
    getPersonInfo(): Promise<PersonInfo>;
}
export {};
