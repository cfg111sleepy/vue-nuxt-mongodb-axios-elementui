<template>
    <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
    >
        <h2>
            Add User
        </h2>
        <el-form-item label="Login" prop="login">
            <el-input v-model.trim="controls.login" />
        </el-form-item>
        <div class="md2">
            <el-form-item label="Password" prop="password">
                <el-input
                    resize="none"
                    :rows="2"
                    type="password"
                    v-model.trim="controls.password"
                />
            </el-form-item>
        </div>
        <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading" round>Create</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    layout: 'admin',
    //middleware: ['admin-auth'],
    data: () => ({
        loading: false,
        controls: {
            login: "",
            password: ""
        },
        rules: {
            login: [
                {
                    required: true,
                    message: "Please input Activity login",
                    trigger: "blur"
                }
            ],
            password: [
                {
                    required: true,
                    message: "Please input Activity password",
                    trigger: "blur"
                },
                {
                    min: 6,
                    message: "Password must be at least 6 characters",
                    trigger: "blur"
                }
            ]
        }
    }),
    methods: {
        onSubmit() {
             this.$refs.form.validate(async valid => {
                 if(valid){
                    this.loading = true
                    try {
                        const formData = {
                            login: this.controls.login,
                            password: this.controls.password
                        }
                        await this.$store.dispatch('auth/createUser', formData)
                        this.$message.success('created user!')
                        this.controls.login = ''
                        this.controls.password = ''
                        this.loading = false
                    }

                    catch(e) {
                        this.loading = false
                    }
                 }
             })
        }
    }
}
</script>

<style lang="scss" scoped>
form {
    width: 600px;
}
</style>