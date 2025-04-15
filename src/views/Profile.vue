<template>
    <section v-if="user" class="user__profile">
        <article class="user__info">
            <h1>Perfil</h1> 
            <h4>Username:</h4>
            <p>{{ user.email }}</p>
        </article>
    </section>
    <section v-if="userFavourites" class="user__favourites">
        <article class="user__favourite" v-for = "userFavourite in userFavourites">
            <h2>Lista de favoritos</h2>
            <router-link :to="{name: 'shows', params: {id: userFavourite.show.id}}">
            <div>
                <h2>{{ userFavourite.show.name }}</h2>
                <p>{{ userFavourite.show.description }}</p>
            </div>
            </router-link>
        </article>
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
        props: {
            id: {type: String, required: true}
        },
        async created() {
            const data = await fetch(`http://localhost:8080/api/users/${this.$props.id}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
            const response = await data.json()
            this.user = response
        },
        async mounted() {
            const data = await fetch (`http://localhost:8080/api/favourites/${this.$props.id}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }})
            const response = await data.json()
            this.userFavourites = response
        }
        // async mounted() {
        //     const data = await fetch("http://localhost:8080/api/comments")
        // }
    }
</script>