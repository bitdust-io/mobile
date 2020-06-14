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
        <div id="app-inner" style="position: absolute; left: 0px; right: 0px;"
             v-bind:style="{ top: windowTop + 'px', height: windowHeight + 'px' }"
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

        windowTop = 0;
        windowHeight = 0;

        mounted() {
            console.log('mounted');
            this.onResize();
            window.addEventListener('resize', this.onResize);
        }

        beforeDestroy() {
            console.log('beforeDestroy');
            window.removeEventListener('resize', this.onResize);
        }

        onResize() {
            console.log('onResize', window.innerHeight, this.$route.name);
            if (this.$route.name !== 'loading') {
                this.windowHeight = window.innerHeight - 53;
                this.windowTop = 53;
            } else {
                this.windowHeight = window.innerHeight;
                this.windowTop = 0;
            }
        }

        @Watch('windowHeight')
        onWindowHeightChanged(value: string, oldValue: string) {
            console.log('onWindowHeightChanged', value, oldValue);
        }
    }
</script>
