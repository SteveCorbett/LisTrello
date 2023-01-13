<template>
    <v-list-item link @click="doIt()" :disabled="getDisabled()">
        <v-icon :icon="iconName()" size="large"></v-icon>
        <span v-if="showTitle()" class="ml-3">{{ item.title }}</span>
        <v-tooltip location="right" activator="parent" :offset="showTitle() ? -100 : -10">
            <p v-for="tooltip in tooltips" class="menuHint">
                {{ tooltip }}
            </p>
        </v-tooltip>
    </v-list-item>
</template>

<script lang="ts">
import router from "@/router";
import { State } from "@/store/state";
import { defineComponent, PropType } from "vue";
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import { MenuItemParm } from "../../models/MenuItemParm";

export default defineComponent({
    name: "MenuItem",
    props: {
        item: {
            type: Object as PropType<MenuItemParm>,
            required: true,
        },
    },
    setup(props) {
        const route = useRoute();
        const store = useStore<State>();
        const showTitle = () => store.state.drawer.showTitle;
        const tooltips: string[] = props.item.tooltips;

        const doIt = () => {
            router.push(props.item.target)
        };

        const getDisabled = (): boolean => {
            const disabled: boolean = props.item.target === route.name;
            return disabled;
        }

        const iconName = (): string => props.item.iconName;

        return {
            doIt: doIt,
            getDisabled,
            showTitle,
            iconName,
            tooltips
        };
    },

});
</script>

<style>
.menuHint {
    max-width: 30rem;
}

.menuHint:not(:last-child) {
    margin-bottom: 1rem;
}
</style>
