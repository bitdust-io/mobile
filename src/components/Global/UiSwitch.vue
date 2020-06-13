<template>
    <div>
        <label class="switch">
            <input
                v-model="modelValue"
                :name="name"
                :value="inputValue"
                type="checkbox"
                class="switch-input"
            >
            <span class="switch-label" data-on="On" data-off="Off"></span>
            <span class="switch-handle"></span>
        </label>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'UiSwitch',
        props: {
            value: {
                type: Boolean,
                required: false
            },
            inputValue: {
                type: Boolean,
                required: true
            },
            name: {
                type: [String],
                required: true
            }
        },
        computed: {
            modelValue: {
                set(value) {
                    this.$emit('input', value);
                },
                get() {
                    return this.inputValue;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .switch {
        border-radius: 18px;
        display: block;
        height: 22px;
        padding: 1px;
        position: relative;
        width: 44px;
        margin: 5px 0;
    }

    .switch-input {
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
    }

    .switch-label {
        border-radius: inherit;
        display: block;
        height: 20px;
        position: relative;
        transition: all 0.15s ease-out 0s;
    }

    .switch-input:checked ~ .switch-label {
    }

    .switch-handle {
        border-radius: 100%;
        height: 14px;
        left: 4px;
        position: absolute;
        top: 4px;
        transition: left 0.15s ease-out 0s;
        width: 14px;
    }

    .switch-handle::before {
        border-radius: 6px;
        content: '';
        height: 12px;
        left: 50%;
        margin: -6px 0 0 -6px;
        position: absolute;
        top: 50%;
        width: 12px;
    }

    .switch-input:checked ~ .switch-handle {
        left: 26px;
    }

</style>
