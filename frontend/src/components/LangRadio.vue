<template>
  <div>
    <n3-radio-group @change="setLocaleCookie" v-model="$i18n.locale" type="primary">
      <n3-radio-btn label="left" disabled>
        <n3-icon type="globe"></n3-icon>
      </n3-radio-btn>
      <n3-radio-btn label="en">{{$t('lang.en')}}</n3-radio-btn>
      <n3-radio-btn label="fr">{{$t('lang.fr')}}</n3-radio-btn>
    </n3-radio-group>
  </div>
</template>

<script>
import cookies from "js-cookie";

export default {
  methods: {
    setLocaleCookie(lang) {
      cookies.set("locale", lang);
    }
  }
};
</script>
