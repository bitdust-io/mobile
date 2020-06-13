<template>
    <grid-content>
        <div slot="main">
            <div v-if="currentKey ==='suppliers'">
                <suppliers />
            </div>
            <ul class="settings-list"
                v-if="currentKey !=='services'">
                <li v-for="(item, index) in getConfigForKey(currentKey)"
                    class="main"
                    :key="index">

                    <ui-config :item="item"
                               @onChange="onChange" />
                </li>
            </ul>
            <ul v-else
                class="settings-list"
            >
                <li v-for="(item, index) in listAllServices"
                    :key="index"
                    class="main">
                    <h2>
                        {{item.name.replace(/service_|_/g, ' ')}}
                    </h2>

                    <ui-status :status="item" />

                    <div v-for="config in item.configs"
                         :key="config.key"
                         class="config">

                        <ui-config :item="config"
                                   @onChange="onChange" />
                    </div>

                    <div class="depends-on">
                        <h3>Depends on</h3>

                        <ul class="depends">
                            <li v-for="(subItem, index) in item.depends"
                                :key="index">
                                <div>
                                    {{subItem.replace('service_', '')}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>

            </ul>
        </div>

        <div slot="menu">

            <ul class="link-list">
                <li>
                    <router-link :to="'/settings/suppliers'"
                                 class="link"
                                 active-class="active"
                    >
                        Suppliers
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/settings/services'"
                                 class="link"
                                 active-class="active"
                    >
                        Services
                    </router-link>
                </li>

                <li v-for="item in listAllKeys"
                    :key="item">
                    <router-link :to="'/settings/'+item"
                                 class="link"
                                 active-class="active"
                    >
                        {{item}}
                    </router-link>
                </li>
            </ul>
        </div>
    </grid-content>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UiConfig from '@/components/Settings/UiConfig.vue';
    import UiStatus from '@/components/Settings/UiStatus.vue';
    import Suppliers from '@/components/Settings/Suppliers.vue';
    import GridContent from '@/components/Global/GridContent.vue';

    @Component({
        components: {UiConfig, UiStatus, Suppliers, GridContent}
    })
    export default class Settings extends Vue {
        name = 'Settings';
        currentKey = 'services';

        updateLists() {
            this.$store.dispatch('settingsStore/updateConfigList');
            this.$store.dispatch('settingsStore/updateServiceList');
        }

        async created() {
            this.updateLists();
            this.currentKey = 'services';
        }

        get listAllServices() {
            return this.$store.state.settingsStore.serviceList;
        }

        get listAllKeys() {
            return [];
        }
    };
</script>

<style lang="scss" scoped>
    .settings-list {
        max-width: 800px;

        li {
            border: 1px solid gray;
            margin: 10px 0;
            display: block;
            list-style: none;
        }

        .main {
            font-size: .9rem;
            border-radius: 10px;
            padding: 20px;

            h2 {
                font-size: 1rem;
                text-transform: capitalize;
                margin: 10px 0;
                font-weight: bold;
            }

            &:hover {
                box-shadow: 0 0 30px -10px rgba(0, 0, 0, .6);
            }

            &.active {
                color: white;
                background: purple;
            }

            .depends-on {
                display: flex;
                align-items: center;
                border: 1px solid gray;
                padding: 10px;
                border-radius: 10px;

                h3 {
                    font-size: .8rem;
                    font-weight: 700;
                    margin-right: 10px;
                    color: purple;
                }

                .depends {
                    display: flex;

                    li {
                        padding: 10px;
                        margin-right: 10px;
                    }
                }
            }

            .config {
                border: 1px solid gray;
                border-radius: 10px;
                margin: 10px 0;
                padding: 10px;

                /deep/ .label {
                    margin: 5px;
                }
            }
        }
    }

    .download {
        font-size: .9rem;
        color: red;
        margin-top: 10px;
    }

</style>
