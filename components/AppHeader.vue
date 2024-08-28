<template>
  <header>
    <Menubar :model="headerItems" breakpoint="600">
      <template #item="{ item, props, hasSubmenu }">
        <NuxtLink v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </NuxtLink>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>

      </template>
    </Menubar>
  </header>
</template>

<script setup lang="ts">

interface HeaderItem {
  label: string;
  icon: string;
  to: string;
}

const headerItems: HeaderItem[]  = [
  {
    label: 'Факультеты',
    icon: 'pi pi-fw pi-home',
    to: '/',
  },
]
</script>
