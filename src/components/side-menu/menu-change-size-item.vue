
<script lang="ts">
import { State } from '@/store/state';
import { watch } from 'vue';
import { useStore } from 'vuex';
import MenuItem from './menu-item.vue'

const getChangeSizeMenu = (showTitle: boolean): string => {
    return showTitle ? "mdi-chevron-left" : "mdi-chevron-right";
}

const getToolTips = (showTitle: boolean): string => {
    return showTitle ? "Hide the menu text" : "Show the menu text"
}

export default {
    extends: MenuItem,
    name: "MenuChangeSizeItem",
    setup() {
        const store = useStore<State>();
        const showTitle = () => store.state.drawer.showTitle;
        let tooltips: string[] = [getToolTips(store.state.drawer.showTitle)];

        watch(() => store.state.drawer.showTitle, (newValue) => {
            tooltips[0] = getToolTips(newValue);
        })

        const doIt = () => {
            store.dispatch("setShowingTitle", { showTitle: !showTitle(), drawerWidth: showTitle() ? 60 : 256 })
        };

        const getDisabled = (): boolean => {
            return false;
        }

        const iconName = (): string => getChangeSizeMenu(store.state.drawer.showTitle);

        return {
            doIt,
            getDisabled,
            showTitle,
            iconName,
            tooltips
        }
    },
}
</script>