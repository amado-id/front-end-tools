/*! ie11CustomProperties.js v3.1.0 | MIT License | https://git.io/fjXMN */
!function(){"use strict";var e=document.createElement("i");if(e.style.setProperty("--x","y"),"y"===e.style.getPropertyValue("--x")||!e.msMatchesSelector)return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector);var t,n=[],r=document;function i(e,t){try{return e.querySelectorAll(t)}catch(e){return[]}}function o(e,o){for(var c,a={selector:e,callback:o,elements:new WeakMap},u=i(r,a.selector),f=0;c=u[f++];)a.elements.set(c,!0),a.callback.call(c,c);n.push(a),t||(t=new MutationObserver(l)).observe(r,{childList:!0,subtree:!0}),s(a)}function s(e,t){var n,o=0,s=[];try{t&&t.matches(e.selector)&&s.push(t)}catch(e){}for(a&&Array.prototype.push.apply(s,i(t||r,e.selector));n=s[o++];)e.elements.has(n)||(e.elements.set(n,!0),e.callback.call(n,n))}function c(e){for(var t,r=0;t=n[r++];)s(t,e)}function l(e){for(var t,n,r,i,o=0;n=e[o++];)for(r=n.addedNodes,t=0;i=r[t++];)1===i.nodeType&&c(i)}var a=!1;function u(e,t,n){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(n,e,r)}document.addEventListener("DOMContentLoaded",function(){a=!0}),"classList"in Element.prototype||u("classList",HTMLElement.prototype,Element.prototype),"innerHTML"in Element.prototype||u("innerHTML",HTMLElement.prototype,Element.prototype),"sheet"in SVGStyleElement.prototype||Object.defineProperty(SVGStyleElement.prototype,"sheet",{get:function(){for(var e,t=document.styleSheets,n=0;e=t[n++];)if(e.ownerNode===this)return e}});const f=/([\s{;])(--([A-Za-z0-9-_]*)\s*:([^;!}{]+)(!important)?)(?=\s*([;}]|$))/g,p=/([{;]\s*)([A-Za-z0-9-_]+\s*:[^;}{]*var\([^!;}{]+)(!important)?(?=\s*([;}$]|$))/g,d=/-ieVar-([^:]+):/g,m=/-ie-([^};]+)/g,v=/:(hover|active|focus|target|visited|link|:before|:after|:first-letter|:first-line)/;function y(e){return e.replace(f,function(e,t,n,r,i,o){return t+"-ie-"+(o?"❗":"")+r+":"+h(i)}).replace(p,function(e,t,n,r){return t+"-ieVar-"+(r?"❗":"")+n+"; "+n})}function h(e){return e}o('link[rel="stylesheet"]',function(e){var t,n,r;t=e.href,n=function(t){var n=y(t);if(t!==n){n=function(e,t){return t.replace(/url\(([^)]+)\)/g,function(t,n){return(n=n.trim().replace(/(^['"]|['"]$)/g,"")).match(/^([a-z]+:|\/)/)?t:"url("+(e=e.replace(/\?.*/,""))+"./../"+n+")"})}(e.href,n),e.disabled=!0;var r=document.createElement("style");e.media&&r.setAttribute("media",e.media),e.parentNode.insertBefore(r,e),g(r,n)}},(r=new XMLHttpRequest).open("GET",t),r.overrideMimeType("text/css"),r.onload=function(){r.status>=200&&r.status<400&&n(r.responseText)},r.send()}),o("style",function(e){if(!e.ieCP_polyfilled&&!e.ieCP_elementSheet){var t=e.innerHTML,n=y(t);t!==n&&g(e,n)}}),o("[ie-style]",function(e){var t=y("{"+e.getAttribute("ie-style")).substr(1);e.style.cssText+=";"+t;var n=P(e.style);n.getters&&b(e,n.getters,"%styleAttr"),n.setters&&L(e,n.setters)});function E(e){return e}const S={};function P(e){e["z-index"];const t=e.cssText;var n,r,i=t.match(d);if(i){var o=[];for(n=0;r=i[n++];){let t=r.slice(7,-1);"❗"===t[0]&&(t=t.substr(1)),o.push(t),S[t]||(S[t]=[]),S[t].push(e)}}var s=t.match(m);if(s){var c={};for(n=0;r=s[n++];){let e=r.substr(4).split(":"),t=e[0],n=e[1];"❗"===t[0]&&(t=t.substr(1)),c[t]=n}}return{getters:o,setters:c}}function g(e,t){e.innerHTML=t,e.ieCP_polyfilled=!0;for(var n,r=e.sheet.rules,i=0;n=r[i++];){const e=P(n.style);e.getters&&C(n.selectorText,e.getters),e.setters&&T(n.selectorText,e.setters);const t=n.parentRule&&n.parentRule.media&&n.parentRule.media.mediaText;t&&(e.getters||e.setters)&&matchMedia(t).addListener(function(){H(document.documentElement)})}_()}function C(e,t){M(e),o(x(e),function(n){b(n,t,e),D(n)})}function b(e,t,n){var r,i,o=0;const s=n.split(",");for(e.setAttribute("iecp-needed",!0),e.ieCPSelectors||(e.ieCPSelectors={});r=t[o++];)for(i=0;n=s[i++];){const t=n.trim().split("::");e.ieCPSelectors[r]||(e.ieCPSelectors[r]=[]),e.ieCPSelectors[r].push({selector:t[0],pseudo:t[1]?"::"+t[1]:""})}}function T(e,t){M(e),o(x(e),function(e){L(e,t)})}function L(e,t){for(var n in e.ieCP_setters||(e.ieCP_setters={}),t)e.ieCP_setters["--"+n]=1;H(e)}function _(){for(var e in S){let i=S[e];for(var t,n=0;t=i[n++];)if(!t.owningElement){var r=t["-ieVar-"+e];if(r&&""!==(r=R(getComputedStyle(document.documentElement),r)))try{t[e]=r}catch(e){}}}}const w={hover:{on:"mouseenter",off:"mouseleave"},focus:{on:"focusin",off:"focusout"},active:{on:"CSSActivate",off:"CSSDeactivate"}};function M(e){for(var t in e=e.split(",")[0],w){var n=e.split(":"+t);if(n.length>1){var r=n[1].match(/^[^\s]*/);let e=x(n[0]+r);const i=w[t];o(e,function(e){e.addEventListener(i.on,N),e.addEventListener(i.off,N)})}}}let A=null;function x(e){return e.replace(v,"").replace(":not()","")}document.addEventListener("mousedown",function(e){setTimeout(function(){if(e.target===document.activeElement){var t=document.createEvent("Event");t.initEvent("CSSActivate",!0,!0),(A=e.target).dispatchEvent(t)}})}),document.addEventListener("mouseup",function(){if(A){var e=document.createEvent("Event");e.initEvent("CSSDeactivate",!0,!0),A.dispatchEvent(e),A=null}});var V=0;function O(e){e.ieCP_unique||(e.ieCP_unique=++V,e.classList.add("iecp-u"+e.ieCP_unique));var t=getComputedStyle(e);let n="";for(var r in e.ieCPSelectors){var i=t["-ieVar-❗"+r];let a=i||t["-ieVar-"+r];if(a){var o={},s=R(t,a,o);i&&(s+=" !important");for(var c,l=0;c=e.ieCPSelectors[r][l++];)if("%styleAttr"===c.selector)e.style[r]=s;else{if(!i&&!1!==o.allByRoot)continue;n+=c.selector+".iecp-u"+e.ieCP_unique+c.pseudo+"{"+r+":"+s+"}\n"}}}!function(e,t){if(!e.ieCP_styleEl&&t){const t=document.createElement("style");t.ieCP_elementSheet=1,document.head.appendChild(t),e.ieCP_styleEl=t}e.ieCP_styleEl&&(e.ieCP_styleEl.innerHTML=t)}(e,n)}function H(e){if(e){var t=e.querySelectorAll("[iecp-needed]");e.hasAttribute&&e.hasAttribute("iecp-needed")&&D(e);for(var n,r=0;n=t[r++];)D(n)}}let B=new Set,q=!1,k=!1;function D(e){B.add(e),q||(q=!0,requestAnimationFrame(function(){q=!1,k=!0,B.forEach(O),B.clear(),setTimeout(function(){k=!1})}))}function N(e){H(e.target)}function R(e,t,n){return function(e,t){let n,r,i=0,o=null,s=0,c="",l=0;for(;n=e[l++];){if("("===n&&(++i,null===o&&e[l-4]+e[l-3]+e[l-2]==="var"&&(o=i,c+=e.substring(s,l-4),s=l),e[l-5]+e[l-4]+e[l-3]+e[l-2]==="calc"&&(r=i)),")"===n&&o===i){let n,i=e.substring(s,l-1).trim(),a=i.indexOf(",");-1!==a&&(n=i.slice(a+1),i=i.slice(0,a)),c+=t(i,n,r),s=l,o=null}")"===n&&r===--i&&(r=null)}return c+=e.substring(s)}(t,function(t,r,i){var o=e.getPropertyValue(t);return i&&(o=o.replace(/^calc\(/,"(")),n&&e.lastPropertyServedBy!==document.documentElement&&(n.allByRoot=!1),""===o&&r&&(o=R(e,r,n)),o})}var j=new MutationObserver(function(e){if(!k)for(var t,n=0;t=e[n++];)"iecp-needed"!==t.attributeName&&H(t.target)});setTimeout(function(){j.observe(document,{attributes:!0,subtree:!0})});var F=location.hash;addEventListener("hashchange",function(e){var t=document.getElementById(location.hash.substr(1));if(t){var n=document.getElementById(F.substr(1));H(t),H(n)}else H(document);F=location.hash});var z=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"style"),$=z.get;z.get=function(){const e=$.call(this);return e.owningElement=this,e},Object.defineProperty(HTMLElement.prototype,"style",z);var G=getComputedStyle;window.getComputedStyle=function(e){var t=G.apply(this,arguments);return t.computedFor=e,t};const I=CSSStyleDeclaration.prototype,Z=I.getPropertyValue;I.getPropertyValue=function(e){if(this.lastPropertyServedBy=!1,"-"!==(e=e.trim())[0]||"-"!==e[1])return Z.apply(this,arguments);const t=e.substr(2),n="-ie-"+t,r="-ie-❗"+t;let i=E(this[r]||this[n]);if(this.computedFor){if(void 0===i||W[i]){if(W[i]||!J[e]||J[e].inherits){let t=this.computedFor.parentNode;for(;1===t.nodeType;){if(t.ieCP_setters&&t.ieCP_setters[e]){var o=getComputedStyle(t),s=E(o[r]||o[n]);if(void 0!==s){i=R(this,s),this.lastPropertyServedBy=t;break}}t=t.parentNode}}}else i=R(this,i),this.lastPropertyServedBy=this.computedFor;if("initial"===i)return""}return void 0===i&&J[e]&&(i=J[e].initialValue),void 0===i?"":i};const W={inherit:1,revert:1,unset:1},X=I.setProperty;I.setProperty=function(e,t,n){if("-"!==e[0]||"-"!==e[1])return X.apply(this,arguments);const r=this.owningElement;r&&(r.ieCP_setters||(r.ieCP_setters={}),r.ieCP_setters[e]=1),e="-ie-"+("important"===n?"❗":"")+e.substr(2),this.cssText+="; "+e+":"+h(t)+";",r===document.documentElement&&_(),r&&H(r)},window.CSS||(window.CSS={});const J={};CSS.registerProperty=function(e){J[e.name]=e}}();