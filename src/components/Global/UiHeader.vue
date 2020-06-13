<template>
    <b-navbar class="is-fixed-bottom">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                bitdust
            </b-navbar-item>
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';
    import {IdentityInterface, IdentityResultInterface} from '@/types/apiTypes';

    const applicationModule = namespace('application');

    @Component
    export default class UiHeader extends Vue {
        @applicationModule.State user!: IdentityResultInterface;
        @applicationModule.State identity!: IdentityInterface;
    }
</script>
