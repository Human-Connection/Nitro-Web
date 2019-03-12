<script>
import HcAuthor from '~/components/Author.vue'

let mouseEnterTimer = null
let mouseLeaveTimer = null

export default {
  name: 'HcUser',
  extends: HcAuthor,
  props: {
    user: { type: Object, required: true },
    post: { type: Object, required: false, default: () => {} }
  },
  computed: {
    author() {
      return this.user
    },
    hasAuthor() {
      return Boolean(this.user)
    }
  }
}
</script>
