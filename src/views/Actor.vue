<template>
    <section v-if="actor">
        <section class="actor__information">
            <article class="actor__header">
                <h1>
                {{ actor.name }}
                </h1>
                <!-- <img v-if="show.images" :src="show.images[0].url" :alt="show.name"> -->
            </article>
            <article class="actor__body">
                <p>Género: {{ actor.gender }}</p>
                <p>Nacionalidad: {{ actor.nationality }}</p>
                <p>Fecha de nacimiento: {{ actor.birthDate }}</p>
                <p>Lugar de nacimiento: {{ actor.birthLocation }}</p>
            </article>
        </section>
        <section class="actor__character">
            <h2>Personaje que interpreta</h2>
                <article class="actor__character__info">
                    <router-link :to="{name: 'characters', params: {id: actor.character.id}}"> {{ actor.character.name }}</router-link>
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
                actor: null,
                user: null,
                token: cookies.get("token")
            }
        },
        props: {
            id: {type: String, required: true}
        },
        async created() {
            const actorData = await fetch(`http://localhost:8080/api/actors/${this.$props.id}`)
            const actorResponse = await actorData.json()
            this.actor = actorResponse
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