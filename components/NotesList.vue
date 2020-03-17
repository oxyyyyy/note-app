<template>
  <ul class="notes">
    <li
      v-for="note in notes"
      :key="note.id"
      class="notes__item"
      @click="removeNote(note.id)"
    >
      <h6 class="notes__item-title">{{ note.title }}</h6>
      <p class="notes__item-text">{{ note.text }}</p>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  methods: {
    removeNote(id) {
      this.$emit('toggleStatusLoading')
      axios
        .delete(`https://note-app-690b5.firebaseio.com/notes/${id}.json`)
        .then(() => {
          this.$store.dispatch('updateNotes')
        })
        .catch((e) => {
          // console.log(e)
        })
        .finally(() => {
          this.$emit('toggleStatusLoading')
        })
    }
  }
}
</script>

<style>
.notes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
}

.notes__item {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 15px;
}

.notes__item-title {
  font-size: 18px;
  margin-bottom: 7px;
}
</style>
