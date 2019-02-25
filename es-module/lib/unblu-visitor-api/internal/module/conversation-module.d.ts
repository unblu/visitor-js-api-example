import { InternalModule } from './module';
import { ApiBridge } from '../api-bridge';
import { CallState } from '../../model/call-state';
import { ConversationState } from '../../model/conversation-state';
import { ConnectionState } from '../../model/connection-state';
export interface ConversationCallState {
    conversationId: string;
    callState: CallState;
}
export interface ConversationConnectionState {
    conversationId: string;
    connectionState: ConnectionState;
}
export declare type ConversationEventType = 'connectionStateChange' | 'end' | 'close' | 'personChange' | 'callStateChange';
declare const enum ConversationFunction {
    getConnectionState = "getConnectionState",
    getConversationState = "getConversationState",
    getCallState = "getCallState",
    startAudioCall = "startAudioCall",
    startVideoCall = "startVideoCall",
    endConversation = "endConversation",
    leaveConversation = "leaveConversation",
    closeConversation = "closeConversation"
}
export declare class ConversationModule extends InternalModule<ConversationFunction, ConversationEventType> {
    constructor(bridge: ApiBridge);
    getConnectionState(conversationId: string): Promise<ConnectionState>;
    getConversationState(conversationId: string): Promise<ConversationState>;
    getCallState(conversationId: string): Promise<CallState>;
    startAudioCall(conversationId: string): Promise<void>;
    startVideoCall(conversationId: string): Promise<void>;
    endConversation(conversationId: string): Promise<void>;
    leaveConversation(conversationId: string): Promise<void>;
    closeConversation(conversationId: string): Promise<void>;
}
export {};
