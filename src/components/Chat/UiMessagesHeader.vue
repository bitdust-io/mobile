<template>
    <nav class="ui-header">
        <b-modal :active.sync="isSettingsOpen" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <FirstLetter :name="friend.global_id" size="50"/>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">{{friend.global_id}}</p>
                            <p class="subtitle is-6">{{friend.contact_state}}</p>
                        </div>
                    </div>

                    <div class="content">
                        <div class="buttons">
                            <b-button type="is-danger" @click="removeFriend">
                                remove friend
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>

        <b-button rounded
                  to="/chat"
                  tag="router-link"
                  icon-left="chevron-left"/>

        <div class="is-flex first-letter">
            <FirstLetter :name="$route.params.id"
                         size="34"
                         class="first-letter"/>

            <p v-if="friend">
                {{ friend.global_id }}
            </p>
        </div>
        <b-button rounded
                  @click="isSettingsOpen = !isSettingsOpen"
                  icon-left="cog"/>

    </nav>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import FirstLetter from '@/components/Global/FirstLetter.vue';
    import {FriendInterface} from '@/types/chatTypes';
    import ApiService from '@/services/api.service';

    @Component({
        components: {FirstLetter}
    })
    export default class ChatMessagesHeader extends Vue {
        isSettingsOpen = false;
        @Prop() private friend!: FriendInterface;

        async removeFriend() {
            this.$buefy.dialog.confirm({
                message: 'Are you sure ?',
                type: 'is-danger',
                onConfirm: () => {
                    ApiService.removeFriend(this.friend.global_id);
                    this.$router.push('/chat');
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .ui-header {
        justify-content: space-between;
        display: flex;
        width: 100%;
        align-items: center;
    }

    .buttons {
        justify-content: center;
        margin: 20px 0;
    }

    .first-letter {
        align-items: center;
    }

</style>
