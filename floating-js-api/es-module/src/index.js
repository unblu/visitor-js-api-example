import unblu, {ConversationType} from "@unblu/floating-js-api";

const unbluBinding = async () => {
    // configure and initialize the api;
    const api = await unblu.api
        .configure({
            apiKey: 'MZsy5sFESYqU7MawXZgR_w', // replace with your API key
            serverUrl: 'https://unblu.cloud' // replace with your server URL if running on premises
        })
        .initialize();

    /**
     * @param {ConversationType} convType
     */
    const startConversation = async convType => {
        const agentAvailable = await api.isAgentAvailable();
        if (!agentAvailable) {
            alert("Sorry, no agent available");
            return;
        }
        await api.startConversation(convType);
        await api.ui.openIndividualUi();
    }

    // chat
    const chatBtn = document.getElementById('start-chat');
    chatBtn.addEventListener('click', () => startConversation(ConversationType.CHAT_REQUEST));
    // audio
    const audioBtn = document.getElementById('start-audio-call');
    audioBtn.addEventListener('click', () => startConversation(ConversationType.AUDIO_REQUEST));
    // video
    const videoBtn = document.getElementById('start-video-call');
    videoBtn.addEventListener('click', () => startConversation(ConversationType.VIDEO_REQUEST));

    // PIN
    const pinBtn = document.getElementById('join');
    const pinInput = document.getElementById('pin-entry');
    pinBtn.addEventListener('click', async () => {
        try {
            const conversation = await api.joinConversation(pinInput.value);
            await api.ui.openIndividualUi();
            console.log('Joined conversation: ', conversation.getConversationId());
        } catch (/**@type UnbluApiError*/e) {
            alert(`Error joining conversation: Error Type: ${e.type}\nDetails: ${e.detail}`);
        } finally {
            // reset the value
            pinInput.value = '';
        }
    });
};

unbluBinding().catch(e => console.error('Error initializing unblu: ', e));
