<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ title }}</label>
    <input
      :id="id"
      class="form-control"
      :class="{ 'is-invalid': help }"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span
      v-if="help"
      :data-testid="helpTestId"
      class="text-danger"
      :class="{ 'invalid-feedback': help }"
    >
      {{ help }}
    </span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    help: {
      type: String,
    },
    modelValue: {
      type: String,
      default: "",
    },
    helpTestId: {
      type: String,
      required: false,
    },
  },
};
</script>
