<template>
  <form v-on:submit.prevent="">
    <div class="form__group mt-10">
      <input type="text" class="form__input" />
      <button class="form__act">Add</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  &__group {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    border: 2px solid #ccc;
    border-radius: 8px;
    padding-left: 10px;
  }
  &__input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 700;
  }
  &__act {
    padding: 0 20px 0 20px;
    right: 0;
    height: 40px;
    background: #748873;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    border-radius: 8px;
    margin: 4px;
  }
}
</style>
