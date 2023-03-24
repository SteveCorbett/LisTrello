<template>
  <v-list dense>
    <template v-for="(item, index) in menuItems" :key="index">
      <MenuItem v-if="item.type === MenuItemTypes.LINK" :item="item" />
      <MenuChangeSizeItem
        v-if="item.type === MenuItemTypes.CHANGE_SIZE"
        :item="item"
      />
      <MenuLogoutItem v-if="item.type === MenuItemTypes.LOGOUT" :item="item" />
    </template>
  </v-list>
</template>

<script lang="ts">
import { MenuItemTypes } from "../../models/MenuItemParm";
import type { MenuItemParm } from "../../models/MenuItemParm";
import MenuItem from "./menu-item.vue";
import MenuChangeSizeItem from "./menu-change-size-item.vue";
import MenuLogoutItem from "./menu-logout-item.vue";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import type { State } from "@/store/state";

export default defineComponent({
  name: "MenuItems",
  components: { MenuItem, MenuChangeSizeItem, MenuLogoutItem },
  setup() {
    const { state } = useStore<State>();
    const menuItems: MenuItemParm[] = [
      {
        id: "id-home",
        target: "home",
        title: "Home",
        tooltips: ["Back to your lists."],
        iconName: "mdi-home-outline",
        iconAlt: "Home icon",
        type: MenuItemTypes.LINK,
      },
      {
        id: "id-logout",
        target: "logout",
        title: "Log Out/Switch Account",
        tooltips: [
          "When you log in to Trello, we are given read only access to your account's boards for one hour only. Select this to log out immediately.",
          "You may need to do this to switch to using a different Trello account.",
        ],
        iconName: "mdi-repeat",
        iconAlt: "Log out icon",
        type: MenuItemTypes.LOGOUT,
      },
      {
        id: "id-change-size",
        target: "",
        title: "Change menu size",
        tooltips: ["Show the menu text"],
        iconName: "mdi-email-outline",
        iconAlt: "Email icon",
        type: MenuItemTypes.CHANGE_SIZE,
      },
      {
        id: "id-whatsnew",
        target: "whatsnew",
        title: "What's New?",
        tooltips: ["Looking for a history of changes, click here..."],
        iconName: "mdi-help",
        iconAlt: "Help icon",
        type: MenuItemTypes.LINK,
      },
      {
        id: "id-contactUs",
        target: "contactUs",
        title: "Contact Us",
        tooltips: [
          "Need to send us a comment, suggestion or idea? Click here...",
        ],
        iconName: "mdi-email-outline",
        iconAlt: "Contact us icon",
        type: MenuItemTypes.LINK,
      },
      {
        id: "id-about",
        target: "about",
        title: "About",
        tooltips: ["Wondering what LisTrello is all about? Click here..."],
        iconName: "mdi-information-outline",
        iconAlt: "About icon",
        type: MenuItemTypes.LINK,
      },
    ];

    if (state.isMobile) {
      menuItems.forEach((link) => (link.tooltips = []));
      const ix = menuItems.findIndex((link) => link.id === "id-change-size");
      if (ix > -1) {
        menuItems.splice(ix, 1);
      }
    }

    return { menuItems, MenuItemTypes };
  },
});
</script>
