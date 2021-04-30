<script lang="ts">
import { Vue, Options } from 'vue-class-component'

export default class ClassMixin extends Vue {
  message = 'Hello world!'

  created() {
    console.log('ClassMixin created!')
  }
}
</script>
