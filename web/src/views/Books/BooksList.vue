<template>
  <v-card
    elevation="2"
    class="ma-10"
  >
    <books-add-update-modal
      v-if="state.isAddOrUpdateBookActive"
      :is-add-or-update-book-active.sync="state.isAddOrUpdateBookActive"
      :type-form.sync="state.typeForm"
      :input-data="state.inpuData"
      @get-books="getBooks()"
    />

    <div class="d-block d-flex justify-space-between align-center px-3">
      <v-card-title>
        Lista de Livros
      </v-card-title>
      <v-btn
        color="primary"
        dark
        @click="openAddForm"
      >Adicionar Novo Livro
      </v-btn>
    </div>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Titulo
            </th>
            <th class="text-left">
              Autor
            </th>
            <th class="text-left">
              Editora
            </th>
            <th class="text-left">
              Paginas
            </th>
            <th class="text-left">
              Ano de lançamento
            </th>
            <th class="text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>

          <tr v-if="state.books.length <= 0">
            <td
              class="text-center"
              colspan="12"
            >
              Nenhum item encontrado
            </td>

          </tr>
          <tr
            v-for="item in state.books"
            :key="item.id"
          >
            <td>{{ item.title }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.publishingCompany }}</td>
            <td>{{ item.pages }}</td>
            <td>{{ item.releaseDate }}</td>
            <td class="text-center">
              <v-btn
                class="ma-2"
                color="primary"
                title="editar"
                dark
                @click="openUpdateForm(item.id)"
              >
                <v-icon
                  dark
                  center
                >
                  mdi-pencil
                </v-icon>
              </v-btn>

              <v-btn
                class="ma-2"
                color="red"
                title="excluir"
                dark
                @click="deleteBook(item.id)"
              >
                <v-icon
                  dark
                  center
                >
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>

            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row justify="space-between">
      <v-col
        cols="12"
        xsm="12"
        sm="12"
        lg="2"
        md="2"
      >
        <v-container class="max-width">
          <v-select
            v-model="state.perPageSelect"
            :items="state.perPageOptions"
            item-text="label"
            item-value="value"
            label="Select"
            hint="Itens por página"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </v-container>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        lg="4"
        md="4"
      >
        <v-container class="d-flex justify-lg-end justify-sm-center">
          <v-pagination
            v-model="state.page"
            class="my-4"
            :total-visible="7"
            :length="15"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>

  </v-card>

</template>

<script>
import { onMounted, reactive, watch } from 'vue'
import BooksService from '@/services/BooksService'
import BooksAddUpdateModal from './BooksAddUpdateModal.vue'

export default {
  components: {
    BooksAddUpdateModal
  },
  setup () {
    onMounted(() => {
      getBooks()
    })

    const state = reactive({
      books: [],
      isAddOrUpdateBookActive: false,
      typeForm: 'Cadastrar',
      page: 1,
      limit: 10,
      inpuData: {
        id: '',
        title: '',
        author: '',
        pages: '',
        releaseDate: '',
        publishingCompany: ''
      },
      perPageSelect: { value: 10 },
      perPageOptions: [
        { label: '10', value: 10 },
        { label: '40', value: 40 },
        { label: '100', value: 100 }
      ]
    })

    function openAddForm (params) {
      state.typeForm = 'Cadastrar'
      state.inpuData = {
        id: '',
        title: '',
        author: '',
        pages: '',
        releaseDate: '',
        publishingCompany: ''
      }
      state.isAddOrUpdateBookActive = !state.isAddOrUpdateBookActive
    }

    function openUpdateForm (id) {
      BooksService.getOne(id).then((res) => {
        state.inpuData = res.data.result
        state.typeForm = 'Editar'
        state.isAddOrUpdateBookActive = !state.isAddOrUpdateBookActive
      })
    }

    function getBooks (page = 1, limit = 10) {
      BooksService.getAll({ page, limit }).then((res) => {
        state.books = res.data.result
      })
    }

    function deleteBook (id) {
      this.$swal({
        title: 'Você realmente quer excluir?',
        text: 'Está ação não poderá ser revertida!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((res) => {
        if (res.isConfirmed) {
          BooksService.delete(id).then((res) => {
            state.books = state.books.filter((book) => book.id !== id)
          })
        }
      })
    }

    watch(
      () => state.perPageSelect,
      (perPageSelect, prevPerPageSelect) => {
        getBooks(state.page, perPageSelect.value)
      }
    )

    watch(
      () => state.page,
      (page, prevPage) => {
        getBooks(page, state.perPageSelect.value)
      }
    )

    return {
      state,
      getBooks,
      openUpdateForm,
      deleteBook,
      openAddForm
    }
  }
}
</script>
