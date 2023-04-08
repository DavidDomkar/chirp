<template lang="pug">
.flex.w-full.justify-center.left-0.bottom-0.right-0.z-10.fixed.px-8
  nav.card.card-compact.shadow-2xl.rounded-b-none.bg-base-100.max-w-full(
    class='w-[1280px]'
  )
    .card-body.text-center {{ new Date().getFullYear() }} &copy; David Domkář - Studentský zápočtový projekt
</template>
