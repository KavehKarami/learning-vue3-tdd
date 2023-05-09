<template>
  <div class="card mt-5">
    <div class="card-header text-center">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.body" class="card-body">
      <slot name="body"></slot>
    </div>
    <slot></slot>

    <div v-if="$slots.footer" class="card-footer text-center">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
