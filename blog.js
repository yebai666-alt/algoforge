// ===== 博客系统完整功能 =====
const LS_USERS = 'blogUsers';
const LS_POSTS = 'blogPosts';
const LS_CURRENT = 'blogCurrentUser';
const LS_FOLLOWS = 'blogFollows';
const LS_NOTIFS = 'blogNotifications';
const LS_THEME = 'blogTheme';
const LS_MESSAGES = 'blogMessages';

let users = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
let posts = JSON.parse(localStorage.getItem(LS_POSTS) || '[]');
let currentUser = JSON.parse(localStorage.getItem(LS_CURRENT) || 'null');
let follows = JSON.parse(localStorage.getItem(LS_FOLLOWS) || '{}');
let notifications = JSON.parse(localStorage.getItem(LS_NOTIFS) || '[]');
let theme = localStorage.getItem(LS_THEME) || 'light';
let messages = JSON.parse(localStorage.getItem(LS_MESSAGES) || '[]');
let editingId = null;
let msgActiveChat = null; // 当前聊天对象用户名

function saveUsers() { localStorage.setItem(LS_USERS, JSON.stringify(users)); }
function savePosts() { localStorage.setItem(LS_POSTS, JSON.stringify(posts)); }
function saveCurrent() { localStorage.setItem(LS_CURRENT, JSON.stringify(currentUser)); }
function saveFollows() { localStorage.setItem(LS_FOLLOWS, JSON.stringify(follows)); }
function saveNotifs() { localStorage.setItem(LS_NOTIFS, JSON.stringify(notifications)); }
function saveMessages() { localStorage.setItem(LS_MESSAGES, JSON.stringify(messages)); }

// ===== 私信表情 =====
const MSG_EMOJIS = ['😀','😂','🤣','😊','😍','🥰','😎','🤩','😇','🤔','😏','😢','😭','😤','🤯','🥳','👍','👎','❤️','🔥','⭐','🎉','💪','🙏','👋','✅','❌','💡','🚀','💻','📱','🎮','🏆','📌','🎵','☕','🍕'];

// ===== 工具函数 =====
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

function timeAgo(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('zh-CN') + ' ' + d.toLocaleTimeString('zh-CN', {hour:'2-digit',minute:'2-digit'});
}

function randGradient() {
    const grads = [
        'linear-gradient(90deg, #2f54eb, #7bc6ff)',
        'linear-gradient(90deg, #d85f45, #f5a623)',
        'linear-gradient(90deg, #2b8c56, #7bc67f)',
        'linear-gradient(90deg, #8b5cf6, #ec4899)',
        'linear-gradient(90deg, #0ea5e9, #2dd4bf)',
    ];
    return grads[Math.floor(Math.random() * grads.length)];
}

function renderMd(text) {
    let h = esc(text);
    h = h.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/\*(.*?)\*/g, '<em>$1</em>');
    h = h.replace(/~~(.*?)~~/g, '<del>$1</del>');
    h = h.replace(/`(.*?)`/g, '<code style="background:rgba(47,84,235,0.06);color:#2f54eb;padding:2px 6px;border-radius:4px;font-size:0.9em;">$1</code>');
    h = h.replace(/^### (.*$)/gm, '<h3 style="font-weight:700;margin:16px 0 8px;">$1</h3>');
    h = h.replace(/^## (.*$)/gm, '<h2 style="font-weight:700;margin:20px 0 10px;">$1</h2>');
    h = h.replace(/^# (.*$)/gm, '<h1 style="font-weight:700;margin:24px 0 12px;">$1</h1>');
    h = h.replace(/^&gt; (.*$)/gm, '<blockquote style="border-left:3px solid #2f54eb;padding-left:12px;color:var(--blog-meta);margin:8px 0;">$1</blockquote>');
    h = h.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--blog-border);margin:16px 0;">');
    h = h.replace(/^- (.*$)/gm, '<li>$1</li>');
    h = h.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:#2f54eb;">$1</a>');
    h = h.replace(/\n/g, '<br>');
    return h;
}

// ===== 主题 =====
document.documentElement.setAttribute('data-theme', theme);
document.getElementById('themeToggle').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LS_THEME, theme);
});

// ===== 视图切换 =====
function showView(id) {
    ['viewHome','viewDetail','viewEditor','viewDrafts','viewSettings','viewAuthor','viewNotify','viewMessages'].forEach(v => {
        document.getElementById(v).style.display = v === id ? 'block' : 'none';
    });
}

// ===== 认证UI =====
function updateAuthUI() {
    const area = document.getElementById('authArea');
    if (currentUser) {
        area.innerHTML = '<div style="display:flex;align-items:center;gap:8px;cursor:pointer;" onclick="openDrawer()">' +
            '<div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#2f54eb,#7bc6ff);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.8rem;">' +
            currentUser.username.substring(0,1).toUpperCase() + '</div>' +
            '<span style="font-weight:700;font-size:0.82rem;color:var(--blog-text);">@' + esc(currentUser.username) + '</span></div>';
    } else {
        area.innerHTML = '<button class="blog-btn-sm" onclick="openModal(\'loginModal\')">登录</button>' +
            '<button class="blog-btn-primary" style="width:auto;min-height:34px;padding:0 14px;font-size:0.8rem;" onclick="openModal(\'registerModal\')">注册</button>';
    }
    // 更新抽屉
    const drawerAvatar = document.getElementById('drawerAvatar');
    const drawerName = document.getElementById('drawerName');
    const drawerBadge = document.getElementById('drawerBadge');
    if (currentUser) {
        drawerAvatar.textContent = currentUser.username.substring(0,1).toUpperCase();
        drawerName.textContent = '@' + currentUser.username;
        const unread = notifications.filter(n => n.recipient === currentUser.username && !n.read).length;
        if (unread > 0) { drawerBadge.style.display = 'inline-flex'; drawerBadge.textContent = unread; }
        else { drawerBadge.style.display = 'none'; }
        // 更新私信徽标
        const unreadMsgs = messages.filter(m => m.to === currentUser.username && !m.read).length;
        const msgBadge = document.getElementById('msgBadge');
        if (msgBadge) {
            if (unreadMsgs > 0) { msgBadge.style.display = 'inline-flex'; msgBadge.textContent = unreadMsgs; }
            else { msgBadge.style.display = 'none'; }
        }
    }
}

// ===== 模态框 =====
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function switchToRegister() { closeModal('loginModal'); openModal('registerModal'); }
function switchToLogin() { closeModal('registerModal'); openModal('loginModal'); }

// 点击背景关闭
document.querySelectorAll('.blog-modal-backdrop').forEach(b => {
    b.addEventListener('click', () => b.parentElement.classList.remove('active'));
});

// ===== 登录/注册 =====
function doLogin() {
    const u = document.getElementById('loginUser').value.trim();
    const p = document.getElementById('loginPass').value;
    const err = document.getElementById('loginErr');
    const user = users.find(x => x.username === u && x.password === p);
    if (!user) { err.textContent = '用户名或密码错误'; err.classList.add('show'); return; }
    currentUser = user;
    saveCurrent();
    closeModal('loginModal');
    updateAuthUI();
    renderPostList();
}

function doRegister() {
    const u = document.getElementById('regUser').value.trim();
    const e = document.getElementById('regEmail').value.trim();
    const p = document.getElementById('regPass').value;
    const err = document.getElementById('regErr');
    if (!u || u.length < 2) { err.textContent = '用户名至少2个字符'; err.classList.add('show'); return; }
    if (!p || p.length < 6) { err.textContent = '密码至少6位'; err.classList.add('show'); return; }
    if (users.find(x => x.username === u)) { err.textContent = '用户名已存在'; err.classList.add('show'); return; }
    const user = { username: u, email: e, password: p, createdAt: Date.now() };
    users.push(user);
    saveUsers();
    currentUser = user;
    saveCurrent();
    closeModal('registerModal');
    updateAuthUI();
    renderPostList();
}

function doLogout() {
    currentUser = null;
    saveCurrent();
    closeDrawer();
    updateAuthUI();
    showView('viewHome');
    renderPostList();
}

// ===== 侧边抽屉 =====
function openDrawer() { document.getElementById('userDrawer').classList.add('open'); }
function closeDrawer() { document.getElementById('userDrawer').classList.remove('open'); }

// ===== 文章列表 =====
function renderPostList() {
    const grid = document.getElementById('postGrid');
    const search = (document.getElementById('searchInput').value || '').trim().toLowerCase();
    let list = posts.filter(p => p.status === 'published');
    if (search) list = list.filter(p => p.title.toLowerCase().includes(search) || p.content.toLowerCase().includes(search) || (p.tags||'').toLowerCase().includes(search));
    list.sort((a, b) => b.createdAt - a.createdAt);

    if (list.length === 0) {
        grid.innerHTML = '<div class="blog-empty" style="grid-column:1/-1;">🍃 宇宙空空如也，换个关键字搜搜看吧~</div>';
        return;
    }

    grid.innerHTML = list.map(p => {
        const tags = (p.tags || '').split(',').filter(t => t.trim()).map(t => '<span class="blog-tag">' + esc(t.trim()) + '</span>').join('');
        const excerpt = p.content.substring(0, 80).replace(/\n/g, ' ');
        const date = new Date(p.createdAt).toLocaleDateString('zh-CN');
        return '<div class="blog-card" onclick="showDetail(\'' + p.id + '\')">' +
            '<div class="blog-card-gradient" style="background:' + randGradient() + ';"></div>' +
            '<div class="blog-card-body">' +
            '<h3 class="blog-card-title">' + esc(p.title) + '</h3>' +
            (tags ? '<div class="blog-card-tags">' + tags + '</div>' : '') +
            '<p class="blog-card-excerpt">' + esc(excerpt) + '...</p>' +
            '<div class="blog-card-meta">' +
            '<span>👤 @' + esc(p.author) + '</span>' +
            '<span>⏰ ' + date + '</span>' +
            '<span>👁️ ' + (p.views || 0) + '</span>' +
            '<span>❤️ ' + (p.likes || []).length + '</span>' +
            '</div></div></div>';
    }).join('');
}

// ===== 文章详情 =====
function showDetail(id) {
    const p = posts.find(x => x.id === id);
    if (!p) return;
    p.views = (p.views || 0) + 1;
    savePosts();

    const date = timeAgo(p.createdAt);
    const tags = (p.tags || '').split(',').filter(t => t.trim()).map(t => '<span class="blog-tag">' + esc(t.trim()) + '</span>').join(' ');
    const isLiked = currentUser && (p.likes || []).includes(currentUser.username);
    const comments = p.comments || [];

    let h = '<button class="blog-back-btn" onclick="showView(\'viewHome\');renderPostList();">← 返回首页</button>';
    h += '<div class="blog-article">';

    // 头部
    h += '<div class="blog-article-header">';
    h += '<h1 class="blog-article-title">' + esc(p.title) + '</h1>';
    h += '<div class="blog-article-meta">';
    h += '<span class="blog-author-link" onclick="event.stopPropagation();showAuthor(\'' + esc(p.author) + '\')">👤 @' + esc(p.author) + '</span>';
    h += '<span>⏰ ' + date + '</span>';
    h += '<span>👁️ ' + p.views + ' 次阅读</span>';
    if (currentUser && currentUser.username !== p.author) {
        h += '<span class="blog-author-link" onclick="event.stopPropagation();openMessages(\'' + esc(p.author) + '\')">💬 私信作者</span>';
    }
    h += '</div>';
    if (tags) h += '<div style="margin-top:10px;">' + tags + '</div>';
    h += '</div>';

    // 作者管理
    if (currentUser && currentUser.username === p.author) {
        h += '<div style="padding:12px 32px;background:var(--blog-bg);border-bottom:1px solid var(--blog-border);display:flex;gap:16px;font-size:0.82rem;">';
        h += '<span style="color:var(--blog-meta);">⚙️ 创作管理：</span>';
        h += '<a style="color:#2f54eb;font-weight:700;cursor:pointer;" onclick="openEditor(\'' + p.id + '\')">修改</a>';
        h += '<a style="color:#d85f45;font-weight:700;cursor:pointer;" onclick="confirmDelete(\'' + p.id + '\')">删除</a>';
        h += '</div>';
    }

    // 点赞区
    h += '<div style="padding:20px 32px;display:flex;align-items:center;justify-content:space-between;background:var(--blog-bg);border-bottom:1px solid var(--blog-border);">';
    h += '<div><div style="font-weight:700;font-size:0.9rem;">💡 觉得推文有用？</div><div style="font-size:0.8rem;color:var(--blog-meta);">给作者点个赞，鼓励优质技术分享！</div></div>';
    if (currentUser) {
        h += '<button class="blog-like-btn ' + (isLiked ? 'liked' : '') + '" onclick="toggleLike(\'' + p.id + '\')">' + (isLiked ? '❤️ 已赞' : '❤️ 赞一个') + ' (' + (p.likes || []).length + ')</button>';
    } else {
        h += '<button class="blog-btn-sm" onclick="openModal(\'loginModal\')">🔒 登录点赞 (' + (p.likes || []).length + ')</button>';
    }
    h += '</div>';

    // 正文
    h += '<div class="blog-article-content">' + renderMd(p.content) + '</div>';

    // 评论区
    h += '<div class="blog-comment-section">';
    h += '<h3 style="font-size:1.1rem;font-weight:700;margin-bottom:16px;">💬 互动讨论 (' + comments.length + ')</h3>';

    if (currentUser) {
        h += '<div style="margin-bottom:20px;display:flex;gap:10px;">';
        h += '<textarea id="commentInput" placeholder="支持友善的技术交流..." rows="2" style="flex:1;padding:10px;border:1px solid var(--blog-border);border-radius:8px;font-size:0.9rem;resize:none;background:var(--blog-input);color:var(--blog-text);"></textarea>';
        h += '<button class="blog-btn-primary" style="width:auto;min-height:auto;padding:0 16px;" onclick="addComment(\'' + p.id + '\')">发表评论</button>';
        h += '</div>';
    }

    comments.forEach(c => {
        h += '<div class="blog-comment">';
        h += '<div class="blog-comment-avatar">' + esc(c.author.substring(0,1).toUpperCase()) + '</div>';
        h += '<div style="flex:1;">';
        h += '<span class="blog-comment-author">@' + esc(c.author) + '</span>';
        h += '<span class="blog-comment-time">' + timeAgo(c.createdAt) + '</span>';
        h += '<p class="blog-comment-text">' + esc(c.content) + '</p>';
        h += '</div></div>';
    });

    if (comments.length === 0) h += '<p style="text-align:center;color:var(--blog-meta);padding:20px;font-size:0.88rem;">🍃 暂无讨论</p>';

    h += '</div></div>';

    document.getElementById('detailContent').innerHTML = h;
    showView('viewDetail');
}

// ===== 点赞 =====
function toggleLike(id) {
    if (!currentUser) { openModal('loginModal'); return; }
    const p = posts.find(x => x.id === id);
    if (!p) return;
    if (!p.likes) p.likes = [];
    const idx = p.likes.indexOf(currentUser.username);
    if (idx >= 0) { p.likes.splice(idx, 1); }
    else {
        p.likes.push(currentUser.username);
        // 发送通知
        if (p.author !== currentUser.username) {
            notifications.push({ recipient: p.author, sender: currentUser.username, type: 'like', postId: p.id, postTitle: p.title, read: false, createdAt: Date.now() });
            saveNotifs();
        }
    }
    savePosts();
    showDetail(id);
}

// ===== 评论 =====
function addComment(id) {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    if (!text) return;
    const p = posts.find(x => x.id === id);
    if (!p) return;
    if (!p.comments) p.comments = [];
    p.comments.push({ author: currentUser.username, content: text, createdAt: Date.now() });
    // 发送通知
    if (p.author !== currentUser.username) {
        notifications.push({ recipient: p.author, sender: currentUser.username, type: 'comment', postId: p.id, postTitle: p.title, read: false, createdAt: Date.now() });
        saveNotifs();
    }
    savePosts();
    showDetail(id);
}

// ===== 删除文章 =====
function confirmDelete(id) {
    openModal('deleteModal');
    document.getElementById('confirmDeleteBtn').onclick = () => {
        const idx = posts.findIndex(p => p.id === id);
        if (idx >= 0) posts.splice(idx, 1);
        savePosts();
        closeModal('deleteModal');
        showView('viewHome');
        renderPostList();
    };
}

// ===== 编辑器 =====
function openEditor(id) {
    closeDrawer();
    showView('viewEditor');
    if (id) {
        const p = posts.find(x => x.id === id);
        if (p) {
            document.getElementById('edTitle').value = p.title;
            document.getElementById('edTags').value = p.tags || '';
            document.getElementById('edContent').value = p.content;
            document.getElementById('editorTitle').textContent = '✏️ 润色技术推文';
            editingId = id;
        }
    } else {
        document.getElementById('edTitle').value = '';
        document.getElementById('edTags').value = '';
        document.getElementById('edContent').value = '';
        document.getElementById('editorTitle').textContent = '🚀 记录极客灵感';
        editingId = null;
    }
    updatePreview();
}

function edInsert(start, end) {
    const ta = document.getElementById('edContent');
    const s = ta.selectionStart, e = ta.selectionEnd;
    const sel = ta.value.substring(s, e);
    ta.value = ta.value.substring(0, s) + start + sel + end + ta.value.substring(e);
    ta.focus();
    ta.setSelectionRange(s + start.length, s + start.length + sel.length);
    updatePreview();
}

function updatePreview() {
    const out = document.getElementById('previewOutput');
    const content = document.getElementById('edContent').value;
    out.innerHTML = renderMd(content || '*等待你写下技术灵感...*');
}

function toggleSplit() {
    const panel = document.getElementById('previewPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') updatePreview();
}

function publishPost() {
    if (!currentUser) { openModal('loginModal'); return; }
    const title = document.getElementById('edTitle').value.trim();
    const content = document.getElementById('edContent').value.trim();
    const tags = document.getElementById('edTags').value.trim();
    if (!title) { alert('请输入标题'); return; }
    if (!content) { alert('请输入内容'); return; }

    if (editingId) {
        const p = posts.find(x => x.id === editingId);
        if (p) { p.title = title; p.content = content; p.tags = tags; p.status = 'published'; }
    } else {
        posts.push({ id: 'post_' + Date.now(), title, content, tags, author: currentUser.username, createdAt: Date.now(), views: 0, likes: [], comments: [], status: 'published' });
    }
    savePosts();
    showView('viewHome');
    renderPostList();
}

function saveDraft() {
    if (!currentUser) { openModal('loginModal'); return; }
    const title = document.getElementById('edTitle').value.trim() || '未命名草稿';
    const content = document.getElementById('edContent').value;
    const tags = document.getElementById('edTags').value.trim();

    if (editingId) {
        const p = posts.find(x => x.id === editingId);
        if (p) { p.title = title; p.content = content; p.tags = tags; p.status = 'draft'; }
    } else {
        posts.push({ id: 'post_' + Date.now(), title, content, tags, author: currentUser.username, createdAt: Date.now(), views: 0, likes: [], comments: [], status: 'draft' });
    }
    savePosts();
    alert('草稿已保存！');
    showView('viewHome');
    renderPostList();
}

// ===== 草稿箱 =====
function showDrafts() {
    closeDrawer();
    showView('viewDrafts');
    const drafts = posts.filter(p => p.author === (currentUser||{}).username && p.status === 'draft');
    document.getElementById('draftCount').textContent = drafts.length;

    if (drafts.length === 0) {
        document.getElementById('draftList').innerHTML = '<div class="blog-empty">📁 草稿箱空空如也，灵感来得快去得快，抓紧去写一篇吧！</div>';
        return;
    }

    document.getElementById('draftList').innerHTML = drafts.map(d =>
        '<div class="draft-card"><div><h4>' + esc(d.title) + '</h4><small>🕒 上次保存: ' + timeAgo(d.createdAt) + '</small></div>' +
        '<button class="blog-btn-primary" style="width:auto;min-height:36px;padding:0 18px;font-size:0.85rem;" onclick="openEditor(\'' + d.id + '\')">✏️ 继续编辑</button></div>'
    ).join('');
}

// ===== 个人设置 =====
function showSettings() {
    closeDrawer();
    if (!currentUser) { openModal('loginModal'); return; }
    showView('viewSettings');
    document.getElementById('setUser').value = currentUser.username;
    document.getElementById('setEmail').value = currentUser.email || '';
    const myPosts = posts.filter(p => p.author === currentUser.username);
    const totalLikes = myPosts.reduce((s, p) => s + (p.likes || []).length, 0);
    document.getElementById('setLikes').textContent = totalLikes;
    document.getElementById('setPosts').textContent = myPosts.length;
}

function saveSettings() {
    const newU = document.getElementById('setUser').value.trim();
    const newE = document.getElementById('setEmail').value.trim();
    if (!newU) { alert('用户名不能为空'); return; }
    if (newU !== currentUser.username && users.find(u => u.username === newU)) { alert('用户名已存在'); return; }

    const oldU = currentUser.username;
    if (newU !== oldU) {
        posts.forEach(p => { if (p.author === oldU) p.author = newU; });
        posts.forEach(p => { if (p.comments) p.comments.forEach(c => { if (c.author === oldU) c.author = newU; }); });
        notifications.forEach(n => { if (n.sender === oldU) n.sender = newU; if (n.recipient === oldU) n.recipient = newU; });
        messages.forEach(m => { if (m.from === oldU) m.from = newU; if (m.to === oldU) m.to = newU; });
        const u = users.find(x => x.username === oldU);
        if (u) u.username = newU;
        currentUser.username = newU;
    }
    currentUser.email = newE;
    const u = users.find(x => x.username === currentUser.username);
    if (u) u.email = newE;
    saveUsers(); saveCurrent(); savePosts(); saveNotifs(); saveMessages();
    updateAuthUI();
    alert('修改已保存！');
}

// ===== 作者主页 =====
function showAuthor(username) {
    showView('viewAuthor');
    const myPosts = posts.filter(p => p.author === username && p.status === 'published');
    const totalLikes = myPosts.reduce((s, p) => s + (p.likes || []).length, 0);
    const followerList = Object.entries(follows).filter(([k, v]) => v && v.includes(username)).map(([k]) => k);
    const isFollowing = currentUser && follows[currentUser.username] && follows[currentUser.username].includes(username);

    let h = '<div class="blog-card" style="overflow:hidden;margin-bottom:20px;">';
    h += '<div style="height:80px;background:linear-gradient(135deg,#0a2a2a,#0d3b3b);"></div>';
    h += '<div style="padding:0 24px 24px;">';
    h += '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:12px;">';
    h += '<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#2f54eb,#7bc6ff);color:#fff;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900;border:4px solid var(--blog-card);margin-top:-36px;">' + username.substring(0,1).toUpperCase() + '</div>';
    if (currentUser && currentUser.username !== username) {
        h += '<div style="display:flex;gap:8px;">';
        h += '<button class="blog-btn-primary" style="width:auto;min-height:34px;padding:0 18px;font-size:0.85rem;" onclick="toggleFollow(\'' + esc(username) + '\')">' + (isFollowing ? '✔ 已关注' : '➕ 关注他') + '</button>';
        h += '<button class="blog-btn-outline" style="width:auto;min-height:34px;padding:0 18px;font-size:0.85rem;" onclick="openMessages(\'' + esc(username) + '\')">💬 私信</button>';
        h += '</div>';
    }
    h += '</div>';
    h += '<h2 style="margin:0 0 4px;font-weight:900;">@' + esc(username) + '</h2>';
    h += '<p style="color:var(--blog-meta);font-size:0.82rem;margin:0 0 16px;">✨ 算法竞赛训练站创作者</p>';
    h += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center;padding-top:16px;border-top:1px solid var(--blog-border);">';
    h += '<div><div class="blog-stat-num">' + followerList.length + '</div><div class="blog-stat-label">粉丝</div></div>';
    h += '<div><div class="blog-stat-num">' + myPosts.length + '</div><div class="blog-stat-label">推文</div></div>';
    h += '<div><div class="blog-stat-num">' + totalLikes + '</div><div class="blog-stat-label">获赞</div></div>';
    h += '</div></div></div>';

    h += '<h3 style="margin-bottom:14px;">📝 TA的文章</h3>';
    if (myPosts.length === 0) {
        h += '<div class="blog-empty">暂无文章</div>';
    } else {
        myPosts.forEach(p => {
            const date = new Date(p.createdAt).toLocaleDateString('zh-CN');
            h += '<div class="blog-card" style="margin-bottom:12px;cursor:pointer;" onclick="showDetail(\'' + p.id + '\')">';
            h += '<div class="blog-card-body"><h3 class="blog-card-title">' + esc(p.title) + '</h3>';
            h += '<div class="blog-card-meta"><span>⏰ ' + date + '</span><span>❤️ ' + (p.likes||[]).length + '</span></div></div></div>';
        });
    }

    document.getElementById('authorContent').innerHTML = h;
}

function toggleFollow(username) {
    if (!currentUser) { openModal('loginModal'); return; }
    if (!follows[currentUser.username]) follows[currentUser.username] = [];
    const idx = follows[currentUser.username].indexOf(username);
    if (idx >= 0) follows[currentUser.username].splice(idx, 1);
    else follows[currentUser.username].push(username);
    saveFollows();
    showAuthor(username);
}

// ===== 通知中心 =====
function showNotifications() {
    closeDrawer();
    showView('viewNotify');
    if (!currentUser) return;
    const myNotifs = notifications.filter(n => n.recipient === currentUser.username).sort((a, b) => b.createdAt - a.createdAt);

    if (myNotifs.length === 0) {
        document.getElementById('notifyList').innerHTML = '<div class="blog-empty">🍃 暂无通知</div>';
        return;
    }

    document.getElementById('notifyList').innerHTML = myNotifs.map(n => {
        const icon = n.type === 'like' ? '❤️' : '💬';
        const text = n.type === 'like' ? '赞了你的文章' : '评论了你的文章';
        return '<div class="notify-item" onclick="showDetail(\'' + n.postId + '\')">' +
            icon + ' <span style="font-weight:700;">@' + esc(n.sender) + '</span> ' + text +
            ' <span class="notify-post">「' + esc(n.postTitle || '') + '」</span>' +
            '<span class="notify-time">' + timeAgo(n.createdAt) + '</span></div>';
    }).join('');

    // 标记已读
    myNotifs.forEach(n => n.read = true);
    saveNotifs();
    updateAuthUI();
}

// ===== 私信系统 =====
function showMessages() {
    closeDrawer();
    if (!currentUser) { openModal('loginModal'); return; }
    showView('viewMessages');
    renderMsgConvList();
    // 初始化表情面板
    initEmojiPanel();
    // 如果没有活跃对话，显示空状态
    if (!msgActiveChat) {
        document.getElementById('msgChatHeader').innerHTML = '<span style="color:var(--blog-meta);font-weight:400;">选择一个对话开始聊天</span>';
        document.getElementById('msgChatMessages').innerHTML = '<div class="msg-empty-chat"><div><div style="font-size:3rem;margin-bottom:12px;">💬</div><div>选择左侧的对话，或从用户主页发起私信</div></div></div>';
        document.getElementById('msgChatInputArea').style.display = 'none';
    }
}

function openMessages(username) {
    closeDrawer();
    if (!currentUser) { openModal('loginModal'); return; }
    showView('viewMessages');
    initEmojiPanel();
    // 检查是否是自己
    if (username === currentUser.username) {
        alert('不能给自己发私信哦');
        return;
    }
    openChat(username);
    renderMsgConvList();
}

function initEmojiPanel() {
    const panel = document.getElementById('msgEmojiPanel');
    if (panel.children.length > 0) return;
    panel.innerHTML = MSG_EMOJIS.map(e =>
        '<button class="msg-emoji-item" onclick="msgInsertEmoji(\'' + e + '\')">' + e + '</button>'
    ).join('');
}

function getConversations(username) {
    const convMap = {};
    messages.forEach(m => {
        if (m.from !== username && m.to !== username) return;
        const other = m.from === username ? m.to : m.from;
        if (!convMap[other]) {
            convMap[other] = { otherUser: other, lastMessage: m, unreadCount: 0, timestamp: m.timestamp };
        }
        if (m.timestamp > convMap[other].timestamp) {
            convMap[other].lastMessage = m;
            convMap[other].timestamp = m.timestamp;
        }
        if (m.to === username && !m.read) {
            convMap[other].unreadCount++;
        }
    });
    return Object.values(convMap).sort((a, b) => b.timestamp - a.timestamp);
}

function getUnreadCount(username) {
    return messages.filter(m => m.to === username && !m.read).length;
}

function renderMsgConvList() {
    if (!currentUser) return;
    const convs = getConversations(currentUser.username);
    const list = document.getElementById('msgConvList');

    if (convs.length === 0) {
        list.innerHTML = '<div class="msg-new-chat-hint">暂无对话<br><small>在用户主页点击"私信"开始聊天</small></div>';
        return;
    }

    list.innerHTML = convs.map(c => {
        const isActive = msgActiveChat === c.otherUser;
        const isUnread = c.unreadCount > 0;
        const lastMsg = c.lastMessage;
        let preview = '';
        if (lastMsg.type === 'text') preview = lastMsg.content.substring(0, 30);
        else if (lastMsg.type === 'image') preview = '[图片]';
        else if (lastMsg.type === 'file') preview = '[文件] ' + (lastMsg.fileName || '');
        else if (lastMsg.type === 'emoji') preview = lastMsg.content;
        const timeStr = formatMsgTime(lastMsg.timestamp);
        const avatar = c.otherUser.substring(0, 1).toUpperCase();

        return '<div class="msg-conv-item' + (isActive ? ' active' : '') + (isUnread ? ' unread' : '') + '" onclick="openChat(\'' + esc(c.otherUser) + '\')">' +
            '<div class="msg-conv-avatar">' + avatar + '</div>' +
            '<div class="msg-conv-info">' +
            '<div class="msg-conv-name">@' + esc(c.otherUser) + '</div>' +
            '<div class="msg-conv-last">' + esc(preview) + '</div>' +
            '</div>' +
            '<div class="msg-conv-right">' +
            '<div class="msg-conv-time">' + timeStr + '</div>' +
            (isUnread ? '<div class="msg-conv-unread">' + c.unreadCount + '</div>' : '') +
            '</div></div>';
    }).join('');
}

function formatMsgTime(ts) {
    const now = Date.now();
    const diff = now - ts;
    const d = new Date(ts);
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
    return d.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
}

function openChat(username) {
    msgActiveChat = username;

    // 在移动端隐藏侧边栏
    if (window.innerWidth <= 540) {
        document.getElementById('msgSidebar').classList.add('msg-hidden-mobile');
    }

    // 渲染聊天头部
    const avatar = username.substring(0, 1).toUpperCase();
    document.getElementById('msgChatHeader').innerHTML =
        '<button class="blog-btn-sm" onclick="msgBackToList()" style="margin-right:8px;padding:4px 10px;">←</button>' +
        '<div class="msg-chat-header-avatar">' + avatar + '</div>' +
        '<div class="msg-chat-header-info">' +
        '<div class="msg-chat-header-name">@' + esc(username) + '</div>' +
        '<div class="msg-chat-header-status">私信</div>' +
        '</div>';

    // 显示输入区
    document.getElementById('msgChatInputArea').style.display = 'block';

    // 标记消息已读
    messages.forEach(m => {
        if (m.from === username && m.to === currentUser.username && !m.read) {
            m.read = true;
        }
    });
    saveMessages();
    updateAuthUI();
    renderMsgConvList();
    renderChatMessages(username);
}

function msgBackToList() {
    msgActiveChat = null;
    document.getElementById('msgSidebar').classList.remove('msg-hidden-mobile');
    document.getElementById('msgChatHeader').innerHTML = '<span style="color:var(--blog-meta);font-weight:400;">选择一个对话开始聊天</span>';
    document.getElementById('msgChatMessages').innerHTML = '<div class="msg-empty-chat"><div><div style="font-size:3rem;margin-bottom:12px;">💬</div><div>选择左侧的对话，或从用户主页发起私信</div></div></div>';
    document.getElementById('msgChatInputArea').style.display = 'none';
}

function renderChatMessages(username) {
    const container = document.getElementById('msgChatMessages');
    const pair = messages.filter(m =>
        (m.from === currentUser.username && m.to === username) ||
        (m.from === username && m.to === currentUser.username)
    ).sort((a, b) => a.timestamp - b.timestamp);

    if (pair.length === 0) {
        container.innerHTML = '<div class="msg-empty-chat"><div><div style="font-size:2rem;margin-bottom:8px;">👋</div><div>开始和 @' + esc(username) + ' 的对话吧</div></div></div>';
        return;
    }

    let html = '';
    let lastDate = '';

    pair.forEach(m => {
        const d = new Date(m.timestamp);
        const dateStr = d.toLocaleDateString('zh-CN');
        if (dateStr !== lastDate) {
            html += '<div class="msg-date-divider"><span>' + dateStr + '</span></div>';
            lastDate = dateStr;
        }

        const isOwn = m.from === currentUser.username;
        const wrapClass = isOwn ? 'own' : 'other';
        const timeStr = d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

        html += '<div class="msg-bubble-wrap ' + wrapClass + '">';

        if (m.type === 'emoji') {
            html += '<div class="msg-bubble msg-emoji-bubble">' + esc(m.content) + '</div>';
        } else if (m.type === 'image') {
            html += '<div class="msg-bubble"><img class="msg-image-attachment" src="' + m.imageData + '" alt="图片" onclick="window.open(this.src)"></div>';
        } else if (m.type === 'file') {
            html += '<div class="msg-bubble">' +
                '<a class="msg-file-attachment" onclick="msgDownloadFile(\'' + m.id + '\')">' +
                '<span class="msg-file-icon">📄</span>' +
                '<span class="msg-file-info">' +
                '<span class="msg-file-name">' + esc(m.fileName || '文件') + '</span>' +
                '<span class="msg-file-size">' + esc(m.fileSize || '') + '</span>' +
                '</span></a></div>';
        } else {
            html += '<div class="msg-bubble">' + esc(m.content) + '</div>';
        }

        html += '<div class="msg-bubble-time">' + timeStr + '</div>';
        html += '</div>';
    });

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
}

function msgSend() {
    if (!currentUser || !msgActiveChat) return;
    const input = document.getElementById('msgInput');
    const text = input.value.trim();
    if (!text) return;

    // 判断是否是纯表情消息
    const isEmoji = MSG_EMOJIS.includes(text) || /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]+$/u.test(text);

    const msg = {
        id: Date.now(),
        from: currentUser.username,
        to: msgActiveChat,
        content: text,
        type: isEmoji ? 'emoji' : 'text',
        timestamp: Date.now(),
        read: false
    };

    messages.push(msg);
    saveMessages();
    input.value = '';
    input.style.height = 'auto';
    renderChatMessages(msgActiveChat);
    renderMsgConvList();
}

function msgPickFile() {
    document.getElementById('msgFileInput').click();
}

function msgHandleFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!currentUser || !msgActiveChat) return;

    // 限制文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('文件大小不能超过5MB，localStorage存储空间有限');
        event.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const sizeStr = file.size < 1024 ? file.size + 'B' :
            file.size < 1048576 ? (file.size / 1024).toFixed(1) + 'KB' :
            (file.size / 1048576).toFixed(1) + 'MB';

        const msg = {
            id: Date.now(),
            from: currentUser.username,
            to: msgActiveChat,
            content: '',
            type: 'file',
            fileName: file.name,
            fileSize: sizeStr,
            fileData: e.target.result,
            timestamp: Date.now(),
            read: false
        };

        messages.push(msg);
        saveMessages();
        renderChatMessages(msgActiveChat);
        renderMsgConvList();
    };
    reader.readAsDataURL(file);
    event.target.value = '';
}

function msgPickImage() {
    document.getElementById('msgImageInput').click();
}

function msgHandleImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!currentUser || !msgActiveChat) return;

    // 限制图片大小 (2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('图片大小不能超过2MB');
        event.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const msg = {
            id: Date.now(),
            from: currentUser.username,
            to: msgActiveChat,
            content: '',
            type: 'image',
            imageData: e.target.result,
            timestamp: Date.now(),
            read: false
        };

        messages.push(msg);
        saveMessages();
        renderChatMessages(msgActiveChat);
        renderMsgConvList();
    };
    reader.readAsDataURL(file);
    event.target.value = '';
}

function msgToggleEmoji() {
    const panel = document.getElementById('msgEmojiPanel');
    panel.classList.toggle('show');
}

function msgInsertEmoji(emoji) {
    const input = document.getElementById('msgInput');
    input.value += emoji;
    input.focus();
    document.getElementById('msgEmojiPanel').classList.remove('show');
}

function msgDownloadFile(msgId) {
    const msg = messages.find(m => m.id === msgId);
    if (!msg || !msg.fileData) { alert('文件数据不可用'); return; }
    const a = document.createElement('a');
    a.href = msg.fileData;
    a.download = msg.fileName || 'file';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ===== 点击粒子效果 =====
(function() {
    const words = ['🍀 暴赞', '💻 Bug-1', '🚀 完美运行', '❤️ 喜欢', '🌟 极客', '🎉 成功', '✨ 乾坤', '🔥 登顶'];
    let idx = 0;
    const colors = ['#0d6efd', '#dc3545', '#198754', '#ffc107', '#6f42c1', '#fd7e14'];
    document.body.addEventListener('click', e => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('.blog-drawer') || e.target.closest('.blog-modal')) return;
        const span = document.createElement('span');
        span.className = 'blog-particle';
        span.textContent = words[idx];
        idx = (idx + 1) % words.length;
        span.style.top = e.pageY + 'px';
        span.style.left = e.pageX + 'px';
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(span);
        setTimeout(() => { span.style.transform = 'translateY(-100px)'; span.style.opacity = '0'; }, 50);
        setTimeout(() => span.remove(), 1500);
    });
})();

// ===== 初始化 =====
updateAuthUI();
renderPostList();

// 私信输入框：Enter发送，Shift+Enter换行，自动调整高度
document.addEventListener('DOMContentLoaded', function() {
    const msgInput = document.getElementById('msgInput');
    if (msgInput) {
        msgInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                msgSend();
            }
        });
        msgInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }
});
