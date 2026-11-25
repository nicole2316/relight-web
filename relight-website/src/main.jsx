import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import './editorial.css';
import LiquidEther from './LiquidEther';
const HERO_COLORS = ['#2345ba', '#3b82f6', '#a6f3fa'];

const services = [
  { name: '智能创作', en: 'CREATIVE INTELLIGENCE', title: '让想象，更快抵达现实。', desc: '探索 AI 与内容创作的交汇点，将灵感转化为可感知的影像、声音与故事。', tags: ['AI 内容探索', '视觉概念', '创意工作流'], type: 'orb' },
  { name: '品牌叙事', en: 'BRAND STORYTELLING', title: '让品牌，拥有自己的声音。', desc: '从一个独特的视角出发，用清晰的策略与有温度的表达，构建品牌的叙事语言。', tags: ['品牌策略', '内容策划', '视觉表达'], type: 'wave' },
  { name: '数字体验', en: 'DIGITAL EXPERIENCE', title: '让连接，不止于看见。', desc: '以设计连接技术与感受，探索更具互动性、参与感与想象力的数字体验。', tags: ['交互设计', '数字展示', '体验创新'], type: 'grid' },
];

function Brand() { return <a className="brand" href="#home" aria-label="光极律动首页"><i/><strong>ReLight</strong><span>光极律动</span></a>; }
function Arrow() { return <span aria-hidden="true">↗</span>; }

function NarrativeOrb() {
  const points = [];
  for (let row = 1; row < 65; row++) {
    const latitude = row / 65 * Math.PI;
    const radius = Math.sin(latitude) * 218;
    const count = Math.max(8, Math.round(Math.sin(latitude) * 120));
    for (let col = 0; col < count; col++) {
      const angle = col / count * Math.PI * 2 + row * .31;
      const z = Math.sin(angle);
      if (z < -.15) continue;
      const y = 250 - Math.cos(latitude) * 218;
      const alpha = (.15 + Math.max(0, z) * .7) * Math.max(.08, 1 - y / 510);
      points.push(<circle key={row + '-' + col} cx={250 + Math.cos(angle) * radius} cy={y} r={.65 + Math.max(0, z) * .65} fill={row % 5 === 0 ? '#a5dbff' : '#4c7dff'} opacity={alpha}/>);
    }
  }
  return <div className="narrative-orb" aria-hidden="true"><svg viewBox="0 0 500 500">{points}</svg><span>LONG CONTEXT. DEEP INTELLIGENCE.</span></div>;
}

function IntelligencePortal() {
  return <div className="intelligence-portal" aria-hidden="true"><div className="portal-halo"/><div className="portal-grid"/><div className="portal-frame"><div/></div><span className="portal-caption">RELIGHT / A NEW PERSPECTIVE</span><span className="portal-index">01 — ∞</span></div>;
}

function HeroBackground() {
 const [paused, setPaused] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
 return <><div className="hero-liquid-background"><LiquidEther colors={HERO_COLORS} mouseForce={20} cursorSize={100} persistence={0.75} autoDemo={true} autoSpeed={0.5} autoIntensity={2.2} paused={paused} maxDevicePixelRatio={1.5}/></div><div className="liquid-readability"/><button className="video-toggle" aria-label={paused ? '播放背景动效' : '暂停背景动效'} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>{paused ? '播放动态' : '暂停动态'}</button></>;
}

function ParticleField({ small = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d');
    let width = 0, height = 0, frame = 0, time = 0, visible = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resize = new ResizeObserver(([entry]) => { width = entry.contentRect.width; height = entry.contentRect.height; const dpr = Math.min(devicePixelRatio, 2); canvas.width = width*dpr; canvas.height = height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); });
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); observer.observe(canvas);
    function draw() {
      if (visible && width) {
        ctx.clearRect(0,0,width,height); time += reduced ? 0 : 0.006;
        const columns = small ? 165 : 195, rows = small ? 28 : 63;
        for (let z=0; z<rows; z++) for(let x=0;x<columns;x++) {
          const nx=x/(columns-1), nz=z/(rows-1), center=nx*2-1;
          const envelope=Math.exp(-center*center*1.6);
          const wave=Math.sin(nx*13+nz*4+time)*0.55 + Math.sin(nx*23-nz*3-time*0.7)*0.23;
          const arch=small ? 0 : Math.sqrt(Math.max(0,1-center*center))*height*0.36*(1-nz*0.48);
          const px=width*(0.03+nx*0.94)+(nz-0.5)*center*38;
          const py=height*0.72+nz*height*0.23-arch-wave*envelope*height*(small?0.31:0.23)*(0.2+nz*0.8);
          const blue=nx>0.38 && nx<0.65 && z%5===0;
          ctx.fillStyle=blue ? `rgba(42,70,245,${0.25+nz*0.33})` : `rgba(51,58,73,${0.12+nz*0.34})`;
          ctx.beginPath();ctx.arc(px,py,small?0.65:0.65+nz*0.35,0,Math.PI*2);ctx.fill();
        }
      }
      frame=requestAnimationFrame(draw);
    }
    draw(); return () => {cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();};
  },[small]);
  return <canvas ref={ref} className="particles" aria-hidden="true"/>;
}

function App() {
  const [active,setActive]=useState(0), [modal,setModal]=useState(null), [copied,setCopied]=useState(false);
  const dialog=useRef(null);
  const selected=services[active];
  useEffect(()=>{if(modal){dialog.current?.showModal();}else{dialog.current?.close();}},[modal]);
  async function copyBrief(e) {
    e.preventDefault();
    const form=new FormData(e.currentTarget);
    const brief=`合作需求｜光极律动\n姓名：${form.get('name')}\n联系方式：${form.get('contact')}\n需求：${form.get('brief')}`;
    try {await navigator.clipboard.writeText(brief);setCopied(true);} catch {setCopied('failed');}
  }
  return <>
    <div className="site-frame" id="home">
      <header><Brand/><nav aria-label="主导航"><a href="#services">产品与服务</a><a href="#about">关于我们</a><button onClick={()=>setModal('contact')}>联系我们</button><button onClick={()=>setModal('careers')}>加入我们</button></nav><button className="header-cta" onClick={()=>setModal('contact')}>聊聊你的想法 <Arrow/></button></header>
      <main>
        <section className="hero corner-mark">
          <HeroBackground/>
          <NarrativeOrb/>
          <div className="hero-copy hero-company-copy">
            <div className="hero-headline-group"><p className="hero-company-name">光极律动 / RELIGHT</p>
            <h1>驱动数字内容产业的<span>人工智能公司</span></h1></div>
            <div className="hero-summary-group">
            <p className="hero-company-description">我们致力于长文本理解、叙事智能与生成式人工智能技术的研发及产业应用，构建面向数字内容产业的新一代智能模型与技术平台</p>

            </div>
            <aside className="hero-research" aria-label="核心研究方向">
              <div className="research-heading"><i aria-hidden="true"/>核心研究方向<span>RESEARCH</span></div>
              <ol>
                <li><span className="research-number">01</span><div><strong>长文本理解</strong><small>LONG-CONTEXT UNDERSTANDING</small></div></li>
                <li><span className="research-number">02</span><div><strong>叙事智能</strong><small>NARRATIVE INTELLIGENCE</small></div></li>
                <li><span className="research-number">03</span><div><strong>生成式人工智能</strong><small>GENERATIVE AI</small></div></li>
              </ol>
            </aside>
          </div>
          <div className="hero-bottom"><span><i/> 从深度理解，到无限创造</span><a href="#services">向下探索 <span>↓</span></a><span className="mono">RELIGHT® — NARRATIVE INTELLIGENCE</span></div>
        </section>
        <section className="intro-section"><div className="intro-editorial"><span className="section-kicker">01 / BEYOND THE STORY</span><h2>以深度理解为起点，<br/><span>连接技术、叙事与创意，</span><br/>探索内容产业的<span className="blue">新可能。</span></h2><p>以长文本理解与叙事智能为核心，构建面向数字内容产业的智能模型与技术平台，让每一次创作拥有更深的理解、更自由的表达。</p><button className="button intro-contact" onClick={()=>setModal('contact')}>与我们联系 <Arrow/></button></div><IntelligencePortal/><div className="intro-closing"><span>OUR COMPANY</span><h3>理解故事，创造未来。</h3><p>让人工智能走进内容创作，连接想象与产业应用。</p><a href="#about" aria-label="了解光极律动">↓</a></div></section>
        <section className="services section" id="services"><div className="section-heading"><div><span className="section-kicker">02 / WHAT WE DO</span><h2>以智能为起点<span className="blue"> /</span><br/><span className="offset-heading">让创意发生。</span></h2></div><p>技术与想象交汇，<br/>新的可能由此展开。</p></div>
          <div className="service-tabs" role="tablist" aria-label="服务类别">{services.map((item,index)=><button key={item.name} id={`tab-${index}`} role="tab" aria-selected={active===index} aria-controls="service-panel" tabIndex={active===index?0:-1} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?2:(active+(e.key==='ArrowRight'?1:2))%3;setActive(next);document.getElementById(`tab-${next}`).focus();}}} onClick={()=>setActive(index)}><span className="card-number">0{index+1} / {item.en}</span><strong>{item.name}</strong><span className="card-plus" aria-hidden="true">{active===index?'↗':'+'}</span><span className="card-description">{item.desc}</span></button>)}</div>
          <div className="service-panel" role="tabpanel" id="service-panel" aria-labelledby={`tab-${active}`}><div className={`service-visual ${selected.type}`}><div className="visual-top"><span>RELIGHT LAB / {String(active+1).padStart(2,'0')}</span><i/></div><div className="sculpture">{Array.from({length:18},(_,i)=><span key={i} style={{'--i':i}}/>)}</div><span className="visual-caption">{selected.en} <span>✳</span></span></div><div className="service-copy"><span className="section-kicker">{selected.en}</span><h3>{selected.title}</h3><p>{selected.desc}</p><div className="tags">{selected.tags.map(tag=><span key={tag}>{tag}</span>)}</div><button className="text-link" onClick={()=>setModal('contact')}>一起探索 <Arrow/></button></div></div>
        </section>
        <section className="about section" id="about"><div className="about-left"><span className="section-kicker">03 / WE ARE RELIGHT</span><h2>光，是开始。<br/>律动，是无限可能。</h2><div className="brand-symbols"><span/><span/><span/><span/></div></div><div className="about-right"><p className="large-copy">我们相信，好的创意<br/>能让世界发生一点不一样。</p><p>光极律动，以开放的视角探索创意与技术的边界。我们关注故事，也关注讲述故事的新方式；相信人的想象力，也拥抱技术带来的新可能。</p><p>让想法有形，让表达有力。<br/>与每一个敢于想象的人，一起创造下一束光。</p><span className="mono">HUMAN CREATIVITY. AMPLIFIED.</span></div></section>
        <section className="contact-banner"><div><span className="section-kicker">THE NEXT GREAT IDEA STARTS HERE</span><h2>下一个好故事，<br className="mobile-break"/>从我们开始<span className="blue">。</span></h2></div><button className="button primary" onClick={()=>setModal('contact')}>让我们聊聊 <Arrow/></button></section>
      </main>
      <footer><div className="footer-content"><div><Brand/><p>Creative Intelligence<br/>for Storytellers</p></div><nav aria-label="页脚导航"><a href="#services">产品与服务</a><a href="#about">关于我们</a><button onClick={()=>setModal('contact')}>联系我们</button><button onClick={()=>setModal('careers')}>加入我们</button></nav><div className="footer-right"><a className="back-top" href="#home" aria-label="返回顶部">↑</a><p>© {new Date().getFullYear()} RELIGHT. All rights reserved.</p></div></div><div className="footer-wave"><ParticleField small/></div></footer>
    </div>
    <dialog ref={dialog} onCancel={()=>setModal(null)} onClick={e=>{if(e.target===dialog.current)setModal(null);}}><button className="close" aria-label="关闭弹窗" onClick={()=>{setModal(null);setCopied(false);}}>×</button><span className="section-kicker">LET’S CREATE TOGETHER</span><h2>{modal==='careers'?'一起创造下一束光。':'从一个想法开始。'}</h2>{modal==='careers'?<><p>期待与对创意、设计和技术充满好奇的你相遇。</p><p>招聘职位与投递方式将在后续公布，敬请期待。</p><button className="button primary" onClick={()=>setModal(null)}>知道了 <Arrow/></button></>:<><p>整理你的合作想法。当前为网站预览版本，尚未接入在线提交服务；可以复制需求，留待沟通时使用。</p><form onSubmit={copyBrief}><label>你的称呼<input required name="name" placeholder="如何称呼你" maxLength={80}/></label><label>联系方式<input required name="contact" placeholder="邮箱 / 手机号 / 微信" maxLength={150}/></label><label>想聊聊什么<textarea required name="brief" placeholder="介绍一下你的项目或想法…" rows={4} maxLength={3000}/></label><button className="button primary" type="submit">复制合作需求 <Arrow/></button><p className="form-status" aria-live="polite">{copied===true?'已复制，可粘贴保存或分享。':copied==='failed'?'浏览器未允许复制，请手动选择并复制填写的内容。':''}</p></form></>}</dialog>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);

