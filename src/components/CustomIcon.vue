<template>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path :d="path" />
    </svg>
</template>

<script>
// Based on https://stackoverflow.com/a/56392480/4455738
export default {
    name: 'custom-icon',

    data: () => ({
        path: '',
    }),

    methods: {
        updatePath() {
            if (!this.$slots) return
            if (typeof this.$slots.default !== 'function') return

            this.path = this.$slots
                .default()
                .map((n) => n.text)
                .join('')
        },
    },

    mounted() {
        this.updatePath()
    },

    updated() {
        this.updatePath()
    },
}
</script>

<style scoped>
.icon {
    display: block;
    color: inherit;
    fill: currentColor;
    width: 24px;
    height: 24px;
}
</style>