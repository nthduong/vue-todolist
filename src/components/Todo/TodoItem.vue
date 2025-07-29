<script setup>
import { useModalStore } from '@/stores/useModalStore'
import { useTodoStore } from '@/stores/useTodoStore'

import { ref, watch } from 'vue'
const modalStore = useModalStore()
const todoStore = useTodoStore()

const emit = defineEmits(['removeTodo', 'toggleCompleted'])
const props = defineProps({
  todo: {
    type: [Object],
    required: true,
  },
})
const isCheck = ref(props.todo.completed)

watch(
  () => props.todo.completed,
  (newVal) => {
    isCheck.value = newVal
  },
  { immediate: true },
)

const toggleCompleted = () => {
  if (isCheck.value) {
    todoStore.moveToBottom(props.todo.id)
  } else {
    todoStore.moveToTop(props.todo.id)
  }
  emit('toggleCompleted', { id: props.todo.id, completed: isCheck.value })
  
}
const removeTodo = () => {
  emit('removeTodo', props.todo.id)
}
const showModal = () => {
  modalStore.openModal(props.todo)
}
</script>

<template>
  <div>
    <label :for="todo.id" class="item">
      <div class="ml-6">
        <input
          :id="todo.id"
          class="item__input"
          type="checkbox"
          hidden
          v-model="isCheck"
          @change="toggleCompleted"
        />
        <span class="item__text" :class="{ isCheck: isCheck, completed: isCheck }">{{
          todo.text
        }}</span>
      </div>
      <div class="flex mr-4" :class="{ completed: isCheck }">
        <button @click="showModal" class="p-2.5">
          <img src="../../assets/icon/pen.svg" alt="" class="item__icon" />
        </button>
        <button @click="removeTodo" class="p-2.5">
          <img src="../../assets/icon/trash.svg" alt="" class="item__icon" />
        </button>
      </div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: block;
  width: 100%;
  height: 60px;
  background: #748873;
  border-radius: 50px;
  margin-top: 15px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  user-select: none;

  &__text {
    position: relative;
    color: #fff;
    font-size: 18px;
    margin-left: 30px;
    font-weight: 700;
  }

  &__text::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: -30px;
  }
  &__text::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 100%;
    top: 5px;
    left: -26px;
    display: none;
  }

  &__input:checked ~ .item__text::after {
    display: block;
  }

  &__icon {
    width: 18px;
    height: 18px;
    filter: brightness(0) saturate(100%) invert(95%) sepia(0%) saturate(20%) hue-rotate(289deg)
      brightness(103%) contrast(108%);
  }
}
.isCheck {
  text-decoration: line-through;
}
.completed {
  opacity: 0.5;
}
</style>
