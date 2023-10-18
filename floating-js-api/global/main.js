/// <reference path="typings/floating-js-api.d.ts" />

(function () {
    const ConversationType = window.unblu.ConversationType;
    window.unblu.api.initialize().then(api => {
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
        pinBtn.addEventListener('click', () => {
            api.joinConversation(pinInput.value).then(conversation => {
                console.log('Joined conversation: ', conversation.getConversationId());

                // reset the value
                pinInput.value = '';
            });
        });
    });
})();
