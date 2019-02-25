import { api as unblu } from "../lib/unblu-visitor-api";
import { ConversationType } from "../lib/unblu-visitor-api/model/conversation-type";

const unbluBinding = async () => {
    // initialize the api;
    const api = await unblu.initialize();
    // chat
    const chatBtn = document.getElementById('start-chat');
    chatBtn.addEventListener('click', () => api.startConversation(ConversationType.CHAT_REQUEST));
    // audio
    const audioBtn = document.getElementById('start-audio-call');
    audioBtn.addEventListener('click', () => api.startConversation(ConversationType.AUDIO_REQUEST));
    // video
    const videoBtn = document.getElementById('start-video-call');
    videoBtn.addEventListener('click', () => api.startConversation(ConversationType.VIDEO_REQUEST));
    // PIN
    const pinBtn = document.getElementById('join');
    const pinInput = document.getElementById('pin-entry');
    pinBtn.addEventListener('click', async () => {
        const conversation = await api.joinConversation(pinInput.value);
        console.log('Joined conversation: ', conversation.getConversationId());
        // reset the value
        pinInput.value = '';
    });
};

unbluBinding().catch(e => console.error('Error initializing unblu: ',e));
