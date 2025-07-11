<script setup></script>

<template>
  <div class="Modal">
    <div class="overlay"></div>
    <div class="content">
      <h1 class="Modal__heading"><slot name="header"></slot></h1>
      <div class="Modal__body"><slot name="body"></slot></div>
      <div class="Modal__footer"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Modal {
  inset: 0;
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &__heading {
    font-size: 22px;
    font-weight: 700;
  }
  &__body {
    margin-top: 30px;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
}

.content {
  padding: 30px;
  background: #fff;
  z-index: 1;
  border-radius: 8px;
  width: 400px;
}
</style>
