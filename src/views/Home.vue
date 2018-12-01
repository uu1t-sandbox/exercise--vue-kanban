<template>
  <div class="home">
    <KbnLoginView :onlogin="() => {}"/>
  </div>
</template>

<script>
import KbnLoginView from '@/components/templates/KbnLoginView.vue'

export default {
  name: 'Home',
  components: {
    KbnLoginView
  }
}
</script>
