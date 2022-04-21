<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <vc-button type="primary" @click="click('template')"
      >button with template</vc-button
    >
    <br />
    <br />
    <vc-render-button type="primary" @click="click('render')"
      >button with render</vc-render-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
  methods: {
    click(type: string) {
      console.log(type);
    },
  },
});
</script>
