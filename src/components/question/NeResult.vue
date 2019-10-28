<template>
  <div class="col-12">
    <h1>Resultat</h1>
    <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
      <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'result',
  created: function () {
    console.log(this.$route.params)
  },
  methods: {
  },
  data: () => {
    return {
    }
  }
}
</script>
