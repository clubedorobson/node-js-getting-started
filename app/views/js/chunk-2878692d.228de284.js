(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2878692d"],{"05e7":function(t,e,a){},1192:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.tabelaPartida.length>0?r("b-table",{attrs:{fixed:"",items:t.tabelaPartida,fields:t.fieldsTimes},scopedSlots:t._u([{key:"cell(homeCrest)",fn:function(t){return[r("b-img",{attrs:{fluid:"",center:"",height:"100%",width:"100%",src:"https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l"+t.value+".png",alt:"..."}})]}},{key:"cell(partidasHomeClub.name)",fn:function(e){return[r("span",{staticClass:"homeName"},[t._v(t._s(e.item.partidasHomeClub.name))]),t._v(" "),r("span",{staticClass:"matchResult"},[t._v(t._s(e.item.homeGoals)+" x "+t._s(e.item.awayGoals))]),t._v(" "),r("span",{staticClass:"awayName"},[t._v(t._s(e.item.partidasAwayClub.name))])]}},{key:"cell(awayCrest)",fn:function(t){return[r("b-img",{attrs:{fluid:"",center:"",height:"100%",width:"100%",src:"https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l"+t.value+".png",alt:"..."}})]}},{key:"cell(homeGoals)",fn:function(e){return[t._v(" "+t._s(e.value)+" "),r("span",[t._v("x")]),t._v(" "+t._s(e.item.awayGoals)+" ")]}}],null,!1,3164298002)}):t._e(),r("b-card",[r("b-table",{attrs:{align:"center",items:t.arrayPartida,fields:t.fields}})],1),r("b-card",[r("div",[r("b-tabs",{attrs:{fill:""}},[t.tabelaPartida.length>0?r("b-tab",{attrs:{title:t.tabelaPartida[0].partidasHomeClub.name,active:""}},[r("v-data-table",{staticClass:"btable",attrs:{"elevation-1":"",align:"center",bordered:"",outlined:"",small:"","text-center":"",striped:"",hover:"",items:t.membrosHome,headers:t.fieldsMembros}}),"HOME"==t.clubeDoRobson?r("b-btn",{staticClass:"button-right",attrs:{variant:"purple",id:"show-btn"},on:{click:t.showModal}},[t._v("Escalação")]):t._e()],1):t._e(),t.tabelaPartida.length>0?r("b-tab",{attrs:{title:t.tabelaPartida[0].partidasAwayClub.name}},[r("v-data-table",{staticClass:"btable",attrs:{align:"center",bordered:"",outlined:"",small:"","text-center":"",striped:"",hover:"",items:t.membrosAway,headers:t.fieldsMembros}}),"AWAY"==t.clubeDoRobson?r("b-btn",{staticClass:"button-right",attrs:{variant:"purple",id:"show-btn"},on:{click:t.showModal}},[t._v("Escalação")]):t._e()],1):t._e()],1)],1)]),r("b-modal",{ref:"my-modal",attrs:{centered:"",id:"modal-tall",size:"xl","ok-only":""}},[t.squadImage?r("b-img",{attrs:{fluid:"",center:"",src:a("cc76")("./"+t.squadImage)}}):t._e()],1)],1)},n=[],o=(a("7db0"),a("4160"),a("b0c0"),a("b680"),a("159b"),a("96cf"),a("1da1")),s=a("d4ec"),i=a("bee2"),l=a("c427"),c=function(){function t(){Object(s["a"])(this,t)}return Object(i["a"])(t,[{key:"getAll",value:function(t){return l["a"].get("/partidas/".concat(t))}},{key:"getOne",value:function(t){return l["a"].get("/partidas/".concat(t,"/"))}},{key:"getSeasons",value:function(t){return l["a"].get("/partidas/seasons/".concat(t))}},{key:"create",value:function(t){return l["a"].post("/tutorials",t)}},{key:"update",value:function(t,e){return l["a"].put("/tutorials/".concat(t),e)}},{key:"delete",value:function(t){return l["a"].delete("/tutorials/".concat(t))}},{key:"deleteAll",value:function(){return l["a"].delete("/tutorials")}},{key:"findByTitle",value:function(t){return l["a"].get("/tutorials?title=".concat(t))}}]),t}(),u=new c,d=a("61ee"),f={name:"partida",data:function(){return{modalShow:null,fixed:!0,membrosHome:[],membrosAway:[],membrosRobson:[],membrosRobsonCompleto:[],clubeDoRobson:null,tabelaPartida:[],fields:[{key:"casa",label:"",sortable:!1},{key:"label",label:"",text:"",sortable:!1,align:"center"},{key:"fora",label:"",sortable:!1,align:"center"}],fieldsTimes:[{key:"homeCrest",label:"Casa",sortable:!1,align:"center"},{key:"partidasHomeClub.name",label:"",sortable:!1,align:"center"},{key:"awayCrest",label:"Fora ",sortable:!1,align:"center"}],fieldsPartida:[{value:"partidasClubesPartidas[1].passattempts",text:"",sortable:!1,align:"center"},{value:"passes",text:"",sortable:!1,align:"center"},{value:"partidasClubesPartidas[0].passattempts",text:"",sortable:!1,align:"center"}],fieldsPosse:[{value:"partidasClubesPartidas[1].precisaoHome",text:"",sortable:!1,align:"center"},{value:"posse",text:"",sortable:!1,align:"center"},{value:"partidasClubesPartidas[0].precisaoAway",text:"",sortable:!1,align:"center"}],fieldsMembros:[{value:"membrosPartidasMembros.proName",text:"Nome",sortable:!1,align:"center"},{value:"passattempts",text:"Tentativas de passe",sortable:!1,align:"center"},{value:"passesmade",text:"Passes feitos",sortable:!1,align:"center"},{value:"shots",text:"Chutes",sortable:!1,align:"center"},{value:"goals",text:"Gols",sortable:!1,align:"center"},{value:"assists",text:"Assistências",sortable:!1,align:"center"},{value:"mom",text:"",sortable:!1,align:"center"},{value:"rating",text:"Nota",sortable:!1,align:"center"}],opcoes:[],model:{opcoes:[],selected:null},currentPartida:null,message:"",seasons:[],partida:[],arrayPartida:[],membroResgatado:null,currentIndex:-1}},methods:{showModal:function(){this.$refs["my-modal"].show()},getPartida:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,r,n,o,s,i,l,c,f,p,m,b,h,g,v,y;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.$route.params.partidaId,e.next=3,u.getOne(a);case 3:return r=e.sent,t.partida=r.data[0],t.partida["passes"]="Passes",t.partida["posse"]="Posse de bola",t.partida["chutes"]="Chutes",t.partida["precisao"]="Precisão no passe",t.partida["divididas"]="Divididas",n=t.partida["homeClub"],o=t.partida["awayClub"],s=[],i=[],t.partida.partidasClubesPartidas.forEach((function(t){t.clubId==n?s=t:t.clubId==o&&(i=t)})),6703918==s.clubId?t.clubeDoRobson="HOME":t.clubeDoRobson="AWAY",1==t.partida.partidasAwayClub.iscustomteam?t.partida["awayCrest"]=t.partida.partidasAwayClub.customcrestid:0==t.partida.partidasAwayClub.iscustomteam&&(t.partida["awayCrest"]=t.partida.partidasAwayClub.teamId),1==t.partida.partidasHomeClub.iscustomteam?t.partida["homeCrest"]=t.partida.partidasHomeClub.customcrestid:0==t.partida.partidasHomeClub.iscustomteam&&(t.partida["homeCrest"]=t.partida.partidasHomeClub.teamId),l=i.passattempts,c=i.passesmade,f=c/l,t.partida.partidasClubesPartidas["tentativasPasseAway"]=l,t.partida.partidasClubesPartidas["passesAway"]=c,t.partida.partidasClubesPartidas["precisaoPasseAway"]=parseFloat(100*f).toFixed(2)+" %",p=s.passattempts,m=s.passesmade,b=m/p,t.partida.partidasClubesPartidas["tentativasPasseHome"]=p,t.partida.partidasClubesPartidas["passesHome"]=m,t.partida.partidasClubesPartidas["precisaoPasseHome"]=parseFloat(100*b).toFixed(2)+" %",h=c/(c+m),h=parseFloat(100*h).toFixed(2),g=100-h,g=parseFloat(g).toFixed(2),t.partida.partidasClubesPartidas["posseAway"]=h+" %",t.partida.partidasClubesPartidas["posseHome"]=g+" %",t.arrayPartida=[{casa:s.passesmade,label:"Passes",fora:i.passesmade},{casa:t.partida.partidasClubesPartidas["precisaoPasseHome"],label:"Precisão no passe",fora:t.partida.partidasClubesPartidas["precisaoPasseAway"]},{casa:t.partida.partidasClubesPartidas["posseHome"],label:"Posse de bola",fora:t.partida.partidasClubesPartidas["posseAway"]},{casa:s.shots,label:"Chutes",fora:i.shots},{casa:s.tacklesmade,label:"Divididas",fora:i.tacklesmade}],console.log("MEMBROSPARTIDAS",t.partida.partidasMembrosPartidas),t.partida.partidasMembrosPartidas.forEach((function(e){e.clubid==s.clubId?(t.membrosHome.push(e),6703918==e.clubid&&t.membrosRobson.push(e)):(t.membrosAway.push(e),6703918==e.clubid&&t.membrosRobson.push(e))})),t.squadImage=t.getSquadImage(),console.log(t.squadImage),e.next=43,d["a"].getAll();case 43:v=e.sent,t.robsoners=v.data,y=null,t.membrosRobson.forEach((function(e,a){console.log("MEMBRO, ROBSONER",e,t.robsoners),y=t.robsoners.find((function(t){return t.name==e.name})),console.log(e),y&&(t.membrosRobson[a]["face"]=y.face),console.log(t.membrosRobson)})),console.log(t.partida),t.tabelaPartida=[t.partida],console.log(t.tabelaPartida[0]);case 50:case"end":return e.stop()}}),e)})))()},getSquadImage:function(){var t="";return 2==this.membrosRobson.length&&(this.membrosRobson.find((function(t){return"Pedro_H77"==t.name}))&&this.membrosRobson.find((function(t){return"bastospereira"==t.name}))&&(t="banjo-canuto.png"),this.membrosRobson.find((function(t){return"bastospereira"==t.name}))&&this.membrosRobson.find((function(t){return"El_Wandershow"==t.name}))&&(t="canuto-sins.png")),3==this.membrosRobson.length&&(console.log("TRESSSS"),this.membrosRobson.find((function(t){return"Pedro_H77"==t.name}))&&this.membrosRobson.find((function(t){return"bastospereira"==t.name}))&&this.membrosRobson.find((function(t){return"ThePedroso"==t.name}))&&(t="banjo-canuto-toto.png"),this.membrosRobson.find((function(t){return"Pedro_H77"==t.name}))&&this.membrosRobson.find((function(t){return"bastospereira"==t.name}))&&this.membrosRobson.find((function(t){return"El_Wandershow"==t.name}))&&(t="banjo-canuto-sins.png"),this.membrosRobson.find((function(t){return"bastospereira"==t.name}))&&this.membrosRobson.find((function(t){return"ThePedroso"==t.name}))&&this.membrosRobson.find((function(t){return"El_Wandershow"==t.name}))&&console.log("AQUIIIIIII"),t="canuto-toto-sins.png"),t}},created:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.message="",console.log(t.$route.params),e.next=4,t.getPartida();case 4:case"end":return e.stop()}}),e)})))()}},p=f,m=(a("2309"),a("2877")),b=a("6544"),h=a.n(b),g=a("8fea"),v=Object(m["a"])(p,r,n,!1,null,null,null);e["default"]=v.exports;h()(v,{VDataTable:g["a"]})},"1da1":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("d3b7");function r(t,e,a,r,n,o,s){try{var i=t[o](s),l=i.value}catch(c){return void a(c)}i.done?e(l):Promise.resolve(l).then(r,n)}function n(t){return function(){var e=this,a=arguments;return new Promise((function(n,o){var s=t.apply(e,a);function i(t){r(s,n,o,i,l,"next",t)}function l(t){r(s,n,o,i,l,"throw",t)}i(void 0)}))}}},"1f99":function(t,e,a){t.exports=a.p+"img/canuto-sins.f391aa9f.png"},2309:function(t,e,a){"use strict";a("05e7")},3988:function(t,e,a){t.exports=a.p+"img/banjo-canuto.ead68a08.png"},"463d":function(t,e,a){t.exports=a.p+"img/banjo-canuto-sins-toto.7b538482.png"},"61ee":function(t,e,a){"use strict";var r=a("d4ec"),n=a("bee2"),o=a("c427"),s=function(){function t(){Object(r["a"])(this,t)}return Object(n["a"])(t,[{key:"getAll",value:function(){return o["a"].get("/robsoners/")}},{key:"get",value:function(t){return console.log(t),o["a"].get("/robsoners/".concat(t))}},{key:"create",value:function(t){return o["a"].post("/tutorials",t)}},{key:"update",value:function(t,e){return o["a"].put("/tutorials/".concat(t),e)}},{key:"delete",value:function(t){return o["a"].delete("/tutorials/".concat(t))}},{key:"deleteAll",value:function(){return o["a"].delete("/tutorials")}},{key:"findByTitle",value:function(t){return o["a"].get("/tutorials?title=".concat(t))}}]),t}();e["a"]=new s},"96cf":function(t,e,a){var r=function(t){"use strict";var e,a=Object.prototype,r=a.hasOwnProperty,n="function"===typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",s=n.asyncIterator||"@@asyncIterator",i=n.toStringTag||"@@toStringTag";function l(t,e,a){return Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(I){l=function(t,e,a){return t[e]=a}}function c(t,e,a,r){var n=e&&e.prototype instanceof h?e:h,o=Object.create(n.prototype),s=new O(r||[]);return o._invoke=k(t,a,s),o}function u(t,e,a){try{return{type:"normal",arg:t.call(e,a)}}catch(I){return{type:"throw",arg:I}}}t.wrap=c;var d="suspendedStart",f="suspendedYield",p="executing",m="completed",b={};function h(){}function g(){}function v(){}var y={};y[o]=function(){return this};var w=Object.getPrototypeOf,x=w&&w(w(L([])));x&&x!==a&&r.call(x,o)&&(y=x);var P=v.prototype=h.prototype=Object.create(y);function C(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function a(n,o,s,i){var l=u(t[n],t,o);if("throw"!==l.type){var c=l.arg,d=c.value;return d&&"object"===typeof d&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){a("next",t,s,i)}),(function(t){a("throw",t,s,i)})):e.resolve(d).then((function(t){c.value=t,s(c)}),(function(t){return a("throw",t,s,i)}))}i(l.arg)}var n;function o(t,r){function o(){return new e((function(e,n){a(t,r,e,n)}))}return n=n?n.then(o,o):o()}this._invoke=o}function k(t,e,a){var r=d;return function(n,o){if(r===p)throw new Error("Generator is already running");if(r===m){if("throw"===n)throw o;return j()}a.method=n,a.arg=o;while(1){var s=a.delegate;if(s){var i=R(s,a);if(i){if(i===b)continue;return i}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(r===d)throw r=m,a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);r=p;var l=u(t,e,a);if("normal"===l.type){if(r=a.done?m:f,l.arg===b)continue;return{value:l.arg,done:a.done}}"throw"===l.type&&(r=m,a.method="throw",a.arg=l.arg)}}}function R(t,a){var r=t.iterator[a.method];if(r===e){if(a.delegate=null,"throw"===a.method){if(t.iterator["return"]&&(a.method="return",a.arg=e,R(t,a),"throw"===a.method))return b;a.method="throw",a.arg=new TypeError("The iterator does not provide a 'throw' method")}return b}var n=u(r,t.iterator,a.arg);if("throw"===n.type)return a.method="throw",a.arg=n.arg,a.delegate=null,b;var o=n.arg;return o?o.done?(a[t.resultName]=o.value,a.next=t.nextLoc,"return"!==a.method&&(a.method="next",a.arg=e),a.delegate=null,b):o:(a.method="throw",a.arg=new TypeError("iterator result is not an object"),a.delegate=null,b)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function L(t){if(t){var a=t[o];if(a)return a.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,s=function a(){while(++n<t.length)if(r.call(t,n))return a.value=t[n],a.done=!1,a;return a.value=e,a.done=!0,a};return s.next=s}}return{next:j}}function j(){return{value:e,done:!0}}return g.prototype=P.constructor=v,v.constructor=g,g.displayName=l(v,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,l(t,i,"GeneratorFunction")),t.prototype=Object.create(P),t},t.awrap=function(t){return{__await:t}},C(_.prototype),_.prototype[s]=function(){return this},t.AsyncIterator=_,t.async=function(e,a,r,n,o){void 0===o&&(o=Promise);var s=new _(c(e,a,r,n),o);return t.isGeneratorFunction(a)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},C(P),l(P,i,"Generator"),P[o]=function(){return this},P.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var a in t)e.push(a);return e.reverse(),function a(){while(e.length){var r=e.pop();if(r in t)return a.value=r,a.done=!1,a}return a.done=!0,a}},t.values=L,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(A),!t)for(var a in this)"t"===a.charAt(0)&&r.call(this,a)&&!isNaN(+a.slice(1))&&(this[a]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var a=this;function n(r,n){return i.type="throw",i.arg=t,a.next=r,n&&(a.method="next",a.arg=e),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var s=this.tryEntries[o],i=s.completion;if("root"===s.tryLoc)return n("end");if(s.tryLoc<=this.prev){var l=r.call(s,"catchLoc"),c=r.call(s,"finallyLoc");if(l&&c){if(this.prev<s.catchLoc)return n(s.catchLoc,!0);if(this.prev<s.finallyLoc)return n(s.finallyLoc)}else if(l){if(this.prev<s.catchLoc)return n(s.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return n(s.finallyLoc)}}}},abrupt:function(t,e){for(var a=this.tryEntries.length-1;a>=0;--a){var n=this.tryEntries[a];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var s=o?o.completion:{};return s.type=t,s.arg=e,o?(this.method="next",this.next=o.finallyLoc,b):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var a=this.tryEntries[e];if(a.finallyLoc===t)return this.complete(a.completion,a.afterLoc),A(a),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var a=this.tryEntries[e];if(a.tryLoc===t){var r=a.completion;if("throw"===r.type){var n=r.arg;A(a)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,a,r){return this.delegate={iterator:L(t),resultName:a,nextLoc:r},"next"===this.method&&(this.arg=e),b}},t}(t.exports);try{regeneratorRuntime=r}catch(n){Function("r","regeneratorRuntime = r")(r)}},cc76:function(t,e,a){var r={"./banjo-canuto-sins-toto.png":"463d","./banjo-canuto.png":"3988","./canuto-sins.png":"1f99","./canuto-toto-sins.png":"f919"};function n(t){var e=o(t);return a(e)}function o(t){if(!a.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}n.keys=function(){return Object.keys(r)},n.resolve=o,t.exports=n,n.id="cc76"},f919:function(t,e,a){t.exports=a.p+"img/canuto-toto-sins.de839f4c.png"}}]);
//# sourceMappingURL=chunk-2878692d.228de284.js.map