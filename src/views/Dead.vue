<template>
    <div class="loading">
        <div class="wave-fill">
            <div class="water">
                <span class="wave"/>
                <span class="deep-water"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';

    const applicationModule = namespace('applicationStore');
    @Component
    export default class Loading extends Vue {
        @applicationModule.Getter connectionStatus!: any;
        @applicationModule.Getter getIdentity!: any;

        @Watch('connectionStatus')
        onConnectionStatus(value: any) {
            if (value === 'OK') this.$router.push('/chat');
        }

        @Watch('getIdentity')
        onGetIdentity(value: string) {
            if (value === 'ERROR') this.$router.push('/create-identity');
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/config";

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex-direction: column;
        background-image: linear-gradient(-120deg, $color-blue-1 0%, $color-purple 100%);
    }

    .wave-fill {
        height: 180px;
        width: 180px;
        -webkit-mask-image: url('../assets/images/logo-pictogram-white.png');
        -webkit-mask-size: contain;
    }

    span {
        display: block;
        width: 100%;
    }

    .wave {
        background: url("../assets/images/wave.png");
        height: 22px;
        background-size: contain;
        animation: wave 10s linear infinite;
    }

    .deep-water {
        background: $color-white;
        height: 200px;
    }

    @keyframes wave {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 1000px 0;
        }
    }

    .water {
        animation: water 8s ease;
    }

    @keyframes water {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(-10%);
        }
    }

</style>
