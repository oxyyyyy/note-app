<template>
  <div class="container">
    <div class="dashboard">
      <AddNote @toggleStatusLoading="isLoading = !isLoading" />
      <NotesList
        :notes="$store.getters.getNotes"
        :class="{ isLoading: isLoading }"
        @toggleStatusLoading="isLoading = !isLoading"
      />
    </div>
  </div>
</template>

<script>
import AddNote from '~/components/AddNote.vue'
import NotesList from '~/components/NotesList'

export default {
  components: {
    AddNote,
    NotesList
  },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>

<style>
.container {
  max-width: 1180px;
  padding: 0 15px;
  margin: 0 auto;
}

.dashboard {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 50px;
  padding: 50px 0;
}

.isLoading {
  opacity: 0.3;
}
</style>
