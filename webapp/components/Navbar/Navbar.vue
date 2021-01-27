<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <NuxtLink class="font-semibold text-3xl" to="/">
            hackernews
          </NuxtLink>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <button
            type="button"
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            @click="showMenu = true"
          >
            <span class="sr-only">Open menu</span>
            <!-- Heroicon name: menu -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <div
            v-if="!isAuthenticated"
            class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            <NuxtLink to="/login">Sign in</NuxtLink>
          </div>
          <div
            class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <NuxtLink v-if="!isAuthenticated" to="/signup">Sign up</NuxtLink>
            <a
              v-if="isAuthenticated"
              id="a_logout"
              @click="() => $emit('logout')"
              >Logout</a
            >
          </div>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, show/hide based on mobile menu state.

      Entering: "duration-200 ease-out"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
      Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
    <div
      v-if="showMenu"
      class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
    >
      <div
        class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
      >
        <div class="pt-5 pb-6 px-5">
          <div class="flex items-center justify-between">
            <NuxtLink class="font-semibold text-3xl" to="/">
              hackernews
            </NuxtLink>
            <div class="-mr-2">
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                @click="showMenu = false"
              >
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: x -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="py-6 px-5 space-y-6">
          <div>
            <div
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <NuxtLink v-if="!isAuthenticated" to="/signup">Signup</NuxtLink>
              <a
                v-if="isAuthenticated"
                id="a_logout_mobile"
                @click="() => $emit('logout')"
                >Logout</a
              >
            </div>
            <p
              v-if="!isAuthenticated"
              class="mt-6 text-center text-base font-medium text-gray-500"
            >
              Existing user?
              <NuxtLink
                to="/login"
                class="text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  <nav>
      &lt;!&ndash; This example requires Tailwind CSS v2.0+ &ndash;&gt;
      <div class="logo">
        <NuxtLink to="/">
          <Logo />
          news
        </NuxtLink>
      </div>
      <div v-if="!isAuthenticated" class="option">
        <NuxtLink to="/login">Login</NuxtLink>
      </div>
      <div v-if="!isAuthenticated" class="option">
        <NuxtLink to="/signup">Signup</NuxtLink>
      </div>
      <div v-if="isAuthenticated" class="option">
        <a id="a_logout" @click="() => $emit('logout')">Logout</a>
      </div>
    </nav>-->
</template>

<script>
export default {
  name: 'Navbar',
  components: {},
  // eslint-disable-next-line vue/require-prop-types
  props: ['isAuthenticated'],
  data() {
    return {
      showMenu: false,
    }
  },
}
</script>

<style scoped></style>
