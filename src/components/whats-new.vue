<template>
    <v-container class="d-flex align-center flex-column fill-height">
        <p class="flex-row text-h4 text--primary mb-2">What's New</p>
        <div class="flex-row overflow-y-auto">
            <v-card v-for="(release, index) in releases" :key="index" class="release mb-2 py-1"
                :title="release.description" :subtitle="release.date + ' ' + release.version" border>
                <v-card-text>
                    <ul>
                        <li v-for="(detail, index) in release.details">{{ detail }}</li>
                    </ul>

                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


interface Release {
    date: string;
    version: string;
    description: string;
    details: string[];
}

export default defineComponent({
    name: "WhatsNew",
    setup() {
        const releases: Release[] = [
            {
                date: "January 2023",
                version: "3.0.1",
                description: 'Version 3 Upgrade',
                details: [
                    'Upgrade from Vue 2 to Vue 3',
                    'Upgrade Vuex from 3.6.2 to 4.1.0',
                    'Upgrade Vuetify from 2.5.8 to 3.1.1',
                    'Improved layout on hand held devices',
                    'Independant scrolling on options and lists view',
                    'Added button to copy formatted lists to the clipboard on desktop devices. This enables formatted lists to be posted directly into applications, including Excel and Word',
                ]
            },
            {
                date: "March 2020",
                version: "1.0.1",
                description: 'Initial release',
                details: []
            },
        ]
        const version = process.env.VUE_APP_VERSION;

        return { releases, version }
    }
})
</script>

<style scoped>
.release {
    width: 98%;
}

li {
    margin-left: 1rem;
}
</style>