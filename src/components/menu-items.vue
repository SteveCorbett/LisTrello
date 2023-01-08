<template>
    <v-list dense>
        <MenuItem v-for="(item, index) in data.menuItems" :key="index" :item="item">

        </MenuItem>
    </v-list>
</template>

<script lang="ts">
import { MenuItemParm } from '@/models/MenuItemParm';
import MenuItem from './menu-item.vue'
import { defineComponent, reactive } from 'vue';

interface Data {
    menuItems: MenuItemParm[]
}

export default defineComponent({
    name: "MenuItems",
    components: { MenuItem },
    setup() {
        const data = reactive<Data>({
            menuItems: [
                {
                    target: "test",
                    title: "test Item",
                    tooltips: ["first line", "Second Line"],
                    iconName: "mdi-email-outline",
                    type: "link",
                },
                {
                    target: "",
                    title: "Change menu size",
                    tooltips: ["Show the menu text"],
                    iconName: "mdi-email-outline",
                    type: "changeSize",
                },
            ],
        });

        return { data };
    }
})
</script>