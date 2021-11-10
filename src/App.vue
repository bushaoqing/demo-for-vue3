<template>
  <div class="app__router-link">

    <div class="app__navigation__left-wrap">
      <span class="app__navigation title">
        我是导航
      </span>
      <span
        :class="
          `app__navigation vice-navigation 
          ${hideLeftMenu ? 'is-close-vice' : ''}
          ${showLeftMenu ? 'show-left-menu' : ''}
          `
        "
        @click="toogleViceNav"
      >
      </span>
    </div>

    <div class="app__navigation__center-wrap">
      <div 
        :class="`app__router-link-items ${(currentMenu && currentMenu.indexOf(item.path) !== -1) ? 'current' : ''}`"
        v-for="(item, index) in curRouters" 
        :key="item.path" 
        @mouseenter="toogelShowNavMenu(item, true)"
        @mouseleave="toogelShowNavMenu(item, false)"
        @click="onNavClick(item.path)"
      >
        <router-link :to="`${item.path}/${item.children && item.children[0] && item.children[0].path || ''}`">{{ item.name }}</router-link>
        
        <div 
          v-if="showCurrentNavMenu && item.children && item.children.length > 0"
          class="app__router-link-items__nav-menu"
        >
          <div 
            class="nav-items"
            v-for="(nav, index) in item.children" 
            :key="nav.path"
            @click="onNavClick(item.path)"
          >
            <router-link :to="`${item.path}/${nav.path}`">{{ nav.name }}</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="app__navigation__right-wrap">
      用户信息栏
    </div>
  </div>
  
  <!-- 导航栏下面的主体部分 -->
  <div 
    class="app__center-box-wrap"
    :style="{
      minHeight: `${mainHeight}px`
    }"
  >
    <router-view />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import _ from 'lodash'
import { useStore } from 'vuex'
import { routes } from '@routers/index'
import { loginCheck } from '@api/user'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const mainHeight = ref(window.innerHeight - 50)
    const showCurrentNavMenu = ref(false)
    const currentMenu = ref(null)
    const curRouters = computed(() => routes)
    const showLeftMenu = computed(() => store.state.menu.hasLeftMenu)
    const hideLeftMenu = computed(() => store.state.menu.closeLeftMenu)

    onMounted(() => {
      loginCheck()

      initData()
    })

    const initData = () => {
      const pathName = location.pathname

      // 手动刷新（F5）后，需要将一级目录高亮显示
      if (pathName) {
        currentMenu.value = pathName
      }
    }

    const toogleViceNav = () => {
      store.commit('menu/updateCloseLeftMenu', {
        closeLeftMenu: !hideLeftMenu.value
      })
    }

    const toogelShowNavMenu = (item = {}, bool = false) => {
      const children = _.get(item, 'children')
      if (!_.isArray(children)) bool = false
      showCurrentNavMenu.value = bool
    }

    const onNavClick = (path = '') => {
      currentMenu.value = path
      showCurrentNavMenu.value = false
    }

    return {
      curRouters,
      hideLeftMenu,
      mainHeight,
      toogleViceNav,
      toogelShowNavMenu,
      showCurrentNavMenu,
      onNavClick,
      currentMenu,
      showLeftMenu,
    }
  }
}
</script>

<style>
  .app__router-link {
    line-height: 42px;
    display: flex;
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
    user-select: none;
  }

  .app__router-link .app__navigation__center-wrap {
    display: inline-flex;
    flex: 1 1 auto;
  }

  .app__router-link .app__navigation__right-wrap {
    flex-basis: 200px;
  }

  .app__router-link .app__navigation.vice-navigation.is-close-vice {
    transform: rotate(90deg);
  }

  .app__router-link .app__navigation.vice-navigation:hover {
    color: #31c193;
  }

  .app__router-link .app__router-link-items {
    padding: 4px;
    border-radius: 4px;
    margin-right: 16px;
    box-sizing: border-box;
    position: relative;
  }

  .app__router-link .app__router-link-items.current > a, 
  .app__router-link .app__router-link-items > a.router-link-active {
    color: #31c193;
  }

  .app__router-link .app__router-link-items a {
    color: #a5bcc2;
    user-select: none;
  }

  .app__navigation.vice-navigation {
    width: 12px;
  }

  .app__router-link .app__router-link-items a:hover {
    color: #31c193;
  }

  .app__center-box-wrap {
    min-height: 600px;
    background: #e7eff4;
  }

  .app__router-link .app__router-link-items__nav-menu {
    position: absolute;
    top: 50px;
    width: 90px;
    background: #333;
  }

  .app__router-link .app__router-link-items__nav-menu .nav-items {
    padding-left: 8px;
    cursor: pointer;
  }

  .app__router-link .app__router-link-items__nav-menu .nav-items > a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .app__router-link .app__router-link-items__nav-menu .nav-items > a.router-link-active {
    color: #31c193;
  }

  .app__router-link .app__router-link-items__nav-menu .nav-items:hover {
    background: lightslategray;
    color: #fff;
  }

  .app__navigation.vice-navigation.show-left-menu {
    background: url('./assets/expend.png') no-repeat center;
  }
</style>