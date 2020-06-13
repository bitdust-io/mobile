<template>
    <i class="root"
       :class="size"
       v-html="require(`!svg-inline-loader!../../assets/icons/${icon}.svg`)"
       v-on="$listeners"/>
</template>

<script>
    export default {
        name: 'icon',
        data: () => ({
            icon: '',
            prefix: 'icon-'
        }),
        props: {
            name: {
                type: String,
                required: true
            },
            size: {
                type: String,
                default: 'md'
            }
        },
        created() {
            this.icon = this.prefix + this.name;
        }
    };
</script>

<style lang="scss" scoped>

    $size: 10px;

    @mixin size($with, $height) {
        height: $with;
        width: $height;
    }

    .root {
        box-sizing: content-box;
        display: inline-block;
    }

    .xs {
        @include size(20px, 20px)
    }

    .sm {
        @include size(40px, 40px)
    }

    .md {
        @include size(100px, 100px)
    }

    .lg {
        @include size(140px, 140px)
    }

    .xl {
        @include size(200px, 200px)
    }
</style>
