<template>
    <div class="create-identity">
        <section class="section">
            <h1 class="title primary has-text-success">
                Welcome to BitDust
            </h1>

            <b-field label="Chose your username"
                     :type="{'is-success': isInputValid, 'is-danger': !isInputValid && isDirty}"
                     message="Min 3 and max 20 characters.<br> Only letters, numbers, dash's and underscores (starting with a letter)">

                <b-input name="identity"
                         v-model="identityName"
                         value="Type your username"
                         maxlength="20"
                         size="is-large"
                         minlength="3"/>
            </b-field>

            <div class="tags has-addons mg-bottom-20" v-if="error">
                <span class="tag is-danger">
                    Error:
                </span>
                <span class="tag is-dark">
                    {{errorMessage}}
                </span>
            </div>

            <div class="buttons mg-top-20">
                <b-button type="is-success is-rounded"
                          size="is-large"
                          @click="createIdentity"
                          :disabled="!isInputValid || isLoading">
                    START
                </b-button>
            </div>
        </section>
        <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ApiService from '@/services/api.service';
    import {namespace} from 'vuex-class';

    const applicationModule = namespace('applicationStore');
    @Component
    export default class CreateIdentity extends Vue {
        identityName = '';
        error = false;
        errorMessage = '';
        isLoading = false;

        @applicationModule.Action updateIdentity!: any;

        validateUserName(value: string): boolean {
            const REGEX = /^[a-z]{1}[a-z0-9-_]{2,19}$/;
            return REGEX.test(value);
        }

        async createIdentity() {
            this.isLoading = true;
            try {
                const resp = await ApiService.createIdentity(this.identityName);
                if (resp.status === 'OK') {
                    await this.updateIdentity('applicationStore/updateIdentity', resp.result[0]);
                    await this.$router.push('loading');
                } else {
                    this.error = true;
                    this.errorMessage = resp.errors[0];
                }
            } catch (e) {
                this.error = true;
                this.errorMessage = e;
            }
            this.isLoading = false;
        }

        get isInputValid() {
            return this.validateUserName(this.identityName);
        }

        get isDirty() {
            return this.identityName.length > 2;
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/config";

    .create-identity {
        display: flex;
        height: 100%;
        flex-direction: column;
        background-image: linear-gradient(-60deg, $color-gray-10 0%, $color-gray-00 100%);
    }

    .buttons {
        justify-content: center;
    }
</style>
