import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {ApplicationStateInterface} from '@/types/applicationTypes';
import {IdentityResultInterface} from '@/types/apiTypes';
import api from '@/services/api.service';

export const state: ApplicationStateInterface = {
    healthStatus: '',
    connectionStatus: '',
    identity: {},
    user: <IdentityResultInterface>{}
};

const getters: GetterTree<ApplicationStateInterface, any> = {
    healthStatus: state => state.healthStatus,
    connectionStatus: state => state.connectionStatus,
    getIdentity: state => state.identity
};

const mutations: MutationTree<ApplicationStateInterface> = {
    updateHealthStatus(state, v) {
        state.healthStatus = v;
    },
    updateConnectionStatus(state, v) {
        state.connectionStatus = v;
    },
    updateIdentity(state, v) {
        state.identity = v;
    },
    updateUser(state, v) {
        state.user = v;
    }
};

const actions: ActionTree<ApplicationStateInterface, any> = {
    updateHealthStatus({commit}, v) {
        commit('updateHealthStatus', v);
    },
    updateConnectionStatus({commit}, v) {
        commit('updateConnectionStatus', v);
    },
    updateIdentity({commit}, v) {
        commit('updateIdentity', v);
    },
    async updateUserFromApi({commit}) {
        const {result} = await api.getUserPersonalDetails();
        commit('updateUser', result[0]);
    }
};

export const applicationStore: Module<ApplicationStateInterface, any> = {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
};
