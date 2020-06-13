<template>
    <section class="panel">
        <a class="panel-block">
            <p class="control has-icons-left">
                <span class="icon is-right">
                </span>
                <input class="input"
                       placeholder="Search"
                       v-model="search">
                <span class="icon is-left">
                    <font-awesome-icon icon="search" />
                </span>
            </p>
        </a>

        <router-link class="panel-block"
                     v-for="friend in friendsResult"
                     :class="friend.contact_state"
                     :key="friend.global_id"
                     :to="{name:'chat-messages', params:{id:friend.global_id}}">
            <span class="panel-icon">
                <FirstLetter :name="friend.global_id" size="18" />
            </span>
            {{friend.global_id}}
            <span class="offline">
                {{friend.contact_state}}
            </span>
        </router-link>

        <FriendSearch v-if="triggerSearch" :search="search" @clearSearch="clearSearch" />

    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UserDetails from '@/components/Global/UserDetails.vue';
    import {namespace} from 'vuex-class';
    import {FriendInterface} from '@/types/chatTypes';
    import FirstLetter from '@/components/Global/FirstLetter.vue';
    import FriendSearch from '@/components/Chat/FriendSearch.vue';

    const chatModule = namespace('chatStore');

    @Component({
        components: {FriendSearch, FirstLetter, UserDetails}
    })
    export default class FriendsList extends Vue {
        search = '';
        @chatModule.Action getFriends: any;
        @chatModule.State friends!: FriendInterface[];

        created() {
            this.getFriends();
        }

        clearSearch() {
            this.search = '';
            this.$store.dispatch('chatStore/getFriends');
        }

        get friendsResult() {
            return this.friends.filter((f) => {
                return f.username
                    .toLowerCase()
                    .indexOf(this.search.toLowerCase()) >= 0;
            });
        }

        get triggerSearch() {
            if (this.friendsResult.length === 0 && this.search) {
                return true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .panel-tabs {
        box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
    }

    .OFFLINE {
        filter: grayscale(100%);
    }

    .offline {
        margin-left: 10px;
        text-transform: lowercase;
        font-size: 12px;
        opacity: .5;
    }
</style>
