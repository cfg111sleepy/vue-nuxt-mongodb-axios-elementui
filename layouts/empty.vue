<template>
    <div class="empty-layout">
        <nuxt />
    </div>
</template>

<script>
export default {
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(value) {
            this.$message.error(value.response.data.message)
        }
    }
}
</script>

<style lang="scss" scoped>
.empty-layout {
    display: flex;
    justify-content: center;
    padding-top: 4rem;
    width: 100%;
}
</style>