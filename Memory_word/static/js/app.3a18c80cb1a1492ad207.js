webpackJsonp([1],{"2q99":function(t,e){},"62SD":function(t,e){},BSZ6:function(t,e){},CC1e:function(t,e){},HXSp:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n=(a("atYJ"),{props:{status:{type:Boolean,required:!0,default:!0}},name:"fade"}),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:"fade"}},[this.status?e("div",{staticClass:"fade"},[this._t("default")],2):this._e()])},staticRenderFns:[]};var o=a("VU/8")(n,i,!1,function(t){a("2q99")},"data-v-05f3f769",null).exports,r={name:"backTop",components:{fade:o},data:function(){return{show:!1,backTopStatus:!1}},methods:{back:function(){var t=setInterval(function(){var e=document.documentElement.scrollTop;if(0!==e){var a=Math.floor(-e/6);document.documentElement.scrollTop=e+a}else clearInterval(t)},25)}},mounted:function(){var t=this,e=document.documentElement;window.addEventListener("scroll",function(){e.scrollTop>=e.clientHeight?t.backTopStatus=!0:t.backTopStatus=!1})}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("fade",{attrs:{status:this.backTopStatus}},[e("div",{staticClass:"center back-top",on:{click:this.back}},[e("div",{staticClass:"arrow-top"})])])},staticRenderFns:[]};var c=a("VU/8")(r,l,!1,function(t){a("ncLK")},"data-v-086ef9d6",null).exports,d=a("mtWM"),u=a.n(d),v=a("mw3O"),p=a.n(v),h=new s.a,f={path:"http://10.21.40.40/xili/Memory_word/static/php",popup:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";alert(t)},getCode:function(t){switch(t){case 4001:this.popup("参数为空");break;case 4002:this.popup("参数错误");break;case 4003:this.popup("数据重复");break;case 4004:this.popup("数据不存在")}}},m={name:"heads",data:function(){return{active:null,menu:[{name:"全部单词",href:"/home",icon:"",active:!1},{name:"查看试卷",href:"/test",icon:"",active:!1}],user:null,userKey:null}},created:function(){var t=this,e=this.$route.query.key;this.userKey=e,e&&u()({url:f.path+"/userss.php?key="+e,method:"get"}).then(function(e){var a=e.data;200===e.status&&a&&(e.data._level=null,t.user=e.data,h.$emit("sendUser",a.userID),u()({url:f.path+"/add_user.php",method:"post",data:p.a.stringify({name:a.name,star_id:a.userID,level:a.level})}).then(function(e){var a=e.data;200===e.status&&a.code/1==4e3&&(t.user._level=a.data.level,h.$emit("userInfo",t.user),t.$store.commit("getUser",t.user))}).catch(function(t){console.log(t)}))}).catch(function(t){console.log(t)})},computed:{currentRouter:function(){var t=this.menu,e=this.$route;return t.findIndex(function(t){return t.href===e.path.toLowerCase()})}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"fade"}},[a("div",{staticClass:"head"},[a("div",{staticClass:"h-content"},[a("router-link",{staticClass:"center title-main h-logo",attrs:{tag:"div",to:"/"}}),t._v(" "),a("ul",{staticClass:"h-menu"},t._l(t.menu,function(e,s){return a("router-link",{key:s,staticClass:"center",class:[t.currentRouter===s?"active":""],attrs:{to:{path:e.href,query:{key:t.userKey}},tag:"li"}},[t._v("\n          "+t._s(e.name)+"\n        ")])}),1),t._v(" "),t.user&&"{}"!==JSON.stringify(t.user)?a("div",{staticClass:"center h-user"},[a("router-link",{staticClass:"center username",attrs:{to:t.user&&t.user._level/1==0?{path:"/userCenter",query:{key:t.userKey}}:{paty:"",query:{key:t.userKey}},tag:"a"}},[a("img",{attrs:{src:"http://10.21.40.40/star2/"+t.user.image,alt:"userImg"}}),t._v(" "),a("span",[t._v(t._s(t.user.name))])])],1):t._e()],1)])])},staticRenderFns:[]};var g=a("VU/8")(m,_,!1,function(t){a("r3On")},"data-v-74ebee77",null).exports,C={name:"App",components:{backTop:c,heads:g}},w={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("heads",{directives:[{name:"show",rawName:"v-show",value:"testprint"!==this.$route.name,expression:"this.$route.name !== 'testprint'"}],attrs:{active:-1}}),this._v(" "),e("backTop"),this._v(" "),e("div",{staticClass:"main-wrap"},[e("div",{staticClass:"main-content"},[e("transition",{attrs:{name:"fade",mode:"out-in"}},[e("router-view")],1)],1)])],1)},staticRenderFns:[]};var y=a("VU/8")(C,w,!1,function(t){a("BSZ6")},null,null).exports,b=a("/ocq"),x=a("Gu7T"),T=a.n(x),k={props:{item:{type:Object,required:!0},directory:{type:Number,default:null}},name:"word",methods:{playSound:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";this.$emit("sendAudioUrl","https://fanyi.baidu.com/gettts?lan="+e+"&text="+t+"&spd=3&source=web")}},mounted:function(){}},$={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("div",{staticClass:"flex word title"},[t.directory?a("span",[t._v(t._s(t.directory.toString().padStart(2,"0")+". "+t.item.word))]):a("span",[t._v(t._s(t.item.word))]),t._v(" "),a("div",{staticClass:"ph-icon",on:{click:function(e){return t.playSound(t.item.word)}}})]),t._v(" "),t.item.ph_en||t.item.ph_am?a("div",{staticClass:"audio"},[a("div",{staticClass:"ph"},[a("span",[t._v("英")]),t._v(" "),t.item.ph_en?a("div",{staticClass:"en"},[t._v("["+t._s(t.item.ph_en)+"]")]):t._e(),t._v(" "),a("div",{staticClass:"ph-icon",on:{click:function(e){return t.playSound(t.item.word,"uk")}}})]),t._v(" "),a("div",{staticClass:"ph"},[a("span",[t._v("美")]),t._v(" "),t.item.ph_am?a("div",{staticClass:"am"},[t._v("["+t._s(t.item.ph_am)+"]")]):t._e(),t._v(" "),a("div",{staticClass:"ph-icon",on:{click:function(e){return t.playSound(t.item.word)}}})])]):t._e(),t._v(" "),a("ul",{staticClass:"cn-list"},t._l(t.item.word_json,function(e,s){return a("li",{key:s},[a("div",{staticClass:"cn-item"},[a("span",{staticClass:"cn-part"},[t._v(t._s(e.part))]),t._v(" "),t._l(e.means,function(e){return a("span",{key:e,staticClass:"cn-means"},[t._v(" "+t._s(e)+" ")])})],2)])}),0)])},staticRenderFns:[]};var S=a("VU/8")(k,$,!1,function(t){a("uEv2")},"data-v-5da96eca",null).exports,U={name:"wordAudio",props:{path:{type:String,default:null}},mounted:function(){var t=this,e=this.$refs.audio;e.addEventListener("play",function(){console.log("开始播放")}),e.addEventListener("ended",function(){console.log("播放结束"),t.$emit("sendRequireClearUrl")})}},W={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"word-audio"},[e("audio",{ref:"audio",staticClass:"hide",attrs:{src:this.path,controls:"",autoplay:""}})])},staticRenderFns:[]};var E=a("VU/8")(U,W,!1,function(t){a("vCQZ")},"data-v-5d574834",null).exports,F={name:"home",components:{heads:g,word:S,wordAudio:E},data:function(){return{showWord:null,showIndex:0,wordHeight:[],firstLetter:{},audioPath:null}},beforeMount:function(){var t=this;u()({url:f.path+"/manage_word.php",method:"get"}).then(function(e){var a=e.data;if(200===e.status&&4e3===a.code){for(var s=a.data.length,n={},i=0;i<s;i++){a.data[i].word_json=JSON.parse(a.data[i].explanation);var o=a.data[i].word.slice(0,1).toUpperCase();n[o]?n[o].push(a.data[i]):n[o]=[a.data[i]]}n["#"]=a.data;var r=[];for(var l in n)r.push(l);for(var c=r.sort(),d={},u=0;u<c.length;u++)d[c[u]]=n[c[u]];t.firstLetter=d,t.showWord=d["#"],t.changeLayout()}})},methods:{changeLayout:function(){var t=this;this.$nextTick(function(){for(var e=t.$refs.wordItem,a=t.showWord.length,s=0,n=0;n<a;n++){s>=4&&(s=0);var i=e[n].offsetWidth,o=e[n].offsetHeight;if(n<4)t.$set(t.showWord[n],"x",i*s+25*s),t.$set(t.showWord[n],"y",0),t.wordHeight.push(o);else{var r=Math.min.apply(Math,T()(t.wordHeight)),l=t.wordHeight.indexOf(r);t.$set(t.showWord[n],"x",i*l+25*l),t.$set(t.showWord[n],"y",t.wordHeight[l]+25),t.wordHeight[l]+=o+25}s++}})},showCurrent:function(t,e){this.showIndex=t,this.showWord=this.firstLetter[e],this.wordHeight=[],this.changeLayout()},getAudioUrl:function(t){this.audioPath=t},clearUrl:function(){this.audioPath=null}}},A={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("div",{staticClass:"h-content"},[a("word-audio",{attrs:{path:t.audioPath},on:{sendRequireClearUrl:t.clearUrl}}),t._v(" "),"{}"!==JSON.stringify(t.firstLetter)?a("ul",{staticClass:"h-classify"},t._l(t.firstLetter,function(e,s,n){return a("li",{key:n,class:[t.showIndex===n?"current":""],on:{click:function(e){return t.showCurrent(n,s)}}},[t._v("\n        "+t._s(s)+"\n      ")])}),0):t._e(),t._v(" "),t.showWord?a("ul",{staticClass:"word-list"},t._l(t.showWord,function(e,s){return a("li",{key:s,ref:"wordItem",refInFor:!0,style:{left:(e.x?e.x:0)+"px",top:(e.y?e.y:0)+"px"}},[a("word",{attrs:{item:e},on:{sendAudioUrl:t.getAudioUrl}})],1)}),0):t._e()],1)])},staticRenderFns:[]};var L=a("VU/8")(F,A,!1,function(t){a("qd0H")},"data-v-600725ad",null).exports,R={name:"repeat-select",props:{data:{type:Array,default:function(){return[{id:0,val:"项目1",label:"提示1"},{id:1,val:"项目2",label:"提示2"},{id:2,val:"项目3",label:"提示3"},{id:3,val:"项目4",label:"提示4"},{id:4,val:"项目5",label:"提示5"},{id:5,val:"项目6",label:"提示6"}]}},empty:{type:Boolean,default:!1},setVal:{type:[Object,String],required:!0},placeholder:{type:String,default:"请选择"},default:{type:Number}},model:{prop:"setVal",event:"change"},components:{fade:o},data:function(){return{status:!1,value:{},color:{color:"#1e90ff"},rotate:{transform:"rotate(180deg)"}}},created:function(){var t=this.data[this.default];void 0!==t&&(this.value=t,this.$emit("change",t))},methods:{focus:function(){this.status=!0},blur:function(){var t=this;setTimeout(function(){t.status=!1},100)},getValue:function(t){console.log(1),this.value=t,this.$emit("change",t)},remove:function(){this.value={},this.$emit("change","")},test:function(){}}},q={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"select-main",on:{click:t.test}},[a("div",{staticClass:"s-enter"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.value.val,expression:"value.val"}],staticClass:"select",attrs:{type:"text",readonly:"",placeholder:t.placeholder},domProps:{value:t.value.val},on:{focus:t.focus,blur:t.blur,input:function(e){e.target.composing||t.$set(t.value,"val",e.target.value)}}}),t._v(" "),t.empty?a("div",{staticClass:"iconfont s-close closed",on:{click:t.remove}},[t._v("")]):t._e(),t._v(" "),a("div",{staticClass:"iconfont s-close direction-down",style:[t.status?t.rotate:""]},[t._v("")])]),t._v(" "),a("fade",{attrs:{status:t.status}},[a("ul",{staticClass:"r-s-list"},t._l(t.data,function(e){return a("li",{key:e.id.id,style:[e.id===t.value.id?t.color:""],on:{click:function(a){return t.getValue(e)}}},[a("span",[t._v(t._s(e.val))]),t._v(" "),e.label?a("span",{staticClass:"r-s-label"},[t._v(t._s(e.label))]):t._e()])}),0)])],1)},staticRenderFns:[]};var I=a("VU/8")(R,q,!1,function(t){a("HXSp")},"data-v-8c5b2776",null).exports,V={props:{status:{type:Boolean,default:!1},title:{type:String,default:"默认标题"}},name:"popup",components:{Fade:o},methods:{close:function(){this.$emit("closed",!1)}}},M={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Fade",{attrs:{status:t.status}},[a("div",{staticClass:"center popup-bg"},[a("div",{staticClass:"popup"},[a("div",{staticClass:"p-content"},[a("div",{staticClass:"iconfont close",on:{click:t.close}},[t._v("")]),t._v(" "),a("h3",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),a("div",{staticClass:"p-slot"},[t._t("default")],2)])])])])},staticRenderFns:[]};var N=a("VU/8")(V,M,!1,function(t){a("nDyN")},"data-v-c74d43b6",null).exports,P={name:"test",components:{repeatSelect:I,popup:N},data:function(){return{user:null,newTestStatus:!1,newTest:{title:"",number:""},numberList:[{id:"0",val:"40"},{id:"1",val:"50"},{id:"2",val:"60"},{id:"3",val:"70"},{id:"4",val:"80"},{id:"5",val:"90"},{id:"6",val:"100"}],classifyList:null,allTest:null}},created:function(){var t=this;h.$on("sendUser",function(e){u()({methdo:"get",url:f.path+"/query_user.php?id="+e}).then(function(e){var a=e.data;200===e.status&&4e3===a.code?t.user=a.data:f.getCode(a.code)})}),this.getAllTest()},beforeDestroy:function(){h.$off("sendUser")},methods:{getAllTest:function(){var t=this;u()({method:"get",url:f.path+"/get_all_test.php"}).then(function(e){var a=e.data;200===e.status&&a.code/1==4e3?t.allTest=a.data:f.getCode(a.code)})}}},O={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"test"},[a("div",{staticClass:"t-content"},[t._m(0),t._v(" "),t.allTest&&t.allTest.length?a("ul",{staticClass:"list-content t-list"},t._l(t.allTest,function(e,s){return a("li",{key:e.id||s},[a("div",{staticClass:"t-position"},[t._v(t._s(t.allTest.length-s))]),t._v(" "),a("div",{staticClass:"t-title"},[t._v(t._s(e.title))]),t._v(" "),a("div",{staticClass:"t-number"},[t._v(t._s(e.number))]),t._v(" "),a("div",{staticClass:"t-status"},[t._v(t._s(e.status/1?"已结束":"进行中"))]),t._v(" "),a("div",{staticClass:"t-time"},[t._v(t._s(e.time))]),t._v(" "),a("div",{staticClass:"t-operation"},[e.status/1==1?a("router-link",{staticClass:"select",attrs:{to:{path:"userCenter/testPrint",query:{id:e.id}}}},[t._v("查看答案")]):a("div",{staticClass:"select nodrop"},[t._v("查看答案")])],1)])}),0):t._e()])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"list-head t-list-head"},[a("div",{staticClass:"t-position"},[t._v("Position")]),t._v(" "),a("div",{staticClass:"t-title"},[t._v("Title")]),t._v(" "),a("div",{staticClass:"t-number"},[t._v("Number")]),t._v(" "),a("div",{staticClass:"t-status"},[t._v("Status")]),t._v(" "),a("div",{staticClass:"t-time"},[t._v("Time")]),t._v(" "),a("div",{staticClass:"t-operation"},[t._v("Operation")])])}]};var H=a("VU/8")(P,O,!1,function(t){a("CC1e")},"data-v-ba6900ca",null).exports,D={name:"translation",data:function(){return{getWord:"",enterFlag:!0,word:null,starId:null,audioUrl:null}},components:{word:S,wordAudio:E},created:function(){var t=this;h.$on("sendUser",function(e){t.starId=e,console.log(e)})},methods:{change:function(){var t=this;this.enterFlag&&""!==this.getWord?(this.enterFlag=!1,setTimeout(function(){u()({url:f.path+"/translation.php?word="+t.getWord,method:"get"}).then(function(e){if(200===e.status&&e.data.code/1==4e3){var a=e.data;if(a.data.content.error_code);else{if(!a.data.status){var s=a.data.content.word_mean;delete a.data.content.word_mean,a.data.content.word_json=s}t.word=a.data}}}).catch(function(t){console.log(t)}),t.enterFlag=!0},500)):this.word=null},addWord:function(){var t=this.word,e=this.starId;t&&e?(t.content.star_id=e,u()({url:f.path+"/add_word.php",method:"post",data:p.a.stringify({word:t.content})}).then(function(t){var e=t.data;200===t.status&&e.code/1==4e3&&0!==e.message.length&&f.popup(e.message),f.getCode(e.code)}).catch(function(t){console.log(t)})):f.popup("单词是空的")},getAudioUrl:function(t){this.audioUrl=t},getClearUrl:function(){this.audioUrl=null}}},j={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"translaiton"},[a("div",{staticClass:"tl-content"},[a("div",{staticClass:"tl-operation"},[a("button",{staticClass:"btns-main tl-translation",on:{click:t.change}},[t._v("翻译")])]),t._v(" "),a("div",{staticClass:"tl-area"},[a("div",{staticClass:"tl-enter"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.getWord,expression:"getWord"}],attrs:{placeholder:"请输入要翻译的内容 中 <=> 英"},domProps:{value:t.getWord},on:{input:[function(e){e.target.composing||(t.getWord=e.target.value)},t.change]}})]),t._v(" "),a("div",{staticClass:"tl-result"},[t.word&&t.word.status/1==0?a("div",{staticClass:"tl-r-c"},[a("word",{attrs:{item:t.word.content},on:{sendAudioUrl:t.getAudioUrl}}),t._v(" "),a("word-audio",{attrs:{path:t.audioUrl},on:{sendRequireClearUrl:t.getClearUrl}}),t._v(" "),a("div",{staticClass:"btns-main tl-btn",on:{click:t.addWord}},[t._v("添加到单词库")])],1):t.word?a("div",{staticClass:"tl-r-c"},[t._v("\n          "+t._s(t.word.content.out)+"\n        ")]):t._e()])])])])},staticRenderFns:[]};var K=a("VU/8")(D,j,!1,function(t){a("fODS")},"data-v-53bc212b",null).exports,J={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"u-list"},t._l(t.menu,function(e,s){return a("router-link",{key:e.id||s,class:[t.currentRouter===s?"active":""],attrs:{to:{path:e.path,query:{key:t.userKey}},tag:"li"}},[a("span",{staticClass:"iconfont menu-content",domProps:{innerHTML:t._s(e.icon)}}),t._v(" "),a("span",[t._v(t._s(e.content))])])}),1)},staticRenderFns:[]};var B={name:"userCenter",components:{usermenu:a("VU/8")({name:"userMenu",data:function(){return{menu:[{id:0,content:"试卷管理",path:"/usercenter/testmanage",icon:"&#xe6ca;",active:!1},{id:1,content:"单词管理",path:"/usercenter/wordManage",icon:"&#xe624;",active:!0},{id:2,content:"分类管理",path:"/usercenter/classifyManage",icon:"&#xe600;",active:!1}],userKey:null}},computed:{currentRouter:function(){var t=this.menu,e=this.$route;return t.findIndex(function(t){return t.path.toLowerCase()===e.path.toLowerCase()})}},created:function(){this.userKey=this.$route.query.key}},J,!1,function(t){a("gdrb")},"data-v-d1cddbd6",null).exports},beforeCreate:function(){var t=this.$store.user;t&&t._level/1&&this.$router.push("/")}},Q={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"user-center"},[e("div",{directives:[{name:"show",rawName:"v-show",value:"testprint"!==this.$route.name,expression:"this.$route.name !== 'testprint'"}],staticClass:"user-menu"},[e("usermenu",{attrs:{active:9999}})],1),this._v(" "),e("div",{staticClass:"user-content"},[e("transition",{attrs:{name:"fade",mode:"out-in"}},[e("router-view")],1)],1)])},staticRenderFns:[]};var Z=a("VU/8")(B,Q,!1,function(t){a("W+TS")},"data-v-aa8cd142",null).exports,G={name:"testPrint",components:{word:S,wordAudio:E},data:function(){return{word:null,audioPath:null}},mounted:function(){this.getWord()},methods:{getWord:function(){var t=this,e=this.$route.query.id;u()({method:"get",url:f.path+"/get_print_word.php?tid="+e}).then(function(e){var a=e.data;if(200===e.status&&a.code/1==4e3){var s=a.data;s.status/1==1&&s.test.map(function(t){return t.word_json=JSON.parse(t.explanation),t}),console.log(s),t.word=s}else f.getCode(a.code)})},getAudioUrl:function(t){this.audioPath=t},clearUrl:function(){this.audioPath=null}}},Y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return null!==t.word?a("div",{class:["t-print",t.word&&t.word.status/1==1?"answer-warp":""]},[a("h3",{staticClass:"title-24"},[t._v(t._s(t.word.title)+" "),a("span",[t._v(t._s(t.word.time))])]),t._v(" "),a("word-audio",{attrs:{path:t.audioPath},on:{sendRequireClearUrl:t.clearUrl}}),t._v(" "),t.word.status/1==0?a("ul",{staticClass:"word-list"},t._l(t.word.test,function(e,s){return a("li",{key:s},[a("div",[t._v(t._s((s+1).toString().padStart(2,"0")+". "+e))]),t._v(" "),a("div",{staticClass:"answer-content"})])}),0):a("ul",{staticClass:"answer-list"},t._l(t.word.test,function(e,s){return a("li",{key:e.id||s},[a("word",{attrs:{item:e,directory:s+1},on:{sendAudioUrl:t.getAudioUrl}})],1)}),0)],1):t._e()},staticRenderFns:[]};var X=a("VU/8")(G,Y,!1,function(t){a("dVyE")},"data-v-349e7400",null).exports,z={props:{visility:{type:Boolean,required:!0}},name:"loading",components:{fade:o}},tt={render:function(){var t=this.$createElement,e=this._self._c||t;return e("fade",{attrs:{status:this.visility}},[e("div",{staticClass:"center loading-bg"},[e("svg",{staticClass:"load-wrap",attrs:{viewBox:"-5 -5 60 60"}},[e("circle",{staticClass:"loading",attrs:{cx:"25",cy:"25",r:"25"}})])])])},staticRenderFns:[]};var et={name:"wordManage",components:{Fade:o,loading:a("VU/8")(z,tt,!1,function(t){a("tS31")},"data-v-1c0a0806",null).exports,popup:N,repeatSelect:I},data:function(){return{defaultActive:0,word:null,changeIndex:null,currentWord:null,file:null,loading:!1,popupStatus:!1,classifyList:null,currentClassify:"",formData:null}},created:function(){var t=this;this.getAllWord(),u()({mehtod:"get",url:f.path+"/get_test_type.php"}).then(function(e){var a=e.data;if(200===e.status&&a.code/1==4e3){var s=a.data;t.classifyList=s.map(function(t){return{id:t.id,val:t.type_name,lebal:t.num}})}else f.popup(a.code)})},methods:{openWindow:function(t,e){t!==this.changeIndex?(this.currentWord=e,this.changeIndex=t):this.changeIndex=-1},changeComment:function(t){var e=this.word[t],a=e.id,s=e.explanation;u()({method:"post",url:f.path+"/manage_word.php",data:p.a.stringify({type:"update",id:a,explanation:s})}).then(function(t){var e=t.data;200===t.status&&4e3===e.code?f.popup("change success"):f.getCode(e.code)}).catch(function(t){return console.log(t)})},getAllWord:function(){var t=this;u()({methods:"get",url:f.path+"/manage_word.php"}).then(function(e){var a=e.data;200===e.status&&a.code/1==4e3&&(a.data=a.data.map(function(t){return t.explanation=JSON.parse(t.explanation),t}),t.word=a.data)}).catch(function(t){console.log(t)})},addWordFile:function(t){var e=this,a=t.target.files[0];if(a&&-1===a.type.indexOf("json"))alert("非txt文件");else{var s=new FileReader;s.readAsText(a,"gb2312"),s.onload=function(t){var s=new FormData;s.append("file",a),e.formData=s}}},deleteWord:function(t,e){var a=this;confirm("是否删除单词")&&u()({method:"post",url:f.path+"/manage_word.php",data:p.a.stringify({type:"remove",id:t})}).then(function(t){var s=t.data;200===t.status&&s.code/1==4e3?(a.word.splice(e,1),a.currentWord=null,a.changeIndex=null):f.getCode(s.code)})},changeStatus:function(){this.currentClassify="",this.popupStatus=!this.popupStatus},submitFile:function(){var t=this;if(this.currentClassify&&this.formData){var e=setTimeout(function(){t.loading=!0},300);this.changeStatus(),u()({method:"post",url:f.path+"/get_word_file.php",data:this.formData}).then(function(a){var s=a.data;200===a.status&&s.code/1==4e3&&(t.formData=null,t.getAllWord(),clearTimeout(e),t.loading=!1),f.getCode(s.code)})}else alert("参数为空")}}},at={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-center"},[a("loading",{attrs:{visility:t.loading}}),t._v(" "),a("div",{staticClass:"u-content"},[a("popup",{attrs:{status:t.popupStatus,title:"添加单词"},on:{closed:t.changeStatus}},[a("div",{staticClass:"word-file"},[a("repeatSelect",{attrs:{empty:!0,data:t.classifyList,placeholder:"请选择分类"},model:{value:t.currentClassify,callback:function(e){t.currentClassify=e},expression:"currentClassify"}}),t._v(" "),a("label",{staticClass:"iconfont btns-main",attrs:{for:"word"}},[t._v(" "),a("span",[t._v("上传文件")])]),t._v(" "),a("input",{ref:"wordFile",staticClass:"hide",attrs:{type:"file",id:"word"},on:{change:t.addWordFile}})],1),t._v(" "),a("button",{staticClass:"btns-main",on:{click:t.submitFile}},[t._v("Submit")])]),t._v(" "),0===t.defaultActive?a("div",{staticClass:"u-list-content"},[a("div",{staticClass:"justify"},[a("h3",{staticClass:"title"},[t._v("单词管理")]),t._v(" "),a("button",{staticClass:"btns-main",on:{click:t.changeStatus}},[t._v("添加单词")])]),t._v(" "),t._m(0),t._v(" "),a("ul",{staticClass:"list-content u-c-list"},t._l(t.word,function(e,s){return a("li",{key:e.id||s},[a("div",{staticClass:"u-list-word"},[a("div",{staticClass:"position"},[t._v(t._s(s+1))]),t._v(" "),a("div",{staticClass:"word"},[s!==t.changeIndex?a("input",{directives:[{name:"model",rawName:"v-model",value:t.word[s].word,expression:"word[index].word"}],attrs:{type:"text",readonly:""},domProps:{value:t.word[s].word},on:{input:function(e){e.target.composing||t.$set(t.word[s],"word",e.target.value)}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.word[s].word,expression:"word[index].word"}],attrs:{type:"text"},domProps:{value:t.word[s].word},on:{input:function(e){e.target.composing||t.$set(t.word[s],"word",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"ph_en"},[t._v(t._s(e.ph_en))]),t._v(" "),a("div",{staticClass:"ph_an"},[t._v(t._s(e.ph_am))]),t._v(" "),a("div",{staticClass:"time"},[t._v(t._s(e.time))]),t._v(" "),a("div",{staticClass:"iconfont operation",on:{click:function(a){return t.openWindow(s,e.explanation)}}},[t._v("")])]),t._v(" "),t.changeIndex===s?a("div",{staticClass:"word-explanation"},[a("div",{staticClass:"explanation"},t._l(e.explanation,function(e,n){return a("div",{key:n,staticClass:"explanation-wrap"},[a("div",{staticClass:"explanation-content"},[a("div",{staticClass:"explanation-key"},[t._v(t._s(e.part))]),t._v(" "),t._l(e.means,function(e,i){return a("input",{directives:[{name:"model",rawName:"v-model",value:t.word[s].explanation[n].means[i],expression:"word[index].explanation[_index].means[__index]"}],key:e||i,attrs:{type:"text"},domProps:{value:t.word[s].explanation[n].means[i]},on:{input:function(e){e.target.composing||t.$set(t.word[s].explanation[n].means,i,e.target.value)}}})})],2)])}),0),t._v(" "),a("div",{staticClass:"iconfont more-operation"},[a("div",{staticClass:"btns-danger",on:{click:function(a){return t.deleteWord(e.id,s)}}},[t._v("")]),t._v(" "),a("div",{staticClass:"btns-main",on:{click:function(e){return t.changeComment(s)}}},[t._v("")])])]):t._e()])}),0)]):t._e()],1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"list-head u-list-word u-list-head"},[a("div",{staticClass:"position"},[t._v("序号")]),t._v(" "),a("div",{staticClass:"word"},[t._v("单词")]),t._v(" "),a("div",{staticClass:"ph_en"},[t._v("音标英式")]),t._v(" "),a("div",{staticClass:"ph_an"},[t._v("音标美式")]),t._v(" "),a("div",{staticClass:"time"},[t._v("添加时间")]),t._v(" "),a("div",{staticClass:"operation"},[t._v("操作")])])}]};var st=a("VU/8")(et,at,!1,function(t){a("62SD")},"data-v-ee813f5a",null).exports,nt={name:"testManage",components:{repeatSelect:I,popup:N},data:function(){return{user:null,allTest:null,newTestStatus:!1,newTest:{title:"",number:"",mode:""},classifyList:null,numberList:[{id:"0",val:"40"},{id:"1",val:"50"},{id:"2",val:"60"},{id:"3",val:"70"},{id:"4",val:"80"},{id:"5",val:"90"},{id:"6",val:"100"},{id:"6",val:"120"},{id:"6",val:"140"},{id:"6",val:"160"},{id:"6",val:"180"},{id:"6",val:"200"}],testMode:[{id:"0",val:"英文"},{id:"1",val:"中文"},{id:"2",val:"中英"}]}},beforeMount:function(){this.getTestType(),this.getAllTest()},methods:{getAllTest:function(){var t=this;u()({method:"get",url:f.path+"/get_all_test.php"}).then(function(e){var a=e.data;200===e.status&&a.code/1==4e3?t.allTest=a.data:f.getCode(a.code)})},closed:function(t){this.newTestStatus=!this.newTestStatus},change:function(){this.newTestStatus=!this.newTestStatus,this.newTest.title="",this.newTest.number=""},getTestType:function(){var t=this;u()({mehtod:"get",url:f.path+"/get_test_type.php"}).then(function(e){var a=e.data;if(200===e.status&&a.code/1==4e3){var s=a.data;t.classifyList=s.map(function(t){return{id:t.id,val:t.type_name,lebal:t.num}})}else f.popup(a.code)})},submitTest:function(){var t=this,e=this.newTest;""!==e.title&&""!==e.number&&""!==e.mode?u()({method:"post",url:f.path+"/add_test.php",data:p.a.stringify({class_id:e.title.id,number:e.number.val,mode:e.mode.id})}).then(function(e){var a=e.data;200===e.status&&4e3===a.code?(f.popup(a.message),t.newTestStatus=!t.newTestStatus,t.getAllTest()):f.getCode(a.code)}):f.popup("参数为空")},outTest:function(t,e){var a=this;u()({method:"post",url:f.path+"/out_test.php",data:p.a.stringify({id:t})}).then(function(t){var s=t.data;200===t.status&&s.code/1==4e3&&(a.allTest[e].status=1)}).catch(function(t){console.log(t)})}}},it={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"word-manage"},[a("div",{staticClass:"test-manage"},[a("div",{staticClass:"all-test"},[a("div",{staticClass:"justify t-head"},[a("h3",{staticClass:"title"},[t._v("试卷管理")]),t._v(" "),a("div",{staticClass:"btns-main",on:{click:t.change}},[t._v("添加试卷")])]),t._v(" "),t._m(0),t._v(" "),t.allTest&&t.allTest.length?a("ul",{staticClass:"list-content t-list"},t._l(t.allTest,function(e,s){return a("li",{key:e.id||s},[a("div",{staticClass:"t-position"},[t._v(t._s(t.allTest.length-s))]),t._v(" "),a("div",{staticClass:"t-title"},[t._v(t._s(e.title))]),t._v(" "),a("div",{staticClass:"t-number"},[t._v(t._s(e.number))]),t._v(" "),a("div",{staticClass:"t-status"},[t._v(t._s(e.status/1?"已结束":"进行中"))]),t._v(" "),a("div",{staticClass:"t-time"},[t._v(t._s(e.time))]),t._v(" "),t.user&&t.user.level/1!=0?a("div",{staticClass:"t-operation"},[e.status/1==1?a("router-link",{staticClass:"select",attrs:{to:{path:"TestPrint",query:{id:e.id}}}},[t._v("查看答案")]):a("div",{staticClass:"select"},[t._v("查看答案")])],1):a("div",{staticClass:"t-operation"},[a("router-link",{staticClass:"select",attrs:{to:{path:"TestPrint",query:{id:e.id}}}},[t._v(t._s(e.status/1?"答案":"打印"))]),t._v(" "),e.status/1?a("div",{staticClass:"select nodrop"},[t._v("出卷")]):a("div",{staticClass:"select",on:{click:function(a){return t.outTest(e.id,s)}}},[t._v("出卷")])],1)])}),0):t._e()])]),t._v(" "),a("popup",{attrs:{status:t.newTestStatus,title:"添加试卷"},on:{closed:t.closed}},[a("div",{staticClass:"t-test-bg"},[a("div",{staticClass:"t-enter"},[a("repeat-select",{attrs:{empty:!0,data:t.classifyList,placeholder:"请选择分类"},model:{value:t.newTest.title,callback:function(e){t.$set(t.newTest,"title",e)},expression:"newTest.title"}}),t._v(" "),a("repeat-select",{attrs:{empty:!0,data:t.numberList,placeholder:"请选择数量"},model:{value:t.newTest.number,callback:function(e){t.$set(t.newTest,"number",e)},expression:"newTest.number"}}),t._v(" "),a("repeat-select",{attrs:{empty:!0,data:t.testMode,placeholder:"请选择模式",default:0},model:{value:t.newTest.mode,callback:function(e){t.$set(t.newTest,"mode",e)},expression:"newTest.mode"}}),t._v(" "),a("button",{staticClass:"btns-main",on:{click:t.submitTest}},[t._v("添加")])],1)])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"list-head t-list-head"},[a("li",[a("div",{staticClass:"t-position"},[t._v("序号")]),t._v(" "),a("div",{staticClass:"t-title"},[t._v("标题")]),t._v(" "),a("div",{staticClass:"t-number"},[t._v("数量")]),t._v(" "),a("div",{staticClass:"t-status"},[t._v("状态")]),t._v(" "),a("div",{staticClass:"t-time"},[t._v("时间")]),t._v(" "),a("div",{staticClass:"t-operation"},[t._v("操作")])])])}]};var ot=a("VU/8")(nt,it,!1,function(t){a("aKj4")},"data-v-dc525e54",null).exports,rt={name:"classifyManage",data:function(){return{allClassify:null,name:null,status:!1}},components:{popup:N},created:function(){this.getAllClassify()},methods:{toggleWindows:function(){this.status=!this.status},getAllClassify:function(){var t=this;u()({methods:"get",url:f.path+"/get_all_classify.php"}).then(function(e){var a=e.data;200===e.status&&a.code/1==4e3&&(t.allClassify=a.data)}).catch(function(t){console.log(t)})},addClassify:function(){var t=this,e=this.name;e&&e.length>0?u()({method:"post",url:f.path+"/add_classify.php",data:p.a.stringify({name:e})}).then(function(e){var a=e.data;200===e.status&&a.code/1==4e3?(t.name=null,t.status=!1,t.getAllClassify()):f.getCode(a.code)}).catch(function(t){console.log(t)}):f.popup("parameter is empty")},deleteClassify:function(t,e){var a=this;u()({method:"post",url:f.path+"/delete_classify.php",data:p.a.stringify({id:t})}).then(function(t){var s=t.data;console.log(s),200===t.status&&s.code/1==4e3?a.allClassify.splice(e,1):f.getCode(s.code)}).catch(function(t){console.log(t)})}}},lt={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"manage-classify"},[a("div",{staticClass:"classify-wrap"},[a("popup",{attrs:{title:"添加分类",status:t.status},on:{closed:t.toggleWindows}},[a("div",{staticClass:"enter-classify"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"classify-name",attrs:{type:"text",placeholder:"Enter classify name"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t._v(" "),a("div",{staticClass:"btns-main",on:{click:t.addClassify}},[t._v("提交")])])]),t._v(" "),a("div",{staticClass:"classify-content"},[a("div",{staticClass:"justify"},[a("h3",{staticClass:"title"},[t._v("分类管理")]),t._v(" "),a("div",{staticClass:"btns-main",on:{click:t.toggleWindows}},[t._v("添加分类")])]),t._v(" "),t._m(0),t._v(" "),a("ul",{staticClass:"list-content classify-list"},t._l(t.allClassify,function(e,s){return a("li",{key:e.id||s},[a("div",{staticClass:"c-list-position"},[t._v(t._s(s+1))]),t._v(" "),a("div",{staticClass:"c-list-name"},[t._v(t._s(e.type_name))]),t._v(" "),a("div",{staticClass:"c-list-num"},[t._v(t._s(e.num))]),t._v(" "),a("div",{staticClass:"c-list-time"},[t._v(t._s(e.time))]),t._v(" "),a("div",{staticClass:"c-list-operation"},[e.id/1!=1?a("div",{staticClass:"iconfont btn-danger",on:{click:function(a){return t.deleteClassify(e.id,s)}}},[t._v("")]):t._e()])])}),0)])],1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"list-head classify-list-head"},[a("div",{staticClass:"c-list-position"},[t._v("序号")]),t._v(" "),a("div",{staticClass:"c-list-name"},[t._v("分类名称")]),t._v(" "),a("div",{staticClass:"c-list-num"},[t._v("数量")]),t._v(" "),a("div",{staticClass:"c-list-time"},[t._v("时间")]),t._v(" "),a("div",{staticClass:"c-list-operation"},[t._v("操作")])])}]};var ct=a("VU/8")(rt,lt,!1,function(t){a("QiWG")},"data-v-e73f1c5e",null).exports;s.a.use(b.a);var dt=new b.a({routes:[{path:"/",redirect:"/home"},{path:"*",redirect:"/"},{path:"/home",name:"/home",component:L},{path:"/test",name:"test",component:H},{path:"/translation",name:"translation",component:K},{path:"/userCenter",name:"userCenter",component:Z,redirect:"/userCenter/testmanage",children:[{path:"wordManage",name:"wordManage",component:st},{path:"testmanage",name:"testmanage",component:ot},{path:"classifyManage",name:"classifyManage",component:ct},{path:"testprint",name:"testprint",component:X}]}]}),ut=a("NYxO");s.a.use(ut.a);var vt=new ut.a.Store({state:{user:null},getters:{getUser:function(t){return t.user}},mutations:{getUser:function(t,e){t.user=e}}});s.a.config.productionTip=!1,new s.a({el:"#app",router:dt,store:vt,components:{App:y},template:"<App/>"})},QiWG:function(t,e){},"W+TS":function(t,e){},aKj4:function(t,e){},atYJ:function(t,e){},dVyE:function(t,e){},fODS:function(t,e){},gdrb:function(t,e){},nDyN:function(t,e){},ncLK:function(t,e){},qd0H:function(t,e){},r3On:function(t,e){},tS31:function(t,e){},uEv2:function(t,e){},vCQZ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.3a18c80cb1a1492ad207.js.map