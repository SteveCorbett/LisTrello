
<script lang="ts">
import router from "@/router";
import { State } from '@/store/state';
import { watch } from 'vue';
import { useStore } from 'vuex';
import MenuItem from './menu-item.vue'

const getChangeSizeMenu = (showTitle: boolean): string => {
    return showTitle ? "mdi-chevron-left" : "mdi-chevron-right";
}

export default {
    extends: MenuItem,
    name: "MenuLogoutItem",
    setup(props: any) {
        const store = useStore<State>();
        const showTitle = () => store.state.drawer.showTitle;
        let tooltips: string[] = props.item.tooltips;

        const doIt = () => {
            router.push(props.item.target)
        };

        const getDisabled = (): boolean => {
            return !store.getters.isAuthenticated;
        }

        const iconName = (): string => props.item.iconName;

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