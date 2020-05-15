<template>
    <div class="page-wrap">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item to="/admin/list">Posts</el-breadcrumb-item>
            <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form
            :model="controls"
            :rules="rules"
            ref="form"
            @submit.native.prevent="onSubmit"
        >
            <!-- <h2>
                Sign in Admin Panel
            </h2> -->
            <el-form-item label="Text in format .md or .html" prop="text">
                <el-input
                    type="textarea"
                    resize="none"
                    :rows="10"
                    v-model.trim="controls.text"
                />
            </el-form-item>
            <div class="md">
                <small class="mr">
                    <i class="el-icon-time"></i>
                    <span>{{ new Date(post.date).toLocaleDateString() }}</span>
                </small>
                <small>
                    <i class="el-icon-view"></i>
                    <span>{{ post.views }}</span>
                </small>
            </div>
            <el-form-item>
                <el-button
                    type="primary"
                    native-type="submit"
                    :loading="loading"
                    round
                    >Update</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    layout: "admin",
    middleware: ["admin-auth"],
    validate({params}) {
        return Boolean(params.id)
    },
    head() {
        return {
            title: `${this.post.title}`
        }
    },
    async asyncData({ store, params }) {
        const post = await store.dispatch("post/fetchAdminById", params.id)
        post.views++
        await store.dispatch("post/addView", post)
        return { post }
    },
    data: () => ({
        loading: false,
        controls: {
            text: ""
        },
        rules: {
            text: [
                {
                    required: true,
                    message: "Please input Activity text",
                    trigger: "blur"
                }
            ]
        }
    }),
    mounted() {
        this.controls.text = this.post.text
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true
                    const formData = {
                        text: this.controls.text,
                        id: this.post._id
                    }
                    
                    try {
                        await this.$store.dispatch('post/update', formData)
                        this.$message.success('Post updated')
                        this.loading = false
                    } catch (e) {
                        this.loading = false
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.page-wrap {
    width: 600px;
}
.mr {
    margin-right: 2rem;
}
</style>
