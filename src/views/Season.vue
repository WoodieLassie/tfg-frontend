<template>
    <section v-if="season">
        <section class="show__information">
            <article class="show__header">
                <h1>
                {{ season.seasonNum }}
                </h1>
                <!-- <img v-if="show.images" :src="show.images[0].url" :alt="show.name"> -->
            </article>
            <article class="show__body">
                <p>{{ season.description }}</p>
            </article>
        </section>
        <section class="show__seasons">
            <article v-for = "episode in episodes" class="season__episode">
                <div class="show__season__info">
                    <router-link :to="{name: 'episodes', params: {id: episode.id}}">Episodio {{ episode.episodeNum }}</router-link>
                </div>
            </article>
        </section>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                season: null,
                episodes: null,
                user: null,
                token: cookies.get("token")
            }
        },
        props: {
            id: {type: String, required: true}
        },
        async created() {
            const seasonData = await fetch(`http://localhost:8080/api/seasons/${this.$props.id}`)
            const seasonResponse = await seasonData.json()
            this.season = seasonResponse
            const episodesData = await fetch(`http://localhost:8080/api/episodes?seasonId=${this.season.seasonNum}`)
            const episodesResponse = await episodesData.json()
            this.episodes = episodesResponse
        },
    }
</script>