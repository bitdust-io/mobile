<template>
    <div>
        <transition :name="transitionName"
                    mode="out-in">
            <router-view class="router"/>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import FriendsList from '@/components/Chat/FriendsList.vue';

    @Component({
        components: {
            FriendsList
        }
    })
    export default class Chat extends Vue {
        transitionName = 'slide-left';

        created() {
            this.$router.beforeEach((to, from, next) => {
                this.transitionName = this.$route.meta.transition;
                next();
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/config";

    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        transition: opacity .2s, transform .2s;
        height: 100%;
        min-height: 900px;
    }

    .slide-right-enter {
        transform: translateX(-100%);
    }

    .slide-left-enter {
        transform: translateX(100%);
    }

</style>
