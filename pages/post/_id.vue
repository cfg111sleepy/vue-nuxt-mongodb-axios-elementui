<template>
    <article class="post">
        <header class="post-header">
            <div class="post-title">
                <h1>{{post.title}}</h1>
                <nuxt-link to="/"><i class="el-icon-back" ></i></nuxt-link>
            </div>
            <div class="post-info">
                <small>
                    <i class="el-icon-time"></i>
                    {{new Date(post.date).toLocaleString()}}
                </small>
                <small>
                    <i class="el-icon-view"></i>
                    {{post.views || 0}}
                </small>
            </div>
            <div class="post-img">
                <img :src="post.imageUrl" alt="post image">
            </div>
        </header>
        <main class="post-content">
            <vue-markdown>{{post.text}}</vue-markdown>
        </main>
        <footer>
            <app-comment-form
                v-if="canAddComment"
                @created="createCommentHandler"
                :postId="post._id"
            />
            <div class="comments" v-if="post.comments.length">
                <app-comment
                    v-for="comment in post.comments"
                    :key="comment._id"
                    :comment="comment" 
                />
            </div>
            <div class="text-center" v-else>
                Comments not found 
            </div>
        </footer>
    </article>
</template>
    
<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'

export default {
    data: () => ({
        canAddComment: true
    }),
    async asyncData({ store, params }) {
        const post = await store.dispatch('post/fetchById', params.id) 
        return { post }
    },
    validate({ params }) {
        return Boolean(params.id)
    },
    components: {
        AppComment,
        AppCommentForm
    },
    methods: {
        createCommentHandler(comment) {
            this.post.comments.unshift(comment)
            this.canAddComment = false
        }
    }
};
</script>
<style lang="scss" scoped>
.post {
    max-width: 600px;
    margin: 0 auto;
}
.post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
.post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
}
.post-img img {
    width: 100%;
    height: auto;
}
.post-header {
    margin-bottom: 1.5rem;
}
.post-content {
    margin-bottom: 2rem;
}
</style>
