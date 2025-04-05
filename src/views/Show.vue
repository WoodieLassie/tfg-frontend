<template>
    <section v-if="show">
        <section class="show__information">
            <article class="show__header">
                <h1>
                {{ show.name }}
                </h1>
                <!-- <img v-if="show.imageUrl" :src="show.imageUrl" :alt="show.name"> -->
            </article>
            <article class="show__body">
                <p>{{ show.description }}</p>
                <button @click="saveshow" v-if="!saved && user">Guardar show</button>
                <button @click="removeshow" v-if="saved && user">Borrar show</button>
            </article>
        </section>
        <section class="show__seasons">
            <article v-for = "season in seasons" class="show__season">
                <div class="show__season__info">
                    <router-link :to="{name: 'seasons', params: {id: season.id}}">Temporada {{ season.seasonNum }}</router-link>
                </div>
            </article>
        </section>
        <section class="show__commentbox__container" v-if="user" :key = "user">
            <h2>Escribe tu comentario</h2>
            <form @submit.prevent="sendComment">
                <textarea v-model="commentBox" id="commentBox" class="show__commentbox"></textarea>
                <button @submit="sendComment" class="show__commentbox__button">Enviar comentario</button>
            </form>
        </section>
        <section v-if="comments" class="show__comments">
            <h3 >Comentarios</h3>
            <article v-for="comment in comments" class="show__comment">
                <div class="show__comment__info">
                    <p>{{ comment.email }}</p>
                </div>
                <div class="show__comment__body">
                    <p>{{ comment.text }}</p>
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
                show: null,
                seasons: null,
                comments: null,
                user: null,
                saved: null,
                commentBox: "",
                token: cookies.get("token")
            }
        },
        props: {
            id: {type: String, required: true}
        },
        async created() {
            const showData = await fetch(`http://localhost:8080/api/shows/${this.$props.id}`)
            const showResponse = await showData.json()
            this.show = showResponse
            const seasonsData = await fetch(`http://localhost:8080/api/seasons?showId=${this.$props.id}`)
            const seasonsResponse = await seasonsData.json()
            this.seasons = seasonsResponse
            cookies.addChangeListener(() => {
                this.token = cookies.get("token")
                this.checkUser()
            })
        },
        async mounted() {
            await this.checkUser()
            await this.updateComments()
            await this.checkIfSaved()
        },
        methods: {
            async sendComment() {
                const commentBoxData = await fetch('http://localhost:8080/api/comments', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + cookies.get("token")
                    },
                    body: JSON.stringify({
                        text: this.commentBox,
                        showId: this.$props.id,
                    })
                })
                this.updateComments()
            },
            async updateComments() {
                const commentData = await fetch(`http://localhost:8080/api/comments/${this.$props.id}`)
                const commentResponse = await commentData.json()
                this.comments = commentResponse
            },
            async saveshow() {
                const savedshowData = await fetch('http://localhost:8080/api/favourites', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + cookies.get("token")
                    },
                    body: JSON.stringify({
                        showId: this.$props.id,
                    })
                })
                this.checkIfSaved()
            },
            async removeshow() {
                const deleteSaved = await fetch(`http://localhost:8080/api/favourites/${this.saved.id}`, {
                method: 'delete',
                headers: {
                    'Authorization': 'Bearer ' + cookies.get("token")
                }})
                this.saved = null
            },
            async checkUser() {
                if (this.token) {
                    const userData = await fetch("http://localhost:8080/api/users", {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + cookies.get("token")
                    }})
                    const userResponse = await userData.json()
                    if (userResponse.message) {
                        cookies.remove("token", {path:"/"})
                    }
                    else {
                        this.user = userResponse
                    }
                }
                else {
                    this.user = null
                }
            },
            async checkIfSaved() {
                if (this.user) {
                    const savedData = await fetch(`http://localhost:8080/api/favourites/${this.user.id}`, {
                    method: 'get',
                    })
                    const savedResponse = await savedData.json()
                    const savedshow = savedResponse.find(savedshow => savedshow.show.id == this.$props.id)
                    if (savedshow) {
                        this.saved = savedshow
                    }
                    else {
                        this.saved = null
                    }
                }
            }
        }
    }
</script>