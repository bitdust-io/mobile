<template>
    <div>
        <beautiful-chat
            v-if="show"
            :participants="participants"
            :showLauncher="false"
            :showCloseButton="false"
            :editable="false"
            :titleImageUrl="titleImageUrl"
            :onMessageWasSent="onMessageWasSent"
            :messageList="messageList"
            :newMessagesCount="newMessagesCount"
            :isOpen="isChatOpen"
            :close="closeChat"
            :icons="icons"
            :open="openChat"
            :showEmoji="true"
            :showFile="false"
            :showTypingIndicator="''"
            :colors="colors"
            :alwaysScrollToBottom="true"
            :messageStyling="messageStyling"
            @onType="handleOnType">

            <template v-slot:header class="buttons">
                <UiMessagesHeader :friend="friend" />
            </template>

            <template v-slot:user-avatar="{user}">
                <div>
                    <FirstLetter :name="getUserId(user)"
                                 size="20"
                                 class="first-letter" />
                </div>
            </template>
        </beautiful-chat>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import Chat from 'vue-beautiful-chat';
    import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png';
    import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg';
    import FileIcon from 'vue-beautiful-chat/src/assets/file.svg';
    import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg';
    import FirstLetter from '@/components/Global/FirstLetter.vue';
    import {IdentityResultInterface} from '@/types/apiTypes';
    import {FriendInterface} from '@/types/chatTypes';
    import api from '@/services/api.service';
    import UiMessagesHeader from '@/components/Chat/UiMessagesHeader.vue';

    Vue.use(Chat);
    @Component({
        components: {UiMessagesHeader, FirstLetter}
    })
    export default class ChatMessages extends Vue {
        @Prop() private friend!: FriendInterface;
        @Prop() private identity!: IdentityResultInterface;
        @Prop() private message!: any;
        @Prop() public history!: any;

        icons = {
            open: {
                img: OpenIcon,
                name: 'default'
            },
            close: {
                img: CloseIcon,
                name: 'default'
            },
            file: {
                img: FileIcon,
                name: 'default'
            },
            closeSvg: {
                img: CloseIconSvg,
                name: 'default'
            }
        };

        participants = [
            {
                id: 'me',
                name: this.identity.name
            },
            {
                id: this.friend.global_id,
                name: this.friend.username
            }
        ];

        titleImageUrl = '';
        newMessagesCount = 0;
        isChatOpen = true;
        colors = {
            header: {
                bg: '#fff',
                text: '#404040'
            },
            launcher: {
                bg: '#4e8cff'
            },
            messageList: {
                bg: '#ffffff'
            },
            sentMessage: {
                bg: '#4e8cff',
                text: '#ffffff'
            },
            receivedMessage: {
                bg: '#eaeaea',
                text: '#222222'
            },
            userInput: {
                bg: '#f4f7f9',
                text: '#565867'
            }
        };
        messageStyling = true;
        messageList: any;
        show = false;

        created() {
            this.messageList = this.history;
            setTimeout(() => (this.show = true), 300);
        }

        async onMessageWasSent(message: any) {
            const data = {
                global_id: this.friend.global_id,
                data: {
                    message: message.data.text || message.data.emoji,
                    type: message.type
                }
            };
            const resp = await api.sendMessage(data);
            if (resp.status === 'ERROR') {
                this.$buefy.toast.open(resp.errors[0]);
            }
        }

        openChat() {
            this.isChatOpen = true;
            this.newMessagesCount = 0;
        }

        closeChat() {
            this.isChatOpen = false;
        }

        handleOnType() {
            console.log('Emit typing event');
        }

        getUserId(user: any) {
            return user.id === 'me' ? user.name : user.id;
        }

        @Watch('message')
        onPropertyChanged(value: any) {
            this.messageList.push(value);
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .sc-header {
        min-height: 70px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    /deep/ .sc-chat-window {
        top: 53px;
        left: 0px;
        right: 0px;
        border-radius: 0px;
        width: initial;
    }
    /deep/ .sc-message {
        width: initial;
    }
</style>
