<template>
    <div>
        <UiMessages v-if="friendDetails && isLoaded"
                    :friend="friendDetails"
                    :identity="identity"
                    :message="message"
                    :history="history" />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UserDetails from '@/components/Global/UserDetails.vue';
    import {namespace} from 'vuex-class';
    import {ChatContentInterface, FriendInterface} from '@/types/chatTypes';
    import FirstLetter from '@/components/Global/FirstLetter.vue';
    import UiMessages from '@/components/Chat/UiMessages.vue';
    import {IdentityResultInterface} from '@/types/apiTypes';
    import apiService from '@/services/api.service';
    import {convertMessage} from '@/store/modules/chat.store';

    const chatModule = namespace('chatStore');
    const applicationModule = namespace('applicationStore');
    @Component({
        components: {UiMessages, FirstLetter, UserDetails}
    })
    export default class ChatMessages extends Vue {
        history = [];
        isLoaded = false;
        @applicationModule.State identity!: IdentityResultInterface;
        @chatModule.State friends!: FriendInterface[];
        @chatModule.State message!: ChatContentInterface;

        get friendDetails(): FriendInterface | {} {
            return this.friends.find(f => f.global_id === this.$route.params.id) || {};
        }

        async created() {
            const {result} = await apiService.getChatHistoryForUser(this.$route.params.id);
            if (result) {
                this.history = result.map((r: any) => {
                    return convertMessage(r.doc, this.identity.global_id);
                }).reverse();
            }
            this.isLoaded = true;
        }
    }
</script>
