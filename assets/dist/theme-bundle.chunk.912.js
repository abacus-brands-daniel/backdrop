"use strict";(self.webpackChunkbigcommerce_cornerstone=self.webpackChunkbigcommerce_cornerstone||[]).push([[912],{22912:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var o=n(47452),r=n(55192),c=n(7520),a=n(41584);function i(e,t){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},i(e,t)}var u=function(e){var t,n;function o(){return e.apply(this,arguments)||this}return n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,i(t,n),o.prototype.onReady=function(){var e=this;(0,c.c)(this.context);var t=this.context.compareRemoveMessage;a("body").on("click","[data-comparison-remove]",(function(n){e.context.comparisons.length<=2&&((0,r.uC)(t),n.preventDefault())}))},o}(o.c)},7520:(e,t,n)=>{n.d(t,{c:()=>a});var o=n(55192),r=n(41584);function c(e,t,n){0!==e.length?(t.is("visible")||t.addClass("show"),t.attr("href",n.compare+"/"+e.join("/")),t.find("span.countPill").html(e.length)):t.removeClass("show")}function a(e){var t=e.noCompareMessage,n=e.urls,a=[],i=r("a[data-compare-nav]");r("body").on("compareReset",(function(){var e=r("body").find('input[name="products[]"]:checked');c(a=e.length?e.map((function(e,t){return t.value})).get():[],i,n)})),r("body").triggerHandler("compareReset"),r("body").on("click","[data-compare-id]",(function(e){var t,o=e.currentTarget.value,i=r("a[data-compare-nav]");e.currentTarget.checked?(t=o,a.push(t)):function(e,t){var n=e.indexOf(t);n>-1&&e.splice(n,1)}(a,o),c(a,i,n)})),r("body").on("click","a[data-compare-nav]",(function(){if(r("body").find('input[name="products[]"]:checked').length<=1)return(0,o.uC)(t),!1}))}}}]);
//# sourceMappingURL=theme-bundle.chunk.912.js.map