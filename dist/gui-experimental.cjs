"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("solid-js/web"),i=require("solid-js"),G=require("@opencode/plugin/gui"),Ue=require("@opencode/plugin/rpc"),he={type:"object",properties:{sessionID:{type:"string"}},required:["sessionID"],additionalProperties:!1},N={type:"object",properties:{sessionID:{type:"string"},mode:{type:"string",enum:["auto","accept-edits","default","plan"]},codeModeEnabled:{type:"boolean"},starting:{type:"boolean"},acpSessionId:{anyOf:[{type:"string"},{type:"null"}]},connected:{type:"boolean"},busy:{type:"boolean"},modelCount:{type:"number"},relayedToolCount:{type:"number"},lastError:{anyOf:[{type:"string"},{type:"null"}]},cooldownUntil:{anyOf:[{type:"number"},{type:"null"}]}},required:["sessionID","mode","codeModeEnabled","starting","acpSessionId","connected","busy","modelCount","relayedToolCount","lastError","cooldownUntil"],additionalProperties:!1},Be=Ue.Rpc.define({id:"antigravity-acp",methods:{getState:{input:he,output:N},setMode:{input:{type:"object",properties:{sessionID:{type:"string"},mode:{type:"string",enum:["auto","accept-edits","default","plan"]}},required:["sessionID","mode"],additionalProperties:!1},output:N},setCodeMode:{input:{type:"object",properties:{sessionID:{type:"string"},codeModeEnabled:{type:"boolean"}},required:["sessionID","codeModeEnabled"],additionalProperties:!1},output:N},resetSession:{input:he,output:N},warmSession:{input:{type:"object",properties:{sessionID:{type:"string"}},additionalProperties:!1},output:N},reloadModels:{input:{type:"object",properties:{},additionalProperties:!1},output:{type:"object",properties:{modelCount:{type:"number"}},required:["modelCount"],additionalProperties:!1}}},events:{}});var Le=t.template("<div class=agy-pop><div class=agy-status><div class=agy-status-main><span class=agy-dot aria-hidden=true></span><span class=agy-status-text></span></div><div class=agy-meta-chips><span class=agy-chip></span></div></div><div class=agy-sec><div class=agy-sec-head><span class=agy-sec-title>Approval mode</span></div><div role=group class=agy-mode-grid></div><p class=agy-hint></p></div><div class=agy-sec><div class=agy-sec-head><span class=agy-sec-title>ACP mode</span><span class=agy-sec-badge></span></div><div role=group class=agy-bridge-seg><button type=button class=agy-bridge-btn><span>Pure ACP</span></button><button type=button class=agy-bridge-btn><span>+ Code Mode</span></button></div><p class=agy-hint></p></div><div class=agy-actions>"),He=t.template("<div role=alert class=agy-alert><span class=agy-alert-icon aria-hidden=true></span><span class=agy-alert-body>"),Ge=t.template("<span class=agy-check-icon aria-hidden=true>"),Ne=t.template("<button type=button class=agy-seg-btn><span>");const Je="antigravity-acp",xe=1e4,J={auto:"Auto","accept-edits":"Accept edits",default:"Ask",plan:"Plan"},re=[{id:"auto",label:"Auto",detail:"Approves edits and shell commands automatically."},{id:"accept-edits",label:"Accept edits",detail:"Approves file edits; prompts before shell commands."},{id:"default",label:"Ask",detail:"Prompts before file edits and shell commands."},{id:"plan",label:"Plan",detail:"Creates a plan before executing changes."}];function ne(n){if(n instanceof Error)return n.message;if(typeof n=="string")return n;try{const y=JSON.stringify(n);return y===void 0?String(n):y}catch{return String(n)}}const Ke=`
.agy-pop {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2px 4px 4px;
  box-sizing: border-box;
  color: var(--v2-text-text-base, #fafafa);
  font-family: var(--v2-font-family-sans, ui-sans-serif, system-ui, -apple-system, sans-serif);
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.04px;
  font-variant-numeric: tabular-nums;
}

.agy-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 9px;
  border-radius: 7px;
  background: var(--v2-background-bg-base, #161616);
  border: 0.5px solid var(--v2-border-border-muted, rgba(255, 255, 255, 0.08));
}

.agy-status-main {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.agy-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 999px;
  background: var(--v2-text-text-faint, #777777);
}
.agy-dot[data-state="connected"] { background: var(--v2-state-fg-success, #4ade80); }
.agy-dot[data-state="busy"] {
  background: var(--v2-state-fg-info, #60a5fa);
  animation: agy-pulse 1.5s ease-in-out infinite;
}
.agy-dot[data-state="cooldown"] { background: var(--v2-state-fg-warning, #f59e0b); }
.agy-dot[data-state="error"] { background: var(--v2-state-fg-danger, #f87171); }

@keyframes agy-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.42; }
}
:root[data-motion="reduce"] .agy-dot[data-state="busy"] { animation: none; }
@media (prefers-reduced-motion: reduce) {
  .agy-dot[data-state="busy"] { animation: none; }
}

.agy-status-text {
  font-size: 12.5px;
  font-weight: 530;
  color: var(--v2-text-text-base, #fafafa);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.agy-meta-chips {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.agy-chip {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 5px;
  background: var(--v2-background-bg-layer-02, #2e2e2e);
  color: var(--v2-text-text-muted, #aeaeae);
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
}

.agy-alert {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  padding: 7px 9px;
  border-radius: 7px;
  font-size: 12px;
  line-height: 16px;
  word-break: break-word;
  border: 0.5px solid var(--v2-state-border-danger, rgba(248, 113, 113, 0.3));
  background: var(--v2-state-bg-danger, rgba(127, 29, 29, 0.35));
  color: var(--v2-state-fg-danger, #fca5a5);
}
.agy-alert[data-tone="warning"] {
  border-color: var(--v2-state-border-warning, rgba(245, 158, 11, 0.35));
  background: var(--v2-state-bg-warning, rgba(120, 53, 15, 0.35));
  color: var(--v2-state-fg-warning, #fcd34d);
}
.agy-alert-icon {
  flex-shrink: 0;
  margin-top: 1px;
}
.agy-alert-body {
  min-width: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.agy-sec {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.agy-sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.agy-sec-title {
  font-size: 11px;
  font-weight: 530;
  line-height: 15px;
  color: var(--v2-text-text-faint, #888888);
  user-select: none;
}

.agy-sec-badge {
  font-size: 11px;
  font-weight: 500;
  line-height: 15px;
  color: var(--v2-text-text-muted, #aeaeae);
}

.agy-mode-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 5px;
}

.agy-seg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  min-block-size: 30px;
  padding: 5px 9px;
  border-radius: 6px;
  border: 0.5px solid var(--v2-border-border-muted, rgba(255, 255, 255, 0.08));
  background: var(--v2-background-bg-base, #161616);
  color: var(--v2-text-text-muted, #aeaeae);
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 480;
  line-height: 16px;
  text-align: left;
  cursor: pointer;
  transition: background-color 100ms ease, border-color 100ms ease, color 100ms ease;
}
.agy-seg-btn:hover:not(:disabled, [aria-pressed="true"]) {
  background: var(--v2-overlay-simple-overlay-hover, rgba(255, 255, 255, 0.06));
  color: var(--v2-text-text-base, #fafafa);
}
.agy-seg-btn[aria-pressed="true"] {
  background: var(--v2-background-bg-layer-02, #2e2e2e);
  border-color: var(--v2-border-border-strong, rgba(255, 255, 255, 0.2));
  color: var(--v2-text-text-base, #fafafa);
  font-weight: 540;
}
.agy-seg-btn[aria-pressed="true"] .agy-check-icon {
  color: var(--v2-state-fg-success, #4ade80);
}
.agy-seg-btn:focus-visible {
  outline: 2px solid var(--v2-border-border-focus, #3b82f6);
  outline-offset: 1px;
}
.agy-seg-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.agy-bridge-seg {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3px;
  padding: 3px;
  border-radius: 7px;
  background: var(--v2-background-bg-base, #161616);
  border: 0.5px solid var(--v2-border-border-muted, rgba(255, 255, 255, 0.08));
}

.agy-bridge-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-block-size: 28px;
  padding: 4px 8px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: var(--v2-text-text-muted, #aeaeae);
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 100ms ease, color 100ms ease;
}
.agy-bridge-btn:hover:not(:disabled, [aria-pressed="true"]) {
  background: var(--v2-overlay-simple-overlay-hover, rgba(255, 255, 255, 0.06));
  color: var(--v2-text-text-base, #fafafa);
}
.agy-bridge-btn[aria-pressed="true"] {
  background: var(--v2-background-bg-layer-02, #2e2e2e);
  color: var(--v2-text-text-base, #fafafa);
  box-shadow: var(--v2-elevation-elements, inset 0 0 0 0.5px rgba(255, 255, 255, 0.14));
  font-weight: 540;
}
.agy-bridge-btn:focus-visible {
  outline: 2px solid var(--v2-border-border-focus, #3b82f6);
  outline-offset: 1px;
}
.agy-bridge-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.agy-hint {
  margin: 0;
  font-size: 11.5px;
  line-height: 15px;
  color: var(--v2-text-text-muted, #9a9a9a);
}

.agy-actions {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
  padding-top: 8px;
  border-top: 0.5px solid var(--v2-border-border-muted, rgba(255, 255, 255, 0.08));
}

.agy-action-btn {
  width: 100%;
  min-width: 0;
  justify-content: center;
}
`,Ve=G.Plugin.define({setup(n){n.add(G.Style,Ke);const y=()=>n.client.rpc(Be),X=new Map,K=new Set,z=new Set,j=new Map,S=new Set,R=new Map,q=new Map,V=new Map,Q=new Map,O=new Map,T=e=>{const r=(V.get(e)??0)+1;return V.set(e,r),r},P=e=>{let r=X.get(e);return r||(r=i.createSignal(void 0),X.set(e,r)),r},k=e=>({...e?{location:{directory:e}}:{},signal:n.signal}),F=(e,r,s)=>{if(s!==void 0){const b=Q.get(e)??0;if(s<b)return;Q.set(e,s)}else Q.set(e,V.get(e)??0);const[c,u]=P(e),d=i.untrack(c);K.add(e),j.delete(e),u(r),d?.starting&&!r.starting&&!r.connected&&S.delete(e),r.starting||q.delete(e),r.starting&&!n.signal.aborted&&i.untrack(()=>Y(e,void 0))},U=(e,r,s=!1)=>{if(!e||n.signal.aborted)return Promise.resolve();if(!s){if(K.has(e)||z.has(e))return Promise.resolve();const d=j.get(e);if(d!==void 0&&Date.now()-d<xe)return Promise.resolve()}const c=T(e);z.add(e);const u=y().getState({sessionID:e},k(r)).then(d=>{n.signal.aborted||F(e,d,c)}).catch(()=>{j.set(e,Date.now())}).finally(()=>{z.delete(e)});return O.set(e,u),u.finally(()=>{O.get(e)===u&&O.delete(e)}),u},we=(e,r)=>{if(!e||K.has(e)||z.has(e))return;const s=j.get(e);s!==void 0&&Date.now()-s<xe||queueMicrotask(()=>{i.untrack(()=>U(e,r,!1))})},Ce=(e,r)=>{if(!e||n.signal.aborted)return;if(S.has(e)){const c=i.untrack(()=>P(e)[0]());if(c?.connected||c?.starting)return;S.delete(e)}S.add(e);const s=T(e);y().warmSession({sessionID:e},k(r)).then(c=>{n.signal.aborted||(!c.starting&&!c.connected&&S.delete(e),F(e,c,s))}).catch(()=>{S.delete(e)})},Y=(e,r)=>{if(!e||n.signal.aborted||R.has(e))return;const s=q.get(e)??0;q.set(e,s+1);const c=Math.min(1500*Math.pow(2,s),12e3);R.set(e,setTimeout(()=>{if(R.delete(e),n.signal.aborted)return;if(!i.untrack(()=>P(e)[0]())?.starting){q.delete(e);return}const d=()=>U(e,r,!0),b=O.get(e);(b?b.then(d,d):d()).finally(()=>{if(n.signal.aborted)return;i.untrack(()=>P(e)[0]())?.starting&&i.untrack(()=>Y(e,r))})},c))};function Se(e){const r=i.createUniqueId(),[s,c]=i.createSignal(null),[u,d]=i.createSignal(!1),[b,B]=i.createSignal(!1),[x,f]=i.createSignal(null),[ke,ie]=i.createSignal(Date.now()),L=()=>e.session.id,W=()=>e.session.directory,w=()=>P(L())[0]();i.createEffect(()=>{const a=L(),o=W();i.untrack(()=>U(a,o,!0))}),i.createEffect(()=>{const a=w()?.cooldownUntil;if(!a||a<=Date.now())return;ie(Date.now());const o=setInterval(()=>{const g=Date.now();ie(g),g>=a&&clearInterval(o)},1e3);i.onCleanup(()=>clearInterval(o))});const Z=()=>w()?.mode??"auto",$=()=>w()?.codeModeEnabled??!0,Ae=()=>re.find(a=>a.id===Z())??re[0],I=()=>{const a=w()?.cooldownUntil;if(!a)return 0;const o=a-ke();return o>0?Math.ceil(o/1e3):0},Me=()=>{const a=w();return a?.busy||a?.starting?"busy":I()>0?"cooldown":a?.lastError?"error":a?.connected?"connected":"idle"},Pe=()=>{const a=w();if(a?.busy)return"Running";if(a?.starting)return"Starting...";const o=I();return o>0?`Cooldown · ${o}s`:a?.lastError?"Error":a?.connected?"Connected":"Standby"},$e=()=>{const a=x();if(a)return{tone:"danger",text:a};const o=I(),g=w();if(o>0)return{tone:"warning",text:`Circuit breaker paused requests for ${o}s after upstream API error${g?.lastError?`: ${g.lastError}`:"."}`};if(g?.lastError)return{tone:"danger",text:g.lastError}},se=()=>{const a=w();return a?a.codeModeEnabled?a.relayedToolCount>0?`Code Mode (${a.relayedToolCount})`:"Code Mode":"Pure ACP":"Code Mode"},Ee=async a=>{if(s()!==null||Z()===a)return;const o=L(),g=W();f(null),c(a);const E=T(o);try{const C=await y().setMode({sessionID:o,mode:a},k(g));F(o,C,E)}catch(C){f(ne(C))}finally{c(null)}},de=async a=>{if(u()||$()===a)return;const o=L(),g=W();f(null),d(!0);const E=T(o);try{const C=await y().setCodeMode({sessionID:o,codeModeEnabled:a},k(g));F(o,C,E),n.toast.show({title:"ACP mode updated",description:a?"Code Mode MCP attached (single 'oc' server, switching reconnects with a plain-text handoff of conversation context)":"Pure ACP — 100% native agy acp, zero bridged MCPs (switching reconnects with a plain-text handoff of conversation context)",variant:"success"})}catch(C){f(ne(C))}finally{d(!1)}},_e=async()=>{if(b())return;const a=L(),o=W();f(null),B(!0);try{const g=await y().reloadModels({},k(o));U(a,o,!0),n.toast.show({title:"Antigravity models refreshed",description:`${g.modelCount} models available`,variant:"success"})}catch(g){f(ne(g))}finally{B(!1)}},le=`${r}-mode`,ce=`${r}-mode-hint`,ge=`${r}-bridge`,D=`${r}-bridge-hint`;return(()=>{var a=Le(),o=a.firstChild,g=o.firstChild,E=g.firstChild,C=E.nextSibling,ze=g.nextSibling,je=ze.firstChild,ee=o.nextSibling,ue=ee.firstChild,Re=ue.firstChild,te=ue.nextSibling,pe=te.nextSibling,be=ee.nextSibling,fe=be.firstChild,ve=fe.firstChild,qe=ve.nextSibling,ae=fe.nextSibling,A=ae.firstChild,Oe=A.firstChild,_=A.nextSibling,Te=_.firstChild,ye=ae.nextSibling,Fe=be.nextSibling;return t.insert(C,Pe),t.insert(je,se),t.insert(a,t.createComponent(i.Show,{get when(){return $e()},children:l=>(()=>{var m=He(),M=m.firstChild,v=M.nextSibling;return t.insert(M,t.createComponent(n.ui.Icon,{get name(){return l().tone==="warning"?"warning":"circle-exclamation"},size:"small"})),t.insert(v,()=>l().text),t.effect(h=>{var p=l().tone,H=l().text;return p!==h.e&&t.setAttribute(m,"data-tone",h.e=p),H!==h.t&&t.setAttribute(m,"title",h.t=H),h},{e:void 0,t:void 0}),m})()}),ee),t.setAttribute(Re,"id",le),t.setAttribute(te,"aria-labelledby",le),t.insert(te,t.createComponent(i.For,{each:re,children:l=>{const m=()=>Z()===l.id,M=()=>s()===l.id;return(()=>{var v=Ne(),h=v.firstChild;return v.$$click=()=>{Ee(l.id)},t.setAttribute(v,"aria-describedby",ce),t.insert(h,()=>l.label),t.insert(v,t.createComponent(i.Show,{get when(){return!M()},get fallback(){return t.createComponent(n.ui.Loader,{size:"small"})},get children(){return t.createComponent(i.Show,{get when(){return m()},get children(){var p=Ge();return t.insert(p,t.createComponent(n.ui.Icon,{name:"check-small",size:"small"})),p}})}}),null),t.effect(p=>{var H=m(),me=s()!==null;return H!==p.e&&t.setAttribute(v,"aria-pressed",p.e=H),me!==p.t&&(v.disabled=p.t=me),p},{e:void 0,t:void 0}),v})()}})),t.setAttribute(pe,"id",ce),t.insert(pe,()=>Ae().detail),t.setAttribute(ve,"id",ge),t.insert(qe,se),t.setAttribute(ae,"aria-labelledby",ge),A.$$click=()=>{de(!1)},t.setAttribute(A,"aria-describedby",D),t.insert(A,t.createComponent(i.Show,{get when(){return t.memo(()=>!!u())()&&$()},get children(){return t.createComponent(n.ui.Loader,{size:"small"})}}),Oe),_.$$click=()=>{de(!0)},t.setAttribute(_,"aria-describedby",D),t.insert(_,t.createComponent(i.Show,{get when(){return t.memo(()=>!!u())()&&!$()},get children(){return t.createComponent(n.ui.Loader,{size:"small"})}}),Te),t.setAttribute(ye,"id",D),t.insert(ye,()=>$()?"Code Mode default: attaches only the single 'oc' Code Mode MCP server (zero prompt injection; switching reconnects with a plain-text handoff of conversation context).":"Pure ACP opt-out: mcpServers [], zero bridged MCPs, 100% native agy acp (switching reconnects with a plain-text handoff of conversation context)."),t.insert(Fe,t.createComponent(n.ui.Button,{size:"small",variant:"neutral",icon:"refresh",get busy(){return b()},class:"agy-action-btn",onClick:()=>{_e()},get children(){return`Models (${w()?.modelCount??9})`}})),t.effect(l=>{var m=Me(),M=!$(),v=u(),h=$(),p=u();return m!==l.e&&t.setAttribute(E,"data-state",l.e=m),M!==l.t&&t.setAttribute(A,"aria-pressed",l.t=M),v!==l.a&&(A.disabled=l.a=v),h!==l.o&&t.setAttribute(_,"aria-pressed",l.o=h),p!==l.i&&(_.disabled=l.i=p),l},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),a})()}n.add(G.ComposerPill,{id:"controls",order:-10,show(e){if(e.screen.composer.model()?.providerID!==Je)return;const s=e.session.id,c=e.session.directory,[u]=i.untrack(()=>P(s));we(s,c),i.untrack(()=>Ce(s,c));const d=u(),b=d?.mode??"auto",B=!!(d?.cooldownUntil&&d.cooldownUntil>Date.now());d?.starting&&i.untrack(()=>Y(s,c));let x=`ACP · ${J[b]}`,f;return d?.busy?(x=`ACP · ${J[b]} · Running`,f="success"):d?.starting?x=`ACP · ${J[b]} · Starting...`:B?(x="ACP · Cooldown",f="warning"):d?.lastError?(x=`ACP · ${J[b]} · Error`,f="danger"):d?.connected&&(x=`ACP · ${J[b]} · Connected`,f="success"),{icon:"brain",label:x,title:"Antigravity ACP",tone:f}},menu:e=>Se(e)});const oe=()=>{const e=n.sessions.current();if(!e)return;const r=e.directory??e.location?.directory;return{sessionID:e.id,directory:r}};return n.add(G.Command,()=>({id:"reset",title:"Antigravity ACP: Reset Session",section:"session",slash:{name:"agy-reset"},run:async()=>{const e=oe();if(!e)return;const r=T(e.sessionID),s=await y().resetSession({sessionID:e.sessionID},k(e.directory));F(e.sessionID,s,r),n.toast.show({title:"Antigravity ACP session reset",variant:"success"})}})),n.add(G.Command,()=>({id:"reload",title:"Antigravity ACP: Reload Models",section:"model",slash:{name:"agy-reload"},run:async()=>{const e=oe(),r=await y().reloadModels({},k(e?.directory));e&&U(e.sessionID,e.directory,!0),n.toast.show({title:"Antigravity models refreshed",description:`${r.modelCount} models available`,variant:"success"})}})),()=>{X.clear(),K.clear(),z.clear(),j.clear(),S.clear(),V.clear(),Q.clear(),O.clear();for(const e of R.values())clearTimeout(e);R.clear(),q.clear()}}});t.delegateEvents(["click"]);exports.default=Ve;
