(this["webpackJsonpproduct-cart-new"]=this["webpackJsonpproduct-cart-new"]||[]).push([[0],{159:function(e,t,a){e.exports=a(408)},164:function(e,t,a){e.exports=a(407)},36:function(e,t,a){"use strict";t.a={locale:"ru",localStorage:{name:"cart"}}},37:function(e,t,a){"use strict";var n=a(5),c=[{id:1,category:"phone",name:"iPhone 5SE",price:400,description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",tags:"sale",img:"iphone_5se.jpg"},{id:2,category:"phone",name:"iPhone 6S",price:500,description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",tags:"-15%",img:"iphone_6s.jpg"},{id:3,category:"phone",name:"iPhone 7",price:630,description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",tags:"new",img:"iphone_7.jpg"},{id:4,category:"laptop",name:"MacBook Air",price:1e3,description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",tags:"sale",img:"macbook_air.png"},{id:5,category:"laptop",name:"MacBook Pro",price:1400,description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",tags:"new",img:"macbook_pro.png"}];a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return o})),a.d(t,"a",(function(){return s}));var r="test/product/LOAD_PRODUCTS";function l(){return function(e){return setTimeout((function(){return e({type:r,data:c,receivedAt:Date.now()})}),2e3)}}function o(e){return function(t){return t({type:"test/product/FILTER_PRODUCTS",data:e,receivedAt:Date.now()})}}var i=[];function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r:Object(n.cloneDeep)(e);return localStorage.setItem("initialProducts",JSON.stringify(t.data)),t.data;case"test/product/FILTER_PRODUCTS":Object(n.cloneDeep)(e);return t.data;default:return e}}},4:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return l})),a.d(t,"f",(function(){return i})),a.d(t,"d",(function(){return s})),a.d(t,"e",(function(){return m})),a.d(t,"h",(function(){return u})),a.d(t,"g",(function(){return p}));var n=a(5),c="test/cart/ADD_PRODUCT_TO_CART",r="test/cart/CHANGE_CART_COUNT",l="test/cart/DELETE_CART_ITEM",o="test/cart/CLEAR_CART",i=function(){return{type:o}};function s(e){return function(t){t({type:c,data:e,receivedAt:Date.now()})}}function m(e,t){return function(a){a({type:r,data:{newValue:e,productId:t},receivedAt:Date.now()})}}function u(e){return function(t){t({type:l,data:e,receivedAt:Date.now()})}}var d=[];function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c:var a=Object(n.cloneDeep)(e),i=t.data,s=Object(n.find)(a,{id:i.id});return s?s.count=Number(s.count)+1:(i.count=1,a.push(i)),a;case r:var m=Object(n.cloneDeep)(e),u=t.data,p=Object(n.find)(m,{id:Number(u.productId)});return p&&(p.count=u.newValue),m;case l:var E=Object(n.cloneDeep)(e);return Object(n.filter)(E,(function(e){return e.id!==Number(t.data)}));case o:return d;default:return e}}},406:function(e,t,a){},407:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(51),l=a.n(r),o=a(8),i=a(13),s=a(55),m=a(3),u=a(56),d=a(57),p=a(59),E=a(58),v=a(60),g=a(5),f=a(37),b=a(4),h=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(a=Object(p.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(c)))).addToCart=function(e){var t=a.props,n=t.products;(0,t.addCart)(Object(g.find)(n,{id:e}))},a.filter=function(e){var t=e.target.value,n=a.props.filterProductsFunc,c=JSON.parse(localStorage.getItem("initialProducts")),r=c;c&&c.length&&"all"!==t&&(r=Object(g.filter)(c,{category:t})),n(r)},a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){(0,this.props.getProducts)()}},{key:"render",value:function(){var e=this,t=this.props.products,a=null;return t&&t.length?(a=t.map((function(t){var a=t.id,n=t.name,r=t.img,l=t.description,o=t.tags,i=t.price;return c.a.createElement("div",{className:"col-md-4 col-sm-6 product",key:a},c.a.createElement("div",{className:"main-image"},c.a.createElement("img",{src:"".concat("/product-cart","/img/").concat(r),alt:n})),c.a.createElement("p",{className:"name"},n),c.a.createElement("p",null,l),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-md-6 col-sm-6 tag"},c.a.createElement("span",{className:"label label-tag"},o)),c.a.createElement("div",{className:"col-md-6 col-sm-6 price"},c.a.createElement("span",null,i," $"))),c.a.createElement("button",{className:"btn btn-primary",type:"button",onClick:function(){return e.addToCart(a)}},"Add to cart"))})),c.a.createElement("div",{className:"container-catalog"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12 col-md-12"},c.a.createElement("h3",{className:"text-center"},"Catalog Products"),c.a.createElement("div",{className:"filter text-right"},"Category:\xa0",c.a.createElement("select",{name:"filter",className:"form-control",onChange:this.filter},c.a.createElement("option",{value:"all"},"All"),c.a.createElement("option",{value:"laptop"},"Laptop"),c.a.createElement("option",{value:"phone"},"Phone"))),c.a.createElement("div",{className:"products"},c.a.createElement("div",{className:"row"},a)))))):c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12 col-md-12"},c.a.createElement("h3",{className:"text-center"},"Loading products..."))))}}]),t}(n.Component);h.defaultProps={products:[]};var N={getProducts:f.c,filterProductsFunc:f.b,addCart:b.d},y=Object(i.connect)((function(e){return{products:e.products}}),N)(h),O=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(a=Object(p.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(c)))).onChange=function(e){var t=a.props.dispatch,n=e.target,c=n.value,r=n.dataset.id;t(Object(b.e)(c,r))},a.deleteToCart=function(e){var t=e.target.dataset.id;(0,a.props.dispatch)(Object(b.h)(t))},a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=this.props.cart,a=null,n=0;return t&&t.length?(a=t.map((function(t,a){var r=t.id,l=t.price,o=t.count,i=t.img,s=t.name;return n+=l*o,c.a.createElement("tr",{key:r},c.a.createElement("td",null,c.a.createElement("b",null,a+1)),c.a.createElement("td",null,c.a.createElement("img",{src:"".concat("/product-cart","/img/").concat(i),alt:s})),c.a.createElement("td",null,s),c.a.createElement("td",null,"".concat(l,"$")),c.a.createElement("td",null,c.a.createElement("input",{type:"text",name:"count",className:"form-control","data-id":r,value:o,onChange:e.onChange})),c.a.createElement("td",null,c.a.createElement("button",{className:"btn btn-primary",type:"button","data-id":r,onClick:e.deleteToCart},"Delete")))})),c.a.createElement("div",{className:"container-cart"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12 col-md-12"},c.a.createElement("h3",{className:"text-center"},"Your order"),c.a.createElement("table",{className:"table table-striped table-cart"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"#"),c.a.createElement("th",null,"Image"),c.a.createElement("th",null,"Name"),c.a.createElement("th",null,"Price for one"),c.a.createElement("th",null,"Count"))),c.a.createElement("tbody",null,a,c.a.createElement("tr",null,c.a.createElement("td",{colSpan:"6",className:"text-right"},c.a.createElement("h3",null,"Total price: ",n,"$"))))))))):c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12 col-md-12"},c.a.createElement("h3",{className:"text-center"},"Sorry, your cart is empty"))))}}]),t}(n.Component);O.defaultProps={cart:[]};var C=[{path:"/",component:y,exact:!0},{path:"/cart",component:Object(i.connect)((function(e){return{cart:e.cart}}))(O),exact:!0},{path:"*",component:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"container main-container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-sm-12 col-md-12 text-center"},c.a.createElement("h1",null,"404"),c.a.createElement("h3",{className:"font-bold"},"Page not found")))))},exact:!0}],j=a(163),w=a(28),P={clearCart:b.f},S=Object(i.connect)((function(e){return{cart:e.cart}}),P)((function(e){var t=e.cart,a=e.clearCart,r=Object(n.useState)(!0),l=Object(j.a)(r,2),o=l[0],i=l[1],s=Object(n.useMemo)((function(){return t.reduce((function(e,t){var a=e;return a+=Number(t.count)}),0)}),[t]),m=o?"collapse navbar-collapse":"collapse navbar-collapse show",u=o?"navbar-toggler collapsed":"navbar-toggler";return c.a.createElement("nav",{className:"navbar navbar-expand-sm navbar-light bg-light rounded"},c.a.createElement("div",{className:"container"},c.a.createElement(w.a,{to:"/",className:"navbar-brand"},"ProductsCart"),c.a.createElement("button",{type:"button",onClick:function(){return i(!o)},className:u},c.a.createElement("span",{className:"navbar-toggler-icon"})),c.a.createElement("div",{className:m},c.a.createElement("ul",{className:"navbar-nav mr-auto"},c.a.createElement("li",{className:"nav-item"},c.a.createElement(w.a,{to:"/",onClick:function(){localStorage.clear(),a()},className:"nav-link",activeClassName:"on"},"Clear Cart"))),c.a.createElement("span",{className:"form-inline my-2 my-lg-0"},c.a.createElement("ul",{className:"nav profile-widget"},c.a.createElement("li",null,c.a.createElement(w.a,{to:"/cart",activeClassName:"on",className:"nav-link"},"Cart",s?c.a.createElement("span",{className:"label-cart"},s):null,"\xa0",c.a.createElement("i",{className:"fa fa-shopping-basket"}))))))))})),k=function(){return c.a.createElement("div",{className:"footer"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"pull-left"},c.a.createElement("strong",null,"Copyright")," \xa9 Aleksandr Shtykov")))},D=a(53),T=a(157),A=a.n(T),x=a(158),_=a.n(x),I=(Object(D.createDevTools)(c.a.createElement(_.a,{toggleVisibilityKey:"ctrl-h",changePositionKey:"ctrl-q",defaultIsVisible:!1},c.a.createElement(A.a,{theme:"tomorrow"}))),function(){return c.a.createElement("div",null,c.a.createElement(S,null),c.a.createElement("div",{className:"container main-container"},c.a.createElement(o.c,null,C.map((function(e){var t=e.component,a=e.exact,n=e.path;return c.a.createElement(o.a,{key:n,path:n,exact:a,component:t})})))),c.a.createElement(k,null),!1)}),L=a(36),R=a(159),M=a.n(R),J=localStorage.getItem(L.a.localStorage.name)?JSON.parse(localStorage.getItem(L.a.localStorage.name)):[],U=M()({cart:J.cart||[]}),F=(a(406),Object(m.a)({basename:"/product-cart"}));l.a.render(c.a.createElement(i.Provider,{store:U},c.a.createElement(o.b,{history:Object(s.syncHistoryWithStore)(F,U),basename:"/product-cart"},c.a.createElement(I,null))),document.getElementById("root"))},408:function(e,t,a){"use strict";a.r(t);var n=a(21),c=a(160),r=a(161),l=a(162),o=a.n(l),i=a(4),s=a(36),m=o()(s.a.localStorage.name),u=r.createMiddleware(m,[],[i.a,i.b,i.c]),d=a(55),p=a(37),E=Object(n.c)({routing:d.routerReducer,products:p.a,cart:i.g});a.d(t,"default",(function(){return g}));var v=Object(n.a)(c.a,u);function g(e){return Object(n.d)(E,e,v)}}},[[164,1,2]]]);
//# sourceMappingURL=main.2c2e28a2.chunk.js.map