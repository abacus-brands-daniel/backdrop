"use strict";(self.webpackChunkbigcommerce_cornerstone=self.webpackChunkbigcommerce_cornerstone||[]).push([[460],{92460:(t,e,o)=>{o.r(e),o.d(e,{default:()=>u});var r=o(47452),n=o(51380),c=o(37740),a=o(92256),i=o(41584);function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}var u=function(t){var e,o;function r(){return t.apply(this,arguments)||this}o=t,(e=r).prototype=Object.create(o.prototype),e.prototype.constructor=e,s(e,o);var u=r.prototype;return u.onReady=function(){this.registerContactFormValidation()},u.registerContactFormValidation=function(){var t="form[data-contact-form]",e=(0,n.c)({submit:t+' input[type="submit"]',tap:a.I3}),o=i(t);e.add([{selector:t+' input[name="contact_email"]',validate:function(t,e){t(c.c.email(e))},errorMessage:this.context.contactEmail},{selector:t+' textarea[name="contact_question"]',validate:function(t,e){t(c.c.notEmpty(e))},errorMessage:this.context.contactQuestion}]),o.on("submit",(function(t){e.performCheck(),e.areAll("valid")||t.preventDefault()}))},r}(r.c)}}]);
//# sourceMappingURL=theme-bundle.chunk.460.js.map
