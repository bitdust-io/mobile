<template>
    <div class="letter"
         :style="getConfig()">
        <p>
            {{ userFirstLetter }}
        </p>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import ColorHash from 'color-hash';

    @Component
    export default class FirstLetter extends Vue {
        @Prop() private name!: string;
        @Prop() private size!: number;

        color() {
            let colorHash = new ColorHash({saturation: 0.8});
            return colorHash.hex(this.name);
        }

        getConfig(): any {
            return {
                width: this.size + 'px',
                height: this.size + 'px',
                'background-color': this.color(),
                'margin-right': this.size / 3 + 'px',
                'font-size': this.size / 2 + 'px'
            };
        }

        get userFirstLetter() {
            if (!this.name) return;
            return this.name.substring(0, 1);
        }
    }
</script>
<style scoped lang="scss">
    @import "../../assets/scss/config";

    .letter {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-transform: uppercase;
        color: $color-white;
        text-align: center;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
