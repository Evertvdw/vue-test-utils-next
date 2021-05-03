<template>
  <div class="hello">
    <h1 data-computed>{{ computedMsg }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class ClassComponent extends Vue {
  dataText: string = 'Hello'
  get computedMsg(): string {
    return `Message: ${this.dataText}`
  }

}
</script>