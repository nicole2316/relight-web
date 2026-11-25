import React, { useState } from 'react';
import './business.css';

const sectors = [
 {name:'影视',en:'FILM & TELEVISION',title:'从一个故事，到完整的叙事世界。',text:'围绕剧本开发与内容生产，将长文本理解、人物关系梳理与多环节协同生成融入影视团队的创作流程。',items:['故事策划与大纲构建','人物设定与情节关联','剧本审读与一致性检查'],steps:['创意与概念','人物与大纲','剧本与审读'],symbol:'幕'},
 {name:'文旅',en:'CULTURE & TOURISM',title:'让文化有脉络，让体验有故事。',text:'面向文化内容与体验设计，连接地方文脉、文化素材与叙事表达，为文旅项目构建连贯的内容体系。',items:['文化素材整理与理解','主题故事与角色设定','导览内容与沉浸式叙事'],steps:['文化素材','主题叙事','体验内容'],symbol:'境'},
 {name:'游戏',en:'GAMES & INTERACTIVE STORIES',title:'让每一次选择，都有故事回应。',text:'面向游戏世界观与互动叙事设计，围绕角色动机、任务关系和情节分支，辅助团队组织复杂的故事系统。',items:['世界观与角色档案','任务剧情与分支设计','对话生成与设定一致性'],steps:['世界观设定','任务与分支','角色与对话'],symbol:'界'},
];
const strengths = [
 {title:'多环节系统化协同生成',text:'串联创意、梗概、人设、大纲与正文交付，让前序设定持续服务后续写作，减少信息断层与重复整理。',nodes:['创意','梗概','人设','大纲','正文'],type:'chain'},
 {title:'生成与独立审读并最终确认',text:'明确每集必达、允许与禁止的状态范围，通过生成、独立审读与最终确认，形成动态反馈闭环。',nodes:['生成','审读','反馈','确认'],type:'review'},
 {title:'长流程运行与串联',text:'管理多阶段长任务的进度、资源、异常与恢复，支持从整体规划到正文交付的连续运行。',nodes:['规划','运行','检查','恢复','交付'],type:'run'},
 {title:'数据收集、经验沉淀与持续优化',text:'将生产中的问题沉淀为审读规则、失败案例与测试样本，持续改进长剧一致性与交付质量。',nodes:['生产问题','审读规则','测试样本','持续优化'],type:'loop'},
];
function Heading({number,en,title,description}){return <div className="business-heading"><div className="business-label"><span>{number}</span>{en}</div><h2>{title}</h2>{description&&<p>{description}</p>}</div>}
export default function BusinessSections({onContact}){
 const [sector,setSector]=useState(0);const current=sectors[sector];
 return <div className="business-sections">
 <section className="business-section products-section" id="products">
 <Heading number="01" en="PRODUCTS & PLATFORM" title="产品与平台" description="把叙事智能，接入企业的内容生产。"/>
 <div className="narra-panel"><div className="narra-intro"><img src="/images/narra-logo.png" alt="NARRA 模型平台" width="412" height="104"/><span className="product-tag">叙事智能模型平台</span><h3>理解故事的结构，<br/>连接创作的每一步。</h3><p>NARRA 以长文本理解与叙事智能为基础，面向企业内容生产场景，以 API 接入为主要方式，将模型能力融入现有产品与业务流程。</p><button className="button primary" onClick={onContact}>咨询 API 接入 <span aria-hidden="true">↗</span></button></div>
 <div className="api-map" aria-label="企业业务系统通过 API 接入 NARRA，连接长文本理解、叙事分析与协同生成能力"><div className="map-heading"><span>连接业务与模型</span><small>INTEGRATION OVERVIEW</small></div><div className="map-source">企业业务系统 <small>内容平台 / 创作工具 / 生产流程</small></div><div className="map-connector"><span>API</span></div><div className="map-model"><span className="model-glyph" aria-hidden="true">N</span><strong>NARRA</strong><small>叙事智能模型平台</small></div><div className="map-branches"><span>长文本理解</span><span>叙事分析</span><span>协同生成</span></div><div className="map-foot"><i/> 从内容理解到产业应用</div></div></div>
 <div className="integration-steps">{[['01','需求沟通','明确业务场景与内容任务'],['02','方案评估','确认模型能力与接入范围'],['03','API 集成','对接企业现有系统与流程'],['04','验证与迭代','结合业务反馈持续优化']].map(([n,t,d])=><div key={n}><span>{n}</span><div><h4>{t}</h4><p>{d}</p></div></div>)}</div>
 </section>
 <section className="business-section technology-section" id="technology"><Heading number="02" en="CORE TECHNOLOGY" title="核心技术" description="以计算语言学为核心，理解语言背后的叙事结构。"/>
 <div className="linguistics"><div><span>COMPUTATIONAL LINGUISTICS</span><h3>从语言，理解意义。<br/>从结构，组织叙事。</h3></div><p>将计算语言学与生成式人工智能结合，关注文本中的语义、人物、事件与因果关系。让 AI 从单次文本生成，走向可持续运行、可检查、可恢复的内容生产流程。</p></div>
 <div className="strength-grid">{strengths.map((item,i)=><article className="strength-card" key={item.title}><div className="strength-number">0{i+1}</div><h3>{item.title}</h3><p>{item.text}</p><div className={`process-diagram ${item.type}`} aria-label={item.nodes.join('，')}><div>{item.nodes.map((node,j)=><React.Fragment key={node}><span>{node}</span>{j<item.nodes.length-1&&<i aria-hidden="true">→</i>}</React.Fragment>)}</div><small>{['上下文贯穿创作流程','生成与审读相互反馈','进度可检查 · 异常可恢复','经验沉淀 · 持续改进'][i]}</small></div></article>)}</div>
 </section>
 <section className="business-section industries-section" id="industries"><Heading number="03" en="INDUSTRY SOLUTIONS" title="业务领域" description="面向企业，深入内容生产的真实场景。"/>
 <div className="industry-switch" aria-label="选择业务领域">{sectors.map((s,i)=><button key={s.name} onClick={()=>setSector(i)} aria-pressed={sector===i}><span>0{i+1}</span>{s.name}<span aria-hidden="true">↗</span></button>)}</div>
 <div className="sector-panel" aria-live="polite"><div className="sector-copy"><small>{current.en}</small><h3>{current.title}</h3><p>{current.text}</p><ul>{current.items.map(item=><li key={item}>{item}</li>)}</ul><button className="button secondary" onClick={onContact}>交流{current.name}解决方案 <span aria-hidden="true">↗</span></button></div><div className={`sector-art sector-art-${sector}`} aria-hidden="true"><span className="sector-orbit"/><span className="sector-symbol">{current.symbol}</span><div className="sector-art-label">NARRATIVE INTELLIGENCE</div><div className="sector-stages">{current.steps.map((step,i)=><span key={step}><small>0{i+1}</small>{step}</span>)}</div></div></div>
 </section>
 <section className="business-section news-section" id="news"><Heading number="04" en="NEWS & INSIGHTS" title="企业动态" description="记录光极律动的研究、产品与实践。"/><div className="news-placeholder"><div className="news-monogram" aria-hidden="true">R<span>↗</span></div><div><small>STAY CONNECTED</small><h3>新的进展，在这里相见。</h3><p>企业新闻、产品进展与行业交流将陆续发布，敬请关注。</p></div><span className="coming-label">内容筹备中</span></div></section>
 <section className="business-section about-section" id="about"><Heading number="05" en="ABOUT RELIGHT" title="关于我们"/><div className="about-grid"><h3>让技术理解故事，<br/>让创意走向产业。</h3><div><p>光极律动是一家驱动数字内容产业的人工智能公司。我们致力于长文本理解、叙事智能与生成式人工智能技术的研发及产业应用。</p><p>以计算语言学为核心技术方向，以 NARRA 为模型平台，我们面向影视、文旅、游戏等行业，为企业提供以 API 接入为主要方式的人工智能解决方案，连接内容创作与产业应用。</p><button className="text-link" onClick={onContact}>与我们交流 <span aria-hidden="true">↗</span></button></div></div><div className="about-values"><span>研究为基<small>LANGUAGE & MEANING</small></span><span>叙事为核<small>STORY & STRUCTURE</small></span><span>产业为向<small>CREATIVITY & INDUSTRY</small></span></div></section>
 </div>
}
