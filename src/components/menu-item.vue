<template>
    <v-list-item link @click="doIt()">
        <v-icon :icon="iconName" size="large"></v-icon>
        <span v-if="showTitle()">{{ item.title }}</span>
        <v-tooltip location="right" activator="parent" offset="-100">
            <p v-for="tooltip in item.tooltips">
                {{ tooltip }}
            </p>
        </v-tooltip>
    </v-list-item>
</template>

<script lang="ts">
import { State } from "@/store/state";
import { defineComponent, PropType, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { MenuItemParm } from "../models/MenuItemParm";

const getChangeSizeMenu = (showTitle: boolean): string => {
    return showTitle ? "mdi-chevron-right" : "mdi-chevron-left";
}

export default defineComponent({
    name: "MenuItem",
    props: {
        item: {
            type: Object as PropType<MenuItemParm>,
            required: true,
        },
    },
    setup(props) {
        const store = useStore<State>();
        const drawerWidth = () => store.state.drawer.drawerWidth;
        const showTitle = () => store.state.drawer.showTitle;
        let iconName = props.item.type === "changeSize" ? getChangeSizeMenu(showTitle()) : props.item.iconName;

        watch(() => store.getters.showTitle, (newValue, oldValue) => {
            console.log("watch showTitle: " + oldValue + " => " + newValue);
            if (props.item.type === "changeSize") {
                iconName = getChangeSizeMenu(newValue);
            }
        },
            // { deep: true }
        )

        const doIt = () => {
            if (props.item.type === "changeSize") {
                // console.log("showTitle 1: " + showTitle.value);
                store.dispatch("setShowingTitle", { showTitle: !showTitle(), drawerWidth: showTitle() ? 60 : 256 })
                console.log("showTitle 2: " + showTitle);
                // iconName = getChangeSizeMenu(showTitle.value);
            }
            console.log("doIt " + props.item.type);
        };

        return {
            drawerWidth,
            doIt: doIt,
            iconName,
            showTitle,
        };
    },

});
</script>
