(window.webpackJsonp=window.webpackJsonp||[]).push([["login-view"],{4:function(e,s,t){"use strict";t.r(s);var r=t(1),a={metaInfo:{title:"Login page"},data:()=>({username:"",password:"",errorMsg:""}),methods:(Object.assign||function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e})({},Object(r.b)(["login"]),{doSubmit(e){e.preventDefault(),this.validate()&&this.login({username:this.username,password:this.password}).then(()=>{this.$router.replace("/app")})},validate(){return this.username.trim()?this.password.trim()?(this.errorMsg="",!0):(this.errorMsg="password can not empty",!1):(this.errorMsg="username can not empty",!1)}})},o=t(0),n=Object(o.a)(a,function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("form",{staticClass:"login-form",on:{submit:e.doSubmit}},[t("h1",[t("span",[e._v("Login")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:e.errorMsg,expression:"errorMsg"}],staticClass:"error-msg"},[e._v(e._s(e.errorMsg))])]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"login-input",attrs:{type:"text",placeholder:"User Name"},domProps:{value:e.username},on:{input:function(s){s.target.composing||(e.username=s.target.value)}}}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"login-input",attrs:{type:"password",placeholder:"Password",autocomplete:"new-password"},domProps:{value:e.password},on:{input:function(s){s.target.composing||(e.password=s.target.value)}}}),e._v(" "),t("button",{staticClass:"login-btn",attrs:{type:"submit"}},[e._v("Login")])])},[],!1,function(e){t(8)},"data-v-5e3a2f38",null);s.default=n.exports},8:function(e,s){}}]);