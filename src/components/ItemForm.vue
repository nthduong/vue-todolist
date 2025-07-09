<template>
  <div>
    <label for="item-check" class="item">
      <div class="ml-6">
        <input id="item-check" class="item__input" type="checkbox" />
        <span class="item__text">Like</span>
      </div>
      <div class="flex gap-4 mr-6">
        <button><img src="../assets/icon/pen.svg" alt="" class="item__icon" /></button>
        <button><img src="../assets/icon/trash.svg" alt="" class="item__icon" /></button>
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
  border-radius: 8px;
  margin-top: 30px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__text {
    position: relative;
    color: #fff;
    font-size: 18px;
    margin-left: 5px;
    font-weight: 700;
  }

  &__text::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border: 1px solid #fff;
    border-radius: 100%;
    top: 0;
    left: 0;
  }
  &__text::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 100%;
    top: 0;
    left: 0;
  }

  &__icon {
    width: 18px;
    height: 18px;
    filter: brightness(0) saturate(100%) invert(95%) sepia(0%) saturate(20%) hue-rotate(289deg)
      brightness(103%) contrast(108%);
  }
}
</style>
