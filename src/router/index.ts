import Vue from 'vue';
import VueRouter from 'vue-router';
import Loading from '@/views/Loading.vue';
import Chat from '@/views/Chat.vue';
import Dead from '@/views/Dead.vue';
import ChatMessages from '@/views/ChatMessages.vue';
import CreateIdentity from '@/views/CreateIdentity.vue';
import FriendsList from '@/components/Chat/FriendsList.vue';
import Settings from '@/views/Settings.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        name: 'loading',
        component: Loading
    },
    {
        path: '/create-identity',
        name: 'create-identity',
        component: CreateIdentity
    },
    {
        path: '/loading-identity',
        name: 'loading-identity',
        component: Loading
    },
    {
        path: '/chat/',
        component: Chat,
        children: [
            {
                path: '/',
                name: 'chat',
                component: FriendsList,
                meta: {
                    transition: 'slide-left'
                }
            },
            {
                path: ':id',
                name: 'chat-messages',
                component: ChatMessages,
                meta: {
                    transition: 'slide-right'
                }
            }
        ]
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        children: [
            {
                path: ':id',
                name: 'setting'
            }
        ]
    },
    {
        path: '/dead',
        name: 'dead',
        component: Dead
    }
];

const router = new VueRouter({
    routes
});

export default router;
