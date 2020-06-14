import {ApiTypes, HealthInterface, IdentityInterface, MessageInterface, RequestParams} from '@/types/apiTypes';
import {FriendInterface} from '@/types/chatTypes';

const ApiService: ApiTypes = {

    constants: {
        PORT: '8180',
        API_URL: 'http://localhost',
        API_VERSION: 'v1',
        OK: 'OK',
        ERROR: 'ERROR'
    },

    createIdentity(username) {
        return this.makePost('identity/create', {
            'username': username
        });
    },

    removeFriend(id) {
        return this.makeDelete('friend/remove', {
            'global_id': id
        });
    },

    addFriend(id: string) {
        return this.makePost('friend/add', {
            'idurl': id
        });
    },

    searchUser(user: string) {
        return this.makeGet('user/search/' + user);
    },

    getChatHistoryForUser(userGlobalId: string) {
        return this.makeGet('message/history', [{key: 'id', value: userGlobalId}]);
    },

    sendMessage(data: MessageInterface) {
        return this.makePost('message/send', data);
    },

    getMessages() {
        return this.makeGet('message/receive/electron_ui_consumer');
    },

    getFriends(): Promise<Array<FriendInterface>> {
        return this.makeGet('friend/list');
    },

    getUserPersonalDetails(): Promise<any> {
        return this.makeGet('config/get/personal/nickname');
    },

    processHealth(): Promise<HealthInterface> {
        return this.makeGet('process/health');
    },

    getIdentity(): Promise<IdentityInterface> {
        return this.makeGet('identity/get');
    },

    networkConnected(): Promise<any> {
        // console.log('networkConnected');
        return this.makeGet('network/connected', [{key: 'wait_timeout', value: 1}]);
    },

    getConfigList(): Promise<any> {
        return this.makeGet('config/list');
    },

    getConfigKeys(): Promise<any> {
        return this.makeGet('key/list');
    },

    getServiceList(): Promise<any> {
        return this.makeGet('service/list', [{key: 'config', value: 1}]);
    },

    async makePost(service: string, data: any, params?: Array<RequestParams>) {
        return fetch(this.makeApiEndpoint(service, params), {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    makeGet(service: string, params?: Array<any>): Promise<any> {
        return fetch(this.makeApiEndpoint(service, params)).then(r => r.json());
    },

    makeDelete(service: string, data: any, params?: Array<any>): Promise<any> {
        return fetch(this.makeApiEndpoint(service, params), {
            method: 'DELETE',
            body: JSON.stringify(data)
        }).then(r => r.json());
    },

    makeApiEndpoint(service: string, params?: Array<RequestParams>): string {
        const baseUrl = this.constants.API_URL + ':' + this.constants.PORT + '/' + service + '/' + this.constants.API_VERSION;
        const apiUrl = new URL(baseUrl);
        if (params) {
            params.forEach(p => apiUrl.searchParams.append(p.key, p.value));
        }
        return apiUrl.href;
    }
};

export default ApiService;
