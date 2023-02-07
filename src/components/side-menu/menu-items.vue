<template>
    <v-list dense>
        <template v-for="(item, index) in data.menuItems" :key="index">
            <MenuItem v-if="item.type === MenuItemTypes.LINK" :item="item" />
            <MenuChangeSizeItem v-if="item.type === MenuItemTypes.CHANGE_SIZE" :item="item" />
            <MenuLogoutItem v-if="item.type === MenuItemTypes.LOGOUT" :item="item" />
        </template>
    </v-list>
</template>

<script lang="ts">
import { MenuItemParm, MenuItemTypes } from '../../models/MenuItemParm';
import MenuItem from './menu-item.vue';
import MenuChangeSizeItem from './menu-change-size-item.vue';
import MenuLogoutItem from './menu-logout-item.vue';
import { defineComponent, reactive } from 'vue';

interface Data {
    menuItems: MenuItemParm[]
}

export default defineComponent({
    name: "MenuItems",
    components: { MenuItem, MenuChangeSizeItem, MenuLogoutItem },
    setup() {
        const data: Data = {
            menuItems: [
                {
                    target: "home",
                    title: "Home",
                    tooltips: ["Back to your lists."],
                    iconName: "mdi-home-outline",
                    type: MenuItemTypes.LINK,
                },
                {
                    target: "logout",
                    title: "Log Out/Switch Account",
                    tooltips: ["When you log in to Trello, we are given read only access to your account's boards for one hour only. Select this to log out immediately.",
                        "You may need to do this to switch to using a different Trello account."],
                    iconName: "mdi-repeat",
                    type: MenuItemTypes.LOGOUT,
                },
                {
                    target: "",
                    title: "Change menu size",
                    tooltips: ["Show the menu text"],
                    iconName: "mdi-email-outline",
                    type: MenuItemTypes.CHANGE_SIZE,
                },
                {
                    target: "whatsnew",
                    title: "What's New?",
                    tooltips: ["Looking for a history of changes, click here..."],
                    iconName: "mdi-help",
                    type: MenuItemTypes.LINK,
                },
                {
                    target: "contactUs",
                    title: "Contact Us",
                    tooltips: ["Need to send us a comment, suggestion or idea? Click here..."],
                    iconName: "mdi-email-outline",
                    type: MenuItemTypes.LINK,
                },
                {
                    target: "about",
                    title: "About",
                    tooltips: ["Wondering what LisTrello is all about? Click here..."],
                    iconName: "mdi-information-outline",
                    type: MenuItemTypes.LINK,
                },
            ],
        };

        return { data, MenuItemTypes };
    }
})
</script>