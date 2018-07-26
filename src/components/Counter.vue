<template>
    <div>
         <button @click="add">+</button>
         <button v-on:click="sub">-</button>
         <p><span>{{num}}</span></p>

    </div>
</template>
<style>

</style>
<script>
export default {
    props: ['num'],
    data () {
        return {
            num: 0
        }
    },
    methods: {
        add () {
            this.$emit("add");
        },
        sub () {
            this.$emit("sub");
        }
    }
}
</script>