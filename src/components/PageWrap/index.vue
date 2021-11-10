<template>
  <div v-if="!leftMenu" class="components__pagewrap-wrap">
    <div class="components__pagewrap-center-wrap">
      <slot />
    </div>
  </div>

  <div v-else class="components__has-left-menu__pagewrap-wrap">
    <div 
      :class="`components__pagewrap-leftmenu-wrap ${hideLeftMenu ? 'hide-left-menu' : ''}`"
      :style="{
        minHeight: `${mainHeight}px`
      }"
    >
      <div 
        :class="`left-menu-item ${curLeftNavMenu === item.name ? 'current' : ''}`"
        v-for="(item, index) in leftMenu" 
        :key="item.name"
        @click="onChangePage(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="components__pagewrap-rightbody-wrap">
      <div class="center">
        <keep-alive>
          <component :is="curCom" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
export default {
  name: 'PageWrap',
  props: {
    leftMenu: {
      name: Array
    }
  },
  setup(props) {
    const store = useStore()
    const mainHeight = ref(window.innerHeight - 50)
    const curCom = ref(null)
    const curLeftNavMenu = ref(null)
    const hideLeftMenu = computed(() => store.state.menu.closeLeftMenu)

    onMounted(() => {
      let hasLeftMenu = false
      if (Array.isArray(props.leftMenu) && props.leftMenu.length) {
        curLeftNavMenu.value = sessionStorage.getItem('curLeftNavMenu') || _.get(props, 'leftMenu[0].name')

        hasLeftMenu = true

        const curComponent = _.get(props.leftMenu.find(i => i.name === curLeftNavMenu.value), 'component')
        if (curComponent) {
          curCom.value = curComponent
        }
      }

      store.commit('menu/updateHasLeftMenu', {
        hasLeftMenu
      })

      store.commit('menu/updateCloseLeftMenu', {
        closeLeftMenu: false
      })
    })

    const onChangePage = (item = {}) => {
      curCom.value = item.component
      curLeftNavMenu.value = item.name
      sessionStorage.setItem('curLeftNavMenu', item.name)
    }

    return {
      mainHeight,
      onChangePage,
      curCom,
      curLeftNavMenu,
      hideLeftMenu
    }
  }
}
</script>

<style>

  /* 没有传入左侧菜单的样式 */
  .components__pagewrap-wrap {
    display: flex;
    justify-content: center;
  }

  .components__pagewrap-center-wrap {
    flex: 0 1 1280px;
    border: 1px solid pink;
  }


  /* 传入左侧菜单的样式 */
  .components__has-left-menu__pagewrap-wrap {
    display: flex;
  }

  .components__pagewrap-leftmenu-wrap {
    flex: 0 0 180px;
    background: #2a393c;
    color: #a5bcc2;
    max-width: 100%;
    transition: max-width 0.35s;
    overflow: hidden;
  }

  .components__pagewrap-leftmenu-wrap .left-menu-item {
    padding-left: 16px;
    box-sizing: border-box;
    line-height: 28px;
    cursor: pointer;
  }

  .components__pagewrap-leftmenu-wrap .left-menu-item.current {
    color: #31c193;
  }

  .components__pagewrap-leftmenu-wrap .left-menu-item:hover {
    color: #31c193;
  }

  .components__pagewrap-rightbody-wrap {
    flex: 1 1 auto;
    display: inline-flex;
    justify-content: center;
  }

  .components__pagewrap-rightbody-wrap .center {
    flex: 0 1 1280px;
    border: 1px solid pink;
  }

  .components__pagewrap-leftmenu-wrap.hide-left-menu {
    max-width: 0;
  }
</style>