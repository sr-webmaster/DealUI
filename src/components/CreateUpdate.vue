<template>
  <v-form
    v-if="!isLoading"
    ref="form"
    v-model="isValid"
  >
    <v-layout
      row
      align-center
      pt-3
    >
      <v-btn
        flat
        small
        @click="backToList"
      >
        <div class="back-btn-inner">
          <v-icon>fas fa-arrow-left</v-icon>
          <span>Return</span>
        </div>
      </v-btn>
    </v-layout>
    <v-layout
      row
      justify-space-between
      ma-2
    >
      <h2 class="white--text">
        {{ pageTitle }}
      </h2>
    </v-layout>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'admin',
  components: {
  },
  mixins: [],
  data () {
    return {
      isNew: false
    }
  },
  computed: {
    ...mapGetters('page', ['isLoading']),
    pageTitle () {
      return ('Sales Opportunities Detail')
    }
  },
  methods: {
    ...mapActions('page', {
      setPageLoading: 'setLoading'
    }),
    backToList () {
      this.$router.push({ path: '/admin/sales-opportunities' })
    }
  },
  beforeRouteEnterOrUpdate (vm, to, from, next) {
    vm.setPageLoading(true)
    vm.$store.dispatch('page/setLoading', false)
  }
}
</script>
<style scoped>
    .back-btn-inner{
        color: #fff;
        display: flex;
        align-items: center;
        font-size: 13px;
    }
    .back-btn-inner span{
        margin-left: 10px;
        font-weight: bold;
        text-transform: initial;
    }
    .back-btn-inner .v-icon{
        font-size: 16px;
    }
</style>
