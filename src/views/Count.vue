<template>
  <div>
    <p>Count: {{ count }}</p>
    <el-divider></el-divider>
    <p>Double: {{ double }}</p>
    <el-divider></el-divider>
    <el-button-group>
      <el-button type="primary" icon="el-icon-plus"  @click="increment"></el-button>
      <el-button type="primary" icon="el-icon-minus" @click="decrement"></el-button>
    </el-button-group>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default {
  name: 'CountComponent',
  computed: {
    ...mapState(useCounterStore, ['count', 'double'])
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'decrement'])
  }
}
</script>