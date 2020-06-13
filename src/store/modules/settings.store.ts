import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {SettingsStateInterface} from '@/types/settingTypes';
import api from '@/services/api.service';

function getKeyName(key: string): string {
    const regex = /^[^/]+/g;
    let result = regex.exec(key);
    if (!result) return '';
    return result[0];
}

function getServiceKeyName(key: string): string {
    if (!key) return '';
    const regex = /\/(.*)(\/)/g;
    let result = regex.exec(key);
    if (!result) return '';
    return result[1];
}

export const state: SettingsStateInterface = {
    configList: [],
    serviceList: []
};

const getters: GetterTree<SettingsStateInterface, any> = {
    getConfigKeys: state => {
        let results:string[] = [];
        state.configList.filter(item => {
            let itemKey = getKeyName(item.key);
            if (!results.find(result => result === itemKey || itemKey === 'services')) {
                results.push(itemKey);
            }
        });
        return results;
    },
    getServiceByKey: state => {
        return (key: string) => {
            return state.serviceList.find(item => key === item.name);
        };
    },
    getConfigForKey: state => {
        return (keyName: string) => {
            return state.configList.filter(item => getKeyName(item.key) === keyName);
        };
    },
    getServiceConfigForKey: (state, getters) => {
        return (key: string) => {
            key = key.replace('service_', '').replace('_', '-');
            return getters.getConfigForKey('services').find((item: any) => getServiceKeyName(item.key) === key);
        };
    }
};

const mutations: MutationTree<SettingsStateInterface> = {
    updateConfigList(state, value) {
        state.configList = value;
    },
    updateServiceList(state, value) {
        state.serviceList = value;
    }
};

const actions: ActionTree<SettingsStateInterface, any> = {
    async updateConfigList({commit}) {
        const {result} = await api.getConfigList();
        commit('updateConfigList', result);
    },
    async updateServiceList({commit}) {
        const {result} = await api.getServiceList();
        commit('updateServiceList', result);
    }
};

export const settingsStore: Module<SettingsStateInterface, any> = {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
};
