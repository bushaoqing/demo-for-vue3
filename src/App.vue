<template>
  <div class="app__router-link">

    <div class="app__navigation__left-wrap">
      <span class="app__navigation title">
        我是导航
      </span>
      <span
        :class="`app__navigation vice-navigation ${isCloseVice ? 'is-close-vice' : ''}`"
        @click="toogleViceNav"
      >
        >
      </span>
    </div>

    <div class="app__navigation__center-wrap">
      <div 
        :class="`app__router-link-items ${currentNav === item.path ? 'current' : ''}`"
        v-for="(item, index) in curRouters" 
        :key="item.path" 
        @click="() => onNavClick(item)"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </div>
    </div>

    <div class="app__navigation__right-wrap">
      用户信息栏
    </div>
  </div>
  
  <!-- 导航栏下面的主题部分 -->
  <div 
    class="app__center-box-wrap"
    :style="{
      height: `${mianHeight}px`
    }"
  >
    <div
      v-if="Array.isArray(curRoutersChildren) && curRoutersChildren.length > 0"
      :class="`app__center-box__left-menu ${isCloseVice ? 'is-close-vice' : ''}`"
    >
      <div 
        :class="`app__router-link-items ${currentChildNav === item.path ? 'current' : ''}`"
        v-for="(item, index) in curRoutersChildren" 
        :key="item.path" 
        @click="() => onChildNavClick(item)"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </div>
    </div>
    <div 
      class="app__center-box__center-menu"
    >
      <div class="app__center-box__center-menu-wrap">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { routes } from '@routers/index'
import { loginCheck } from '@api/user'
import _ from 'lodash'

export default {
  name: 'App',
  setup() {
    const isCloseVice = ref(false)
    const mianHeight = ref(window.innerHeight - 50)
    const currentNav = ref(_.get(routes, '[0].path'))
    const curRoutersChildren = ref(_.get(routes, '[0].children'))
    const currentChildNav = ref(_.get(curRoutersChildren, 'value.[0].path'))
    const curRouters = computed(() => routes)

    onMounted(() => {
      loginCheck()
    })

    const toogleViceNav = () => {
      console.log('toogleViceNav: ', isCloseVice.value);
      isCloseVice.value = !isCloseVice.value
    }

    const onNavClick = (item = {}) => {
      currentNav.value = item.path
      curRoutersChildren.value = item.children || []
    }

    const onChildNavClick = (item = {}) => {
      currentChildNav.value = item.path
    }

    return {
      currentNav,
      curRouters,
      isCloseVice,
      mianHeight,
      toogleViceNav,
      onNavClick,
      curRoutersChildren,
      currentChildNav,
      onChildNavClick,
    }
  }
}
</script>

<style>
  .app__router-link {
    line-height: 42px;
    display: flex;
    /* justify-content: center; */
    background: #1e2224;
    color: #a5bcc2;
  }

  .app__router-link .app__navigation,
  .app__router-link .app__navigation__right-wrap {
    line-height: 48px;
  }

  .app__router-link .app__navigation.title {
    color: #fff;
    font-size: 18px;
    margin-left: 20px;
  }

  .app__router-link .app__navigation.vice-navigation {
    display: inline-block;
    height: 100%;
    margin: 0 16px;
    cursor: pointer;
    vertical-align: top;
    transition: all 0.3s;
    transform-origin: center;
  }

  .app__router-link .app__navigation__center-wrap {
    display: inline-flex;
    flex: 1 1 auto;
  }

  .app__router-link .app__navigation__right-wrap {
    flex-basis: 200px;
  }

  .app__router-link .app__navigation.vice-navigation.is-close-vice {
    transform: rotate(180deg);
  }

  .app__router-link .app__navigation.vice-navigation:hover {
    color: #31c193;
  }

  .app__router-link .app__router-link-items {
    padding: 4px;
    border-radius: 4px;
    margin-right: 16px;
    box-sizing: border-box;
  }

  .app__router-link .app__router-link-items.current a {
    color: #31c193;
  }

  .app__router-link .app__router-link-items a {
    color: #a5bcc2;
    user-select: none;
  }

  .app__router-link .app__router-link-items a:hover {
    color: #31c193;
  }

  .app__center-box-wrap .app__center-box__left-menu .app__router-link-items {
    line-height: 28px;
    height: 28px;
    padding-left: 16px;
    box-sizing: border-box;
  }

  .app__center-box-wrap .app__center-box__left-menu .app__router-link-items a {
    color: #a5bcc2;
    user-select: none;
  }

  .app__center-box-wrap .app__center-box__left-menu .app__router-link-items.current a {
    color: #31c193;
  }

  .app__center-box-wrap {
    min-height: 600px;
    background: #e7eff4;
    display: flex;
  }

  .app__center-box-wrap .app__center-box__left-menu {
    flex: 0 0 180px;
    background: #2a393c;
    max-width: 100%;
    transition: max-width 0.35s;
  }

  .app__center-box-wrap .app__center-box__left-menu.is-close-vice {
    max-width: 0;
    overflow: hidden;
  }

  .app__center-box-wrap .app__center-box__center-menu {
    flex: 1 1 auto;
    display: inline-flex;
    justify-content: center;
  }

  .app__center-box-wrap .app__center-box__center-menu-wrap {
    width: 1280px;
    margin: 20px 0;
    border: 1px solid pink;
  }
</style>