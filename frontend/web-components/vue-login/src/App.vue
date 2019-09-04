<template>
    <div id="app">
        <LoginForm></LoginForm>
    </div>
</template>

<script lang="ts">
    import LoginForm from './components/LoginForm.vue';
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {
            LoginForm,
        },
    })
    export default class App extends Vue {
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
