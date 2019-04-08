<template>
  <!-- loading -->
  <div id="Loading" v-show="loading">
    <div class="container">
      <div class="dot dot-1"></div>
      <div class="dot dot-2"></div>
      <div class="dot dot-3"></div>
    </div>
    <p>数据加载中...请稍后...</p>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
        </filter>
      </defs>
    </svg>
  </div>
</template>
<script>
  // jshint esversion: 6
export default {
  name: 'loading',
  props: ["loading"],
};

</script>
<style lang="scss" scoped>
// 加载动画CSS
#Loading {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  // border: 1px solid #E7EEEF;
  border-top: 0;
  border-radius: 0 0 4px 4px;
  background: #ffffff;
  opacity: .95;
  z-index: 9;

  p {
    position: absolute;
    top: 65%;
    left: 0;
    right: 0;
    text-align: center;
  }

  .container {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    filter: url('#goo');
    animation: rotate-move 2s ease-in-out infinite;
  }

  .dot {
    width: 55px;
    height: 55px;
    border-radius: 80%;
    background-color: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .dot-3 {
    background-color: #4471FE;
    animation: dot-3-move 2s ease infinite;
  }

  .dot-2 {
    background-color: #FFE603;
    animation: dot-2-move 2s ease infinite;
  }

  .dot-1 {
    background-color: #2CB8C4;
    animation: dot-1-move 2s ease infinite;
  }

  @keyframes dot-3-move {
    20% {
      transform: scale(1)
    }

    45% {
      transform: translateY(-18px) scale(.45)
    }

    60% {
      transform: translateY(-40px) scale(.45)
    }

    80% {
      transform: translateY(-40px) scale(.45)
    }

    100% {
      transform: translateY(0px) scale(1)
    }
  }

  @keyframes dot-2-move {
    20% {
      transform: scale(1)
    }

    45% {
      transform: translate(-16px, 12px) scale(.45)
    }

    60% {
      transform: translate(-40px, 40px) scale(.45)
    }

    80% {
      transform: translate(-40px, 40px) scale(.45)
    }

    100% {
      transform: translateY(0px) scale(1)
    }
  }

  @keyframes dot-1-move {
    20% {
      transform: scale(1)
    }

    45% {
      transform: translate(16px, 12px) scale(.45)
    }

    60% {
      transform: translate(40px, 40px) scale(.45)
    }

    80% {
      transform: translate(40px, 40px) scale(.45)
    }

    100% {
      transform: translateY(0px) scale(1)
    }
  }

  @keyframes rotate-move {
    55% {
      transform: rotate(0deg)
    }

    80% {
      transform: rotate(360deg)
    }

    100% {
      transform: rotate(360deg)
    }
  }
}

</style>
