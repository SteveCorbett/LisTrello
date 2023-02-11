<script lang="ts">
import router from "@/router";
import type { State } from "@/store/state";
import { useStore } from "vuex";
import MenuItem from "./menu-item.vue";

export default {
  name: "MenuLogoutItem",
  extends: MenuItem,
  setup(props: any) {
    const store = useStore<State>();
    const showTitle = () => store.state.drawer.showTitle;
    // eslint-disable-next-line vue/no-setup-props-destructure
    let tooltips: string[] = props.item.tooltips;

    const doIt = () => {
      router.push(props.item.target);
    };

    const getDisabled = (): boolean => {
      return !store.getters.isAuthenticated;
    };

    const iconName = (): string => props.item.iconName;

    return {
      doIt,
      getDisabled,
      showTitle,
      iconName,
      tooltips,
    };
  },
};
</script>
