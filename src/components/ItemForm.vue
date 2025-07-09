<template>
  <div>
    <label for="item-check" class="item">
      <div class="ml-4">
        <input id="item-check" class="item__input" type="checkbox" />
        <span class="item__text">Like</span>
      </div>
      <div class="flex gap-3 mr-3">
        <img src="../assets/icon/pen.svg" alt="" class="item__icon" />
        <img src="../assets/icon/trash.svg" alt="" class="item__icon" />
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
    color: #fff;
    font-size: 18px;
    margin-left: 5px;
    font-weight: 700;
  }

  &__icon {
    width: 15px;
    height: 15px;
    filter: brightness(0) saturate(100%) invert(95%) sepia(0%) saturate(20%) hue-rotate(289deg)
      brightness(103%) contrast(108%);
  }
}
</style>
