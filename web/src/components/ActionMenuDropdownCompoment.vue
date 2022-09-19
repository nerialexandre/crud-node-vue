<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="black"
        icon
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          dark
          center
        >
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        type="button"
        v-for="(item, index) in items"
        :key="index"
        @click="item.action(item.id)"
      >
        <v-list-item-title class="d-flex align-center">
          <v-icon
            dark
            center
            color="black"
            class="mr-3"
          >
            {{ item.icon }}
          </v-icon>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  setup () {
    const items = [
      {
        title: 'Editar',
        icon: 'mdi-pencil',
        action (id) {
          console.log('editar')
        }
      },
      {
        title: 'Deletar',
        icon: 'mdi-trash-can-outline',
        action (id) {
          console.log('deletar')
        }
      }
    ]

    return {
      items
    }
  }
}
</script>

<script>
