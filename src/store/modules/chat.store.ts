import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {ChatContentInterface, ChatStateInterface} from '@/types/chatTypes';
import api from '@/services/api.service';

export function convertMessage(m: any, globalId: string) {
    const authorIsMe = globalId === m.sender.glob_id.replace('master$', '');
    console.log('convertMessage', authorIsMe, globalId);
    return {
        author: authorIsMe ? 'me' : m.sender.glob_id.replace('master$', ''),
        name: m.sender.glob_id.replace('master$', ''),
        type: m.payload.data.type,
        data: {
            [m.payload.data.type]: m.payload.data.message
        }
    };
}

export const state: ChatStateInterface = {
    messages: [],
    message: <ChatContentInterface>{},
    friends: []
};

const getters: GetterTree<ChatStateInterface, any> = {};

const mutations: MutationTree<ChatStateInterface> = {
    updateMessage(state, v) {
        state.message = v;
    },
    updateMessages(state, v) {
        state.messages.push(v);
    },
    updateFriends(state, v) {
        state.friends = v;
    }
};

const actions: ActionTree<ChatStateInterface, any> = {
    updateMessages({commit, rootState}, v) {
        const message = convertMessage(v, rootState.applicationStore.identity.global_id);
        commit('updateMessage', message);
    },
    async getFriends({commit}) {
        const {result} = await api.getFriends();
        commit('updateFriends', result);
    }
};

export const chatStore: Module<ChatStateInterface, any> = {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
};
