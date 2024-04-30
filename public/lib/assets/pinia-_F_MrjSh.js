import{U as t,f as e,V as n,W as s,e as r,J as o,H as a,X as c,z as i,w as u,r as l,M as f,N as p,n as h,I as d,c as y}from"./vue--_kkPoVD.js";
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let b;const g=t=>b=t,v=Symbol();function _(t){return t&&"object"==typeof t&&"[object Object]"===Object.prototype.toString.call(t)&&"function"!=typeof t.toJSON}var $,O;function j(){const s=t(!0),r=s.run((()=>e({})));let o=[],a=[];const c=n({install(t){g(c),c._a=t,t.provide(v,c),t.config.globalProperties.$pinia=c,a.forEach((t=>o.push(t))),a=[]},use(t){return this._a?o.push(t):a.push(t),this},_p:o,_a:null,_e:s,_s:new Map,state:r});return c}(O=$||($={})).direct="direct",O.patchObject="patch object",O.patchFunction="patch function";const m=()=>{};function R(t,e,n,s=m){t.push(e);const r=()=>{const n=t.indexOf(e);n>-1&&(t.splice(n,1),s())};return!n&&f()&&p(r),r}function S(t,...e){t.slice().forEach((t=>{t(...e)}))}const z=t=>t();function E(t,e){t instanceof Map&&e instanceof Map&&e.forEach(((e,n)=>t.set(n,e))),t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],r=t[n];_(r)&&_(s)&&t.hasOwnProperty(n)&&!a(s)&&!c(s)?t[n]=E(r,s):t[n]=s}return t}const P=Symbol();const{assign:k}=Object;function w(n,s,r={},i,f,p){let d;const y=k({actions:{}},r),b={deep:!0};let v,O,j,w=[],A=[];const I=i.state.value[n];let x;function J(t){let e;v=O=!1,"function"==typeof t?(t(i.state.value[n]),e={type:$.patchFunction,storeId:n,events:j}):(E(i.state.value[n],t),e={type:$.patchObject,payload:t,storeId:n,events:j});const s=x=Symbol();h().then((()=>{x===s&&(v=!0)})),O=!0,S(w,e,i.state.value[n])}p||I||(i.state.value[n]={}),e({});const M=p?function(){const{state:t}=r,e=t?t():{};this.$patch((t=>{k(t,e)}))}:m;function N(t,e){return function(){g(i);const s=Array.from(arguments),r=[],o=[];let a;S(A,{args:s,name:t,store:H,after:function(t){r.push(t)},onError:function(t){o.push(t)}});try{a=e.apply(this&&this.$id===n?this:H,s)}catch(c){throw S(o,c),c}return a instanceof Promise?a.then((t=>(S(r,t),t))).catch((t=>(S(o,t),Promise.reject(t)))):(S(r,a),a)}}const F={_p:i,$id:n,$onAction:R.bind(null,A),$patch:J,$reset:M,$subscribe(t,e={}){const s=R(w,t,e.detached,(()=>r())),r=d.run((()=>u((()=>i.state.value[n]),(s=>{("sync"===e.flush?O:v)&&t({storeId:n,type:$.direct,events:j},s)}),k({},b,e))));return s},$dispose:function(){d.stop(),w=[],A=[],i._s.delete(n)}},H=l(F);i._s.set(n,H);const W=(i._a&&i._a.runWithContext||z)((()=>i._e.run((()=>(d=t()).run(s)))));for(const t in W){const e=W[t];if(a(e)&&(!a(U=e)||!U.effect)||c(e))p||(!I||_(C=e)&&C.hasOwnProperty(P)||(a(e)?e.value=I[t]:E(e,I[t])),i.state.value[n][t]=e);else if("function"==typeof e){const n=N(t,e);W[t]=n,y.actions[t]=e}}var C,U;return k(H,W),k(o(H),W),Object.defineProperty(H,"$state",{get:()=>i.state.value[n],set:t=>{J((e=>{k(e,t)}))}}),i._p.forEach((t=>{k(H,d.run((()=>t({store:H,app:i._a,pinia:i,options:y}))))})),I&&p&&r.hydrate&&r.hydrate(H.$state,I),v=!0,O=!0,H}function A(t,e,o){let a,c;const i="function"==typeof e;function u(t,o){const u=s();(t=t||(u?r(v,null):null))&&g(t),(t=b)._s.has(a)||(i?w(a,e,c,t):function(t,e,s,r){const{state:o,actions:a,getters:c}=e,i=s.state.value[t];let u;u=w(t,(function(){i||(s.state.value[t]=o?o():{});const e=d(s.state.value[t]);return k(e,a,Object.keys(c||{}).reduce(((e,r)=>(e[r]=n(y((()=>{g(s);const e=s._s.get(t);return c[r].call(e,e)}))),e)),{}))}),e,s,0,!0)}(a,c,t));return t._s.get(a)}return"string"==typeof t?(a=t,c=i?o:e):(c=t,a=t.id),u.$id=a,u}function I(t){{t=o(t);const e={};for(const n in t){const s=t[n];(a(s)||c(s))&&(e[n]=i(t,n))}return e}}function x(t,e){var n;return t="object"==typeof(n=t)&&null!==n?t:Object.create(null),new Proxy(t,{get:(t,n,s)=>"key"===n?Reflect.get(t,n,s):Reflect.get(t,n,s)||Reflect.get(e,n,s)})}function J(t,{storage:e,serializer:n,key:s,debug:r}){try{const r=null==e?void 0:e.getItem(s);r&&t.$patch(null==n?void 0:n.deserialize(r))}catch(o){}}function M(t,{storage:e,serializer:n,key:s,paths:r,debug:o}){try{const o=Array.isArray(r)?function(t,e){return e.reduce(((e,n)=>{const s=n.split(".");return function(t,e,n){return e.slice(0,-1).reduce(((t,e)=>/^(__proto__)$/.test(e)?{}:t[e]=t[e]||{}),t)[e[e.length-1]]=n,t}(e,s,function(t,e){return e.reduce(((t,e)=>null==t?void 0:t[e]),t)}(t,s))}),{})}(t,r):t;e.setItem(s,n.serialize(o))}catch(a){}}var N=function(t={}){return e=>{const{auto:n=!1}=t,{options:{persist:s=n},store:r,pinia:o}=e;if(!s)return;if(!(r.$id in o.state.value)){const t=o._s.get(r.$id.replace("__hot:",""));return void(t&&Promise.resolve().then((()=>t.$persist())))}const a=(Array.isArray(s)?s.map((e=>x(e,t))):[x(s,t)]).map((({storage:e=localStorage,beforeRestore:n=null,afterRestore:s=null,serializer:o={serialize:JSON.stringify,deserialize:JSON.parse},key:a=r.$id,paths:c=null,debug:i=!1})=>{var u;return{storage:e,beforeRestore:n,afterRestore:s,serializer:o,key:(null!=(u=t.key)?u:t=>t)("string"==typeof a?a:a(r.$id)),paths:c,debug:i}}));r.$persist=()=>{a.forEach((t=>{M(r.$state,t)}))},r.$hydrate=({runHooks:t=!0}={})=>{a.forEach((n=>{const{beforeRestore:s,afterRestore:o}=n;t&&(null==s||s(e)),J(r,n),t&&(null==o||o(e))}))},a.forEach((t=>{const{beforeRestore:n,afterRestore:s}=t;null==n||n(e),J(r,t),null==s||s(e),r.$subscribe(((e,n)=>{M(n,t)}),{detached:!0})}))}}();export{N as a,j as c,A as d,I as s};
