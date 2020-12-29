/**
 * skylark-langx-modules - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,n){var t=n.define,require=n.require,r="function"==typeof t&&t.amd,o=!r&&"undefined"!=typeof exports;if(!r&&!t){var a={};t=n.define=function(e,n,t){"function"==typeof t?(a[e]={factory:t,deps:n.map(function(n){return function(e,n){if("."!==e[0])return e;var t=n.split("/"),r=e.split("/");t.pop();for(var o=0;o<r.length;o++)"."!=r[o]&&(".."==r[o]?t.pop():t.push(r[o]));return t.join("/")}(n,e)}),resolved:!1,exports:null},require(e)):a[e]={factory:null,resolved:!0,exports:t}},require=n.require=function(e){if(!a.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=a[e];if(!module.resolved){var t=[];module.deps.forEach(function(e){t.push(require(e))}),module.exports=module.factory.apply(n,t)||null,module.resolved=!0}return module.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-langx-modules/modular",["skylark-langx-ns"],function(e){return e.attach("langx.modular",{plugins:{}})}),e("skylark-langx-modules/plugins/i18n",["module","../modular"],function(module,e){"use strict";var n=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;function t(e,n,t,r,o,a){n[e]&&(t.push(e),!0!==n[e]&&1!==n[e]||r.push(o+e+"/"+a))}function r(e,n,t,r,o){var a=r+n+"/"+o;require._fileExists(e.toUrl(a+".js"))&&t.push(a)}function o(e,n,t){var r;for(r in n)!n.hasOwnProperty(r)||e.hasOwnProperty(r)&&!t?"object"==typeof n[r]&&(!e[r]&&n[r]&&(e[r]={}),o(e[r],n[r],t)):e[r]=n[r]}var a=module.config?module.config():{};return e.plugins.i18n={load:function(e,i,l,s){(s=s||{}).locale&&(a.locale=s.locale);var u,c,d,f=n.exec(e),p=f[1],m=f[4],g=f[5],v=m.split("-"),h=[],y={},w="";if(f[5]?(p=f[1],u=p+g):(u=e,g=f[4],(m=a.locale)||(m=a.locale="undefined"==typeof navigator?"root":(navigator.language||navigator.userLanguage||"root").toLowerCase()),v=m.split("-")),s.isBuild){for(h.push(u),r(i,"root",h,p,g),c=0;c<v.length;c++)d=v[c],r(i,w+=(w?"-":"")+d,h,p,g);var x,k;if(s.locales)for(x=0;x<s.locales.length;x++)for(m=s.locales[x],v=m.split("-"),w="",k=0;k<v.length;k++)d=v[k],r(i,w+=(w?"-":"")+d,h,p,g);i(h,function(){l()})}else i([u],function(e){var n,r=[];for(t("root",e,r,h,p,g),c=0;c<v.length;c++)n=v[c],t(w+=(w?"-":"")+n,e,r,h,p,g);i(h,function(){var n,t,a;for(n=r.length-1;n>-1&&r[n];n--)!0!==(t=e[a=r[n]])&&1!==t||(t=i(p+a+"/"+g)),o(y,t);l(y)})})}}}),e("skylark-langx-modules/plugins/text",["module","../modular"],function(module,e){"use strict";var n,t,r,o,a,i=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],l=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,u="undefined"!=typeof location&&location.href,c=u&&location.protocol&&location.protocol.replace(/\:/,""),d=u&&location.hostname,f=u&&(location.port||void 0),p={},m=module.config&&module.config()||{};return n=e.plugins.text={strip:function(e){if(e){var n=(e=e.replace(l,"")).match(s);n&&(e=n[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:m.createXhr||function(){var e,n,t;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(n=0;n<3;n+=1){t=i[n];try{e=new ActiveXObject(t)}catch(e){}if(e){i=[t];break}}return e},parseName:function(e){var n,t,r,o=!1,a=e.indexOf("."),i=0===e.indexOf("./")||0===e.indexOf("../");return-1!==a&&(!i||a>1)?(n=e.substring(0,a),t=e.substring(a+1,e.length)):n=e,-1!==(a=(r=t||n).indexOf("!"))&&(o="strip"===r.substring(a+1),r=r.substring(0,a),t?t=r:n=r),{moduleName:n,ext:t,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,t,r,o){var a,i,l,s=n.xdRegExp.exec(e);return!s||(a=s[2],i=(i=s[3]).split(":"),l=i[1],i=i[0],!(a&&a!==t||i&&i.toLowerCase()!==r.toLowerCase()||(l||i)&&l!==o))},finishLoad:function(e,t,r,o){r=t?n.strip(r):r,m.isBuild&&(p[e]=r),o(r)},load:function(e,t,r,o){if(o&&o.isBuild&&!o.inlineText)r();else{m.isBuild=o&&o.isBuild;var a=n.parseName(e),i=a.moduleName+(a.ext?"."+a.ext:""),l=t.toUrl(i),s=m.useXhr||n.useXhr;0!==l.indexOf("empty:")?!u||s(l,c,d,f)?n.get(l,function(t){n.finishLoad(e,a.strip,t,r)},function(e){r.error&&r.error(e)}):t([i],function(e){n.finishLoad(a.moduleName+"."+a.ext,a.strip,e,r)}):r()}},write:function(e,t,r,o){if(p.hasOwnProperty(t)){var a=n.jsEscape(p[t]);r.asModule(e+"!"+t,"define(function () { return '"+a+"';});\n")}},writeFile:function(e,t,r,o,a){var i=n.parseName(t),l=i.ext?"."+i.ext:"",s=i.moduleName+l,u=r.toUrl(i.moduleName+l)+".js";n.load(s,r,function(t){var r=function(e){return o(u,e)};r.asModule=function(e,n){return o.asModule(e,u,n)},n.write(e,s,r,a)},a)}},"node"===m.env||!m.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(t=require.nodeRequire("fs"),n.get=function(e,n,r){try{var o=t.readFileSync(e,"utf8");0===o.indexOf("\ufeff")&&(o=o.substring(1)),n(o)}catch(e){r&&r(e)}}):"xhr"===m.env||!m.env&&n.createXhr()?n.get=function(e,t,r,o){var a,i=n.createXhr();if(i.open("GET",e,!0),o)for(a in o)o.hasOwnProperty(a)&&i.setRequestHeader(a.toLowerCase(),o[a]);m.onXhr&&m.onXhr(i,e),i.onreadystatechange=function(n){var o,a;4===i.readyState&&((o=i.status||0)>399&&o<600?((a=new Error(e+" HTTP status: "+o)).xhr=i,r&&r(a)):t(i.responseText),m.onXhrComplete&&m.onXhrComplete(i,e))},i.send(null)}:"rhino"===m.env||!m.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?n.get=function(e,n){var t,r,o=new java.io.File(e),a=java.lang.System.getProperty("line.separator"),i=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),"utf-8")),l="";try{for(t=new java.lang.StringBuffer,(r=i.readLine())&&r.length()&&65279===r.charAt(0)&&(r=r.substring(1)),null!==r&&t.append(r);null!==(r=i.readLine());)t.append(a),t.append(r);l=String(t.toString())}finally{i.close()}n(l)}:("xpconnect"===m.env||!m.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(r=Components.classes,o=Components.interfaces,Components.utils.import("resource://gre/modules/FileUtils.jsm"),a="@mozilla.org/windows-registry-key;1"in r,n.get=function(e,n){var t,i,l,s={};a&&(e=e.replace(/\//g,"\\")),l=new FileUtils.File(e);try{(t=r["@mozilla.org/network/file-input-stream;1"].createInstance(o.nsIFileInputStream)).init(l,1,0,!1),(i=r["@mozilla.org/intl/converter-input-stream;1"].createInstance(o.nsIConverterInputStream)).init(t,"utf-8",t.available(),o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),i.readString(t.available(),s),i.close(),t.close(),n(s.value)}catch(e){throw new Error((l&&l.path||"")+": "+e)}}),n}),e("skylark-langx-modules/plugins/json",["../modular","./text"],function(e,n){"use strict";var t=Object.create(null);return n.plugins.json={load:function(e,n,r,o){text.get(n.toUrl(e),function(n){if(o.isBuild)t[e]=n,r(n);else{try{var a=JSON.parse(n)}catch(e){r.error(e)}r(a)}},r.error,{accept:"application/json"})},write:function(e,n,r){var o=t[n];o&&r('define("'+e+"!"+n+'", function(){ return '+o+";});\n")}}}),e("skylark-langx-modules/plugins/order",["../modular"],function(e){var n="undefined"!=typeof document&&"undefined"!=typeof window&&document.createElement("script"),t=n&&(n.async||window.opera&&"[object Opera]"===Object.prototype.toString.call(window.opera)||"MozAppearance"in document.documentElement.style),r=n&&"uninitialized"===n.readyState,o=/^(complete|loaded)$/,a=[],i={},l={},s=[];function u(e){var n,t,r,l=e.currentTarget||e.srcElement;if("load"===e.type||o.test(l.readyState)){for(t=l.getAttribute("data-requiremodule"),i[t]=!0,n=0;(r=a[n])&&i[r.name];n++)r.req([r.name],r.onLoad);n>0&&a.splice(0,n),setTimeout(function(){l.parentNode.removeChild(l)},15)}}function c(e){var n,t,r;for(e.setAttribute("data-orderloaded","loaded"),n=0;(r=s[n])&&((t=l[r])&&"loaded"===t.getAttribute("data-orderloaded"));n++)delete l[r],require.addScriptToDom(t);n>0&&s.splice(0,n)}return n=null,e.plugins.order={load:function(e,n,o,i){var d,f,p,m=!!n.nameToUrl;m?(d=n.nameToUrl(e,null),require.s.skipAsync[d]=!0,t||i.isBuild?n([e],o):r?((p=require.s.contexts._).urlFetched[d]||p.loaded[e]||(p.urlFetched[d]=!0,require.resourcesReady(!1),p.scriptCount+=1,f=require.attach(d,p,e,null,null,c),l[e]=f,s.push(e)),n([e],o)):n.specified(e)?n([e],o):(a.push({name:e,req:n,onLoad:o}),require.attach(d,null,e,u,"script/cache"))):n([e],o)}}}),e("skylark-langx-modules/plugins/ready",["../modular"],function(e){"use strict";var n,t,r,o="undefined"!=typeof window&&window.document,a=!o,i=o?document:null,l=[];function s(){var e=l;a&&e.length&&(l=[],function(e){var n;for(n=0;n<e.length;n+=1)e[n](i)}(e))}function u(){a||(a=!0,r&&clearInterval(r),s())}if(o){if(document.addEventListener)document.addEventListener("DOMContentLoaded",u,!1),window.addEventListener("load",u,!1);else if(window.attachEvent){window.attachEvent("onload",u),t=document.createElement("div");try{n=null===window.frameElement}catch(e){}t.doScroll&&n&&window.external&&(r=setInterval(function(){try{t.doScroll(),u()}catch(e){}},30))}"complete"===document.readyState&&u()}function c(e){return a?e(i):l.push(e),c}return c.load=function(e,n,t,r){r.isBuild?t(null):c(t)},e.plugins.ready=c}),e("skylark-langx-modules/main",["./modular","./plugins/i18n","./plugins/json","./plugins/order","./plugins/ready","./plugins/text"],function(e){return e}),e("skylark-langx-modules",["skylark-langx-modules/main"],function(e){return e})}(t,require),!r){var i=require("skylark-langx-ns");o?module.exports=i:n.skylarkjs=i}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-langx-modules.js.map
