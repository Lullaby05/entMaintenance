<template>
  <div class="container">
    <!-- <div class="logo">
      <img
        alt="logo"
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
      />
      <div class="logo-text">安全智能预警工具（运维端）</div>
    </div> -->
    <!-- <LoginBanner /> -->
    <div style="width: 400px">
      <div class="header">
        <img
          src="https://business.api.xkrsecure.com/icon/logo-xkr.png"
          alt=""
        />
        <h1 class="login-title">安全智能预警平台运维端</h1>
      </div>
      <div class="content">
        <div class="content-inner" style="width: 100%">
          <LoginForm />
        </div>
        <!-- <div class="footer">
        <Footer />
      </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import LoginBanner from './components/banner.vue';
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('@/assets/images/background.jpg');
    background-size: cover;
    background-position: center;

    .header {
      background-image: linear-gradient(to left, #428ffb 0%, #385de2 100%);
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      gap: 20px;
      width: 100%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      img {
        width: 132px;
        height: 80px;
        margin: 0 auto;
      }
      .login-title {
        margin-top: 0px;
        text-align: center;
        font-size: 24px;
        color: #fff;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      width: 100%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      // position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    .logo-text {
      color: #333333;
    }

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
