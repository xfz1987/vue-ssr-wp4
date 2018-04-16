module.exports=function(t){var e={},n={3:0};function o(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.e=function(e){if(0!==n[e]){var o=require("./"+e+".server-entry.js"),a=o.modules,r=o.ids;for(var i in a)t[i]=a[i];for(var s=0;s<r.length;s++)n[r[s]]=0}return Promise.all([])},o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/public/",o.oe=function(t){process.nextTick(function(){throw t})},o.w={},o(o.s=13)}([function(t,e,n){"use strict";function o(t,e,n,o,a,r,i,s){var d=typeof(t=t||{}).default;"object"!==d&&"function"!==d||(t=t.default);var c,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),o&&(u.functional=!0),r&&(u._scopeId=r),i?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},u._ssrRegister=c):a&&(c=s?function(){a.call(this,this.$root.$options.shadowRoot)}:a),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,c):[c]}return{exports:t,options:u}}n.d(e,"a",function(){return o})},function(t,e){t.exports=require("vuex")},function(t,e){t.exports=require("vue")},function(t,e){t.exports=require("vue-router")},function(t,e){t.exports=require("vue-meta")},,,,,,,,,function(t,e,n){"use strict";n.r(e);var o=n(2),a=n.n(o),r=n(3),i=n.n(r),s=n(1),d=n.n(s),c=n(4),u=n.n(c),l=n(0);var p=function(t){var e;(e=n(24)).__inject__&&e.__inject__(t)},f=Object(l.a)(null,function(){var t=this.$createElement;return(this._self._c||t)("header",{staticClass:"main-header"},[this._ssrNode("<h1 data-v-d0fe6d2c>vue-ssr-todolist</h1>")])},[],!1,p,"data-v-d0fe6d2c","5cea82c5").exports,h=(n(23),{data:()=>({author:"Xfz"}),render(){const t=arguments[0];return t("div",{class:"footer"},[t("span",["Writen by ",this.author])])}});var m=function(t){var e;(e=n(22)).__inject__&&e.__inject__(t)},v=Object(l.a)(null,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"spinner"},[this._ssrNode('<div class="dot1" data-v-5d4d3cac></div> <div class="dot2" data-v-5d4d3cac></div>')])},[],!1,m,"data-v-5d4d3cac","13185800").exports,_=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},b={metaInfo:{title:"xfz's Todo App"},components:{Header:f,Footer:h,Loading:v},mounted(){this.updateCountSync({time:2e3,num:5});this.updateCount(3)},computed:_({},Object(s.mapState)(["count","loading"]),Object(s.mapGetters)(["fullname"])),methods:_({},Object(s.mapActions)(["updateCountSync"]),Object(s.mapMutations)(["updateCount"]),{testNotify(){this.$notify({content:"test notify",btn:"close"})}})};var g=function(t){var e;(e=n(25)).__inject__&&e.__inject__(t)},y=Object(l.a)(b,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[this._ssrNode('<div class="cover" data-v-af6d6604></div> '),this._ssrNode('<div id="loading"'+this._ssrStyle(null,null,{display:this.loading?"":"none"})+" data-v-af6d6604>","</div>",[e("Loading")],1),this._ssrNode(" "),e("Header"),this._ssrNode(" "),e("transition",{attrs:{name:"fade",mode:"out-in"}},[e("router-view")],1),this._ssrNode(" "),e("Footer")],2)},[],!1,g,"data-v-af6d6604","d3d7f472").exports,x=[{path:"/",redirect:"/app"},{path:"/app",component:()=>n.e(2).then(n.bind(null,12)),title:"my todolist",description:"this is a todolist vue-ssr"},{path:"/login",component:()=>n.e(1).then(n.bind(null,11)),title:"登陆",description:"this is a login vue-ssr"},{path:"/test",props:t=>({id:t.query.id}),component:()=>n.e(0).then(n.bind(null,10))}],C={count:0,firstname:"Zi",lastname:"Xiaofeng",todos:[],user:null,loading:!1},$={updateCount(t,e){t.count=e},fillTodos(t,e){t.todos=e},addTodo(t,e){t.todos.unshift(e)},updateTodo(t,{id:e,todo:n}){t.todos.splice(t.todos.findIndex(t=>t.id===e),1,n)},deleteTodo(t,e){t.todos.splice(t.todos.findIndex(t=>t.id===e),1)},deleteAllCompleted(t){t.todos=t.todos.filter(t=>!t.completed)},doLogin(t,e){t.user=e},startLoading(t){t.loading=!0},endLoading(t){t.loading=!1}},T={fullname:t=>`${t.firstname} ${t.lastname}`};const j=n(21),O=n(20)(j.db.appId,j.db.appkey);var L={getAllTodos:()=>O.getAllTodos()},w={name:"Notification",data:()=>({visible:!0}),props:{content:{type:String,required:!0},btn:{type:String,default:"关闭"}},computed:{style:()=>({})},methods:{handleClose(t){t.preventDefault(),this.$emit("close")},afterLeave(){this.$emit("closed")},afterEnter(){},clearTimer(){},createTimer(){}}};var A=function(t){var e;(e=n(17)).__inject__&&e.__inject__(t)},E=Object(l.a)(w,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"fade"},on:{"after-leave":t.afterLeave,"after-enter":t.afterEnter}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"notification",style:t.style,on:{mouseenter:t.clearTimer,mouseleave:t.createTimer}},[n("span",{staticClass:"content"},[t._v(t._s(t.content))]),t._v(" "),n("a",{staticClass:"btn",on:{click:t.handleClose}},[t._v(t._s(t.btn))])])])},[],!1,A,"data-v-f56ecd2e","1198faa0").exports,S={extends:E,data:()=>({verticalOffset:0,autoClose:3e3,height:0,visible:!1}),computed:{style(){return{position:"fixed",right:"20px",bottom:`${this.verticalOffset}px`}}},mounted(){this.createTimer()},methods:{createTimer(){this.autoClose&&(this.timer=setTimeout(()=>{this.visible=!1},this.autoClose))},clearTimer(){this.timer&&clearTimeout(this.timer)},afterEnter(){this.height=this.$el.offsetHeight}},beforeDestory(){this.clearTimer()}},P=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};const k=a.a.extend(S),N=[];let q=1;var I=t=>{if(a.a.prototype.$isServer)return;const{autoClose:e}=t,n=function(t,e){var n={};for(var o in t)e.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}(t,["autoClose"]),o=new k({propsData:P({},n),data:{autoClose:void 0===e?3e3:e}}),r=`notification_${q++}`;o.id=r,o.vm=o.$mount(),document.body.appendChild(o.vm.$el),o.visible=!0;let i=0;return N.forEach(t=>{i+=t.$el.offsetHeight+16}),i+=16,o.verticalOffset=i,N.push(o),o.vm.$on("closed",()=>{(t=>{if(!t)return;const e=N.length,n=N.findIndex(e=>t.id===e.id);if(N.splice(n,1),e<1)return;const o=t.vm.height;for(let t=n;t<e-1;t++)N[t].verticalOffset=parseInt(N[t].verticalOffset)-o-16})(o),document.body.removeChild(o.vm.$el),o.vm.$destroy()}),o.vm.$on("close",()=>{o.vm.visible=!1}),o.vm},D=new a.a;const R=t=>{401===t.code&&(I({content:"please login！"}),D.$emit("auth"))};var F={updateCountSync(t,e){setTimeout(()=>{t.commit("updateCount",e.num)},e.time)},fetchTodos:({commit:t})=>(t("startLoading"),L.getAllTodos().then(e=>{t("endLoading"),t("fillTodos",e)}).catch(e=>{t("endLoading"),R(e)})),addTodo({commit:t},e){t("startLoading"),L.createTodo(e).then(e=>{t("addTodo",e),t("endLoading"),I({content:"你又多了一件事要做"})}).catch(e=>{R(e),t("endLoading")})},updateTodo({commit:t},{id:e,todo:n}){t("startLoading"),L.updateTodo(e,n).then(n=>{t("updateTodo",{id:e,todo:n}),t("endLoading")}).catch(e=>{R(e),t("endLoading")})},deleteTodo({commit:t},e){t("startLoading"),L.deleteTodo(e).then(n=>{t("deleteTodo",e),t("endLoading"),I({content:"你又少了一件事要做"})}).catch(e=>{R(e),t("endLoading")})},deleteAllCompleted({commit:t,state:e}){t("startLoading");const n=e.todos.filter(t=>t.completed).map(t=>t.id);L.deleteAllCompleted(n).then(()=>{t("deleteAllCompleted"),t("endLoading"),I({content:"清理一下~~~"})}).catch(e=>{R(e),t("endLoading")})},login:({commit:t},{username:e,password:n})=>(t("startLoading"),new Promise((o,a)=>{L.login(e,n).then(e=>{t("doLogin",e),I({content:"登陆成功"}),o(),t("endLoading")}).catch(e=>{R(e),a(e),t("endLoading")})}))},X={props:{panes:{type:Array,required:!0}},render(){return(0,arguments[0])("div",{class:"tab-content"},[this.panes.map(t=>t.active?t.$slots.default:null)])}},U={name:"Tabs",components:{TabContainer:Object(l.a)(X,void 0,void 0,!1,null,null,"ff237592").exports},props:{value:{type:[String,Number],required:!0}},data:()=>({panes:[]}),render(){const t=arguments[0];return t("div",{class:"tabs"},[t("ul",{class:"tabs-header"},[this.$slots.default]),t("tab-container",{attrs:{panes:this.panes}})])},methods:{onChange(t){this.$emit("change",t)}}};var H=function(t){var e;(e=n(16)).__inject__&&e.__inject__(t)},M=Object(l.a)(U,void 0,void 0,!1,H,"data-v-7aaf186a","d3bfb100").exports,B={name:"Tab",props:{index:{type:[Number,String],required:!0},label:{type:String,default:"tab"}},computed:{active(){return this.$parent.value===this.index}},mounted(){this.$parent.panes.push(this)},methods:{handleClick(){this.$parent.onChange(this.index)}},render(){const t=arguments[0],e=this.$slots.label||t("span",[this.label]);return t("li",{class:{tab:!0,active:this.active},on:{click:this.handleClick}},[e])}};var Z=function(t){var e;(e=n(15)).__inject__&&e.__inject__(t)},z=Object(l.a)(B,void 0,void 0,!1,Z,"data-v-e796360e","ac3a8bfa").exports;n(14);a.a.use(i.a),a.a.use(d.a),a.a.use(u.a),a.a.use(t=>{t.component(E.name,E),t.prototype.$notify=I}),a.a.use(t=>{t.component(M.name,M),t.component(z.name,z)});var V=()=>{const t=(()=>new i.a({routes:x,mode:"history",linkActiveClass:"active-class",linkExactActiveClass:"exact-active-class",scrollBehavior:(t,e,n)=>n||{x:0,y:0},fallback:!0}))(),e=(()=>new d.a.Store({strict:!1,state:C,mutations:$,getters:T,actions:F}))();return{app:new a.a({router:t,store:e,render:t=>t(y)}),router:t,store:e}};e.default=(t=>new Promise((e,n)=>{const{app:o,router:a,store:r}=V();t.user&&(r.state.user=t.user),a.push(t.url),a.onReady(()=>{const i=a.getMatchedComponents();if(!i.length)return n(new Error("no component matched"));Promise.all(i.map(t=>{if(t.asyncData)return t.asyncData({route:a.currentRoute,router:a,store:r})})).then(n=>{t.meta=o.$meta(),t.state=r.state,t.router=a,e(o)})})}))},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){t.exports=require("axios")},function(t,e){t.exports=require("sha1")},function(t,e,n){function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function o(a,r){try{var i=e[a](r),s=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(s).then(function(t){o("next",t)},function(t){o("throw",t)});t(s)}("next")})}}const a=n(19),r=n(18).create({baseURL:"https://d.apicloud.com/mcm/api"}),i=t=>{let{status:e,data:n}=t,o=function(t,e){var n={};for(var o in t)e.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}(t,["status","data"]);if(200===e)return n;throw((t,e)=>{const n=new Error(e.message);return n.code=t,n})(e,o)};t.exports=((t,e)=>{const n=()=>{const n=Date.now();return{"X-APICloud-AppId":t,"X-APICloud-AppKey":`${a(`${t}UZ${e}UZ${n}`)}.${n}`}};return{getAllTodos:()=>o(function*(){return i(yield r.get("/todo",{headers:n()}))})(),addTodo:t=>o(function*(){return i(yield r.post("/todo",t,{headers:n()}))})(),updateTodo:(t,e)=>o(function*(){return i(yield r.put(`/todo/${t}`,e,{headers:n()}))})(),deleteTodo:t=>o(function*(){return i(yield r.delete(`/todo/${t}`,{headers:n()}))})(),deleteCompleted:t=>o(function*(){const e=t.map(function(t){return{method:"DELETE",path:`/mcm/api/todo/${t}`}});return i(yield r.post("/batch",{requests:e},{headers:n()}))})()}})},function(t,e){t.exports={db:{appId:"A6078255755656",appkey:"B8C7E84A-0FD2-2985-1B64-2D44FF27A784"},cdn:{host:"http://p4t4vcu10.bkt.clouddn.com/",bucket:"vue-todo",ak:"",sk:""}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){}]);
//# sourceMappingURL=server-entry.js.map