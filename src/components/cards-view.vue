<template>
    <v-card variant="outlined" class="pa-2 noprint" height="80vh">
        <div id="trelloOutput">
            <h1>{{ board.name }}</h1>
            <a :href="board.url">{{ board.url }}</a>
            <br />
            <span v-if="board.dateLastActivity && options.showDates">
                Last Updated:
                {{
                    filters.dateDisplay(board.dateLastActivity, options.useLocalDateFormat)
                }}
                <br />
            </span>
            <div v-if="options.showDescriptions && board.desc != null && board.desc != ''">
                <span v-for="(descLine, ix) in board.descLines" :key="board.id + 'S' + ix">
                    {{ descLine }}
                    <br />
                </span>
            </div>
            <div v-if="board.lists && board.lists.length == 0 && board.name > ''">
                <h3>This board has no lists</h3>
            </div>
            <div v-for="list in board.lists" :key="list.id">
                <h2>{{ list.listNo }}{{ list.name }}</h2>
                <div v-for="card in list.cards" :key="card.id">
                    {{ card.cardNo }}{{ card.name }}
                    <div v-if="options.showDates && card.dateLastActivity" class="Text ml-5 indented">
                        - Last Activity:
                        {{ filters.dateDisplay(card.dateLastActivity, options.useLocalDateFormat) }}
                    </div>
                    <div v-if="options.showDates && card.due" class="Text ml-5 indented">
                        - Due Date:
                        {{ filters.dateDisplay(card.due, options.useLocalDateFormat) }}
                    </div>
                    <div v-if="options.showLabels">
                        <div v-for="label in card.labels" v-bind:key="label.id"
                            :class="label.color + 'Text ml-4 indented'">
                            {{ label.name }}
                        </div>
                    </div>
                    <div v-if="options.showDescriptions && card.desc != ''" class="ml-4 mb-3 indented">
                        <span v-for="(descLine, ix) in card.descLines" :key="card.id + 'S' + ix">
                            {{ descLine }}
                            <br />
                        </span>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
import { Board } from '@/models/Board';
import { CardViewOptions } from '@/models/CardViewOptions';
import { List } from '@/models/List';
import { defineComponent, getCurrentInstance, PropType } from 'vue';


export default defineComponent({
    name: "CardView",
    props: {
        board: {
            type: Object as PropType<Board>,
            required: true,
        },
        options: {
            type: Object as PropType<CardViewOptions>,
            required: true,
        }
        // lists: {
        //     type: Object as PropType<List[]>,
        //     required: true,
        // },
    },
    setup(props, context) {
        const app = getCurrentInstance()
        const filters = app!.appContext.config.globalProperties.$filters;
        return {
            filters
        }
    }
})

</script>