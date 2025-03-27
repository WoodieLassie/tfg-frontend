<template>
    <section v-if="shows" :key="shows" class="show__card__container">
        <h1>Resultados</h1>
        <article class="show__card" v-for="show in shows" :key="show.id">
            <router-link  :to="{name: 'shows', params: {id: show.id}}">
                <img v-if="show.images" :src="show.images[0].url" :alt="show.name">
                <div class="show__card__content">
                    <h2>
                        {{ show.name }}
                    </h2>
                    <p>{{ show.description }}</p>
                </div>
            </router-link> 
        </article>
    </section>
    <section v-else-if="shows === false">
        <h2>No hay resultados</h2>
    </section>
    <section v-else-if="error">
        <h2>Error de búsqueda. Por favor, usa el formulario para realizar búsquedas</h2>
    </section>
</template>

<script>
export default {
    props: {
        query: {type: String, required: false},
    },
    data() {
        return {
            shows: null,
            error: false,
        }
    },
    watch: {
        $route (to, from) {
            this.searchshows()
        }
    },
    async created() {
        await this.searchshows()
    },
    methods: {
        async searchshows() {
            try {
                const data = await fetch(`http://localhost:8080/api/shows/sorted?name=${this.$props.query}`)
                const results = await data.json()
                if (results) {
                    this.shows = results
                    return
                }
                this.shows = false
            }
            catch {
                this.error = true
            }
        }
    }
}

</script>