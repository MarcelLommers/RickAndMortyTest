<template>
  <div
    class="link-list"
    :class="listClasses"
  >
    <div
      v-for="(item, itemIndex) in items"
      :key="itemIndex"
      class="link-body"
    >
      <link-item
        :item="item"
        :parent-path="parentPath"
        :depth="depth"
        :is-open="item.path === activeItem.path"
        :routed="routed"
        @selected="selectedItem"
      />

      <div
        v-if="item.path === activeItem.path"
        class="sub-links"
      >
        <link-list
          v-if="item.children"
          :parent-path="parentPath + item.path"
          :items="item.children"
          :depth="depth + 1"
          :open="item.path === activeItem.path"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash"
  import LinkItem from './LinkItem'

  export default {
    name: 'LinkList',
    components: {
      'link-item': LinkItem
    },
    props: {
      items: {
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
      },
      parentPath: {
        default: '',
        type: String
      },
      depth: {
        default: 0,
        type: Number
      },
      open: {
        default: false,
        type: Boolean
      },
      routed: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        activeItem: {
          path: null
        }
      }
    },
    computed: {
      listClasses () {
        return {
          'open': this.open,
          'routed': this.isRouted && this.depth > 0 || this.routed
        }
      },
      routePath () {
        return this.parentPath
      },
      isRouted () {
        return _.includes(this.$route.fullPath, this.routePath)
      }
    },
    mounted () {
      // Set active to child with route
      if (this.isRouted) {
        let routedChild = _.find(this.items, targetItem => {
          return _.includes(this.$route.fullPath, targetItem.path)
        })

        if (routedChild) {
          this.activeItem = routedChild
        }
      }
    },
    methods: {
      selectedItem (newValue) {
        this.activeItem = newValue

        this.$emit('selected', newValue)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .link-list {
    background-color: transparent;

    &.open {
      background-color: #F7F7F7;
    }

    &.routed {
      background-color: #F7F7F7;
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 200px;
      background-color: #f1f1f1;
    }

    .link-body {

      .link-item {
        height: 50px;
        border-bottom: #F7F7F7 1px solid;
      }
    }

  }

</style>
