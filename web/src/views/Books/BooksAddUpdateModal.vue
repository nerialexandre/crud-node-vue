<template>

  <v-dialog
    v-model="dialog"
    persistent
    max-width="700"
  >
    <v-card class="pa-4">
      <v-card-title>
        <span class="text-h5">{{typeForm}} Livro</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="myForm">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Titulo do livro*"
                  v-model="inputBook.title"
                  :rules="rules.titleRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nome do Autor*"
                  v-model="inputBook.author"
                  :rules="rules.authorRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                type="number"
                  label="Numero de páginas"
                  v-model="inputBook.pages"
                  :rules="rules.pageRules"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Data do Lançamento"
                  type="date"
                  v-model="inputBook.releaseDate"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Editora"
                  v-model="inputBook.publishingCompany"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <div>
          <v-alert
            v-model="hasErrorMessage"
            close-text="Close Alert"
            color="red"
            dark
            dismissible
          >
            {{errorMessage}}
          </v-alert>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click="dialog = !dialog"
        >
          Sair
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="submit"
        >
          Salvar
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>
import { reactive, ref, watch, toRefs } from 'vue'
import { requiredField, validatorPositiveZero } from '@/utils/validators'
import BooksService from '@/services/BooksService'

export default {
  props: {
    isAddOrUpdateBookActive: {
      type: Boolean,
      default: false
    },
    typeForm: {
      type: String,
      default: 'Cadastrar'
    },
    inputData: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const myForm = ref(null)
    const rules = {
      authorRules: [(v) => requiredField(v) || 'Nome do autor é obrigatório'],
      titleRules: [(v) => requiredField(v) || 'Titulo do livro é obrigatório'],
      pageRules: [
        (v) => validatorPositiveZero(v) || 'Número de páginas deve ser maior que zero'
      ]
    }

    const state = reactive({
      formValidate: true,
      hasErrorMessage: false,
      errorMessage: null,
      typeForm: props.typeForm,
      inputBook: props.inputData,
      dialog: props.isAddOrUpdateBookActive
    })

    function submit (id = null) {
      console.log(state.inputBook)
      state.formValidate = myForm.value.validate()
      if (state.formValidate) {
        if (props.typeForm === 'Cadastrar') {
          BooksService.create(state.inputBook)
            .then((res) => {
              emit('get-books')
              state.dialog = false
            })
            .catch((error) => {
              if (error.response.data.message) {
                state.errorMessage = error.response.data.message
                state.hasErrorMessage = true
              } else {
                state.errorMessage = error.response.data.errors[0].msg
                state.hasErrorMessage = true
              }
            })
        } else {
          BooksService.update(state.inputBook.id, state.inputBook)
            .then((res) => {
              emit('get-books')
              state.dialog = false
            })
            .catch((error) => {
              if (error.response.data.message) {
                state.errorMessage = error.response.data.message
                state.hasErrorMessage = true
              } else {
                state.errorMessage = error.response.data.errors[0].msg
                state.hasErrorMessage = true
              }
            })
        }
      }
    }

    watch(
      () => state.dialog,
      (dialog) => {
        emit('update:is-add-or-update-book-active', dialog)
      }
    )

    return {
      ...toRefs(state),
      submit,
      rules,
      myForm
    }
  }
}
</script>
