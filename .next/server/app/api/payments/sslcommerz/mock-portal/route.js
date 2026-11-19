"use strict";(()=>{var e={};e.id=2264,e.ids=[2264],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},10375:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>c,patchFetch:()=>h,requestAsyncStorage:()=>u,routeModule:()=>p,serverHooks:()=>m,staticGenerationAsyncStorage:()=>d});var n={};r.r(n),r.d(n,{GET:()=>l});var o=r(73278),i=r(45002),a=r(54877),s=r(71309);async function l(e){let{searchParams:t}=new URL(e.url),r=t.get("tran_id")||"TXN-DEMO",n=t.get("amount")||"0",o=t.get("order")||"",i=`
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <title>SSLCOMMERZ Sandbox Gateway Simulator | শুব্বান লাইব্রেরী</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; background: #f4f6f8; padding: 2rem; color: #1e293b; }
        .card { max-width: 480px; margin: 0 auto; background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; }
        h1 { font-size: 1.25rem; font-weight: bold; color: #0284c7; margin-bottom: 0.5rem; }
        .meta { background: #f8fafc; border-radius: 0.5rem; padding: 1rem; margin: 1rem 0; font-size: 0.875rem; border: 1px solid #e2e8f0; }
        .btn { display: block; width: 100%; padding: 0.75rem; margin-top: 0.75rem; border-radius: 0.5rem; font-weight: bold; font-size: 0.875rem; cursor: pointer; text-align: center; border: none; text-decoration: none; }
        .btn-success { background: #059669; color: white; }
        .btn-fail { background: #e11d48; color: white; }
        .btn-cancel { background: #64748b; color: white; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🔒 SSLCOMMERZ Sandbox Simulator</h1>
        <p style="font-size: 13px; color: #64748b;">শুব্বান লাইব্রেরী পেমেন্ট টেস্ট গেটওয়ে</p>
        
        <div class="meta">
          <p><strong>অর্ডার নম্বর:</strong> ${o}</p>
          <p><strong>ট্রানজেকশন আইডি:</strong> <code>${r}</code></p>
          <p><strong>মোট প্রদেয়:</strong> ৳ ${n} BDT</p>
          <p><strong>মোড:</strong> Sandbox Integration Protocol</p>
        </div>

        <form action="/api/payments/sslcommerz/callback" method="POST">
          <input type="hidden" name="tran_id" value="${r}">
          <input type="hidden" name="val_id" value="SANDBOX_VAL_${Date.now()}">
          <input type="hidden" name="amount" value="${n}">
          <input type="hidden" name="card_type" value="VISA-SSLCOMMERZ">
          <input type="hidden" name="bank_tran_id" value="BANK_${Date.now()}">
          <input type="hidden" name="status" value="VALID">
          <button type="submit" class="btn btn-success">✅ সফল পেমেন্ট সিমুলেট করুন (Simulate Success)</button>
        </form>

        <form action="/api/payments/sslcommerz/callback" method="POST">
          <input type="hidden" name="tran_id" value="${r}">
          <input type="hidden" name="status" value="FAILED">
          <input type="hidden" name="error" value="Insufficient funds or user cancel">
          <button type="submit" class="btn btn-fail">❌ ব্যর্থ পেমেন্ট সিমুলেট করুন (Simulate Fail)</button>
        </form>

        <form action="/api/payments/sslcommerz/callback" method="POST">
          <input type="hidden" name="tran_id" value="${r}">
          <input type="hidden" name="status" value="CANCELLED">
          <button type="submit" class="btn btn-cancel">⏹️ বাতিল সিমুলেট করুন (Cancel)</button>
        </form>
      </div>
    </body>
    </html>
  `;return new s.NextResponse(i,{headers:{"Content-Type":"text/html; charset=utf-8"}})}let p=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/payments/sslcommerz/mock-portal/route",pathname:"/api/payments/sslcommerz/mock-portal",filename:"route",bundlePath:"app/api/payments/sslcommerz/mock-portal/route"},resolvedPagePath:"D:\\Web Design\\Ai website\\Shubban Libery\\src\\app\\api\\payments\\sslcommerz\\mock-portal\\route.ts",nextConfigOutput:"standalone",userland:n}),{requestAsyncStorage:u,staticGenerationAsyncStorage:d,serverHooks:m}=p,c="/api/payments/sslcommerz/mock-portal/route";function h(){return(0,a.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:d})}},36801:e=>{var t=Object.defineProperty,r=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,o=Object.prototype.hasOwnProperty,i={};function a(e){var t;let r=["path"in e&&e.path&&`Path=${e.path}`,"expires"in e&&(e.expires||0===e.expires)&&`Expires=${("number"==typeof e.expires?new Date(e.expires):e.expires).toUTCString()}`,"maxAge"in e&&"number"==typeof e.maxAge&&`Max-Age=${e.maxAge}`,"domain"in e&&e.domain&&`Domain=${e.domain}`,"secure"in e&&e.secure&&"Secure","httpOnly"in e&&e.httpOnly&&"HttpOnly","sameSite"in e&&e.sameSite&&`SameSite=${e.sameSite}`,"partitioned"in e&&e.partitioned&&"Partitioned","priority"in e&&e.priority&&`Priority=${e.priority}`].filter(Boolean),n=`${e.name}=${encodeURIComponent(null!=(t=e.value)?t:"")}`;return 0===r.length?n:`${n}; ${r.join("; ")}`}function s(e){let t=new Map;for(let r of e.split(/; */)){if(!r)continue;let e=r.indexOf("=");if(-1===e){t.set(r,"true");continue}let[n,o]=[r.slice(0,e),r.slice(e+1)];try{t.set(n,decodeURIComponent(null!=o?o:"true"))}catch{}}return t}function l(e){var t,r;if(!e)return;let[[n,o],...i]=s(e),{domain:a,expires:l,httponly:d,maxage:m,path:c,samesite:h,secure:f,partitioned:g,priority:y}=Object.fromEntries(i.map(([e,t])=>[e.toLowerCase(),t]));return function(e){let t={};for(let r in e)e[r]&&(t[r]=e[r]);return t}({name:n,value:decodeURIComponent(o),domain:a,...l&&{expires:new Date(l)},...d&&{httpOnly:!0},..."string"==typeof m&&{maxAge:Number(m)},path:c,...h&&{sameSite:p.includes(t=(t=h).toLowerCase())?t:void 0},...f&&{secure:!0},...y&&{priority:u.includes(r=(r=y).toLowerCase())?r:void 0},...g&&{partitioned:!0}})}((e,r)=>{for(var n in r)t(e,n,{get:r[n],enumerable:!0})})(i,{RequestCookies:()=>d,ResponseCookies:()=>m,parseCookie:()=>s,parseSetCookie:()=>l,stringifyCookie:()=>a}),e.exports=((e,i,a,s)=>{if(i&&"object"==typeof i||"function"==typeof i)for(let a of n(i))o.call(e,a)||void 0===a||t(e,a,{get:()=>i[a],enumerable:!(s=r(i,a))||s.enumerable});return e})(t({},"__esModule",{value:!0}),i);var p=["strict","lax","none"],u=["low","medium","high"],d=class{constructor(e){this._parsed=new Map,this._headers=e;let t=e.get("cookie");if(t)for(let[e,r]of s(t))this._parsed.set(e,{name:e,value:r})}[Symbol.iterator](){return this._parsed[Symbol.iterator]()}get size(){return this._parsed.size}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed);if(!e.length)return r.map(([e,t])=>t);let n="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(([e])=>e===n).map(([e,t])=>t)}has(e){return this._parsed.has(e)}set(...e){let[t,r]=1===e.length?[e[0].name,e[0].value]:e,n=this._parsed;return n.set(t,{name:t,value:r}),this._headers.set("cookie",Array.from(n).map(([e,t])=>a(t)).join("; ")),this}delete(e){let t=this._parsed,r=Array.isArray(e)?e.map(e=>t.delete(e)):t.delete(e);return this._headers.set("cookie",Array.from(t).map(([e,t])=>a(t)).join("; ")),r}clear(){return this.delete(Array.from(this._parsed.keys())),this}[Symbol.for("edge-runtime.inspect.custom")](){return`RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(e=>`${e.name}=${encodeURIComponent(e.value)}`).join("; ")}},m=class{constructor(e){var t,r,n;this._parsed=new Map,this._headers=e;let o=null!=(n=null!=(r=null==(t=e.getSetCookie)?void 0:t.call(e))?r:e.get("set-cookie"))?n:[];for(let e of Array.isArray(o)?o:function(e){if(!e)return[];var t,r,n,o,i,a=[],s=0;function l(){for(;s<e.length&&/\s/.test(e.charAt(s));)s+=1;return s<e.length}for(;s<e.length;){for(t=s,i=!1;l();)if(","===(r=e.charAt(s))){for(n=s,s+=1,l(),o=s;s<e.length&&"="!==(r=e.charAt(s))&&";"!==r&&","!==r;)s+=1;s<e.length&&"="===e.charAt(s)?(i=!0,s=o,a.push(e.substring(t,n)),t=s):s=n+1}else s+=1;(!i||s>=e.length)&&a.push(e.substring(t,e.length))}return a}(o)){let t=l(e);t&&this._parsed.set(t.name,t)}}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed.values());if(!e.length)return r;let n="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(e=>e.name===n)}has(e){return this._parsed.has(e)}set(...e){let[t,r,n]=1===e.length?[e[0].name,e[0].value,e[0]]:e,o=this._parsed;return o.set(t,function(e={name:"",value:""}){return"number"==typeof e.expires&&(e.expires=new Date(e.expires)),e.maxAge&&(e.expires=new Date(Date.now()+1e3*e.maxAge)),(null===e.path||void 0===e.path)&&(e.path="/"),e}({name:t,value:r,...n})),function(e,t){for(let[,r]of(t.delete("set-cookie"),e)){let e=a(r);t.append("set-cookie",e)}}(o,this._headers),this}delete(...e){let[t,r,n]="string"==typeof e[0]?[e[0]]:[e[0].name,e[0].path,e[0].domain];return this.set({name:t,path:r,domain:n,value:"",expires:new Date(0)})}[Symbol.for("edge-runtime.inspect.custom")](){return`ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(a).join("; ")}}},54203:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ReflectAdapter",{enumerable:!0,get:function(){return r}});class r{static get(e,t,r){let n=Reflect.get(e,t,r);return"function"==typeof n?n.bind(e):n}static set(e,t,r,n){return Reflect.set(e,t,r,n)}static has(e,t){return Reflect.has(e,t)}static deleteProperty(e,t){return Reflect.deleteProperty(e,t)}}},25911:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RequestCookies:function(){return n.RequestCookies},ResponseCookies:function(){return n.ResponseCookies},stringifyCookie:function(){return n.stringifyCookie}});let n=r(36801)}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[9379,6891],()=>r(10375));module.exports=n})();