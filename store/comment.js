export const actions = {
    async create({commit}, data) {
        console.log(data)
        try {
            return await this.$axios.$post('/api/comment/', data)
        } catch(e) {
        }
    }
}