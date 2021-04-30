<template>
  <div class="hello">
    <h1 data-mixin>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ClassMixin from './ClassMixin.vue'

@Options({
  mixins: [ClassMixin]
})
export default class ClassComponent extends Vue {}
</script>
