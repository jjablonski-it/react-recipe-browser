if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,t,i)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const r={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return n;case"module":return r;default:return e(s)}}))).then((e=>{const s=i(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-a8b10d99"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/CSxsTPcYCdVp1WzYZF7t4/_buildManifest.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/CSxsTPcYCdVp1WzYZF7t4/_ssgManifest.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/05d954cf.c12ecafb055b73195b03.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.7dc75dcb34fdd74e76c7.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/commons.dff264e41f1c66f25269.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.e5164308259ed7a5608e.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/framework.114f113ec24c188975ca.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/main-8822e9503c77a4a61c7b.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/pages/_app-98fc8670e0daf156f066.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/pages/_error-a894c7508e9495ffe67e.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/pages/index-5d0dad855a55f4fa0b59.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/polyfills-144e5fa6fafab6397d9c.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/_next/static/css/6e9ef204d6fd7ac61493.css",revision:"CSxsTPcYCdVp1WzYZF7t4"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/icon-192x192.png",revision:"6f17c11b2d31740b3e378648bb4d98fb"},{url:"/icon-256x256.png",revision:"3be133b48a35a48ec3791cee02e7b80c"},{url:"/icon-384x384.png",revision:"b8823286ea97cb807da08e95921f7bae"},{url:"/icon-512x512.png",revision:"1c72c312f57d0077b8f36005ed7e0659"},{url:"/manifest.json",revision:"7208026ab6bd6bd559f96b4039779956"},{url:"/manifest.webmanifest",revision:"1cffc72ea9d50742b98e7473bd560af2"},{url:"/manifest.zip",revision:"449a952f92ad8fb939d6030447c63960"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
