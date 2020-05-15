<template>
    <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
    >
        <h1 class="mb">Create Post</h1>
        <el-form-item label="Please input post title" prop="title">
            <el-input resize="none" :rows="10" v-model="controls.title" />
        </el-form-item>
        <el-form-item label="Text in format .md or .html" prop="text">
            <el-input
                type="textarea"
                resize="none"
                :rows="10"
                v-model="controls.text"
            />
        </el-form-item>
        <el-button
            class="mb"
            type="success"
            plain
            @click="previewDialog = true"
        >
            Preview
        </el-button>
        <el-dialog title="Preview" :visible.sync="previewDialog">
            <div :key="controls.text">
                <vue-markdown>{{ controls.text }}</vue-markdown>
            </div>
        </el-dialog>

        <el-upload
            class="mb"
            drag
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleImageChange"
            :auto-upload="false"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
            <div class="el-upload__tip" slot="tip">
                jpg/png files with a size less than 500kb
            </div>
        </el-upload>
        <el-form-item>
            <el-button
                type="primary"
                native-type="submit"
                :loading="loading"
                round
                >Create</el-button
            >
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    layout: "admin",
    middleware: ["admin-auth"],
    data: () => ({
        image: null,
        loading: false,
        previewDialog: false,
        controls: {
            text: "",
            title: ""
        },
        rules: {
            text: [
                {
                    required: true,
                    message: "Please input Activity text",
                    trigger: "blur"
                }
            ],
            title: [
                {
                    required: true,
                    message: "Please input Activity title",
                    trigger: "blur"
                }
            ]
        }
    }),
    methods: {
        handleImageChange(file, fileList) {
            this.image = file.raw
        },
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid && this.image) {
                    this.loading = true
                    const formData = {
                        text: this.controls.text,
                        title: this.controls.title,
                        image: this.image
                    };

                    try {
                        await this.$store.dispatch("post/create", formData)
                        this.controls.text = ""
                        this.controls.title = ""
                        this.image = null
                        this.$refs.upload.clearFiles()
                        this.$message.success("Post created")
                        this.loading = false
                    } catch (e) {}
                }
                else {
                    this.$message.warning('form dont valide')
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
form {
    width: 600px;
}
</style>
