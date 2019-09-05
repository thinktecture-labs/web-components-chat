<template>
    <form @submit="submit">
        <header>{{ loginHeaderText }}</header>
        <div>
            <native-web-component-text-field @valueChange="loginName = $event.target.value"
                                             :isInvalid="isInvalid"
                                             :placeholder="loginPlaceholder"></native-web-component-text-field>
            <!-- We need to submit ourselves, since we don't have form associated elements yet: https://github.com/w3c/webcomponents/issues/814 -->
            <native-web-component-button type="button" @click="submit" :disabled="isInvalid || isPristine">{{
                loginButtonText }}
            </native-web-component-button>
        </div>
    </form>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import '../assets/web-components/native-web-components-button';
    import '../assets/web-components/native-web-components-text-field';

    @Component
    export default class LoginForm extends Vue {
        @Prop({ default: 'Login' }) public loginButtonText: string;
        @Prop({ default: 'Login name' }) public loginPlaceholder: string;
        @Prop({ default: 'Login' }) public loginHeaderText: string;

        public isInvalid = false;
        private isPristine = true;

        private _loginName = '';

        public get loginName() {
            return this._loginName;
        }

        public set loginName(value: string) {
            this.isPristine = false;
            this._loginName = value;
            this.isInvalid = !value;
        }

        public submit(e: Event) {
            if (this.isInvalid) {
                return;
            }

            this.$emit('submit', { name: this._loginName });

            e.preventDefault();
        }
    }
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }

    form div {
        display: flex;
    }

    native-web-component-button {
        margin-left: 4rem;
    }

    header {
        font-size: 18pt;
        font-weight: bold;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid #38a3e5;
    }
</style>
