/* Dookie Dogs — shared quote-engine config for static pages that embed <window.QuoteFlowV3 />.
   EDIT the four values below to go live: lead endpoint, Stripe links, Meta Pixel, GA4. */
const SHEET_ENDPOINT = "";
const STRIPE_LINKS = {};
const META_PIXEL_ID  = "";
const GA_ID          = "";
const LP_VARIANT     = "v3-instantquote-page";
const PHONE = "270-266-1818", PHONE_RAW = "2702661818";
const FB = "https://www.facebook.com/dookiedogs/";
const GOOGLE = "https://maps.app.goo.gl/hj6cc3kmKZGWEeCs6";
const RATING = "5.0", REVIEW_COUNT = "25";
const DD_PREVIEW = !SHEET_ENDPOINT;
const STD_META = { ViewContent:1, Lead:1, CompleteRegistration:1, Contact:1, InitiateCheckout:1, Purchase:1, Schedule:1 };
function ddTrack(event, params){
  const p = Object.assign({ lp_variant: LP_VARIANT }, params||{});
  try { if(window.fbq){ STD_META[event] ? fbq('track', event, p) : fbq('trackCustom', event, p); } } catch(e){}
  try { if(window.gtag) gtag('event', event, p); } catch(e){}
  try { window.dataLayer && window.dataLayer.push(Object.assign({ event }, p)); } catch(e){}
  if(!window.fbq && !window.gtag) console.info('[track]', event, p);
}
function ddGetUTM(){
  const q = new URLSearchParams(window.location.search);
  const keep = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid'];
  const out = { lp_variant: LP_VARIANT, source_url: window.location.href, referrer: document.referrer||"" };
  keep.forEach(k=>{ const v=q.get(k); if(v) out[k]=v; });
  try { const s=JSON.parse(sessionStorage.getItem('dd_utm')||'{}'); Object.keys(s).forEach(k=>{ if(!out[k]) out[k]=s[k]; }); } catch(e){}
  try { sessionStorage.setItem('dd_utm', JSON.stringify(out)); } catch(e){}
  return out;
}
function ddSend(payload){
  if(!SHEET_ENDPOINT){
    console.warn("[Dookie Dogs] PREVIEW MODE — no live lead endpoint configured. This lead was NOT delivered:", payload);
    return Promise.resolve({ ok:true, preview:true });
  }
  return fetch(SHEET_ENDPOINT, { method:"POST", body:new URLSearchParams(payload) })
    .then(r => r.ok ? r.json().catch(()=>({ok:true})) : Promise.reject(new Error("HTTP "+r.status)))
    .then(d => (d && d.ok===false) ? { ok:false, error:d.error||"rejected" } : { ok:true, row:d&&d.row })
    .catch(e => ({ ok:false, error:String(e&&e.message||e) }));
}
function ddStripeLink(freq, dogs, yard, en){
  const base = STRIPE_LINKS[`${freq}|${dogs}|${yard}`] || STRIPE_LINKS[`${freq}|${dogs}`];
  if(!base) return null;
  const u = new URL(base);
  if(en && en.email) u.searchParams.set('prefilled_email', en.email);
  u.searchParams.set('client_reference_id', 'dd_'+Date.now().toString(36));
  return u.toString();
}
function seeMyPrice(){
  const el = document.getElementById('quote'); if(!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior:'smooth' });
  const f = el.querySelector('input,select,button.schd'); if(f) setTimeout(()=>f.focus({preventScroll:true}), 500);
}
function pickPlan(plan){ try{ window.dispatchEvent(new CustomEvent('dd:plan',{detail:plan})); }catch(e){} seeMyPrice(); }
Object.assign(window, { ddTrack, ddGetUTM, ddSend, ddStripeLink, seeMyPrice, pickPlan, DD_PREVIEW, PHONE, PHONE_RAW, FB, GOOGLE, RATING, REVIEW_COUNT });
