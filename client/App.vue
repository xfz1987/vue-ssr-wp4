<template>
	<div id="app">
		<div class="cover"></div>
    <div id="loading" v-show="loading">
      <Loading />
    </div>
		<Header></Header>
<!--     <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/test?id=xfz">test</router-link>
    <div>{{ count }}</div>
    <p>{{ fullname }}</p> -->
    <!-- <tabs>
      <tab lable="text">
        <span slot="label"></span>
        <p>This is tab content</p>
      </tab>
    </tabs>
    <ul>
      <li>label</li>
      <li>label2</li>
    </ul>
    <div class="tab-container">
      <p>This is tab content</p>
    </div> -->
<!--     <Tabs value="1">
      <Tab label="tab1" index="1" />
      <Tab label="tab2" index="2"><span slot="label" style="color:red">tab2</span></Tab>
      <Tab label="tab3" index="3" />
    </Tabs> -->
		<transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <!-- <button @click="testNotify">click me</button> -->
		<Footer></Footer>
	</div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Loading from './components/loading/loading.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  metaInfo: {
    title: 'xfz\'s Todo App'
  },
  components: { Header, Footer, Loading },
  mounted () {
    this.updateCountSync({ time: 2000, num: 5 })
    let i = 1
    this.updateCount(i + 2)
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    // fullname () {
    //   return this.$store.getters.fullname
    // }
    ...mapState([
      'count',
      'loading'
    ]),
    ...mapGetters([
      'fullname'
    ])
    // ...mapMutations([
    // ])
  },
  methods: {
    ...mapActions(['updateCountSync']),
    ...mapMutations(['updateCount']),
    testNotify () {
      this.$notify({
        content: 'test notify',
        btn: 'close'
      })
    }
  }
}
</script>

<style scoped>
#app{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.cover{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #999;
    opacity: .4;
    z-index: -1;
}
#loading{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255,255,255,.3);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>