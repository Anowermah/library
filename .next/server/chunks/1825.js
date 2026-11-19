exports.id=1825,exports.ids=[1825],exports.modules={32102:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,63642,23)),Promise.resolve().then(r.t.bind(r,87586,23)),Promise.resolve().then(r.t.bind(r,47838,23)),Promise.resolve().then(r.t.bind(r,58057,23)),Promise.resolve().then(r.t.bind(r,77741,23)),Promise.resolve().then(r.t.bind(r,13118,23))},20340:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,34080,23))},23527:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,35268,23)),Promise.resolve().then(r.bind(r,88256)),Promise.resolve().then(r.bind(r,77739)),Promise.resolve().then(r.bind(r,59027))},36041:(e,t,r)=>{Promise.resolve().then(r.bind(r,2992))},35303:()=>{},2992:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h});var s=r(97247),n=r(28964),a=r(79906),o=r(35921),i=r(10302),l=r(56460),c=r(57266),d=r(45370),u=r(62513);function h({error:e,reset:t}){let[r,h]=(0,n.useState)(!1),[x,m]=(0,n.useState)(!1),b=async()=>{m(!0);try{"function"==typeof t&&t()}catch(e){}};return s.jsx("div",{className:"min-h-[60vh] flex items-center justify-center px-4 font-bengali py-16",children:(0,s.jsxs)("div",{className:"max-w-md w-full bg-white dark:bg-shubban-darkCard rounded-3xl border border-stone-200 dark:border-stone-800 p-8 text-center shadow-xl space-y-6",children:[s.jsx("div",{className:"w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center border border-rose-200 dark:border-rose-800/60 shadow-sm",children:s.jsx(o.Z,{className:"w-8 h-8"})}),(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx("h2",{className:"font-serif font-bold text-2xl text-stone-900 dark:text-stone-100",children:"সাময়িক সমস্যা দেখা দিয়েছে"}),s.jsx("p",{className:"text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed",children:"দুঃখিত, তথ্য লোড করতে একটি অপ্রত্যাশিত কারিগরি ত্রুটি ঘটেছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন অথবা আমাদের গ্রাহক সেবায় যোগাযোগ করুন।"})]}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-3 pt-2",children:[(0,s.jsxs)("button",{onClick:b,disabled:x,className:"w-full sm:w-auto px-5 py-2.5 rounded-xl bg-shubban-green hover:bg-shubban-green-700 text-shubban-ivory font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50",children:[s.jsx(i.Z,{className:`w-4 h-4 ${x?"animate-spin":""}`}),s.jsx("span",{children:x?"ক্যাশ পরিষ্কার হচ্ছে...":"পুনরায় লোড করুন"})]}),(0,s.jsxs)(a.default,{href:"/",className:"w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200 dark:border-stone-700",children:[s.jsx(l.Z,{className:"w-4 h-4"}),s.jsx("span",{children:"হোমপেজে ফিরুন"})]})]}),(0,s.jsxs)("div",{className:"pt-2",children:[(0,s.jsxs)("button",{onClick:()=>h(!r),className:"text-[11px] text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 flex items-center justify-center gap-1 mx-auto transition-colors",children:[s.jsx(c.Z,{className:"w-3 h-3"}),(0,s.jsxs)("span",{children:["কারিগরি ত্রুটির বিবরণ ",r?"লুকান":"দেখুন"]}),r?s.jsx(d.Z,{className:"w-3 h-3"}):s.jsx(u.Z,{className:"w-3 h-3"})]}),r&&(0,s.jsxs)("div",{className:"mt-3 p-3 bg-stone-50 dark:bg-stone-900/80 rounded-xl text-left border border-stone-200 dark:border-stone-800 text-[11px] font-mono text-rose-600 dark:text-rose-400 overflow-x-auto max-h-36",children:[s.jsx("p",{className:"font-bold text-stone-700 dark:text-stone-300 mb-1",children:"Error Message:"}),s.jsx("p",{className:"break-all",children:e?.message||"Uncaught Application Exception"}),e?.digest&&(0,s.jsxs)("p",{className:"text-[10px] text-stone-400 mt-1",children:["Digest ID: ",e.digest]})]})]}),(0,s.jsxs)("div",{className:"pt-4 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 flex items-center justify-between px-2",children:[s.jsx("span",{children:"হেল্পলাইন: +৮৮০ ১৭১১-০০০০০০"}),s.jsx(a.default,{href:"/login",className:"text-shubban-gold hover:underline",children:"লগইন পেজ"})]})]})})}},88256:(e,t,r)=>{"use strict";r.d(t,{AuthProvider:()=>i,a:()=>l});var s=r(97247),n=r(28964),a=r(34178);let o=(0,n.createContext)(null);function i({children:e}){let[t,r]=(0,n.useState)(null),[i,l]=(0,n.useState)(!0),c=(0,a.useRouter)(),d=async()=>{try{let e=await fetch("/api/auth/me");if(e.ok){let t=await e.json();r(t.user)}else r(null)}catch(e){r(null)}finally{l(!1)}},u=async(e,t,s,n)=>{try{let a=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t,portal:s,redirect:n})}),o=await a.json();if(!a.ok)return{success:!1,error:o.error||"লগইন ব্যর্থ হয়েছে।"};return r(o.user),c.refresh(),{success:!0,user:o.user,redirectTo:o.redirectTo,workspaces:o.workspaces}}catch(e){return{success:!1,error:"সার্ভার যোগাযোগে সমস্যা হয়েছে।"}}},h=async(e,t,s,n)=>{try{let a=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t,password:s,phone:n})}),o=await a.json();if(!a.ok)return{success:!1,error:o.error||"নিবন্ধন ব্যর্থ হয়েছে।"};return r(o.user),c.refresh(),{success:!0,user:o.user}}catch(e){return{success:!1,error:"সার্ভার ত্রুটি।"}}},x=async()=>{try{await fetch("/api/auth/logout",{method:"POST"})}catch(e){console.error("Logout error:",e)}finally{r(null),c.push("/login"),c.refresh()}};return s.jsx(o.Provider,{value:{user:t,isLoading:i,login:u,register:h,logout:x,refreshUser:d,syncUser:e=>{r(t=>t?{...t,...e}:null)}},children:e})}function l(){let e=(0,n.useContext)(o);if(!e)throw Error("useAuth must be used within an AuthProvider");return e}},77739:(e,t,r)=>{"use strict";r.d(t,{CartProvider:()=>o,j:()=>i});var s=r(97247),n=r(28964);let a=(0,n.createContext)(null);function o({children:e}){let[t,r]=(0,n.useState)([]),[o,i]=(0,n.useState)("DHAKA_METRO"),[l,c]=(0,n.useState)(null),[d,u]=(0,n.useState)(0),[h,x]=(0,n.useState)(!1),m=(e,t,s)=>{let n=s||null;r(r=>r.filter(r=>!(r.id===e&&r.type===t&&(r.variantId||null)===n)))},b=t.reduce((e,t)=>e+t.price*t.quantity,0),f=t.some(e=>"PHYSICAL"===e.type),g=f&&b>=1500&&"DHAKA_METRO"===o,v=0;if(f&&0!==b){if(g)v=0;else switch(o){case"OUTSIDE_DHAKA":v=110;break;case"EXPRESS":v=130;break;default:v=60}}else v=0;let p=async e=>{let t=e.trim().toUpperCase();if(!t)return{success:!1,message:"কুপন কোড দিন।"};try{let e=await fetch("/api/coupons/validate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,subtotal:b})}),r=await e.json();if(e.ok&&r.valid)return c(r.code),u(r.discount),{success:!0,message:r.message};return{success:!1,message:r.error||"কুপনটি প্রযোজ্য নয়।"}}catch(e){return{success:!1,message:"কুপন যাচাই করতে সমস্যা হয়েছে।"}}},y=Math.max(0,b+v-d);return s.jsx(a.Provider,{value:{items:t,addItem:e=>{let t=e.quantity||1,s=e.variantId||null;r(r=>{let n=r.findIndex(t=>t.id===e.id&&t.type===e.type&&(t.variantId||null)===s);if(n>-1){let s=[...r],a=s[n].quantity+t,o=e.maxStock||s[n].maxStock;return s[n].quantity=o?Math.min(a,o):a,s}return[...r,{...e,variantId:s,quantity:t}]})},removeItem:m,updateQuantity:(e,t,s,n)=>{let a=n||null;if(s<=0){m(e,t,a);return}r(r=>r.map(r=>{if(r.id===e&&r.type===t&&(r.variantId||null)===a){let e=r.maxStock?Math.min(s,r.maxStock):s;return{...r,quantity:e}}return r}))},updateVariant:(e,t,s,n,a)=>{let o=t||null;r(t=>t.map(t=>t.id===e&&(t.variantId||null)===o?{...t,variantId:s,variantTitle:n,price:a}:t))},clearCart:()=>{r([]),c(null),u(0),localStorage.removeItem("shubban_cart_v2"),localStorage.removeItem("shubban_cart")},deliveryZone:o,setDeliveryZone:i,subtotal:b,shippingFee:v,discount:d,total:y,appliedCoupon:l,applyCoupon:p,removeCoupon:()=>{c(null),u(0)},isShippingFree:g},children:e})}function i(){let e=(0,n.useContext)(a);if(!e)throw Error("useCart must be used within a CartProvider");return e}},59027:(e,t,r)=>{"use strict";r.d(t,{F:()=>i,ThemeProvider:()=>o});var s=r(97247),n=r(28964);let a=(0,n.createContext)({theme:"light",toggleTheme:()=>{}});function o({children:e}){let[t,r]=(0,n.useState)("light"),[o,i]=(0,n.useState)(!1);return s.jsx(a.Provider,{value:{theme:t,toggleTheme:()=>{let e="light"===t?"dark":"light";r(e),localStorage.setItem("shubban_theme",e),"dark"===e?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}},children:e})}function i(){return(0,n.useContext)(a)}},49356:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(45347).createProxy)(String.raw`D:\Web Design\Ai website\Shubban Libery\src\app\error.tsx#default`)},71104:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h,dynamic:()=>d,metadata:()=>u});var s=r(72051);r(5023);var n=r(98252),a=r(45347);let o=(0,a.createProxy)(String.raw`D:\Web Design\Ai website\Shubban Libery\src\components\providers\ThemeProvider.tsx#ThemeProvider`);(0,a.createProxy)(String.raw`D:\Web Design\Ai website\Shubban Libery\src\components\providers\ThemeProvider.tsx#useTheme`);let i=(0,a.createProxy)(String.raw`D:\Web Design\Ai website\Shubban Libery\src\components\providers\AuthContext.tsx#AuthProvider`);(0,a.createProxy)(String.raw`D:\Web Design\Ai website\Shubban Libery\src\components\providers\AuthContext.tsx#useAuth`);let l=(0,a.createProxy)(String.raw`D:\Web Design\Ai website\Shubban Libery\src\components\providers\CartContext.tsx#CartProvider`);(0,a.createProxy)(String.raw`D:\Web Design\Ai website\Shubban Libery\src\components\providers\CartContext.tsx#useCart`);var c=r(92102);let d="force-dynamic",u={title:`${c.px} — ${c.K7}`,description:"শুব্বান লাইব্রেরী — ডিজিটাল লাইব্রেরী ও অনলাইন বুকশপ। মুদ্রিত ও ডিজিটাল বই, সাময়িকী, প্রবন্ধ, গবেষণাপত্র ও সমৃদ্ধ প্রশ্নোত্তর ফোরাম।",keywords:["শুব্বান লাইব্রেরী","ডিজিটাল লাইব্রেরী বাংলাদেশ","অনলাইন বইয়ের দোকান","বাংলা বই ডাউনলোড","বাংলা ই-বুক","গবেষণাপত্র","বাংলা সাময়িকী"],authors:[{name:"Shubban Library Editorial Council"}],icons:{icon:"/favicon.ico"},openGraph:{title:`${c.px} — ${c.K7}`,description:"বই, জ্ঞান ও মননশীলতার এক সমৃদ্ধ ঠিকানা। উন্মুক্ত ও প্রিমিয়াম ডিজিটাল লাইব্রেরী।",locale:"bn_BD",type:"website"}};function h({children:e}){return s.jsx("html",{lang:"bn",suppressHydrationWarning:!0,children:(0,s.jsxs)("body",{suppressHydrationWarning:!0,className:"min-h-screen flex flex-col font-bengali bg-shubban-ivory dark:bg-shubban-darkBg text-shubban-charcoal dark:text-stone-100 transition-colors",children:[s.jsx(n.default,{id:"extension-and-cache-guard",strategy:"beforeInteractive",dangerouslySetInnerHTML:{__html:`
              (function() {
                if (typeof window === 'undefined') return;

                function isExtensionErr(evt) {
                  try {
                    var msg = evt && (evt.message || (evt.reason && (evt.reason.message || evt.reason.stack)) || '');
                    var file = (evt && evt.filename) || '';
                    var stack = (evt && evt.error && evt.error.stack) || '';
                    var str = (String(msg) + ' ' + String(file) + ' ' + String(stack)).toLowerCase();
                    return (
                      str.indexOf('metamask') !== -1 ||
                      str.indexOf('nkbihfbeogaeaoehlefnkodbefgpgknn') !== -1 ||
                      str.indexOf('chrome-extension://') !== -1 ||
                      str.indexOf('moz-extension://') !== -1 ||
                      str.indexOf('inpage.js') !== -1
                    );
                  } catch (e) {
                    return false;
                  }
                }

                function isChunkOrFactoryErr(evt) {
                  try {
                    var msg = evt && (evt.message || (evt.reason && (evt.reason.message || evt.reason.stack)) || '');
                    var stack = (evt && evt.error && evt.error.stack) || '';
                    var str = (String(msg) + ' ' + String(stack)).toLowerCase();
                    return (
                      str.indexOf("reading 'call'") !== -1 ||
                      str.indexOf("reading \\"call\\"") !== -1 ||
                      str.indexOf("options.factory") !== -1 ||
                      str.indexOf("loading chunk") !== -1
                    );
                  } catch (e) {
                    return false;
                  }
                }

                function handleRuntimeErr(e) {
                  if (isExtensionErr(e)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return;
                  }
                  if (isChunkOrFactoryErr(e)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    console.warn('[Auto-Heal] Stale webpack chunk detected. Purging cache and auto-reloading...');
                    try {
                      if ('caches' in window) {
                        caches.keys().then(function(keys) {
                          keys.forEach(function(k) { caches.delete(k); });
                        });
                      }
                      if ('serviceWorker' in navigator && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
                        navigator.serviceWorker.getRegistrations().then(function(regs) {
                          regs.forEach(function(r) { r.unregister(); });
                        });
                      }
                    } catch(err) {}
                    var lastReload = sessionStorage.getItem('shubban_chunk_reload');
                    if (!lastReload || (Date.now() - parseInt(lastReload, 10)) > 6000) {
                      sessionStorage.setItem('shubban_chunk_reload', String(Date.now()));
                      window.location.reload();
                    }
                  }
                }

                window.addEventListener('error', handleRuntimeErr, true);
                window.addEventListener('unhandledrejection', handleRuntimeErr, true);

                // In development / localhost, proactively unregister any Service Workers and purge caches
                try {
                  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                    if ('serviceWorker' in navigator) {
                      navigator.serviceWorker.getRegistrations().then(function(regs) {
                        for (var i = 0; i < regs.length; i++) {
                          regs[i].unregister();
                        }
                      });
                    }
                    if ('caches' in window) {
                      caches.keys().then(function(keys) {
                        keys.forEach(function(key) {
                          caches.delete(key);
                        });
                      });
                    }
                  } else if ('caches' in window) {
                    caches.keys().then(function(keys) {
                      keys.forEach(function(key) {
                        if (key.indexOf('v1.0.0') !== -1 || key.indexOf('v1.0.1') !== -1) {
                          caches.delete(key);
                        }
                      });
                    });
                  }
                } catch(e) {}
              })();
            `}}),s.jsx(o,{children:s.jsx(i,{children:s.jsx(l,{children:e})})})]})})}},91884:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var s=r(72051);function n(){return(0,s.jsxs)("div",{className:"min-h-[50vh] flex flex-col items-center justify-center space-y-4 font-bengali",children:[s.jsx("div",{className:"w-10 h-10 border-4 border-shubban-green/20 border-t-shubban-green rounded-full animate-spin"}),s.jsx("p",{className:"text-xs text-stone-500 animate-pulse",children:"লোড হচ্ছে..."})]})}r(26269)},59198:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(72051);r(26269);var n=r(92349),a=r(89121),o=r(53189),i=r(96472);function l(){return s.jsx("div",{className:"min-h-[60vh] flex items-center justify-center px-4 font-bengali py-16",children:(0,s.jsxs)("div",{className:"max-w-md w-full bg-white dark:bg-shubban-darkCard rounded-3xl border border-stone-200 dark:border-stone-800 p-8 text-center shadow-xl space-y-6",children:[s.jsx("div",{className:"w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-shubban-gold mx-auto flex items-center justify-center border border-amber-200 dark:border-amber-800/60 shadow-sm",children:s.jsx(a.Z,{className:"w-8 h-8"})}),(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx("span",{className:"text-xs font-mono font-bold text-shubban-gold uppercase tracking-wider",children:"৪০৪ • পৃষ্ঠাটি পাওয়া যায়নি"}),s.jsx("h2",{className:"font-serif font-bold text-2xl text-stone-900 dark:text-stone-100",children:"কাঙ্ক্ষিত পৃষ্ঠাটি বিদ্যমান নেই"}),s.jsx("p",{className:"text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed",children:"আপনি যে ঠিকানাটি খুঁজছেন তা মুছে ফেলা হয়ে থাকতে পারে, অথবা এর লিংক পরিবর্তিত হয়েছে।"})]}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-3 pt-2",children:[(0,s.jsxs)(n.default,{href:"/",className:"w-full sm:w-auto px-5 py-2.5 rounded-xl bg-shubban-green hover:bg-shubban-green-700 text-shubban-ivory font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md",children:[s.jsx(o.Z,{className:"w-4 h-4"}),s.jsx("span",{children:"হোমপেজে ফিরুন"})]}),(0,s.jsxs)(n.default,{href:"/books",className:"w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200 dark:border-stone-700",children:[s.jsx(i.Z,{className:"w-4 h-4"}),s.jsx("span",{children:"বইয়ের ক্যাটালগ"})]})]})]})})}},92102:(e,t,r)=>{"use strict";r.d(t,{K7:()=>n,px:()=>s});let s="শুব্বান লাইব্রেরী",n="বই, জ্ঞান ও মননশীলতার এক সমৃদ্ধ ঠিকানা"},5023:()=>{}};