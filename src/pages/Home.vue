<template>
  <page-wrap>
    <div :style="{
      border: '1px solid red',
      marginBottom: '16px'
    }">
      <h1>这里 Home 组件类容</h1>
      <h1>{{ 'msg + a: ' + msg + a }}</h1>
      <h2><span>userInfo: </span>{{ userInfo }}</h2>
      <h2>{{ 'newInfo: '+ newInfo }}</h2>
      <h2>{{ 'joinItems: '+ joinItems }}</h2>
      <h2>{{ 'joinItemsWithPlu: '+ joinItemsWithPlu }}</h2>
      <h2>{{ 'twoBars: '+ twoBars }}</h2>
    </div>

    <h1>这里 Home 子组件类容</h1>
    <router-view />
  </page-wrap>
</template>

<script>
import { watch } from 'vue'
import { useStore, mapState, mapGetters } from 'vuex'
import PageWrap from '@components/PageWrap/index.vue'

export default {
  name: 'Home',
  components: {
    'page-wrap': PageWrap
  },

  // TODO：后续vuex官方应该会对setup写法出对应的映射方案，就不用使用vue2的写法，毕竟setup中无法获取computed中的值
  // 使用 mapState, mapGetters 映射写法
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      userInfo: state => state.user.userInfo,

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      newInfo (state) {
        return state.user.userInfo.name + this.msg
      }
    }),

    ...mapGetters({
      joinItems: 'cart/joinItems',
      joinItemsWithPlu: 'cart/joinItemsWithPlu',
      twoBars: 'cart/nested/twoBars'
    })
  },

  setup(props) {
    const store = useStore()

    // 不使用 mapState, mapGetters 映射写法
    console.log('store.state.user.userInfo: ', store.state.user.userInfo);
    // console.log('store.state.cart.items: ', store.state.cart.items);
    // console.log('store.state.cart.nested.foo: ', store.state.cart.nested.foo);
    // console.log('store.getters.cart/joinItems: ', store.getters['cart/joinItems']);
    // console.log('store.getters.cart/nested/twoBars: ', store.getters['cart/nested/twoBars']);

    setTimeout(() => {
      store.commit('user/updateUserInfo', {
        userInfo: {
          name: 'xx'
        }
      })
    }, 1000);

    watch(() => store.state.user.userInfo, (a,b) => {
      console.log(a,b);
    })

    return {
      msg: 'HOME',
      a: 'a'
    }
  }
}
</script>

<style>

</style>