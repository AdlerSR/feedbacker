<template>
  <custom-header />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">
      feedbacker &copy; 2021
    </p>
  </div>
</template>

<script>
import Contact from './Contact.vue';
import CustomHeader from './CustomHeader.vue';

export default {
  name: 'Home',
  components: {
    CustomHeader,
    Contact,
  },
  setup() {
    function handleLogin() {}

    function handleAccountCreate() {}
  },
};
</script>
