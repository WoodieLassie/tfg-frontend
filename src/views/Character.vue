<template>
    <section v-if="character">
        <section class="character__information">
            <article class="character__header">
                <h1>
                {{ character.name }}
                </h1>
                <!-- <img v-if="show.images" :src="show.images[0].url" :alt="show.name"> -->
            </article>
            <article class="character__body">
                <p>Género: {{ character.gender }}</p>
                <p>Nacionalidad: {{ character.nationality }}</p>
                <p>Edad: {{ character.age }}</p>
                <p>{{ character.description }}</p>
            </article>
        </section>
        <section class="character_actors">
            <h2>Actores que lo interpretan</h2>
            <article v-for = "actor in character.actors" class="character_actors">
                <div class="character__actor__info">
                    <router-link :to="{name: 'actors', params: {id: actor.id}}"> {{ actor.name }}</router-link>
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
                character: null,
                user: null,
                token: cookies.get("token")
            }
        },
        props: {
            id: {type: String, required: true}
        },
        async created() {
            const characterData = await fetch(`http://localhost:8080/api/characters/${this.$props.id}`)
            const characterResponse = await characterData.json()
            this.character = characterResponse
            // cookies.addChangeListener(() => {
            //     this.token = cookies.get("token")
            //     this.checkUser()
            // })
        },
        // async mounted() {
        //     await this.checkUser()
        //     await this.updateComments()
        //     await this.checkIfSaved()
        // },
        // methods: {
        //     async sendComment() {
        //         console.log(this.user.id, this.$props.id, this.commentBox)
        //         const commentBoxData = await fetch('http://localhost:8000/api/comments', {
        //             method: "post",
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //                 userId: this.user.id,
        //                 showId: this.$props.id,
        //                 commentText: this.commentBox,
        //             })
        //         })
        //         const commentBoxResponse = await commentBoxData.json()
        //         this.updateComments()
        //     },
        //     async updateComments() {
        //         const commentData = await fetch(`http://localhost:8000/api/comments/${this.$props.id}`)
        //         const commentResponse = await commentData.json()
        //         this.comments = commentResponse
        //     },
        //     async saveshow() {
        //         const savedshowData = await fetch('http://localhost:8000/api/saved', {
        //             method: "post",
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //                 userId: this.user.id,
        //                 showId: this.$props.id,
        //                 showName: this.show.name,
        //                 showImageSource: this.show.images[0].url
        //             })
        //         })
        //         this.checkIfSaved()
        //     },
        //     async removeshow() {
        //         const deleteSaved = await fetch(`http://localhost:8000/api/saved/${this.saved.id}`, {
        //         method: 'delete',
        //         headers: {
        //             'Authorization': 'Bearer ' + cookies.get("token")
        //         }})
        //         this.saved = null
        //     },
        //     async checkUser() {
        //         if (this.token) {
        //             const userData = await fetch("http://localhost:8000/api/user", {
        //             method: 'get',
        //             headers: {
        //                 'Authorization': 'Bearer ' + cookies.get("token")
        //             }})
        //             const userResponse = await userData.json()
        //             if (userResponse.message) {
        //                 cookies.remove("token", {path:"/"})
        //             }
        //             else {
        //                 this.user = userResponse
        //             }
        //         }
        //         else {
        //             this.user = null
        //         }
        //     },
        //     async checkIfSaved() {
        //         if (this.user) {
        //             const savedData = await fetch(`http://localhost:8000/api/saved/${this.user.id}`, {
        //             method: 'get',
        //             })
        //             const savedResponse = await savedData.json()
        //             const savedshow = savedResponse.find(savedshow => savedshow.showId === this.$props.id)
        //             if (savedshow) {
        //                 this.saved = savedshow
        //             }
        //             else {
        //                 this.saved = null
        //             }
        //         }
        //     }
        // }
    }
</script>