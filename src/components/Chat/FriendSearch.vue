<template>
    <div>
        <b-loading
            :is-full-page="true"
            :active.sync="isLoading"
            :can-cancel="true"
        />
        <div class="mg-15">

            <div class="buttons mg-top-20">
                <b-button icon-left="search" type="is-info" size="is-medium"
                          @click="searchFriend">
                    Search for: {{search}}
                </b-button>
            </div>

            <div class="control mg-bottom-20" v-if="noResults">
                <div class="tags has-addons are-medium">
                    <span class="tag is-dark">"{{search}}" was not found</span>
                    <span class="tag is-delete" @click="clearSearch" />
                </div>
            </div>

            <div v-if="searchResult.global_id" class="list">
                <div class="list-item">
                    <p>
                        <FirstLetter :name="searchResult.global_id" size="30" />
                        {{searchResult.nickname}}
                    </p>
                    <b-button icon-left="plus" @click="addFriend" />
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import UserDetails from '@/components/Global/UserDetails.vue';
    import FirstLetter from '@/components/Global/FirstLetter.vue';
    import ApiService from '@/services/api.service';

    @Component({
        components: {FirstLetter, UserDetails}
    })
    export default class FriendSearch extends Vue {
        searchResult: any = {};
        noResults = false;
        isLoading = false;

        @Prop() private search!: string;

        async searchFriend() {
            this.isLoading = true;
            const {result} = await ApiService.searchUser(this.search.toLowerCase());
            this.noResults = result.result !== 'exist';
            if (!this.noResults) {
                this.searchResult = result;
            }
            this.isLoading = false;
        }

        async addFriend() {
            const {status, message} = await ApiService.addFriend(this.searchResult.global_id);
            if (status === 'OK') {
                this.$buefy.toast.open(message);
            }
            this.clearSearch();
        }

        clearSearch() {
            this.$emit('clearSearch');
        }
    }
</script>

<style lang="scss" scoped>

    .panel-tabs {
        box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
    }

    .list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
            display: flex;
            align-items: center;
        }

        .button {
            margin-right: 10px;
        }
    }
</style>
