<template>
  <div>
    <box :padding-top="headerHeight" :padding-bottom="bottomHeight" v-ref:app>
      <!--header slot-->
      <c-header slot="header" :transition="headerTransition" :left-options="{showBack:showBack}" :title="title"></c-header>
      <!--default slot-->
      <router-view :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"></router-view>
      <!--bottom slot-->
      <tabbar icon-class="vux-center" slot="bottom">
        <tabbar-item v-link="{path:'/'}" :selected="route.name === 'Main'">
          <icon type="homeon" slot="iconon" size="28px"></icon>
          <icon type="home" slot="icon" size="24px"></icon>
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item badge="9" v-link="{path:'/demo'}" :selected="route.name === 'Demo'">
          <icon type="dianpufill" slot="iconon" size="28px"></icon>
          <icon type="dianpu" slot="icon" size="24px"></icon>
          <span slot="label">演示</span>
        </tabbar-item>
        <tabbar-item show-dot v-link="{path:'/setting'}" :selected="route.name === 'Setting'">
          <icon type="settingon" slot="iconon" size="28px"></icon>
          <icon type="setting" slot="icon" size="24px"></icon>
          <span slot="label">设置</span>
        </tabbar-item>
      </tabbar>
    </box>
  </div>
</template>
<script>
  /** vux components*/
  import Tabbar from 'vuxs/tabbar'
  /** customer components*/
  import Box from 'pubs/box'
  import CHeader from 'pubs/c-header'
  import Icon from 'pubs/Icon'
  import TabbarItem from 'pubs/tabbar-item'

  import store from './store'

  export default {
    components: {
      Box,
      Icon,
      CHeader,
      Tabbar,
      TabbarItem
    },
    store: store,
    vuex: {
      getters: {
        route: (state) => state.route,
        isLoading: (state) => state.isLoading,
        direction: (state) => state.direction,
        showBack: (state) => state.showBack,
        title: (state) => state.title,
        headerHeight: (state) => state.headerHeight,
        bottomHeight: (state) => state.bottomHeight
      }
    },
    ready() {
      var vm = this
      api.ready(() => {
        setTimeout(() => {
          api.androidKeys()
        }, 3000)
      }, false)
      document.addEventListener('test', function(e) {
        if (vm.route.name === 'Setting') {
          api.log('main-setting:' + JSON.stringify(e.detail, null, 4))
        } else if (vm.route.name === 'Demo') {
          api.log('main-demo:' + JSON.stringify(e.detail, null, 4))
        }
      })
    },
    data() {
      return {}
    },
    computed: {
      headerTransition() {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      }
    },
    methods: {}
  }

  api.init({
    beforeback() {
      api.log('main-后退前的业务处理')
      return true
    }
  })
</script>

<style scoped>
  body {
    overflow-x: hidden;
  }
  /* vue-router transition 开始 */
  
  .vux-pop-out-transition,
  .vux-pop-in-transition {
    width: 100%;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    backface-visibility: hidden;
  }
  
  .vux-pop-out-enter,
  .vux-pop-out-leave,
  .vux-pop-in-enter,
  .vux-pop-in-leave {
    will-change: transform;
    height: 100%;
    position: absolute;
    left: 0;
  }
  
  .vux-pop-out-enter {
    animation-name: popInLeft;
  }
  
  .vux-pop-out-leave {
    animation-name: popOutRight;
  }
  
  .vux-pop-in-enter {
    perspective: 1000;
    animation-name: popInRight;
  }
  
  .vux-pop-in-leave {
    animation-name: popOutLeft;
  }
  
  @keyframes popInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  
  @keyframes popOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }
  
  @keyframes popInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  
  @keyframes popOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(100%, 0, 0);
    }
  }
  /* vue-router transition 结束 */
</style>