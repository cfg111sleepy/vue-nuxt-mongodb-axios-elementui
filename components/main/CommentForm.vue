<template>
    <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
    >
        <h1>
            Add Comment
        </h1>
        <el-form-item label="Name" prop="name">
            <el-input v-model="controls.name" />
        </el-form-item>
        <el-form-item label="Text" prop="text">
            <el-input
                type="textarea"
                resize="none"
                :rows="2"
                v-model="controls.text"
            />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading" round>Create comment</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    data: () => ({
        loading: false,
        controls: {
            name: "",
            text: ""
        },
        rules: {
            name: [
                {
                    required: true,
                    message: "Please input Activity name",
                    trigger: "blur"
                }
            ],
            text: [
                {
                    required: true,
                    message: "Please input Activity text",
                    trigger: "blur"
                }
            ]
        }
    }),
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true
                    const formData = {
                        name: this.controls.name,
                        text: this.controls.text,
                        postId: this.postId
                    }
                    try{
                        const newComment = await this.$store.dispatch('comment/create', formData)
                        this.$message.success('Comment added')
                        this.$emit('created', newComment)
                    } catch (e){
                        this.loading = false
                    }
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped></style>
