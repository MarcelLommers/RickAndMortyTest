<template>
  <div
    class="link-item"
    :class="linkClasses"
    :style="{
      'padding-left': depth * 10 + 'px'
    }"
    @click.stop="selected"
  >
    <router-link
      :to="routePath"
      v-text="linkItem.name"
    />
  </div>
</template>

<script>
  export default {
    name: 'LinkItem',
    props: {
      item: {
        default: function () {
          return {
            name: '',
            icon: '',
            subPages: [],
            subContent: []
          }
        },
        type: Object
      },
      parentPath: {
        default: '',
        type: String
      },
      depth: {
        default: 0,
        type: Number
      },
      isOpen: {
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
      }
    },
    computed: {
      linkClasses () {
        return {
          'open': this.isOpen,
          'routed': this.hasActiveChild || this.hasActiveSibling,
          'active': this.isActive
        }
      },
      linkItem () {
        return this.item
      },
      routePath () {
        return this.parentPath + this.linkItem.path
      },
      isActive () {
        return this.$route.fullPath === this.routePath
      }
    },
    methods: {
      selected () {
        this.$emit('selected', this.item)
        if (!this.isActive) {
          this.$router.push({ path: this.routePath })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .link-item {
    align-items: center;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding-bottom: 3px;
    text-align: center;
    width: 100%;

    a {
      flex: 1 1;
      text-align: left;
      text-indent: 10px;
      display: block;
      color: #58585B;
      text-decoration: none;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .route-icon {
      height: 30px;
      width: 30px;
      padding: 5px;
      margin-left: 5px;
    }

    .sub-toggle {
      height: 30px;
      width: 30px;
      padding: 9px;
    }

    &:hover {
      background-color: #EEEEEE;

      a {
        color: #212121;
      }
    }

    &.open {
      background-color: #F7F7F7;

      &:hover {
        background-color: #EEEEEE;
      }
    }

    &.routed {
      background-color: #F7F7F7;

      &:hover {
        background-color: #EEEEEE;
      }
    }

    &.active {

      a {
        color: #00bbd5;
      }
    }
  }

</style>
