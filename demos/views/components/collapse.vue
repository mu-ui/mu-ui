<template>
  <div class="collapse">
    <Collapse :accordion="true">
      <CollapseItem name="1" title="来来来">
        <p v-for="n in 5" :key="n">{{ n }}</p>
      </CollapseItem>
      <CollapseItem name="2" title="去去去">
        <p v-for="n in 10" :key="n">{{ n }}</p>
      </CollapseItem>
      <CollapseItem name="3" title="来去来">
        <p v-for="n in 15" :key="n">{{ n }}</p>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from '../../../packages/collapse/index'

export default {
  components: {
    Collapse,
    CollapseItem
  },
  data() {
    return {}
  }
}
</script>
