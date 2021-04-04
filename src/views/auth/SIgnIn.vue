<template>
      <v-col
          cols="12"
          sm="8"
      >
        <v-sheet
            min-height="70vh"
            rounded="lg"
            class="pa-6"
        >
          <v-form
              ref="form"
          >
            <v-text-field
                v-model="email"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <v-checkbox
                v-model="checkbox"
                label="Remember me"
                required
            ></v-checkbox>

            <v-btn
                color="success"
                class="mr-4"

            >
              Sign Up
            </v-btn>

            <v-btn
                color="primary"
                class="mr-4"
            >
              Sign In
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    password: '',


    checkbox: false,
  }),

  methods: {
    reset () {
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped>

</style>