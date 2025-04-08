<template>
    <section v-if="user" class="user__info">
        <h1>Perfil</h1> 
        <h4>Username:</h4>
        <p>{{ user.email }}</p>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                user: null,
                userFavourites: null
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
        },
        // async mounted() {
        //     const data = await fetch("http://localhost:8080/api/comments")
        // }
    }
</script>