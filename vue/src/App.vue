<template>
  <div
    id="app"
    class="App"
  >
    <div
      class="navigation-wrapper"
    >
      <navigation
        :header-text="'rick & morty'"
        :active-id="activeId"
        :menu-items="menuItems"
        @selected="selectedNavItem"
      />
    </div>

    <div
      class="page-content"
    >
      <router-view
        name="content"
      />
      </div>
  </div>
</template>

<script>
import Vue from 'vue'

import Navigation from './components/Navigation/Navigation'

import NavigationData from "./data/NavigationData";

export default {
  name: 'App',
  components: {
    'navigation': Navigation
  },
  data() {
    return {
      active: {
        id: 'Home',
        name: 'Home',
        type: 'link'
      },
      menuItems: NavigationData,
      isSmall: false
    }
  },
  computed: {
    activeId () {
      return this.active.id
    }
  },
  methods: {
    selectedNavItem (newValue) {
      Vue.set(this.active, 'id', newValue.name)
      Vue.set(this.active, 'name', newValue.name)
      Vue.set(this.active, 'path', newValue.path)
    }
  }
}
</script>

<style lang="scss">

  html,
  body {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    outline: none;
    box-sizing: border-box;
  }

</style>

<style lang="scss" scoped>

  .App {
    box-sizing: border-box;
    color: #2c3e50;
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
    text-align: center;
    width: 100%;

    &> .navigation-wrapper {
      width: 300px;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-content: center;

      -webkit-transition: width 0.2s ease-in-out;
      -moz-transition: width 0.2s ease-in-out;
      transition: width 0.2s ease-in-out;

      .navigation {
        flex: 1 1;
      }
    }

    &> .page-content {
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      flex: 1 1;

      &> .content-wrapper {
        width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
        padding: 30px 0 100px 0;
      }
    }
  }

</style>
