<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/useTodoStore'
const store = useTodoStore()
const textForm = ref('')

const onSubmit = async (e) => {
  e.preventDefault()
  console.log(1)

  if (textForm.value.trim() === '') return
  await store.addTodo(textForm.value)
  textForm.value = ''
}
</script>

<template>
  <form v-on:submit.prevent="onSubmit">
    <div class="form__group mt-10">
      <input type="text" class="form__input" v-model="textForm" />
      <button type="submit" class="form__act">Add</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  &__group {
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    border: 2px solid #ccc;
    border-radius: 50px;
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
    border-radius: 50px;
    margin: 4px;
    margin-right: 10px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  }
}
</style>
