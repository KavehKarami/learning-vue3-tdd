<template>
  <div class="mt-2">
    <span
      class="me-3"
      data-testid="englishLang"
      style="cursor: pointer"
      @click="$i18n.locale = 'en'"
    >
      <img
        src="https://cdn.countryflags.com/thumbs/united-kingdom/flag-square-250.png"
        width="25"
        alt="United Kingdom"
      />
    </span>

    <span
      data-testid="persianLang"
      style="cursor: pointer"
      @click="$i18n.locale = 'fa'"
    >
      <img
        src="https://cdn.countryflags.com/thumbs/iran/flag-square-250.png"
        width="25"
        alt="Iran"
      />
    </span>
  </div>
</template>
