<template>
  <div class="flex-wrapper">
    <flex class="flex-main" justify="around" items="center">
      <flex class="flex-option" direction="col" justify="between">
        <flex-item :flex="1">no.1</flex-item>
        <flex-item :flex="1" align="center">one</flex-item>
        <flex-item :flex="1">一</flex-item>
      </flex>
      <flex class="flex-option" direction="col" justify="between">
        <flex-item :flex="1">no.2</flex-item>
        <flex-item :flex="1" align="center">two</flex-item>
        <flex-item :flex="1">二</flex-item>
      </flex>
      <flex class="flex-option" direction="col" justify="between">
        <flex-item :flex="1">no.3</flex-item>
        <flex-item :flex="1" align="center">three</flex-item>
        <flex-item :flex="1">三</flex-item>
      </flex>
    </flex>
  </div>
</template>

<script>
import { Flex, FlexItem } from '../../../packages/flex/index'

export default {
  components: {
    Flex,
    FlexItem
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.flex-wrapper {
  height: 200px;
}
.flex-main {
  height: 100%;
}
.flex-option {
  height: 100%;
  flex: 1;
}
</style>
