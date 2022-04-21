<template>
  <button
    :class="['vc-btn', `vc-btn-${type}`]"
    v-on="listeners"
  >
    <slot />
  </button>
</template>

<style lang="scss"></style>

<script src="./Button.ts" lang="ts"></script>
