export const actions = {
    async fetch({commit }) {
        try {
           return await this.$axios.$get('/api/post/')
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchAdmin({commit}) {
        try {
           return await this.$axios.$get('/api/post/admin')
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async remove({commit}, id) {
        try {
            return await this.$axios.$delete(`/api/post/admin/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchAdminById({commit}, id) {
        try {
            return await this.$axios.$get(`/api/post/admin/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async update({}, {id, text}) {
        try {
            return await this.$axios.$put(`/api/post/admin/${id}`, {text})
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async create({commit}, {title, text, image}) {
        try {
            const fd = new FormData()
            
            fd.append('image', image, image.name)
            fd.append('title', title)
            fd.append('text', text)
            
            return await this.$axios.$post('/api/post/admin', fd)
            
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async fetchById({commit}, id) {
        try {
            return await this.$axios.$get(`/api/post/${id}`)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async addView({dispatch, commit}, {_id, views}) {
        return await this.$axios.$put('/api/post/add/view/' + _id, {views})
      }
}