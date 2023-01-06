<template>
    <v-list-item link @click="goto()">
        <v-icon :icon="item.iconName" size="large"></v-icon>
        {{ item.title }}
        <v-tooltip location="right" activator="parent" offset="-100">
            <p v-for="tooltip in item.tooltips">
                {{ tooltip }}
            </p>
        </v-tooltip>
    </v-list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MenuItem } from '../models/MenuItem'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<MenuItem>,
            required: true,
        },
    },
    setup(props) {
        const goto = () => {
            console.log("Goto " + props.item.target);
        }

        return {
            goto
        }
    }
})
</script>