// ===== app.js =====
// App state, DOM references, utility functions, page navigation.
// Depends on: data.js (lessons, exercises, quizzes)
// Provides: state, $, escapeHtml, showPage, saveProgress, renderLessons, etc.
//


const escapeHtml = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));
const state = {
  lessonIndex:0, completed:new Set(JSON.parse(localStorage.getItem('algorithmProgress')||'[]').filter(id=>id>=0&&id<lessons.length)),
  algorithm:'binary', values:[5,12,19,27,35,46,58,73], target:35, steps:[], stepIndex:0, playing:false, timer:null,
  quizIndex:0, correctAnswers:0, answeredQuestions:new Set(), problemCategory:'全部', problemDifficulty:'全部', problemSearch:''
};

const $ = id => document.getElementById(id);
const landingPage=$('landingPage'),learnPage=$('learnPage'),practicePage=$('practicePage');
const lessonList=$('lessonList'),lessonNumber=$('lessonNumber'),lessonTitle=$('lessonTitle');
const lessonGoal=$('lessonGoal'),lessonCheck=$('lessonCheck'),lessonBody=$('lessonBody'),lessonCode=$('lessonCode');
const progressText=$('progressText'),progressFill=$('progressFill'),totalProblemCount=$('totalProblemCount');
const btnGoLearn=$('btnGoLearn'),btnGoPractice=$('btnGoPractice'),btnBackFromLearn=$('btnBackFromLearn'),btnBackFromPractice=$('btnBackFromPractice');
const completeLessonBtn=$('completeLessonBtn'),resetProgressBtn=$('resetProgressBtn'),copyCodeBtn=$('copyCodeBtn');
const tabVisual=$('tabVisual'),tabQuiz=$('tabQuiz'),tabProblems=$('tabProblems'),tabCode=$('tabCode');
const visualArea=$('visualArea'),quizArea=$('quizArea'),problemArea=$('problemArea'),codeArea=$('codeArea');
const algorithmSelect=$('algorithmSelect'),arrayCanvas=$('arrayCanvas'),visualTitle=$('visualTitle');
const timeBadge=$('timeBadge'),spaceBadge=$('spaceBadge'),visualNarration=$('visualNarration');
const prevStepBtn=$('prevStepBtn'),playBtn=$('playBtn'),nextStepBtn=$('nextStepBtn'),shuffleBtn=$('shuffleBtn');
const targetInput=$('targetInput'),speedInput=$('speedInput');
const quizQuestion=$('quizQuestion'),answerList=$('answerList'),quizFeedback=$('quizFeedback'),quizScore=$('quizScore'),nextQuestionBtn=$('nextQuestionBtn');
const problemCategoryFilter=$('problemCategoryFilter'),problemDifficultyFilter=$('problemDifficultyFilter'),problemSearchInput=$('problemSearchInput');
const problemList=$('problemList'),problemCount=$('problemCount');
const problemModal=$('problemModal'),modalTitle=$('modalTitle'),problemDescription=$('problemDescription'),problemSamples=$('problemSamples'),modalCloseBtn=$('modalCloseBtn');
const aiChatToggle=$('aiChatToggle'),aiChatWindow=$('aiChatWindow'),aiChatClose=$('aiChatClose'),aiChatMessages=$('aiChatMessages'),aiChatInput=$('aiChatInput'),aiChatSend=$('aiChatSend');
const graphCanvas=$('graphCanvas');
const codeEditor=$('codeEditor'),codeInput=$('codeInput'),codeOutput=$('codeOutput'),codeStatus=$('codeStatus');
const runCodeBtn=$('runCodeBtn'),clearCodeBtn=$('clearCodeBtn'),resetCodeBtn=$('resetCodeBtn');

function showPage(id){
  const pages=[landingPage,learnPage,practicePage,$('blogPage')];
  const target=$(id);
  const current=pages.find(p=>!p.classList.contains('page-hidden'));
  if(current===target)return;
  if(current){
    current.classList.add('page-fade-out');
    setTimeout(()=>{
      current.classList.add('page-hidden');
      current.classList.remove('page-fade-out');
      target.classList.remove('page-hidden');
      target.classList.add('page-fade-in');
      setTimeout(()=>target.classList.remove('page-fade-in'),400);
    },280);
  } else {
    target.classList.remove('page-hidden');
    target.classList.add('page-fade-in');
    setTimeout(()=>target.classList.remove('page-fade-in'),400);
  }
}
function saveProgress(){
  const cu=JSON.parse(localStorage.getItem('blogCurrentUser')||'null');
  if(cu&&cu.username){localStorage.setItem('algo_progress_'+cu.username,JSON.stringify([...state.completed]));}
  else{localStorage.setItem('algorithmProgress',JSON.stringify([...state.completed]));}
}

function showSkeleton(target){
  target.innerHTML='<div class="skeleton skeleton-card"></div><div class="skeleton skeleton-card"></div><div class="skeleton skeleton-card"></div><div class="skeleton skeleton-card"></div><div class="skeleton skeleton-card"></div>';
}
function hideSkeleton(target){/* no-op placeholder for parity */}

function renderLessons(){
  showSkeleton(lessonList);
  setTimeout(()=>{
    lessonList.innerHTML='';
    const order=['基础算法','基础数据结构','高级数据结构','图论','动态规划','贪心','数论与数学','字符串','计算几何','搜索与博弈','杂项技巧'];
    const grouped={};
    lessons.forEach((l,i)=>{if(!grouped[l.category])grouped[l.category]=[];grouped[l.category].push({l,i});});
    order.forEach(cat=>{
      if(!grouped[cat])return;
      const h=document.createElement('div');h.className='lesson-category-header';h.textContent=cat;lessonList.appendChild(h);
      grouped[cat].forEach(({l,i})=>{
        const item=document.createElement('button');item.className='lesson-item';item.type='button';
        item.classList.toggle('active',i===state.lessonIndex);item.classList.toggle('done',state.completed.has(i));
        const ec=exercises.filter(e=>e[1]===l.category).length;
        item.innerHTML='<span class="lesson-index">'+(state.completed.has(i)?'✓':i)+'</span><span><span class="lesson-name">'+escapeHtml(l.title)+'</span><span class="lesson-time">'+escapeHtml(l.minutes)+'</span></span><span class="lesson-exercise-count">'+ec+' 题</span>';
        item.addEventListener('click',()=>{state.lessonIndex=i;renderApp();});
        lessonList.appendChild(item);
      });
    });
  },300);
}

function renderLessonContent(){
  showSkeleton(lessonBody);
  lessonNumber.textContent='';lessonTitle.textContent='加载中...';lessonGoal.textContent='';lessonCheck.textContent='';
  setTimeout(()=>{
    const l=lessons[state.lessonIndex];
    lessonNumber.textContent='模块 '+state.lessonIndex;lessonTitle.textContent=l.title;
    lessonGoal.textContent=l.goal;lessonCheck.textContent=l.check;lessonCode.textContent=l.code;
    let bodyHTML='<p>'+escapeHtml(l.intro)+'</p>';
    if(l.steps&&l.steps.length){
      bodyHTML+='<section class="topic-section steps-section"><h3>📖 算法解析</h3><div class="steps-list">'+l.steps.map((s,i)=>'<div class="step-item"><span class="step-num">'+(i+1)+'</span><div class="step-text">'+escapeHtml(s)+'</div></div>').join('')+'</div></section>';
    }
    bodyHTML+='<section class="topic-section"><h3>核心算法清单</h3><div class="topic-grid">'+l.topics.map(t=>'<span class="topic-chip">'+escapeHtml(t)+'</span>').join('')+'</div></section><section class="topic-section"><h3>掌握标准</h3><ul>'+l.mustKnow.map(n=>'<li>'+escapeHtml(n)+'</li>').join('')+'</ul></section><section class="topic-section"><h3>常见坑点</h3><ul>'+l.pitfalls.map(p=>'<li>'+escapeHtml(p)+'</li>').join('')+'</ul></section>'+(l.examples?l.examples.map(ex=>'<section class="topic-section example-block"><div class="example-header"><span class="example-title">'+escapeHtml(ex.title)+'</span>'+(ex.source?'<span class="example-source">'+escapeHtml(ex.source)+'</span>':'')+'</div><p><strong>题意：</strong>'+escapeHtml(ex.description)+'</p><p><strong>思路：</strong>'+escapeHtml(ex.solution)+'</p>'+(ex.explanation?'<p><strong>解释：</strong>'+escapeHtml(ex.explanation)+'</p>':'')+(ex.link?'<a class="example-link" href="'+ex.link+'" target="_blank">查看原题 →</a>':'')+'</section>').join(''):'');
    lessonBody.innerHTML=bodyHTML;
    completeLessonBtn.innerHTML=state.completed.has(state.lessonIndex)?'<span class="button-icon">✓</span> 已掌握':'<span class="button-icon">✓</span> 标记掌握';
  },300);
}

