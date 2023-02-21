<script lang="ts">
import type { State } from "@/store/state";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import MenuItem from "./menu-item.vue";

const getChangeSizeMenu = (showTitle: boolean): string => {
  return showTitle ? "mdi-chevron-left" : "mdi-chevron-right";
};

const getToolTips = (showTitle: boolean): string => {
  return showTitle ? "Hide the menu text" : "Show the menu text";
};

export default {
  name: "MenuChangeSizeItem",
  extends: MenuItem,
  setup() {
    const { dispatch, state } = useStore<State>();
    const showTitle = () => state.drawer.showTitle;
    let tooltips: string[] = [getToolTips(state.drawer.showTitle)];

    watch(
      () => state.drawer.showTitle,
      (newValue) => {
        tooltips[0] = getToolTips(newValue);
      }
    );

    const doIt = () => {
      dispatch("setShowingTitle", {
        showTitle: !showTitle(),
        drawerWidth: showTitle() ? 60 : 256,
      });
    };

    const getDisplay = (): string => {
      return window.innerWidth < 768 ? "none" : "auto";
    };

    let display = ref(getDisplay());

    const handleResize = () => {
      display.value = getDisplay();
    };

    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    const getDisabled = (): boolean => {
      return false;
    };

    const iconName = (): string => getChangeSizeMenu(state.drawer.showTitle);

    return {
      display,
      doIt,
      getDisabled,
      showTitle,
      iconName,
      tooltips,
    };
  },
};
</script>

<style>
.vListMenuItem {
  display: v-bind(display);
}
</style>
