<template>
    <section class="form__container">
        <h1>¿Qué serie quieres ver?</h1>
        <form @submit.prevent="searchShows">
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="showQuery" class="form__label">Nombre</label>
                </div>
                <div class="form__column_big">
                    <input type="text" id="showQuery" name="showQuery" v-model="showQuery" placeholder="Cualquiera" class="form__input">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <router-link class="form__button" :to="{name: 'results', params: {query: showQuery}}">Buscar</router-link>
            </fieldset>
        </form>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                showQuery: "",
            }
        },
    }
</script>