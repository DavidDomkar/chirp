<template lang="pug">
nav.card.card-compact.shadow-2xl.rounded-t-none.bg-base-100.w-full.sticky.top-0.z-10(
  class='h-[80px]'
)
  .card-body
    .flex.items-center
      .flex.items-center(class='md:min-w-[200px]')
        Logo(small)
      .w-full.px-4
        SearchField.hidden(class='md:block')
      .flex.items-center.justify-end(class='md:min-w-[200px]')
        .btn.btn-primary(@click='onSignOut') Sign Out
</template>
