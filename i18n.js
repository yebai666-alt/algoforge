const I18N = {
  zh: {
    nav_home: '首页', nav_learn: '学习', nav_practice: '练习', nav_blog: '博客',
    hero_title_1: '竞赛算法', hero_title_2: '从零到', hero_title_3: '区域赛',
    hero_sub: '系统化的学习路径、精选题库、可视化演示、AI 答疑。',
    btn_start: '开始学习', btn_practice: '进入题库',
    learn_title: '算法学习', learn_sub: '系统化学习竞赛算法，从入门到区域赛',
    learn_goal: '学习目标', learn_check: '掌握标准', learn_steps: '算法解析',
    learn_topics: '核心算法清单', learn_must: '掌握标准', learn_pitfalls: '常见坑点',
    learn_code: '代码模板', learn_copy: '复制', learn_done: '标记掌握', learn_reset: '重置进度',
    practice_title: '练习专区', tab_visual: '可视化', tab_quiz: '测验', tab_problems: '题库',
    search_ph: '🔍 搜索课程、题目...',
    theme_toggle: '切换主题', lang_toggle: 'EN',
  },
  en: {
    nav_home: 'Home', nav_learn: 'Learn', nav_practice: 'Practice', nav_blog: 'Blog',
    hero_title_1: 'Competitive', hero_title_2: 'Algorithm', hero_title_3: 'Training',
    hero_sub: 'Systematic learning path, curated problems, visual demos, AI tutoring.',
    btn_start: 'Start Learning', btn_practice: 'Problem Set',
    learn_title: 'Algorithm Learning', learn_sub: 'Systematic ICPC/CCPC training from zero to regionals',
    learn_goal: 'Learning Goal', learn_check: 'Mastery Check', learn_steps: 'Algorithm Breakdown',
    learn_topics: 'Core Topics', learn_must: 'Key Points', learn_pitfalls: 'Common Pitfalls',
    learn_code: 'Code Template', learn_copy: 'Copy', learn_done: 'Mark Done', learn_reset: 'Reset',
    practice_title: 'Practice Zone', tab_visual: 'Visualizer', tab_quiz: 'Quiz', tab_problems: 'Problems',
    search_ph: '🔍 Search courses, problems...',
    theme_toggle: 'Theme', lang_toggle: '中文',
  }
};

let currentLang = localStorage.getItem('algoforge_lang') || 'zh';

function t(key) { return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.zh[key]) || key; }

function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('algoforge_lang', currentLang);
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}
