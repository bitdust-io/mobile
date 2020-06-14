<template>
    <div id="app">
        {{ $route.name }}
        <b-navbar class="is-fixed-top" v-show="this.$route.name != 'loading'">
            <template slot="start">
                <b-navbar-item tag="router-link" :to="{ path: '/chat' }">
                    <UserDetails />
                </b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-item tag="router-link" :to="{ path: '/settings' }">
                    settings
                </b-navbar-item>
            </template>
        </b-navbar>
        <div style="position: absolute; left: 0px; right: 0px; bottom: 0px;"
             v-bind:style="this.$route.name != 'loading' ? 'top: 53px;' : 'top: 0px;'">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {IdentityResultInterface} from '@/types/apiTypes';
    import {namespace} from 'vuex-class';
    import UserDetails from '@/components/Global/UserDetails.vue';

    const applicationModule = namespace('applicationStore');

    @Component({
        components: {UserDetails}
    })
    export default class App extends Vue {
        @applicationModule.State identity!: IdentityResultInterface;
    }
</script>
