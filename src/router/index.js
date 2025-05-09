import Home from "@/views/Home.vue"
import {useCookies} from "@vueuse/integrations/useCookies"
import { createRouter, createWebHistory } from "vue-router"

const cookies = useCookies(["token"])
const routes = [
    {
        path: "/", name: "Home", component: Home
    },
    {
        path: "/access", 
        name: "Access",
        component: () => import("../views/Access.vue")
    },
    {
        path: "/search",
        name: "Search",
        component: () => import("../views/Search.vue")
    },
    {
        path: "/results/:query?",
        name: "results",
        props: route => ({...route.params, query: route.params.query}),
        component: () => import("../views/Results.vue")
    },
    {
        path: "/shows/:id",
        name: "shows",
        props: route => ({...route.params, id: route.params.id}),
        component: () => import("../views/Show.vue")
    },
    {
        path: "/season/:id",
        name: "seasons",
        props: route => ({...route.params, id: route.params.id}),
        component: () => import("../views/Season.vue")
    },
    {
        path: "/episode/:id",
        name: "episodes",
        props: route => ({...route.params, id: route.params.id}),
        component: () => import("../views/Episode.vue")
    },
    {
        path: "/character/:id",
        name: "characters",
        props: route => ({...route.params, id: route.params.id}),
        component: () => import("../views/Character.vue")
    },
    {
        path: "/actor/:id",
        name: "actors",
        props: route => ({...route.params, id: route.params.id}),
        component: () => import("../views/Actor.vue")
    },
    {
        path: "/profile/:id",
        name: "profile",
        props: route => ({...route.params, id: route.params.id}),
        component: () => import("../views/Profile.vue")
    },
    // /show/?showId/seasons --> Endpoint de seasons findAll
    // /show/?ShowId/seasons/?seasonId --> Endpoint de season findById
    // /show/?ShowId/seasons/?seasonId/episodes --> Endpoint de episodes que busca por temporada
    // /show/?Showid/seasons/?seasonId/episodes/?episodeId --> Dará también toda la información sobre personajes y actores. Endpoint de findById de episode
    // /characters
    // /characters/?characterId
    // /actors
    // /actors/?actorId
    // /profile/?userId
    // /admin
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router