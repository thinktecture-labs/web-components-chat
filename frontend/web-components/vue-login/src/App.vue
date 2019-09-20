<template>
    <div id="app">
        <LoginForm @submit="username => this.submit(username)"></LoginForm>
        Submited username: {{ username }}
    </div>
</template>

<script lang="ts">
    import LoginForm from './components/LoginForm.vue';
    import { Component, Vue } from 'vue-property-decorator';
    import './assets/web-components/native-web-components-button';
    import './assets/web-components/native-web-components-text-field';

    @Component({
        components: {
            LoginForm,
        },
    })
    export default class App extends Vue {
        public username: string = '';

        public submit(username: string) {
            this.username = username;
        }
    }
</script>

<style>
    #app {
        font-family: 'Montserrat', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16pt;
    }
</style>
