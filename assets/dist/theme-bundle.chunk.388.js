"use strict";(self.webpackChunkbigcommerce_cornerstone=self.webpackChunkbigcommerce_cornerstone||[]).push([[388],{15388:(t,e,o)=>{o.r(e),o.d(e,{default:()=>u});var r=o(91238),n=o(41582),a=o(61579),c=o(96609),i=o(33270);function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}var u=function(t){var e,o;function r(){return t.apply(this,arguments)||this}o=t,(e=r).prototype=Object.create(o.prototype),e.prototype.constructor=e,s(e,o);var u=r.prototype;return u.onReady=function(){this.registerContactFormValidation()},u.registerContactFormValidation=function(){var t="form[data-contact-form]",e=(0,n.A)({submit:t+' input[type="submit"]',tap:c.dN}),o=i(t);e.add([{selector:t+' input[name="contact_email"]',validate:function(t,e){t(a.A.email(e))},errorMessage:this.context.contactEmail},{selector:t+' textarea[name="contact_question"]',validate:function(t,e){t(a.A.notEmpty(e))},errorMessage:this.context.contactQuestion}]),o.on("submit",(function(t){e.performCheck(),e.areAll("valid")||t.preventDefault()}))},r}(r.A)}}]);
//# sourceMappingURL=theme-bundle.chunk.388.js.map