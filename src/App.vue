<template>
    <div id="app">
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
        <div style="position: absolute; left: 0px; right: 0px;"
             v-bind:style="this.$route.name != 'loading' ? 'top: 53px; height: calc(100% - 53px);' : 'top: 0px; height: 100%;'"
        >
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';
    import {IdentityResultInterface} from '@/types/apiTypes';
    import {namespace} from 'vuex-class';
    import UserDetails from '@/components/Global/UserDetails.vue';

    const applicationModule = namespace('applicationStore');

    @Component({
        components: {UserDetails}
    })
    export default class App extends Vue {
        @applicationModule.State identity!: IdentityResultInterface;

        windowHeight = 0;

        mounted() {
            console.log('mounted');
            // window.addEventListener('resize', this.onResize);
        }

        beforeDestroy() {
            // window.removeEventListener('resize', this.onResize);
        }

        onResize() {
            console.log('onResize', window.innerHeight);
            this.windowHeight = window.innerHeight;
        }

        @Watch('windowHeight')
        onWindowHeightChanged(value: string, oldValue: string) {
            console.log('onWindowHeightChanged', value, oldValue);
        }
    }
</script>
