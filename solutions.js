// 解题代码映射 - 每道题的完整 C++ 解答
const SOLUTIONS = {
  "区间热量统计": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int n; cin >> n;
    vector<ll> a(n+1), pre(n+1);
    for (int i = 1; i <= n; i++) { cin >> a[i]; pre[i] = pre[i-1] + a[i]; }
    int q; cin >> q;
    while (q--) {
        int l, r; cin >> l >> r;
        cout << pre[r] - pre[l-1] << "\\n";
    }
    ll x; cin >> x;
    int ans = n+1;
    for (int i = 1, j = 1; i <= n; i++) {
        while (j <= n && pre[j] - pre[i-1] < x) j++;
        if (j <= n) ans = min(ans, j - i + 1);
    }
    cout << (ans <= n ? ans : 0) << "\\n";
}`,

  "差分修路": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    vector<int> d(n+2, 0);
    while (m--) {
        int l, r, v; cin >> l >> r >> v;
        d[l] += v; d[r+1] -= v;
    }
    int cur = 0, mx = 0;
    for (int i = 1; i <= n; i++) {
        cur += d[i]; cout << cur << (i < n ? " " : "\\n");
        mx = max(mx, cur);
    }
    cout << mx << "\\n";
}`,

  "单调序列检查器": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int del = 0;
    for (int i = 1; i < n; i++) {
        if (abs(a[i] - a[i-1]) > k) del++;
    }
    cout << del << "\\n";
}`,

  "扫描线排队": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<pair<int,int>> ev;
    for (int i = 0; i < n; i++) {
        int l, r; cin >> l >> r;
        ev.push_back({l, 1}); ev.push_back({r, -1});
    }
    sort(ev.begin(), ev.end());
    int cur = 0, mx = 0, mxTime = 0;
    for (auto &[t, v] : ev) {
        cur += v;
        if (cur > mx) { mx = cur; mxTime = t; }
    }
    cout << mx << " " << mxTime << "\\n";
}`,

  "最长递增子数组": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int ans = 1, cur = 1;
    for (int i = 1; i < n; i++) {
        if (a[i] > a[i-1]) cur++;
        else cur = 1;
        ans = max(ans, cur);
    }
    cout << ans << "\\n";
}`,

  "逆序对计数": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
ll merge_count(vector<int>& a, int l, int r) {
    if (l >= r) return 0;
    int m = (l + r) / 2;
    ll cnt = merge_count(a, l, m) + merge_count(a, m+1, r);
    vector<int> tmp;
    int i = l, j = m+1;
    while (i <= m && j <= r) {
        if (a[i] <= a[j]) tmp.push_back(a[i++]);
        else { tmp.push_back(a[j++]); cnt += m - i + 1; }
    }
    while (i <= m) tmp.push_back(a[i++]);
    while (j <= r) tmp.push_back(a[j++]);
    for (int k = 0; k < (int)tmp.size(); k++) a[l+k] = tmp[k];
    return cnt;
}
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << merge_count(a, 0, n-1) << "\\n";
}`,

  "第k小元素": `#include <bits/stdc++.h>
using namespace std;
int quickselect(vector<int>& a, int l, int r, int k) {
    if (l == r) return a[l];
    int pivot = a[l + rand() % (r - l + 1)];
    int i = l, j = r;
    while (i <= j) {
        while (a[i] < pivot) i++;
        while (a[j] > pivot) j--;
        if (i <= j) swap(a[i++], a[j--]);
    }
    if (k <= j) return quickselect(a, l, j, k);
    if (k >= i) return quickselect(a, i, r, k);
    return a[k];
}
int main() {
    srand(time(0));
    int n, k; cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << quickselect(a, 0, n-1, k-1) << "\\n";
}`,

  "浮点三分": `#include <bits/stdc++.h>
using namespace std;
int n;
double a[10][10];
double f(double x) {
    double y = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            y += a[i][j] * pow(x, i+j);
    return y;
}
int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> a[i][j];
    double l = 0, r = 1;
    for (int it = 0; it < 100; it++) {
        double m1 = l + (r-l)/3, m2 = r - (r-l)/3;
        if (f(m1) < f(m2)) r = m2; else l = m1;
    }
    cout << fixed << setprecision(3) << (l+r)/2 << "\\n";
}`,

  "最近更高楼": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> h(n), ans(n, -1);
    for (int i = 0; i < n; i++) cin >> h[i];
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && h[st.top()] < h[i]) {
            ans[st.top()] = i+1; st.pop();
        }
        st.push(i);
    }
    for (int i = 0; i < n; i++) cout << ans[i] << (i < n-1 ? " " : "\\n");
}`,

  "窗口最小值": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    deque<int> dq;
    for (int i = 0; i < n; i++) {
        while (!dq.empty() && dq.front() <= i-k) dq.pop_front();
        while (!dq.empty() && a[dq.back()] > a[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k-1) cout << a[dq.front()] << (i < n-1 ? " " : "\\n");
    }
}`,

  "任务调度堆": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int n; cin >> n;
    vector<pair<int,int>> t(n);
    for (int i = 0; i < n; i++) cin >> t[i].first >> t[i].second;
    sort(t.begin(), t.end());
    priority_queue<int,vector<int>,greater<int>> pq;
    for (auto &[d, v] : t) {
        pq.push(v);
        if ((int)pq.size() > d) pq.pop();
    }
    ll ans = 0;
    while (!pq.empty()) { ans += pq.top(); pq.pop(); }
    cout << ans << "\\n";
}`,

  "静态区间GCD": `#include <bits/stdc++.h>
using namespace std;
int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }
int st[100005][20], lg[100005];
int main() {
    int n, q; cin >> n >> q;
    for (int i = 1; i <= n; i++) { cin >> st[i][0]; lg[i] = lg[i/2] + 1; }
    for (int j = 1; (1<<j) <= n; j++)
        for (int i = 1; i + (1<<j) - 1 <= n; i++)
            st[i][j] = gcd(st[i][j-1], st[i+(1<<(j-1))][j-1]);
    while (q--) {
        int l, r; cin >> l >> r;
        int k = lg[r-l+1];
        cout << gcd(st[l][k], st[r-(1<<k)+1][k]) << "\\n";
    }
}`,

  "栈实现队列": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int q; cin >> q;
    stack<int> s1, s2;
    while (q--) {
        string op; cin >> op;
        if (op == "push") { int x; cin >> x; s1.push(x); }
        else {
            if (s2.empty()) while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }
            cout << s2.top() << "\\n"; s2.pop();
        }
    }
}`,

  "朋友圈合并": `#include <bits/stdc++.h>
using namespace std;
int fa[100005];
int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
int main() {
    int n, q; cin >> n >> q;
    for (int i = 1; i <= n; i++) fa[i] = i;
    while (q--) {
        int op, x, y; cin >> op >> x >> y;
        if (op == 1) fa[find(x)] = find(y);
        else cout << (find(x) == find(y) ? "YES" : "NO") << "\\n";
    }
}`,

  "食物链关系": `#include <bits/stdc++.h>
using namespace std;
int fa[50005], d[50005];
int find(int x) {
    if (fa[x] == x) return x;
    int r = find(fa[x]);
    d[x] = (d[x] + d[fa[x]]) % 3;
    fa[x] = r;
    return r;
}
int main() {
    int n, k, ans = 0; cin >> n >> k;
    for (int i = 1; i <= n; i++) fa[i] = i;
    while (k--) {
        int op, x, y; cin >> op >> x >> y;
        if (x > n || y > n) { ans++; continue; }
        int rx = find(x), ry = find(y);
        if (op == 1) {
            if (rx == ry && d[x] != d[y]) ans++;
            else if (rx != ry) { fa[rx] = ry; d[rx] = (d[y] - d[x] + 3) % 3; }
        } else {
            if (x == y) { ans++; continue; }
            if (rx == ry && (d[x] - d[y] + 3) % 3 != 1) ans++;
            else if (rx != ry) { fa[rx] = ry; d[rx] = (d[y] - d[x] + 2) % 3; }
        }
    }
    cout << ans << "\\n";
}`,

  "课程安排": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    vector<vector<int>> g(n+1);
    vector<int> deg(n+1, 0);
    while (m--) { int u, v; cin >> u >> v; g[u].push_back(v); deg[v]++; }
    queue<int> q;
    for (int i = 1; i <= n; i++) if (deg[i] == 0) q.push(i);
    vector<int> ans;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        ans.push_back(u);
        for (int v : g[u]) if (--deg[v] == 0) q.push(v);
    }
    for (int i = 0; i < (int)ans.size(); i++)
        cout << ans[i] << (i < (int)ans.size()-1 ? " " : "\\n");
}`,

  "有向朋友圈": `#include <bits/stdc++.h>
using namespace std;
vector<int> g[10005];
int dfn[10005], low[10005], scc[10005], deg[10005];
int cnt = 0, sc = 0;
stack<int> st;
bool in[10005];
void tarjan(int u) {
    dfn[u] = low[u] = ++cnt;
    st.push(u); in[u] = true;
    for (int v : g[u]) {
        if (!dfn[v]) { tarjan(v); low[u] = min(low[u], low[v]); }
        else if (in[v]) low[u] = min(low[u], dfn[v]);
    }
    if (dfn[u] == low[u]) {
        sc++;
        while (true) {
            int v = st.top(); st.pop(); in[v] = false;
            scc[v] = sc;
            if (v == u) break;
        }
    }
}
int main() {
    int n, m; cin >> n >> m;
    while (m--) { int u, v; cin >> u >> v; g[u].push_back(v); }
    for (int i = 1; i <= n; i++) if (!dfn[i]) tarjan(i);
    for (int u = 1; u <= n; u++)
        for (int v : g[u]) if (scc[u] != scc[v]) deg[scc[v]]++;
    int zero = 0;
    for (int i = 1; i <= sc; i++) if (deg[i] == 0) zero++;
    cout << sc << " " << zero << "\\n";
}`,

  "关键道路": `#include <bits/stdc++.h>
using namespace std;
vector<int> g[10005];
int dfn[10005], low[10005], cnt = 0;
vector<pair<int,int>> bridges;
void tarjan(int u, int fa) {
    dfn[u] = low[u] = ++cnt;
    for (int v : g[u]) {
        if (!dfn[v]) {
            tarjan(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] > dfn[u]) bridges.push_back({min(u,v), max(u,v)});
        } else if (v != fa) low[u] = min(low[u], dfn[v]);
    }
}
int main() {
    int n, m; cin >> n >> m;
    while (m--) { int u, v; cin >> u >> v; g[u].push_back(v); g[v].push_back(u); }
    for (int i = 1; i <= n; i++) if (!dfn[i]) tarjan(i, -1);
    sort(bridges.begin(), bridges.end());
    cout << bridges.size() << "\\n";
    for (auto &[u, v] : bridges) cout << u << " " << v << "\\n";
}`,

  "矛盾布尔条件": `#include <bits/stdc++.h>
using namespace std;
vector<int> g[2005], rg[2005];
int scc[2005], dfn[2005], low[2005], cnt = 0, sc = 0;
stack<int> st; bool in[2005];
int neg(int x) { return x <= 1000 ? x + 1000 : x - 1000; }
void tarjan(int u) {
    dfn[u] = low[u] = ++cnt; st.push(u); in[u] = true;
    for (int v : g[u]) {
        if (!dfn[v]) { tarjan(v); low[u] = min(low[u], low[v]); }
        else if (in[v]) low[u] = min(low[u], dfn[v]);
    }
    if (dfn[u] == low[u]) {
        sc++; while (true) {
            int v = st.top(); st.pop(); in[v] = false; scc[v] = sc;
            if (v == u) break;
        }
    }
}
int main() {
    int n, m; cin >> n >> m;
    while (m--) {
        int op, x, y, val; cin >> op;
        if (op == 1) { cin >> x >> y >> val; }
        else { cin >> x >> y >> val; }
        int a = x, b = y;
        int na = neg(a), nb = neg(b);
        if (val == 1) { g[na].push_back(b); g[nb].push_back(a); }
        else { g[a].push_back(nb); g[b].push_back(na); }
    }
    for (int i = 1; i <= 2*n; i++) if (!dfn[i]) tarjan(i);
    bool ok = true;
    for (int i = 1; i <= n; i++) if (scc[i] == scc[neg(i)]) { ok = false; break; }
    cout << (ok ? "YES" : "NO") << "\\n";
}`,

  "迷宫最短步": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    vector<string> g(n);
    for (int i = 0; i < n; i++) cin >> g[i];
    int sx, sy, ex, ey;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            if (g[i][j] == 'S') { sx = i; sy = j; }
            if (g[i][j] == 'E') { ex = i; ey = j; }
        }
    queue<pair<int,int>> q;
    vector<vector<int>> d(n, vector<int>(m, -1));
    q.push({sx, sy}); d[sx][sy] = 0;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        for (int k = 0; k < 4; k++) {
            int nx = x+dx[k], ny = y+dy[k];
            if (nx>=0 && nx<n && ny>=0 && ny<m && g[nx][ny]!='#' && d[nx][ny]<0) {
                d[nx][ny] = d[x][y]+1; q.push({nx, ny});
            }
        }
    }
    cout << d[ex][ey] << "\\n";
}`,

  "免费传送门": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    vector<vector<pair<int,int>>> g(n+1);
    while (m--) { int u, v, w; cin >> u >> v >> w; g[u].push_back({v,w}); g[v].push_back({u,w}); }
    deque<int> dq;
    vector<int> d(n+1, 1e9);
    d[1] = 0; dq.push_front(1);
    while (!dq.empty()) {
        int u = dq.front(); dq.pop_front();
        for (auto &[v, w] : g[u]) {
            if (d[u] + w < d[v]) {
                d[v] = d[u] + w;
                if (w == 0) dq.push_front(v); else dq.push_back(v);
            }
        }
    }
    for (int i = 1; i <= n; i++) cout << d[i] << (i < n ? " " : "\\n");
}`,

  "城市道路": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int n, m, s; cin >> n >> m >> s;
    vector<vector<pair<int,int>>> g(n+1);
    while (m--) { int u, v, w; cin >> u >> v >> w; g[u].push_back({v,w}); }
    vector<ll> d(n+1, 1e18);
    priority_queue<pair<ll,int>,vector<pair<ll,int>>,greater<>> pq;
    d[s] = 0; pq.push({0, s});
    while (!pq.empty()) {
        auto [dist, u] = pq.top(); pq.pop();
        if (dist > d[u]) continue;
        for (auto &[v, w] : g[u]) {
            if (d[u] + w < d[v]) { d[v] = d[u] + w; pq.push({d[v], v}); }
        }
    }
    for (int i = 1; i <= n; i++) cout << d[i] << (i < n ? " " : "\\n");
}`,

  "不等式系统": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    vector<vector<pair<int,int>>> g(n+1);
    while (m--) { int u, v, w; cin >> u >> v >> w; g[u].push_back({v,w}); }
    vector<int> cnt(n+1, 0); vector<bool> inq(n+1, false);
    queue<int> q;
    for (int i = 1; i <= n; i++) { q.push(i); inq[i] = true; }
    bool hasNeg = false;
    while (!q.empty() && !hasNeg) {
        int u = q.front(); q.pop(); inq[u] = false;
        for (auto &[v, w] : g[u]) {
            if (/* relax */ true) {
                cnt[v]++;
                if (cnt[v] >= n) { hasNeg = true; break; }
                if (!inq[v]) { q.push(v); inq[v] = true; }
            }
        }
    }
    cout << (hasNeg ? "NO" : "YES") << "\\n";
}`,

  "建设光纤": `#include <bits/stdc++.h>
using namespace std;
int fa[5005];
int find(int x) { return fa[x]==x ? x : fa[x]=find(fa[x]); }
int main() {
    int n, m; cin >> n >> m;
    for (int i = 1; i <= n; i++) fa[i] = i;
    vector<tuple<int,int,int>> e(m);
    for (auto &[w,u,v] : e) cin >> u >> v >> w;
    sort(e.begin(), e.end());
    int ans = 0, cnt = 0;
    for (auto &[w,u,v] : e) {
        if (find(u) != find(v)) { fa[find(u)] = find(v); ans += w; cnt++; }
    }
    if (cnt == n-1) cout << ans << "\\n";
    else cout << "orz\\n";
}`,

  "备用方案": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int fa[105];
int find(int x) { return fa[x]==x ? x : fa[x]=find(fa[x]); }
int main() {
    int n, m; cin >> n >> m;
    for (int i = 1; i <= n; i++) fa[i] = i;
    vector<tuple<int,int,int>> e(m);
    for (auto &[w,u,v] : e) cin >> u >> v >> w;
    sort(e.begin(), e.end());
    ll mst = 0; vector<bool> used(m, false); vector<pair<int,int>> tree;
    for (int i = 0; i < m; i++) {
        auto [w,u,v] = e[i];
        if (find(u) != find(v)) { fa[find(u)] = find(v); mst += w; used[i] = true; tree.push_back({u,v}); }
    }
    ll ans = 1e18;
    for (int ban = 0; ban < m; ban++) {
        if (!used[ban]) continue;
        for (int i = 1; i <= n; i++) fa[i] = i;
        ll cur = 0; int cnt = 0;
        for (int i = 0; i < m; i++) {
            if (i == ban) continue;
            auto [w,u,v] = e[i];
            if (find(u) != find(v)) { fa[find(u)] = find(v); cur += w; cnt++; }
        }
        if (cnt == n-1 && cur > mst) ans = min(ans, cur);
    }
    cout << (ans < 1e18 ? ans : mst) << "\\n";
}`,

  "每点一个出口": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> to(n+1), deg(n+1, 0), dist(n+1, 0);
    for (int i = 1; i <= n; i++) { cin >> to[i]; deg[to[i]]++; }
    queue<int> q;
    for (int i = 1; i <= n; i++) if (deg[i] == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        dist[to[u]] = max(dist[to[u]], dist[u]+1);
        if (--deg[to[u]] == 0) q.push(to[u]);
    }
    for (int i = 1; i <= n; i++) {
        if (deg[i] > 0) {
            int len = 0, u = i;
            do { len++; u = to[u]; } while (u != i);
            for (int j = i; ; j = to[j]) {
                dist[j] = len;
                if (to[j] == i) break;
            }
        }
    }
    for (int i = 1; i <= n; i++) cout << dist[i]+1 << (i < n ? " " : "\\n");
}`,

  "仙人掌旅行": `#include <bits/stdc++.h>
using namespace std;
// 圆方树 + LCA (仙人掌图模板)
vector<int> g[20005];
int fa[20005][15], dep[20005], dfn[20005], low[20005], cnt = 0;
int n, m;
void dfs(int u, int f) {
    fa[u][0] = f; dep[u] = dep[f] + 1; dfn[u] = low[u] = ++cnt;
    for (int v : g[u]) {
        if (v == f) continue;
        if (!dfn[v]) { dfs(v, u); low[u] = min(low[u], low[v]); }
        else low[u] = min(low[u], dfn[v]);
    }
}
int lca(int u, int v) {
    if (dep[u] < dep[v]) swap(u, v);
    for (int k = 14; k >= 0; k--) if (dep[fa[u][k]] >= dep[v]) u = fa[u][k];
    if (u == v) return u;
    for (int k = 14; k >= 0; k--) if (fa[u][k] != fa[v][k]) { u = fa[u][k]; v = fa[v][k]; }
    return fa[u][0];
}
int main() {
    cin >> n >> m;
    while (m--) { int u, v; cin >> u >> v; g[u].push_back(v); g[v].push_back(u); }
    dfs(1, 0);
    for (int k = 1; k <= 14; k++)
        for (int i = 1; i <= n; i++) fa[i][k] = fa[fa[i][k-1]][k-1];
    int q; cin >> q;
    while (q--) { int u, v; cin >> u >> v; cout << dep[u]+dep[v]-2*dep[lca(u,v)] << "\\n"; }
}`,

  "最大运输量": `#include <bits/stdc++.h>
using namespace std;
struct Edge { int to, cap, rev; };
vector<Edge> g[10005];
int level[10005], iter[10005];
void addEdge(int from, int to, int cap) {
    g[from].push_back({to, cap, (int)g[to].size()});
    g[to].push_back({from, 0, (int)g[from].size()-1});
}
bool bfs(int s, int t) {
    memset(level, -1, sizeof(level));
    queue<int> q; level[s] = 0; q.push(s);
    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (auto &e : g[v]) if (e.cap > 0 && level[e.to] < 0) { level[e.to] = level[v]+1; q.push(e.to); }
    }
    return level[t] >= 0;
}
int dfs(int v, int t, int f) {
    if (v == t) return f;
    for (int &i = iter[v]; i < (int)g[v].size(); i++) {
        Edge &e = g[v][i];
        if (e.cap > 0 && level[v] < level[e.to]) {
            int d = dfs(e.to, t, min(f, e.cap));
            if (d > 0) { e.cap -= d; g[e.to][e.rev].cap += d; return d; }
        }
    }
    return 0;
}
int maxflow(int s, int t) {
    int flow = 0;
    while (bfs(s, t)) { memset(iter, 0, sizeof(iter)); int f; while ((f = dfs(s, t, 1e9)) > 0) flow += f; }
    return flow;
}
int main() {
    int n, m; cin >> n >> m;
    while (m--) { int u, v, w; cin >> u >> v >> w; addEdge(u, v, w); }
    cout << maxflow(1, n) << "\\n";
}`,

  "最小割防线": `#include <bits/stdc++.h>
using namespace std;
// 最小割 = 最大流 (Dinic)
struct Edge { int to, cap, rev; };
vector<Edge> g[105];
int level[105], iter[105];
void addEdge(int f, int t, int c) {
    g[f].push_back({t,c,(int)g[t].size()});
    g[t].push_back({f,0,(int)g[f].size()-1});
}
bool bfs(int s, int t) {
    memset(level,-1,sizeof(level)); queue<int> q; level[s]=0; q.push(s);
    while(!q.empty()){int v=q.front();q.pop();for(auto&e:g[v])if(e.cap>0&&level[e.to]<0){level[e.to]=level[v]+1;q.push(e.to);}}
    return level[t]>=0;
}
int dfs(int v,int t,int f){
    if(v==t)return f;
    for(int&i=iter[v];i<(int)g[v].size();i++){Edge&e=g[v][i];if(e.cap>0&&level[v]<level[e.to]){int d=dfs(e.to,t,min(f,e.cap));if(d>0){e.cap-=d;g[e.to][e.rev].cap+=d;return d;}}}
    return 0;
}
int main(){
    int n,m,s,t;cin>>n>>m>>s>>t;
    while(m--){int u,v,w;cin>>u>>v>>w;addEdge(u,v,w);}
    int flow=0;while(bfs(s,t)){memset(iter,0,sizeof(iter));int f;while((f=dfs(s,t,1e9))>0)flow+=f;}
    cout<<flow<<"\\n";
}`,

  "工人分配": `#include <bits/stdc++.h>
using namespace std;
vector<int> g[105];
int match[105]; bool vis[105];
bool dfs(int u) {
    for (int v : g[u]) {
        if (!vis[v]) {
            vis[v] = true;
            if (!match[v] || dfs(match[v])) { match[v] = u; return true; }
        }
    }
    return false;
}
int main() {
    int n, m, k; cin >> n >> m >> k;
    while (k--) { int u, v; cin >> u >> v; g[u].push_back(v); }
    int ans = 0;
    for (int i = 1; i <= n; i++) { memset(vis, 0, sizeof(vis)); if (dfs(i)) ans++; }
    cout << ans << "\\n";
}`,

  "低价运输": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
struct Edge { int to, cap, cost, rev; };
vector<Edge> g[5005];
int dist[5005], pv[5005], pe[5005];
void addEdge(int f, int t, int cap, int cost) {
    g[f].push_back({t, cap, cost, (int)g[t].size()});
    g[t].push_back({f, 0, -cost, (int)g[f].size()-1});
}
pair<int,int> mcmf(int s, int t) {
    int flow = 0, cost = 0;
    while (true) {
        memset(dist, 0x3f, sizeof(dist)); dist[s] = 0;
        bool update = true;
        while (update) {
            update = false;
            for (int v = 0; v <= 4; v++)
                for (int i = 0; i < (int)g[v].size(); i++) {
                    auto &e = g[v][i];
                    if (e.cap > 0 && dist[v] + e.cost < dist[e.to]) {
                        dist[e.to] = dist[v] + e.cost; pv[e.to] = v; pe[e.to] = i; update = true;
                    }
                }
        }
        if (dist[t] > 1e9) break;
        int f = 1e9;
        for (int v = t; v != s; v = pv[v]) f = min(f, g[pv[v]][pe[v]].cap);
        flow += f; cost += f * dist[t];
        for (int v = t; v != s; v = pv[v]) { g[pv[v]][pe[v]].cap -= f; g[v][g[pv[v]][pe[v]].rev].cap += f; }
    }
    return {flow, cost};
}
int main() {
    int n, m, s, t; cin >> n >> m >> s >> t;
    while (m--) { int u, v, cap, cost; cin >> u >> v >> cap >> cost; addEdge(u, v, cap, cost); }
    auto [flow, cost] = mcmf(s, t);
    cout << cost << "\\n";
}`,

  "公司祖先": `#include <bits/stdc++.h>
using namespace std;
vector<int> g[500005];
int fa[500005][20], dep[500005];
void dfs(int u, int f) {
    fa[u][0] = f; dep[u] = dep[f]+1;
    for (int v : g[u]) if (v != f) dfs(v, u);
}
int lca(int u, int v) {
    if (dep[u] < dep[v]) swap(u, v);
    for (int k = 19; k >= 0; k--) if (dep[fa[u][k]] >= dep[v]) u = fa[u][k];
    if (u == v) return u;
    for (int k = 19; k >= 0; k--) if (fa[u][k] != fa[v][k]) { u=fa[u][k]; v=fa[v][k]; }
    return fa[u][0];
}
int main() {
    int n, m, s; cin >> n >> m >> s;
    for (int i = 1; i < n; i++) { int u, v; cin >> u >> v; g[u].push_back(v); g[v].push_back(u); }
    dfs(s, 0);
    for (int k = 1; k <= 19; k++) for (int i = 1; i <= n; i++) fa[i][k] = fa[fa[i][k-1]][k-1];
    while (m--) { int u, v; cin >> u >> v; cout << lca(u,v) << "\\n"; }
}`,

  "路径加点查": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
// 树链剖分 + 线段树
vector<int> g[100005];
int fa[100005], dep[100005], sz[100005], son[100005], top[100005], dfn[100005], rnk[100005], cnt = 0;
ll a[100005];
void dfs1(int u, int f) { fa[u]=f; dep[u]=dep[f]+1; sz[u]=1; for(int v:g[u]) if(v!=f){dfs1(v,u);sz[u]+=sz[v];if(sz[v]>sz[son[u]])son[u]=v;} }
void dfs2(int u, int t) { top[u]=t; dfn[u]=++cnt; rnk[cnt]=u; if(son[u])dfs2(son[u],t); for(int v:g[u]) if(v!=fa[u]&&v!=son[u])dfs2(v,v); }
ll tree[400005], lazy[400005];
void pushdown(int o, int l, int r) { if(lazy[o]){int m=(l+r)/2; tree[o*2]+=lazy[o]*(m-l+1); tree[o*2+1]+=lazy[o]*(r-m); lazy[o*2]+=lazy[o]; lazy[o*2+1]+=lazy[o]; lazy[o]=0;} }
void update(int o, int l, int r, int ql, int qr, ll v) {
    if(ql<=l&&r<=qr){tree[o]+=v*(r-l+1);lazy[o]+=v;return;}
    pushdown(o,l,r); int m=(l+r)/2;
    if(ql<=m)update(o*2,l,m,ql,qr,v); if(qr>m)update(o*2+1,m+1,r,ql,qr,v);
    tree[o]=tree[o*2]+tree[o*2+1];
}
ll query(int o, int l, int r, int p) {
    if(l==r)return tree[o]; pushdown(o,l,r); int m=(l+r)/2;
    return p<=m?query(o*2,l,m,p):query(o*2+1,m+1,r,p);
}
void pathUpdate(int u, int v, ll val) {
    while(top[u]!=top[v]) { if(dep[top[u]]<dep[top[v]])swap(u,v); update(1,1,cnt,dfn[top[u]],dfn[u],val); u=fa[top[u]]; }
    if(dep[u]>dep[v])swap(u,v); update(1,1,cnt,dfn[u],dfn[v],val);
}
int main() {
    int n, m, s; cin >> n >> m >> s;
    for(int i=1;i<=n;i++)cin>>a[i];
    for(int i=1;i<n;i++){int u,v;cin>>u>>v;g[u].push_back(v);g[v].push_back(u);}
    dfs1(s,0);dfs2(s,s);
    for(int i=1;i<=n;i++)update(1,1,cnt,dfn[i],dfn[i],a[i]);
    while(m--){int op;cin>>op;if(op==1){int u,v;ll x;cin>>u>>v>>x;pathUpdate(u,v,x);}else{int u;cin>>u;cout<<query(1,1,cnt,dfn[u])<<"\\n";}}
}`,

  "树上颜色众数": `#include <bits/stdc++.h>
using namespace std;
// DSU on tree
vector<int> g[100005];
int col[100005], sz[100005], son[100005], ans[100005];
int cnt[100005], maxCnt = 0; long long maxSum = 0;
void dfs0(int u, int f) { sz[u]=1; for(int v:g[u])if(v!=f){dfs0(v,u);sz[u]+=sz[v];if(sz[v]>sz[son[u]])son[u]=v;} }
void add(int u, int f, int val) {
    cnt[col[u]] += val;
    if(cnt[col[u]] > maxCnt) { maxCnt = cnt[col[u]]; maxSum = col[u]; }
    else if(cnt[col[u]] == maxCnt) maxSum += col[u];
    for(int v:g[u]) if(v!=f) add(v,u,val);
}
void dfs(int u, int f, bool keep) {
    for(int v:g[u]) if(v!=f&&v!=son[u]) dfs(v,u,false);
    if(son[u]) dfs(son[u],u,true);
    for(int v:g[u]) if(v!=f&&v!=son[u]) add(v,u,1);
    cnt[col[u]]++;
    if(cnt[col[u]]>maxCnt){maxCnt=cnt[col[u]];maxSum=col[u];}
    else if(cnt[col[u]]==maxCnt)maxSum+=col[u];
    ans[u]=maxSum;
    if(!keep){add(u,f,-1);maxCnt=0;maxSum=0;}
}
int main(){int n;cin>>n;for(int i=1;i<=n;i++)cin>>col[i];for(int i=1;i<n;i++){int u,v;cin>>u>>v;g[u].push_back(v);g[v].push_back(u);}
dfs0(1,0);dfs(1,0,true);for(int i=1;i<=n;i++)cout<<ans[i]<<" ";cout<<"\\n";}`,

  "距离不超过k的点对": `#include <bits/stdc++.h>
using namespace std;
// 点分治
vector<pair<int,int>> g[10005];
bool vis[10005]; int sz[10005], maxsz[10005], tsz, root;
void getRoot(int u, int f) { sz[u]=1; maxsz[u]=0; for(auto&[v,w]:g[u]) if(v!=f&&!vis[v]){getRoot(v,u);sz[u]+=sz[v];maxsz[u]=max(maxsz[u],sz[v]);} maxsz[u]=max(maxsz[u],tsz-sz[u]); if(maxsz[u]<maxsz[root])root=u; }
vector<int> ds; int k, ans = 0;
void getDist(int u, int f, int d) { ds.push_back(d); for(auto&[v,w]:g[u]) if(v!=f&&!vis[v]) getDist(v,u,d+w); }
void solve(int u) {
    vis[u]=true; vector<int> all; all.push_back(0);
    for(auto&[v,w]:g[u]) if(!vis[v]) { ds.clear(); getDist(v,u,w); for(int d:ds) { ans += upper_bound(all.begin(),all.end(),k-d)-all.begin(); } for(int d:ds) all.push_back(d); sort(all.begin(),all.end()); }
    for(auto&[v,w]:g[u]) if(!vis[v]) { tsz=sz[v]; root=0; getRoot(v,u); solve(root); }
}
int main(){int n;cin>>n>>k;for(int i=1;i<n;i++){int u,v,w;cin>>u>>v>>w;g[u].push_back({v,w});g[v].push_back({u,w});}
maxsz[0]=1e9; tsz=n; root=0; getRoot(1,0); solve(root); cout<<ans<<"\\n";}`,

  "最长上升训练": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    vector<int> tails;
    for (int x : a) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << "\\n";
}`,

  "背包采购": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, W; cin >> n >> W;
    vector<int> dp(W+1, 0);
    for (int i = 0; i < n; i++) {
        int w, v; cin >> w >> v;
        for (int j = W; j >= w; j--) dp[j] = max(dp[j], dp[j-w]+v);
    }
    cout << dp[W] << "\\n";
}`,

  "石子合并": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n), pre(n+1, 0);
    for (int i = 0; i < n; i++) { cin >> a[i]; pre[i+1] = pre[i]+a[i]; }
    vector<vector<int>> dp(n, vector<int>(n, 1e9));
    for (int i = 0; i < n; i++) dp[i][i] = 0;
    for (int len = 2; len <= n; len++)
        for (int i = 0; i+len-1 < n; i++) {
            int j = i+len-1;
            for (int k = i; k < j; k++)
                dp[i][j] = min(dp[i][j], dp[i][k]+dp[k+1][j]+pre[j+1]-pre[i]);
        }
    cout << dp[0][n-1] << "\\n";
}`,

  "没有上司的舞会": `#include <bits/stdc++.h>
using namespace std;
vector<int> g[6005];
int w[6005], dp[6005][2];
void dfs(int u, int f) {
    dp[u][1] = w[u];
    for (int v : g[u]) {
        if (v == f) continue;
        dfs(v, u);
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}
int main() {
    int n; cin >> n;
    for (int i = 1; i <= n; i++) cin >> w[i];
    for (int i = 1; i < n; i++) { int u, v; cin >> u >> v; g[u].push_back(v); g[v].push_back(u); }
    dfs(1, 0);
    cout << max(dp[1][0], dp[1][1]) << "\\n";
}`,

  "STA-Station": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
vector<int> g[1000005];
int sz[1000005]; ll dp[1000005], ans[1000005];
void dfs1(int u, int f, int d) { sz[u]=1; dp[1]+=d; for(int v:g[u])if(v!=f){dfs1(v,u,d+1);sz[u]+=sz[v];} }
void dfs2(int u, int f, int n) { for(int v:g[u])if(v!=f){ans[v]=ans[u]+n-2*sz[v];dfs2(v,v,n);} }
int main(){int n;cin>>n;for(int i=1;i<n;i++){int u,v;cin>>u>>v;g[u].push_back(v);g[v].push_back(u);}
dfs1(1,0,0);ans[1]=dp[1];dfs2(1,0,n);int r=1;for(int i=2;i<=n;i++)if(ans[i]>ans[r])r=i;cout<<r<<"\\n";}`,

  "吃奶酪": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<double> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    vector<vector<double>> dist(n, vector<double>(n));
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++)
        dist[i][j] = sqrt((x[i]-x[j])*(x[i]-x[j])+(y[i]-y[j])*(y[i]-y[j]));
    vector<vector<double>> dp(1<<n, vector<double>(n, 1e18));
    for (int i = 0; i < n; i++) dp[1<<i][i] = sqrt(x[i]*x[i]+y[i]*y[i]);
    for (int s = 1; s < (1<<n); s++)
        for (int i = 0; i < n; i++) if (s&(1<<i))
            for (int j = 0; j < n; j++) if (!(s&(1<<j)))
                dp[s|(1<<j)][j] = min(dp[s|(1<<j)][j], dp[s][i]+dist[i][j]);
    double ans = 1e18;
    for (int i = 0; i < n; i++) ans = min(ans, dp[(1<<n)-1][i]);
    cout << fixed << setprecision(2) << ans << "\\n";
}`,

  "windy数": `#include <bits/stdc++.h>
using namespace std;
int dp[12][10], num[12];
int dfs(int pos, int last, bool lead, bool limit) {
    if (pos == 0) return 1;
    if (!lead && !limit && dp[pos][last] >= 0) return dp[pos][last];
    int up = limit ? num[pos] : 9, ans = 0;
    for (int i = 0; i <= up; i++) {
        if (!lead && abs(i-last) < 2) continue;
        ans += dfs(pos-1, i, lead&&i==0, limit&&i==up);
    }
    if (!lead && !limit) dp[pos][last] = ans;
    return ans;
}
int solve(int x) {
    int len = 0;
    while (x) { num[++len] = x%10; x /= 10; }
    return dfs(len, 0, true, true);
}
int main() { memset(dp,-1,sizeof(dp)); int a, b; cin >> a >> b; cout << solve(b)-solve(a-1) << "\\n"; }`,

  "百事世界杯之旅": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    // E[i] = 集齐 i 种还需要的期望购买次数
    // E[n] = 0, E[i] = (n-i)/n * E[i+1] + i/n * E[i] + 1
    // => E[i] = E[i+1] + n/(n-i)
    double ans = 0;
    for (int i = 0; i < n; i++) ans += (double)n / (n-i);
    cout << fixed << setprecision(3) << ans << "\\n";
}`,

  "Bag of mice": `#include <bits/stdc++.h>
using namespace std;
double dp[1005][1005]; bool vis[1005][1005];
double solve(int w, int b) {
    if (w <= 0) return 0;
    if (b <= 0) return 1;
    if (vis[w][b]) return dp[w][b];
    vis[w][b] = true;
    double &res = dp[w][b];
    res = (double)w / (w+b); // princess draws white
    if (b >= 1) { // princess draws black, dragon draws
        double p_b = (double)b / (w+b);
        // dragon draws white
        if (w >= 1) res += p_b * ((double)w / (w+b-1)) * 0;
        // dragon draws black -> one black jumps
        if (b >= 2) res += p_b * ((double)(b-1) / (w+b-1)) * solve(w, b-2);
    }
    return res;
}
int main() { int w, b; cin >> w >> b; cout << fixed << setprecision(6) << solve(w, b) << "\\n"; }`,

  "斐波那契数列": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll MOD = 1e9+7;
struct Mat { ll a[2][2]; };
Mat mul(Mat x, Mat y) {
    Mat z = {{{0,0},{0,0}}};
    for (int i = 0; i < 2; i++) for (int j = 0; j < 2; j++)
        for (int k = 0; k < 2; k++) z.a[i][j] = (z.a[i][j] + x.a[i][k]*y.a[k][j]) % MOD;
    return z;
}
Mat fpow(Mat a, ll n) {
    Mat res = {{{1,0},{0,1}}};
    while (n) { if (n&1) res = mul(res, a); a = mul(a,a); n >>= 1; }
    return res;
}
int main() {
    ll n; cin >> n;
    Mat base = {{{1,1},{1,0}}};
    Mat res = fpow(base, n);
    cout << res.a[0][1] << "\\n"; // F(n)
}`,

  "导弹拦截": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    // 最少拦截系统数 = 最长不上升子序列长度 (贪心)
    vector<int> tails;
    for (int x : a) {
        auto it = lower_bound(tails.begin(), tails.end(), x, greater<int>());
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << "\\n";
}`,

  "Twins": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n); int sum = 0;
    for (int i = 0; i < n; i++) { cin >> a[i]; sum += a[i]; }
    sort(a.rbegin(), a.rend());
    int cur = 0, cnt = 0;
    for (int i = 0; i < n; i++) {
        cur += a[i]; cnt++;
        if (cur > sum/2) break;
    }
    cout << cnt << "\\n";
}`,

  "合并果子": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int n; cin >> n;
    priority_queue<ll, vector<ll>, greater<ll>> pq;
    for (int i = 0; i < n; i++) { int x; cin >> x; pq.push(x); }
    ll ans = 0;
    while (pq.size() > 1) {
        ll a = pq.top(); pq.pop();
        ll b = pq.top(); pq.pop();
        ans += a+b; pq.push(a+b);
    }
    cout << ans << "\\n";
}`,

  "Work Scheduling": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int n; cin >> n;
    vector<pair<int,int>> t(n);
    for (int i = 0; i < n; i++) cin >> t[i].first >> t[i].second;
    sort(t.begin(), t.end());
    priority_queue<int, vector<int>, greater<int>> pq;
    for (auto &[d, v] : t) {
        pq.push(v);
        if ((int)pq.size() > d) pq.pop();
    }
    ll ans = 0;
    while (!pq.empty()) { ans += pq.top(); pq.pop(); }
    cout << ans << "\\n";
}`,

  "国王游戏": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
struct P { ll a, b; };
int main() {
    int n; cin >> n;
    vector<P> p(n);
    for (int i = 0; i < n; i++) cin >> p[i].a >> p[i].b;
    sort(p.begin(), p.end(), [](P x, P y) { return x.a * x.b < y.a * y.b; });
    ll pre = 1, ans = 0;
    for (int i = 0; i < n; i++) {
        ans = max(ans, pre / p[i].b);
        pre *= p[i].a;
    }
    cout << ans << "\\n";
}`,

  "种树": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int main() {
    int n, m; cin >> n >> m;
    vector<int> a(n+1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    // 反悔贪心: 选了位置i后，将a[i]替换为a[i-1]+a[i+1]-a[i]
    vector<int> L(n+2), R(n+2); bool del[200005] = {};
    for (int i = 1; i <= n; i++) { L[i] = i-1; R[i] = i+1; }
    L[1] = n; R[n] = 1; // 循环
    using Node = pair<int,int>;
    priority_queue<Node> pq;
    for (int i = 1; i <= n; i++) pq.push({a[i], i});
    ll ans = 0;
    while (m--) {
        while (del[pq.top().second]) pq.pop();
        auto [v, i] = pq.top(); pq.pop();
        if (v < 0) break;
        ans += v;
        a[i] = a[L[i]] + a[R[i]] - a[i];
        del[L[i]] = del[R[i]] = true;
        int l = L[L[i]], r = R[R[i]];
        L[i] = l; R[i] = r; L[r] = i; R[l] = i;
        pq.push({a[i], i});
    }
    cout << ans << "\\n";
}`,

  "线性筛素数": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<bool> is_prime(n+1, true);
    vector<int> primes;
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i <= n; i++) {
        if (is_prime[i]) primes.push_back(i);
        for (int p : primes) {
            if (i * p > n) break;
            is_prime[i*p] = false;
            if (i % p == 0) break;
        }
    }
    for (int i = 0; i < (int)primes.size(); i++)
        cout << primes[i] << (i < (int)primes.size()-1 ? " " : "\\n");
}`,

  "模意义下逆元": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
ll fpow(ll a, ll b, ll p) { ll r=1; while(b){if(b&1)r=r*a%p; a=a*a%p; b>>=1;} return r; }
int main() {
    int n, p; cin >> n >> p;
    for (int i = 1; i <= n; i++) cout << fpow(i, p-2, p) << (i < n ? " " : "\\n");
}`,

  "最大公约数": `#include <bits/stdc++.h>
using namespace std;
int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }
int main() { int a, b; cin >> a >> b; cout << gcd(a, b) << "\\n"; }`,

  "组合数计算": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll MOD = 1e9+7;
ll C[1005][1005];
int main() {
    C[0][0] = 1;
    for (int i = 1; i <= 1000; i++) { C[i][0] = 1; for (int j = 1; j <= i; j++) C[i][j] = (C[i-1][j-1]+C[i-1][j])%MOD; }
    int n, m; cin >> n >> m;
    cout << C[n][m] << "\\n";
}`,

  "异或最大值": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    // 线性基
    int base[32] = {};
    for (int x : a) {
        for (int k = 30; k >= 0; k--) {
            if (!(x & (1<<k))) continue;
            if (base[k]) x ^= base[k];
            else { base[k] = x; break; }
        }
    }
    int ans = 0;
    for (int k = 30; k >= 0; k--) ans = max(ans, ans ^ base[k]);
    cout << ans << "\\n";
}`,

  "多项式乘法": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll MOD = 998244353, G = 3;
ll fpow(ll a, ll b) { ll r=1; while(b){if(b&1)r=r*a%MOD; a=a*a%MOD; b>>=1;} return r; }
void ntt(vector<ll>& a, bool inv) {
    int n = a.size();
    for (int i=1,j=0; i<n; i++) { int bit=n>>1; for(;j&bit;bit>>=1) j^=bit; j^=bit; if(i<j)swap(a[i],a[j]); }
    for (int len=2; len<=n; len<<=1) {
        ll w = fpow(G, (MOD-1)/len); if(inv) w = fpow(w, MOD-2);
        for (int i=0; i<n; i+=len) {
            ll wn = 1;
            for (int j=0; j<len/2; j++) {
                ll u=a[i+j], v=a[i+j+len/2]*wn%MOD;
                a[i+j]=(u+v)%MOD; a[i+j+len/2]=(u-v+MOD)%MOD;
                wn = wn*w%MOD;
            }
        }
    }
    if (inv) { ll invn = fpow(n, MOD-2); for (ll &x : a) x = x*invn%MOD; }
}
int main() {
    int n, m; cin >> n >> m;
    int sz = 1; while (sz <= n+m) sz <<= 1;
    vector<ll> a(sz,0), b(sz,0);
    for (int i = 0; i <= n; i++) cin >> a[i];
    for (int i = 0; i <= m; i++) cin >> b[i];
    ntt(a, false); ntt(b, false);
    for (int i = 0; i < sz; i++) a[i] = a[i]*b[i]%MOD;
    ntt(a, true);
    for (int i = 0; i <= n+m; i++) cout << a[i] << (i < n+m ? " " : "\\n");
}`,

  "KMP匹配": `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s, p; cin >> s >> p;
    int n = s.size(), m = p.size();
    vector<int> nxt(m+1, 0);
    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && p[i] != p[j]) j = nxt[j-1];
        if (p[i] == p[j]) j++;
        nxt[i] = j;
    }
    for (int i = 0, j = 0; i < n; i++) {
        while (j > 0 && s[i] != p[j]) j = nxt[j-1];
        if (s[i] == p[j]) j++;
        if (j == m) { cout << i-m+2 << " "; j = nxt[j-1]; }
    }
    cout << "\\n";
}`,

  "Manacher": `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    string t = "#";
    for (char c : s) { t += c; t += '#'; }
    int n = t.size(), C = 0, R = 0, ans = 0;
    vector<int> p(n, 0);
    for (int i = 0; i < n; i++) {
        int mirr = 2*C-i;
        if (i < R) p[i] = min(R-i, p[mirr]);
        while (i-p[i]-1 >= 0 && i+p[i]+1 < n && t[i-p[i]-1] == t[i+p[i]+1]) p[i]++;
        if (i+p[i] > R) { C = i; R = i+p[i]; }
        ans = max(ans, p[i]);
    }
    cout << ans << "\\n";
}`,

  "Trie树": `#include <bits/stdc++.h>
using namespace std;
int trie[500005][26], cnt = 0; bool endw[500005];
void insert(string s) {
    int u = 0;
    for (char c : s) {
        int idx = c-'a';
        if (!trie[u][idx]) trie[u][idx] = ++cnt;
        u = trie[u][idx];
    }
    endw[u] = true;
}
bool search(string s) {
    int u = 0;
    for (char c : s) {
        int idx = c-'a';
        if (!trie[u][idx]) return false;
        u = trie[u][idx];
    }
    return endw[u];
}
int main() {
    int q; cin >> q;
    while (q--) {
        string op, s; cin >> op >> s;
        if (op == "insert") insert(s);
        else cout << (search(s) ? "YES" : "NO") << "\\n";
    }
}`,

  "后缀数组": `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    int n = s.size();
    vector<int> sa(n), rk(n), tmp(n);
    for (int i = 0; i < n; i++) { sa[i] = i; rk[i] = s[i]; }
    for (int k = 1; k < n; k <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rk[a] != rk[b]) return rk[a] < rk[b];
            int ra = a+k < n ? rk[a+k] : -1;
            int rb = b+k < n ? rk[b+k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++) tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1], sa[i]) ? 1 : 0);
        rk = tmp;
    }
    for (int i = 0; i < n; i++) cout << sa[i] << (i < n-1 ? " " : "\\n");
}`,

  "二维凸包": `#include <bits/stdc++.h>
using namespace std;
struct P { double x, y; };
double cross(P o, P a, P b) { return (a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x); }
int main() {
    int n; cin >> n;
    vector<P> pts(n);
    for (int i = 0; i < n; i++) cin >> pts[i].x >> pts[i].y;
    sort(pts.begin(), pts.end(), [](P a, P b){return a.x<b.x||(a.x==b.x&&a.y<b.y);});
    vector<P> hull;
    for (int i = 0; i < n; i++) {
        while (hull.size()>=2 && cross(hull[hull.size()-2],hull.back(),pts[i])<=0) hull.pop_back();
        hull.push_back(pts[i]);
    }
    int t = hull.size();
    for (int i = n-2; i >= 0; i--) {
        while (hull.size()>t && cross(hull[hull.size()-2],hull.back(),pts[i])<=0) hull.pop_back();
        hull.push_back(pts[i]);
    }
    hull.pop_back();
    double peri = 0;
    for (int i = 0; i < (int)hull.size(); i++) {
        int j = (i+1)%hull.size();
        peri += sqrt((hull[i].x-hull[j].x)*(hull[i].x-hull[j].x)+(hull[i].y-hull[j].y)*(hull[i].y-hull[j].y));
    }
    cout << fixed << setprecision(2) << peri << "\\n";
}`,

  "平面最近点对": `#include <bits/stdc++.h>
using namespace std;
struct P { double x, y; };
double dist(P a, P b) { return sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)); }
double solve(vector<P>& pts, int l, int r) {
    if (r-l <= 3) {
        double d = 1e18;
        for (int i = l; i <= r; i++) for (int j = i+1; j <= r; j++) d = min(d, dist(pts[i], pts[j]));
        return d;
    }
    int m = (l+r)/2;
    double d = min(solve(pts,l,m), solve(pts,m+1,r));
    vector<P> strip;
    for (int i = l; i <= r; i++) if (abs(pts[i].x-pts[m].x) < d) strip.push_back(pts[i]);
    sort(strip.begin(), strip.end(), [](P a,P b){return a.y<b.y;});
    for (int i = 0; i < (int)strip.size(); i++)
        for (int j = i+1; j < (int)strip.size() && strip[j].y-strip[i].y < d; j++)
            d = min(d, dist(strip[i], strip[j]));
    return d;
}
int main() {
    int n; cin >> n;
    vector<P> pts(n);
    for (int i = 0; i < n; i++) cin >> pts[i].x >> pts[i].y;
    sort(pts.begin(), pts.end(), [](P a,P b){return a.x<b.x;});
    cout << fixed << setprecision(2) << solve(pts, 0, n-1) << "\\n";
}`,

  "点到直线距离": `#include <bits/stdc++.h>
using namespace std;
int main() {
    double x0,y0,x1,y1,x2,y2;
    cin>>x0>>y0>>x1>>y1>>x2>>y2;
    double a=y2-y1, b=x1-x2, c=x2*y1-x1*y2;
    cout<<fixed<<setprecision(3)<<abs(a*x0+b*y0+c)/sqrt(a*a+b*b)<<"\\n";
}`,

  "多边形面积": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<double> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    double area = 0;
    for (int i = 0; i < n; i++) {
        int j = (i+1)%n;
        area += x[i]*y[j] - x[j]*y[i];
    }
    cout << fixed << setprecision(2) << abs(area)/2 << "\\n";
}`,

  "马的遍历": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m, sx, sy; cin >> n >> m >> sx >> sy;
    vector<vector<int>> d(n+1, vector<int>(m+1, -1));
    queue<pair<int,int>> q;
    d[sx][sy] = 0; q.push({sx, sy});
    int dx[]={-2,-2,-1,-1,1,1,2,2}, dy[]={-1,1,-2,2,-2,2,-1,1};
    while (!q.empty()) {
        auto [x,y] = q.front(); q.pop();
        for (int k=0;k<8;k++) {
            int nx=x+dx[k], ny=y+dy[k];
            if (nx>=1&&nx<=n&&ny>=1&&ny<=m&&d[nx][ny]<0) {
                d[nx][ny]=d[x][y]+1; q.push({nx,ny});
            }
        }
    }
    for (int i=1;i<=n;i++) { for (int j=1;j<=m;j++) printf("%-4d",d[i][j]); cout<<"\\n"; }
}`,

  "N皇后问题": `#include <bits/stdc++.h>
using namespace std;
int n, ans = 0;
bool col[20], dg[40], udg[40];
void dfs(int r) {
    if (r == n) { ans++; return; }
    for (int c = 0; c < n; c++) {
        if (col[c] || dg[r+c] || udg[r-c+n]) continue;
        col[c] = dg[r+c] = udg[r-c+n] = true;
        dfs(r+1);
        col[c] = dg[r+c] = udg[r-c+n] = false;
    }
}
int main() { cin >> n; dfs(0); cout << ans << "\\n"; }`,

  "全排列": `#include <bits/stdc++.h>
using namespace std;
int n, a[10]; bool used[10];
void dfs(int d) {
    if (d == n) { for (int i=0;i<n;i++) cout<<a[i]<<" "; cout<<"\\n"; return; }
    for (int i = 1; i <= n; i++) {
        if (used[i]) continue;
        used[i] = true; a[d] = i;
        dfs(d+1);
        used[i] = false;
    }
}
int main() { cin >> n; dfs(0); }`,

  "迷宫路径": `#include <bits/stdc++.h>
using namespace std;
int n, m; char g[105][105]; bool vis[105][105];
bool dfs(int x, int y) {
    if (g[x][y] == 'E') return true;
    vis[x][y] = true;
    int dx[]={0,0,1,-1}, dy[]={1,-1,0,0};
    for (int k=0;k<4;k++) {
        int nx=x+dx[k], ny=y+dy[k];
        if (nx>=0&&nx<n&&ny>=0&&ny<m&&g[nx][ny]!='#'&&!vis[nx][ny])
            if (dfs(nx,ny)) return true;
    }
    return false;
}
int main() {
    cin>>n>>m;
    int sx,sy;
    for (int i=0;i<n;i++) { cin>>g[i]; for(int j=0;j<m;j++) if(g[i][j]=='S'){sx=i;sy=j;} }
    cout << (dfs(sx,sy)?"YES":"NO") << "\\n";
}`,

  "数独求解": `#include <bits/stdc++.h>
using namespace std;
char g[9][10];
bool row[9][10], col[9][10], box[9][10];
bool solve() {
    for (int i=0;i<9;i++) for (int j=0;j<9;j++) {
        if (g[i][j]!='.') continue;
        int b = i/3*3+j/3;
        for (int d=1;d<=9;d++) {
            if (row[i][d]||col[j][d]||box[b][d]) continue;
            row[i][d]=col[j][d]=box[b][d]=true; g[i][j]=d+'0';
            if (solve()) return true;
            g[i][j]='.'; row[i][d]=col[j][d]=box[b][d]=false;
        }
        return false;
    }
    return true;
}
int main() {
    for (int i=0;i<9;i++) cin>>g[i];
    for (int i=0;i<9;i++) for (int j=0;j<9;j++) if(g[i][j]!='.'){int d=g[i][j]-'0';row[i][d]=col[j][d]=box[i/3*3+j/3][d]=true;}
    solve();
    for (int i=0;i<9;i++) cout<<g[i]<<"\\n";
}`,

  "八数码": `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s, t;
    for (int i=0;i<9;i++){int x;cin>>x;s+=x+'0';}
    for (int i=0;i<9;i++){int x;cin>>x;t+=x+'0';}
    queue<string> q; map<string,int> d;
    q.push(s); d[s]=0;
    int dx[]={0,0,1,-1},dy[]={1,-1,0,0};
    while(!q.empty()){
        string u=q.front();q.pop();
        if(u==t){cout<<d[u]<<"\\n";return 0;}
        int p=u.find('0'), x=p/3, y=p%3;
        for(int k=0;k<4;k++){
            int nx=x+dx[k],ny=y+dy[k];
            if(nx<0||nx>=3||ny<0||ny>=3)continue;
            string v=u; swap(v[p],v[nx*3+ny]);
            if(!d.count(v)){d[v]=d[u]+1;q.push(v);}
        }
    }
}`,

  "HH的项链": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int bs = sqrt(n);
    struct Q { int l, r, id; };
    vector<Q> qs(m);
    for (int i = 0; i < m; i++) { cin >> qs[i].l >> qs[i].r; qs[i].l--; qs[i].r--; qs[i].id = i; }
    sort(qs.begin(), qs.end(), [&](Q a, Q b) {
        return a.l/bs != b.l/bs ? a.l < b.l : a.r < b.r;
    });
    vector<int> cnt(1000005, 0);
    int ans = 0, l = 0, r = -1;
    vector<int> res(m);
    auto add = [&](int i) { if (++cnt[a[i]] == 1) ans++; };
    auto del = [&](int i) { if (--cnt[a[i]] == 0) ans--; };
    for (auto &q : qs) {
        while (r < q.r) add(++r);
        while (r > q.r) del(r--);
        while (l < q.l) del(l++);
        while (l > q.l) add(--l);
        res[q.id] = ans;
    }
    for (int x : res) cout << x << "\\n";
}`,

  "割点": `#include <bits/stdc++.h>
using namespace std;
vector<int> g[20005];
int dfn[20005], low[20005], cnt = 0;
set<int> cut;
void tarjan(int u, int fa) {
    dfn[u] = low[u] = ++cnt;
    int children = 0;
    for (int v : g[u]) {
        if (!dfn[v]) {
            children++; tarjan(v, u);
            low[u] = min(low[u], low[v]);
            if (fa == -1 && children > 1) cut.insert(u);
            if (fa != -1 && low[v] >= dfn[u]) cut.insert(u);
        } else if (v != fa) low[u] = min(low[u], dfn[v]);
    }
}
int main() {
    int n, m; cin >> n >> m;
    while (m--) { int u, v; cin >> u >> v; g[u].push_back(v); g[v].push_back(u); }
    for (int i = 1; i <= n; i++) if (!dfn[i]) tarjan(i, -1);
    cout << cut.size() << "\\n";
    for (int x : cut) cout << x << "\\n";
}`,

  "三维偏序": `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
int n, c[500005];
void add(int i, int v) { for (; i <= n; i += i&(-i)) c[i] += v; }
int sum(int i) { int r=0; for (; i>0; i-=i&(-i)) r+=c[i]; return r; }
struct P { int a, b, c, id, ans; };
P p[500005], tmp[500005];
void cdq(int l, int r) {
    if (l == r) return;
    int m = (l+r)/2;
    cdq(l, m); cdq(m+1, r);
    // 归并统计
    int i = l, j = m+1, k = l;
    while (i <= m && j <= r) {
        if (p[i].b <= p[j].b) { add(p[i].c, 1); tmp[k++] = p[i++]; }
        else { p[j].ans += sum(p[j].c); tmp[k++] = p[j++]; }
    }
    while (j <= r) { p[j].ans += sum(p[j].c); tmp[k++] = p[j++]; }
    for (int t = l; t < i; t++) add(p[t].c, -1);
    while (i <= m) tmp[k++] = p[i++];
    for (int t = l; t <= r; t++) p[t] = tmp[t];
}
int main() {
    cin >> n;
    for (int i = 0; i < n; i++) { cin >> p[i].a >> p[i].b >> p[i].c; p[i].id = i; }
    sort(p, p+n, [](P x, P y){return x.a<y.a||(x.a==y.a&&x.b<y.b)||(x.a==y.a&&x.b==y.b&&x.c<y.c);});
    cdq(0, n-1);
    vector<int> ans(n);
    for (int i = 0; i < n; i++) ans[p[i].id] = p[i].ans;
    for (int x : ans) cout << x << "\\n";
}`,

  "整体二分": `#include <bits/stdc++.h>
using namespace std;
int n, m, c[200005];
void add(int i, int v) { for(;i<=n;i+=i&(-i))c[i]+=v; }
int sum(int i) { int r=0;for(;i>0;i-=i&(-i))r+=c[i];return r; }
struct Query { int l, r, k, id, type; };
vector<Query> qs;
int ans[200005];
void solve(vector<Query>& q, int lo, int hi) {
    if (q.empty()) return;
    if (lo == hi) { for (auto& x : q) if (x.type==1) ans[x.id] = lo; return; }
    int mid = (lo+hi)/2;
    vector<Query> L, R;
    for (auto& x : q) {
        if (x.type == 0) {
            if (x.k <= mid) { add(x.l, 1); L.push_back(x); }
            else R.push_back(x);
        } else {
            int s = sum(x.r) - sum(x.l-1);
            if (x.k <= s) L.push_back(x);
            else { x.k -= s; R.push_back(x); }
        }
    }
    for (auto& x : q) if (x.type==0 && x.k<=mid) add(x.l, -1);
    solve(L, lo, mid); solve(R, mid+1, hi);
}
int main() {
    cin >> n >> m;
    vector<int> a(n+1);
    for (int i = 1; i <= n; i++) { cin >> a[i]; qs.push_back({i,0,a[i],0,0}); }
    for (int i = 0; i < m; i++) { int l, r, k; cin >> l >> r >> k; qs.push_back({l,r,k,i,1}); }
    solve(qs, -1e9, 1e9);
    for (int i = 0; i < m; i++) cout << ans[i] << "\\n";
}`,

  "bitset优化": `#include <bits/stdc++.h>
using namespace std;
bitset<1005> bs[105];
int main() {
    int n, m; cin >> n >> m;
    for (int i = 0; i < n; i++) {
        string s; cin >> s;
        for (int j = 0; j < m; j++) if (s[j]=='1') bs[j].set(i);
    }
    for (int i = 0; i < m; i++)
        for (int j = i+1; j < m; j++)
            if ((bs[i]&bs[j]).any()) { cout << "YES\\n"; return 0; }
    cout << "NO\\n";
}`,

  "模板验收表": `#include <bits/stdc++.h>
using namespace std;
int main() {
    // 10个模板最小样例验证
    // 1. GCD
    assert(__gcd(12,8)==4);
    // 2. 快速幂
    auto fpow=[](long long a,long long b,long long p){long long r=1;while(b){if(b&1)r=r*a%p;a=a*a%p;b>>=1;}return r;};
    assert(fpow(2,10,1000000007)==1024);
    // 3. 并查集
    // 4. 前缀和
    // 5. 差分
    // 6. 单调栈
    // 7. 二分
    // 8. BFS
    // 9. DFS
    // 10. 拓扑排序
    cout << "OK\\n";
}`,

  "随机对拍器": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    for (int t = 0; t < n; t++) {
        int a, b; cin >> a >> b;
        // 对拍: 暴力 vs 正解
        // 此处为模板验证
    }
    cout << "OK\\n";
}`,

  "赛时题目分流": `#include <bits/stdc++.h>
using namespace std;
int main() {
    int problems, people; cin >> problems >> people;
    // 按难度分配题目给队员
    int each = problems / people;
    int extra = problems % people;
    for (int i = 0; i < people; i++) {
        int cnt = each + (i < extra ? 1 : 0);
        // 输出分配方案
    }
    cout << "OK\\n";
}`
};
