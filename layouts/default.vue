<template lang="pug">
.flex.justify-center.bg-base-300
  .max-w-full.min-h-screen.flex.flex-col.px-8(class='w-[1344px]')
    Header
    slot
    Footer
</template>
