<template>
  <div
    class="navigation"
  >
    <h1
      class="title"
      v-text="headerText"
    />

    <link-list
      :items="filteredMenuItems"
      @selected="emitSelection"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'

import LinkList from "./RouterComponents/LinkList";

export default {
  name: 'Navigation',
  components: {
    'link-list': LinkList
  },
  props: {
    headerText: {
      default: 'default',
      type: String
    },
    activeId: {
      default: 'default',
      type: String
    },
    menuItems: {
      default: function () {
        return [
          {
            id: '',
            type: null,
            isActive: false,
            name: 'default'
          }
        ]
      },
      type: Array
    }
  },
  data() {
    return {
      search: true,
      filterVisible: false,
      filterValue: null,
      filterContextEvent: null
    }
  },
  computed: {
    computedFilterValue () {
      return this.filterValue ? this.filterValue.toLowerCase() : ''
    },
    filteredMenuItems () {
      let self = this
      // clone to prevent prop mutation
      let result = _.cloneDeep(self.menuItems)
      let filterQuery = self.computedFilterValue

      _.forEach(result, menuCategory => {
        if (_.size(filterQuery) > 0) {
          menuCategory.items = _.filter(menuCategory.items, option => {
            return _.includes(option.name.toLowerCase(), filterQuery)
          })
        }

        _.forEach(menuCategory.items, item => {
          Vue.set(item, 'isActive', (item.id === self.activeId))
        })
      })

      return result
    }
  },
  methods: {
    emitSelection (newValue) {
      this.$emit('selected', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>

.asvb-navigation {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-right: #DDDDDD 1px solid;

  .nav-search {
    padding: 5px;
    height: 30px;
    margin: 5px auto;
  }

  .sidebar {
    height: 100%;
    float: left;

    &__menu {
      height: calc(100% - 80px);
      margin: 0;
      padding: 0;
      list-style: none;
      overflow-y: auto;
      overflow-x: hidden;
    }

    &__title {
      font-weight: 400;
      font-size: 13px;
      line-height: 30px;
      color: #AFAFAF;
    }

    &__icon {
      width: 16px;
      height: 16px;
      float: left;
      display: block;
      font-size: 16px;
      line-height: 16px;
      margin: 7px 10px 7px 0;
    }

    &__link {
      width: 100%;
      color: #515357;
      font-weight: 400;
      font-size: 13px;
      display: inline-block;
      text-decoration: none;

      &.active {
        color: #00bbd5;

        path { stroke: #00bbd5; }

        &:hover {
          color: #00bbd5;

          path { stroke: #00bbd5; }
        }
      }

      &:hover {
        color: #212121;

        path { stroke: #212121; }
      }
    }

    &__title, &__link {
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
  }
}

.nav-list {
  ul {
     list-style-type: none;
     margin: 0;
     padding: 0;
     width: 200px;
   }

  li a {
    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;
  }

  /* Change the link color on hover */
  li a:hover {
    background-color: #f1f1f1;
    color: white;
  }
}

</style>
