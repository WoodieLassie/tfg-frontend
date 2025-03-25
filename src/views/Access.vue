<template>
    <section class="forms__container">
        <section v-if="!showRegister" class="form__container">
            <h1>Iniciar sesión</h1>
            <form @submit.prevent="login" class="form">
                <fieldset class="form__row" id="formEmailContainer">
                    <div class="form__column__small">
                        <label for="formEmail" class="form__label">Email</label>
                    </div>
                    <div class="form__column__big">
                        <input type="text" v-model="loginFormEmail" id="loginFormEmail" name="email" ref="loginFormEmail" class="form__input" @blur="validateField(this.$refs.loginFormEmail)">
                    </div>
                </fieldset>
                <fieldset class="form__row">
                    <div class="form__column__small">
                        <label for="formPassword" class="form__label">Contraseña</label>
                    </div>
                    <div class="form__column__big">
                        <input type="password" v-model="loginFormPassword" id="loginFormPassword" name="contraseña" ref="loginFormPassword" class="form__input" @blur="validateField(this.$refs.loginFormPassword)">
                    </div>
                </fieldset>
                <fieldset class="form__row">
                    <button @submit="login" class="form__button" ref="loginSubmitButton" disabled>Login</button>
                </fieldset>
                <fieldset class="form__row">
                    <button class="form__button" ref="showRegister" @click="showRegister = !showRegister">¿No tienes una cuenta? Regístrate</button>
                </fieldset>
            </form>
        </section>
        <section v-if="showRegister" class="form__container">
            <h1>Registrarse</h1>
            <form @submit.prevent="register" class="form">
                <fieldset class="form__row">
                    <div class="form__column__small">
                        <label for="formEmail" class="form__label">Email</label>
                    </div>
                    <div class="form__column__big">
                        <input type="text" v-model="registerFormEmail" id="registerFormEmail" ref="registerFormEmail" name="email" class="form__input" @blur="validateField(this.$refs.registerFormEmail)">
                    </div>
                </fieldset>
                <fieldset class="form__row">
                    <div class="form__column__small">
                        <label for="formPassword" class="form__label">Contraseña</label>
                    </div>
                    <div class="form__column__big">
                        <input type="password" v-model="registerFormPassword" id="registerFormPassword" ref="registerFormPassword" name="contraseña" class="form__input" @blur="validateField(this.$refs.registerFormPassword)">
                    </div>
                </fieldset>
                <fieldset class="form__row">
                    <button @submit="register" class="form__button" ref="registerSubmitButton" disabled>Registrarse</button>
                </fieldset>
                <fieldset class="form__row">
                    <button class="form__button" ref="showRegister" @click="showRegister = !showRegister">¿Ya tienes una cuenta? Inicia sesión</button>
                </fieldset>
            </form>
        </section>
    </section>
    
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    import { render, h } from 'vue'
    import FormError from "../components/FormError.vue"
    const cookies = useCookies(["token"])

    export default {
        data() {
            return {
                loginFormEmail: "",
                loginFormPassword: "",
                registerFormEmail: "",
                registerFormPassword: "",
                showRegister: false
            }
        },
        methods: {
            async login() {
                    const auth = btoa("d40168ee-cbd4-4833-85f2-65c289ec4a6d:admin")
                    const data = await fetch('http://localhost:8080/oauth2/token', {
                    method: "post",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${auth}`
                    },
                    body: new URLSearchParams({
                        grant_type: "custom_password",
                        scopes: "read write",
                        username: this.loginFormEmail,
                        password: this.loginFormPassword,
                    })
                })
                const response = await data.json()
                if (data.status === 200) {
                    console.log(response.access_token)
                }
                else {
                    this.createLoginError()
                }
            },
            async register() {
                const data = await fetch('http://127.0.0.1:8080/api/users', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        email: this.registerFormEmail,
                        password: this.registerFormPassword,
                        role: 'USER'
                    })
                })
                if (data.status === 201) {
                    this.createLoginOK()
                }
                else {
                    this.createRegisterError()
                }
            },
            validateField(field) {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (field.value === "") {
                    this.createFormError(`Error, el campo ${field.name} debe tener un valor`, field.parentElement)
                    return
                }
                else if (field.name === "email" && !field.value.toLowerCase().match(emailRegex)) {
                    this.createFormError(`Error, el campo ${field.name} debe contener un email válido`, field.parentElement)
                    return
                }
                this.removeFormError()
                if (this.showRegister) {
                    this.activateRegisterSubmitButton(emailRegex)
                }
                if (!this.showRegister) {
                    this.activateLoginSubmitButton(emailRegex)
                }
            },
            createLoginOK() {
                const formError = h(FormError, {message: 'Usuario registrado con éxito'})
                render(formError, this.$el)
            },
            createLoginError() {
                const formError = h(FormError, {message: 'Error de login, credenciales incorrectas'})
                render(formError, this.$el)
            },
            createRegisterError() {
                const formError = h(FormError, {message: 'Correo ya registrado'})
                render(formError, this.$el)
            },
            createFormError(message, location) {
                if (this.showRegister) {
                    this.deactivateRegisterSubmitButton()
                }
                else {
                    this.deactivateLoginSubmitButton()
                }
                const formError = h(FormError, {message: message})
                render(formError, location)
            },
            removeFormError() {
                const formError = document.querySelectorAll("#formError")
                formError.forEach((error) => {
                    error.remove()
                })
            },
            activateLoginSubmitButton(emailRegex) {
                if (this.$refs.loginFormEmail.value.toLowerCase().match(emailRegex) && this.$refs.loginFormPassword.value !== "") {
                    this.$refs.loginSubmitButton.removeAttribute("disabled")
                }
            },
            activateRegisterSubmitButton(emailRegex) {
                if (this.$refs.registerFormEmail.value.toLowerCase().match(emailRegex) && this.$refs.registerFormPassword.value !== "") {
                    this.$refs.registerSubmitButton.removeAttribute("disabled")
                }
            },
            deactivateLoginSubmitButton() {
                this.$refs.loginSubmitButton.setAttribute("disabled", true)
            },
            deactivateRegisterSubmitButton() {
                this.$refs.registerSubmitButton.setAttribute("disabled", true)
            }
        }
    }
</script>