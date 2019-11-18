<template>
  <div class="col-12">
    <h1 class="text-center">Administration</h1>
    <b-button block variant="primary" @click="onEntrepriseClick()">entreprise</b-button>
    <b-button block variant="info" @click="onPoolClick()">pool de questions</b-button>
  </div>
</template>

<script>

export default {
  name: 'admin',
  methods: {
    onPoolClick: function () {
      this.$router.push('/admin/pool')
    },
    onEntrepriseClick: function () {
      this.$router.push('/admin/entreprise')
    }
  }
}
</script>
