<template>
  <v-list-item
    :id="item.id"
    v-tooltip.top-end="{ content: tooltips[0] }"
    link
    :disabled="getDisabled()"
    class="vListMenuItem"
    @click="doIt()"
  >
    <v-icon :icon="iconName()" size="large"></v-icon>
    <span v-if="showTitle()" class="ml-3">{{ item.title }}</span>
  </v-list-item>
</template>

<script lang="ts">
import router from "@/router";
import type { State } from "@/store/state";
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import type { MenuItemParm } from "../../models/MenuItemParm";

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
    // eslint-disable-next-line vue/no-setup-props-destructure
    const tooltips: string[] = props.item.tooltips;

    const doIt = () => {
      router.push(props.item.target);
    };

    const getDisabled = (): boolean => {
      const disabled: boolean = props.item.target === route.name;
      return disabled;
    };

    const iconName = (): string => props.item.iconName;

    return {
      doIt: doIt,
      getDisabled,
      showTitle,
      iconName,
      tooltips,
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
