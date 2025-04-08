<template>
    <router-link to="/">Home</router-link>
    <router-link to="/access">Access</router-link>
    <router-link to="/search">Search</router-link>
    <router-link v-if="user" :key="user" :to="{name: 'profile', params: {id: user.id}}">Perfil</router-link>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                user: null,
                token: cookies.get("token")
            }
        },
        async created() {
            const data = await fetch(`http://localhost:8080/api/users`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
            const response = await data.json()
            this.user = response
        }
    }
</script>