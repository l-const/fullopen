(this.webpackJsonpstep6=this.webpackJsonpstep6||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var a=t(2),c=t(16),u=t.n(c),o=t(17),r=t(3),i=t(5),s=t.n(i),l="/api/persons",d=function(){return s.a.get(l).then((function(e){return e.data}))},j=function(e){return s.a.post(l,e).then((function(e){return e.data}))},b=function(e){return s.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},f=function(e,n){return s.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))},m=t(0),h=function(e){var n=e.message,t=e.type;if(null===n)return null;var a="message";return a="good"===t?"message good":"message bad",Object(m.jsx)("div",{className:a,children:n})},g=function(){var e=Object(a.useState)([]),n=Object(r.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),i=Object(r.a)(u,2),s=i[0],l=i[1],g=Object(a.useState)(""),x=Object(r.a)(g,2),w=x[0],C=x[1],y=Object(a.useState)(""),_=Object(r.a)(y,2),S=_[0],k=_[1],E=Object(a.useState)(""),T=Object(r.a)(E,2),D=T[0],H=T[1],J=Object(a.useState)("good"),L=Object(r.a)(J,2),N=L[0],B=L[1];Object(a.useEffect)((function(){d().then((function(e){c(e),H("Downloaded initial resources!"),B("good")})),setTimeout((function(){H(null)}),2e3)}),[]);var I;return Object(m.jsxs)("div",{children:[Object(m.jsx)("h2",{children:"Phonebook"}),Object(m.jsx)(h,{message:D,type:N}),Object(m.jsx)(O,{value:S,onChange:function(e){console.log(e.target.value),k(e.target.value)}}),Object(m.jsx)(v,{submit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===s&&e.number!==w}));if(void 0!==n&&window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?")))return void f(n.id,{name:s,number:w}).then((function(e){console.log(e),c(t.map((function(t){return t.name!==n.name?t:e})))}));var a={name:s,number:w};j(a).then((function(e){console.log(e),c([].concat(Object(o.a)(t),[a])),H(" ".concat(a.name," created successfully")),B("good"),setTimeout((function(){H(null)}),2e3)}))},na_value:s,na_change:function(e){l(e.target.value)},nu_value:w,nu_change:function(e){C(e.target.value)}}),Object(m.jsx)("h3",{children:"Numbers"}),Object(m.jsx)(p,{pers:(I=S,t.filter((function(e){return e.name.toLowerCase().includes(I.toLowerCase())}))),dropHandler:function(e){if(e.target.style.backgroundColor="#6960EC",window.confirm("Delete ".concat(e.target.name))){var n=t.find((function(n){return n.name===e.target.name})).id;b(n).then((function(a){c(t.filter((function(e){return e.id!==n}))),H(" ".concat(e.target.name," deleted successfully")),B("good"),setTimeout((function(){H(null)}),2e3)})).catch((function(n){H("".concat(e.target.name," is already deleted! Error")),B("bad"),setTimeout((function(){H(null)}),4e3)}))}}})]})},O=function(e){var n=e.value,t=e.onChange;return Object(m.jsxs)("div",{children:["filter shown with ",Object(m.jsx)("input",{value:n,onChange:t})]})},v=function(e){var n=e.submit,t=e.na_value,a=e.na_change,c=e.nu_value,u=e.nu_change;return Object(m.jsxs)("form",{onSubmit:n,children:[Object(m.jsxs)("div",{children:["name: ",Object(m.jsx)("input",{value:t,onChange:a})]}),Object(m.jsxs)("div",{children:["number: ",Object(m.jsx)("input",{value:c,onChange:u})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:"add"})})]})},p=function(e){var n=e.pers,t=e.dropHandler;return Object(m.jsx)("div",{children:n.map((function(e){return Object(m.jsxs)("p",{children:[e.name+" "+e.number,Object(m.jsx)("button",{name:e.name,onClick:t,children:"delete"},e.id)]},e.name)}))})};t(41);u.a.render(Object(m.jsx)(g,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.812b1164.chunk.js.map