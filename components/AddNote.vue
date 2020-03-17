<template>
  <div>
    <form class="addnote-form" @submit.prevent="submitNote">
      <label for="noteTitle">Title</label>
      <input id="noteTitle" v-model="noteData.title" type="text" />
      <label for="noteText">Text</label>
      <textarea id="noteText" v-model="noteData.text"></textarea>
      <input type="submit" value="Send" />
    </form>
    <button @click="removeAllNotes">Delete all</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      noteData: {
        title: '',
        text: ''
      }
    }
  },
  methods: {
    submitNote() {
      if (this.noteData.title && this.noteData.text) {
        this.$emit('toggleStatusLoading')
        axios
          .post(
            'https://note-app-690b5.firebaseio.com/notes.json',
            this.noteData
          )
          .then(() => {
            this.$store.dispatch('updateNotes')
            this.noteData.title = ''
            this.noteData.text = ''
          })
          .catch((e) => {
            console.log(e)
          })
          .finally(() => {
            this.$emit('toggleStatusLoading')
          })
      }
    },
    removeAllNotes() {
      this.$emit('toggleStatusLoading')
      axios
        .delete(`https://note-app-690b5.firebaseio.com/notes.json`)
        .then(() => {
          this.$store.dispatch('updateNotes')
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.$emit('toggleStatusLoading')
        })
    }
  }
}
</script>

<style scoped>
.addnote-form {
  display: flex;
  flex-direction: column;
}

.addnote-form input:not(:last-child),
.addnote-form textarea:not(:last-child) {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
}

button {
  width: 100%;
  margin-top: 15px;
}
</style>
