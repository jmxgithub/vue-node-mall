<template>
  <div>
   <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show': mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <!-- <div class="md-title">Login in</div> -->
          <slot name="md-title"></slot>
          
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="md-content"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>
<style>
  
</style>

<script>
import Counter from './Counter'
export default {
  props :[ "mdShow"],
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
}
</script>

<style scoped>

</style>

