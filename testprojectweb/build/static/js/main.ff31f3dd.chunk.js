(this.webpackJsonptestproject=this.webpackJsonptestproject||[]).push([[0],{17:function(t,e,s){},38:function(t,e,s){"use strict";s.r(e);var i=s(1),c=s(3),n=s.n(c),a=s(8),l=s.n(a),h=(s(17),s(10)),j=s(11),r=s(12),d=s(15),b=s(14),o=s(42),O=s(46),x=s(39),u=s(40),p=s(41),m=s(43),f=s(44),g=s(45),v=function(t){Object(d.a)(s,t);var e=Object(b.a)(s);function s(t){var i;return Object(j.a)(this,s),i=e.call(this,t),console.warn("modal"),i.state={image:i.props.image,name:i.props.name,open:i.props.open,title:"",p:null,q:null,w:null,e:null,r:null,stats:null,shouldClose:!1,fetched:!1},i}return Object(r.a)(s,[{key:"getTitle",value:function(){var t=this;console.warn("db req name: "+this.state.name),fetch("http://192.168.0.12:3000/Title/"+this.state.name).then((function(t){return t.json()})).then((function(e){t.setState({title:e[0].title})}))}},{key:"getAbilities",value:function(){var t=this;console.warn("db req abilities: "+this.state.name),fetch("http://192.168.0.12:3000/Ability/"+this.state.name).then((function(t){return t.json()})).then((function(e){t.setState({p:e[1],q:e[2],w:e[4],e:e[0],r:e[3]})}))}},{key:"getStats",value:function(){var t=this;console.warn("db req stats: "+this.state.name),fetch("http://192.168.0.12:3000/Stats/"+this.state.name).then((function(t){return t.json()})).then((function(e){t.setState({stats:e[0]})}))}},{key:"render",value:function(){var t=this;return this.state.image=this.props.image,this.state.name=this.props.name,this.state.open=this.props.open,this.state.shouldClose&&(this.state.open=!1,this.state.shouldClose=!1,this.state.fetched=!1,this.state.title="",this.state.p=null,this.state.q=null,this.state.w=null,this.state.e=null,this.state.r=null,this.state.stats=null,this.props.handleModalChange()),this.state.open?(console.warn("STATE IS OPEN"),""!=this.state.title&&null!=this.state.q&&null!=this.state.stats?(console.warn("SHOULD BE RENDERING"),Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)(O.a,{contentClassName:"customModal",dialogClassName:"customModal",scrollable:!0,isOpen:this.state.open,fade:"false",toggle:function(){return t.setState({shouldClose:!0})},onCloseModal:function(){return t.setState({shouldClose:!0})},children:[Object(i.jsxs)(x.a,{className:"champModal champModalHeader",toggle:function(){return t.setState({shouldClose:!0})},children:[this.state.name,Object(i.jsx)("br",{}),this.state.title]}),Object(i.jsxs)(u.a,{className:"champModal champModalBody",children:[Object(i.jsxs)("table",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("img",{src:this.state.image})}),Object(i.jsxs)("td",{children:[Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"HP"}),Object(i.jsx)("th",{children:"HPR"}),Object(i.jsx)("th",{children:"MP"}),Object(i.jsx)("th",{children:"MPR"}),Object(i.jsx)("th",{children:"MS"}),Object(i.jsx)("th",{children:"AD"}),Object(i.jsx)("th",{children:"AS"}),Object(i.jsx)("th",{children:"RNG"}),Object(i.jsx)("th",{children:"AR"}),Object(i.jsx)("th",{children:"MR"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.HP})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.HPR})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.MP})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.MPR})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.MS})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.AD})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.attackSpeed})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.RNG})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.AR})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.stats.MR})})]})]})]}),Object(i.jsx)("br",{}),Object(i.jsx)("br",{}),Object(i.jsxs)("table",{children:[Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("h1",{children:"Passive"})}),Object(i.jsxs)("td",{children:[Object(i.jsx)("img",{src:this.state.p.abilityFile}),Object(i.jsx)("p",{children:this.state.p.ability})]}),Object(i.jsx)("td",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.p.abilityDescription})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.p.abilityMath})})]})})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("h1",{children:"Q"})}),Object(i.jsxs)("td",{children:[Object(i.jsx)("img",{src:this.state.q.abilityFile}),Object(i.jsx)("p",{children:this.state.q.ability})]}),Object(i.jsx)("td",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.q.abilityDescription})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.q.abilityMath})})]})})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("h1",{children:"W"})}),Object(i.jsxs)("td",{children:[Object(i.jsx)("img",{src:this.state.w.abilityFile}),Object(i.jsx)("p",{children:this.state.w.ability})]}),Object(i.jsx)("td",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.w.abilityDescription})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.w.abilityMath})})]})})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("h1",{children:"E"})}),Object(i.jsxs)("td",{children:[Object(i.jsx)("img",{src:this.state.e.abilityFile}),Object(i.jsx)("p",{children:this.state.e.ability})]}),Object(i.jsx)("td",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.e.abilityDescription})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.e.abilityMath})})]})})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("h1",{children:"R"})}),Object(i.jsxs)("td",{children:[Object(i.jsx)("img",{src:this.state.r.abilityFile}),Object(i.jsx)("p",{children:this.state.r.ability})]}),Object(i.jsx)("td",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.r.abilityDescription})}),Object(i.jsx)("td",{children:Object(i.jsx)("p",{children:this.state.r.abilityMath})})]})})]})]})]}),Object(i.jsx)(p.a,{className:"champModal champModalFooter",children:Object(i.jsx)(o.a,{color:"success",onClick:function(){return t.setState({shouldClose:!0})},children:"Close"})})]})})):(console.warn("something was null, fetched = "+this.state.fetched),this.state.fetched||(this.state.fetched=!0,""==this.state.title&&this.getTitle(),null==this.state.q&&this.getAbilities(),null==this.state.stats&&this.getStats()),null)):(this.state.title="",null)}}]),s}(n.a.Component),y=function(t){Object(d.a)(s,t);var e=Object(b.a)(s);function s(t){var i;Object(j.a)(this,s);var c=(i=e.call(this,t)).props.files,n=i.props.files.length;return i.state={files:c,modalFile:null,modalName:null,showModal:!1,length:n},i.handleClick=i.handleClick.bind(Object(h.a)(i)),i.handleModalChange=i.handleModalChange.bind(Object(h.a)(i)),i}return Object(r.a)(s,[{key:"handleModalChange",value:function(){this.setState({showModal:!1})}},{key:"handleClick",value:function(t){this.setState({modalFile:t,modalName:t.substring(0,t.length-6),showModal:!0})}},{key:"renderImage",value:function(t){var e=this;return Object(i.jsx)("img",{src:t,className:"homepageIcon",onClick:function(){return e.handleClick(t)}})}},{key:"render",value:function(){var t,e=[],s=[];for(t=0;t<this.state.length;t++){var c=this.props.search;this.state.files[t].fileName.substring(0,this.state.files[t].fileName.length-6).indexOf(c)>=0&&s.push(Object(i.jsx)(m.a,{children:Object(i.jsxs)("center",{children:[Object(i.jsx)("h2",{children:this.state.files[t].fileName.substring(0,this.state.files[t].fileName.length-6)}),this.renderImage(this.state.files[t].fileName)]})})),(t+1)%6!=0&&t!=this.state.length-1||0==t||(e.push(Object(i.jsx)(f.a,{children:s})),s=[])}return Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{children:Object(i.jsx)(v,{image:this.state.modalFile,name:this.state.modalName,open:this.state.showModal,handleModalChange:this.handleModalChange})}),Object(i.jsx)("div",{children:e})]})}}]),s}(n.a.Component),M=function(t){Object(d.a)(s,t);var e=Object(b.a)(s);function s(t){var i;return Object(j.a)(this,s),(i=e.call(this,t)).state={files:[],index:0,search:""},i}return Object(r.a)(s,[{key:"componentDidMount",value:function(){var t=this;console.warn("mount?"),fetch("http://192.168.0.12:3000/fileNames").then((function(t){return t.json()})).then((function(e){t.setState({files:e})}))}},{key:"searchSpace",value:function(t){var e=t.target.value;this.setState({search:e})}},{key:"render",value:function(){var t=this;return this.state.files.length>0?Object(i.jsx)("div",{children:Object(i.jsxs)(g.a,{className:"themed-container champ",fluid:!0,children:[Object(i.jsx)("div",{children:Object(i.jsx)("center",{children:Object(i.jsx)("input",{type:"text",placeholder:"Enter item to be searched",value:this.state.search,onChange:function(e){return t.searchSpace(e)}})})}),Object(i.jsx)("div",{children:Object(i.jsx)(y,{files:this.state.files,search:this.state.search})})]})}):null}}]),s}(n.a.Component),C=function(t){t&&t instanceof Function&&s.e(3).then(s.bind(null,47)).then((function(e){var s=e.getCLS,i=e.getFID,c=e.getFCP,n=e.getLCP,a=e.getTTFB;s(t),i(t),c(t),n(t),a(t)}))};s(37);l.a.render(Object(i.jsx)(n.a.StrictMode,{children:Object(i.jsx)(M,{})}),document.getElementById("root")),C()}},[[38,1,2]]]);
//# sourceMappingURL=main.ff31f3dd.chunk.js.map