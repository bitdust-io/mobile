<template>

    <div class="grid-container">
        <div class="menu">
            <slot name="menu"/>
        </div>
        <div class="main"
             ref="main"
             id="main">
            <slot name="main"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GridContent'
    };
</script>

<style lang="scss" scoped>
    .grid-container {
        width: 100%;
        padding: 0 20px;
    }

    .main {
        flex: 1;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 100px;

        &.chat {
            height: calc(100% - 80px);
            padding-bottom: 20px;
        }
    }

    .menu {
        margin: 20px 0 0 0;

        .link-list {
            list-style: none;
            display: inline-block;
            width: 100%;
        }

        .link {
            cursor: pointer;
            text-transform: uppercase;
            display: block;
            text-decoration: none;
            color: purple;
            font-size: 1rem;
            padding: 10px;
            transition: all .3s ease;
            border: 0;
            margin: 10px 0;

            &.active {
                border-left: 4px solid purple;
            }

            &:hover {
                opacity: .8;
                color: gray;
            }
        }
    }

    .menu-title {
        font-size: 1rem;
        color: gray;
        text-transform: uppercase;
        margin-bottom: 30px;
    }

</style>
