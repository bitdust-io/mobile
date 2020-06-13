import api from './api.service';
import store from '@/store';
import router from '@/router';

let apiHealthNotResponding = 0;
const wsUri = 'ws://localhost:8280/';
const websocket = new WebSocket(wsUri);
websocket.onopen = () => ApplicationService.startSockets();
websocket.onclose = () => console.log('CLOSED');
websocket.onerror = (e) => console.log('ERROR', e);
websocket.onmessage = (m) => ApplicationService.onMessage(m);

const ApplicationService = {

    bootstrap() {
        this.keepHeath();
    },

    async handleMissingIdentity() {
        await store.dispatch('applicationStore/updateIdentity', api.constants.ERROR);
        if (router.currentRoute.name !== 'create-identity') {
            await router.push('/create-identity');
        }
    },
    async keepHeath() {
        try {
            const {status} = await api.processHealth();
            await store.dispatch('applicationStore/updateHealthStatus', status);
            if (status === 'OK') {
                if (!store.state.applicationStore.identity || !store.state.applicationStore.identity.name) {
                    try {
                        const [identity, user] = await Promise.all([api.getIdentity(), api.getUserPersonalDetails()]);
                        if (identity.status === 'ERROR') {
                            this.handleMissingIdentity();
                        }
                        await store.dispatch('applicationStore/updateIdentity', identity.result);
                        await store.commit('applicationStore/updateUser', user.result[0]);
                        await store.dispatch('chatStore/getFriends');
                    } catch (e) {
                        console.log('getIdentity', e);
                        this.handleMissingIdentity();
                    }
                } else {
                    try {
                        const {status} = await api.networkConnected();
                        await store.dispatch('applicationStore/updateConnectionStatus', status);
                    } catch (e) {
                        console.log('networkConnected', e);
                        await store.dispatch('applicationStore/updateConnectionStatus', api.constants.ERROR);
                    }
                }
            }

            apiHealthNotResponding = 0;
        } catch (e) {
            await store.dispatch('applicationStore/updateHealthStatus', api.constants.ERROR);
            console.log('Error trying to connect health check ' + e);
            apiHealthNotResponding += 1;
        }

        if (apiHealthNotResponding > 10 && router.currentRoute.name !== 'dead') {
            await router.push('/dead');
        }

        setTimeout(() => {
            this.keepHeath();
        }, 500);
    },

    onMessage(message: MessageEvent): void {
        const data = JSON.parse(message.data);
        console.log(JSON.stringify(data, null, 0));
        switch (data.type) {
            case 'stream_message':
                if (data.payload.payload.data.msg_type === 'private_message') {
                    store.dispatch('chatStore/updateMessages', data.payload);
                }
                break;
            // default:
                // console.log(message);
        }
    },

    startSockets() {
        console.log('Socket is open');
        // websocket.send('{"command": "api_call", "method": "message_history", "kwargs": {"user": "severino@p2p-id.ru"}, "call_id": "2”}');
        // websocket.send('{"command": "api_call", "method": "message_history", "kwargs": {"user": "severino@p2p-id.ru"}, "call_id": "123"}');
        // websocket.send('{"command": "api_call", "method": "friend_list", "call_id": "friends_list"}');
    }
};

export default ApplicationService;
