javascript:(()=>{
(function(){"use strict";if("github.com"!==document.location.host)return alert("This script must be run whilst on github.com");if(window.harvest||window.silo)return;const e="";const t="&s=indexed&o=desc";const n="&s=indexed&o=asc";window.silo={};window.harvest=s;Object.defineProperty(window.silo,"reap",{value:d,writable:false,configurable:false});let o=null;Object.defineProperty(window,"that",{get:()=>o?d(o):""});let r=false;window.addEventListener("beforeunload",e=>r?e.returnValue="Your harvest hasn't finished. Are you sure you wish to cancel?":undefined);Notification.requestPermission();async function s(s,c=null){r=true;if(!/^extension:|filename:|in:filename/.test(s))s="extension:"+s;if(!c){const e=Math.random(1e6).toString(16).replace(/\./,"").toUpperCase();c="NOT nothack"+e}const l=encodeURIComponent(`${s} ${c}`).replace(/%20/g,"+");const u=`https://github.com/search?q=${l}&type=Code`;try{const c=await i(u,e,s);if(c>1e3){await i(u,t,s);await i(u,n,s)}const l="Run `copy(that);` in your console to copy the URLs to your clipboard.";new Notification(`Harvest complete for ${s}`,{body:l});o=s;r=false}catch(e){r=false;console.error(e);if(a.lastResult)console.log({lastPageSnapshot:a.lastResult});throw e}}async function i(e,t,n){const o=silo[n]||(silo[n]={length:0});let r=0;let s=undefined;let i=undefined;return i=await f();async function f(){const n=await u(e+t+(r?"&p="+(r+1):""));const d=await n.text().then(e=>{e=e.replace(/<img(?=\s)/gi,"<hr");return a(e)});const h=e=>d.querySelector(e);const m=e=>d.querySelectorAll(e);if(h("div.blankslate")){const e="Must include at least one user, organization, or repository";const t=e.split(" ").join("\\s+");const n=new RegExp(t,"i").test(d.textContent)?["Failed.","GitHub's doing that weird thing again:",`\t> "${e}"`].join("\n\n"):"No results";throw n}const p=h("#code_search_results > .code-list")||l("Search-result list not found");const w=p.querySelectorAll(".code-list-item");if(w.length<1)l("Expected at least one entry to match `.code-list-item`");for(const e of w){const t=e.querySelectorAll("hr.avatar[alt^='@']");const n=e.querySelector("a.text-bold + a[href]");if(t.length&&n&&!o[n.href]){++o.length;o[n.href]=n.href.replace(/^((?:\/[^/]+){2})\/blob(?=\/)/gim,"https://raw.githubusercontent.com$1")}}if(undefined===s){const e=m(".pagination > a[href]");if(e.length){const t=Array.from(e).filter(e=>/^\s*[0-9]+\s*$/.test(e.textContent)).map(e=>parseInt(e.textContent.trim()));s=Math.max(...t);const n=h(".codesearch-results h3");if(n&&n.textContent.match(/\b([0-9.,\s]+)\s/)){i=+RegExp.$1.replace(/\D/g,"");if(!/\b(code\s+results?)\b/.test(n.textContent)){let e=`Missing text found where "${i} code results" expected. `;e+="Please double-check <h3> contains correct number of search results";return l(e)}}else l("Unable to extract total number of results from header")}else{i=o.length;s=1}}++r;if(r>=s)return i;await c(2e3);return f()}}function a(e){const t=document.createDocumentFragment();const n=t.appendChild(document.createElement("div"));n.insertAdjacentHTML("afterbegin",e);t.root=n;a.lastResult=t;return t}function c(e){return new Promise(t=>setTimeout(()=>t(),e))}function l(e){const t=new SyntaxError(e);t.title="Unexpected Markup Error";t.fileName="harvester.js";t.message=e;console.trace(e);throw t}function u(e){return new Promise((t,n)=>{const o=new XMLHttpRequest;o.open("GET",e);o.addEventListener("readystatechange",()=>{if(XMLHttpRequest.DONE===o.readyState)t({text:()=>Promise.resolve(o.response)})});for(const e of"abort error timeout".split(" "))o.addEventListener(e,e=>n(e));o.send()})}function f(e){const t=e.match(/^https?:\/\/github.com\/([^/#]+)\/([^/#]+)\/blob\/(\w+)((?:\/[^/]+)+)/);if(!t)throw new TypeError(`Invalid GitHub permalink: ${e}`);const[,n,o,r,s]=t;return`https://raw.githubusercontent.com/${n}/${o}/${r}${s}`}function d(e){if(!/^extension:|filename:/.test(e)){const t="extension:"+e in silo;const n="filename:"+e in silo;if(t&&n){const t=`Both extension:${e} and filename:${e} properties exist in silo.`;throw new ReferenceError(t+" Which did you mean?")}if(t)e="extension:"+e;else if(n)e="filename:"+e}const t=silo[e]||{};return Object.keys(t).filter(e=>e!=="length").map(e=>f(t[e])).sort((e,t)=>{e=e.toLowerCase();t=t.toLowerCase();if(e<t)return-1;if(e>t)return 1;return 0}).join("\n")}})();
let q=prompt("Enter an extension or filename to harvest:");q&&harvest(q)})();