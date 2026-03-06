'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CodeQ() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', projectType: '', budget: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [activeService, setActiveService] = useState(-1)

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      setSubmitStatus(res.ok ? 'success' : 'error')
      if (res.ok) setFormData({ name: '', email: '', company: '', projectType: '', budget: '', message: '' })
    } catch { setSubmitStatus('error') } finally { setIsSubmitting(false) }
  }

  const services = [
    { num: '01', title: 'AI Applications', sub: 'Intelligence, applied', desc: 'Intelligent systems powered by GPT-4, Claude, and custom ML models. We build AI tools that deliver measurable ROI — not demos.', tech: ['OpenAI', 'Anthropic', 'LangChain', 'Python', 'Vector DBs'], metrics: ['Measurable time savings', 'Production-grade reliability', 'Explainable outputs'] },
    { num: '02', title: 'Website Design & Dev', sub: 'Interfaces that convert', desc: 'Pixel-perfect, performance-first websites and web applications. Built in Next.js, obsessed over until every interaction is right.', tech: ['Next.js', 'React', 'TypeScript', 'Figma', 'Tailwind CSS'], metrics: ['Sub-1s load times', '98+ Lighthouse score', 'Mobile-first always'] },
    { num: '03', title: 'ERP & Business Systems', sub: 'Backends that scale', desc: 'Robust APIs, admin portals, ERP tools, inventory systems, and data-driven applications your team can depend on for years.', tech: ['Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'REST APIs'], metrics: ['99.9% uptime targets', 'Clean, documented code', 'Handoff-ready systems'] },
    { num: '04', title: 'SaaS Platforms', sub: 'From MVP to scale', desc: 'Complete SaaS solutions with authentication, billing, and analytics. We architect for scale from day one.', tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel', 'GraphQL'], metrics: ['Fast MVP delivery', 'Built to scale', 'Full billing integration'] },
    { num: '05', title: 'Business Automation', sub: 'Operations, streamlined', desc: 'Intelligent automation, API integrations, and workflow tools that eliminate manual work and surface insights instantly.', tech: ['Python', 'Node.js', 'AWS Lambda', 'Redis', 'Zapier'], metrics: ['Hours saved weekly', 'Error reduction', 'Real-time dashboards'] },
  ]

  const projects = [
    { num: '01 / 2024', type: 'AI Application', title: 'AI-Powered SaaS Platform', sub: 'Document Intelligence', desc: 'Intelligent document processing platform that reduced client processing time by 85%. Scaled to 10K+ users and $2M ARR.', tech: ['Next.js', 'OpenAI', 'PostgreSQL'], metrics: ['10K+ users', '85% faster', '$2M ARR'] },
    { num: '02 / 2024', type: 'Enterprise • ERP', title: 'Enterprise ERP System', sub: 'Operations at Scale', desc: 'Custom ERP solution managing operations for 500+ employees across multiple locations with guaranteed 99.9% uptime.', tech: ['React', 'Node.js', 'MongoDB'], metrics: ['500+ users', '99.9% uptime', '3x efficiency'] },
    { num: '03 / 2023', type: 'E-Commerce', title: 'Headless Commerce Platform', sub: 'Modern Commerce', desc: 'AI-powered recommendations and real-time analytics. Over 1M orders processed with a 4.9-star client rating.', tech: ['Next.js', 'Stripe', 'AWS'], metrics: ['1M+ orders', '$5M revenue', '4.9★ rating'] },
    { num: '04 / 2025', type: 'Healthcare • AI', title: 'Healthcare AI Assistant', sub: 'Patient Intelligence', desc: 'HIPAA-compliant AI assistant for patient communication and appointment scheduling. Serving 50K+ patients.', tech: ['Python', 'GPT-4', 'Azure'], metrics: ['50K+ patients', '92% satisfaction', 'HIPAA compliant'] },
  ]

  const ticker = ['AI Applications', '✦', 'Website Design', '✦', 'Web Development', '✦', 'ERP Systems', '✦', 'SaaS Platforms', '✦', 'Business Automation', '✦', 'Next.js · React · TypeScript', '✦', 'Shipped On Time', '✦', 'CodeQ.tech', '✦']

  const G = '#1a5c1a'
  const GL = '#2d7a2d'
  const BG = '#f0f7f0'
  const DARK = '#1a2e1a'
  const MID = '#4a6a4a'
  const BORDER = 'rgba(20,80,20,0.12)'

  return (
    <div style={{ minHeight: '100vh', background: BG, color: DARK, fontFamily: 'Georgia, Times New Roman, serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .pf { font-family: 'Playfair Display', Georgia, serif !important; }
        .dm { font-family: 'DM Sans', system-ui, sans-serif !important; }
        .label { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #3a7a3a; }
        .grid-lines { background-image: linear-gradient(rgba(20,80,20,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,80,20,0.05) 1px, transparent 1px); background-size: 80px 80px; }
        .ticker-wrap { overflow: hidden; }
        .ticker-inner { display: flex; width: max-content; animation: tick 35s linear infinite; }
        @keyframes tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .svc-row { border-top: 1px solid ${BORDER}; cursor: pointer; transition: background 0.25s; }
        .svc-row:last-child { border-bottom: 1px solid ${BORDER}; }
        .svc-row:hover { background: rgba(20,80,20,0.03); }
        .proj-card { border: 1px solid ${BORDER}; background: #fff; transition: all 0.25s; }
        .proj-card:hover { border-color: ${GL}; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(20,80,20,0.08); }
        .btn-g { background: ${G}; color: ${BG}; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; padding: 14px 28px; border: none; cursor: pointer; transition: background 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-g:hover { background: ${GL}; }
        .btn-o { background: transparent; color: ${DARK}; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; padding: 14px 28px; border: 1px solid rgba(20,80,20,0.3); cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-o:hover { border-color: ${G}; background: rgba(26,92,26,0.05); }
        .nav-btn { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #3a5a3a; background: none; border: none; cursor: pointer; padding: 0; transition: color 0.2s; }
        .nav-btn:hover { color: ${DARK}; }
        .field { font-family: 'DM Sans', sans-serif; background: transparent; border: none; border-bottom: 1px solid rgba(20,80,20,0.2); padding: 12px 0; font-size: 15px; color: ${DARK}; width: 100%; outline: none; transition: border-color 0.2s; }
        .field:focus { border-bottom-color: ${G}; }
        .field::placeholder { color: #8aaa8a; }
        select.field option { background: ${BG}; }
        .dot { width:7px; height:7px; background:#2d9a2d; border-radius:50%; display:inline-block; margin-right:8px; animation: dp 2s ease-in-out infinite; }
        @keyframes dp { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }
        .rotate { writing-mode:vertical-rl; text-orientation:mixed; transform:rotate(180deg); font-family:'DM Sans',sans-serif; font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:#6a8a6a; }
        ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:#e8f4e8} ::-webkit-scrollbar-thumb{background:${GL}}
        * { box-sizing: border-box; }
      `}</style>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, width:'100%', zIndex:50, background:'rgba(240,247,240,0.92)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 48px', height:72, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <motion.div initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:36,height:36,background:G,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span className="pf" style={{fontSize:18,fontWeight:700,color:BG}}>Q</span>
            </div>
            <div>
              <div className="dm" style={{fontSize:13,fontWeight:500,letterSpacing:'0.05em',color:DARK}}>CODEQ</div>
              <div className="dm" style={{fontSize:9,letterSpacing:'0.15em',color:'#5a7a5a'}}>.TECH</div>
            </div>
          </motion.div>
          <div style={{display:'flex',alignItems:'center',gap:40}}>
            {['Services','Portfolio','Process','Contact'].map((item,i)=>(
              <motion.button key={item} initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
                onClick={()=>scrollToSection(item.toLowerCase())} className="nav-btn">{item}</motion.button>
            ))}
            <motion.button initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.35}}
              onClick={()=>scrollToSection('contact')} className="btn-g">Start a Project</motion.button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid-lines" style={{minHeight:'100vh',paddingTop:72,position:'relative',overflow:'hidden'}}>
        <div style={{maxWidth:1400,margin:'0 auto',padding:'0 48px',display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:80,alignItems:'center',minHeight:'calc(100vh - 72px)'}}>
          <div style={{paddingTop:40}}>
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2}} style={{display:'flex',alignItems:'center',marginBottom:48}}>
              <span className="dot" /><span className="label">Accepting New Projects</span>
            </motion.div>
            <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.7}}
              className="pf" style={{fontSize:'clamp(52px,5.5vw,84px)',fontWeight:700,lineHeight:1.06,color:DARK,margin:'0 0 28px 0'}}>
              We build<br/>digital products<br/>with{' '}
              <em style={{fontStyle:'italic',fontWeight:400,color:GL}}>Excellence.</em>
            </motion.h1>
            <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
              className="dm" style={{fontSize:16,lineHeight:1.75,color:MID,maxWidth:460,marginBottom:48,fontWeight:300}}>
              CodeQ — where quality is non-negotiable. We design and engineer AI tools, web experiences, and full-stack systems that businesses are proud to ship.
            </motion.p>
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.55}} style={{display:'flex',gap:16,flexWrap:'wrap'}}>
              <button onClick={()=>scrollToSection('portfolio')} className="btn-g">View Our Work →</button>
              <button onClick={()=>scrollToSection('contact')} className="btn-o">Book a Call</button>
            </motion.div>
          </div>

          <motion.div initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{delay:0.5,duration:0.7}} style={{position:'relative'}}>
            <div style={{position:'absolute',right:-40,top:'50%',transform:'translateY(-50%)',fontFamily:'Playfair Display,serif',fontSize:280,fontWeight:900,color:'rgba(20,80,20,0.05)',lineHeight:1,pointerEvents:'none',userSelect:'none',zIndex:0}}>Q</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,position:'relative',zIndex:1}}>
              {[{val:'50+',label:'Projects Delivered'},{val:'30+',label:'Global Clients'},{val:'98%',label:'Client Satisfaction'},{val:'6+',label:'Years Experience'}].map((s,i)=>(
                <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.65+i*0.1}}
                  style={{padding:28,background:'rgba(255,255,255,0.55)',border:`1px solid ${BORDER}`}}>
                  <div className="pf" style={{fontSize:'3rem',fontWeight:700,color:DARK,lineHeight:1}}>{s.val}</div>
                  <div className="label" style={{marginTop:8}}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div style={{position:'absolute',left:16,bottom:80}}><span className="rotate">CodeQ.Tech — Est. 2019</span></div>
        <motion.div animate={{y:[0,8,0]}} transition={{duration:2.2,repeat:Infinity}} style={{position:'absolute',bottom:36,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
          <span className="label">Scroll</span>
          <div style={{width:1,height:36,background:`linear-gradient(to bottom,${GL},transparent)`}} />
        </motion.div>
      </section>

      {/* TICKER */}
      <div style={{background:G,padding:'16px 0',overflow:'hidden'}} className="ticker-wrap">
        <div className="ticker-inner">
          {[...ticker,...ticker].map((t,i)=>(
            <span key={i} className="dm" style={{fontSize:11,letterSpacing:'0.14em',textTransform:'uppercase',color:'#a8d4a8',marginRight:40,whiteSpace:'nowrap'}}>{t}</span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" style={{padding:'120px 48px',maxWidth:1400,margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:64}}>
          <div>
            <div className="label" style={{marginBottom:16}}>What We Build</div>
            <h2 className="pf" style={{fontSize:'clamp(36px,4vw,60px)',fontWeight:700,color:DARK,margin:0,lineHeight:1.1}}>
              Our <em style={{fontStyle:'italic',fontWeight:400,color:GL}}>Expertise</em>
            </h2>
          </div>
          <p className="dm" style={{fontSize:15,color:MID,maxWidth:340,lineHeight:1.7,fontWeight:300,textAlign:'right'}}>
            From AI-powered applications to enterprise systems — world-class digital solutions.
          </p>
        </motion.div>
        <div>
          {services.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}
              className="svc-row" onClick={()=>setActiveService(activeService===i?-1:i)} style={{padding:'28px 0'}}>
              <div style={{display:'grid',gridTemplateColumns:'72px 1fr 1fr 32px',gap:32,alignItems:'center'}}>
                <span className="dm" style={{fontSize:11,color:'#5a8a5a',letterSpacing:'0.1em'}}>{s.num}</span>
                <h3 className="pf" style={{fontSize:26,fontWeight:600,color:DARK,margin:0}}>{s.title}</h3>
                <span className="dm" style={{fontSize:14,color:'#5a7a5a',fontStyle:'italic',fontWeight:300}}>{s.sub}</span>
                <span style={{fontSize:22,color:GL,transition:'transform 0.3s',transform:activeService===i?'rotate(45deg)':'none',display:'block',textAlign:'center'}}>+</span>
              </div>
              <AnimatePresence>
                {activeService===i&&(
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.28}} style={{overflow:'hidden'}}>
                    <div style={{display:'grid',gridTemplateColumns:'72px 1fr 1fr',gap:32,paddingTop:28}}>
                      <div/>
                      <p className="dm" style={{fontSize:15,color:MID,lineHeight:1.75,fontWeight:300,margin:0}}>{s.desc}</p>
                      <div>
                        <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:20}}>
                          {s.tech.map((t,j)=><span key={j} className="dm" style={{fontSize:11,padding:'5px 12px',border:`1px solid rgba(20,80,20,0.2)`,color:'#3a6a3a',letterSpacing:'0.04em'}}>{t}</span>)}
                        </div>
                        {s.metrics.map((m,j)=>(
                          <div key={j} className="dm" style={{fontSize:13,color:'#3a6a3a',padding:'7px 0',borderBottom:`1px solid rgba(20,80,20,0.07)`,display:'flex',alignItems:'center',gap:10}}>
                            <span style={{color:GL}}>✓</span>{m}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{padding:'120px 48px',background:'rgba(20,80,20,0.025)'}}>
        <div style={{maxWidth:1400,margin:'0 auto'}}>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{marginBottom:64}}>
            <div className="label" style={{marginBottom:16}}>Case Studies</div>
            <h2 className="pf" style={{fontSize:'clamp(36px,4vw,60px)',fontWeight:700,color:DARK,margin:'0 0 12px',lineHeight:1.1}}>
              Projects that move <em style={{fontStyle:'italic',fontWeight:400,color:GL}}>the needle.</em>
            </h2>
            <p className="dm" style={{fontSize:15,color:MID,fontWeight:300}}>Every project has a story. Every story has measurable outcomes.</p>
          </motion.div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
            {projects.map((p,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                className="proj-card" style={{padding:40}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
                  <span className="dm" style={{fontSize:11,color:'#5a8a5a',letterSpacing:'0.1em'}}>{p.num}</span>
                  <span className="label" style={{color:GL}}>{p.type}</span>
                </div>
                <div style={{height:160,background:'linear-gradient(135deg,#e8f5e8,#d0ead0)',marginBottom:28,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(20,80,20,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(20,80,20,0.05) 1px,transparent 1px)',backgroundSize:'28px 28px'}} />
                  <span className="pf" style={{fontSize:80,fontWeight:900,color:'rgba(20,80,20,0.08)',position:'relative',lineHeight:1}}>{String(i+1).padStart(2,'0')}</span>
                </div>
                <h3 className="pf" style={{fontSize:22,fontWeight:600,color:DARK,margin:'0 0 6px'}}>{p.title}</h3>
                <p className="dm" style={{fontSize:13,color:'#5a7a5a',fontStyle:'italic',marginBottom:14,fontWeight:300}}>{p.sub}</p>
                <p className="dm" style={{fontSize:14,color:MID,lineHeight:1.65,marginBottom:20,fontWeight:300}}>{p.desc}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:20}}>
                  {p.tech.map((t,j)=><span key={j} className="dm" style={{fontSize:10,padding:'4px 10px',background:'rgba(20,80,20,0.06)',color:'#3a6a3a',letterSpacing:'0.04em'}}>{t}</span>)}
                </div>
                <div style={{display:'flex',gap:20,paddingTop:16,borderTop:`1px solid rgba(20,80,20,0.09)`}}>
                  {p.metrics.map((m,j)=><span key={j} className="dm" style={{fontSize:12,color:GL,fontWeight:500}}>✓ {m}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{padding:'120px 48px',maxWidth:1400,margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}}>
          <div>
            <div className="label" style={{marginBottom:16}}>How We Work</div>
            <h2 className="pf" style={{fontSize:'clamp(36px,4vw,56px)',fontWeight:700,color:DARK,margin:'0 0 20px',lineHeight:1.1}}>
              A proven <em style={{fontStyle:'italic',fontWeight:400,color:GL}}>process.</em>
            </h2>
            <p className="dm" style={{fontSize:15,color:MID,lineHeight:1.75,fontWeight:300,marginBottom:40}}>
              Every engagement follows the same disciplined methodology. No surprises, no scope creep, no disappearing after launch.
            </p>
            <button onClick={()=>scrollToSection('contact')} className="btn-g">Start the Process →</button>
          </div>
          <div>
            {[
              {n:'01',t:'Discovery',d:'30-min call. We listen, ask hard questions, define scope honestly.'},
              {n:'02',t:'Proposal',d:'Fixed price. Clear deliverables. No hourly billing surprises.'},
              {n:'03',t:'Build',d:'Weekly demos. Async-first. You see real progress every step.'},
              {n:'04',t:'Testing',d:'Rigorous QA, performance checks, and accessibility audits.'},
              {n:'05',t:'Launch',d:"We don't disappear post-launch. Ongoing support is built in."},
            ].map((step,i)=>(
              <motion.div key={i} initial={{opacity:0,x:16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.09}}
                style={{display:'flex',gap:24,paddingBottom:24,marginBottom:24,borderBottom:i<4?`1px solid rgba(20,80,20,0.09)`:'none'}}>
                <span className="dm" style={{fontSize:11,color:'#5a8a5a',letterSpacing:'0.1em',minWidth:28,paddingTop:3}}>{step.n}</span>
                <div>
                  <h4 className="pf" style={{fontSize:20,fontWeight:600,color:DARK,margin:'0 0 8px'}}>{step.t}</h4>
                  <p className="dm" style={{fontSize:14,color:MID,margin:0,lineHeight:1.65,fontWeight:300}}>{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TECH STACK */}
      <section style={{padding:'72px 48px',background:'rgba(20,80,20,0.03)',borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`}}>
        <div style={{maxWidth:1400,margin:'0 auto'}}>
          <div className="label" style={{marginBottom:28,textAlign:'center'}}>Technologies We Master</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}}>
            {['Next.js','React','TypeScript','Node.js','Python','TailwindCSS','PostgreSQL','MongoDB','AWS','Docker','OpenAI','Anthropic','Vercel','Stripe','GraphQL','Redis'].map((t,i)=>(
              <motion.span key={i} initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.03}}
                className="dm"
                style={{padding:'8px 18px',border:`1px solid rgba(20,80,20,0.18)`,fontSize:12,color:'#3a6a3a',letterSpacing:'0.04em',cursor:'default',transition:'all 0.2s'}}
                onMouseEnter={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color=BG;e.currentTarget.style.borderColor=G;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#3a6a3a';e.currentTarget.style.borderColor='rgba(20,80,20,0.18)';}}>
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:'120px 48px'}}>
        <div style={{maxWidth:1400,margin:'0 auto'}}>
          <div className="label" style={{marginBottom:48,textAlign:'center'}}>Client Success</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:28}}>
            {[
              {q:"They transformed our vision into a production-ready AI platform in record time. Quality and attention to detail exceeded every expectation.",a:'Sarah Chen',r:'CEO, TechVenture',i:'SC'},
              {q:"Best development partner we've worked with. Their AI integration expertise helped us 10x our product capabilities.",a:'Michael Rodriguez',r:'CTO, DataFlow Inc',i:'MR'},
              {q:"From MVP to Series A, instrumental in scaling our platform. True technical partners who genuinely understand startups.",a:'Emily Watson',r:'Founder, GrowthStack',i:'EW'},
            ].map((t,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                style={{padding:36,background:'#fff',border:`1px solid ${BORDER}`}}>
                <div style={{display:'flex',marginBottom:20}}>
                  {[...Array(5)].map((_,j)=><span key={j} style={{color:'#c5922a',fontSize:14}}>★</span>)}
                </div>
                <p className="pf" style={{fontSize:15,fontStyle:'italic',color:'#2a4a2a',lineHeight:1.75,marginBottom:28,fontWeight:400}}>
                  "{t.q}"
                </p>
                <div style={{display:'flex',alignItems:'center',gap:12,paddingTop:20,borderTop:`1px solid rgba(20,80,20,0.08)`}}>
                  <div style={{width:34,height:34,background:G,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span className="dm" style={{fontSize:11,color:BG,fontWeight:500}}>{t.i}</span>
                  </div>
                  <div>
                    <div className="dm" style={{fontSize:13,fontWeight:500,color:DARK}}>{t.a}</div>
                    <div className="dm" style={{fontSize:12,color:'#5a7a5a'}}>{t.r}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{background:G,padding:'96px 48px',textAlign:'center'}}>
        <div className="label" style={{color:'#a8d4a8',marginBottom:20}}>Ready to Build?</div>
        <h2 className="pf" style={{fontSize:'clamp(32px,4vw,60px)',fontWeight:700,color:BG,margin:'0 0 16px',lineHeight:1.1}}>
          Let's build your next<br/><em style={{fontStyle:'italic',fontWeight:400,color:'#a8d4a8'}}>digital product.</em>
        </h2>
        <p className="dm" style={{fontSize:16,color:'#88bb88',marginBottom:44,fontWeight:300}}>From idea to launch — your technical partner every step of the way.</p>
        <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={()=>scrollToSection('contact')}
            style={{background:BG,color:G,fontFamily:'DM Sans,sans-serif',fontSize:11,fontWeight:500,letterSpacing:'0.14em',textTransform:'uppercase',padding:'15px 36px',border:'none',cursor:'pointer',transition:'background 0.2s'}}>
            Start a Project →
          </button>
          <button onClick={()=>scrollToSection('contact')}
            style={{background:'transparent',color:BG,fontFamily:'DM Sans,sans-serif',fontSize:11,fontWeight:500,letterSpacing:'0.14em',textTransform:'uppercase',padding:'15px 36px',border:'1px solid rgba(240,247,240,0.35)',cursor:'pointer',transition:'all 0.2s'}}>
            Schedule a Call
          </button>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:'120px 48px',maxWidth:1400,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}}>
          <div>
            <div className="label" style={{marginBottom:16}}>Get in Touch</div>
            <h2 className="pf" style={{fontSize:'clamp(32px,3.5vw,52px)',fontWeight:700,color:DARK,margin:'0 0 20px',lineHeight:1.1}}>
              Let's build something <em style={{fontStyle:'italic',fontWeight:400,color:GL}}>great.</em>
            </h2>
            <p className="dm" style={{fontSize:15,color:MID,lineHeight:1.75,fontWeight:300,marginBottom:44}}>
              Tell us about your project and we'll respond within one business day with honest thoughts and a clear path forward.
            </p>
            {[{l:'Email',v:'hello@codeq.tech'},{l:'Response Time',v:'< 24 hours guaranteed'},{l:'Location',v:'Serving clients globally'}].map((item,i)=>(
              <div key={i} style={{paddingBottom:20,marginBottom:20,borderBottom:`1px solid ${BORDER}`}}>
                <div className="label" style={{marginBottom:6}}>{item.l}</div>
                <div className="dm" style={{fontSize:15,color:DARK,fontWeight:400}}>{item.v}</div>
              </div>
            ))}
            <div style={{marginTop:32,padding:20,background:'rgba(20,80,20,0.05)',border:`1px solid rgba(20,80,20,0.1)`}}>
              <span className="dot"/><span className="dm" style={{fontSize:13,color:GL,fontWeight:500}}>Currently Available</span>
              <p className="dm" style={{fontSize:13,color:MID,margin:'8px 0 0',fontWeight:300}}>We have capacity for new projects this quarter.</p>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:28}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
                <div>
                  <label className="label" style={{display:'block',marginBottom:8}}>Name *</label>
                  <input className="field" placeholder="John Doe" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} required/>
                </div>
                <div>
                  <label className="label" style={{display:'block',marginBottom:8}}>Email *</label>
                  <input className="field" type="email" placeholder="john@company.com" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} required/>
                </div>
              </div>
              <div>
                <label className="label" style={{display:'block',marginBottom:8}}>Company</label>
                <input className="field" placeholder="Your Company Name" value={formData.company} onChange={e=>setFormData({...formData,company:e.target.value})}/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
                <div>
                  <label className="label" style={{display:'block',marginBottom:8}}>Project Type</label>
                  <select className="field" value={formData.projectType} onChange={e=>setFormData({...formData,projectType:e.target.value})}>
                    <option value="">Select type</option>
                    <option value="ai">AI Application</option>
                    <option value="web">Website Design & Dev</option>
                    <option value="saas">SaaS Platform</option>
                    <option value="erp">ERP / Business System</option>
                    <option value="automation">Business Automation</option>
                    <option value="other">Not Sure Yet</option>
                  </select>
                </div>
                <div>
                  <label className="label" style={{display:'block',marginBottom:8}}>Budget Range</label>
                  <select className="field" value={formData.budget} onChange={e=>setFormData({...formData,budget:e.target.value})}>
                    <option value="">Select budget</option>
                    <option value="under5k">Under $5K</option>
                    <option value="5k-15k">$5K – $15K</option>
                    <option value="15k-40k">$15K – $40K</option>
                    <option value="40k+">$40K+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label" style={{display:'block',marginBottom:8}}>Project Brief *</label>
                <textarea className="field" placeholder="Tell us about your project, goals, timeline..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} required rows={5} style={{resize:'none'}}/>
              </div>
              <div>
                <button type="submit" disabled={isSubmitting} className="btn-g" style={{opacity:isSubmitting?0.6:1}}>
                  {isSubmitting?'Sending...':'Send Message →'}
                </button>
              </div>
              {submitStatus==='success'&&(
                <div className="dm" style={{fontSize:14,color:GL,padding:'14px 16px',border:`1px solid rgba(45,122,45,0.3)`,background:'rgba(45,122,45,0.05)'}}>
                  ✓ Message sent! We'll respond within 24 hours.
                </div>
              )}
              {submitStatus==='error'&&(
                <div className="dm" style={{fontSize:14,color:'#b5392a',padding:'14px 16px',border:'1px solid rgba(181,57,42,0.3)',background:'rgba(181,57,42,0.05)'}}>
                  Failed to send. Please email us at hello@codeq.tech
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${BORDER}`,background:BG,padding:'44px 48px'}}>
        <div style={{maxWidth:1400,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:48,alignItems:'start'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:32,height:32,background:G,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span className="pf" style={{fontSize:16,fontWeight:700,color:BG}}>Q</span>
              </div>
              <span className="dm" style={{fontSize:13,fontWeight:500,letterSpacing:'0.05em',color:DARK}}>CODEQ.TECH</span>
            </div>
            <p className="dm" style={{fontSize:13,color:'#5a7a5a',lineHeight:1.65,fontWeight:300,maxWidth:220}}>
              The Q stands for Quality. We build digital products that businesses are proud to ship.
            </p>
          </div>
          <div style={{display:'flex',gap:48}}>
            <div>
              <div className="label" style={{marginBottom:14}}>Services</div>
              {['AI Applications','Website Design','ERP Systems','SaaS Platforms','Automation'].map(item=>(
                <button key={item} onClick={()=>scrollToSection('services')} className="dm"
                  style={{display:'block',fontSize:13,color:MID,background:'none',border:'none',cursor:'pointer',padding:'3px 0',textAlign:'left',fontWeight:300}}>
                  {item}
                </button>
              ))}
            </div>
            <div>
              <div className="label" style={{marginBottom:14}}>Company</div>
              {['Portfolio','Process','Contact'].map(item=>(
                <button key={item} onClick={()=>scrollToSection(item.toLowerCase())} className="dm"
                  style={{display:'block',fontSize:13,color:MID,background:'none',border:'none',cursor:'pointer',padding:'3px 0',textAlign:'left',fontWeight:300}}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <button onClick={()=>scrollToSection('contact')} className="btn-g" style={{marginBottom:20}}>Start a Project</button>
            <div className="dm" style={{fontSize:12,color:'#5a7a5a'}}>hello@codeq.tech</div>
            <div className="dm" style={{fontSize:11,color:'#8aaa8a',marginTop:20}}>© 2026 CodeQ AI Agency. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
