import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
const GradientASCII = lazy(() => import('./GradientASCII'));
import './site.css';
import BusinessSections from './BusinessSections';

const introduction = '我们致力于长文本理解、叙事智能与生成式人工智能技术的研发及产业应用，构建面向数字内容产业的新一代智能模型与技术平台';
const samples = [
  { name: '人物与动机', source: '旧书店即将关门。林舟回到故乡，想把父亲留下的藏书卖掉。在整理书架时，他发现每一本书里都夹着一封没有寄出的信。读完第一封信后，他决定再留一天。', result: '林舟', label: '从离开，到留下', detail: '起初希望处理藏书并离开故乡；发现未寄出的信后，对父亲的好奇使他暂缓原计划。', tags: ['人物动机', '情感转折', '未寄出的信'] },
  { name: '事件与因果', source: '暴雨切断了山村唯一的公路。原定离开的医生因此留下，恰好遇到一位急需救治的老人。村民们连夜清理旧山道，让救援队在天亮前赶到。', result: '一次意外的停留', label: '阻断 → 停留 → 救援', detail: '暴雨阻断交通，促使医生留村；紧急救治的需要，推动村民修复旧道并接通救援。', tags: ['因果链条', '关键事件', '群体行动'] },
  { name: '故事与结构', source: '女孩每天在车站画同一个背影。一天，那个人没有出现。她顺着画中的线索寻找，最终在一家画廊里看见了自己的画像——原来，对方也一直在画她。', result: '互为故事的主角', label: '日常 · 悬念 · 发现', detail: '重复的日常建立期待；背影消失带来悬念；相互描绘的发现完成反转，让单向观察成为双向连接。', tags: ['故事结构', '悬念设置', '结尾反转'] },
];
function Arrow(){return <span aria-hidden="true">↗</span>}
function Brand(){return <a href="#home" className="brand" aria-label="光极律动首页"><i/><strong>ReLight</strong><span>光极律动</span></a>}
function App(){
 const [selected,setSelected]=useState(0),[modal,setModal]=useState(null),[status,setStatus]=useState('');
 const dialog=useRef(null), sample=samples[selected];
 useEffect(()=>{if(modal)dialog.current.showModal();else dialog.current.close();setStatus('')},[modal]);
 async function copy(e){e.preventDefault();const data=new FormData(e.currentTarget);try{await navigator.clipboard.writeText(`合作需求｜光极律动\n称呼：${data.get('name')}\n联系方式：${data.get('contact')}\n需求：${data.get('brief')}`);setStatus('已复制，可粘贴保存或分享。')}catch{setStatus('复制未获浏览器允许，请手动复制填写的内容。')}}
 return <><div className="global-background" aria-hidden="true"><Suspense fallback={null}><GradientASCII colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']} shape="horizon" characters=" =+xX0S8#@" cellSize={18} density={0.8} lightMode glyphOpacity={0.7} gradientOpacity={0.55} speed={0.6} mouseInteraction clickEffect="wave" dpr={1.5}/></Suspense></div><div className="site" id="home">
 <header><Brand/><nav aria-label="主导航"><a href="#products">产品与平台</a><a href="#technology">核心技术</a><a href="#industries">业务领域</a><a href="#news">企业动态</a><a href="#about">关于我们</a></nav><button className="button primary nav-contact" onClick={()=>setModal('contact')}>联系我们 <Arrow/></button></header>
 <main>
 <section className="hero"><div className="hero-copy"><div className="eyebrow"><i/> 光极律动 · ReLight</div><h1>驱动数字内容产业的<br/><span>人工智能公司</span></h1><p>{introduction}</p></div>
 <div className="showcase"><div className="workspace"><div className="workspace-top"><Brand/><span className="demo-label">技术概念演示</span><span className="workspace-dot" aria-hidden="true"/></div><div className="workspace-body"><aside className="workspace-sidebar"><div className="sidebar-caption">叙事研究空间</div>{samples.map((item,i)=><button key={item.name} className={selected===i?'active':''} onClick={()=>setSelected(i)} aria-pressed={selected===i}><span>0{i+1}</span>{item.name}</button>)}<div className="sidebar-note">从字里行间，<br/>理解故事的更多可能。</div></aside><div className="workspace-content"><div className="workspace-heading"><div><small>阅读与理解</small><h2>{sample.name}</h2></div><span>示例 / 0{selected+1}</span></div><div className="source-paper"><div className="paper-label"><span>故事片段</span><span>READING MATERIAL</span></div><p>{sample.source}</p><div className="paper-foot"><span>预设文本</span><span>中文 · 短篇示例</span></div></div><div className="understanding"><span className="understanding-icon">✳</span><div><strong>{sample.label}</strong><p>{sample.detail}</p></div></div><div className="sample-tags">{sample.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div></div></div>
 <div className="floating-note"><div className="note-top"><span className="note-dots">● ● ●</span><span>RELIGHT / INSIGHT</span></div><span className="note-kicker">让故事的脉络浮现</span><h3>{sample.result}</h3><div className="note-flow"><i/><span/><i/><span/><i/></div><p>{sample.label}</p><div className="note-bottom"><span>理解 → 叙事 → 创作</span><Arrow/></div></div>
 <div className="showcase-caption">交互概念展示 · 点击左侧切换预设示例，不调用在线模型</div></div>
 </section>
 <BusinessSections onContact={()=>setModal('contact')}/>
 <section className="contact-section"><div className="eyebrow"><i/> LET’S CREATE TOGETHER</div><h2>下一个好故事，<br/>从我们开始。</h2><p>与光极律动，一起探索内容与智能的交汇点。</p><button className="button primary" onClick={()=>setModal('contact')}>联系我们 <Arrow/></button></section>
 </main><footer className="brand-footer"><div><Brand/><p>Creative Intelligence<br/>for Storytellers.</p></div><nav aria-label="页脚导航"><a href="#products">产品与平台</a><a href="#about">关于我们</a><button onClick={()=>setModal('contact')}>联系我们</button><button onClick={()=>setModal('careers')}>加入我们</button></nav><div className="footer-meta"><div className="footer-actions"><a href="#products" aria-label="了解 API 接入" title="API 接入">⌘</a><button onClick={()=>setModal('contact')} aria-label="交流合作" title="交流合作">↗</button><a href="#home" aria-label="返回顶部" title="返回顶部">↑</a></div><div className="copyright">© {new Date().getFullYear()} RELIGHT. All rights reserved.</div><a className="icp-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">陕ICP备2026029623号</a></div><img className="footer-landscape" src="/images/footer-landscape.svg" alt="" aria-hidden="true"/></footer></div>
 <dialog ref={dialog} onCancel={()=>setModal(null)} onClick={e=>{if(e.target===dialog.current)setModal(null)}}><button className="dialog-close" onClick={()=>setModal(null)} aria-label="关闭弹窗">×</button><span className="section-label">LET’S CREATE TOGETHER</span><h2>{modal==='careers'?'一起创造下一束光。':'从一个想法开始。'}</h2>{modal==='careers'?<><p>期待与对创意、设计和技术充满好奇的你相遇。</p><p>招聘职位与投递方式将在后续公布，敬请期待。</p><button className="button primary" onClick={()=>setModal(null)}>知道了</button></>:<><p>当前为网站预览，尚未接入在线提交服务。你可以填写并复制合作需求，留待沟通时使用。</p><form onSubmit={copy}><label>你的称呼<input required name="name" maxLength={80} placeholder="如何称呼你"/></label><label>联系方式<input required name="contact" maxLength={150} placeholder="邮箱 / 手机号 / 微信"/></label><label>合作需求<textarea required name="brief" rows={4} maxLength={3000} placeholder="介绍一下你的项目或想法…"/></label><button className="button primary" type="submit">复制合作需求 <Arrow/></button><p className="form-status" aria-live="polite">{status}</p></form></>}</dialog></>;
}
createRoot(document.getElementById('root')).render(<App/>);
