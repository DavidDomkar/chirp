<template lang="pug">
.form-control
  .input-group
    input.input.input-bordered.w-full(
      type='text'
      placeholder='Search people...'
      class='focus:input-primary focus:!outline-none'
    )
    button.btn.btn-primary.btn-square
      Icon(name='fa-solid:search')
</template>
