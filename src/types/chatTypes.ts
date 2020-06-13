export interface ChatStateInterface {
    messages: Array<ChatContentInterface>;
    message: ChatContentInterface;
    friends: Array<FriendInterface>;
}

export interface ChatContentInterface {
    author: string;
    type: string;
    data: {
        type?: string;
        text: string
    }
}

export interface ApiChatContentInterface {
    data: any,
    message: string;
    dir: string;
    // eslint-disable-next-line camelcase
    message_id: string;
    recipient: string;
    sender: string;
    time: string
}

export interface FriendInterface {
    alias: string;
    // eslint-disable-next-line camelcase
    contact_state: string;
    // eslint-disable-next-line camelcase
    contact_status: string;
    // eslint-disable-next-line camelcase
    global_id: string;
    idhost: string;
    idurl: string;
    username: string;
}
