<template>
  <div class="flex justify-between">
    <h1 class="text-3xl font-black text-gray-800">Entre na sua conta</h1>
    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800"> E-mail </span>
        <input
          v-model="state.email.value"
          type="email"
          :class="{ 'border-brand-danger': !!state.email.error }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="jane.dae@gmail.com"
        />
        <span
          v-if="!!state.email.error"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.error }}
        </span>
      </label>
      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800"> Senha </span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{ 'border-brand-danger': !!state.password.error }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="Insira a sua senha"
        />
        <span
          v-if="!!state.password.error"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.error }}
        </span>
      </label>

      <button
        type="submit"
        :disabled="state.isLoading"
        :class="{ 'opacity: 50': state.isLoading }"
        class="px-8 py-3 my-10 text-1xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        Entrar
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useField } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import useModal from '../../hooks/useModal';
import {
  validateEmptyAndLength6,
  validateEmptyAndEmail,
} from '../../utils/validators';
import services from '../../services';

export default {
  setup() {
    const modal = useModal();
    const router = useRouter();
    const toast = useToast();

    const { value: emailValue, errorMessage: emailError } = useField(
      'email',
      validateEmptyAndEmail,
    );
    const { value: passwordValue, errorMessage: passwordError } = useField(
      'password',
      validateEmptyAndLength6,
    );

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        error: emailError,
      },
      password: {
        value: passwordValue,
        error: passwordError,
      },
    });

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;

        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          window.localStorage.setItem('@feedbacker:token', data.token);
          router.push({ name: 'Feedbacks' });
          modal.close();
          state.isLoading = false;

          return;
        }

        if (errors.status === 404) {
          toast.error('E-mail não encontrado');
        }
        if (errors.status === 401) {
          toast.error('E-mail/senha inválidos');
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o login');
        }
      } catch (error) {
        state.isLoading = false;
        state.hasErrors = !!error;

        toast.error('Ocorreu um erro ao fazer o login');
      }
    }

    return { state, close: modal.close, handleSubmit };
  },
};
</script>

<style></style>
