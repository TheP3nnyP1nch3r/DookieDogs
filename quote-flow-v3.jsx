/* ============================================================
   DOOKIE DOGS — QUOTE FLOW ENGINE v3
   6 screens: service area → yard details → schedule → mobile
   number (mandatory before price) → price → enrollment.
   ------------------------------------------------------------
   >>> EDIT THE RATE TABLE + SERVICE ZIPS BELOW to match real
   >>> operating prices. Everything else derives from them.
   ============================================================ */
const SERVICE_ZIPS = {
  "42101": "Bowling Green", "42102": "Bowling Green", "42103": "Bowling Green",
  "42104": "Bowling Green", "42122": "Alvaton", "42134": "Franklin",
  "42135": "Franklin", "42206": "Auburn", "42274": "Rockfield",
};
const RATES = {
  base:    { Weekly: 20.77, Biweekly: 37.13 },
  perDog:  7.50,
  yardAdj: { "Specified area": 0, "Average": 0, "Large": 0, "Not sure": 0 },
};
const RESET_FEE = 50;
const YARD_CUSTOM = ["Over 1 acre"];
const RESET_FLAG = ["3–4 weeks ago", "More than one month ago", "Not sure"];

function ddPrice(freq, dogs, yard){
  if(!freq) return null;
  if(dogs === '5+') return null;
  if(YARD_CUSTOM.includes(yard)) return null;
  const base = RATES.base[freq];
  const n = parseInt(dogs, 10);
  if(base == null || !n) return null;
  const perVisit = base + RATES.perDog * (n - 1) + (RATES.yardAdj[yard] || 0);
  return { perVisit: perVisit.toFixed(2) };
}

function QuoteFlowV3(){
  const { useState, useEffect, useRef } = React;
  const { Button, Input, Badge, Card } = window.DookieDogsDesignSystem_0a43c6;
  const track = window.ddTrack, getUTM = window.ddGetUTM;

  const [step, setStep] = useState(1);
  const [zip, setZip] = useState("");
  const [area, setArea] = useState(null);
  const [dogs, setDogs] = useState("");
  const [yard, setYard] = useState("");
  const [last, setLast] = useState("");
  const [freq, setFreq] = useState(null);
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [wl, setWl] = useState({ name:"", phone:"", done:false });
  const [custom, setCustom] = useState({ sent:false });
  const [enroll, setEnroll] = useState({ first:"", last:"", address:"", phone:"", email:"", access:"", dogOut:"Dogs will be inside", consent:false, marketing:false });
  const [sending, setSending] = useState(false);
  const [sendFail, setSendFail] = useState(null);
  const [oneTime, setOneTime] = useState(false);
  const [redir, setRedir] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const lastPayload = useRef(null);
  const started = useRef(false);
  const priceSeen = useRef(false);
  const topRef = useRef(null);

  useEffect(()=>{ const t=setTimeout(()=>window.lucide&&window.lucide.createIcons(),30); return ()=>clearTimeout(t); },[step, area, wl.done, custom.sent, enrolled]);
  useEffect(()=>{
    const h = e => { setFreq(e.detail === 'Biweekly' ? 'Biweekly' : 'Weekly'); };
    window.addEventListener('dd:plan', h); return ()=>window.removeEventListener('dd:plan', h);
  },[]);
  useEffect(()=>{
    const h = ()=>{ setOneTime(true); setStep(1); };
    window.addEventListener('dd:onetime', h); return ()=>window.removeEventListener('dd:onetime', h);
  },[]);
  useEffect(()=>{
    // fires once when the standard price screen actually renders
    const price = ddPrice(freq, dogs, yard);
    if(step===5 && price && !oneTime && !priceSeen.current){
      priceSeen.current = true;
      track('PriceViewed', { stage:'price_viewed', plan:freq, value:Number(price.perVisit), currency:'USD' });
    }
  },[step, freq, dogs, yard, oneTime]);

  function deliver(payload, onOk){
    setSending(true); setSendFail(null); lastPayload.current = { payload, onOk };
    return window.ddSend(payload).then(res=>{
      setSending(false);
      if(res && res.ok){ setSendFail(null); onOk(res); }
      else setSendFail((res&&res.error)||"unknown");
      return res;
    });
  }
  function retry(){ const l = lastPayload.current; if(l) deliver(l.payload, l.onOk); }

  const FailNote = () => sendFail ? (
    <div className="qwarn"><i data-lucide="alert-triangle" style={{width:18,height:18}}></i>
      <div><b>We couldn't save that just yet.</b>Your answers are still here — nothing was lost.{' '}
        <button type="button" className="qlink" style={{display:'inline',margin:0,padding:0}} onClick={retry}>Try again</button>{' '}
        or text us at <a href={"sms:"+window.PHONE_RAW}>{window.PHONE}</a> and we'll set it up by hand.</div>
    </div>
  ) : null;

  function first(){ if(!started.current){ started.current=true; track('QuoteStarted', { stage:'quote_started' }); } }
  function go(n){ setErr(""); setStep(n); }

  const price = ddPrice(freq, dogs, yard);
  const needsReset = RESET_FLAG.includes(last);
  const isCustom = oneTime || !price;

  /* -- step 1: area ------------------------------------------------------ */
  function checkArea(e){
    e.preventDefault();
    const z = zip.replace(/\D/g,'');
    if(z.length !== 5){ setErr("Please enter your 5-digit ZIP code."); return; }
    const city = SERVICE_ZIPS[z];
    setArea({ ok: !!city, city: city || null });
    if(city){ track('ServiceAreaConfirmed', { stage:'service_area_eligible', zip:z, city }); go(2); }
    else { track('ServiceAreaMissed', { zip:z }); setErr(""); }
  }
  function joinWaitlist(e){
    e.preventDefault();
    if(sending) return;
    if(!wl.name.trim() || wl.phone.replace(/\D/g,'').length<10){ setErr("Add your name and a valid phone number."); return; }
    setErr("");
    const payload = Object.assign({ type:"waitlist", first_name:wl.name.trim(), phone:wl.phone, zip, submitted_at:new Date().toISOString() }, getUTM());
    deliver(payload, ()=>{ track('Lead', { kind:'waitlist', zip }); setWl(w=>({ ...w, done:true })); });
  }

  /* -- step 2: yard (no phone) --------------------------------------------- */
  function submitYard(e){
    e.preventDefault();
    if(!dogs){ setErr("How many dogs use the yard?"); return; }
    if(!yard){ setErr("Roughly how large is the service area?"); return; }
    if(!last){ setErr("When was it last thoroughly cleaned?"); return; }
    setErr("");
    track('YardDetails', { dogs, yard, last });
    go(3);
  }

  /* -- step 3: schedule ---------------------------------------------------- */
  function chooseFreq(f){ setFreq(f); track('PlanSelected', { plan:f, dogs, yard, zip }); go(4); }

  /* -- step 4: mandatory phone capture -------------------------------------- */
  function submitPhone(e){
    e.preventDefault();
    if(sending) return;
    if(phone.replace(/\D/g,'').length<10){ setErr("Please enter a valid mobile number."); return; }
    setErr("");
    const payload = Object.assign({ type: isCustom ? "custom_quote_lead" : "quote_lead", phone, zip, city:area&&area.city,
      dogs, yard_size:yard, last_cleaned:last, schedule:freq, intent: oneTime ? "one_time_reset" : "recurring",
      price_per_visit: price ? price.perVisit : "", reset_flag: needsReset ? "yes" : "no",
      stage:"quote_lead_captured", submitted_at:new Date().toISOString() }, getUTM());
    deliver(payload, ()=>{
      track('Lead', { stage:'quote_lead_captured', kind: isCustom ? 'custom_quote' : 'quote_lead' });
      setEnroll(en=>({ ...en, phone }));
      go(5);
    });
  }

  /* -- step 5: custom quote request (phone already captured) --------------- */
  function requestCustomQuote(){
    if(sending || custom.sent) return;
    const payload = Object.assign({ type:"custom_quote", phone, zip, city:area&&area.city,
      dogs, yard_size:yard, last_cleaned:last, schedule:freq, intent: oneTime ? "one_time_reset" : "recurring",
      submitted_at:new Date().toISOString() }, getUTM());
    deliver(payload, ()=>{ track('Lead', { kind:'custom_quote_requested' }); setCustom({ sent:true }); });
  }

  function startEnroll(){ track('EnrollmentStarted', { stage:'enrollment_started', plan:freq, value:price?Number(price.perVisit):0, currency:'USD' }); go(6); }

  function submitEnroll(e){
    e.preventDefault();
    if(sending) return;
    const en = enroll;
    if(!en.first.trim() || !en.last.trim()){ setErr("Please add your first and last name."); return; }
    if(!en.address.trim()){ setErr("Please add your service address."); return; }
    if(en.phone.replace(/\D/g,'').length<10){ setErr("Please enter a valid mobile number."); return; }
    if(!/^\S+@\S+\.\S+$/.test(en.email)){ setErr("Please enter a valid email address."); return; }
    if(!en.consent){ setErr("Please agree to the service terms and text updates."); return; }
    setErr("");
    const payload = Object.assign({
      type:"signup", first_name:en.first.trim(), last_name:en.last.trim(), address:en.address.trim(),
      phone:en.phone, email:en.email, access:en.access, dogs_outside:en.dogOut, marketing_opt_in: en.marketing?"yes":"no",
      zip, city:area&&area.city, dogs, yard_size:yard, last_cleaned:last, schedule:freq,
      price_per_visit:price?price.perVisit:"", billing:"per visit",
      reset_flag: needsReset ? "yes" : "no", intent: oneTime ? "one_time_reset" : "recurring",
      offer:"First standard recurring visit free", stage:"enrollment_submitted",
      submitted_at:new Date().toISOString(),
    }, getUTM());
    const checkout = window.ddStripeLink(freq, dogs, yard, en);
    payload.stripe_status = checkout ? "sent_to_checkout" : "awaiting_manual_setup";
    deliver(payload, ()=>{
      track('Lead', { stage:'enrollment_submitted', kind:'signup', plan:freq });
      track('EnrollmentSubmitted', { plan:freq, value:price?Number(price.perVisit):0, currency:'USD' });
      if(checkout){
        track('InitiateCheckout', { plan:freq, value:price?Number(price.perVisit):0, currency:'USD' });
        setRedir(true); setEnrolled(true); setTimeout(()=>{ window.location.href = checkout; }, 900);
      } else { setEnrolled(true); }
    });
  }

  const dot = n => <span key={n} className={"qdot"+(step>=n?" on":"")}></span>;
  const Head = ({k,t,s}) => (
    <div className="qhead">
      <div className="qdots">{[1,2,3,4,5,6].map(dot)}</div>
      <span className="qstep">Step {k} of 6</span>
      <h2>{t}</h2>
      {s && <p className="qsub">{s}</p>}
    </div>
  );

  return (
    <div className="qcard" id="quote" ref={topRef}>

      {/* ---------- SCREEN 1 : SERVICE AREA ---------- */}
      {step===1 && (!area || area.ok) && (
        <form onSubmit={checkArea} noValidate>
          <Head k="1" t="First, let's make sure we service your area." s="Enter your ZIP code and we'll check it against our active routes." />
          <div className="fld">
            <Input label="ZIP code" id="q-zip" inputMode="numeric" maxLength="5" value={zip} onFocus={first}
              onChange={e=>setZip(e.target.value.replace(/\D/g,''))} placeholder="42104, 42101, 42122, etc." autoComplete="postal-code" />
          </div>
          {err && <div className="err">{err}</div>}
          <Button variant="ink" size="lg" block sticker type="submit" style={{marginTop:16}}
            iconRight={<i data-lucide="arrow-right" style={{width:18,height:18}}></i>}>Check My Area</Button>
          <p className="fineprint">Takes about 60 seconds · No card required</p>
        </form>
      )}

      {step===1 && area && !area.ok && !wl.done && (
        <form onSubmit={joinWaitlist} noValidate>
          <div className="qhead">
            <div className="qflag"><i data-lucide="map-pin-off" style={{width:20,height:20}}></i></div>
            <h2>We're not on your street yet.</h2>
            <p className="qsub">Join the route waitlist and we'll text you when service opens near {zip}.</p>
          </div>
          <div className="fld"><Input label="First name" id="w-name" value={wl.name} onChange={e=>setWl({...wl,name:e.target.value})} placeholder="Jamie" autoComplete="given-name" /></div>
          <div className="fld"><Input label="Mobile number" id="w-phone" type="tel" value={wl.phone} onChange={e=>setWl({...wl,phone:e.target.value})} placeholder="(270) 555-0132" autoComplete="tel" /></div>
          <p className="fineprint" style={{textAlign:'left',margin:'2px 0 0'}}>We'll only text this number about route-availability updates for {zip}.</p>
          {err && <div className="err">{err}</div>}
          <FailNote />
          <Button variant="ink" size="lg" block sticker type="submit" disabled={sending} style={{marginTop:16}}>{sending?"Saving…":"Join the Route Waitlist"}</Button>
          <button type="button" className="qlink" onClick={()=>{setArea(null);setZip("");setErr("");}}>Try a different ZIP code</button>
        </form>
      )}

      {step===1 && area && !area.ok && wl.done && (
        <div className="qdone">
          <div className="qcheck"><i data-lucide="check" style={{width:32,height:32}}></i></div>
          <h2>You're on the list.</h2>
          <p>Thanks, {wl.name.split(' ')[0]}! We'll text you from a 270 number as soon as a route opens near {zip}.</p>
          {window.DD_PREVIEW && <p className="qpreview">Preview mode — not delivered to the business yet</p>}
        </div>
      )}

      {/* ---------- SCREEN 2 : YARD DETAILS (no phone) ---------- */}
      {step===2 && (
        <form onSubmit={submitYard} noValidate>
          <Head k="2" t="Tell us what we'll be keeping clean." />
          <div className="fld"><label htmlFor="q-dogs">How many dogs use the yard?</label>
            <select id="q-dogs" value={dogs} onChange={e=>setDogs(e.target.value)}>
              <option value="" disabled>Select</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
            </select></div>
          <div className="fld"><label>How large is the area you want scooped?</label>
            <div className="pickrow">{[["Specified area","only what we agree on"],["Average","about ¼ acre"],["Large","about ½ acre"],["Over 1 acre","custom quote"],["Not sure","we'll help confirm it"]].map(([o,hint])=>(
              <button type="button" key={o} className={"pick"+(yard===o?" on":"")} onClick={()=>setYard(o)}>{o}<small>{hint}</small></button>))}</div></div>
          <div className="fld"><label htmlFor="q-last">When was the yard last thoroughly cleaned?</label>
            <select id="q-last" value={last} onChange={e=>setLast(e.target.value)}>
              <option value="" disabled>Select</option>
              <option>Within the last week</option><option>1–2 weeks ago</option>
              <option>3–4 weeks ago</option><option>More than one month ago</option><option>Not sure</option>
            </select></div>
          {err && <div className="err">{err}</div>}
          <Button variant="ink" size="lg" block sticker type="submit" style={{marginTop:16}}
            iconRight={<i data-lucide="arrow-right" style={{width:18,height:18}}></i>}>Continue</Button>
          <button type="button" className="qlink" onClick={()=>go(1)}>Back</button>
        </form>
      )}

      {/* ---------- SCREEN 3 : SCHEDULE ---------- */}
      {step===3 && (
        <div>
          <Head k="3" t="How often would you like the yard handled?" />
          <button type="button" className="schd feat" onClick={()=>chooseFreq('Weekly')}>
            <span className="schd-tag"><Badge variant="ink">Recommended</Badge></span>
            <Card tone="surface" elevation="sticker" bordered style={freq==='Weekly'?{outline:'3px solid var(--dd-ink)',outlineOffset:2}:null}>
              <span className="schd-t">Weekly Clean Yard Plan</span>
              <span className="schd-d">Best for a consistently clean, usable yard with less buildup between visits.</span>
              <span className="schd-go">Choose Weekly <i data-lucide="arrow-right" style={{width:16,height:16}}></i></span>
            </Card>
          </button>
          <button type="button" className="schd" onClick={()=>chooseFreq('Biweekly')}>
            <Card tone="surface" elevation="flat" style={freq==='Biweekly'?{outline:'3px solid var(--dd-ink)',outlineOffset:2}:null}>
              <span className="schd-t">Biweekly Clean Yard Plan</span>
              <span className="schd-d">A lighter schedule for lower-use yards. Typically 1-2 dogs.</span>
              <span className="schd-go">Choose Biweekly <i data-lucide="arrow-right" style={{width:16,height:16}}></i></span>
            </Card>
          </button>
          <button type="button" className="qlink" onClick={()=>go(2)}>Back</button>
        </div>
      )}

      {/* ---------- SCREEN 4 : MANDATORY PHONE CAPTURE ---------- */}
      {step===4 && (
        <form onSubmit={submitPhone} noValidate>
          <Head k="4" t="Where should we send your quote?" s="Enter your mobile number to unlock your price. We'll show it on the next screen and text you a copy." />
          <div className="fld"><Input label="Mobile number" id="q-phone" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(270) 555-0132" autoComplete="tel" /></div>
          {err && <div className="err">{err}</div>}
          <FailNote />
          <Button variant="ink" size="lg" block sticker type="submit" disabled={sending} style={{marginTop:14}}
            iconRight={<i data-lucide="arrow-right" style={{width:18,height:18}}></i>}>{sending?"Saving…":"Show My Price"}</Button>
          <p className="fineprint">By submitting, you agree to receive service-related calls and texts about your quote from Dookie Dogs at the number provided. Message and data rates may apply. Reply STOP to opt out. See <a href="https://www.dookiedogs.com/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="https://www.dookiedogs.com/terms" target="_blank" rel="noopener">Terms</a>.</p>
          <button type="button" className="qlink" onClick={()=>go(3)}>Back</button>
        </form>
      )}

      {/* ---------- SCREEN 5a : CUSTOM QUOTE RESULT (phone already captured) ---------- */}
      {step===5 && isCustom && !custom.sent && (
        <div>
          <Head k="5" t="This yard needs a custom quote." s={oneTime ? "One-time resets are quoted individually — no recurring service required."
            : (dogs==='5+' ? "Yards with 5 or more dogs are priced individually so we can quote it fairly."
            : "Yards over an acre are measured and priced individually so the number we give you is accurate.")} />
          <p style={{fontSize:14.5,color:'var(--dd-ink-2)',lineHeight:1.55}}>Ty will review the details and call or text <strong>{phone}</strong> with the correct price.</p>
          {err && <div className="err">{err}</div>}
          <FailNote />
          <Button variant="ink" size="lg" block sticker disabled={sending} onClick={requestCustomQuote} style={{marginTop:10}}>{sending?"Sending…":"Request My Custom Quote"}</Button>
          <button type="button" className="qlink" onClick={()=>go(2)}>Change my details</button>
        </div>
      )}

      {step===5 && isCustom && custom.sent && (
        <div className="qdone">
          <div className="qcheck"><i data-lucide="check" style={{width:32,height:32}}></i></div>
          <h2>Request received.</h2>
          <p>Ty will call or text {phone} fast with your {oneTime ? "one-time cleanup" : "custom"} price, from a 270 number. You can also reach him directly at <a href={"sms:"+window.PHONE_RAW}>{window.PHONE}</a>.</p>
          <ul className="psum" style={{marginTop:18}}>
            <li><span>Dogs</span><b>{dogs}</b></li>
            <li><span>Service area size</span><b>{yard}</b></li>
            <li><span>Service area</span><b>{area&&area.city} {zip}</b></li>
          </ul>
          {window.DD_PREVIEW && <p className="qpreview">Preview mode — not delivered to the business yet</p>}
        </div>
      )}

      {/* ---------- SCREEN 5b : STANDARD PRICE ---------- */}
      {step===5 && !isCustom && (
        <div>
          <Head k="5" t={`Your ${freq} price`} />
          <div className="pricebox">
            <div className="pv"><b><span className="cur">$</span>{price.perVisit}</b><span>per visit</span></div>
            <div className="pm">{dogs} dog{dogs==='1'?'':'s'} · {freq} service · {area&&area.city} {zip}</div>
            <div className="pm">Billed per completed visit. No monthly minimum and no long-term contract.</div>
            <div className="freebar"><i data-lucide="gift" style={{width:17,height:17}}></i> Your first standard recurring visit: <strong>FREE</strong></div>
          </div>
          {needsReset && (
            <p className="note"><i data-lucide="info" style={{width:15,height:15}}></i><span><strong>An initial yard reset may be needed.</strong> Your free first visit covers a standard recurring cleanup. Based on the yard's current condition, a one-time initial cleanup fee — typically <strong>${RESET_FEE}</strong> — may apply. Ty will confirm the fee before anything is scheduled or charged.</span></p>
          )}
          <p style={{fontSize:13,fontWeight:800,textTransform:'uppercase',letterSpacing:'.06em',color:'var(--dd-ink-3)',margin:'16px 0 6px'}}>Every visit includes:</p>
          <ul className="psum">
            <li><span>Systematic sweep of the agreed service area</span></li>
            <li><span>Double waste bagged and disposed of</span></li>
            <li><span>Kennel grade organic disinfectant on all equipment</span></li>
            <li><span>Arrival and completion updates</span></li>
            <li><span>Secured-gate photo</span></li>
            <li><span>Make-it-right guarantee</span></li>
          </ul>
          <Button variant="ink" size="lg" block sticker onClick={startEnroll} style={{marginTop:14}}
            iconRight={<i data-lucide="arrow-right" style={{width:18,height:18}}></i>}>Start {freq} Service</Button>
          <p className="fineprint" style={{marginTop:12}}><a href={"sms:"+window.PHONE_RAW}>Ask Ty a Question</a> · <button type="button" className="qlink" style={{display:'inline',margin:0,padding:0}} onClick={()=>go(2)}>Change my answers</button></p>
        </div>
      )}

      {/* ---------- SCREEN 6 : ENROLLMENT ---------- */}
      {step===6 && !enrolled && (
        <form onSubmit={submitEnroll} noValidate>
          <Head k="6" t="Let's get your first visit ready." s={`${freq} · $${price?price.perVisit:''} per visit · first standard visit free`} />
          <div className="frow">
            <div className="fld"><Input label="First name" id="e-f" value={enroll.first} onChange={e=>setEnroll({...enroll,first:e.target.value})} autoComplete="given-name" /></div>
            <div className="fld"><Input label="Last name" id="e-l" value={enroll.last} onChange={e=>setEnroll({...enroll,last:e.target.value})} autoComplete="family-name" /></div>
          </div>
          <div className="fld"><Input label="Service address" id="e-a" value={enroll.address} onChange={e=>setEnroll({...enroll,address:e.target.value})} placeholder="123 Maple St, Bowling Green" autoComplete="street-address" /></div>
          <div className="fld"><Input label="Email" id="e-e" type="email" value={enroll.email} onChange={e=>setEnroll({...enroll,email:e.target.value})} autoComplete="email" /></div>
          <div className="fld"><Input label="Mobile number" id="e-p" type="tel" value={enroll.phone} onChange={e=>setEnroll({...enroll,phone:e.target.value})} autoComplete="tel" /></div>
          <div className="fld"><Input label="Gate / access instructions" id="e-g" value={enroll.access} onChange={e=>setEnroll({...enroll,access:e.target.value})} placeholder="Side gate, latch on the left — code 1234" /></div>
          <div className="fld"><label htmlFor="e-d">Will dogs be in the yard during service?</label>
            <select id="e-d" value={enroll.dogOut} onChange={e=>setEnroll({...enroll,dogOut:e.target.value})}>
              <option>Dogs will be inside</option><option>Dogs may be in the yard</option><option>Varies — we'll text first</option>
            </select></div>
          <div className="paybox"><i data-lucide="credit-card" style={{width:18,height:18}}></i>
            <div><strong>Nothing is charged today.</strong><span>Ty will confirm your route day and any initial-reset condition first. You'll then receive a secure link to save your payment method.</span></div></div>
          <div className="consent">
            <input id="e-c" type="checkbox" checked={enroll.consent} onChange={e=>setEnroll({...enroll,consent:e.target.checked})} />
            <label htmlFor="e-c">I agree to the <a href="https://www.dookiedogs.com/terms" target="_blank" rel="noopener">service terms</a> and to receive service texts from Dookie Dogs. Message/data rates may apply. Reply STOP anytime.</label>
          </div>
          <div className="consent">
            <input id="e-m" type="checkbox" checked={enroll.marketing} onChange={e=>setEnroll({...enroll,marketing:e.target.checked})} />
            <label htmlFor="e-m">Also send me occasional offers and reminders (optional).</label>
          </div>
          {err && <div className="err">{err}</div>}
          <FailNote />
          <Button variant="ink" size="lg" block sticker type="submit" disabled={sending} style={{marginTop:16}}>{sending?"Saving your request…":"Request My Start Date"}</Button>
          <button type="button" className="qlink" onClick={()=>go(5)}>Back to my price</button>
        </form>
      )}

      {/* ---------- CONFIRMATION (post-enrollment) ---------- */}
      {step===6 && enrolled && redir && (
        <div className="qdone">
          <div className="qcheck"><i data-lucide="lock" style={{width:32,height:32}}></i></div>
          <h2>Taking you to secure checkout&hellip;</h2>
          <p>Your details are saved. Stripe handles the card — we never see or store your card number.</p>
          <ul className="psum" style={{marginTop:18}}>
            <li><span>Schedule</span><b>{freq}</b></li>
            <li><span>Your price</span><b>{price?`$${price.perVisit} / visit`:'Custom'}</b></li>
          </ul>
          <p className="reassure" style={{marginTop:16}}>Not redirected? <a href="#" onClick={ev=>{ev.preventDefault(); const l=window.ddStripeLink(freq,dogs,yard,enroll); if(l) window.location.href=l;}}>Open checkout</a></p>
        </div>
      )}

      {step===6 && enrolled && !redir && (
        <div className="qdone">
          <div className="qcheck"><i data-lucide="check" style={{width:32,height:32}}></i></div>
          <h2>We received your request.</h2>
          <p>Ty will call or text you to confirm your route day, first visit, and any initial-reset condition.</p>
          <ul className="psum" style={{marginTop:18}}>
            <li><span>Schedule</span><b>{freq}</b></li>
            <li><span>Your price</span><b>{price?`$${price.perVisit} / visit`:'Custom — by text'}</b></li>
            <li><span>First standard visit</span><b style={{color:'var(--dd-grass)'}}>FREE</b></li>
            <li><span>Mobile</span><b>{enroll.phone}</b></li>
          </ul>
          <p className="reassure" style={{marginTop:16}}><i data-lucide="shield-check" style={{width:15,height:15}}></i> No long-term contract · Pause or cancel before your next scheduled visit</p>
          {window.DD_PREVIEW && <p className="qpreview">Preview mode — not delivered to the business yet</p>}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { QuoteFlowV3, ddPrice, SERVICE_ZIPS, RATES, RESET_FEE });
