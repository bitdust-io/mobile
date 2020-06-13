<template>
    <div class="status">
        <div>
            <span>State</span>
            <span :class="status.state">{{status.state}}</span>
        </div>
        <div>
            <span>Installed</span>
            <span :class="{'active': status.installed}">{{status.installed}}</span>
        </div>
        <div>
            <span>Enabled</span>
            <span :class="{'active': status.enabled}">{{status.enabled}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ConfigItem',
        data() {
            return {
                settings: {}
            };
        },
        props: {
            status: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .status {
        background: #ebebeb;
        padding: 10px;
        border-radius: 8px;

        .active {
            background: blue;
        }

        .ON {
            background: green;
        }

        .OFF {
            background: red;
        }

        div {
            display: flex;
            margin: 10px;
            border: 1px solid gray;
        }

        span {
            padding: 2px 8px;
            background: white;
            background: gray;
            color: white;

            &:first-child {
                background: gray;
                color: gray;
                padding-right: 14px;
                padding-left: 6px;
            }
        }
    }

</style>
