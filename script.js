const lessons = [
{
    category: "基础算法",
    title: "竞赛准备与复杂度",
    minutes: "入门",
    goal: "建立 ICPC/CCPC 的解题基本功：读题、估复杂度、写模板、控制边界。",
    check: "能根据 n 的范围反推可用复杂度，并会用二分、前缀和、差分、双指针处理基础题。",
    intro: "竞赛题的第一步不是马上写代码，而是读出数据范围、限制条件和可承受复杂度。基础技巧是所有大算法的底座。",
    topics: [
      "快速输入输出",
      "复杂度估算",
      "排序与去重",
      "二分答案",
      "三分搜索",
      "位运算",
      "离散化",
      "前缀和",
      "差分",
      "扫描线思想",
      "双指针",
      "滑动窗口",
      "模拟",
      "贪心预处理",
    ],
    mustKnow: [
      "看到 n=1e5 通常优先考虑 O(n log n) 或 O(n)。",
      "二分答案要能写出 check(mid)，并明确单调性来自哪里。",
      "前缀和处理区间求和，差分处理区间修改。",
    ],
    pitfalls: [
      "二分左右边界更新写错会死循环。",
      "long long、取模、数组越界是新手最常见扣分点。",
      "离散化后要用压缩后的下标，不要混用原值和下标。",
    ],
    steps: [
      "竞赛准备与复杂度分析是算法竞赛的基本功，它的核心思想是在写代码之前先判断算法是否可行。通过数据范围估算时间复杂度，可以快速排除不可行的算法。",
      "具体来说，第一步看数据范围：n≤20 可以暴力枚举或状压，n≤1000 可以 O(n²) 算法，n≤10⁵ 可以 O(n log n)，n≤10⁷ 可以 O(n)。第二步根据复杂度选择合适的算法，比如二分、前缀和、双指针等基础技巧。",
      "举个例子：如果题目给定 n=10⁵，要求求区间和，那么用 O(n²) 的暴力一定会超时。正确的做法是预处理前缀和数组，这样每次区间查询只需要 O(1)。",
      "在实际使用中，需要注意 long long 溢出、数组越界、浮点精度等常见坑点。二分搜索要特别注意边界条件，写错更新规则会死循环。",
      "适用场景：每道竞赛题的第一步都应该做复杂度估算。当你拿到题目时，先看数据范围，再决定用什么算法，这是竞赛中最重要的习惯。"
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<int> a = {100, 20, 20, 7};
    vector<int> xs = a;
    sort(xs.begin(), xs.end());
    xs.erase(unique(xs.begin(), xs.end()), xs.end());

    for (int x : a) {
        int id = lower_bound(xs.begin(), xs.end(), x) - xs.begin();
        cout << x << " -> " << id << "\\n";
    }
    return 0;
}`,
    examples: [
      {
        title: "CF 702A - Maximum Increase",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/702/A",
        description: "给定一个数组，求最长严格递增连续子数组的长度。",
        solution: "简单的线性扫描，维护当前递增子数组的长度。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    int ans = 1, cur = 1;
    for (int i = 1; i < n; i++) {
        if (a[i] > a[i - 1]) {
            cur++;
            ans = max(ans, cur);
        } else {
            cur = 1;
        }
    }

    cout << ans << endl;
    return 0;
}`,
        explanation: "1. 初始化 ans = 1, cur = 1。\n2. 从第 2 个元素开始遍历。\n3. 如果 a[i] > a[i-1]，说明可以延长当前递增子数组，cur++。\n4. 否则，重新开始，cur = 1。\n5. 每次更新 ans = max(ans, cur)。\n6. 时间复杂度：O(n)，空间复杂度：O(1)。"
      },
      {
        title: "洛谷 P1908 逆序对",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1908",
        description: "给定一个数组，求逆序对的数量。逆序对是指满足 i < j 且 a[i] > a[j] 的数对。",
        solution: "使用归并排序或树状数组求解。这里展示归并排序的方法。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

ll mergeSort(vector<int>& a, int left, int right) {
    if (left >= right) return 0;
    int mid = (left + right) / 2;
    ll cnt = mergeSort(a, left, mid) + mergeSort(a, mid + 1, right);

    vector<int> temp;
    int i = left, j = mid + 1;
    while (i <= mid && j <= right) {
        if (a[i] <= a[j]) {
            temp.push_back(a[i++]);
        } else {
            temp.push_back(a[j++]);
            cnt += mid - i + 1;  // 统计逆序对
        }
    }
    while (i <= mid) temp.push_back(a[i++]);
    while (j <= right) temp.push_back(a[j++]);

    for (int k = 0; k < temp.size(); k++) {
        a[left + k] = temp[k];
    }
    return cnt;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    cout << mergeSort(a, 0, n - 1) << endl;
    return 0;
}`,
        explanation: "1. 归并排序的过程中统计逆序对。\n2. 在合并两个有序子数组时，如果 a[i] > a[j]，说明 a[i...mid] 都大于 a[j]，贡献 mid - i + 1 个逆序对。\n3. 递归统计左右两半的逆序对，再加上合并时的逆序对。\n4. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "基础数据结构",
    title: "数组、栈、队列与单调结构",
    minutes: "基础",
    goal: "掌握线性数据结构，并能识别“最近更大/更小”“窗口最值”等典型模型。",
    check: "能独立写出单调栈、单调队列和堆的常见用法。",
    intro: "大量铜牌和银牌题并不需要重型模板，而是把数组、栈、队列、堆、哈希表用得稳。",
    topics: [
      "数组",
      "链表思想",
      "栈",
      "队列",
      "双端队列",
      "优先队列",
      "哈希表",
      "有序集合",
      "bitset",
      "单调栈",
      "单调队列",
      "稀疏表 ST",
      "RMQ",
    ],
    mustKnow: [
      "单调栈常解决每个位置左/右第一个更大或更小元素。",
      "单调队列常解决固定长度窗口最值。",
      "ST 表适合静态区间最值，查询 O(1)，不支持修改。",
    ],
    pitfalls: [
      "优先队列默认是大根堆，小根堆需要 greater。",
      "哈希表在构造数据下可能被卡，必要时使用自定义 hash。",
      "单调结构出队条件要和题目区间边界严格对应。",
    ],
    steps: [
      "单调栈和单调队列是维护「单调性」的数据结构，核心思想是在遍历过程中，用栈或队列维护一个单调递增或单调递减的序列，从而快速找到每个元素的前驱或后继中的特定值。",
      "具体来说，单调栈的思路是：遍历数组，对于每个元素，将栈中比它小（或大）的元素弹出，这些弹出元素的答案就是当前元素。单调队列类似，但还要维护窗口大小，及时弹出过期元素。",
      "举个例子：假设数组是 [3, 1, 4, 1, 5]，用单调递减栈找每个元素右边第一个更大的元素。遍历到 4 时，栈中 1 和 3 都比 4 小，依次弹出并记录答案为 4。",
      "在实际使用中，需要注意栈和队列中存储的是下标而不是值，这样可以方便地判断元素是否过期。ST 表适合静态区间最值查询，预处理 O(n log n)，查询 O(1)。",
      "适用场景：当你遇到「每个位置左边/右边第一个更大/更小的元素」或「滑动窗口最值」这类问题时，应该想到用单调栈或单调队列。"
    ],
    code: `vector<int> nextGreater(const vector<int>& a) {
    int n = (int)a.size();
    vector<int> ans(n, -1), st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.back()] < a[i]) {
            ans[st.back()] = i;
            st.pop_back();
        }
        st.push_back(i);
    }
    return ans;
}`,
    examples: [
      {
        title: "洛谷 P5788 【模板】单调栈",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P5788",
        description: "给定一个数组，求每个位置右边第一个比它大的元素的位置。",
        solution: "经典的单调栈问题。维护一个单调递减栈，当遇到更大的元素时，弹出栈顶并记录答案。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n + 1), ans(n + 1, 0);
    for (int i = 1; i <= n; i++) cin >> a[i];

    stack<int> st;
    for (int i = 1; i <= n; i++) {
        while (!st.empty() && a[st.top()] < a[i]) {
            ans[st.top()] = i;
            st.pop();
        }
        st.push(i);
    }

    for (int i = 1; i <= n; i++) {
        cout << ans[i] << " ";
    }
    cout << endl;

    return 0;
}`,
        explanation: "1. 维护一个单调递减栈，栈中存储元素的下标。\n2. 遍历数组，当遇到比栈顶更大的元素时，弹出栈顶并记录答案。\n3. 将当前元素入栈。\n4. 时间复杂度：O(n)，空间复杂度：O(n)。"
      },
      {
        title: "CF 239D - Monotonic Renumeration",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/239/D",
        description: "给定一个数组，要求构造一个数组 b，使得 b[1] = 1，且如果 a[i] < a[i+1] 则 b[i] < b[i+1]，如果 a[i] > a[i+1] 则 b[i] > b[i+1]，如果 a[i] = a[i+1] 则 b[i] = b[i+1]。求 b 数组的不同方案数。",
        solution: "分析性质，发现只有当相邻元素相等时才能取相同值。计算有多少个位置必须取不同值。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const int MOD = 1e9 + 7;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // 找出所有不相等的相邻对
    set<int> s;
    for (int i = 0; i < n - 1; i++) {
        if (a[i] != a[i + 1]) {
            s.insert(i);
        }
    }

    // 如果没有不相等的相邻对，答案是 1
    if (s.empty()) {
        cout << 1 << endl;
        return 0;
    }

    // 答案是 2^(不相等的相邻对数量)
    ll ans = 1;
    for (int i = 0; i < s.size(); i++) {
        ans = ans * 2 % MOD;
    }

    cout << ans << endl;
    return 0;
}`,
        explanation: "1. 分析题目性质：只有相邻元素相等时，b 数组才能取相同值。\n2. 对于不相等的相邻对，b 数组必须严格递增或递减。\n3. 每个不相等的相邻对贡献 2 种选择（递增或递减）。\n4. 最终答案是 2^(不相等的相邻对数量)。\n5. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      },
      {
        title: "牛客 滑动窗口",
        source: "牛客",
        link: "https://ac.nowcoder.com/acm/problem/227710",
        description: "给定一个数组和窗口大小 k，求每个滑动窗口的最大值和最小值。",
        solution: "经典的单调队列问题。维护两个单调队列，分别求最大值和最小值。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // 求每个窗口的最小值
    deque<int> dq;
    vector<int> min_ans;
    for (int i = 0; i < n; i++) {
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && a[dq.back()] > a[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) min_ans.push_back(a[dq.front()]);
    }

    // 求每个窗口的最大值
    dq.clear();
    vector<int> max_ans;
    for (int i = 0; i < n; i++) {
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && a[dq.back()] < a[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) max_ans.push_back(a[dq.front()]);
    }

    // 输出最小值
    for (int x : min_ans) cout << x << " ";
    cout << endl;
    // 输出最大值
    for (int x : max_ans) cout << x << " ";
    cout << endl;

    return 0;
}`,
        explanation: "1. 维护一个单调队列，队首是当前窗口的最值。\n2. 遍历数组，先弹出过期的元素（不在窗口内），再维护单调性。\n3. 将当前元素入队。\n4. 当窗口形成后，记录队首元素。\n5. 时间复杂度：O(n)，空间复杂度：O(k)。"
      }
    ]
  },
{
    category: "高级数据结构",
    title: "树状数组、线段树与分块",
    minutes: "提高",
    goal: "能用区间数据结构维护动态前缀、区间和、最值、懒标记和离线查询。",
    check: "能在 15 分钟内写出树状数组和带懒标记线段树。",
    intro: "区间修改、区间查询、动态维护答案是竞赛常客。树状数组轻巧，线段树通用，分块在复杂维护中很灵活。",
    topics: [
      "树状数组",
      "区间树状数组",
      "线段树",
      "懒标记",
      "动态开点线段树",
      "可持久化线段树",
      "权值线段树",
      "线段树合并",
      "扫描线线段树",
      "李超线段树",
      "平方分解",
      "莫队基础",
      "笛卡尔树",
      "波列树",
    ],
    mustKnow: [
      "树状数组维护的是前缀贡献，lowbit 是核心。",
      "线段树懒标记要先覆盖当前节点，再按需下传。",
      "可持久化线段树适合历史版本和区间第 k 小。",
    ],
    pitfalls: [
      "线段树数组大小通常开 4n，动态开点要注意节点池上限。",
      "懒标记叠加规则因题而异，赋值和加法不能混着偷懒。",
      "分块题要先算清整块和散块的复杂度。",
    ],
    steps: [
      "树状数组和线段树是处理「区间查询」和「区间修改」的数据结构，核心思想是将数组分成若干层或若干段，通过维护每层或每段的信息来加速查询和修改操作。",
      "具体来说，树状数组利用二进制分解（lowbit 运算）将前缀和拆成 O(log n) 个区间的和。线段树则将区间不断二分，形成一棵二叉树，每个节点维护对应区间的聚合信息（如和、最大值），并用懒标记延迟更新。",
      "举个例子：用树状数组维护前缀和。add(3, 5) 表示在位置 3 加 5，这会影响 bit[3]、bit[4]、bit[8]...。sum(7) = bit[7] + bit[6] + bit[4]，只需要 3 次操作。",
      "在实际使用中，需要注意线段树数组通常开 4n 大小。懒标记的下传规则因题而异，赋值和加法的懒标记不能混着偷懒。可持久化线段树适合求区间第 k 小等问题。",
      "适用场景：当你遇到需要动态维护区间和、区间最值，或者需要支持单点修改和区间查询时，应该想到用树状数组或线段树。树状数组更轻量，线段树更通用。"
    ],
    code: `struct Fenwick {
    int n;
    vector<long long> bit;
    Fenwick(int n = 0) { init(n); }
    void init(int n_) {
        n = n_;
        bit.assign(n + 1, 0);
    }
    void add(int idx, long long val) {
        for (; idx <= n; idx += idx & -idx) bit[idx] += val;
    }
    long long sum(int idx) const {
        long long res = 0;
        for (; idx > 0; idx -= idx & -idx) res += bit[idx];
        return res;
    }
    long long rangeSum(int l, int r) const {
        return sum(r) - sum(l - 1);
    }
};`,
    examples: [
      {
        title: "洛谷 P3374 【模板】树状数组 1",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3374",
        description: "给定一个数组，支持单点修改和区间查询。",
        solution: "经典的树状数组问题。单点修改和区间查询都是 O(log n)。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct Fenwick {
    int n;
    vector<ll> bit;
    Fenwick(int n = 0) : n(n), bit(n + 1, 0) {}
    void add(int idx, ll val) {
        for (; idx <= n; idx += idx & -idx) bit[idx] += val;
    }
    ll sum(int idx) const {
        ll res = 0;
        for (; idx > 0; idx -= idx & -idx) res += bit[idx];
        return res;
    }
    ll rangeSum(int l, int r) const {
        return sum(r) - sum(l - 1);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    Fenwick fenw(n);

    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        fenw.add(i, x);
    }

    while (m--) {
        int op;
        cin >> op;
        if (op == 1) {
            int x, k;
            cin >> x >> k;
            fenw.add(x, k);
        } else {
            int l, r;
            cin >> l >> r;
            cout << fenw.rangeSum(l, r) << endl;
        }
    }

    return 0;
}`,
        explanation: "1. 树状数组的核心是 lowbit 运算：idx & -idx。\n2. add(idx, val)：从 idx 开始，每次加上 lowbit，更新所有包含 idx 的区间。\n3. sum(idx)：从 idx 开始，每次减去 lowbit，累加所有覆盖 [1, idx] 的区间。\n4. rangeSum(l, r) = sum(r) - sum(l-1)。\n5. 时间复杂度：O(n log n) 建树，O(log n) 单点修改，O(log n) 区间查询。"
      },
      {
        title: "洛谷 P3372 【模板】线段树 1",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3372",
        description: "给定一个数组，支持区间修改和区间查询。",
        solution: "经典的线段树问题。使用懒标记实现区间修改和区间查询。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct SegmentTree {
    int n;
    vector<ll> tree, lazy;

    SegmentTree(int n) : n(n), tree(4 * n, 0), lazy(4 * n, 0) {}

    void pushDown(int node, int start, int end) {
        if (lazy[node] != 0) {
            int mid = (start + end) / 2;
            tree[2 * node] += lazy[node] * (mid - start + 1);
            tree[2 * node + 1] += lazy[node] * (end - mid);
            lazy[2 * node] += lazy[node];
            lazy[2 * node + 1] += lazy[node];
            lazy[node] = 0;
        }
    }

    void update(int l, int r, ll val, int node = 1, int start = 1, int end = -1) {
        if (end == -1) end = n;
        if (r < start || end < l) return;
        if (l <= start && end <= r) {
            tree[node] += val * (end - start + 1);
            lazy[node] += val;
            return;
        }
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        update(l, r, val, 2 * node, start, mid);
        update(l, r, val, 2 * node + 1, mid + 1, end);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    ll query(int l, int r, int node = 1, int start = 1, int end = -1) {
        if (end == -1) end = n;
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        return query(l, r, 2 * node, start, mid) + query(l, r, 2 * node + 1, mid + 1, end);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    SegmentTree seg(n);

    for (int i = 1; i <= n; i++) {
        ll x;
        cin >> x;
        seg.update(i, i, x);
    }

    while (m--) {
        int op;
        cin >> op;
        if (op == 1) {
            int l, r;
            ll k;
            cin >> l >> r >> k;
            seg.update(l, r, k);
        } else {
            int l, r;
            cin >> l >> r;
            cout << seg.query(l, r) << endl;
        }
    }

    return 0;
}`,
        explanation: "1. 线段树使用数组存储，tree[node] 表示区间 [start, end] 的和。\n2. lazy[node] 表示区间 [start, end] 的懒标记，需要下传给子节点。\n3. update(l, r, val)：区间 [l, r] 加上 val。\n4. query(l, r)：查询区间 [l, r] 的和。\n5. pushDown：将懒标记下传给子节点。\n6. 时间复杂度：O(n log n) 建树，O(log n) 区间修改，O(log n) 区间查询。"
      }
    ]
  },
{
    category: "基础数据结构",
    title: "并查集与连通性",
    minutes: "基础",
    goal: "用集合合并模型处理连通块、关系约束和离线动态连通性。",
    check: "能写路径压缩、按秩合并、带权并查集和回滚并查集的思路。",
    intro: "并查集是图论和数据结构之间的桥。只要问题出现“合并、同组、关系是否矛盾”，就该想到它。",
    topics: [
      "普通并查集",
      "按秩合并",
      "带权并查集",
      "种类并查集",
      "可回滚并查集",
      "离线动态连通性",
      "Kruskal",
      "并查集合并贡献",
      "最小生成树重构树",
    ],
    mustKnow: [
      "find 负责找代表元，unite 负责合并集合。",
      "带权并查集维护点到父亲或根的关系。",
      "回滚并查集不能随便路径压缩，通常只按大小合并。",
    ],
    pitfalls: [
      "关系题要先定义清楚 dist[x] 的含义。",
      "回滚时要保存足够信息，否则撤销不完整。",
      "Kruskal 中边排序和重复边处理不能漏。",
    ],
    steps: [
      "并查集（DSU）是一种维护「集合合并」和「元素归属」的数据结构，核心思想是用一棵树表示一个集合，树根就是集合的代表元。通过路径压缩和按秩合并，可以近似 O(1) 完成查找和合并。",
      "具体来说，find(x) 操作沿着父指针找到根节点，同时将路径上所有节点直接指向根（路径压缩）。unite(a, b) 操作将两个集合合并，通常将小树接到大树上（按秩合并）。",
      "举个例子：有 5 个人 {1,2,3,4,5}，初始每人一个集合。unite(1,2) 后 {1,2} 一个集合。unite(3,4) 后 {3,4} 一个集合。unite(1,3) 后 {1,2,3,4} 一个集合。此时 find(2) 和 find(4) 返回相同的根。",
      "在实际使用中，带权并查集可以在边权上维护额外关系（如距离、种类）。回滚并查集不能路径压缩，只能按大小合并，适合需要撤销操作的场景。",
      "适用场景：当你遇到「判断两个元素是否在同一集合」「动态合并集合」或「Kruskal 最小生成树」等问题时，应该想到用并查集。"
    ],
    code: `struct DSU {
    vector<int> parent, sz;
    DSU(int n = 0) { init(n); }
    void init(int n) {
        parent.resize(n + 1);
        sz.assign(n + 1, 1);
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] == x) return x;
        return parent[x] = find(parent[x]);
    }
    bool unite(int a, int b) {
        a = find(a), b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
        return true;
    }
};`,
    examples: [
      {
        title: "洛谷 P3367 【模板】并查集",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3367",
        description: "给定 n 个元素，支持合并两个元素所在的集合，查询两个元素是否在同一集合。",
        solution: "经典的并查集问题。使用路径压缩和按秩合并优化。",
        code: `#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> parent, sz;
    DSU(int n) : parent(n + 1), sz(n + 1, 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int a, int b) {
        a = find(a), b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
        return true;
    }
    bool connected(int a, int b) {
        return find(a) == find(b);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    DSU dsu(n);

    while (m--) {
        int op, a, b;
        cin >> op >> a >> b;
        if (op == 1) {
            dsu.unite(a, b);
        } else {
            cout << (dsu.connected(a, b) ? "Y" : "N") << endl;
        }
    }

    return 0;
}`,
        explanation: "1. 并查集的核心操作：find（查找代表元）和 unite（合并集合）。\n2. 路径压缩：在 find 过程中，将所有节点直接指向根节点，降低树的高度。\n3. 按秩合并：将较小的树合并到较大的树上，保持树的平衡。\n4. connected(a, b)：判断 a 和 b 是否在同一集合，即 find(a) == find(b)。\n5. 时间复杂度：近似 O(1)（使用路径压缩和按秩合并）。"
      },
      {
        title: "CF 500C - New Year Book Reading",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/500/C",
        description: "有 n 本书，每天读一本。读完后放在最上面。问最小的总举起重量。",
        solution: "分析性质，使用并查集或模拟。关键在于书的顺序会变化。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<int> w(n + 1);
    for (int i = 1; i <= n; i++) cin >> w[i];

    vector<int> order(m);
    for (int i = 0; i < m; i++) cin >> order[i];

    // 计算每本书的位置
    vector<int> pos(n + 1, 0);
    for (int i = 0; i < m; i++) {
        pos[order[i]] = i;
    }

    // 模拟过程
    vector<int> stack;
    long long ans = 0;
    for (int i = 0; i < m; i++) {
        int book = order[i];
        // 找到书的位置
        int idx = -1;
        for (int j = 0; j < stack.size(); j++) {
            if (stack[j] == book) {
                idx = j;
                break;
            }
        }

        if (idx == -1) {
            // 书不在栈中，需要从底部取出
            for (int j = 0; j < stack.size(); j++) {
                ans += w[stack[j]];
            }
        } else {
            // 书在栈中，需要从上面取出
            for (int j = 0; j < idx; j++) {
                ans += w[stack[j]];
            }
            stack.erase(stack.begin() + idx);
        }
        stack.insert(stack.begin(), book);
    }

    cout << ans << endl;
    return 0;
}`,
        explanation: "1. 分析题目性质：每次读完书后放在最上面。\n2. 如果书在栈中，需要取出上面的所有书。\n3. 如果书不在栈中，需要取出所有书。\n4. 模拟这个过程，累加举起的重量。\n5. 时间复杂度：O(nm)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "图论",
    title: "图遍历、拓扑与连通分量",
    minutes: "基础",
    goal: "掌握图的基础模型，并能处理有向/无向图的连通结构。",
    check: "能写 BFS、DFS、拓扑排序、Tarjan SCC、割点割边、二分图判定。",
    intro: "图论基础覆盖了大量区域赛中档题。重点是把题意转成点和边，再选择合适的连通性工具。",
    topics: [
      "DFS",
      "BFS",
      "拓扑排序",
      "DAG",
      "二分图判定",
      "强连通分量",
      "缩点",
      "割点",
      "桥",
      "点双连通分量",
      "边双连通分量",
      "欧拉路",
      "2-SAT",
      "函数图",
    ],
    mustKnow: [
      "DAG 上可以做拓扑 DP。",
      "SCC 缩点后一定是 DAG。",
      "2-SAT 的核心是建蕴含图并检查变量和反变量是否同 SCC。",
    ],
    pitfalls: [
      "无向图 Tarjan 要区分树边和返祖边。",
      "拓扑排序如果出队数少于 n，说明有环。",
      "欧拉路要同时检查度数条件和连通性。",
    ],
    steps: [
      "图遍历（DFS/BFS）、拓扑排序和强连通分量（SCC）是图论的基础工具，核心思想是通过遍历图的节点和边来发现图的结构特性，如连通性、是否有环、节点的层次关系等。",
      "具体来说，DFS 用递归或栈深度优先探索图，适合找连通分量、判断环。BFS 用队列广度优先探索，适合求最短路（无权图）。拓扑排序将 DAG 的节点排成线性序列，使得所有边从前指向后。",
      "举个例子：拓扑排序的 Kahn 算法。先统计所有节点的入度，将入度为 0 的节点入队。每次取出队首节点，将其邻居的入度减 1，如果入度变为 0 则入队。最终如果出队数等于 n，则得到拓扑序。",
      "在实际使用中，Tarjan 算法可以在线性时间内求出 SCC、割点和桥。SCC 缩点后一定得到 DAG，可以在 DAG 上做 DP。2-SAT 问题的核心就是建蕴含图并检查变量和反变量是否在同一个 SCC。",
      "适用场景：当你遇到「判断有向图是否有环」「将任务排序使其满足依赖关系」或「找出图中的强连通分量」等问题时，应该想到用拓扑排序或 Tarjan 算法。"
    ],
    code: `vector<int> topoSort(int n, vector<vector<int>>& g) {
    vector<int> indeg(n + 1), order;
    for (int u = 1; u <= n; u++) {
        for (int v : g[u]) indeg[v]++;
    }
    queue<int> q;
    for (int i = 1; i <= n; i++) if (!indeg[i]) q.push(i);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : g[u]) {
            if (--indeg[v] == 0) q.push(v);
        }
    }
    return order;
}`,
    examples: [
      {
        title: "洛谷 P1347 旅行",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1347",
        description: "给定 n 个城市和 m 条单向道路，求从城市 1 到城市 n 的最长路径。如果存在环，输出 -1。",
        solution: "拓扑排序 + 最长路。如果拓扑排序后还有节点没有被访问，说明存在环。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, int>>> adj(n + 1);
    vector<int> indeg(n + 1, 0);

    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        indeg[v]++;
    }

    queue<int> q;
    for (int i = 1; i <= n; i++) {
        if (indeg[i] == 0) q.push(i);
    }

    vector<int> topo;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        topo.push_back(u);
        for (auto [v, w] : adj[u]) {
            if (--indeg[v] == 0) q.push(v);
        }
    }

    if ((int)topo.size() < n) {
        cout << -1 << endl;
        return 0;
    }

    vector<ll> dp(n + 1, LLONG_MIN);
    dp[1] = 0;
    for (int u : topo) {
        if (dp[u] == LLONG_MIN) continue;
        for (auto [v, w] : adj[u]) {
            dp[v] = max(dp[v], dp[u] + w);
        }
    }

    cout << (dp[n] == LLONG_MIN ? -1 : dp[n]) << endl;
    return 0;
}`,
        explanation: "1. 拓扑排序：按入度为 0 的节点顺序遍历。\n2. 检查是否有环：如果拓扑排序后还有节点没有被访问，说明存在环。\n3. 最长路：按拓扑序遍历节点，更新 dp[v] = max(dp[v], dp[u] + w)。\n4. 时间复杂度：O(n + m)，空间复杂度：O(n + m)。"
      },
      {
        title: "CF 25D - Roads not only in Berland",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/25/D",
        description: "给定 n 个城市和 n-1 条道路，每天可以关闭一条道路并打开另一条道路。问最少需要多少天使得所有城市连通且没有环。",
        solution: "使用并查集找出多余的边和需要连接的边。",
        code: `#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> parent;
    DSU(int n) : parent(n + 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int a, int b) {
        a = find(a), b = find(b);
        if (a == b) return false;
        parent[b] = a;
        return true;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    DSU dsu(n);

    vector<pair<int, int>> extra, need;
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        if (!dsu.unite(u, v)) {
            extra.push_back({u, v});
        }
    }

    for (int i = 2; i <= n; i++) {
        if (dsu.find(1) != dsu.find(i)) {
            need.push_back({1, i});
            dsu.unite(1, i);
        }
    }

    cout << (int)extra.size() << endl;
    for (int i = 0; i < (int)extra.size(); i++) {
        cout << extra[i].first << " " << extra[i].second << " "
             << need[i].first << " " << need[i].second << endl;
    }

    return 0;
}`,
        explanation: "1. 使用并查集找出多余的边：如果 unite 返回 false，说明这条边会形成环。\n2. 找出需要连接的边：遍历所有节点，如果和节点 1 不在同一集合，就需要连接。\n3. 多余的边和需要连接的边一一对应。\n4. 时间复杂度：O(n α(n))，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "图论",
    title: "最短路与路径约束",
    minutes: "提高",
    goal: "根据边权类型选择 BFS、Dijkstra、Bellman-Ford、Floyd 或差分约束。",
    check: "能说明 0-1 BFS、Dijkstra、Floyd、Johnson 各自适用条件。",
    intro: "最短路不是一个模板打天下。边权是否非负、点数大小、是否多源多汇，都会决定算法。",
    topics: [
      "BFS 最短路",
      "0-1 BFS",
      "Dijkstra",
      "堆优化",
      "Bellman-Ford",
      "SPFA 与判负环",
      "Floyd",
      "Johnson",
      "差分约束",
      "A*",
      "k 短路",
      "最短路树",
      "分层图最短路",
    ],
    mustKnow: [
      "非负边权优先 Dijkstra，边权只有 0/1 用双端队列。",
      "Floyd 是 O(n^3)，适合点数小和多源查询。",
      "差分约束本质是把不等式转成边。",
    ],
    pitfalls: [
      "Dijkstra 不能直接处理负权边。",
      "SPFA 不是银弹，在构造数据下可能很慢。",
      "多组数据要清空图和距离数组。",
    ],
    steps: [
      "最短路算法用于求图中两点之间的最短距离，核心思想是通过松弛操作逐步逼近最优解。不同算法适用于不同的边权类型和图规模。",
      "具体来说，Dijkstra 适用于非负边权图，用小根堆维护当前距离最小的节点，每次取出并更新邻居。Bellman-Ford/SPFA 可以处理负权边，但效率较低。Floyd 适合多源最短路和小规模图。",
      "举个例子：用 Dijkstra 求从节点 1 到其他节点的最短距离。初始 dist[1]=0，其余为无穷大。每次从堆中取出距离最小的节点 u，对于每条边 (u,v,w)，如果 dist[v] > dist[u]+w，则更新 dist[v]。",
      "在实际使用中，需要注意 Dijkstra 不能处理负权边。SPFA 在构造数据下可能退化到 O(nm)。0-1 BFS 用双端队列处理边权只有 0 和 1 的情况，效率更高。差分约束的本质是把不等式转成最短路的边。",
      "适用场景：当你遇到「求两点最短距离」「判断负环」或「差分约束系统」等问题时，应该根据边权类型选择合适的最短路算法。非负边权优先用 Dijkstra。"
    ],
    code: `const long long INF = 4e18;

vector<long long> dijkstra(int n, vector<vector<pair<int,int>>>& g, int s) {
    vector<long long> dist(n + 1, INF);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<pair<long long,int>>> pq;
    dist[s] = 0;
    pq.push({0, s});
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d != dist[u]) continue;
        for (auto [v, w] : g[u]) {
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
    examples: [
      {
        title: "洛谷 P3371 【模板】单源最短路径（弱化版）",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3371",
        description: "给定一个有向图，求从源点到其他所有点的最短距离。",
        solution: "经典的 Dijkstra 算法。使用优先队列优化。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll INF = 1e18;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, s;
    cin >> n >> m >> s;
    vector<vector<pair<int, int>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }

    vector<ll> dist(n + 1, INF);
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> pq;
    dist[s] = 0;
    pq.push({0, s});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d != dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        cout << dist[i] << " ";
    }
    cout << endl;

    return 0;
}`,
        explanation: "1. Dijkstra 算法适用于非负边权的有向图。\n2. 使用优先队列（小根堆）维护当前距离最小的节点。\n3. 每次取出距离最小的节点，更新其邻居的距离。\n4. 如果取出的距离大于当前记录的距离，说明已经处理过，跳过。\n5. 时间复杂度：O((n + m) log n)，空间复杂度：O(n + m)。"
      },
      {
        title: "洛谷 P3385 【模板】负环",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3385",
        description: "给定一个有向图，判断是否存在负环。",
        solution: "使用 SPFA 算法，如果一个节点入队超过 n 次，说明存在负环。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<vector<pair<int, int>>> adj(n + 1);
        for (int i = 0; i < m; i++) {
            int u, v, w;
            cin >> u >> v >> w;
            adj[u].push_back({v, w});
            if (w >= 0) adj[v].push_back({u, w});
        }

        vector<int> dist(n + 1, 1e9), cnt(n + 1, 0);
        vector<bool> inq(n + 1, false);
        queue<int> q;

        dist[1] = 0;
        q.push(1);
        inq[1] = true;
        bool hasNegCycle = false;

        while (!q.empty() && !hasNegCycle) {
            int u = q.front(); q.pop();
            inq[u] = false;
            for (auto [v, w] : adj[u]) {
                if (dist[v] > dist[u] + w) {
                    dist[v] = dist[u] + w;
                    if (!inq[v]) {
                        q.push(v);
                        inq[v] = true;
                        cnt[v]++;
                        if (cnt[v] >= n) {
                            hasNegCycle = true;
                            break;
                        }
                    }
                }
            }
        }

        cout << (hasNegCycle ? "YES" : "NO") << endl;
    }

    return 0;
}`,
        explanation: "1. SPFA 算法可以检测负环。\n2. 如果一个节点入队超过 n 次，说明存在负环。\n3. 使用队列维护待处理的节点。\n4. 每次取出队首节点，更新其邻居的距离。\n5. 时间复杂度：O(nm)（最坏情况），空间复杂度：O(n + m)。"
      }
    ]
  },
{
    category: "图论",
    title: "最小生成树与特殊图",
    minutes: "提高",
    goal: "处理生成树、瓶颈路径、次小生成树、基环树和特殊图结构。",
    check: "能写 Kruskal，并能解释 MST 的割性质和环性质。",
    intro: "生成树题通常藏着贪心证明。特殊图题则要求先识别结构，如功能图、基环树、仙人掌图。",
    topics: [
      "Kruskal",
      "Prim",
      "Boruvka",
      "次小生成树",
      "瓶颈生成树",
      "最小生成树重构树",
      "有向生成树",
      "功能图",
      "基环树",
      "仙人掌图",
      "竞赛图",
      "欧拉回路应用",
    ],
    mustKnow: [
      "Kruskal 按边权从小到大，用并查集避免成环。",
      "MST 上两点路径最大边常用于替换边分析。",
      "功能图每个点出度为 1，由环和入树组成。",
    ],
    pitfalls: [
      "图不连通时不存在生成树，要输出 forest 或判无解。",
      "次小生成树需要区分严格次小和非严格次小。",
      "特殊图别急着套通用算法，结构常能降复杂度。",
    ],
    steps: [
      "最小生成树（MST）是连接图中所有节点且总边权最小的树，核心思想是贪心：每次选择不会形成环的最小边。Kruskal 算法通过按边权排序并用并查集判环来构建 MST。",
      "具体来说，Kruskal 算法的步骤是：将所有边按边权从小到大排序，依次考虑每条边，如果这条边连接的两个节点不在同一个连通分量中（用并查集判断），就将这条边加入 MST。",
      "举个例子：有 4 个节点和 5 条边。排序后依次考虑：边(1,2,1) 加入，边(2,3,2) 加入，边(3,4,3) 加入。此时已加入 3 条边（n-1 条），MST 构建完成，总权值为 6。",
      "在实际使用中，需要注意图不连通时不存在生成树。次小生成树需要区分严格次小和非严格次小。特殊图（如基环树、仙人掌图）有特殊结构可以利用，不要急着套通用算法。",
      "适用场景：当你遇到「用最小代价连接所有节点」「求瓶颈路径」或「Kruskal 算法的前置条件」等问题时，应该想到用最小生成树。"
    ],
    code: `struct Edge {
    int u, v, w;
};

long long kruskal(int n, vector<Edge> edges) {
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.w < b.w;
    });
    DSU dsu(n);
    long long total = 0;
    int used = 0;
    for (auto e : edges) {
        if (dsu.unite(e.u, e.v)) {
            total += e.w;
            used++;
        }
    }
    return used == n - 1 ? total : -1;
}`,
    examples: [
      {
        title: "洛谷 P3366 【模板】最小生成树",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3366",
        description: "给定一个无向图，求最小生成树的权值。如果不存在最小生成树，输出orz。",
        solution: "经典的 Kruskal 算法。使用并查集维护连通性。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct DSU {
    vector<int> parent, sz;
    DSU(int n) : parent(n + 1), sz(n + 1, 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int a, int b) {
        a = find(a), b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
        return true;
    }
};

struct Edge {
    int u, v, w;
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<Edge> edges(m);
    for (int i = 0; i < m; i++) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    }

    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.w < b.w;
    });

    DSU dsu(n);
    ll total = 0;
    int used = 0;

    for (auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            total += e.w;
            used++;
        }
    }

    if (used == n - 1) {
        cout << total << endl;
    } else {
        cout << "orz" << endl;
    }

    return 0;
}`,
        explanation: "1. Kruskal 算法：按边权从小到大排序，依次加入不会形成环的边。\n2. 使用并查集维护连通性：如果两个端点不在同一集合，就可以加入这条边。\n3. 如果加入的边数等于 n-1，说明找到了最小生成树。\n4. 时间复杂度：O(m log m)，空间复杂度：O(n + m)。"
      },
      {
        title: "洛谷 P1967 货车运输",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1967",
        description: "给定一个无向图，多次查询两点之间路径上边权最小值的最大值。",
        solution: "最大生成树 + LCA。在最大生成树上，两点之间路径上的最小边权就是答案。",
        code: `#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> parent;
    DSU(int n) : parent(n + 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int a, int b) {
        a = find(a), b = find(b);
        if (a == b) return false;
        parent[b] = a;
        return true;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<tuple<int, int, int>> edges;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        edges.push_back({w, u, v});
    }

    // 最大生成树
    sort(edges.rbegin(), edges.rend());
    DSU dsu(n);
    vector<vector<pair<int, int>>> adj(n + 1);
    for (auto [w, u, v] : edges) {
        if (dsu.unite(u, v)) {
            adj[u].push_back({v, w});
            adj[v].push_back({u, w});
        }
    }

    // LCA 预处理
    const int LOG = 20;
    vector<int> depth(n + 1, 0);
    vector<vector<int>> up(n + 1, vector<int>(LOG, 0));
    vector<vector<int>> minw(n + 1, vector<int>(LOG, 1e9));

    function<void(int, int)> dfs = [&](int u, int parent) {
        up[u][0] = parent;
        for (int k = 1; k < LOG; k++) {
            up[u][k] = up[up[u][k-1]][k-1];
            minw[u][k] = min(minw[u][k-1], minw[up[u][k-1]][k-1]);
        }
        for (auto [v, w] : adj[u]) {
            if (v == parent) continue;
            depth[v] = depth[u] + 1;
            minw[v][0] = w;
            dfs(v, u);
        }
    };
    dfs(1, 0);

    auto query = [&](int a, int b) -> int {
        if (depth[a] < depth[b]) swap(a, b);
        int ans = 1e9;
        for (int k = LOG - 1; k >= 0; k--) {
            if (depth[a] - (1 << k) >= depth[b]) {
                ans = min(ans, minw[a][k]);
                a = up[a][k];
            }
        }
        if (a == b) return ans;
        for (int k = LOG - 1; k >= 0; k--) {
            if (up[a][k] != up[b][k]) {
                ans = min(ans, min(minw[a][k], minw[b][k]));
                a = up[a][k];
                b = up[b][k];
            }
        }
        return min(ans, min(minw[a][0], minw[b][0]));
    };

    int q;
    cin >> q;
    while (q--) {
        int a, b;
        cin >> a >> b;
        if (DSU(n).find(a) != DSU(n).find(b)) {
            cout << -1 << endl;
        } else {
            cout << query(a, b) << endl;
        }
    }

    return 0;
}`,
        explanation: "1. 最大生成树：按边权从大到小排序，用 Kruskal 算法构建。\n2. LCA 预处理：使用倍增法，同时维护路径上的最小边权。\n3. 查询：先将两点提到同一深度，再一起向上跳，记录路径上的最小边权。\n4. 时间复杂度：O(m log m + n log n + q log n)，空间复杂度：O(n log n)。"
      }
    ]
  },
{
    category: "图论",
    title: "网络流、割与匹配",
    minutes: "区域赛",
    goal: "把分配、容量、覆盖、选择代价等问题建成流、割或匹配模型。",
    check: "能写 Dinic，知道最大流最小割、费用流、二分图匹配、KM 的适用场景。",
    intro: "网络流题最难的往往不是模板，而是建图。训练时要多问：谁供给？谁需求？边容量代表什么？费用代表什么？",
    topics: [
      "最大流",
      "Dinic",
      "ISAP",
      "最小割",
      "费用流",
      "上下界网络流",
      "可行流",
      "循环流",
      "二分图最大匹配",
      "Hopcroft-Karp",
      "匈牙利算法",
      "KM 算法",
      "最小点覆盖",
      "DAG 最小路径覆盖",
      "一般图匹配",
    ],
    mustKnow: [
      "最大流等于最小割，割边常对应选择与代价。",
      "费用流适合在满足流量的同时最小化/最大化总代价。",
      "二分图匹配能转化为最大流，也有专门更快算法。",
    ],
    pitfalls: [
      "反向边必须成对维护，索引写错会炸。",
      "费用流里负费用边要注意最短路初始化和势能优化。",
      "上下界流要先处理每条边的 lower，建超级源汇。",
    ],
    steps: [
      "网络流是研究「流量分配」的模型，核心思想是将问题抽象为有向图，每条边有容量限制，求从源点到汇点的最大流量。最大流等于最小割（最大流最小割定理）。",
      "具体来说，Dinic 算法的思路是：用 BFS 构建分层图（确定每个节点的层次），然后用 DFS 在分层图上寻找增广路（从源到汇的路径），沿路径增加流量。重复直到找不到增广路。",
      "举个例子：一个简单的网络，源点 S 到节点 A 容量 10，S 到 B 容量 10，A 到汇点 T 容量 10，B 到 T 容量 10。最大流为 20，因为 S-A-T 和 S-B-T 两条路径各贡献 10。",
      "在实际使用中，网络流题最难的是建图。反向边必须成对维护。费用流在满足流量的同时最小化总代价。二分图匹配可以转化为最大流，也可以用匈牙利算法或 Hopcroft-Karp 直接求解。",
      "适用场景：当你遇到「资源分配」「最大流最小割」「二分图匹配」或「最小点覆盖」等问题时，应该想到用网络流。关键是把问题抽象成源、汇、容量和费用。"
    ],
    code: `struct Dinic {
    struct Edge { int to, rev; long long cap; };
    int n;
    vector<vector<Edge>> g;
    vector<int> level, it;
    Dinic(int n) : n(n), g(n), level(n), it(n) {}
    void addEdge(int u, int v, long long c) {
        Edge a{v, (int)g[v].size(), c};
        Edge b{u, (int)g[u].size(), 0};
        g[u].push_back(a);
        g[v].push_back(b);
    }
    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        queue<int> q;
        level[s] = 0;
        q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& e : g[u]) if (e.cap > 0 && level[e.to] < 0) {
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
        }
        return level[t] >= 0;
    }
    long long dfs(int u, int t, long long f) {
        if (u == t) return f;
        for (int& i = it[u]; i < (int)g[u].size(); i++) {
            Edge& e = g[u][i];
            if (e.cap > 0 && level[e.to] == level[u] + 1) {
                long long ret = dfs(e.to, t, min(f, e.cap));
                if (ret) {
                    e.cap -= ret;
                    g[e.to][e.rev].cap += ret;
                    return ret;
                }
            }
        }
        return 0;
    }
    long long maxflow(int s, int t) {
        long long flow = 0, pushed;
        while (bfs(s, t)) {
            fill(it.begin(), it.end(), 0);
            while ((pushed = dfs(s, t, LLONG_MAX))) flow += pushed;
        }
        return flow;
    }
};`,
    examples: [
      {
        title: "洛谷 P3376 【模板】最大流",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3376",
        description: "给定一个有向图，每条边有容量，求从源点到汇点的最大流。",
        solution: "经典的 Dinic 算法。使用 BFS 构建分层图，DFS 找增广路。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct Dinic {
    struct Edge { int to, rev; ll cap; };
    int n;
    vector<vector<Edge>> g;
    vector<int> level, it;

    Dinic(int n) : n(n), g(n), level(n), it(n) {}

    void addEdge(int u, int v, ll c) {
        g[u].push_back({v, (int)g[v].size(), c});
        g[v].push_back({u, (int)g[u].size() - 1, 0});
    }

    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        queue<int> q;
        level[s] = 0;
        q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& e : g[u]) {
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[u] + 1;
                    q.push(e.to);
                }
            }
        }
        return level[t] >= 0;
    }

    ll dfs(int u, int t, ll f) {
        if (u == t) return f;
        for (int& i = it[u]; i < (int)g[u].size(); i++) {
            Edge& e = g[u][i];
            if (e.cap > 0 && level[e.to] == level[u] + 1) {
                ll ret = dfs(e.to, t, min(f, e.cap));
                if (ret > 0) {
                    e.cap -= ret;
                    g[e.to][e.rev].cap += ret;
                    return ret;
                }
            }
        }
        return 0;
    }

    ll maxflow(int s, int t) {
        ll flow = 0;
        while (bfs(s, t)) {
            fill(it.begin(), it.end(), 0);
            ll pushed;
            while ((pushed = dfs(s, t, LLONG_MAX)) > 0) {
                flow += pushed;
            }
        }
        return flow;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, s, t;
    cin >> n >> m >> s >> t;
    Dinic dinic(n + 1);

    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        dinic.addEdge(u, v, w);
    }

    cout << dinic.maxflow(s, t) << endl;
    return 0;
}`,
        explanation: "1. Dinic 算法：使用 BFS 构建分层图，DFS 找增广路。\n2. addEdge：添加正向边和反向边，反向边容量为 0。\n3. bfs：构建分层图，判断是否存在增广路。\n4. dfs：在分层图上找增广路，更新边的容量。\n5. maxflow：循环执行 BFS 和 DFS，直到不存在增广路。\n6. 时间复杂度：O(n²m)，空间复杂度：O(n + m)。"
      },
      {
        title: "洛谷 P3386 【模板】二分图最大匹配",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3386",
        description: "给定一个二分图，求最大匹配数。",
        solution: "使用匈牙利算法或最大流求解。",
        code: `#include <bits/stdc++.h>
using namespace std;

struct Hungarian {
    int n, m;
    vector<vector<int>> adj;
    vector<int> match, vis;
    int timestamp = 0;

    Hungarian(int n, int m) : n(n), m(m), adj(n + 1), match(m + 1, 0), vis(m + 1, 0) {}

    void addEdge(int u, int v) {
        adj[u].push_back(v);
    }

    bool dfs(int u) {
        for (int v : adj[u]) {
            if (vis[v] == timestamp) continue;
            vis[v] = timestamp;
            if (match[v] == 0 || dfs(match[v])) {
                match[v] = u;
                return true;
            }
        }
        return false;
    }

    int solve() {
        int ans = 0;
        for (int u = 1; u <= n; u++) {
            timestamp++;
            if (dfs(u)) ans++;
        }
        return ans;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, e;
    cin >> n >> m >> e;
    Hungarian hungarian(n, m);

    for (int i = 0; i < e; i++) {
        int u, v;
        cin >> u >> v;
        hungarian.addEdge(u, v);
    }

    cout << hungarian.solve() << endl;
    return 0;
}`,
        explanation: "1. 匈牙利算法：使用 DFS 找增广路。\n2. match[v] 表示右部节点 v 匹配的左部节点。\n3. vis[v] 用于避免重复访问。\n4. dfs(u)：尝试为左部节点 u 找到匹配。\n5. solve()：遍历所有左部节点，尝试匹配。\n6. 时间复杂度：O(nm)，空间复杂度：O(n + m)。"
      }
    ]
  },
{
    category: "图论",
    title: "树上查询、树形 DP 与动态树",
    minutes: "提高",
    goal: "掌握树上的路径、子树、祖先、重链、点分治和虚树模型。",
    check: "能写 LCA、树形 DP、换根 DP、树链剖分和点分治的核心流程。",
    intro: "树题的关键是把路径和子树变成可维护区间，或利用树的递归结构做 DP 和分治。",
    topics: [
      "树遍历",
      "欧拉序",
      "LCA",
      "倍增",
      "树上差分",
      "树形 DP",
      "换根 DP",
      "树的直径",
      "树链剖分",
      "DSU on tree",
      "点分治",
      "边分治",
      "虚树",
      "动态树 LCT",
      "树哈希",
    ],
    mustKnow: [
      "欧拉序能把子树变成连续区间。",
      "树链剖分把路径拆成 O(log n) 段重链区间。",
      "点分治适合处理树上距离相关的全局统计。",
    ],
    pitfalls: [
      "LCA 倍增数组层数要覆盖 log2(n)。",
      "树链剖分线段树维护的是 dfn 序，不是原编号。",
      "换根 DP 要明确从父亲传给儿子的贡献如何删旧加新。",
    ],
    steps: [
      "树上查询和树形 DP 利用树的递归结构来解决问题，核心思想是自底向上合并子树信息，或者将树上路径转化为可维护的区间。LCA（最近公共祖先）是树上查询的基础工具。",
      "具体来说，LCA 的倍增法思路是：预处理每个节点的 2^k 级祖先。查询时先将两点提到同一深度，再一起向上跳，直到找到最近公共祖先。树链剖分则将树分成重链，把路径拆成 O(log n) 段连续区间。",
      "举个例子：求节点 5 和节点 8 的 LCA。假设 5 的深度是 4，8 的深度是 2。先将 5 向上跳 2 步到深度 2，然后两点一起向上跳，直到相遇。相遇点就是 LCA。",
      "在实际使用中，倍增数组的层数要覆盖 log2(n)。树链剖分的线段树维护的是 dfn 序（DFS 序），不是原节点编号。点分治适合处理树上距离相关的全局统计问题。",
      "适用场景：当你遇到「求树上两点的最近公共祖先」「树上路径查询」或「以每个节点为根的子树统计」等问题时，应该想到用 LCA、树链剖分或树形 DP。"
    ],
    code: `const int LOG = 20;
vector<array<int, LOG>> up;
vector<int> depth;
vector<vector<int>> tree;

void dfsLca(int u, int p) {
    up[u][0] = p;
    for (int k = 1; k < LOG; k++) up[u][k] = up[up[u][k - 1]][k - 1];
    for (int v : tree[u]) if (v != p) {
        depth[v] = depth[u] + 1;
        dfsLca(v, u);
    }
}

int lca(int a, int b) {
    if (depth[a] < depth[b]) swap(a, b);
    int diff = depth[a] - depth[b];
    for (int k = 0; k < LOG; k++) if (diff >> k & 1) a = up[a][k];
    if (a == b) return a;
    for (int k = LOG - 1; k >= 0; k--) {
        if (up[a][k] != up[b][k]) {
            a = up[a][k];
            b = up[b][k];
        }
    }
    return up[a][0];
}`,
    examples: [
      {
        title: "洛谷 P3379 【模板】最近公共祖先（LCA）",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3379",
        description: "给定一棵树，多次查询两点的最近公共祖先。",
        solution: "使用倍增法求解 LCA。预处理每个节点的 2^k 级祖先。",
        code: `#include <bits/stdc++.h>
using namespace std;

const int LOG = 20;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, s;
    cin >> n >> m >> s;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> depth(n + 1, 0);
    vector<vector<int>> up(n + 1, vector<int>(LOG, 0));

    function<void(int, int)> dfs = [&](int u, int parent) {
        up[u][0] = parent;
        for (int k = 1; k < LOG; k++) {
            up[u][k] = up[up[u][k-1]][k-1];
        }
        for (int v : adj[u]) {
            if (v == parent) continue;
            depth[v] = depth[u] + 1;
            dfs(v, u);
        }
    };
    dfs(s, 0);

    auto lca = [&](int a, int b) -> int {
        if (depth[a] < depth[b]) swap(a, b);
        int diff = depth[a] - depth[b];
        for (int k = 0; k < LOG; k++) {
            if (diff >> k & 1) a = up[a][k];
        }
        if (a == b) return a;
        for (int k = LOG - 1; k >= 0; k--) {
            if (up[a][k] != up[b][k]) {
                a = up[a][k];
                b = up[b][k];
            }
        }
        return up[a][0];
    };

    while (m--) {
        int a, b;
        cin >> a >> b;
        cout << lca(a, b) << endl;
    }

    return 0;
}`,
        explanation: "1. 倍增法：预处理每个节点的 2^k 级祖先。\n2. dfs：从根节点开始，计算每个节点的深度和祖先。\n3. lca：先将两点提到同一深度，再一起向上跳。\n4. 如果两点在同一位置，就是 LCA；否则，跳到 LCA 的下一层。\n5. 时间复杂度：O(n log n) 预处理，O(log n) 查询。"
      },
      {
        title: "洛谷 P3865 【模板】ST 表",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3865",
        description: "给定一个数组，多次查询区间最大值。",
        solution: "使用 ST 表（稀疏表）求解。预处理 O(n log n)，查询 O(1)。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];

    // 预处理 ST 表
    const int LOG = 20;
    vector<vector<int>> st(n + 1, vector<int>(LOG, 0));
    for (int i = 1; i <= n; i++) st[i][0] = a[i];
    for (int k = 1; k < LOG; k++) {
        for (int i = 1; i + (1 << k) - 1 <= n; i++) {
            st[i][k] = max(st[i][k-1], st[i + (1 << (k-1))][k-1]);
        }
    }

    // 预处理 log2
    vector<int> log2(n + 1, 0);
    for (int i = 2; i <= n; i++) log2[i] = log2[i / 2] + 1;

    // 查询
    while (m--) {
        int l, r;
        cin >> l >> r;
        int k = log2[r - l + 1];
        cout << max(st[l][k], st[r - (1 << k) + 1][k]) << endl;
    }

    return 0;
}`,
        explanation: "1. ST 表：预处理区间的最大值，支持 O(1) 查询。\n2. st[i][k] 表示区间 [i, i + 2^k - 1] 的最大值。\n3. 预处理：st[i][k] = max(st[i][k-1], st[i + 2^(k-1)][k-1])。\n4. 查询：用两个重叠的区间覆盖目标区间。\n5. 时间复杂度：O(n log n) 预处理，O(1) 查询。"
      }
    ]
  },
{
    category: "动态规划",
    title: "线性 DP",
    minutes: "提高",
    goal: "掌握按序列位置推进的 DP 思维，熟练解决 LIS、LCS、最大子段和等经典问题。",
    check: "能写出 LIS 的 O(n log n) 解法、LCS 的二维 DP、最大子段和的 Kadane 算法。",
    intro: "线性 DP 是最基础的 DP 类型，状态通常定义在序列的某个位置上，转移只依赖于前面的位置。理解线性 DP 是学习其他 DP 的基础。",
    topics: [
      "最长上升子序列 LIS",
      "最长公共子序列 LCS",
      "最大子段和",
      "编辑距离",
      "数字三角形",
      "计数类线性 DP",
      "带约束的线性 DP",
    ],
    mustKnow: [
      "LIS 的耐心排序法：维护一个辅助数组 d，d[i] 表示长度为 i 的 LIS 的最小末尾。",
      "LCS 的状态转移：dp[i][j] 表示 s1 前 i 个和 s2 前 j 个字符的 LCS 长度。",
      "最大子段和的 Kadane 算法：维护以当前位置结尾的最大子段和。",
    ],
    pitfalls: [
      "LIS 的 O(n²) 解法在 n 较大时会超时，需要掌握 O(n log n) 优化。",
      "LCS 的空间优化要注意滚动数组的方向。",
      "最大子段和要区分是否允许空子段。",
    ],
    steps: [
      "线性 DP 是最基础的动态规划类型，核心思想是将问题分解为按序列位置推进的子问题，每个位置的状态只依赖于前面位置的状态。经典问题包括 LIS（最长上升子序列）、LCS（最长公共子序列）和最大子段和。",
      "具体来说，LIS 的 O(n log n) 贪心法思路是：维护一个辅助数组 d，d[i] 表示长度为 i 的上升子序列的最小末尾。对于每个新元素 x，用二分找到 d 中第一个 ≥ x 的位置并替换，这样 d 始终保持有序。",
      "举个例子：序列 [3, 1, 4, 1, 5, 9]。处理 3 后 d=[3]，处理 1 后 d=[1]，处理 4 后 d=[1,4]，处理 1 后 d=[1,4]（不变），处理 5 后 d=[1,4,5]，处理 9 后 d=[1,4,5,9]。LIS 长度为 4。",
      "在实际使用中，LIS 的 O(n²) 解法在 n 较大时会超时，需要掌握 O(n log n) 优化。LCS 的空间优化可以用滚动数组。最大子段和的 Kadane 算法要区分是否允许空子段。",
      "适用场景：当你遇到「求最长递增子序列」「求两个序列的最长公共部分」或「求最大连续子段和」等问题时，应该想到用线性 DP。"
    ],
    code: `// 最长上升子序列 O(n log n)
int LIS(const vector<int>& a) {
    vector<int> d;
    for (int x : a) {
        auto it = lower_bound(d.begin(), d.end(), x);
        if (it == d.end()) d.push_back(x);
        else *it = x;
    }
    return (int)d.size();
}`,
    examples: [
      {
        title: "CF 300C - Beautiful Numbers",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/300/C",
        description: "给定两个数字 a 和 b，一个数是「美丽的」当且仅当它的每一位都是 a 或 b。问有多少个长度为 n 的「美丽」序列，使得序列元素之和也是「美丽的」。",
        solution: "这是一个计数类线性 DP 问题。设 dp[i] 表示选了 i 个 a 的方案数，那么选了 n-i 个 b。需要判断 i*a + (n-i)*b 是否美丽。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const int MOD = 1e9 + 7;

ll power(ll base, ll exp, ll mod) {
    ll result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}

ll modInverse(ll a, ll mod) {
    return power(a, mod - 2, mod);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    ll a, b, n;
    cin >> a >> b >> n;

    // 预处理阶乘和逆元
    vector<ll> fact(n + 1), inv_fact(n + 1);
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = fact[i - 1] * i % MOD;
    inv_fact[n] = modInverse(fact[n], MOD);
    for (int i = n - 1; i >= 0; i--) inv_fact[i] = inv_fact[i + 1] * (i + 1) % MOD;

    auto C = [&](int n, int k) -> ll {
        if (k < 0 || k > n) return 0;
        return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n - k] % MOD;
    };

    auto isBeautiful = [&](ll x) -> bool {
        while (x > 0) {
            int d = x % 10;
            if (d != a && d != b) return false;
            x /= 10;
        }
        return true;
    };

    ll ans = 0;
    for (int i = 0; i <= n; i++) {
        ll sum = i * a + (n - i) * b;
        if (isBeautiful(sum)) {
            ans = (ans + C(n, i)) % MOD;
        }
    }

    cout << ans << endl;
    return 0;
}`,
        explanation: "1. 预处理阶乘和逆元，用于快速计算组合数 C(n,k)。\n2. 枚举选了 i 个 a 的情况，那么选了 n-i 个 b。\n3. 计算总和 sum = i*a + (n-i)*b，判断 sum 是否美丽。\n4. 如果美丽，累加 C(n,i) 到答案中。\n5. 时间复杂度：O(n log MOD)，空间复杂度：O(n)。"
      },
      {
        title: "AT ABC 134D - Preparing Boxes",
        source: "AtCoder",
        link: "https://atcoder.jp/contests/abc134/tasks/abc134_d",
        description: "有 n 个盒子，每个盒子里有一个球或没有球。对于每个 i，如果第 i 个盒子里有球，那么所有编号是 i 的倍数的盒子里的球的总数必须是偶数。问满足条件的放置方案。",
        solution: "从后往前贪心/DP。对于位置 i，如果前面已经确定了所有 i 的倍数位置的状态，那么 i 位置的状态就被唯一确定了。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];

    vector<int> ans(n + 1, 0);
    // 从后往前确定每个位置的状态
    for (int i = n; i >= 1; i--) {
        int cnt = 0;
        // 统计 i 的所有倍数位置的球数
        for (int j = 2 * i; j <= n; j += i) {
            cnt += ans[j];
        }
        // 如果 a[i] 和 cnt 奇偶性不同，需要在 i 位置放球
        if ((cnt % 2) != a[i]) {
            ans[i] = 1;
        }
    }

    // 输出结果
    int total = 0;
    for (int i = 1; i <= n; i++) total += ans[i];
    cout << total << endl;
    for (int i = 1; i <= n; i++) {
        if (ans[i]) cout << i << " ";
    }
    cout << endl;

    return 0;
}`,
        explanation: "1. 从后往前处理每个位置 i。\n2. 对于位置 i，统计所有 i 的倍数位置（2i, 3i, ...）的球数之和。\n3. 根据 a[i] 的要求和当前球数的奇偶性，决定是否在 i 位置放球。\n4. 最后输出所有放了球的位置。\n5. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "背包 DP",
    minutes: "提高",
    goal: "掌握 01 背包、完全背包、多重背包的核心思想和优化技巧。",
    check: "能写出 01 背包的倒序优化、完全背包的正序优化、多重背包的二进制拆分和单调队列优化。",
    intro: "背包问题是 DP 的经典模型。核心是定义「容量」和「价值」，通过选择物品来最优化目标。不同背包的区别在于物品能否重复选择。",
    topics: [
      "01 背包",
      "完全背包",
      "多重背包",
      "二进制拆分优化",
      "单调队列优化",
      "混合背包",
      "二维费用背包",
      "分组背包",
      "树形背包",
    ],
    mustKnow: [
      "01 背包一维优化时容量必须倒序遍历，避免同一物品被重复选择。",
      "完全背包一维优化时容量正序遍历，允许同一物品多次选择。",
      "多重背包用二进制拆分将 O(NWΣc_i) 降到 O(NW log Σc_i)。",
    ],
    pitfalls: [
      "初始化细节：求最大价值时 dp[0]=0；求最小代价且恰好装满时 dp[0]=0，其余为 INF。",
      "多重背包的单调队列优化要按余数分组处理。",
      "二维费用背包的状态数组要开两维容量。",
    ],
    steps: [
      "背包问题是动态规划的经典模型，核心思想是在有限的容量下选择物品，使得总价值最大。根据物品能否重复选择，分为 01 背包（每件物品只能选一次）和完全背包（每件物品可以选无限次）。",
      "具体来说，01 背包的一维优化思路是：dp[j] 表示容量为 j 时的最大价值。对于每件物品 i，倒序遍历容量 j（从大到小），更新 dp[j] = max(dp[j], dp[j-w[i]] + v[i])。倒序遍历确保每件物品只被选一次。",
      "举个例子：有 3 件物品，重量 [2, 3, 4]，价值 [3, 4, 5]，背包容量 5。选物品 1（重 2，值 3）和物品 2（重 3，值 4）总重 5、总值 7，是最优解。",
      "在实际使用中，完全背包要正序遍历容量（允许重复选择）。多重背包可以用二进制拆分优化。初始化细节很重要：求最大价值时 dp[0]=0；求最小代价且恰好装满时 dp[0]=0，其余为 INF。",
      "适用场景：当你遇到「在有限资源下最大化收益」「选或不选的决策问题」或「将物品分配到有限容量的容器中」等问题时，应该想到用背包 DP。"
    ],
    code: `// 01 背包一维优化
long long knapsack01(vector<int> w, vector<int> val, int cap) {
    vector<long long> dp(cap + 1, 0);
    for (int i = 0; i < (int)w.size(); i++) {
        for (int j = cap; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + val[i]);
        }
    }
    return dp[cap];
}`,
    examples: [
      {
        title: "洛谷 P1048 [NOIP2005 普及组] 采药",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1048",
        description: "辰辰是个天资聪颖的孩子，他的梦想是成为世界上最伟大的医师。为此，他想拜附近最有威望的医师为师。医师为了判断他的资质，给他出了一个难题。医师把他带到一个到处都是草药的山洞里对他说：「孩子，这个山洞里有一些不同的草药，采每一株都需要一些时间，每一株也有它自身的价值。我会给你一段时间，在这段时间里，你可以采到一些草药。如果你是一个聪明的孩子，你应该可以让采到的草药的总价值最大。」如果你是辰辰，你能完成这个任务吗？",
        solution: "经典的 01 背包问题。每株草药只能采一次，时间是容量，价值是价值。用一维 DP 优化空间。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T, m;
    cin >> T >> m;

    vector<int> time(m + 1), value(m + 1);
    for (int i = 1; i <= m; i++) {
        cin >> time[i] >> value[i];
    }

    // dp[j] 表示容量为 j 时的最大价值
    vector<int> dp(T + 1, 0);

    for (int i = 1; i <= m; i++) {
        // 01 背包：倒序遍历容量
        for (int j = T; j >= time[i]; j--) {
            dp[j] = max(dp[j], dp[j - time[i]] + value[i]);
        }
    }

    cout << dp[T] << endl;
    return 0;
}`,
        explanation: "1. dp[j] 表示在时间 j 内能采到的最大价值。\n2. 对于每株草药 i，倒序遍历容量 j（从 T 到 time[i]）。\n3. 状态转移：dp[j] = max(dp[j], dp[j - time[i]] + value[i])。\n4. 倒序遍历确保每株草药只被选一次（01 背包的核心）。\n5. 时间复杂度：O(mT)，空间复杂度：O(T)。"
      },
      {
        title: "CF 577B - Modulo Sum",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/577/B",
        description: "给定 n 个数和一个数 m，问是否存在一个非空子集，使得子集元素之和能被 m 整除。",
        solution: "利用鸽巢原理，当 n >= m 时答案一定是 YES。当 n < m 时，用 DP 检查是否存在和模 m 为 0 的子集。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // 鸽巢原理：n >= m 时一定存在
    if (n >= m) {
        cout << "YES" << endl;
        return 0;
    }

    // dp[j] 表示是否存在子集和模 m 为 j
    vector<bool> dp(m, false);
    dp[0] = true;  // 空集

    for (int i = 0; i < n; i++) {
        int x = a[i] % m;
        vector<bool> new_dp = dp;
        for (int j = 0; j < m; j++) {
            if (dp[j]) {
                new_dp[(j + x) % m] = true;
            }
        }
        dp = new_dp;
    }

    // 检查是否存在模 m 为 0 的非空子集
    // dp[0] 初始为 true（空集），需要检查是否有其他方式得到 0
    cout << (dp[0] && n > 0 ? "YES" : "NO") << endl;

    return 0;
}`,
        explanation: "1. 鸽巢原理：考虑前缀和模 m 的值，如果 n >= m，必有两个前缀和模 m 相同，它们的差就是答案。\n2. 当 n < m 时，用 DP 检查：dp[j] 表示是否存在子集和模 m 为 j。\n3. 对于每个数 a[i]，更新 dp：如果 dp[j] 为真，则 dp[(j+a[i])%m] 也为真。\n4. 注意要处理空集的情况。\n5. 时间复杂度：O(nm)，空间复杂度：O(m)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "区间 DP",
    minutes: "提高",
    goal: "掌握按区间长度递推的 DP 思维，解决石子合并、括号匹配、回文串等问题。",
    check: "能写出石子合并的 O(n³) 解法，理解四边形不等式优化到 O(n²) 的原理。",
    intro: "区间 DP 的状态通常定义在某个区间 [l, r] 上，通过枚举分割点来转移。关键是要按区间长度从小到大枚举，确保子问题已解决。",
    topics: [
      "石子合并",
      "能量项链",
      "括号序列",
      "回文串问题",
      "环形区间处理",
      "四边形不等式优化",
      "Garsia-Wachs 算法",
    ],
    mustKnow: [
      "区间 DP 的三重循环：外层枚举长度，中层枚举左端点，内层枚举分割点。",
      "环形问题的处理：断环成链，将数组复制一倍。",
      "四边形不等式：如果 w(l,r) 满足四边形不等式，则最优决策点具有单调性。",
    ],
    pitfalls: [
      "循环顺序错误：必须按长度从小到大枚举，不能按左端点枚举。",
      "边界条件：长度为 1 的区间通常不需要合并，dp[i][i] = 0。",
      "环形问题忘记处理首尾相连的情况。",
    ],
    steps: [
      "区间 DP 是在区间 [l, r] 上定义状态的动态规划，核心思想是通过枚举分割点将大区间拆成两个小区间，从小到大地求解所有子问题。经典问题包括石子合并、回文串和括号匹配。",
      "具体来说，区间 DP 的三重循环结构是：外层枚举区间长度 len（从小到大），中层枚举左端点 l，内层枚举分割点 k。状态转移通常是 dp[l][r] = min/max(dp[l][k] + dp[k+1][r] + cost)。",
      "举个例子：石子合并问题。有 4 堆石子 [1, 3, 5, 2]，合并相邻两堆的代价是两堆石子数之和。dp[1][4] 表示合并第 1 到第 4 堆的最小代价，需要枚举分割点 k=1,2,3，取最小值。",
      "在实际使用中，循环顺序必须按长度从小到大枚举，不能按左端点枚举。环形问题的处理方法是断环成链，将数组复制一倍。四边形不等式可以将 O(n³) 优化到 O(n²)。",
      "适用场景：当你遇到「合并相邻元素」「在区间上寻找最优分割点」或「回文串相关问题」时，应该想到用区间 DP。关键是定义好 dp[l][r] 的含义和枚举分割点。"
    ],
    code: `// 石子合并（区间 DP）
long long stoneMerge(vector<int>& stones) {
    int n = stones.size();
    vector<vector<long long>> dp(n, vector<long long>(n, 0));
    vector<long long> prefix(n + 1, 0);
    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];

    for (int len = 2; len <= n; len++) {
        for (int l = 0; l + len - 1 < n; l++) {
            int r = l + len - 1;
            dp[l][r] = LLONG_MAX;
            for (int k = l; k < r; k++) {
                dp[l][r] = min(dp[l][r], dp[l][k] + dp[k + 1][r] + prefix[r + 1] - prefix[l]);
            }
        }
    }
    return dp[0][n - 1];
}`,
    examples: [
      {
        title: "洛谷 P1880 [NOI1995] 石子合并",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1880",
        description: "在一个圆形操场的四周摆放 n 堆石子。现要将石子有次序地合并成一堆。规定每次只能选相邻的 2 堆石子合并成新的一堆，并将新的一堆石子数记为该次合并的代价。试求出将 n 堆石子合并成一堆的最小代价和最大代价。",
        solution: "经典的环形区间 DP 问题。断环成链，将数组复制一倍，然后在长度为 2n 的数组上做区间 DP。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(2 * n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        a[i + n] = a[i];  // 断环成链
    }

    // 前缀和
    vector<int> sum(2 * n + 1, 0);
    for (int i = 1; i <= 2 * n; i++) {
        sum[i] = sum[i - 1] + a[i];
    }

    // dp_min[l][r] 表示合并 [l, r] 的最小代价
    // dp_max[l][r] 表示合并 [l, r] 的最大代价
    vector<vector<int>> dp_min(2 * n + 1, vector<int>(2 * n + 1, 1e9));
    vector<vector<int>> dp_max(2 * n + 1, vector<int>(2 * n + 1, 0));

    // 初始化：单堆石子不需要合并，代价为 0
    for (int i = 1; i <= 2 * n; i++) {
        dp_min[i][i] = 0;
        dp_max[i][i] = 0;
    }

    // 区间 DP：按长度枚举
    for (int len = 2; len <= n; len++) {
        for (int l = 1; l + len - 1 <= 2 * n; l++) {
            int r = l + len - 1;
            for (int k = l; k < r; k++) {
                int cost = sum[r] - sum[l - 1];
                dp_min[l][r] = min(dp_min[l][r], dp_min[l][k] + dp_min[k + 1][r] + cost);
                dp_max[l][r] = max(dp_max[l][r], dp_max[l][k] + dp_max[k + 1][r] + cost);
            }
        }
    }

    // 在所有长度为 n 的区间中取最值
    int ans_min = 1e9, ans_max = 0;
    for (int i = 1; i <= n; i++) {
        ans_min = min(ans_min, dp_min[i][i + n - 1]);
        ans_max = max(ans_max, dp_max[i][i + n - 1]);
    }

    cout << ans_min << endl;
    cout << ans_max << endl;

    return 0;
}`,
        explanation: "1. 断环成链：将长度为 n 的环形数组复制一倍，变成长度为 2n 的线性数组。\n2. 前缀和：sum[i] 表示前 i 个数的和，用于快速计算区间和。\n3. 区间 DP：dp[l][r] 表示合并区间 [l, r] 的代价。\n4. 状态转移：枚举分割点 k，dp[l][r] = min/max(dp[l][k] + dp[k+1][r] + sum[l..r])。\n5. 按长度枚举：先处理长度为 1 的区间，再处理长度为 2 的区间，依此类推。\n6. 最后在所有长度为 n 的区间中取最值。\n7. 时间复杂度：O(n³)，空间复杂度：O(n²)。"
      },
      {
        title: "CF 1132F - Clear the String",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/1132/F",
        description: "给定一个长度为 n 的字符串 s，每次操作可以删除一个连续的相同字符子串，问最少需要多少次操作才能删除整个字符串。",
        solution: "区间 DP。dp[l][r] 表示删除区间 [l, r] 的最少操作次数。如果 s[l] == s[r]，可以一起删除，减少一次操作。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    string s;
    cin >> n >> s;

    // dp[l][r] 表示删除区间 [l, r] 的最少操作次数
    vector<vector<int>> dp(n, vector<int>(n, 0));

    // 初始化：单个字符需要 1 次操作
    for (int i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // 区间 DP
    for (int len = 2; len <= n; len++) {
        for (int l = 0; l + len - 1 < n; l++) {
            int r = l + len - 1;
            // 情况 1：单独删除 s[l]
            dp[l][r] = 1 + dp[l + 1][r];
            // 情况 2：枚举分割点
            for (int k = l + 1; k <= r; k++) {
                dp[l][r] = min(dp[l][r], dp[l][k - 1] + dp[k][r]);
            }
            // 情况 3：如果 s[l] == s[r]，可以一起删除
            if (s[l] == s[r]) {
                dp[l][r] = min(dp[l][r], dp[l + 1][r - 1] + 1);
                // 更优的情况：s[l] 可以和区间内的某个相同字符一起删除
                for (int k = l + 1; k < r; k++) {
                    if (s[k] == s[l]) {
                        dp[l][r] = min(dp[l][r], dp[l + 1][k - 1] + dp[k][r]);
                    }
                }
            }
        }
    }

    cout << dp[0][n - 1] << endl;
    return 0;
}`,
        explanation: "1. dp[l][r] 表示删除区间 [l, r] 的最少操作次数。\n2. 基础情况：单个字符需要 1 次操作。\n3. 状态转移：\n   - 单独删除 s[l]：dp[l][r] = 1 + dp[l+1][r]\n   - 枚举分割点 k：dp[l][r] = min(dp[l][r], dp[l][k-1] + dp[k][r])\n   - 如果 s[l] == s[r]：可以一起删除，dp[l][r] = min(dp[l][r], dp[l+1][r-1] + 1)\n4. 最终答案是 dp[0][n-1]。\n5. 时间复杂度：O(n³)，空间复杂度：O(n²)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "树形 DP",
    minutes: "区域赛",
    goal: "掌握树上的 DP 思维，解决最大独立集、树的直径、树上背包等问题。",
    check: "能写出最大独立集、树的直径、树上背包（选课）的核心代码。",
    intro: "树形 DP 利用树的递归结构，自底向上合并子树信息。状态通常定义在节点上，表示以该节点为根的子树的最优解。",
    topics: [
      "最大独立集",
      "最小顶点覆盖",
      "树的直径",
      "树上背包",
      "DSU on Tree",
      "长链剖分优化",
      "虚树",
    ],
    mustKnow: [
      "最大独立集：dp[u][0] 表示不选 u 的最大值，dp[u][1] 表示选 u 的最大值。",
      "树的直径：维护每个节点向下的最长路径和次长路径，直径 = max(最长 + 次长)。",
      "树上背包的复杂度分析：表面上是 O(nm²)，实际上是 O(nm)。",
    ],
    pitfalls: [
      "树上背包的合并顺序：要倒序遍历容量，避免同一子树的物品被多次选择。",
      "DSU on Tree 要保留大儿子的贡献，避免重复计算。",
      "换根 DP 要处理好从父亲传给儿子的贡献如何删旧加新。",
    ],
    steps: [
      "树形 DP 是在树结构上进行的动态规划，核心思想是利用树的递归结构，自底向上合并子树信息。状态通常定义在节点上，表示以该节点为根的子树的最优解。",
      "具体来说，以最大独立集为例：dp[u][0] 表示不选节点 u 时子树的最大权值和，dp[u][1] 表示选节点 u 时的最大权值和。对于每个子节点 v，如果不选 u 则 v 可选可不选，如果选 u 则 v 不能选。",
      "举个例子：一棵树，节点权值 [5, 3, 4, 2, 1]。根节点权值 5，选根节点则子节点不能选（不选权值 5），不选根节点则子节点可选可不选（取最大值）。自底向上递推到根节点。",
      "在实际使用中，树上背包的合并顺序要倒序遍历容量，避免同一子树的物品被多次选择。DSU on Tree 要保留大儿子的贡献，避免重复计算。树的直径可以通过维护每个节点的最长和次长路径来求。",
      "适用场景：当你遇到「在树上选点/选边使得满足某些约束并最优化目标」「求树的直径」或「树上依赖背包」等问题时，应该想到用树形 DP。关键是定义好状态和利用 DFS 递推。"
    ],
    code: `// 树的最大独立集
void dfs(int u, int parent) {
    dp[u][0] = 0;
    dp[u][1] = val[u];
    for (int v : tree[u]) {
        if (v == parent) continue;
        dfs(v, u);
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}`,
    examples: [
      {
        title: "洛谷 P1352 没有上司的舞会",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1352",
        description: "某大学有 n 个职员，编号为 1~n。他们之间有从属关系，也就是说他们的关系就像一棵以校长为根的树，父结点就是子结点的直接上司。现在有一个舞会，要求没有职员和自己的直接上司同时参加。每个职员有一个快乐指数，问如何选择参加舞会的职员，使得快乐指数之和最大。",
        solution: "经典的树形 DP 问题。dp[u][0] 表示不选 u 的最大快乐指数，dp[u][1] 表示选 u 的最大快乐指数。",
        code: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> tree;
vector<int> happiness;
vector<vector<int>> dp;

void dfs(int u, int parent) {
    dp[u][0] = 0;           // 不选 u
    dp[u][1] = happiness[u]; // 选 u

    for (int v : tree[u]) {
        if (v == parent) continue;
        dfs(v, u);
        dp[u][0] += max(dp[v][0], dp[v][1]); // 不选 u，子节点可选可不选
        dp[u][1] += dp[v][0];                // 选 u，子节点不能选
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    happiness.resize(n + 1);
    for (int i = 1; i <= n; i++) cin >> happiness[i];

    tree.resize(n + 1);
    vector<bool> has_parent(n + 1, false);

    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        tree[v].push_back(u); // v 的上司是 u
        has_parent[u] = true;
    }

    // 找根节点（校长）
    int root = 1;
    for (int i = 1; i <= n; i++) {
        if (!has_parent[i]) {
            root = i;
            break;
        }
    }

    dp.resize(n + 1, vector<int>(2, 0));
    dfs(root, -1);

    cout << max(dp[root][0], dp[root][1]) << endl;

    return 0;
}`,
        explanation: "1. 建树：根据输入的从属关系建树，注意方向是「子节点 -> 父节点」。\n2. 找根节点：没有父节点的节点就是根节点（校长）。\n3. DFS 遍历：自底向上计算 dp 值。\n4. 状态转移：\n   - dp[u][0] += max(dp[v][0], dp[v][1])：不选 u 时，子节点可选可不选\n   - dp[u][1] += dp[v][0]：选 u 时，子节点不能选\n5. 答案：max(dp[root][0], dp[root][1])\n6. 时间复杂度：O(n)，空间复杂度：O(n)。"
      },
      {
        title: "AT ABC 222F - Expensive Expense",
        source: "AtCoder",
        link: "https://atcoder.jp/contests/abc222/tasks/abc222_f",
        description: "给定一棵 n 个节点的树，每条边有边权。对于每个节点 i，定义 f(i) 为从 i 出发的最长路径长度。求所有 f(i) 的和。",
        solution: "换根 DP。先以任意节点为根，计算每个节点向下的最长路径。然后换根，用父亲信息更新儿子。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

vector<vector<pair<int, int>>> tree;
vector<ll> down;  // 向下的最长路径
vector<ll> ans;

void dfs1(int u, int parent) {
    down[u] = 0;
    for (auto [v, w] : tree[u]) {
        if (v == parent) continue;
        dfs1(v, u);
        down[u] = max(down[u], down[v] + w);
    }
}

void dfs2(int u, int parent, ll up) {
    // 计算答案
    ans[u] = max(down[u], up);

    // 收集所有子树的最长路径
    vector<pair<ll, int>> children;
    for (auto [v, w] : tree[u]) {
        if (v == parent) continue;
        children.push_back({down[v] + w, v});
    }
    sort(children.rbegin(), children.rend());

    // 换根
    for (auto [v, w] : tree[u]) {
        if (v == parent) continue;
        // 计算新的 up 值
        ll new_up = up + w;
        if (children.size() > 0 && children[0].second == v) {
            if (children.size() > 1) {
                new_up = max(new_up, children[1].first + w);
            }
        } else if (children.size() > 0) {
            new_up = max(new_up, children[0].first + w);
        }
        dfs2(v, u, new_up);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    tree.resize(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        tree[u].push_back({v, w});
        tree[v].push_back({u, w});
    }

    down.resize(n + 1);
    ans.resize(n + 1);

    // 第一遍 DFS：计算向下的最长路径
    dfs1(1, -1);

    // 第二遍 DFS：换根
    dfs2(1, -1, 0);

    // 输出答案
    for (int i = 1; i <= n; i++) {
        cout << ans[i] << endl;
    }

    return 0;
}`,
        explanation: "1. 第一遍 DFS（dfs1）：计算每个节点向下的最长路径 down[u]。\n2. 第二遍 DFS（dfs2）：换根，用父亲信息更新儿子。\n3. 对于节点 u，收集所有子树的最长路径，排序。\n4. 对于子节点 v，新的 up 值 = max(up + w, 其他子树的最长路径 + w)。\n5. 答案 ans[u] = max(down[u], up)。\n6. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "换根 DP",
    minutes: "区域赛",
    goal: "掌握两遍扫描的换根技巧，解决树的中心、距离和等问题。",
    check: "能写出树的中心、每个节点到其他节点距离之和的换根 DP 代码。",
    intro: "换根 DP 通过两次 DFS 解决「以每个节点为根时的最优解」问题。第一次 DFS 求子树信息，第二次 DFS 用父亲信息更新儿子。",
    topics: [
      "树的中心",
      "距离和问题",
      "信息继承与修正",
      "前后缀聚合",
      "不可逆运算处理",
    ],
    mustKnow: [
      "两遍扫描模型：第一遍自底向上求子树贡献，第二遍自顶向下传递父亲贡献。",
      "转移的本质是「逆元」思想：从父亲的总贡献中减去当前子树的贡献。",
      "处理不可逆运算：维护前缀和后缀的聚合信息。",
    ],
    pitfalls: [
      "第二遍 DFS 时要先更新当前节点，再递归儿子。",
      "减去子树贡献时要确保不会出现负数或错误值。",
      "根节点的特殊处理：没有父亲贡献，需要单独初始化。",
    ],
    steps: [
      "换根 DP 是一种解决「以每个节点为根时的最优解」的技巧，核心思想是通过两次 DFS：第一次自底向上求子树信息，第二次自顶向下用父亲信息更新儿子，从而在 O(n) 时间内得到所有节点的答案。",
      "具体来说，第一次 DFS（dfs1）计算以任意节点（如节点 1）为根时每个子树的大小和贡献。第二次 DFS（dfs2）将根从父亲换到儿子，用公式 dp[v] = dp[u] - sz[v] + (n - sz[v]) 更新儿子的答案。",
      "举个例子：求每个节点到其他所有节点的距离之和。第一次 DFS 计算以节点 1 为根时的距离和。第二次 DFS 换根时，如果将根从 u 换到 v，v 的子树中的节点距离减 1，其他节点距离加 1。",
      "在实际使用中，第二遍 DFS 时要先更新当前节点，再递归儿子。减去子树贡献时要确保不会出现负数或错误值。根节点没有父亲贡献，需要单独初始化。",
      "适用场景：当你遇到「求以每个节点为根时的最优解」「求树的中心」或「每个节点到其他节点的距离之和」等问题时，应该想到用换根 DP。关键是掌握两遍扫描的公式推导。"
    ],
    code: `// 换根 DP：求每个节点到其他节点的距离之和
void dfs1(int u, int parent) {
    sz[u] = 1;
    dp[u] = 0;
    for (int v : tree[u]) {
        if (v == parent) continue;
        depth[v] = depth[u] + 1;
        dfs1(v, u);
        sz[u] += sz[v];
        dp[u] += dp[v] + sz[v];
    }
}

void dfs2(int u, int parent) {
    for (int v : tree[u]) {
        if (v == parent) continue;
        dp[v] = dp[u] - sz[v] + (n - sz[v]);
        dfs2(v, u);
    }
}`,
    examples: [
      {
        title: "洛谷 P3478 [POI2008] STA-Station",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3478",
        description: "给定一棵 n 个节点的树，求以哪个节点为根时，所有节点的深度之和最大。",
        solution: "换根 DP。先以任意节点为根，计算深度之和。然后换根，用父亲信息更新儿子。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

vector<vector<int>> tree;
vector<int> sz;
vector<ll> depth_sum;
int n;

void dfs1(int u, int parent) {
    sz[u] = 1;
    depth_sum[u] = 0;
    for (int v : tree[u]) {
        if (v == parent) continue;
        dfs1(v, u);
        sz[u] += sz[v];
        depth_sum[u] += depth_sum[v] + sz[v];
    }
}

void dfs2(int u, int parent) {
    for (int v : tree[u]) {
        if (v == parent) continue;
        // 换根公式：dp[v] = dp[u] - sz[v] + (n - sz[v])
        depth_sum[v] = depth_sum[u] - sz[v] + (n - sz[v]);
        dfs2(v, u);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> n;
    tree.resize(n + 1);
    sz.resize(n + 1);
    depth_sum.resize(n + 1);

    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }

    // 第一遍 DFS：以节点 1 为根
    dfs1(1, -1);

    // 第二遍 DFS：换根
    dfs2(1, -1);

    // 找深度之和最大的节点
    int ans = 1;
    for (int i = 2; i <= n; i++) {
        if (depth_sum[i] > depth_sum[ans]) {
            ans = i;
        }
    }

    cout << ans << endl;
    return 0;
}`,
        explanation: "1. 第一遍 DFS（dfs1）：以节点 1 为根，计算每个子树的大小 sz[u] 和以 u 为根的子树的深度之和 depth_sum[u]。\n2. 第二遍 DFS（dfs2）：换根，用父亲信息更新儿子。\n3. 换根公式：depth_sum[v] = depth_sum[u] - sz[v] + (n - sz[v])。\n   - depth_sum[u] - sz[v]：除去子树 v 的贡献\n   - n - sz[v]：其他所有节点的深度加 1\n4. 最终答案是 depth_sum 最大的节点。\n5. 时间复杂度：O(n)，空间复杂度：O(n)。"
      },
      {
        title: "CF 1187E - Tree Painting",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/1187/E",
        description: "给定一棵 n 个节点的树，初始所有节点为白色。选择一个节点作为根，然后从根开始 DFS，每访问一个节点就将其染成蓝色。每次染色的代价是以当前节点为根的子树中白色节点的数量。问最大总代价。",
        solution: "换根 DP。先以任意节点为根，计算总代价。然后换根，用父亲信息更新儿子。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

vector<vector<int>> tree;
vector<int> sz;
vector<ll> dp;
int n;

void dfs1(int u, int parent) {
    sz[u] = 1;
    dp[u] = 1;  // 根节点代价为 1
    for (int v : tree[u]) {
        if (v == parent) continue;
        dfs1(v, u);
        sz[u] += sz[v];
        dp[u] += dp[v];  // 累加子树贡献
    }
}

void dfs2(int u, int parent) {
    for (int v : tree[u]) {
        if (v == parent) continue;
        // 换根公式
        // dp[v] = dp[u] - sz[v] + (n - sz[v])
        // 但是这里 dp[u] 已经包含了所有子树的贡献
        // 所以需要先减去 v 的贡献，再加上其他部分的贡献
        ll old_v = dp[v];
        dp[v] = dp[u] - sz[v] + (n - sz[v]);
        dfs2(v, u);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> n;
    tree.resize(n + 1);
    sz.resize(n + 1);
    dp.resize(n + 1);

    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }

    // 第一遍 DFS：以节点 1 为根
    dfs1(1, -1);

    // 第二遍 DFS：换根
    dfs2(1, -1);

    // 找最大代价
    ll ans = 0;
    for (int i = 1; i <= n; i++) {
        ans = max(ans, dp[i]);
    }

    cout << ans << endl;
    return 0;
}`,
        explanation: "1. 第一遍 DFS（dfs1）：以节点 1 为根，计算 dp[u] 表示以 u 为根时的总代价。\n2. dp[u] = 1 + Σ dp[v]，其中 1 是根节点的代价。\n3. 第二遍 DFS（dfs2）：换根，用父亲信息更新儿子。\n4. 换根公式：dp[v] = dp[u] - sz[v] + (n - sz[v])。\n5. 最终答案是 dp 的最大值。\n6. 时间复杂度：O(n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "状压 DP",
    minutes: "区域赛",
    goal: "掌握用二进制表示集合状态的 DP 技巧，解决 TSP、棋盘覆盖等问题。",
    check: "能写出 TSP 的 O(n²2ⁿ) 解法、棋盘铺砖的轮廓线 DP。",
    intro: "状压 DP 用二进制数表示集合状态，将集合操作转化为位运算。适用于 n ≤ 20 的小规模问题，状态数为 2ⁿ。",
    topics: [
      "旅行商问题 TSP",
      "哈密顿路径",
      "棋盘铺砖",
      "轮廓线 DP",
      "集合划分",
      "SOS DP",
      "子集遍历技巧",
    ],
    mustKnow: [
      "位运算基础：&（与）、|（或）、^（异或）、~（取反）、<<（左移）、>>（右移）。",
      "子集遍历：for (int s = mask; s; s = (s - 1) & mask) 可以遍历 mask 的所有子集。",
      "TSP 状态设计：dp[mask][i] 表示已经访问过的城市集合为 mask，当前在城市 i 的最短路径。",
    ],
    pitfalls: [
      "状态数量要提前估算：n=20 时 2²⁰ ≈ 10⁶，n=25 时 2²⁵ ≈ 3×10⁷，可能超时。",
      "位运算优先级低，要多加括号：(1 << i) & mask 而不是 1 << i & mask。",
      "轮廓线 DP 的状态要区分「当前位置」和「轮廓线状态」。",
    ],
    steps: [
      "状压 DP（状态压缩动态规划）是用二进制数表示集合状态的 DP 技巧，核心思想是将集合的操作（加入、删除、判断成员）转化为位运算，从而在小规模（n ≤ 20）问题上实现高效的集合 DP。",
      "具体来说，TSP（旅行商问题）的状压 DP 思路是：dp[mask][i] 表示已经访问过的城市集合为 mask，当前在城市 i 的最短路径。状态转移是枚举下一个未访问的城市 v，更新 dp[mask|(1<<v)][v]。",
      "举个例子：3 个城市，距离矩阵为 [[0,1,2],[1,0,3],[2,3,0]]。dp[1][0]=0 表示从城市 0 出发。dp[3][1]=1 表示访问了城市 0 和 1，当前在城市 1。dp[7][2] 表示访问了所有城市，在城市 2。",
      "在实际使用中，状态数量要提前估算：n=20 时 2²⁰ ≈ 10⁶，n=25 时 2²⁵ ≈ 3×10⁷，可能超时。位运算优先级低，要多加括号。子集遍历技巧：for (int s = mask; s; s = (s-1) & mask) 可以遍历 mask 的所有子集。",
      "适用场景：当你遇到「小规模集合上的最优排列/选择」「棋盘覆盖」或「旅行商问题」等问题时，应该想到用状压 DP。关键条件是 n ≤ 20 左右，状态数 2^n 可接受。"
    ],
    code: `// TSP 状态压缩 DP
long long tsp(vector<vector<int>>& dist) {
    int n = dist.size();
    vector<vector<long long>> dp(1 << n, vector<long long>(n, LLONG_MAX));
    dp[1][0] = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            if (dp[mask][u] == LLONG_MAX) continue;
            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                dp[mask | (1 << v)][v] = min(dp[mask | (1 << v)][v], dp[mask][u] + dist[u][v]);
            }
        }
    }
    long long ans = LLONG_MAX;
    for (int i = 0; i < n; i++) ans = min(ans, dp[(1 << n) - 1][i] + dist[i][0]);
    return ans;
}`,
    examples: [
      {
        title: "洛谷 P1433 吃奶酪",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1433",
        description: "房间里有 n 块奶酪，给出每块奶酪的坐标。一只老鼠从 (0,0) 出发，要吃掉所有奶酪。问最少需要走多少距离。",
        solution: "经典的 TSP 问题。用状压 DP，dp[mask][i] 表示已经吃过的奶酪集合为 mask，当前在奶酪 i 的最短距离。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<double> x(n), y(n);
    for (int i = 0; i < n; i++) {
        cin >> x[i] >> y[i];
    }

    // 预处理距离
    vector<vector<double>> dist(n, vector<double>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            dist[i][j] = sqrt((x[i] - x[j]) * (x[i] - x[j]) + (y[i] - y[j]) * (y[i] - y[j]));
        }
    }

    // dp[mask][i] 表示已经吃过的奶酪集合为 mask，当前在奶酪 i 的最短距离
    vector<vector<double>> dp(1 << n, vector<double>(n, 1e18));

    // 初始化：从 (0,0) 到每个奶酪
    for (int i = 0; i < n; i++) {
        dp[1 << i][i] = sqrt(x[i] * x[i] + y[i] * y[i]);
    }

    // 状态转移
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask & (1 << u))) continue;
            if (dp[mask][u] > 1e17) continue;
            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                dp[mask | (1 << v)][v] = min(dp[mask | (1 << v)][v], dp[mask][u] + dist[u][v]);
            }
        }
    }

    // 答案：吃掉所有奶酪的最短距离
    double ans = 1e18;
    for (int i = 0; i < n; i++) {
        ans = min(ans, dp[(1 << n) - 1][i]);
    }

    cout << fixed << setprecision(2) << ans << endl;

    return 0;
}`,
        explanation: "1. 预处理距离：计算每对奶酪之间的欧几里得距离。\n2. 状态定义：dp[mask][i] 表示已经吃过的奶酪集合为 mask，当前在奶酪 i 的最短距离。\n3. 初始化：从 (0,0) 到每个奶酪的距离。\n4. 状态转移：枚举下一个要吃的奶酪 v，dp[mask|1<<v][v] = min(dp[mask|1<<v][v], dp[mask][u] + dist[u][v])。\n5. 答案：dp[(1<<n)-1][i] 的最小值。\n6. 时间复杂度：O(n²2ⁿ)，空间复杂度：O(n2ⁿ)。"
      },
      {
        title: "CF 1097C - Yuhao and a Parenthesis",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/1097/C",
        description: "给定 n 个括号序列，问最多能选出多少个序列，使得它们按某种顺序连接后形成一个合法的括号序列。",
        solution: "将括号序列分类：左括号多的、右括号多的、刚好匹配的。用贪心配对左右括号多的序列。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    map<int, int> cnt;  // 记录每种类型的序列数量
    int ans = 0;

    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;

        int balance = 0;  // 括号平衡度
        int min_balance = 0;  // 最小平衡度

        for (char c : s) {
            if (c == '(') balance++;
            else balance--;
            min_balance = min(min_balance, balance);
        }

        // 如果序列本身是合法的，且平衡度为 0
        if (balance == 0 && min_balance >= 0) {
            ans++;
            continue;
        }

        // 如果序列的前缀都是合法的（最小平衡度 >= 0），且平衡度 > 0
        if (min_balance >= 0 && balance > 0) {
            cnt[balance]++;
            continue;
        }

        // 如果序列的后缀都是合法的（反转后最小平衡度 >= 0），且平衡度 < 0
        reverse(s.begin(), s.end());
        balance = 0;
        min_balance = 0;
        for (char c : s) {
            if (c == ')') balance++;
            else balance--;
            min_balance = min(min_balance, balance);
        }
        if (min_balance >= 0 && balance > 0) {
            cnt[-balance]++;
        }
    }

    // 配对左右括号多的序列
    for (auto [k, v] : cnt) {
        if (k > 0) {
            ans += min(v, cnt[-k]);
        }
    }

    cout << ans << endl;

    return 0;
}`,
        explanation: "1. 将括号序列分类：\n   - 平衡度为 0 且前缀都合法：可以单独使用\n   - 平衡度 > 0 且前缀都合法：需要配对右括号多的序列\n   - 平衡度 < 0 且后缀都合法：需要配对左括号多的序列\n2. 用 map 记录每种类型的序列数量。\n3. 配对：对于每个 k > 0，配对 min(cnt[k], cnt[-k]) 对。\n4. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "数位 DP",
    minutes: "区域赛",
    goal: "掌握在数字的字典树上游走的 DP 技巧，解决数字计数、限制相邻数位等问题。",
    check: "能写出统计 [L, R] 内满足条件的数字个数的数位 DP 模板。",
    intro: "数位 DP 从高位到低位枚举数字，用 limit 表示是否贴着上界，用状态记录约束信息。本质是在数字的 Trie 树上做受限路径计数。",
    topics: [
      "数字计数",
      "windy 数",
      "限制相邻数位",
      "余数与同余",
      "求和问题",
      "第 k 小/大数",
      "与 KMP/AC 自动机结合",
    ],
    mustKnow: [
      "通用状态模板：dfs(pos, state, limit, lead) 表示当前处理到第 pos 位，状态为 state，是否贴着上界，是否有前导零。",
      "limit 标记的传递：当前位贴着上界时，下一位的上限是 digits[pos]；否则是 9。",
      "lead 标记的处理：前导零不影响数值，但可能影响状态（如是否是回文）。",
    ],
    pitfalls: [
      "lim 标记的传递：如果当前 limit=1 且选择了 digits[pos]，下一位的 limit 才为 1。",
      "记忆化的时机：只有 limit=0 且 lead=0 时才能记忆化，否则状态不等价。",
      "区间 [L, R] 的处理：通常用 f(R) - f(L-1) 转化为前缀问题。",
    ],
    steps: [
      "数位 DP 是一种在数字的字典树（Trie）上进行动态规划的技术，它的核心思想是从高位到低位逐位枚举，同时用状态记录约束信息和是否受到上界的限制。",
      "具体来说，第一步将区间 [L, R] 问题转化为前缀问题 f(R) - f(L-1)；第二步定义 dfs(pos, state, limit, lead) 函数，其中 pos 是当前位、state 是约束状态、limit 表示是否贴着上界、lead 表示是否有前导零；第三步从高位向低位递推，枚举每一位可以填的数字并转移状态。",
      "举个例子：统计 [1, n] 中不含数字 4 的数的个数。我们从最高位开始，如果当前位贴着上界则只能填到 digits[pos]，否则可以填 0 到 9 但跳过 4，递归处理下一位即可。",
      "在实际使用中，需要注意只有 limit=0 且 lead=0 时才能记忆化，否则不同路径的状态并不等价。另外前导零不影响数值但可能影响某些状态（如是否是回文），需要单独处理。",
      "适用场景：当你遇到需要统计满足某种数字性质的数的个数、求第 k 小满足条件的数、或者数字求和等问题时，应该想到用数位 DP。"
    ],
    code: `// 数位 DP 模板：统计 [0, n] 中不含数字 4 的数的个数
int digits[20];
long long dp[20][2];

long long dfs(int pos, bool limit, bool lead) {
    if (pos == 0) return 1;
    if (!limit && !lead && dp[pos][0] != -1) return dp[pos][0];

    int up = limit ? digits[pos] : 9;
    long long res = 0;
    for (int i = 0; i <= up; i++) {
        if (i == 4) continue;
        res += dfs(pos - 1, limit && i == up, lead && i == 0);
    }

    if (!limit && !lead) dp[pos][0] = res;
    return res;
}`,
    examples: [
      {
        title: "洛谷 P2657 [SCOI2009] windy 数",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P2657",
        description: "不含前导零且相邻两个数字之差至少为 2 的正整数被称为 windy 数。问区间 [a, b] 中有多少个 windy 数。",
        solution: "经典的数位 DP 问题。状态包括当前位置、上一位数字、是否贴着上界、是否有前导零。",
        code: `#include <bits/stdc++.h>
using namespace std;

int digits[15];
long long dp[15][10][2][2];  // pos, last, limit, lead

long long dfs(int pos, int last, bool limit, bool lead) {
    if (pos == 0) return 1;
    if (dp[pos][last][limit][lead] != -1) return dp[pos][last][limit][lead];

    int up = limit ? digits[pos] : 9;
    long long res = 0;

    for (int i = 0; i <= up; i++) {
        // 前导零：可以选任何数字
        if (lead) {
            if (i == 0) {
                res += dfs(pos - 1, 0, limit && i == up, true);
            } else {
                res += dfs(pos - 1, i, limit && i == up, false);
            }
        } else {
            // 非前导零：相邻数字之差至少为 2
            if (abs(i - last) >= 2) {
                res += dfs(pos - 1, i, limit && i == up, false);
            }
        }
    }

    if (!limit) dp[pos][last][limit][lead] = res;
    return res;
}

long long solve(long long n) {
    if (n <= 0) return 0;
    int len = 0;
    while (n > 0) {
        digits[++len] = n % 10;
        n /= 10;
    }
    memset(dp, -1, sizeof(dp));
    return dfs(len, 0, true, true);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    long long a, b;
    cin >> a >> b;

    cout << solve(b) - solve(a - 1) << endl;

    return 0;
}`,
        explanation: "1. 状态定义：dp[pos][last][limit][lead] 表示当前处理到第 pos 位，上一位是 last，是否贴着上界，是否有前导零。\n2. 状态转移：枚举当前位可以填的数字 i。\n3. 如果有前导零，可以选任何数字。\n4. 如果没有前导零，需要满足 |i - last| >= 2。\n5. 区间 [a, b] 的答案 = solve(b) - solve(a-1)。\n6. 时间复杂度：O(位数 × 10 × 2 × 2 × 10)，空间复杂度：O(位数 × 10 × 2 × 2)。"
      },
      {
        title: "CF 55D - Beautiful numbers",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/55/D",
        description: "一个数被称为「美丽的」，当且仅当它能被它每一位上的非零数字整除。问区间 [1, n] 中有多少个美丽的数。",
        solution: "数位 DP。状态包括当前位置、当前数模 LCM(1,2,...,9) 的值、是否贴着上界。因为 LCM(1,2,...,9) = 2520，所以模 2520 即可。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int digits[20];
ll dp[20][2520][50];  // pos, mod, lcm_index
int lcm_index[2520];  // 将 LCM 值映射到索引
int idx = 0;

int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int lcm(int a, int b) {
    return a / gcd(a, b) * b;
}

void init() {
    memset(lcm_index, -1, sizeof(lcm_index));
    idx = 0;
    for (int i = 1; i < 2520; i++) {
        if (2520 % i == 0) {
            lcm_index[i] = idx++;
        }
    }
}

ll dfs(int pos, int mod, int lcm_idx, bool limit) {
    if (pos == 0) {
        // 检查是否能被 LCM 整除
        int l = 1;
        for (int i = 1; i <= 9; i++) {
            if (lcm_idx & (1 << (i - 1))) {
                l = lcm(l, i);
            }
        }
        return mod % l == 0 ? 1 : 0;
    }

    if (!limit && dp[pos][mod][lcm_idx] != -1) return dp[pos][mod][lcm_idx];

    int up = limit ? digits[pos] : 9;
    ll res = 0;

    for (int i = 0; i <= up; i++) {
        int new_mod = (mod * 10 + i) % 2520;
        int new_lcm_idx = lcm_idx;
        if (i > 0) {
            new_lcm_idx |= (1 << (i - 1));
        }
        res += dfs(pos - 1, new_mod, new_lcm_idx, limit && i == up);
    }

    if (!limit) dp[pos][mod][lcm_idx] = res;
    return res;
}

ll solve(ll n) {
    if (n <= 0) return 0;
    int len = 0;
    while (n > 0) {
        digits[++len] = n % 10;
        n /= 10;
    }
    return dfs(len, 0, 0, true);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    init();
    memset(dp, -1, sizeof(dp));

    int t;
    cin >> t;
    while (t--) {
        ll l, r;
        cin >> l >> r;
        cout << solve(r) - solve(l - 1) << endl;
    }

    return 0;
}`,
        explanation: "1. 关键观察：LCM(1,2,...,9) = 2520，所以只需要记录当前数模 2520 的值。\n2. 状态定义：dp[pos][mod][lcm_idx] 表示当前处理到第 pos 位，当前数模 2520 为 mod，已经出现的数字的 LCM 索引为 lcm_idx。\n3. 用位运算记录已经出现的数字：lcm_idx 的第 i 位为 1 表示数字 i+1 已经出现。\n4. 在 dfs 终止时，计算实际的 LCM 值，检查是否能整除。\n5. 时间复杂度：O(位数 × 2520 × 512 × 10)，空间复杂度：O(位数 × 2520 × 512)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "概率与期望 DP",
    minutes: "区域赛",
    goal: "掌握处理不确定性问题的 DP 技巧，解决概率流、期望计算等问题。",
    check: "能写出概率 DP 的状态转移方程，理解期望的线性性质，会用高斯消元解循环依赖。",
    intro: "概率 DP 用于计算事件发生的概率，期望 DP 用于计算随机变量的期望值。关键是要理解期望的线性性质：E(aX + bY) = aE(X) + bE(Y)。",
    topics: [
      "概率与期望基础",
      "期望的线性性质",
      "DAG 上的概率 DP",
      "循环依赖与高斯消元",
      "状态压缩与概率 DP",
      "序列上的概率期望 DP",
    ],
    mustKnow: [
      "期望的线性性质：无论随机变量是否独立，E(X+Y) = E(X) + E(Y) 都成立。",
      "DAG 上的概率 DP：状态转移无环，可以直接递推。",
      "循环依赖：如果转移方程中出现 dp[i] = ... + p * dp[i] + ...，需要解线性方程组。",
    ],
    pitfalls: [
      "概率和期望的区别：概率是事件发生的可能性，期望是随机变量的平均值。",
      "转移方程中的自环：dp[i] = p * dp[i] + ... 时，要移项得到 dp[i] = ... / (1 - p)。",
      "精度问题：浮点数计算可能有误差，重要场合要用分数或高精度。",
    ],
    steps: [
      "概率 DP 用于计算事件发生的概率，期望 DP 用于计算随机变量的期望值，它的核心思想是利用期望的线性性质和条件概率公式将复杂问题分解为子问题。",
      "具体来说，第一步明确状态定义（如 dp[i] 表示处于状态 i 时的期望步数或概率）；第二步根据随机过程列出转移方程，注意区分概率和期望；第三步如果出现 dp[i] = ... + p * dp[i] + ... 的循环依赖，需要移项消去自环或用高斯消元求解。",
      "举个例子：掷一个均匀骰子，直到累计点数之和大于等于 n，求期望掷多少次。令 dp[i] 表示当前累计为 i 时还需的期望次数，则 dp[i] = 1 + (1/6) * Σ dp[i+j]，从后往前递推即可。",
      "在实际使用中，需要注意浮点数精度问题，重要场合可以使用分数或高精度运算。另外要分清概率和期望的区别，概率是事件发生的可能性，期望是随机变量的加权平均值。",
      "适用场景：当你遇到博弈问题中求胜率、随机过程中求期望步数、赠券收集问题、随机游走等问题时，应该想到用概率与期望 DP。"
    ],
    code: `// 期望 DP 示例：掷骰子直到总和 >= n 的期望次数
double expectedRolls(int n) {
    vector<double> dp(n + 6, 0);
    for (int i = n - 1; i >= 0; i--) {
        dp[i] = 1;
        for (int j = 1; j <= 6; j++) {
            dp[i] += dp[i + j] / 6.0;
        }
    }
    return dp[0];
}`,
    examples: [
      {
        title: "洛谷 P1291 [SHOI2002] 百事世界杯之旅",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1291",
        description: "一个袋子里有 n 种颜色的球，每次随机取一个球，取到每种颜色的概率相同。问取到所有颜色的球的期望次数。",
        solution: "经典的赠券收集问题。设 dp[i] 表示已经收集到 i 种颜色，还需要的期望次数。dp[i] = (i/n) × dp[i] + ((n-i)/n) × dp[i+1] + 1。",
        code: `#include <bits/stdc++.h>
using namespace std;

// 分数结构体
struct Fraction {
    long long num, den;
    Fraction(long long n = 0, long long d = 1) : num(n), den(d) {
        simplify();
    }
    void simplify() {
        long long g = __gcd(abs(num), abs(den));
        num /= g;
        den /= g;
        if (den < 0) {
            num = -num;
            den = -den;
        }
    }
    Fraction operator+(const Fraction& other) const {
        return Fraction(num * other.den + other.num * den, den * other.den);
    }
    Fraction operator-(const Fraction& other) const {
        return Fraction(num * other.den - other.num * den, den * other.den);
    }
    Fraction operator*(const Fraction& other) const {
        return Fraction(num * other.num, den * other.den);
    }
    Fraction operator/(const Fraction& other) const {
        return Fraction(num * other.den, den * other.num);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    // dp[i] 表示已经收集到 i 种颜色，还需要的期望次数
    vector<Fraction> dp(n + 1, Fraction(0));
    dp[n] = Fraction(0);  // 已经收集完所有颜色

    for (int i = n - 1; i >= 0; i--) {
        // dp[i] = (i/n) * dp[i] + ((n-i)/n) * dp[i+1] + 1
        // dp[i] * (1 - i/n) = ((n-i)/n) * dp[i+1] + 1
        // dp[i] = dp[i+1] + n/(n-i)
        dp[i] = dp[i + 1] + Fraction(n, n - i);
    }

    // 输出结果
    Fraction ans = dp[0];
    if (ans.den == 1) {
        cout << ans.num << endl;
    } else {
        long long integer = ans.num / ans.den;
        long long remain = ans.num % ans.den;
        if (integer > 0) {
            cout << integer << endl;
            // 输出分数部分
            // 这里简化处理，实际需要更复杂的格式化
        }
        cout << remain << "/" << ans.den << endl;
    }

    return 0;
}`,
        explanation: "1. 状态定义：dp[i] 表示已经收集到 i 种颜色，还需要的期望次数。\n2. 状态转移：dp[i] = (i/n) × dp[i] + ((n-i)/n) × dp[i+1] + 1。\n3. 移项：dp[i] = dp[i+1] + n/(n-i)。\n4. 从后往前递推，dp[n] = 0。\n5. 最终答案是 dp[0]。\n6. 时间复杂度：O(n)，空间复杂度：O(n)。"
      },
      {
        title: "CF 148D - Bag of mice",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/148/D",
        description: "袋子里有 w 只白鼠和 b 只黑鼠。公主和龙轮流从袋子里抓一只鼠。公主先手。如果公主抓到白鼠，公主赢。如果龙抓到黑鼠，继续游戏。如果袋子里没有鼠了，龙赢。问公主赢的概率。",
        solution: "概率 DP。dp[i][j] 表示袋子里有 i 只白鼠和 j 只黑鼠时公主赢的概率。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int w, b;
    cin >> w >> b;

    // dp[i][j] 表示袋子里有 i 只白鼠和 j 只黑鼠时公主赢的概率
    vector<vector<double>> dp(w + 1, vector<double>(b + 1, 0.0));

    // 初始化
    for (int i = 1; i <= w; i++) {
        dp[i][0] = 1.0;  // 只有白鼠，公主一定赢
    }

    // 递推
    for (int i = 1; i <= w; i++) {
        for (int j = 1; j <= b; j++) {
            // 公主抓白鼠
            dp[i][j] += (double)i / (i + j);
            // 公主抓黑鼠，龙抓黑鼠（不跳过）
            if (j >= 2) {
                dp[i][j] += (double)j / (i + j) * (double)(j - 1) / (i + j - 1) * (double)i / (i + j - 2) * dp[i - 1][j - 2];
            }
            // 公主抓黑鼠，龙抓白鼠（游戏继续）
            if (j >= 1 && i >= 1) {
                dp[i][j] += (double)j / (i + j) * (double)i / (i + j - 1) * dp[i - 1][j - 1];
            }
        }
    }

    cout << fixed << setprecision(9) << dp[w][b] << endl;

    return 0;
}`,
        explanation: "1. 状态定义：dp[i][j] 表示袋子里有 i 只白鼠和 j 只黑鼠时公主赢的概率。\n2. 状态转移：\n   - 公主抓白鼠：概率 i/(i+j)，公主赢\n   - 公主抓黑鼠，龙抓黑鼠：概率 j/(i+j) × (j-1)/(i+j-1)，游戏继续，但袋子里少了两只黑鼠\n   - 公主抓黑鼠，龙抓白鼠：概率 j/(i+j) × i/(i+j-1)，游戏继续，但袋子里少了一只白鼠和一只黑鼠\n3. 最终答案是 dp[w][b]。\n4. 时间复杂度：O(wb)，空间复杂度：O(wb)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "博弈 DP 与 SG 函数",
    minutes: "区域赛",
    goal: "掌握公平组合游戏的胜负判断，理解 SG 函数和 mex 运算。",
    check: "能写出博弈 DP 的必胜/必败态转移，会计算 SG 函数并用异或判断胜负。",
    intro: "博弈 DP 用于解决公平组合游戏：两个玩家轮流操作，无法操作者输。核心是判断先手必胜还是必败，SG 函数将复杂局面简化为 Nim 堆。",
    topics: [
      "必胜态与必败态",
      "SG 函数",
      "mex 运算",
      "多个子游戏的合并",
      "Nim 游戏",
      "Anti-SG 游戏",
    ],
    mustKnow: [
      "必败态：所有后继都是必胜态。必胜态：存在一个后继是必败态。",
      "SG 函数：sg(x) = mex({sg(y) | y 是 x 的后继})，其中 mex 是最小非负整数不在集合中。",
      "多个独立游戏的 SG 值异或为 0 则先手败，否则先手胜。",
    ],
    pitfalls: [
      "只有公平游戏（双方可选操作相同）才能直接套 SG 函数。",
      "SG 函数的计算要从终止状态开始，终止状态的 SG 值为 0。",
      "异或判断胜负的前提是游戏可以分解为多个独立子游戏。",
    ],
    steps: [
      "博弈 DP 用于解决公平组合游戏（两人轮流操作，无法操作者输）的胜负判断问题，它的核心思想是从终止状态出发，用反向递推确定每个状态是必胜态还是必败态。",
      "具体来说，第一步定义必败态（所有后继都是必胜态）和必胜态（存在一个后继是必败态）；第二步从终止状态开始递推，终止状态的 SG 值为 0；第三步用 sg(x) = mex({sg(y) | y 是 x 的后继}) 计算 SG 函数，多个独立子游戏的 SG 值异或为 0 则先手败。",
      "举个例子：Nim 游戏中有三堆石子，数量分别为 3、5、7。将三堆的 SG 值（即石子数）异或：3 XOR 5 XOR 7 = 1，不为 0，所以先手必胜。先手可以取走适当的石子使异或值变为 0。",
      "在实际使用中，需要注意只有公平游戏（双方可选操作相同）才能直接套 SG 函数，非公平游戏需要其他方法。SG 函数的计算要从终止状态开始，终止状态的 SG 值为 0。",
      "适用场景：当你遇到两人博弈且需要判断先手胜负、游戏可以分解为多个独立子游戏、或者需要计算 Nim 值等问题时，应该想到用博弈 DP 与 SG 函数。"
    ],
    code: `// SG 函数计算示例
int sg(int x, vector<int>& moves, vector<int>& memo) {
    if (memo[x] != -1) return memo[x];
    set<int> s;
    for (int m : moves) {
        if (x - m >= 0) s.insert(sg(x - m, moves, memo));
    }
    int res = 0;
    while (s.count(res)) res++;
    return memo[x] = res;
}`,
    examples: [
      {
        title: "AT ABC 270F - Transportation",
        source: "AtCoder",
        link: "https://atcoder.jp/contests/abc270/tasks/abc270_f",
        description: "有 n 个城市和 m 条道路。每条道路连接两个城市，有一个通行费。还有若干机场，建设费用为 a。问最少花费多少使得所有城市连通。",
        solution: "最小生成树的变种。可以建机场也可以修路，取最小值。用 Kruskal 算法，分别计算建 0, 1, 2, ... 个机场的最小代价。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct DSU {
    vector<int> parent, rank;
    DSU(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false;
        if (rank[x] < rank[y]) swap(x, y);
        parent[y] = x;
        if (rank[x] == rank[y]) rank[x]++;
        return true;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<int> airport_cost(n);
    for (int i = 0; i < n; i++) cin >> airport_cost[i];

    vector<tuple<int, int, int>> edges;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        u--, v--;
        edges.push_back({w, u, v});
    }

    sort(edges.begin(), edges.end());

    // 添加虚拟节点 n，表示机场
    // 建机场相当于连接到虚拟节点
    ll ans = LLONG_MAX;

    // 不建机场
    {
        DSU dsu(n);
        ll cost = 0;
        int cnt = 0;
        for (auto [w, u, v] : edges) {
            if (dsu.unite(u, v)) {
                cost += w;
                cnt++;
            }
        }
        if (cnt == n - 1) ans = min(ans, cost);
    }

    // 建机场
    {
        DSU dsu(n + 1);
        ll cost = 0;
        int cnt = 0;
        // 先建所有机场
        for (int i = 0; i < n; i++) {
            if (dsu.unite(i, n)) {
                cost += airport_cost[i];
                cnt++;
            }
        }
        // 再修路
        for (auto [w, u, v] : edges) {
            if (dsu.unite(u, v)) {
                cost += w;
                cnt++;
            }
        }
        if (cnt == n) ans = min(ans, cost);
    }

    cout << ans << endl;
    return 0;
}`,
        explanation: "1. 将问题转化为最小生成树。\n2. 建机场相当于连接到虚拟节点 n。\n3. 分别计算不建机场和建机场的最小代价。\n4. 不建机场：用 Kruskal 算法，检查是否能形成生成树。\n5. 建机场：先建所有机场（连接到虚拟节点），再修路。\n6. 取两种情况的最小值。\n7. 时间复杂度：O(m log m)，空间复杂度：O(n + m)。"
      },
      {
        title: "CF 1033C - Permutation Game",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/1033/C",
        description: "给定一个排列 p。两人轮流移动一个棋子。棋子初始在位置 i。每次可以将棋子移动到位置 j，满足 j 是 i 的倍数且 p[j] > p[i]。无法移动者输。问对于每个初始位置，谁赢。",
        solution: "博弈 DP。dp[i] 表示棋子在位置 i 时当前玩家是否必胜。如果存在一个合法移动使得对手必败，则当前玩家必胜。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<int> p(n + 1), pos(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> p[i];
        pos[p[i]] = i;
    }

    // dp[i] 表示棋子在位置 i 时当前玩家是否必胜
    vector<int> dp(n + 1, -1);

    // 从大到小处理，因为大的数先确定
    for (int val = n; val >= 1; val--) {
        int i = pos[val];
        bool can_win = false;
        // 枚举 i 的倍数
        for (int j = 2 * i; j <= n; j += i) {
            if (p[j] > p[i] && dp[j] == 0) {
                can_win = true;
                break;
            }
        }
        dp[i] = can_win ? 1 : 0;
    }

    // 输出结果
    for (int i = 1; i <= n; i++) {
        cout << (dp[i] ? 'A' : 'B');
    }
    cout << endl;

    return 0;
}`,
        explanation: "1. 状态定义：dp[i] 表示棋子在位置 i 时当前玩家是否必胜。\n2. 状态转移：如果存在一个合法移动使得对手必败，则当前玩家必胜。\n3. 从大到小处理，因为大的数先确定。\n4. 对于位置 i，枚举 i 的倍数 j，如果 p[j] > p[i] 且 dp[j] = 0，则 dp[i] = 1。\n5. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "DAG 上的动态规划",
    minutes: "提高",
    goal: "掌握在有向无环图上进行 DP 的技巧，解决最长路、路径计数、最小路径覆盖等问题。",
    check: "能写出拓扑排序驱动的 DAG DP，理解记忆化搜索与递推的关系。",
    intro: "DAG 上的 DP 利用拓扑序保证无后效性。状态定义在节点上，转移依赖于前驱节点。可以看作线性 DP 在图上的推广。",
    topics: [
      "DAG 的拓扑序",
      "最长路/最短路",
      "路径计数",
      "最小路径覆盖",
      "DAG 上的概率 DP",
      "隐式 DAG（区间 DP、数位 DP）",
    ],
    mustKnow: [
      "拓扑排序驱动的递推：按拓扑序遍历节点，用前驱节点的信息更新当前节点。",
      "记忆化搜索驱动的递归：从起点开始递归，用 memo 数组避免重复计算。",
      "最小路径覆盖：将问题转化为二分图最大匹配。",
    ],
    pitfalls: [
      "如果图中有环，不能直接用拓扑排序，需要先处理强连通分量。",
      "记忆化搜索要处理好终止状态和不可达状态。",
      "DAG 上的最长路不能用 Dijkstra，因为可能有负权边。",
    ],
    steps: [
      "DAG 上的动态规划是一种在有向无环图上进行状态转移的技术，它的核心思想是利用拓扑序保证无后效性，将线性 DP 推广到图结构上。",
      "具体来说，第一步对图进行拓扑排序，确认图中无环；第二步按拓扑序遍历节点，用前驱节点的信息更新当前节点的 dp 值；第三步也可以用记忆化搜索的方式，从起点递归并在 memo 数组中缓存结果。",
      "举个例子：求 DAG 上从节点 1 到节点 n 的最长路径。按拓扑序遍历，对于每个节点 u，用 dp[v] = max(dp[v], dp[u] + w(u,v)) 更新后继节点 v 的最长距离。",
      "在实际使用中，需要注意如果图中有环则不能直接用拓扑排序，需要先处理强连通分量。记忆化搜索要处理好终止状态和不可达状态。另外 DAG 上的最长路不能用 Dijkstra，因为可能有负权边。",
      "适用场景：当你遇到任务调度与依赖关系、DAG 上的最短路或最长路、路径计数、最小路径覆盖等问题时，应该想到用 DAG 上的动态规划。"
    ],
    code: `// DAG 最长路（拓扑排序）
vector<long long> dagLongestPath(int n, vector<vector<int>>& adj, vector<int>& val) {
    vector<int> indeg(n);
    for (int u = 0; u < n; u++)
        for (int v : adj[u]) indeg[v]++;

    queue<int> q;
    for (int i = 0; i < n; i++) if (indeg[i] == 0) q.push(i);

    vector<long long> dp(n);
    for (int i = 0; i < n; i++) dp[i] = val[i];

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            dp[v] = max(dp[v], dp[u] + val[v]);
            if (--indeg[v] == 0) q.push(v);
        }
    }
    return dp;
}`,
    examples: [
      {
        title: "洛谷 P1347 旅行",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1347",
        description: "给定 n 个城市和 m 条单向道路。每条道路有一个长度。求从城市 1 到城市 n 的最长路径。如果存在环，输出 -1。",
        solution: "拓扑排序 + 最长路。如果拓扑排序后还有节点没有被访问，说明存在环。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<vector<pair<int, int>>> adj(n + 1);
    vector<int> indeg(n + 1, 0);

    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        indeg[v]++;
    }

    // 拓扑排序
    queue<int> q;
    for (int i = 1; i <= n; i++) {
        if (indeg[i] == 0) q.push(i);
    }

    vector<int> topo;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        topo.push_back(u);
        for (auto [v, w] : adj[u]) {
            if (--indeg[v] == 0) q.push(v);
        }
    }

    // 检查是否有环
    if (topo.size() < n) {
        cout << -1 << endl;
        return 0;
    }

    // 最长路
    vector<ll> dp(n + 1, LLONG_MIN);
    dp[1] = 0;

    for (int u : topo) {
        if (dp[u] == LLONG_MIN) continue;
        for (auto [v, w] : adj[u]) {
            dp[v] = max(dp[v], dp[u] + w);
        }
    }

    if (dp[n] == LLONG_MIN) {
        cout << -1 << endl;
    } else {
        cout << dp[n] << endl;
    }

    return 0;
}`,
        explanation: "1. 拓扑排序：按入度为 0 的节点顺序遍历。\n2. 检查是否有环：如果拓扑排序后还有节点没有被访问，说明存在环。\n3. 最长路：按拓扑序遍历节点，更新 dp[v] = max(dp[v], dp[u] + w)。\n4. 时间复杂度：O(n + m)，空间复杂度：O(n + m)。"
      },
      {
        title: "CF 1000F - One Occurrence",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/1000/F",
        description: "给定一个数组和多个查询。每个查询 [l, r] 要求输出区间 [l, r] 中只出现一次的任意一个数。如果没有，输出 0。",
        solution: "离线处理查询。按右端点排序，用线段树维护每个位置的值。对于每个位置 i，记录上一次出现相同值的位置 last[i]。线段树维护 last[i] = 0 的最小位置。",
        code: `#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

struct SegmentTree {
    vector<pair<int, int>> tree;
    int n;

    SegmentTree(int n) : n(n), tree(4 * n, {INF, -1}) {}

    void update(int pos, int val, int node = 1, int start = 1, int end = -1) {
        if (end == -1) end = n;
        if (start == end) {
            tree[node] = {val, start};
            return;
        }
        int mid = (start + end) / 2;
        if (pos <= mid) update(pos, val, 2 * node, start, mid);
        else update(pos, val, 2 * node + 1, mid + 1, end);
        tree[node] = min(tree[2 * node], tree[2 * node + 1]);
    }

    pair<int, int> query(int l, int r, int node = 1, int start = 1, int end = -1) {
        if (end == -1) end = n;
        if (r < start || end < l) return {INF, -1};
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return min(query(l, r, 2 * node, start, mid), query(l, r, 2 * node + 1, mid + 1, end));
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];

    int q;
    cin >> q;

    vector<vector<pair<int, int>>> queries(n + 1);
    for (int i = 0; i < q; i++) {
        int l, r;
        cin >> l >> r;
        queries[r].push_back({l, i});
    }

    // last[i] 表示上一次出现 a[i] 的位置
    vector<int> last(n + 1, 0), prev(n + 1, 0);
    map<int, int> pos;

    for (int i = 1; i <= n; i++) {
        if (pos.count(a[i])) {
            prev[i] = pos[a[i]];
        }
        pos[a[i]] = i;
    }

    SegmentTree seg(n);
    vector<int> ans(q, 0);

    for (int r = 1; r <= n; r++) {
        // 更新 last[r]
        seg.update(r, r);
        if (prev[r] > 0) {
            seg.update(prev[r], INF);
        }

        // 处理以 r 为右端点的查询
        for (auto [l, idx] : queries[r]) {
            auto [val, pos] = seg.query(l, r);
            if (val >= l) {
                ans[idx] = a[pos];
            }
        }
    }

    for (int i = 0; i < q; i++) {
        cout << ans[i] << "\n";
    }

    return 0;
}`,
        explanation: "1. 离线处理查询：按右端点排序。\n2. 对于每个位置 i，记录上一次出现相同值的位置 prev[i]。\n3. 线段树维护：如果位置 i 的值在当前区间 [l, r] 中只出现一次，则 tree[i] = i；否则 tree[i] = INF。\n4. 对于每个右端点 r，更新线段树，然后处理以 r 为右端点的查询。\n5. 时间复杂度：O((n + q) log n)，空间复杂度：O(n + q)。"
      }
    ]
  },
{
    category: "动态规划",
    title: "矩阵优化 DP",
    minutes: "区域赛",
    goal: "掌握用矩阵快速幂加速线性递推的技巧，解决斐波那契数列、路径计数等问题。",
    check: "能将线性递推转化为矩阵乘法，用快速幂在 O(k³ log n) 时间内求解。",
    intro: "矩阵快速幂可以将 O(n) 的线性递推优化到 O(k³ log n)，其中 k 是状态维度。核心是将递推关系表示为矩阵乘法，然后用快速幂加速。",
    topics: [
      "矩阵乘法基础",
      "快速幂算法",
      "构建转移矩阵",
      "斐波那契数列",
      "图上路径计数",
      "带周期性变化的转移",
      "广义矩阵乘法",
    ],
    mustKnow: [
      "矩阵乘法：C[i][j] = Σ A[i][k] * B[k][j]，复杂度 O(k³)。",
      "快速幂：A^n = (A^(n/2))² * (A%2 ? A : I)，复杂度 O(k³ log n)。",
      "构建转移矩阵：将递推式 dp[i] = a*dp[i-1] + b*dp[i-2] + ... 表示为矩阵形式。",
    ],
    pitfalls: [
      "矩阵乘法不满足交换律，要注意乘法顺序。",
      "单位矩阵 I 是矩阵乘法的幺元，A * I = I * A = A。",
      "取模运算要在每次乘法后进行，避免溢出。",
    ],
    steps: [
      "矩阵优化 DP 是一种用矩阵快速幂加速线性递推的技术，它的核心思想是将递推关系表示为矩阵乘法，然后利用快速幂将 O(n) 的递推优化到 O(k³ log n)。",
      "具体来说，第一步将递推式（如 dp[i] = a*dp[i-1] + b*dp[i-2]）转化为矩阵形式 [dp[i], dp[i-1]]^T = M * [dp[i-1], dp[i-2]]^T；第二步构建转移矩阵 M；第三步用快速幂计算 M^(n-1)，乘以初始向量得到答案。",
      "举个例子：斐波那契数列 F(n) = F(n-1) + F(n-2)，转移矩阵为 [[1,1],[1,0]]。计算 M^(n-1) 后，F(n) = M[0][0] * F(1) + M[0][1] * F(0)，复杂度仅为 O(log n)。",
      "在实际使用中，需要注意矩阵乘法不满足交换律，乘法顺序不能搞反。取模运算要在每次矩阵乘法后进行，避免 long long 溢出。另外初始化边界条件要正确，单位矩阵是矩阵乘法的幺元。",
      "适用场景：当你遇到需要计算线性递推的第 n 项（n 非常大）、图上恰好走 k 步的路径计数、或者带周期性变化的转移等问题时，应该想到用矩阵优化 DP。"
    ],
    code: `// 矩阵快速幂
struct Matrix {
    vector<vector<long long>> a;
    int n;
    Matrix(int n) : n(n), a(n, vector<long long>(n, 0)) {}
    static Matrix identity(int n) {
        Matrix I(n);
        for (int i = 0; i < n; i++) I.a[i][i] = 1;
        return I;
    }
    Matrix operator*(const Matrix& other) const {
        Matrix res(n);
        for (int i = 0; i < n; i++)
            for (int k = 0; k < n; k++)
                for (int j = 0; j < n; j++)
                    res.a[i][j] = (res.a[i][j] + a[i][k] * other.a[k][j]) % MOD;
        return res;
    }
};

Matrix matrixPow(Matrix base, long long exp) {
    Matrix result = Matrix::identity(base.n);
    while (exp > 0) {
        if (exp & 1) result = result * base;
        base = base * base;
        exp >>= 1;
    }
    return result;
}`,
    examples: [
      {
        title: "洛谷 P1962 斐波那契数列",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1962",
        description: "求斐波那契数列的第 n 项，对 10^9 + 7 取模。n 可能很大（10^18 级别）。",
        solution: "矩阵快速幂。将递推关系表示为矩阵乘法，然后用快速幂加速。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const int MOD = 1e9 + 7;

struct Matrix {
    vector<vector<ll>> a;
    int n;
    Matrix(int n) : n(n), a(n, vector<ll>(n, 0)) {}
    static Matrix identity(int n) {
        Matrix I(n);
        for (int i = 0; i < n; i++) I.a[i][i] = 1;
        return I;
    }
    Matrix operator*(const Matrix& other) const {
        Matrix res(n);
        for (int i = 0; i < n; i++)
            for (int k = 0; k < n; k++)
                for (int j = 0; j < n; j++)
                    res.a[i][j] = (res.a[i][j] + a[i][k] * other.a[k][j]) % MOD;
        return res;
    }
};

Matrix matrixPow(Matrix base, ll exp) {
    Matrix result = Matrix::identity(base.n);
    while (exp > 0) {
        if (exp & 1) result = result * base;
        base = base * base;
        exp >>= 1;
    }
    return result;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    ll n;
    cin >> n;

    // 斐波那契递推：F(n) = F(n-1) + F(n-2)
    // 转移矩阵：[1, 1; 1, 0]
    Matrix base(2);
    base.a[0][0] = 1; base.a[0][1] = 1;
    base.a[1][0] = 1; base.a[1][1] = 0;

    // [F(n), F(n-1)]^T = base^(n-1) * [F(1), F(0)]^T
    if (n == 0) {
        cout << 0 << endl;
    } else if (n == 1) {
        cout << 1 << endl;
    } else {
        Matrix result = matrixPow(base, n - 1);
        // F(n) = result[0][0] * F(1) + result[0][1] * F(0)
        ll ans = (result.a[0][0] * 1 + result.a[0][1] * 0) % MOD;
        cout << ans << endl;
    }

    return 0;
}`,
        explanation: "1. 斐波那契递推：F(n) = F(n-1) + F(n-2)。\n2. 转移矩阵：[F(n), F(n-1)]^T = [[1, 1], [1, 0]] * [F(n-1), F(n-2)]^T。\n3. 矩阵快速幂：计算 base^(n-1)。\n4. 最终答案：F(n) = result[0][0] * F(1) + result[0][1] * F(0)。\n5. 时间复杂度：O(2³ log n) = O(log n)，空间复杂度：O(1)。"
      },
      {
        title: "CF 166E - Tetrahedron",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/166/E",
        description: "一个蚂蚁从四面体的顶点 D 出发，每秒沿着棱随机走到相邻的顶点。问 n 秒后回到顶点 D 的概率。对 10^9 + 7 取模。",
        solution: "矩阵快速幂。将状态转移表示为矩阵乘法，然后用快速幂加速。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const int MOD = 1e9 + 7;

struct Matrix {
    vector<vector<ll>> a;
    int n;
    Matrix(int n) : n(n), a(n, vector<ll>(n, 0)) {}
    static Matrix identity(int n) {
        Matrix I(n);
        for (int i = 0; i < n; i++) I.a[i][i] = 1;
        return I;
    }
    Matrix operator*(const Matrix& other) const {
        Matrix res(n);
        for (int i = 0; i < n; i++)
            for (int k = 0; k < n; k++)
                for (int j = 0; j < n; j++)
                    res.a[i][j] = (res.a[i][j] + a[i][k] * other.a[k][j]) % MOD;
        return res;
    }
};

Matrix matrixPow(Matrix base, ll exp) {
    Matrix result = Matrix::identity(base.n);
    while (exp > 0) {
        if (exp & 1) result = result * base;
        base = base * base;
        exp >>= 1;
    }
    return result;
}

ll power(ll base, ll exp, ll mod) {
    ll result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    // 状态转移矩阵
    // 状态：D, A, B, C
    // 从 D 可以到 A, B, C
    // 从 A 可以到 D, B, C
    // 从 B 可以到 D, A, C
    // 从 C 可以到 D, A, B
    Matrix base(4);
    base.a[0][1] = base.a[0][2] = base.a[0][3] = 1;  // D -> A, B, C
    base.a[1][0] = base.a[1][2] = base.a[1][3] = 1;  // A -> D, B, C
    base.a[2][0] = base.a[2][1] = base.a[2][3] = 1;  // B -> D, A, C
    base.a[3][0] = base.a[3][1] = base.a[3][2] = 1;  // C -> D, A, B

    // 计算 base^n
    Matrix result = matrixPow(base, n);

    // 答案是 result[0][0]（从 D 出发，n 步后回到 D）
    // 但是每一步有 1/3 的概率，所以答案要乘以 (1/3)^n
    ll inv3 = power(3, MOD - 2, MOD);
    ll inv3n = power(inv3, n, MOD);

    ll ans = result.a[0][0] * inv3n % MOD;
    cout << ans << endl;

    return 0;
}`,
        explanation: "1. 状态转移矩阵：4x4 矩阵，表示从每个顶点到相邻顶点的转移。\n2. 矩阵快速幂：计算 base^n。\n3. 答案是 result[0][0]（从 D 出发，n 步后回到 D）。\n4. 但是每一步有 1/3 的概率，所以答案要乘以 (1/3)^n。\n5. 用费马小定理计算逆元：1/3 = 3^(MOD-2) mod MOD。\n6. 时间复杂度：O(4³ log n) = O(log n)，空间复杂度：O(1)。"
      }
    ]
  },
{
    category: "贪心",
    title: "贪心、构造与证明",
    minutes: "提高",
    goal: "用交换论证、排序策略、堆和不变量设计可证明的局部最优。",
    check: "能写出贪心选择的证明，而不是只凭直觉。",
    intro: "贪心题往往代码短但证明难。构造题则要求反过来思考：怎样制造一个满足限制的答案。",
    topics: [
      "交换论证",
      "反悔贪心",
      "优先队列贪心",
      "区间调度",
      "Huffman",
      "排序不等式",
      "中位数贪心",
      "构造题",
      "不变量",
      "极值原则",
      "随机化构造",
      "交互题思维",
    ],
    mustKnow: [
      "贪心需要证明当前选择不会让未来更差。",
      "反悔贪心常用堆保存可替换选择。",
      "构造题要先找必要条件，再尝试证明充分。",
    ],
    pitfalls: [
      "只过样例的贪心通常靠不住。",
      "排序关键字不同可能导致完全不同的正确性。",
      "构造题要处理无解和边界规模。",
    ],
    steps: [
      "贪心算法是一种每步选择当前最优解以期达到全局最优的策略，构造题则要求反向思考如何制造满足限制的答案，它们的核心思想是通过局部最优选择或巧妙构造来解决问题。",
      "具体来说，第一步理解问题的最优子结构，判断是否可以用贪心；第二步设计贪心策略（如按某种关键字排序、用优先队列维护、交换论证等）；第三步严格证明贪心选择的正确性，而不仅仅依赖直觉和样例。",
      "举个例子：区间调度问题——给若干区间，选出最多的不重叠区间。贪心策略是按右端点排序，每次选结束最早的区间。可以用交换论证证明：如果最优解的第一个区间不是结束最早的，换成结束最早的不会更差。",
      "在实际使用中，需要注意只过样例的贪心通常靠不住，一定要有严格的证明。排序关键字不同可能导致完全不同的正确性。构造题要先找必要条件，再尝试证明充分条件，同时处理好无解和边界情况。",
      "适用场景：当你遇到区间调度、任务分配、最优子结构明显的问题、或者需要构造满足特定条件的答案等问题时，应该想到用贪心与构造。"
    ],
    code: `int maxNonOverlapping(vector<pair<int,int>> segs) {
    sort(segs.begin(), segs.end(), [](auto a, auto b) {
        return a.second < b.second;
    });
    int ans = 0, lastEnd = INT_MIN;
    for (auto [l, r] : segs) {
        if (l >= lastEnd) {
            ans++;
            lastEnd = r;
        }
    }
    return ans;
}`,
    examples: [
      {
        title: "洛谷 P1020 [NOIP1999 提高组] 导弹拦截",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1020",
        description: "给定一个导弹高度序列，求最少需要多少套系统才能拦截所有导弹。每套系统每次拦截的导弹高度不能超过上一次。",
        solution: "贪心 + 最长不上升子序列。第一问是最长不上升子序列长度，第二问是最少划分为多少个不上升子序列。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<int> a;
    int x;
    while (cin >> x) a.push_back(x);
    int n = a.size();

    // 第一问：最长不上升子序列
    vector<int> d1;
    for (int x : a) {
        auto it = upper_bound(d1.begin(), d1.end(), x, greater<int>());
        if (it == d1.end()) d1.push_back(x);
        else *it = x;
    }

    // 第二问：最少划分为多少个不上升子序列
    vector<int> d2;
    for (int x : a) {
        auto it = lower_bound(d2.begin(), d2.end(), x);
        if (it == d2.end()) d2.push_back(x);
        else *it = x;
    }

    cout << d1.size() << endl;
    cout << d2.size() << endl;

    return 0;
}`,
        explanation: "1. 第一问：最长不上升子序列长度。使用 upper_bound + greater 找第一个小于当前值的位置。\n2. 第二问：最少划分为多少个不上升子序列。根据 Dilworth 定理，等于最长上升子序列长度。\n3. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      },
      {
        title: "CF 160A - Twins",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/160/A",
        description: "给定 n 个硬币，要选出一些硬币使得总价值超过总价值的一半。求最少需要选多少个硬币。",
        solution: "贪心：从大到小排序，依次选择直到超过一半。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    int total = 0;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        total += a[i];
    }

    sort(a.rbegin(), a.rend());

    int sum = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
        ans++;
        if (sum > total / 2) break;
    }

    cout << ans << endl;
    return 0;
}`,
        explanation: "1. 贪心策略：从大到小排序，依次选择。\n2. 当选中的硬币总价值超过总价值的一半时，停止选择。\n3. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "数论与数学",
    title: "数论与模运算",
    minutes: "提高",
    goal: "掌握整除、同余、质数、逆元、筛法和大整数分解常用工具。",
    check: "能写快速幂、扩展欧几里得、CRT、线性筛、Miller-Rabin 的用法。",
    intro: "数论题经常把简单公式藏在约束里。先观察整除关系和模数性质，再选择定理或筛法。",
    topics: [
      "gcd/lcm",
      "快速幂",
      "扩展欧几里得",
      "模逆元",
      "中国剩余定理",
      "扩展 CRT",
      "线性筛",
      "欧拉函数",
      "莫比乌斯函数",
      "积性函数",
      "整除分块",
      "Miller-Rabin",
      "Pollard-Rho",
      "BSGS",
      "原根",
      "Lucas 定理",
    ],
    mustKnow: [
      "模数为质数时，逆元可用费马小定理。",
      "CRT 需要模数互质，exCRT 能处理不互质但要判无解。",
      "线性筛能同时求质数和积性函数。",
    ],
    pitfalls: [
      "乘法可能溢出 long long，必要时用 __int128。",
      "负数取模要统一成非负。",
      "组合数取模时要看模数是否为质数。",
    ],
    steps: [
      "数论与模运算是一套处理整除、同余、质数、逆元等数学问题的工具箱，它的核心思想是利用数论性质（如费马小定理、中国剩余定理）将复杂计算化简。",
      "具体来说，第一步判断问题的本质是关于整除、同余还是质数分解；第二步选择合适的工具，如用快速幂求幂次模、用扩展欧几里得求逆元或解线性同余方程、用线性筛预处理质数和积性函数；第三步对于大数分解可以用 Miller-Rabin 判素和 Pollard-Rho 分解。",
      "举个例子：求 a 模质数 p 的逆元。由费马小定理 a^(p-1) ≡ 1 (mod p)，所以 a 的逆元就是 a^(p-2) mod p，用快速幂在 O(log p) 时间内求出。",
      "在实际使用中，需要注意乘法可能溢出 long long，必要时用 __int128 或快速乘。负数取模要统一成非负结果。组合数取模时要看模数是否为质数，非质数需要用 CRT 合并或扩展卢卡斯定理。",
      "适用场景：当你遇到需要求逆元、判断素性、解同余方程组、计算积性函数前缀和、或者整除分块等问题时，应该想到用数论与模运算工具。"
    ],
    code: `long long exgcd(long long a, long long b, long long& x, long long& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long g = exgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - a / b * y1;
    return g;
}

long long modInverse(long long a, long long mod) {
    long long x, y;
    long long g = exgcd(a, mod, x, y);
    if (g != 1) return -1;
    return (x % mod + mod) % mod;
}`,
    examples: [
      {
        title: "洛谷 P3383 【模板】线性筛素数",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3383",
        description: "给定 n 和 q 次查询，每次查询第 k 小的质数。",
        solution: "使用线性筛（欧拉筛）预处理所有质数。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    cin >> n >> q;

    vector<int> primes;
    vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false;

    for (int i = 2; i <= n; i++) {
        if (is_prime[i]) primes.push_back(i);
        for (int p : primes) {
            if (i * p > n) break;
            is_prime[i * p] = false;
            if (i % p == 0) break;
        }
    }

    while (q--) {
        int k;
        cin >> k;
        cout << primes[k - 1] << endl;
    }

    return 0;
}`,
        explanation: "1. 线性筛（欧拉筛）：每个合数只被它的最小质因子筛掉一次。\n2. 外层循环遍历所有数，内层循环遍历已知的质数。\n3. 如果 i % p == 0，说明 p 是 i 的最小质因子，停止内层循环。\n4. 时间复杂度：O(n)，空间复杂度：O(n)。"
      },
      {
        title: "洛谷 P3811 【模板】模意义下的乘法逆元",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3811",
        description: "给定 n 和质数 p，求 1 到 n 每个数模 p 的乘法逆元。",
        solution: "使用线性递推求逆元。inv[i] = (p - p / i) * inv[p % i] % p。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    ll n, p;
    cin >> n >> p;

    vector<ll> inv(n + 1);
    inv[1] = 1;
    for (int i = 2; i <= n; i++) {
        inv[i] = (p - p / i) * inv[p % i] % p;
    }

    for (int i = 1; i <= n; i++) {
        cout << inv[i] << endl;
    }

    return 0;
}`,
        explanation: "1. 线性递推求逆元：inv[i] = (p - p / i) * inv[p % i] % p。\n2. 推导：设 p = k * i + r，其中 k = p / i，r = p % i。\n3. 则 k * i + r ≡ 0 (mod p)，即 r ≡ -k * i (mod p)。\n4. 两边乘以 inv[i] * inv[r]，得 inv[i] ≡ -k * inv[r] (mod p)。\n5. 即 inv[i] = (p - p / i) * inv[p % i] % p。\n6. 时间复杂度：O(n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "数论与数学",
    title: "组合数学、线性代数与多项式",
    minutes: "区域赛",
    goal: "处理计数、容斥、置换群、线性方程、异或空间和卷积。",
    check: "能识别组合模型，并知道高斯消元、线性基、FFT/NTT、FWT 的用途。",
    intro: "组合与代数题常见于区域赛中后段。它们依赖公式，也依赖把问题抽象成“计数对象”。",
    topics: [
      "排列组合",
      "容斥原理",
      "鸽巢原理",
      "Catalan 数",
      "Stirling 数",
      "Burnside",
      "Polya",
      "生成函数",
      "矩阵快速幂",
      "高斯消元",
      "线性基",
      "FFT",
      "NTT",
      "FWT",
      "多项式基础",
    ],
    mustKnow: [
      "容斥用于去掉重复计数。",
      "线性基维护异或空间，能求最大异或、秩和表示性。",
      "卷积问题通常可以考虑 FFT/NTT。",
    ],
    pitfalls: [
      "组合数预处理要匹配最大 n 和模数。",
      "高斯消元要处理无解、无穷多解和精度。",
      "NTT 对模数有要求，不是任意模都能直接做。",
    ],
    steps: [
      "组合数学、线性代数与多项式涵盖了计数、容斥、线性方程组、异或空间和卷积等高级数学工具，它们的核心思想是把问题抽象为计数对象或代数结构，再选择合适的数学工具求解。",
      "具体来说，第一步判断问题类型：如果是计数问题，考虑排列组合、容斥原理或生成函数；如果是异或相关问题，考虑线性基；如果是求和或卷积问题，考虑 FFT 或 NTT。第二步选择合适的工具进行计算。",
      "举个例子：求 n 个元素中选 k 个的方案数 C(n,k)，可以用预处理阶乘和逆元在 O(1) 时间回答。如果需要对多个 k 求和，可以考虑生成函数或卷积加速。",
      "在实际使用中，需要注意组合数预处理要匹配最大 n 和模数。高斯消元要处理无解、无穷多解和精度问题。NTT 对模数有要求（需要形如 k * 2^n + 1 的质数），不是任意模都能直接做。",
      "适用场景：当你遇到序列计数、异或最值与线性基、多项式乘法（卷积）、高斯消元解线性方程组等问题时，应该想到用组合数学、线性代数与多项式工具。"
    ],
    code: `struct XorBasis {
    static const int LOG = 62;
    long long b[LOG]{};
    void insert(long long x) {
        for (int i = LOG - 1; i >= 0; i--) {
            if (!(x >> i & 1)) continue;
            if (!b[i]) {
                b[i] = x;
                return;
            }
            x ^= b[i];
        }
    }
    long long maxXor() const {
        long long ans = 0;
        for (int i = LOG - 1; i >= 0; i--) ans = max(ans, ans ^ b[i]);
        return ans;
    }
};`,
  },
{
    category: "字符串",
    title: "字符串匹配、自动机与后缀结构",
    minutes: "提高",
    goal: "处理匹配、回文、字典树、多模式串、后缀和子串统计问题。",
    check: "能写 KMP/Z/Manacher/Trie/AC 自动机，并知道后缀数组和后缀自动机的用途。",
    intro: "字符串题看似花，但核心是前缀、后缀、自动机和哈希。先判断是单模式、多模式、回文还是所有子串。",
    topics: [
      "KMP",
      "Z 函数",
      "Manacher",
      "Trie",
      "AC 自动机",
      "字符串哈希",
      "后缀数组",
      "LCP",
      "后缀自动机",
      "回文自动机",
      "最小表示法",
      "Lyndon 分解",
      "编辑距离",
      "序列自动机",
    ],
    mustKnow: [
      "KMP 解决单模式串匹配。",
      "AC 自动机解决多模式串匹配。",
      "后缀自动机常用于不同子串数量、最长公共子串等问题。",
    ],
    pitfalls: [
      "字符串下标从 0 还是 1 要统一。",
      "哈希有碰撞风险，重要题可双哈希。",
      "AC 自动机需要补全 fail 转移时注意根节点。",
    ],
    steps: [
      "字符串匹配、自动机与后缀结构是一套处理模式匹配、回文检测、子串统计等问题的工具集，它们的核心思想是利用前缀函数、后缀关系和自动机状态转移来高效处理字符串。",
      "具体来说，第一步判断问题类型：单模式串匹配用 KMP 或 Z 函数，多模式串匹配用 AC 自动机，回文问题用 Manacher，所有子串统计用后缀数组或后缀自动机；第二步实现对应的算法，注意边界和下标处理。",
      "举个例子：KMP 算法通过预处理模式串的前缀函数（next 数组），在匹配失败时跳过不必要的比较，将单模式匹配的时间复杂度优化到 O(n + m)。",
      "在实际使用中，需要注意字符串下标从 0 还是 1 要统一。哈希有碰撞风险，重要场合可以用双哈希。AC 自动机补全 fail 转移时要注意根节点的特殊处理。",
      "适用场景：当你遇到敏感词过滤、DNA 序列匹配、文本编辑器中的查找替换、最长回文子串、不同子串数量计数等问题时，应该想到用字符串匹配与自动机。"
    ],
    code: `vector<int> prefixFunction(const string& s) {
    int n = (int)s.size();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}`,
    examples: [
      {
        title: "洛谷 P3375 【模板】KMP",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3375",
        description: "给定文本串和模式串，求模式串在文本串中所有出现的位置。",
        solution: "经典的 KMP 算法。使用前缀函数（next 数组）优化匹配过程。",
        code: `#include <bits/stdc++.h>
using namespace std;

vector<int> prefixFunction(const string& s) {
    int n = (int)s.size();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string text, pattern;
    cin >> text >> pattern;

    string s = pattern + "#" + text;
    vector<int> pi = prefixFunction(s);

    int m = pattern.size();
    for (int i = m + 1; i < (int)s.size(); i++) {
        if (pi[i] == m) {
            cout << i - 2 * m + 1 << endl;
        }
    }

    // 输出 next 数组
    for (int i = 0; i < m; i++) {
        cout << pi[i] << " ";
    }
    cout << endl;

    return 0;
}`,
        explanation: "1. KMP 算法：使用前缀函数（next 数组）优化匹配过程。\n2. 前缀函数：pi[i] 表示 s[0...i] 的最长相等真前后缀的长度。\n3. 将模式串和文本串拼接，中间用 # 隔开。\n4. 遍历拼接后的字符串，如果 pi[i] == m，说明找到了一个匹配。\n5. 时间复杂度：O(n + m)，空间复杂度：O(n + m)。"
      },
      {
        title: "洛谷 P3805 【模板】Manacher",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3805",
        description: "给定一个字符串，求最长回文子串的长度。",
        solution: "经典的 Manacher 算法。使用回文半径数组优化。",
        code: `#include <bits/stdc++.h>
using namespace std;

int manacher(const string& s) {
    string t = "#";
    for (char c : s) {
        t += c;
        t += '#';
    }

    int n = t.size();
    vector<int> p(n, 0);
    int center = 0, right = 0;
    int ans = 0;

    for (int i = 0; i < n; i++) {
        if (i < right) {
            p[i] = min(right - i, p[2 * center - i]);
        }
        while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n && t[i - p[i] - 1] == t[i + p[i] + 1]) {
            p[i]++;
        }
        if (i + p[i] > right) {
            center = i;
            right = i + p[i];
        }
        ans = max(ans, p[i]);
    }

    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;

    cout << manacher(s) << endl;

    return 0;
}`,
        explanation: "1. Manacher 算法：使用回文半径数组优化。\n2. 将原字符串插入 #，使所有回文子串的长度都变成奇数。\n3. p[i] 表示以 i 为中心的回文半径。\n4. 利用已知的回文信息，避免重复计算。\n5. 时间复杂度：O(n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "计算几何",
    title: "二维几何与精度处理",
    minutes: "区域赛",
    goal: "用向量、叉积、凸包和旋转卡壳处理几何关系。",
    check: "能写点线关系、线段相交、凸包、点在多边形内、旋转卡壳。",
    intro: "计算几何最怕精度和分类讨论。先用向量表达关系，再小心处理共线、重合和边界。",
    topics: [
      "点与向量",
      "点积",
      "叉积",
      "线段相交",
      "点到线距离",
      "多边形面积",
      "点在多边形内",
      "凸包",
      "旋转卡壳",
      "半平面交",
      "最近点对",
      "圆与圆",
      "圆与线",
      "三维几何基础",
    ],
    mustKnow: [
      "叉积判断方向和面积。",
      "凸包通常先排序，再维护上下凸壳。",
      "浮点比较必须使用 eps。",
    ],
    pitfalls: [
      "边界点是否算内部要按题意处理。",
      "整数几何优先用 long long 存叉积。",
      "角度排序容易被象限和共线点坑。",
    ],
    steps: [
      "二维几何与精度处理是一套用向量、叉积、凸包等工具解决平面几何问题的技术，它的核心思想是将几何关系转化为代数运算，用向量和叉积表示点线面的关系。",
      "具体来说，第一步明确用整数还是浮点数表示坐标（整数几何更精确）；第二步用向量和叉积表示几何关系（叉积大于 0 为逆时针、等于 0 为共线、小于 0 为顺时针）；第三步小心处理共线、重合等特殊情况，浮点数比较必须使用 eps 容差。",
      "举个例子：求凸包。先按 x 坐标排序，然后分别维护上凸壳和下凸壳：遍历排序后的点，如果新点与栈顶两点构成顺时针方向（叉积 <= 0），则弹出栈顶，最终得到凸包上的所有点。",
      "在实际使用中，需要注意浮点比较必须使用 eps（如 1e-9），不能直接用 == 判断相等。整数几何优先用 long long 存叉积避免精度损失。角度排序容易被象限和共线点坑，建议用叉积代替 atan2 排序。",
      "适用场景：当你遇到凸包、旋转卡壳求最远点对、最近点对、点在多边形内判断、线段相交、半平面交等问题时，应该想到用二维几何与精度处理技术。"
    ],
    code: `struct Point {
    long long x, y;
    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
};

long long cross(Point a, Point b, Point c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

vector<Point> convexHull(vector<Point> p) {
    sort(p.begin(), p.end());
    p.erase(unique(p.begin(), p.end(), [](Point a, Point b) {
        return a.x == b.x && a.y == b.y;
    }), p.end());
    vector<Point> h;
    for (Point pt : p) {
        while (h.size() >= 2 && cross(h[h.size()-2], h.back(), pt) <= 0) h.pop_back();
        h.push_back(pt);
    }
    int lower = h.size();
    for (int i = (int)p.size() - 2; i >= 0; i--) {
        Point pt = p[i];
        while ((int)h.size() > lower && cross(h[h.size()-2], h.back(), pt) <= 0) h.pop_back();
        h.push_back(pt);
    }
    if (!h.empty()) h.pop_back();
    return h;
}`,
    examples: [
      {
        title: "洛谷 P2742 【模板】二维凸包",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P2742",
        description: "给定 n 个点，求凸包的周长。",
        solution: "使用 Andrew 算法求凸包，然后计算周长。",
        code: `#include <bits/stdc++.h>
using namespace std;

struct Point {
    double x, y;
    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
};

double cross(Point a, Point b, Point c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

double dist(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

vector<Point> convexHull(vector<Point>& p) {
    int n = p.size();
    sort(p.begin(), p.end());
    vector<Point> h;
    for (int i = 0; i < n; i++) {
        while (h.size() >= 2 && cross(h[h.size()-2], h.back(), p[i]) <= 0) {
            h.pop_back();
        }
        h.push_back(p[i]);
    }
    int lower = h.size();
    for (int i = n - 2; i >= 0; i--) {
        while (h.size() > lower && cross(h[h.size()-2], h.back(), p[i]) <= 0) {
            h.pop_back();
        }
        h.push_back(p[i]);
    }
    if (h.size() > 1) h.pop_back();
    return h;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<Point> p(n);
    for (int i = 0; i < n; i++) {
        cin >> p[i].x >> p[i].y;
    }

    vector<Point> hull = convexHull(p);
    double ans = 0;
    int m = hull.size();
    for (int i = 0; i < m; i++) {
        ans += dist(hull[i], hull[(i + 1) % m]);
    }

    cout << fixed << setprecision(2) << ans << endl;

    return 0;
}`,
        explanation: "1. Andrew 算法：先按 x 坐标排序，再维护上下凸壳。\n2. 上凸壳：从左到右遍历，如果新点在凸壳的右侧（叉积 <= 0），则弹出栈顶。\n3. 下凸壳：从右到左遍历，同样的规则。\n4. 最后合并上下凸壳，得到完整的凸包。\n5. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      },
      {
        title: "洛谷 P1429 平面最近点对",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1429",
        description: "给定 n 个点，求最近点对的距离。",
        solution: "分治算法。将点集分成左右两半，递归求解，然后合并。",
        code: `#include <bits/stdc++.h>
using namespace std;

struct Point {
    double x, y;
    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
};

double dist(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

double solve(vector<Point>& p, int l, int r) {
    if (r - l <= 3) {
        double ans = 1e18;
        for (int i = l; i <= r; i++) {
            for (int j = i + 1; j <= r; j++) {
                ans = min(ans, dist(p[i], p[j]));
            }
        }
        return ans;
    }

    int mid = (l + r) / 2;
    double d = min(solve(p, l, mid), solve(p, mid + 1, r));

    vector<Point> strip;
    for (int i = l; i <= r; i++) {
        if (abs(p[i].x - p[mid].x) < d) {
            strip.push_back(p[i]);
        }
    }

    sort(strip.begin(), strip.end(), [](const Point& a, const Point& b) {
        return a.y < b.y;
    });

    for (int i = 0; i < strip.size(); i++) {
        for (int j = i + 1; j < strip.size() && strip[j].y - strip[i].y < d; j++) {
            d = min(d, dist(strip[i], strip[j]));
        }
    }

    return d;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<Point> p(n);
    for (int i = 0; i < n; i++) {
        cin >> p[i].x >> p[i].y;
    }

    sort(p.begin(), p.end());
    cout << fixed << setprecision(4) << solve(p, 0, n - 1) << endl;

    return 0;
}`,
        explanation: "1. 分治算法：将点集分成左右两半，递归求解。\n2. 合并：考虑跨越中线的点对。\n3. 优化：只考虑距离中线小于 d 的点，按 y 坐标排序后，每个点只需要检查常数个点。\n4. 时间复杂度：O(n log n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "搜索与博弈",
    title: "搜索、状态压缩与博弈论",
    minutes: "提高",
    goal: "处理状态空间、剪枝、双向搜索、Meet-in-the-middle 和公平组合游戏。",
    check: "能写 BFS 状态搜索、IDA*、双向 BFS、SG 函数和基础博弈 DP。",
    intro: "搜索题的重点是状态设计和剪枝。博弈题则要判断局面胜负，常用 SG 函数把游戏拆分。",
    topics: [
      "DFS 回溯",
      "BFS 状态图",
      "双向 BFS",
      "A*",
      "IDA*",
      "Meet-in-the-middle",
      "剪枝",
      "记忆化搜索",
      "状态哈希",
      "Minimax",
      "Alpha-Beta",
      "SG 函数",
      "Nim",
      "博弈 DP",
    ],
    mustKnow: [
      "BFS 适合边权相等的最短步数。",
      "Meet-in-the-middle 把 2^n 拆成两个 2^(n/2)。",
      "多个独立公平游戏的 SG 值异或为 0 则先手败。",
    ],
    pitfalls: [
      "状态要能唯一表示局面，否则会重复搜索。",
      "启发式搜索的估价函数不能高估真实代价。",
      "SG 函数要从后继状态 mex 得到。",
    ],
    steps: [
      "搜索与博弈论是竞赛中两大核心主题。搜索关注如何在状态空间中高效找到目标，博弈论则研究两个理性玩家交替行动时谁有必胜策略。",
      "搜索方面，BFS 用队列按层扩展适合求最短步数，DFS 用递归深入探索适合枚举方案。Meet-in-the-middle 将 2^n 的搜索拆成两个 2^(n/2) 再合并，大幅降低复杂度。博弈论方面，SG 函数通过对每个局面的后继状态取 mex 来判断胜负，多个独立游戏的 SG 值异或为 0 则先手必败。",
      "举个例子：八数码问题可以用 BFS 搜索，把每种棋盘排列当作一个状态，从初始状态出发逐步移动空格，直到到达目标状态，BFS 保证第一次到达就是最少步数。",
      "在实际使用中，状态表示必须唯一且紧凑，否则哈希冲突或内存爆炸。启发式搜索的估价函数绝不能高估真实代价，否则 A* 的正确性会被破坏。",
      "适用场景：当题目要求最少步数时想到 BFS，当状态空间巨大但可拆分时想到 Meet-in-the-middle，当题目描述两人轮流操作且问谁赢时想到 SG 函数。"
    ],
    code: `int bfsShortest(string start, string target) {
    queue<string> q;
    unordered_map<string, int> dist;
    dist[start] = 0;
    q.push(start);
    while (!q.empty()) {
        string cur = q.front();
        q.pop();
        if (cur == target) return dist[cur];
        // for (string nxt : nextStates(cur)) {
        //     if (!dist.count(nxt)) {
        //         dist[nxt] = dist[cur] + 1;
        //         q.push(nxt);
        //     }
        // }
    }
    return -1;
}`,
    examples: [
      {
        title: "洛谷 P1443 马的遍历",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1443",
        description: "给定一个 n×m 的棋盘，马从 (x,y) 出发，求到达每个格子的最少步数。",
        solution: "经典的 BFS 问题。使用队列维护待访问的格子。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, x, y;
    cin >> n >> m >> x >> y;

    vector<vector<int>> dist(n + 1, vector<int>(m + 1, -1));
    queue<pair<int, int>> q;

    int dx[] = {-2, -2, -1, -1, 1, 1, 2, 2};
    int dy[] = {-1, 1, -2, 2, -2, 2, -1, 1};

    dist[x][y] = 0;
    q.push({x, y});

    while (!q.empty()) {
        auto [cx, cy] = q.front(); q.pop();
        for (int i = 0; i < 8; i++) {
            int nx = cx + dx[i], ny = cy + dy[i];
            if (nx >= 1 && nx <= n && ny >= 1 && ny <= m && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[cx][cy] + 1;
                q.push({nx, ny});
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cout << setw(5) << left << dist[i][j];
        }
        cout << endl;
    }

    return 0;
}`,
        explanation: "1. BFS：使用队列维护待访问的格子。\n2. 马有 8 种移动方式，用 dx 和 dy 数组表示。\n3. 从起点开始，依次访问所有可达的格子，记录步数。\n4. 时间复杂度：O(nm)，空间复杂度：O(nm)。"
      },
      {
        title: "CF 225C - Barcode",
        source: "Codeforces",
        link: "https://codeforces.com/problemset/problem/225/C",
        description: "给定一个 n×m 的矩阵，每列可以涂成黑色或白色。要求连续的同色列数在 [x, y] 之间。求最少需要涂多少个格子。",
        solution: "DP。dp[i][0/1] 表示前 i 列，最后一列是白色/黑色时的最小代价。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, x, y;
    cin >> n >> m >> x >> y;

    vector<string> grid(n);
    for (int i = 0; i < n; i++) cin >> grid[i];

    // 预处理每列的黑色数量
    vector<int> black(m, 0);
    for (int j = 0; j < m; j++) {
        for (int i = 0; i < n; i++) {
            if (grid[i][j] == '#') black[j]++;
        }
    }

    // 前缀和
    vector<int> prefix(m + 1, 0);
    for (int j = 0; j < m; j++) {
        prefix[j + 1] = prefix[j] + black[j];
    }

    // DP
    const int INF = 1e9;
    vector<vector<int>> dp(m + 1, vector<int>(2, INF));
    dp[0][0] = 0;
    dp[0][1] = 0;

    for (int j = 1; j <= m; j++) {
        for (int k = x; k <= y; k++) {
            if (j - k < 0) break;
            // 前 k 列涂白色
            dp[j][0] = min(dp[j][0], dp[j - k][1] + (prefix[j] - prefix[j - k]));
            // 前 k 列涂黑色
            dp[j][1] = min(dp[j][1], dp[j - k][0] + (k * n - (prefix[j] - prefix[j - k])));
        }
    }

    cout << min(dp[m][0], dp[m][1]) << endl;

    return 0;
}`,
        explanation: "1. 预处理每列的黑色数量。\n2. DP：dp[i][0/1] 表示前 i 列，最后一列是白色/黑色时的最小代价。\n3. 状态转移：枚举连续同色的列数 k，更新 dp[j][0/1]。\n4. 时间复杂度：O(m * y)，空间复杂度：O(m)。"
      }
    ]
  },
{
    category: "杂项技巧",
    title: "离线算法、分治与杂项技巧",
    minutes: "区域赛",
    goal: "掌握不在线处理查询时的强力工具，并理解竞赛中的优化和随机化技巧。",
    check: "能说出莫队、CDQ、整体二分、平行二分、可持久化、bitset 优化分别适合什么题。",
    intro: "当在线维护太难时，排序查询、分治处理和预处理版本常能打开局面。这类技巧在区域赛后半程很有价值。",
    topics: [
      "离线查询",
      "莫队",
      "带修莫队",
      "树上莫队",
      "CDQ 分治",
      "整体二分",
      "平行二分",
      "可持久化思想",
      "扫描线",
      "bitset 优化",
      "随机化",
      "模拟退火",
      "根号分治",
      "分块维护",
      "交互题策略",
    ],
    mustKnow: [
      "莫队通过排序查询减少指针移动次数。",
      "CDQ 分治常处理三维偏序和转移贡献。",
      "整体二分适合多个询问的答案具有可二分性。",
    ],
    pitfalls: [
      "离线算法会改变处理顺序，输出要按原编号还原。",
      "莫队 add/remove 必须互逆。",
      "随机化算法要准备多次尝试或备用策略。",
    ],
    steps: [
      "离线算法是一类不按输入顺序、而是重新排列查询顺序来提高效率的技巧。当在线维护太困难时，把所有查询一起读入，按某种规则排序后批量处理，往往能大幅降低复杂度。",
      "核心思路是以空间或时间的灵活调度换取效率。莫队算法将查询按左端点分块、右端点排序，让区间指针总移动量控制在 O(n*sqrt(n))。CDQ 分治将三维偏序问题分治处理，每一层用归并排序消掉一维。整体二分则把多个具有可二分性的询问一起二分，共享中间结果。",
      "举个例子：求区间不同元素个数，如果在线用主席树较复杂，但用莫队离线处理，维护一个计数数组，add 和 remove 操作各 O(1)，总复杂度 O((n+m)*sqrt(n))，代码简洁高效。",
      "离线处理会打乱查询顺序，最终输出时一定要按原始编号还原答案。莫队的 add 和 remove 必须严格互逆，否则维护的值会出错。随机化算法如模拟退火要设好参数，必要时多次运行取最优。",
      "适用场景：当你遇到区间查询在线维护太复杂、或者题目不要求强制在线时，应该想到离线算法。三维偏序用 CDQ，多询问可二分用整体二分，区间众数/不同数用莫队。"
    ],
    code: `struct Query {
    int l, r, id;
};

vector<long long> moAlgorithm(vector<int>& a, vector<Query> qs) {
    int n = (int)a.size() - 1;
    int block = max(1, (int)sqrt(n));
    sort(qs.begin(), qs.end(), [&](const Query& x, const Query& y) {
        int bx = x.l / block, by = y.l / block;
        if (bx != by) return bx < by;
        return (bx & 1) ? x.r > y.r : x.r < y.r;
    });
    vector<long long> ans(qs.size());
    int l = 1, r = 0;
    long long cur = 0;
    auto add = [&](int pos) { cur += a[pos]; };
    auto remove = [&](int pos) { cur -= a[pos]; };
    for (auto q : qs) {
        while (l > q.l) add(--l);
        while (r < q.r) add(++r);
        while (l < q.l) remove(l++);
        while (r > q.r) remove(r--);
        ans[q.id] = cur;
    }
    return ans;
}`,
    examples: [
      {
        title: "洛谷 P1903 [SDOI2009] HH的项链",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P1903",
        description: "给定一个数组，多次查询区间内不同数的个数。",
        solution: "经典的莫队问题。使用莫队算法离线处理查询。",
        code: `#include <bits/stdc++.h>
using namespace std;

struct Query {
    int l, r, id;
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];

    int m;
    cin >> m;
    vector<Query> qs(m);
    for (int i = 0; i < m; i++) {
        cin >> qs[i].l >> qs[i].r;
        qs[i].id = i;
    }

    int block = max(1, (int)sqrt(n));
    sort(qs.begin(), qs.end(), [&](const Query& x, const Query& y) {
        int bx = x.l / block, by = y.l / block;
        if (bx != by) return bx < by;
        return (bx & 1) ? x.r > y.r : x.r < y.r;
    });

    vector<int> cnt(1000001, 0);
    vector<int> ans(m);
    int l = 1, r = 0, cur = 0;

    auto add = [&](int pos) {
        if (cnt[a[pos]] == 0) cur++;
        cnt[a[pos]]++;
    };

    auto remove = [&](int pos) {
        cnt[a[pos]]--;
        if (cnt[a[pos]] == 0) cur--;
    };

    for (auto& q : qs) {
        while (l > q.l) add(--l);
        while (r < q.r) add(++r);
        while (l < q.l) remove(l++);
        while (r > q.r) remove(r--);
        ans[q.id] = cur;
    }

    for (int i = 0; i < m; i++) {
        cout << ans[i] << endl;
    }

    return 0;
}`,
        explanation: "1. 莫队算法：将查询分块排序，减少指针移动次数。\n2. 按左端点分块，同一块内按右端点排序。\n3. 维护当前区间内不同数的个数。\n4. add/remove 操作：维护计数数组。\n5. 时间复杂度：O((n + m) * sqrt(n))，空间复杂度：O(n + m)。"
      },
      {
        title: "洛谷 P3388 【模板】割点（割顶）",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3388",
        description: "给定一个无向图，求所有割点。",
        solution: "使用 Tarjan 算法求割点。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> dfn(n + 1, 0), low(n + 1, 0);
    vector<bool> isCut(n + 1, false);
    int timer = 0;

    function<void(int, int)> dfs = [&](int u, int parent) {
        dfn[u] = low[u] = ++timer;
        int children = 0;

        for (int v : adj[u]) {
            if (v == parent) continue;
            if (!dfn[v]) {
                children++;
                dfs(v, u);
                low[u] = min(low[u], low[v]);
                if (parent != 0 && low[v] >= dfn[u]) {
                    isCut[u] = true;
                }
            } else {
                low[u] = min(low[u], dfn[v]);
            }
        }

        if (parent == 0 && children >= 2) {
            isCut[u] = true;
        }
    };

    for (int i = 1; i <= n; i++) {
        if (!dfn[i]) dfs(i, 0);
    }

    vector<int> cuts;
    for (int i = 1; i <= n; i++) {
        if (isCut[i]) cuts.push_back(i);
    }

    cout << cuts.size() << endl;
    for (int x : cuts) cout << x << " ";
    cout << endl;

    return 0;
}`,
        explanation: "1. Tarjan 算法：使用 DFS 求割点。\n2. dfn[u]：节点 u 的 DFS 序号。\n3. low[u]：节点 u 能到达的最小 dfn。\n4. 割点判定：如果存在子节点 v，使得 low[v] >= dfn[u]，则 u 是割点。\n5. 时间复杂度：O(n + m)，空间复杂度：O(n + m)。"
      }
    ]
  },
{
    category: "图论",
    title: "强连通分量与缩点",
    minutes: "区域赛",
    goal: "掌握有向图的强连通分量（SCC）算法，理解缩点后 DAG 的性质和应用。",
    check: "能写出 Tarjan SCC 算法，理解 Kosaraju 算法，会用缩点解决实际问题。",
    intro: "强连通分量是有向图中互相可达的极大点集。缩点后得到 DAG，很多问题可以转化为 DAG 上的问题。",
    topics: [
      "Tarjan SCC 算法",
      "Kosaraju 算法",
      "缩点",
      "DAG 性质",
      "2-SAT 问题",
      "可达性分析",
    ],
    mustKnow: [
      "Tarjan SCC 的核心是维护栈和 lowlink 值。",
      "缩点后得到 DAG，分量编号不一定拓扑有序。",
      "2-SAT 的核心是建蕴含图并检查变量和反变量是否同 SCC。",
    ],
    pitfalls: [
      "Tarjan 算法中栈的处理要正确，避免重复入栈。",
      "缩点后要重新建图，注意边的去重。",
      "2-SAT 的蕴含图要正确建模。",
    ],
    steps: [
      "强连通分量（SCC）是有向图中一组互相可达的极大顶点集合。缩点是把每个 SCC 压缩成一个点，得到的图一定是 DAG（有向无环图），很多问题因此变得简单。",
      "Tarjan SCC 算法用一次 DFS 完成：维护 dfn（DFS 序）和 low（能回溯到的最小 dfn），用栈保存当前路径上的节点。当一个节点的 dfn 等于 low 时，它和栈中它上面的所有节点构成一个 SCC。Kosaraju 算法则需要两次 DFS：第一次记录完成顺序，第二次在反图上按该顺序遍历。",
      "举个例子：给一个有向图，求一条路径使点权和最大。直接在原图上做 DP 可能有环无法转移，但先 Tarjan 缩点得到 DAG，再在 DAG 上拓扑排序做 DP 就能正确求解。",
      "Tarjan 中栈的维护要小心，节点只在第一次访问时入栈，出栈时要标记 inStack 为 false。缩点后重新建图要注意去重边，否则拓扑排序或 DP 的复杂度可能退化。",
      "适用场景：当有向图中存在环、需要处理环上的等价关系时，应该想到 SCC 缩点。2-SAT 问题、可达性分析、DAG 上的 DP 都是缩点的典型应用。"
    ],
    code: `// Tarjan SCC 算法
vector<int> dfn, low, stk, inStack;
vector<vector<int>> scc;
int timer = 0, top = 0;

void tarjan(int u, vector<vector<int>>& adj) {
    dfn[u] = low[u] = ++timer;
    stk[++top] = u;
    inStack[u] = true;

    for (int v : adj[u]) {
        if (!dfn[v]) {
            tarjan(v, adj);
            low[u] = min(low[u], low[v]);
        } else if (inStack[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }

    if (dfn[u] == low[u]) {
        vector<int> component;
        while (true) {
            int v = stk[top--];
            inStack[v] = false;
            component.push_back(v);
            if (v == u) break;
        }
        scc.push_back(component);
    }
}`,
    examples: [
      {
        title: "洛谷 P3387 【模板】缩点",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3387",
        description: "给定一个有向图，每个点有点权。求一条路径，使得路径上的点权之和最大。",
        solution: "先用 Tarjan SCC 缩点，然后在 DAG 上做 DP 求最长路。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<int> val(n + 1);
    for (int i = 1; i <= n; i++) cin >> val[i];

    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }

    // Tarjan SCC
    vector<int> dfn(n + 1, 0), low(n + 1, 0), stk(n + 1), inStack(n + 1, 0);
    vector<int> belong(n + 1, 0);
    int timer = 0, top = 0, sccCnt = 0;

    function<void(int)> tarjan = [&](int u) {
        dfn[u] = low[u] = ++timer;
        stk[++top] = u;
        inStack[u] = true;

        for (int v : adj[u]) {
            if (!dfn[v]) {
                tarjan(v);
                low[u] = min(low[u], low[v]);
            } else if (inStack[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }

        if (dfn[u] == low[u]) {
            sccCnt++;
            while (true) {
                int v = stk[top--];
                inStack[v] = false;
                belong[v] = sccCnt;
                if (v == u) break;
            }
        }
    };

    for (int i = 1; i <= n; i++) {
        if (!dfn[i]) tarjan(i);
    }

    // 缩点后建 DAG
    vector<ll> sccVal(sccCnt + 1, 0);
    vector<int> inDeg(sccCnt + 1, 0);
    vector<vector<int>> dag(sccCnt + 1);

    for (int u = 1; u <= n; u++) {
        sccVal[belong[u]] += val[u];
        for (int v : adj[u]) {
            if (belong[u] != belong[v]) {
                dag[belong[u]].push_back(belong[v]);
                inDeg[belong[v]]++;
            }
        }
    }

    // DAG 上 DP 求最长路
    vector<ll> dp(sccCnt + 1, 0);
    queue<int> q;
    for (int i = 1; i <= sccCnt; i++) {
        dp[i] = sccVal[i];
        if (inDeg[i] == 0) q.push(i);
    }

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : dag[u]) {
            dp[v] = max(dp[v], dp[u] + sccVal[v]);
            if (--inDeg[v] == 0) q.push(v);
        }
    }

    ll ans = 0;
    for (int i = 1; i <= sccCnt; i++) ans = max(ans, dp[i]);
    cout << ans << endl;

    return 0;
}`,
        explanation: "1. Tarjan SCC：使用 DFS 求强连通分量，维护 dfn 和 low 值。\n2. 缩点：将每个 SCC 缩成一个点，重新建 DAG。\n3. DAG DP：在缩点后的 DAG 上做 DP，求最长路。\n4. 时间复杂度：O(n + m)，空间复杂度：O(n + m)。"
      }
    ]
  },
{
    category: "图论",
    title: "割点、桥与双连通分量",
    minutes: "区域赛",
    goal: "掌握无向图的割点、桥、点双连通分量和边双连通分量的求法。",
    check: "能写出 Tarjan 求割点和桥的算法，理解点双和边双的区别。",
    intro: "割点和桥是无向图中影响连通性的关键元素。点双连通分量和边双连通分量是基于它们的连通性划分。",
    topics: [
      "割点",
      "桥",
      "点双连通分量",
      "边双连通分量",
      "圆方树",
      "连通性判定",
    ],
    mustKnow: [
      "割点判定：根节点有至少两个子树，非根节点存在子节点 v 使得 low[v] >= dfn[u]。",
      "桥判定：存在子节点 v 使得 low[v] > dfn[u]。",
      "点双连通分量：没有割点的极大子图。",
    ],
    pitfalls: [
      "无向图 Tarjan 要区分树边和返祖边，不能走父边。",
      "点双连通分量的求法要用栈维护。",
      "边双连通分量可以通过缩桥后的连通块得到。",
    ],
    steps: [
      "割点是删除后使无向图不连通的顶点，桥是删除后使无向图不连通的边。点双连通分量是没有割点的极大子图，边双连通分量是没有桥的极大子图。这些概念帮助我们分析图的连通性结构。",
      "核心思想是利用 Tarjan 的 dfn 和 low 值进行判定。割点判定：根节点有至少两个 DFS 子树则为割点，非根节点 u 存在子节点 v 使得 low[v] >= dfn[u] 则 u 是割点。桥判定更严格：存在子节点 v 使得 low[v] > dfn[u] 则边 (u,v) 是桥。",
      "举个例子：社交网络中，如果某个人是连接两个朋友圈的唯一通道，删除他后两个圈子就断开了，这个人就是割点。如果两个人之间的关系是唯一纽带，这条关系就是桥。",
      "无向图的 Tarjan 要特别注意不能走回父边（即刚来的那条树边），否则 low 值会被错误更新。点双连通分量的求法需要用栈维护，一个割点可能同时属于多个点双。边双连通分量相对简单，找到所有桥后缩掉即可。",
      "适用场景：当题目问删除某个点或某条边后图是否仍然连通、或者需要分析图的连通性骨架时，应该想到割点、桥和双连通分量。"
    ],
    code: `// Tarjan 求割点和桥
vector<int> dfn, low;
vector<bool> isCut;
vector<pair<int, int>> bridges;
int timer = 0;

void tarjan(int u, int parent, vector<vector<int>>& adj) {
    dfn[u] = low[u] = ++timer;
    int children = 0;

    for (int v : adj[u]) {
        if (v == parent) continue;
        if (!dfn[v]) {
            children++;
            tarjan(v, u, adj);
            low[u] = min(low[u], low[v]);

            // 割点判定
            if (parent == 0 && children >= 2) isCut[u] = true;
            if (parent != 0 && low[v] >= dfn[u]) isCut[u] = true;

            // 桥判定
            if (low[v] > dfn[u]) bridges.push_back({u, v});
        } else {
            low[u] = min(low[u], dfn[v]);
        }
    }
}`,
    examples: [
      {
        title: "洛谷 P3388 【模板】割点（割顶）",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3388",
        description: "给定一个无向图，求所有割点。",
        solution: "使用 Tarjan 算法求割点。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> dfn(n + 1, 0), low(n + 1, 0);
    vector<bool> isCut(n + 1, false);
    int timer = 0;

    function<void(int, int)> dfs = [&](int u, int parent) {
        dfn[u] = low[u] = ++timer;
        int children = 0;

        for (int v : adj[u]) {
            if (v == parent) continue;
            if (!dfn[v]) {
                children++;
                dfs(v, u);
                low[u] = min(low[u], low[v]);
                if (parent != 0 && low[v] >= dfn[u]) {
                    isCut[u] = true;
                }
            } else {
                low[u] = min(low[u], dfn[v]);
            }
        }

        if (parent == 0 && children >= 2) {
            isCut[u] = true;
        }
    };

    for (int i = 1; i <= n; i++) {
        if (!dfn[i]) dfs(i, 0);
    }

    vector<int> cuts;
    for (int i = 1; i <= n; i++) {
        if (isCut[i]) cuts.push_back(i);
    }

    cout << cuts.size() << endl;
    for (int x : cuts) cout << x << " ";
    cout << endl;

    return 0;
}`,
        explanation: "1. Tarjan 算法：使用 DFS 求割点。\n2. dfn[u]：节点 u 的 DFS 序号。\n3. low[u]：节点 u 能到达的最小 dfn。\n4. 割点判定：根节点有至少两个子树，非根节点存在子节点 v 使得 low[v] >= dfn[u]。\n5. 时间复杂度：O(n + m)，空间复杂度：O(n + m)。"
      }
    ]
  },
{
    category: "图论",
    title: "欧拉路与欧拉回路",
    minutes: "区域赛",
    goal: "掌握欧拉路和欧拉回路的判定条件和求法。",
    check: "能判断图是否存在欧拉路/回路，能用 Fleury 或 Hierholzer 算法求解。",
    intro: "欧拉路是经过每条边恰好一次的路径，欧拉回路是起点和终点相同的欧拉路。",
    topics: [
      "欧拉路判定",
      "欧拉回路判定",
      "Fleury 算法",
      "Hierholzer 算法",
      "有向图欧拉路",
      "混合图欧拉路",
    ],
    mustKnow: [
      "无向图欧拉回路：所有节点度数为偶数。",
      "无向图欧拉路：恰好两个节点度数为奇数。",
      "有向图欧拉回路：所有节点入度等于出度。",
    ],
    pitfalls: [
      "欧拉路判定要先检查连通性。",
      "Hierholzer 算法要注意回溯时记录边。",
      "有向图和无向图的判定条件不同。",
    ],
    steps: [
      "欧拉路是经过图中每条边恰好一次的路径，欧拉回路是起点和终点重合的欧拉路。这个问题源自著名的哥尼斯堡七桥问题，是图论中最经典的问题之一。",
      "判定条件很简单：无向图存在欧拉回路当且仅当所有节点度数为偶数且图连通；存在欧拉路当且仅当恰好两个节点度数为奇数。有向图则要求所有节点入度等于出度（回路），或恰好一个点出度比入度大 1、一个点入度比出度大 1（路径）。求解用 Hierholzer 算法：从起点出发沿未访问的边走，走到死胡同时回溯记录节点，最终反转即得路径。",
      "举个例子：给一个有向图求字典序最小的欧拉路，先检查度数条件确定起点，然后对每个点的邻居排序，用 Hierholzer 算法从起点出发，回溯时记录节点，最后反转输出。",
      "求欧拉路之前一定要先检查连通性，否则度数条件满足但图不连通也会出错。Hierholzer 算法要注意每条边只能走一次，回溯时记录的才是正确路径。无向图和有向图的判定条件不同，不要混淆。",
      "适用场景：当题目要求恰好经过每条边一次、或者一笔画问题时，应该想到欧拉路和欧拉回路。"
    ],
    code: `// Hierholzer 算法求欧拉回路
vector<int> eulerPath;
vector<vector<pair<int, int>>> adj;
vector<bool> used;

void hierholzer(int u) {
    while (!adj[u].empty()) {
        auto [v, idx] = adj[u].back();
        adj[u].pop_back();
        if (used[idx]) continue;
        used[idx] = true;
        hierholzer(v);
    }
    eulerPath.push_back(u);
}`,
    examples: [
      {
        title: "洛谷 P7771 【模板】欧拉路径",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P7771",
        description: "给定一个有向图，求一条欧拉路径。",
        solution: "使用 Hierholzer 算法求解。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> inDeg(n + 1, 0), outDeg(n + 1, 0);

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        outDeg[u]++;
        inDeg[v]++;
    }

    // 检查是否存在欧拉路径
    int start = 1, end = 1;
    bool hasPath = true;
    for (int i = 1; i <= n; i++) {
        if (outDeg[i] - inDeg[i] == 1) {
            start = i;
        } else if (inDeg[i] - outDeg[i] == 1) {
            end = i;
        } else if (inDeg[i] != outDeg[i]) {
            hasPath = false;
            break;
        }
    }

    if (!hasPath) {
        cout << "No" << endl;
        return 0;
    }

    // 排序边，保证字典序最小
    for (int i = 1; i <= n; i++) {
        sort(adj[i].begin(), adj[i].end());
    }

    // Hierholzer 算法
    vector<int> path;
    stack<int> stk;
    stk.push(start);

    while (!stk.empty()) {
        int u = stk.top();
        if (!adj[u].empty()) {
            int v = adj[u].back();
            adj[u].pop_back();
            stk.push(v);
        } else {
            path.push_back(u);
            stk.pop();
        }
    }

    reverse(path.begin(), path.end());
    for (int x : path) cout << x << " ";
    cout << endl;

    return 0;
}`,
        explanation: "1. 检查欧拉路径存在性：恰好一个点出度比入度大 1（起点），一个点入度比出度大 1（终点）。\n2. 排序边保证字典序最小。\n3. Hierholzer 算法：使用栈模拟 DFS，回溯时记录节点。\n4. 时间复杂度：O(m log m)，空间复杂度：O(n + m)。"
      }
    ]
  },
{
    category: "图论",
    title: "二分图与匹配",
    minutes: "区域赛",
    goal: "掌握二分图的判定、最大匹配、最小点覆盖、最大独立集等概念。",
    check: "能写匈牙利算法求二分图最大匹配，理解 König 定理。",
    intro: "二分图是节点可以分成两部分，每条边连接不同部分的图。匹配问题是选择最多的不相邻边。",
    topics: [
      "二分图判定",
      "匈牙利算法",
      "Hopcroft-Karp 算法",
      "最大匹配",
      "最小点覆盖",
      "最大独立集",
      "König 定理",
      "DAG 最小路径覆盖",
    ],
    mustKnow: [
      "二分图判定：不存在奇环。",
      "最大匹配 = 最小点覆盖（König 定理）。",
      "最大独立集 = 节点数 - 最小点覆盖。",
    ],
    pitfalls: [
      "匈牙利算法每次匹配前要清空 vis 数组。",
      "Hopcroft-Karp 算法的 BFS 要正确维护距离。",
      "DAG 最小路径覆盖要拆点。",
    ],
    steps: [
      "二分图是顶点可以分成两个集合、所有边都连接不同集合中顶点的图。匹配是在图中选择一组没有公共顶点的边，最大匹配就是选出尽可能多的这样的边。",
      "匈牙利算法通过不断寻找增广路来扩大匹配：从每个未匹配的左部节点出发，用 DFS 找一条交替路（匹配边和非匹配边交替），如果找到一个未匹配的右部节点，就沿路翻转匹配状态，匹配数加一。König 定理告诉我们最大匹配等于最小点覆盖，最大独立集等于总节点数减去最小点覆盖。",
      "举个例子：有 n 个工人和 m 个任务，每个工人能做某些任务，求最多能分配多少个任务。这就是典型的二分图最大匹配，工人和任务分别在左右两部，能做的关系连边，匈牙利算法直接求解。",
      "匈牙利算法每次增广前一定要清空 vis 数组，否则会误判已访问节点。DAG 最小路径覆盖需要把每个点拆成入点和出点，转化为二分图匹配问题。Hopcroft-Karp 算法用 BFS 分层后再 DFS，复杂度更优。",
      "适用场景：当题目涉及两组对象之间的配对关系、或者问最多能选多少条不相交的边时，应该想到二分图匹配。"
    ],
    code: `// 匈牙利算法
vector<int> match;
vector<bool> vis;
bool dfs(int u, vector<vector<int>>& adj) {
    for (int v : adj[u]) {
        if (vis[v]) continue;
        vis[v] = true;
        if (match[v] == 0 || dfs(match[v], adj)) {
            match[v] = u;
            return true;
        }
    }
    return false;
}

int hungarian(int n, vector<vector<int>>& adj) {
    match.assign(n + 1, 0);
    int ans = 0;
    for (int u = 1; u <= n; u++) {
        vis.assign(n + 1, false);
        if (dfs(u, adj)) ans++;
    }
    return ans;
}`,
    examples: [
      {
        title: "洛谷 P3386 【模板】二分图最大匹配",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3386",
        description: "给定一个二分图，求最大匹配数。",
        solution: "使用匈牙利算法求解。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, e;
    cin >> n >> m >> e;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < e; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }

    vector<int> match(m + 1, 0);
    vector<bool> vis(m + 1);
    int ans = 0;

    function<bool(int)> dfs = [&](int u) -> bool {
        for (int v : adj[u]) {
            if (vis[v]) continue;
            vis[v] = true;
            if (match[v] == 0 || dfs(match[v])) {
                match[v] = u;
                return true;
            }
        }
        return false;
    };

    for (int u = 1; u <= n; u++) {
        fill(vis.begin(), vis.end(), false);
        if (dfs(u)) ans++;
    }

    cout << ans << endl;
    return 0;
}`,
        explanation: "1. 匈牙利算法：使用 DFS 找增广路。\n2. match[v] 表示右部节点 v 匹配的左部节点。\n3. vis[v] 用于避免重复访问。\n4. 每次匹配前要清空 vis 数组。\n5. 时间复杂度：O(nm)，空间复杂度：O(n + m)。"
      }
    ]
  },
{
    category: "图论",
    title: "树链剖分",
    minutes: "区域赛",
    goal: "掌握树链剖分的原理和应用，能处理树上路径修改和查询问题。",
    check: "能写出树链剖分的预处理和路径操作代码，理解重链剖分的意义。",
    intro: "树链剖分将树分成若干条链，使得任意路径可以表示为 O(log n) 条链的并，从而用线段树维护。",
    topics: [
      "重链剖分",
      "轻重链划分",
      "DFS 序",
      "路径修改",
      "路径查询",
      "子树修改",
      "子树查询",
    ],
    mustKnow: [
      "重链剖分：选择子树最大的儿子作为重儿子。",
      "DFS 序：将树转化为序列，子树是连续区间。",
      "路径操作：沿重链向上跳，每次处理一条链。",
    ],
    pitfalls: [
      "线段树维护的是 DFS 序，不是原节点编号。",
      "路径操作时要注意 LCA 的处理。",
      "子树操作时要利用 DFS 序的连续性。",
    ],
    steps: [
      "树链剖分是把一棵树拆成若干条链，使得树上任意两点之间的路径可以表示为不超过 O(log n) 条链的拼接，从而用线段树等数据结构来维护路径上的修改和查询。",
      "核心思想是重链剖分：第一次 DFS 计算每个节点的子树大小，标记子树最大的儿子为重儿子；第二次 DFS 优先沿重儿子走形成重链，给每个节点分配一个 DFS 序编号。路径操作时，两个节点沿各自的重链向上跳，每次跳一整条链并用线段树处理，直到跳到同一条链上。",
      "举个例子：给一棵树支持路径加值和路径求和。用树链剖分预处理后，路径修改时两个端点不断跳链头，每跳一次就在线段树上做一次区间操作，复杂度 O(log^2 n)。子树操作更简单，因为子树在 DFS 序上是连续区间，一次线段树区间操作即可。",
      "线段树维护的是 DFS 序对应的值，不是原节点编号，初始化时要按 pos 数组建树。路径操作中 LCA 的处理要小心，两个节点跳到同一条链后要比较深度，浅的那个才是 LCA。",
      "适用场景：当题目在树上要求路径修改加路径查询、或者子树修改加子树查询时，应该想到树链剖分配合线段树。"
    ],
    code: `// 树链剖分
vector<int> parent, depth, heavy, head, pos;
int curPos = 0;

int dfs(int u, int p, vector<vector<int>>& adj) {
    parent[u] = p;
    depth[u] = depth[p] + 1;
    int size = 1, maxSubSize = 0;

    for (int v : adj[u]) {
        if (v == p) continue;
        int subSize = dfs(v, u, adj);
        size += subSize;
        if (subSize > maxSubSize) {
            maxSubSize = subSize;
            heavy[u] = v;
        }
    }
    return size;
}

void decompose(int u, int h, vector<vector<int>>& adj) {
    head[u] = h;
    pos[u] = ++curPos;

    if (heavy[u] != 0) decompose(heavy[u], h, adj);
    for (int v : adj[u]) {
        if (v != parent[u] && v != heavy[u]) decompose(v, v, adj);
    }
}

// 路径修改
void updatePath(int u, int v, long long val, SegmentTree& seg) {
    while (head[u] != head[v]) {
        if (depth[head[u]] < depth[head[v]]) swap(u, v);
        seg.update(pos[head[u]], pos[u], val);
        u = parent[head[u]];
    }
    if (depth[u] > depth[v]) swap(u, v);
    seg.update(pos[u], pos[v], val);
}`,
    examples: [
      {
        title: "洛谷 P3384 【模板】树链剖分",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P3384",
        description: "给定一棵树，支持路径修改、路径查询、子树修改、子树查询。",
        solution: "使用树链剖分 + 线段树求解。",
        code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct SegmentTree {
    int n;
    vector<ll> tree, lazy;
    SegmentTree(int n) : n(n), tree(4 * n), lazy(4 * n) {}

    void pushDown(int node, int start, int end) {
        if (lazy[node]) {
            int mid = (start + end) / 2;
            tree[2 * node] += lazy[node] * (mid - start + 1);
            tree[2 * node + 1] += lazy[node] * (end - mid);
            lazy[2 * node] += lazy[node];
            lazy[2 * node + 1] += lazy[node];
            lazy[node] = 0;
        }
    }

    void update(int l, int r, ll val, int node = 1, int start = 1, int end = -1) {
        if (end == -1) end = n;
        if (r < start || end < l) return;
        if (l <= start && end <= r) {
            tree[node] += val * (end - start + 1);
            lazy[node] += val;
            return;
        }
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        update(l, r, val, 2 * node, start, mid);
        update(l, r, val, 2 * node + 1, mid + 1, end);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    ll query(int l, int r, int node = 1, int start = 1, int end = -1) {
        if (end == -1) end = n;
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        return query(l, r, 2 * node, start, mid) + query(l, r, 2 * node + 1, mid + 1, end);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, root;
    cin >> n >> m >> root;
    vector<ll> val(n + 1);
    for (int i = 1; i <= n; i++) cin >> val[i];

    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> parent(n + 1), depth(n + 1), heavy(n + 1, 0), head(n + 1), pos(n + 1);
    int curPos = 0;

    function<int(int, int)> dfs = [&](int u, int p) -> int {
        parent[u] = p;
        depth[u] = depth[p] + 1;
        int size = 1, maxSubSize = 0;
        for (int v : adj[u]) {
            if (v == p) continue;
            int subSize = dfs(v, u);
            size += subSize;
            if (subSize > maxSubSize) {
                maxSubSize = subSize;
                heavy[u] = v;
            }
        }
        return size;
    };

    function<void(int, int)> decompose = [&](int u, int h) {
        head[u] = h;
        pos[u] = ++curPos;
        if (heavy[u]) decompose(heavy[u], h);
        for (int v : adj[u]) {
            if (v != parent[u] && v != heavy[u]) decompose(v, v);
        }
    };

    dfs(root, 0);
    decompose(root, root);

    SegmentTree seg(n);
    for (int i = 1; i <= n; i++) seg.update(pos[i], pos[i], val[i]);

    while (m--) {
        int op, u, v;
        ll val;
        cin >> op;
        if (op == 1) {
            cin >> u >> v >> val;
            while (head[u] != head[v]) {
                if (depth[head[u]] < depth[head[v]]) swap(u, v);
                seg.update(pos[head[u]], pos[u], val);
                u = parent[head[u]];
            }
            if (depth[u] > depth[v]) swap(u, v);
            seg.update(pos[u], pos[v], val);
        } else if (op == 2) {
            cin >> u >> v;
            ll ans = 0;
            while (head[u] != head[v]) {
                if (depth[head[u]] < depth[head[v]]) swap(u, v);
                ans += seg.query(pos[head[u]], pos[u]);
                u = parent[head[u]];
            }
            if (depth[u] > depth[v]) swap(u, v);
            ans += seg.query(pos[u], pos[v]);
            cout << ans << endl;
        } else if (op == 3) {
            cin >> u >> val;
            seg.update(pos[u], pos[u] + /* subtree size */ - 1, val);
        } else {
            cin >> u;
            cout << seg.query(pos[u], pos[u] + /* subtree size */ - 1) << endl;
        }
    }

    return 0;
}`,
        explanation: "1. 树链剖分：将树分成若干条链，使得任意路径可以表示为 O(log n) 条链的并。\n2. 重链剖分：选择子树最大的儿子作为重儿子。\n3. DFS 序：将树转化为序列，子树是连续区间。\n4. 路径操作：沿重链向上跳，每次处理一条链。\n5. 时间复杂度：O(n log²n)，空间复杂度：O(n)。"
      }
    ]
  },
{
    category: "图论",
    title: "2-SAT 问题",
    minutes: "区域赛",
    goal: "掌握 2-SAT 问题的建图方法和求解算法。",
    check: "能正确建蕴含图，用 SCC 判断是否有解并构造方案。",
    intro: "2-SAT 是一种特殊的布尔可满足性问题，每个子句恰好有两个变量。可以通过蕴含图和 SCC 求解。",
    topics: [
      "蕴含图",
      "SCC 判定",
      "方案构造",
      "字典序最小方案",
      "前缀优化",
    ],
    mustKnow: [
      "蕴含图：对于每个子句 (a ∨ b)，添加边 (¬a → b) 和 (¬b → a)。",
      "有解判定：不存在变量 x 使得 x 和 ¬x 在同一 SCC。",
      "方案构造：取 SCC 编号较小的方案。",
    ],
    pitfalls: [
      "蕴含图的边要正确，避免遗漏。",
      "SCC 编号不一定是拓扑序，要取反图的拓扑序。",
      "字典序最小方案需要用更复杂的算法。",
    ],
    steps: [
      "2-SAT 是一种特殊的布尔可满足性问题：有 n 个布尔变量，每个子句恰好包含两个变量的或运算（如 x1 或 非x2），问是否存在一种赋值方案满足所有子句。",
      "核心思想是建蕴含图：对于每个子句 (a 或 b)，添加两条边 (非a -> b) 和 (非b -> a)，含义是如果 a 为假则 b 必须为真。然后对蕴含图求 SCC，如果某个变量 x 和非x 在同一个 SCC 中则无解，否则有解。构造方案时，取 SCC 编号较大的那个值作为该变量的赋值。",
      "举个例子：有 3 个变量和 4 个子句，建出蕴含图后用 Tarjan 求 SCC。如果变量 1 的正节点在 SCC 编号 3，负节点在 SCC 编号 5，则取编号大的负节点，即变量 1 赋值为假。",
      "蕴含图的边一定要正确添加，每个子句对应两条边，遗漏任何一条都会导致错误结果。SCC 编号不一定对应拓扑序，需要取反图的拓扑序或者直接比较 comp 值大小。如果需要字典序最小的方案，不能简单比较 SCC 编号，需要用更复杂的 DPLL 算法。",
      "适用场景：当题目涉及布尔变量的或运算约束、且每个约束恰好包含两个变量时，应该想到 2-SAT。常见于选择问题：每个事物有两种状态，某些状态组合互相矛盾。"
    ],
    code: `// 2-SAT
int n; // 变量数
vector<vector<int>> adj, adjT; // 蕴含图和反图
vector<int> order, comp;
vector<bool> assignment;

void addClause(int a, bool na, int b, bool nb) {
    // 添加子句 (a_op ∨ b_op)
    // na = true 表示 ¬a, nb = true 表示 ¬b
    int aNode = 2 * a + (na ? 1 : 0);
    int bNode = 2 * b + (nb ? 1 : 0);
    adj[aNode ^ 1].push_back(bNode);
    adj[bNode ^ 1].push_back(aNode);
}

bool solve2SAT() {
    // Tarjan SCC
    vector<int> dfn(2 * n, 0), low(2 * n, 0), stk(2 * n);
    vector<bool> inStack(2 * n, false);
    int timer = 0, top = 0, sccCnt = 0;
    comp.assign(2 * n, -1);

    function<void(int)> tarjan = [&](int u) {
        dfn[u] = low[u] = ++timer;
        stk[++top] = u;
        inStack[u] = true;
        for (int v : adj[u]) {
            if (!dfn[v]) {
                tarjan(v);
                low[u] = min(low[u], low[v]);
            } else if (inStack[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }
        if (dfn[u] == low[u]) {
            while (true) {
                int v = stk[top--];
                inStack[v] = false;
                comp[v] = sccCnt;
                if (v == u) break;
            }
            sccCnt++;
        }
    };

    for (int i = 0; i < 2 * n; i++) {
        if (!dfn[i]) tarjan(i);
    }

    // 检查是否有解
    assignment.assign(n, false);
    for (int i = 0; i < n; i++) {
        if (comp[2 * i] == comp[2 * i + 1]) return false;
        assignment[i] = comp[2 * i] > comp[2 * i + 1];
    }
    return true;
}`,
    examples: [
      {
        title: "洛谷 P4782 【模板】2-SAT",
        source: "洛谷",
        link: "https://www.luogu.com.cn/problem/P4782",
        description: "给定 n 个变量和 m 个子句，每个子句形如 (a_op ∨ b_op)，判断是否有解并构造方案。",
        solution: "使用 2-SAT 算法求解。",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(2 * n);
    for (int i = 0; i < m; i++) {
        int a, b, va, vb;
        cin >> a >> va >> b >> vb;
        a--, b--;
        // (a == va) ∨ (b == vb)
        // ¬(a == va) → (b == vb)
        // ¬(b == vb) → (a == va)
        int aNode = 2 * a + (va ? 0 : 1);
        int bNode = 2 * b + (vb ? 0 : 1);
        adj[aNode ^ 1].push_back(bNode);
        adj[bNode ^ 1].push_back(aNode);
    }

    // Tarjan SCC
    vector<int> dfn(2 * n, 0), low(2 * n, 0), stk(2 * n), comp(2 * n, -1);
    vector<bool> inStack(2 * n, false);
    int timer = 0, top = 0, sccCnt = 0;

    function<void(int)> tarjan = [&](int u) {
        dfn[u] = low[u] = ++timer;
        stk[++top] = u;
        inStack[u] = true;
        for (int v : adj[u]) {
            if (!dfn[v]) {
                tarjan(v);
                low[u] = min(low[u], low[v]);
            } else if (inStack[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }
        if (dfn[u] == low[u]) {
            while (true) {
                int v = stk[top--];
                inStack[v] = false;
                comp[v] = sccCnt;
                if (v == u) break;
            }
            sccCnt++;
        }
    };

    for (int i = 0; i < 2 * n; i++) {
        if (!dfn[i]) tarjan(i);
    }

    // 检查是否有解
    for (int i = 0; i < n; i++) {
        if (comp[2 * i] == comp[2 * i + 1]) {
            cout << "IMPOSSIBLE" << endl;
            return 0;
        }
    }

    // 构造方案
    cout << "POSSIBLE" << endl;
    for (int i = 0; i < n; i++) {
        cout << (comp[2 * i] > comp[2 * i + 1] ? 1 : 0) << " ";
    }
    cout << endl;

    return 0;
}`,
        explanation: "1. 建蕴含图：对于每个子句 (a_op ∨ b_op)，添加边 (¬a_op → b_op) 和 (¬b_op → a_op)。\n2. Tarjan SCC：求强连通分量。\n3. 有解判定：不存在变量 x 使得 x 和 ¬x 在同一 SCC。\n4. 方案构造：取 SCC 编号较大的方案。\n5. 时间复杂度：O(n + m)，空间复杂度：O(n + m)。"
      }
    ]
  },
{
    category: "杂项技巧",
    title: "模板库、调试与组队策略",
    minutes: "实战",
    goal: "把算法能力转成比赛得分：模板可靠、分工清楚、调试快速、提交稳。",
    check: "能维护自己的模板库，并用对拍、断言、随机测试定位错误。",
    intro: "ICPC/CCPC 是团队赛。会算法还不够，还要会判断题目难度、分配时间、快速验证和管理模板。",
    topics: [
      "模板库整理",
      "代码风格",
      "断言",
      "对拍",
      "随机数据生成",
      "边界测试",
      "复杂度复盘",
      "团队分工",
      "罚时控制",
      "读题记录",
      "题目分类",
      "赛后补题",
    ],
    mustKnow: [
      "每个模板都要有最小可运行样例。",
      "遇到 WA 先查边界、溢出、初始化和多组数据清空。",
      "赛后补题要写下错因，而不是只 AC。",
    ],
    pitfalls: [
      "模板太多但没练熟，比赛时反而拖慢。",
      "多人同时改同一份代码容易引入新 bug。",
      "长时间卡一题要及时切换，避免全队停摆。",
    ],
    steps: [
      "模板库、调试与组队策略是把算法能力转化为比赛得分的最后一步。再强的算法，如果模板不可靠、调试太慢、分工不合理，也拿不到好成绩。",
      "模板库方面，每个常用算法（线段树、网络流、KMP 等）准备一份经过验证的模板，附带最小可运行样例。调试方面，遇到 WA 先查边界、溢出、初始化和多组数据清空，用对拍（随机数据对比暴力与正解）定位错误最高效。组队方面，三人分工明确，一人读题分类，两人写码，长时间卡一题要果断切换。",
      "举个例子：比赛时遇到一道图论题，先由一人读题判断难度并分配，另一人直接从模板库调出网络流代码，改一下输入格式即可提交。如果 WA 了，立刻用对拍器生成随机数据，和暴力解对比找到反例。",
      "模板太多但没练熟反而拖慢速度，所以每个模板至少独立手写过两三遍。多人同时改同一份代码容易引入新 bug，最好一人写完再交给另一人检查。赛后补题不能只 AC 就完事，要写下错因和教训。",
      "适用场景：每次比赛前都应该检查模板库是否就绪，比赛时遇到调试困难立刻想到对拍，团队赛中保持沟通避免重复劳动。这些软实力决定了能否把会做的题全部拿分。"
    ],
    code: `// 对拍基本流程：brute.cpp 暴力，std.cpp 正解，gen.cpp 随机数据。
// for test in {1..10000}; do
//   ./gen > input.txt
//   ./brute < input.txt > brute.out
//   ./std < input.txt > std.out
//   diff brute.out std.out || break
// done`,
    examples: [
      { title: "模板验收表", source: "洛谷", link: "https://www.luogu.com.cn/", description: "针对10个常用模板编写最小样例", solution: "覆盖空、极小、重复、极大输入", code: "见模板", explanation: "模板必须有可运行样例" },
      { title: "随机对拍器", source: "洛谷", link: "https://www.luogu.com.cn/", description: "编写随机数据生成器对比暴力与正解", solution: "自动循环运行并diff", code: "见模板", explanation: "对拍是调试利器" }
    ]
  },

  {category:"基础算法",title:"递归与分治",minutes:"基础",goal:"理解递归本质，掌握分治法与记忆化搜索。",check:"能写出归并排序求逆序对。",intro:"递归是算法的基石。分治法将问题分解为子问题分别求解再合并。",topics:["数学归纳法","调用栈","主定理","分治法","记忆化搜索","剪枝","递归转迭代"],mustKnow:["递归三要素：基准情况、规模递减、自调用","记忆化搜索=自顶向下DP"],pitfalls:["递归深度过大栈溢出","忘记恢复状态"],steps:["递归是函数调用自身，分治是将大问题拆成小问题分别解决","选择基准情况、设计递归方程、合并子问题结果","归并排序：将数组一分为二分别排序再合并，合并时统计逆序对","注意递归深度防止栈溢出，记忆化避免重复计算","适用于可分解为独立子问题的场景，如排序、搜索、数学计算"],code:`// 归并排序求逆序对\nusing ll=long long;\nll msort(vector<int>&a,int l,int r){\n  if(l>=r)return 0;int m=(l+r)/2;\n  ll cnt=msort(a,l,m)+msort(a,m+1,r);\n  vector<int>t;int i=l,j=m+1;\n  while(i<=m&&j<=r){\n    if(a[i]<=a[j])t.push_back(a[i++]);\n    else{t.push_back(a[j++]);cnt+=m-i+1;}\n  }\n  while(i<=m)t.push_back(a[i++]);\n  while(j<=r)t.push_back(a[j++]);\n  for(int k=0;k<(int)t.size();k++)a[l+k]=t[k];\n  return cnt;\n}`,examples:[{title:"P1908 逆序对",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1908",description:"求逆序对数量",solution:"归并排序",code:"见模板",explanation:"合并时统计"},{title:"P1962 斐波那契",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1962",description:"矩阵快速幂",solution:"O(log n)",code:"见模板",explanation:"转移矩阵"}]},
  {category:"搜索与博弈",title:"深度优先搜索 (DFS)",minutes:"基础",goal:"掌握DFS框架与回溯三部曲。",check:"能用DFS实现全排列、N皇后。",intro:"DFS一条路走到黑。回溯三要素：选择、探索、撤销。",topics:["递归DFS","迭代DFS","回溯","剪枝","Tarjan","拓扑排序","IDA*"],mustKnow:["vis入队前标记","回溯核心：选择→探索→撤销"],pitfalls:["vis标记时机错","忘记撤销状态","剪枝写错"],steps:["DFS沿一条路径深入探索到底再回溯，用栈或递归实现","标记已访问节点、遍历邻居、递归探索、回溯撤销","N皇后问题：逐行放置皇后，冲突时回溯尝试下一列","入队前标记vis防止重复访问，回溯时记得撤销状态","适用于路径搜索、排列组合、连通性判断等场景"],code:`// DFS框架\nbool vis[N];vector<int>g[N];\nvoid dfs(int u){vis[u]=true;for(int v:g[u])if(!vis[v])dfs(v);}\n// 回溯\nvector<int>path;bool used[N];\nvoid bt(int k){if(k>n){处理;return;}for(int i=1;i<=n;i++)if(!used[i]){path.push_back(i);used[i]=1;bt(k+1);path.pop_back();used[i]=0;}}`,examples:[{title:"P1434 滑雪",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1434",description:"最长递减路径",solution:"记忆化搜索",code:"见模板",explanation:"DAG最长路"},{title:"N皇后",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1219",description:"N皇后问题",solution:"逐行回溯",code:"见模板",explanation:"col/dg/udg"}]},
  {category:"搜索与博弈",title:"广度优先搜索 (BFS)",minutes:"基础",goal:"掌握BFS框架，理解无权图最短路。",check:"能用BFS求网格最短路。",intro:"BFS层次遍历，无权图天然求最短路。",topics:["层次遍历","队列+距离数组","状态空间搜索","双向BFS","多源BFS"],mustKnow:["入队前标记vis","d[]兼作访问标记"],pitfalls:["出队才标记导致重复入队","忘记d[s]=0"],steps:["BFS逐层扩展，用队列实现，天然求无权图最短路","将起点入队、逐个出队并扩展未访问邻居、记录距离","网格迷宫最短路：从起点开始逐层扩展直到找到终点","入队前标记vis防止重复，d数组兼作距离和访问标记","适用于无权图最短路、层次遍历、状态空间搜索"],code:`// BFS\nint d[N];vector<int>g[N];\nvoid bfs(int s){memset(d,-1,sizeof(d));queue<int>q;d[s]=0;q.push(s);while(!q.empty()){int u=q.front();q.pop();for(int v:g[u])if(d[v]==-1){d[v]=d[u]+1;q.push(v);}}}`,examples:[{title:"P1443 马的遍历",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1443",description:"棋盘最短步数",solution:"网格BFS",code:"见模板",explanation:"8方向"},{title:"P1126 机器人",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1126",description:"多维状态BFS",solution:"状态空间",code:"见模板",explanation:"(x,y,dir)"}]},
  {category:"搜索与博弈",title:"Flood Fill与连通块",minutes:"基础",goal:"掌握Flood Fill求连通块。",check:"能实现网格连通块计数。",intro:"Flood Fill遍历同属性邻居，寻找连通块。",topics:["连通块","DFS/BFS实现","四连通八连通","反向填充"],mustKnow:["DFS可能栈溢出","BFS更安全"],pitfalls:["vis未重置","连通规则选错"],steps:["Flood Fill从某点出发遍历所有相邻同属性格子形成连通块","选择起点、递归或迭代扩展四方向或八方向邻居","统计网格中岛屿数量：遍历未访问的陆地格子并标记整个岛屿","注意连通规则选择四连通或八连通，DFS可能栈溢出用BFS更安全","适用于图像处理、地图分析、游戏区域填充等场景"],code:`// Flood Fill\nint dx[]={0,0,1,-1},dy[]={1,-1,0,0};\nvoid dfs(int x,int y,char c){if(x<0||x>=n||y<0||y>=m||vis[x][y]||g[x][y]!=c)return;vis[x][y]=1;for(int i=0;i<4;i++)dfs(x+dx[i],y+dy[i],c);}`,examples:[{title:"P1514 引水入城",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1514",description:"源头覆盖",solution:"BFS",code:"见模板",explanation:"贪心"},{title:"P1501 洞穴填充",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1501",description:"边界BFS",solution:"反向Fill",code:"见模板",explanation:"未标记为圈内"}]},
  {category:"搜索与博弈",title:"回溯法",minutes:"基础",goal:"掌握回溯框架与剪枝。",check:"能用回溯解决组合排列。",intro:"回溯=带约束DFS。核心：选择、探索、撤销。",topics:["三要素","N皇后","组合排列","剪枝","对称性破除"],mustKnow:["选择→探索→撤销","跳过同层重复"],pitfalls:["忘记撤销","剪枝写错"],steps:["回溯是带约束的DFS，在搜索树中寻找满足条件的解","做出选择、递归探索、撤销选择三步循环","组合问题：从N个数中选K个，保持升序避免重复","跳过同层重复元素避免重复解，剪枝减少搜索空间","适用于组合、排列、子集、约束满足等问题"],code:`// N皇后\nint col[N],dg[2*N],udg[2*N];\nvoid nq(int r){if(r>n){cnt++;return;}for(int c=1;c<=n;c++)if(!col[c]&&!dg[r+c]&&!udg[r-c+n]){col[c]=dg[r+c]=udg[r-c+n]=1;nq(r+1);col[c]=dg[r+c]=udg[r-c+n]=0;}}`,examples:[{title:"N皇后",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1219",description:"N皇后",solution:"回溯",code:"见模板",explanation:"O(1)检查"},{title:"组合",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1157",description:"N选K",solution:"升序选数",code:"见模板",explanation:"dfs(lsi,cnt)"}]},
  {category:"搜索与博弈",title:"搜索进阶",minutes:"提高",goal:"掌握折半搜索、IDA*、Alpha-Beta。",check:"理解折半搜索复杂度优势。",intro:"高级搜索：折半、IDA*、对抗搜索、模拟退火。",topics:["折半搜索","IDA*","Alpha-Beta","双向搜索","模拟退火"],mustKnow:["折半O(k^(N/2))","IDA*=迭代加深+估价"],pitfalls:["合并逻辑错","估价不可采纳"],steps:["高级搜索技巧包括折半搜索降低复杂度、IDA*限制深度、对抗搜索","折半将搜索空间一分为二分别枚举再合并，IDA*迭代加深加估价函数","折半搜索：枚举前半部分存入哈希表再枚举后半部分查表合并","估价函数必须可采纳即不高估，折半合并逻辑要正确","适用于状态空间大需要优化的搜索问题和博弈对抗场景"],code:`// Alpha-Beta\nint ab(int d,int a,int b,int p){if(!d||end())return eval();if(!p){int v=-INF;for(auto&m:ms()){do(m);v=max(v,ab(d-1,a,b,1));undo(m);a=max(a,v);if(a>=b)break;}return v;}else{int v=INF;for(auto&m:ms()){do(m);v=min(v,ab(d-1,a,b,0));undo(m);b=min(b,v);if(b<=a)break;}return v;}}`,examples:[{title:"P2324 骑士精神",source:"洛谷",link:"https://www.luogu.com.cn/problem/P2324",description:"IDA*",solution:"迭代加深",code:"见模板",explanation:"有限深度"},{title:"折半搜索",source:"洛谷",link:"https://www.luogu.com.cn/",description:"分两半",solution:"哈希合并",code:"见模板",explanation:"O(k^(N/2))"}]},
  {category:"搜索与博弈",title:"01-BFS",minutes:"提高",goal:"掌握01-BFS算法。",check:"能用01-BFS解决边权0/1最短路。",intro:"01-BFS用双端队列，权0加队首权1加队尾，O(V+E)。",topics:["双端队列","正确性","与Dijkstra联系","迷宫染色"],mustKnow:["权0队首权1队尾","O(V+E)"],pitfalls:["未识别0/1代价","deque操作错"],steps:["01-BFS用双端队列处理边权只有0和1的最短路问题","权为0的边加入队首权为1的边加入队尾保证距离单调","网格旋转问题：不旋转代价为0加队首旋转代价为1加队尾","必须识别出边权是0或1才能使用，deque操作方向不要搞反","适用于边权为0或1的最短路、网格转向代价等问题"],code:`// 01-BFS\ndeque<pair<int,int>>dq;int d[N];memset(d,0x3f,sizeof(d));d[s]=0;dq.push_front(s);while(!dq.empty()){auto u=dq.front();dq.pop_front();for(邻居v){int c=cost;if(d[v]>d[u]+c){d[v]=d[u]+c;if(!c)dq.push_front(v);else dq.push_back(v);}}}`,examples:[{title:"P4667 电路维修",source:"洛谷",link:"https://www.luogu.com.cn/problem/P4667",description:"01-BFS经典",solution:"代价0/1",code:"见模板",explanation:"建模"},{title:"UVA11573",source:"UVA",link:"https://onlinejudge.org/",description:"顺流代价0",solution:"01-BFS",code:"见模板",explanation:"多组询问"}]},
  {category:"基础算法",title:"排序算法",minutes:"基础",goal:"掌握归并快排及竞赛延伸。",check:"能手写归并排序求逆序对。",intro:"排序基础，比较下界Omega(NlogN)。覆盖归并快排CDQ分治。",topics:["比较下界","归并+逆序对","快排随机化","std::sort","严格弱序","CDQ分治"],mustKnow:["归并可统计逆序对","快排随机化","严格弱序"],pitfalls:["比较违反弱序UB","快排退化","离散化忘去重"],steps:["掌握经典排序算法原理及其竞赛中的扩展应用","归并排序分治合并，快排随机选基准划分，CDQ分治处理多维","归并排序求逆序对：合并时左边大于右边则贡献逆序对","比较函数必须满足严格弱序，快排随机化防退化，离散化去重","适用于逆序对统计、多维偏序、自定义排序等竞赛场景"],code:`// 归并求逆序对\nusing ll=long long;\nll ms(vector<int>&a,int l,int r){if(l>=r)return 0;int m=(l+r)/2;ll c=ms(a,l,m)+ms(a,m+1,r);vector<int>t;int i=l,j=m+1;while(i<=m&&j<=r){if(a[i]<=a[j])t.push_back(a[i++]);else{t.push_back(a[j++]);c+=m-i+1;}}while(i<=m)t.push_back(a[i++]);while(j<=r)t.push_back(a[j++]);for(int k=0;k<(int)t.size();k++)a[l+k]=t[k];return c;}`,examples:[{title:"P1908 逆序对",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1908",description:"求逆序对",solution:"归并",code:"见模板",explanation:"合并时统计"},{title:"P3810 三维偏序",source:"洛谷",link:"https://www.luogu.com.cn/problem/P3810",description:"CDQ分治",solution:"排序+归并+BIT",code:"见模板",explanation:"三维处理"}]},
  {category:"基础算法",title:"二分搜索",minutes:"基础",goal:"掌握二分模板与二分答案。",check:"能写出正确二分。",intro:"二分核心是单调性。覆盖整数实数二分、三分。",topics:["单调性","整数二分","实数二分","check设计","二分答案","三分"],mustKnow:["while(l<=r)记ans","实数固定100次","二分答案转判定"],pitfalls:["边界死循环","eps不当","三分非单峰"],steps:["二分利用单调性在有序空间中快速定位目标值","确定搜索范围、设计check函数、根据结果缩小区间","整数二分求满足条件的最大值：while(l<=r)根据check调整边界","注意边界条件防死循环，实数二分固定迭代次数，eps要合适","适用于有序查找、二分答案、最大化最小值等问题"],code:`// 整数二分\nint bs(int l,int r){int ans=-1;while(l<=r){int mid=l+(r-l)/2;if(check(mid)){ans=mid;l=mid+1;}else r=mid-1;}return ans;}\n// 三分\ndouble ts(double l,double r){for(int i=0;i<100;i++){double m1=l+(r-l)/3,m2=r-(r-l)/3;if(f(m1)<f(m2))r=m2;else l=m1;}return l;}`,examples:[{title:"P2678 跳石头",source:"洛谷",link:"https://www.luogu.com.cn/problem/P2678",description:"二分答案",solution:"二分+贪心",code:"见模板",explanation:"最大化最小值"},{title:"CF1355E",source:"Codeforces",link:"https://codeforces.com/problemset/problem/1355/E",description:"三分",solution:"凸函数",code:"见模板",explanation:"代价函数凸"}]},
  {category:"基础算法",title:"二分答案与分数规划",minutes:"提高",goal:"掌握二分答案与分数规划。",check:"能用二分答案解决最大化最小值。",intro:"二分答案转判定。分数规划优化比率型目标。",topics:["二分答案","check设计","分数规划","0/1分数规划","最优比率环","Dinkelbach"],mustKnow:["关键是check","wi=ai-mid*bi"],pitfalls:["单调性判断错","浮点精度"],steps:["二分答案将求解问题转化为判定问题，分数规划处理比率优化","猜测答案mid、设计check验证可行性、调整二分边界","跳石头问题：二分最小距离，check贪心验证能否移除足够石头","关键是设计正确的check函数，分数规划注意浮点精度","适用于最大化最小值、最小化最大值、最优比率等极值问题"],code:`// 二分答案\nbool check(int mid){return feasible;}\nint l=minv,r=maxv,ans=-1;while(l<=r){int mid=l+(r-l)/2;if(check(mid)){ans=mid;l=mid+1;}else r=mid-1;}`,examples:[{title:"P4377 Talent Show",source:"洛谷",link:"https://www.luogu.com.cn/problem/P4377",description:"分数规划+背包",solution:"最大化比值",code:"见模板",explanation:"二分+DP"},{title:"P3199 最小圈",source:"洛谷",link:"https://www.luogu.com.cn/problem/P3199",description:"最优比率环",solution:"二分+SPFA",code:"见模板",explanation:"分数规划+图论"}]},
  {category:"贪心",title:"贪心算法",minutes:"基础",goal:"掌握贪心正确性证明。",check:"能用交换论证证明贪心。",intro:"贪心核心：贪心选择性质+最优子结构。",topics:["贪心选择性质","活动安排","交换论证","区间问题","Huffman","反悔贪心"],mustKnow:["必须证明正确性","区间按结束排序","反悔用堆"],pitfalls:["未证明就用","排序关键字错","端点排序错"],steps:["贪心每步选局部最优解期望得到全局最优，需证明正确性","分析贪心选择性质、设计排序规则、证明交换论证","活动安排：按结束时间排序每次选最早结束的活动","必须证明贪心正确性，排序关键字和端点处理要仔细","适用于区间调度、Huffman编码、最优装载等具有贪心性质的问题"],code:`// 区间贪心\nstruct Iv{int l,r;};bool cmp(Iv a,Iv b){return a.r<b.r;}\nint solve(vector<Iv>&a){sort(a.begin(),a.end(),cmp);int c=0,last=-1;for(auto&v:a)if(v.l>=last){c++;last=v.r;}return c;}`,examples:[{title:"P1090 合并果子",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1090",description:"Huffman",solution:"合并最小两堆",code:"见模板",explanation:"优先队列"},{title:"P2949",source:"洛谷",link:"https://www.luogu.com.cn/problem/P2949",description:"反悔贪心",solution:"截止时间+堆",code:"见模板",explanation:"替换最小收益"}]},
  {category:"贪心",title:"贪心进阶",minutes:"区域赛",goal:"掌握邻项交换、模拟费用流。",check:"能用邻项交换推导排序准则。",intro:"邻项交换、模拟费用流、线性基。",topics:["邻项交换","反悔进阶","树上贪心","模拟费用流","线性基"],mustKnow:["邻项不影响其他","费用流用链表+堆","线性基高位到低位"],pitfalls:["忘维护链表","线性基顺序错"],steps:["进阶贪心技巧包括邻项交换推导排序、模拟费用流、线性基","邻项交换比较相邻元素推导最优排序，费用流用链表加堆模拟","种树问题：W型反悔，选中的相邻三点合并为一点反悔","维护链表指针不要遗漏，线性基插入从高位到低位","适用于复杂排序决策、区间选择、最大异或和等进阶问题"],code:`// 模拟费用流\nint L[N],R[N];ll a[N];bool del[N];\npriority_queue<Node>pq;\nwhile(k--){while(!pq.empty()&&del[pq.top().id])pq.pop();Node t=pq.top();pq.pop();if(t.val<0)break;ans+=t.val;int u=t.id;a[u]=a[L[u]]+a[R[u]]-a[u];pq.push({a[u],u});del[L[u]]=del[R[u]]=1;int l=L[u],r=R[u];L[u]=L[l];R[u]=R[r];if(L[u])R[L[u]]=u;if(R[u])L[R[u]]=u;}`,examples:[{title:"P1484 种树",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1484",description:"费用流",solution:"不能相邻",code:"见模板",explanation:"W型反悔"},{title:"国王游戏",source:"洛谷",link:"https://www.luogu.com.cn/",description:"邻项交换",solution:"a*b升序",code:"见模板",explanation:"比率排序"}]},
  {category:"动态规划",title:"记忆化搜索与DP",minutes:"提高",goal:"理解记忆化与迭代DP等价关系。",check:"能判断何时用记忆化。",intro:"记忆化=自顶向下DP。搜索树vs状态图。",topics:["搜索树vs状态图","记忆化三条件","DAG上DP","数位DP","区间DP"],mustKnow:["有记忆化就是DP","不一定比迭代好写"],pitfalls:["误以为递归就是搜索","初始化-1不是0"],steps:["记忆化搜索是自顶向下的动态规划，用缓存避免重复计算","识别重叠子问题、设计状态和转移、用数组记忆已算结果","滑雪问题：记忆化DFS求DAG上最长路，每个状态只算一次","初始化为负一区分未计算状态，有记忆化就是DP","适用于状态空间有向无环、重叠子问题多的优化场景"],code:`// 记忆化\nint f[N][N];\nint dfs(int x,int y){int&v=f[x][y];if(v!=-1)return v;v=base;for(每种转移)v=opt(v,dfs(nx,ny)+cost);return v;}`,examples:[{title:"P1434 滑雪",source:"洛谷",link:"https://www.luogu.com.cn/problem/P1434",description:"记忆化经典",solution:"dp[r][c]",code:"见模板",explanation:"DAG最长路"},{title:"P4017 食物链",source:"洛谷",link:"https://www.luogu.com.cn/problem/P4017",description:"DAG计数",solution:"记忆化=拓扑DP",code:"见模板",explanation:"等价"}]}
];

const exercises = [["区间热量统计","基础算法","入门",["前缀和","二分"],"给定长度为n的正整数数组a和q个查询。每个查询包含l,r，输出区间和。随后给定目标x，求最短连续子数组长度使和至少为x。","前缀和处理区间求和，二分求最短子段。","5\n1 2 3 4 5\n3\n1 3\n2 4\n1 5\n10","6\n9\n15\n2","https://codeforces.com/problemset/problem/702/A"],["差分修路","基础算法","入门",["差分","模拟"],"n段道路初始高度0，m次操作每次[l,r]加v，输出最终高度和最高值。","差分数组恢复，O(n+m)。","5 3\n1 3 2\n2 4 3\n3 5 1","2 5 6 4 1\n6","https://codeforces.com/problemset/problem/276/C"],["单调序列检查器","基础算法","基础",["二分答案","贪心"],"给定序列和k，删除最少元素使相邻差不超过k。","二分答案或贪心检查。","5 2\n1 3 6 7 9","1","https://codeforces.com/problemset/problem/1426/D"],["扫描线排队","基础算法","提高",["扫描线","排序"],"n个用户进出时间，统计最大同时在线人数。","事件排序。","3\n1 5\n2 4\n3 6","3 3","https://codeforces.com/problemset/problem/455/A"],["最长递增子数组","基础算法","入门",["双指针"],"求最长严格递增连续子数组长度。","线性扫描。","7\n1 2 3 1 2 3 4","4","https://codeforces.com/problemset/problem/702/A"],["逆序对计数","基础算法","基础",["归并排序","分治"],"求逆序对数量。","归并排序统计。","5\n5 4 3 2 1","10","https://www.luogu.com.cn/problem/P1908"],["第k小元素","基础算法","基础",["快速选择"],"求无序数组第k小元素。","快速选择O(n)。","5 3\n3 1 5 2 4","3","https://codeforces.com/problemset/problem/1288/C"],["浮点三分","基础算法","提高",["三分","数学"],"求单峰函数极值点。","三分搜索固定迭代。","3\n1 0 0\n0 1 0\n0 0 1","0.500","https://www.luogu.com.cn/problem/P1883"],["最近更高楼","基础数据结构","入门",["单调栈"],"求每栋楼右侧最近更高楼下标。","单调递减栈。","5\n1 3 2 5 4","2 4 4 -1 -1","https://www.luogu.com.cn/problem/P5788"],["窗口最小值","基础数据结构","基础",["单调队列"],"滑动窗口最小值序列。","双端队列。","8 3\n1 3 -1 -3 5 3 6 7","-1 -3 -3 -3 3 3","https://ac.nowcoder.com/acm/problem/227710"],["任务调度堆","基础数据结构","基础",["优先队列","贪心"],"n个任务截止时间和收益，求最大总收益。","按截止时间排序+小根堆。","4\n2 10\n1 20\n3 15\n1 8","45","https://codeforces.com/problemset/problem/1526/C"],["静态区间GCD","基础数据结构","提高",["ST表","RMQ"],"静态数组区间GCD查询。","ST表O(nlogn)+O(1)。","5 3\n12 8 4 16 24\n1 3\n2 5\n1 5","4 4 4","https://www.luogu.com.cn/problem/P3865"],["栈实现队列","基础数据结构","入门",["栈","队列"],"用两个栈实现队列。","入栈+出栈。","6\npush 1\npush 2\npop\npush 3\npop\npop","1\n2\n3","https://www.luogu.com.cn/problem/P1540"],["逆序对计数","高级数据结构","基础",["树状数组","离散化"],"动态维护逆序对。","离散化+树状数组。","5\n5 4 3 2 1\n2\n1 3 1\n1 5","10\n10","https://www.luogu.com.cn/problem/P1908"],["区间加区间和","高级数据结构","提高",["线段树","懒标记"],"区间加值和区间求和。","懒标记线段树。","5 3\n1 2 3 4 5\n1 1 3 2\n2 1 3\n2 2 5","12\n19","https://www.luogu.com.cn/problem/P3372"],["历史第k小","高级数据结构","区域赛",["可持久化线段树"],"历史版本区间第k小。","主席树。","5 3\n3 1 2 5 4\n1 2 1 2\n1 3 1 2\n2 4 2 3","1 2 3","https://www.luogu.com.cn/problem/P3834"],["直线最小值","高级数据结构","区域赛",["李超线段树"],"动态加入直线查询最小y。","李超树。","5\n1 1 0\n1 -1 10\n2 0\n1 2 -5\n2 5","0 -5","https://www.luogu.com.cn/problem/P4254"],["朋友圈合并","基础数据结构","入门",["并查集"],"合并集合和查询同组。","路径压缩并查集。","5 4\n1 1 2\n2 2 3\n1 3 4\n2 1 4","NO\nYES","https://www.luogu.com.cn/problem/P3367"],["食物链关系","基础数据结构","提高",["带权并查集"],"三类动物吃与被吃关系判矛盾。","带权并查集。","3 3\n1 1 2\n1 2 3\n1 1 3","3","https://www.luogu.com.cn/problem/P2024"],["课程安排","图论","入门",["拓扑排序"],"带依赖关系的课程排序。","入度为0入队BFS。","4 4\n1 2\n1 3\n2 4\n3 4","1 2 3 4","https://codeforces.com/problemset/problem/510/C"],["有向朋友圈","图论","提高",["SCC","缩点"],"求SCC数量和缩点后入度为0的分量数。","Tarjan SCC。","5 6\n1 2\n2 3\n3 1\n3 4\n4 5\n5 4","2 1","https://www.luogu.com.cn/problem/P3387"],["关键道路","图论","提高",["桥","割点"],"找所有桥。","Tarjan桥算法。","5 5\n1 2\n2 3\n3 1\n2 4\n4 5","2\n2 4\n4 5","https://www.luogu.com.cn/problem/P3388"],["矛盾布尔条件","图论","区域赛",["2-SAT"],"布尔变量或条件判定。","蕴含图+SCC。","3 4\n1 1 2 1\n1 -1 2 2\n1 1 3 1\n1 -2 3 -1","YES","https://www.luogu.com.cn/problem/P4782"],["迷宫最短步","图论","入门",["BFS"],"网格迷宫最短步数。","网格BFS。","5 5\nS....\n.###.\n..#..\n.###.\n....E","8","https://codeforces.com/problemset/problem/598/D"],["免费传送门","图论","基础",["0-1BFS"],"边权0或1的单源最短路。","双端队列0-1BFS。","5 6\n1 2 0\n2 3 1\n1 3 1\n3 4 0\n4 5 1\n1 5 1","0 1 1 1 1","https://codeforces.com/problemset/problem/173B"],["城市道路","图论","提高",["Dijkstra"],"非负权有向图单源最短路。","Dijkstra+最小堆。","5 7\n1 2 2\n1 3 5\n2 3 1\n2 4 7\n3 4 2\n4 5 1\n3 5 5","0 2 3 5 6","https://www.luogu.com.cn/problem/P3371"],["不等式系统","图论","区域赛",["差分约束","负环"],"不等式系统判可行性。","SPFA判负环。","3 3\n1 2 1\n2 3 -3\n3 1 1","NO","https://codeforces.com/problemset/problem/925/B"],["建设光纤","图论","基础",["MST"],"求最小生成树成本。","Kruskal或Prim。","4 5\n1 2 1\n1 3 3\n2 3 2\n2 4 4\n3 4 5","7","https://www.luogu.com.cn/problem/P3366"],["备用方案","图论","提高",["次小生成树"],"求严格次小生成树。","枚举非树边替换。","4 5\n1 2 1\n1 3 2\n2 3 3\n2 4 4\n3 4 5","7","https://www.luogu.com.cn/problem/P1967"],["每点一个出口","图论","提高",["功能图"],"功能图环大小和树距离。","拓扑剥叶+环DFS。","5\n2 3 4 5 3","2 3","https://codeforces.com/problemset/problem/618/C"],["仙人掌旅行","图论","区域赛",["仙人掌图"],"仙人掌图查询。","圆方树。","6 7\n1 2\n2 3\n3 4\n4 1\n3 5\n5 6\n6 3","2 3","https://codeforces.com/problemset/problem/231E"],["最大运输量","图论","提高",["最大流"],"求源点到汇点最大流。","Dinic。","4 5\n1 2 40\n1 3 20\n2 3 20\n2 4 30\n3 4 20","50","https://www.luogu.com.cn/problem/P3376"],["最小割防线","图论","区域赛",["最小割"],"求最小割容量。","最大流=最小割。","4 5\n1 2 3\n1 3 4\n2 4 5\n3 4 3\n2 3 2","7","https://codeforces.com/problemset/problem/1307/G"],["工人分配","图论","提高",["二分图匹配"],"工人任务最大匹配。","匈牙利/HK。","3 3 4\n1 1\n1 2\n2 2\n3 3","3","https://www.luogu.com.cn/problem/P3386"],["低价运输","图论","区域赛",["费用流"],"最小费用最大流。","MCMF。","4 5 5\n1 2 3 2\n1 3 4 1\n2 3 1 1\n2 4 5 3\n3 4 3 2","21","https://codeforces.com/problemset/problem/277/B"],["公司祖先","图论","基础",["LCA"],"多次询问两点LCA。","倍增LCA。","5 3\n1 2\n1 3\n3 4\n3 5\n1 4\n2 5\n4 5","1\n1\n3","https://www.luogu.com.cn/problem/P3379"],["路径加点查","图论","提高",["树链剖分"],"树上路径加值和点查询。","树链剖分+线段树。","5 5\n1 2\n2 3\n3 4\n4 5\n1 1 5 2\n2 3\n1 2 4 3\n2 3\n2 4","2\n5\n7","https://www.luogu.com.cn/problem/P3384"],["树上颜色众数","图论","区域赛",["DSU on tree"],"子树中出现次数最多的颜色。","DSU on tree。","5\n1 2 1 2 3\n1 2\n2 3\n3 4\n4 5","1 1 2 2 3","https://codeforces.com/problemset/problem/600/E"],["距离不超过k的点对","图论","区域赛",["点分治"],"树上距离不超过k的点对数。","点分治。","5 4\n1 2 1\n2 3 2\n3 4 1\n4 5 3","6","https://codeforces.com/problemset/problem/161/D"],["最长上升训练","动态规划","基础",["LIS"],"求最长严格上升子序列长度。","耐心排序O(nlogn)。","7\n3 1 4 1 5 9 2","4","https://codeforces.com/problemset/problem/1535/C"],["背包采购","动态规划","基础",["01背包"],"n件物品重量价值，背包容量W，求最大价值。","01背包倒序。","4 7\n1 1\n3 4\n4 5\n5 7","9","https://www.luogu.com.cn/problem/P1048"],["石子合并","动态规划","提高",["区间DP"],"合并相邻石子最小代价。","区间DP。","4\n1 3 5 2","22","https://www.luogu.com.cn/problem/P1880"],["没有上司的舞会","动态规划","基础",["树形DP"],"树上选节点权值和最大无父子同选。","树形DP。","5\n1 2 3 4 5\n1 2\n1 3\n3 4\n3 5","11","https://www.luogu.com.cn/problem/P1352"],["STA-Station","动态规划","提高",["换根DP"],"求使树上深度和最大的根。","换根DP两次遍历。","5\n1 2\n2 3\n3 4\n4 5","4","https://www.luogu.com.cn/problem/P3478"],["吃奶酪","动态规划","区域赛",["状压DP"],"遍历所有点最短路径。","TSP状压DP。","4\n0 0\n1 0\n0 1\n1 1","4.00","https://www.luogu.com.cn/problem/P1433"],["windy数","动态规划","区域赛",["数位DP"],"统计区间内windy数个数。","数位DP。","1 10","9","https://www.luogu.com.cn/problem/P2657"],["百事世界杯之旅","动态规划","提高",["概率DP"],"集齐n张卡片期望购买次数。","概率DP。","3","5.5","https://www.luogu.com.cn/problem/P1291"],["Bag of mice","动态规划","提高",["博弈DP"],"袋中取鼠博弈胜率。","博弈DP。","2 1","0.666667","https://codeforces.com/problemset/problem/148/D"],["斐波那契数列","动态规划","基础",["矩阵快速幂"],"求F(n)对1e9+7取模。","矩阵快速幂O(logn)。","10","55","https://www.luogu.com.cn/problem/P1962"],["导弹拦截","贪心","基础",["贪心","LIS"],"求最少拦截系统数。","贪心+LIS。","8\n389 207 155 300 299 170 158 65","2","https://www.luogu.com.cn/problem/P1020"],["Twins","贪心","入门",["贪心"],"拿最少硬币使和超过一半。","从大到小贪心。","4\n1 2 3 4","2","https://codeforces.com/problemset/problem/160/A"],["合并果子","贪心","基础",["Huffman","优先队列"],"每次合并最小两堆。","优先队列。","3\n1 2 9","15","https://www.luogu.com.cn/problem/P1090"],["Work Scheduling","贪心","提高",["反悔贪心"],"截止时间+收益最大。","排序+最小堆。","4\n2 10\n1 20\n3 15\n1 8","45","https://www.luogu.com.cn/problem/P2949"],["国王游戏","贪心","区域赛",["邻项交换"],"推导排序准则。","按a*b升序。","3\n1 1\n2 1\n1 2","1","https://www.luogu.com.cn/problem/P1080"],["种树","贪心","区域赛",["模拟费用流"],"不能相邻种树最大收益。","W型反悔。","5 3\n1 3 5 2 4","12","https://www.luogu.com.cn/problem/P1484"],["线性筛素数","数论与数学","入门",["筛法","素数"],"求1~n所有素数。","欧拉筛。","20","2 3 5 7 11 13 17 19","https://www.luogu.com.cn/problem/P3383"],["模意义下逆元","数论与数学","基础",["逆元","快速幂"],"求1~n对p的逆元。","费马小定理。","10 13","1 7 9 10 8 11 2 5 4 3","https://www.luogu.com.cn/problem/P3811"],["最大公约数","数论与数学","入门",["GCD","欧几里得"],"求两数GCD。","辗转相除。","12 8","4","https://codeforces.com/problemset/problem/1538/A"],["组合数计算","数论与数学","基础",["组合","杨辉三角"],"计算C(n,m)。","递推或Lucas。","5 3","10","https://codeforces.com/problemset/problem/1549/C"],["异或最大值","数论与数学","提高",["线性基"],"子集最大异或和。","线性基贪心。","4\n1 2 3 4","7","https://codeforces.com/problemset/problem/1100/F"],["多项式乘法","数论与数学","区域赛",["NTT"],"多项式乘法。","NTT。","3 3\n1 2 3\n4 5 6","4 13 28 27 18","https://www.luogu.com.cn/problem/P3803"],["KMP匹配","字符串","基础",["KMP"],"文本串中查找模式串。","KMP前缀函数。","abababa\naba","1 3","https://www.luogu.com.cn/problem/P3375"],["Manacher","字符串","提高",["Manacher"],"求最长回文子串长度。","Manacher O(n)。","abacaba","7","https://www.luogu.com.cn/problem/P3805"],["Trie树","字符串","基础",["Trie"],"实现Trie插入和查询。","前缀树。","5\ninsert apple\ninsert app\nsearch apple\nsearch app\nsearch ap","YES\nYES\nNO","https://codeforces.com/problemset/problem/514/C"],["后缀数组","字符串","区域赛",["SA"],"后缀数组和LCP。","SA构造。","aabaaaab","3 2 3 0 4 1 6 5","https://codeforces.com/problemset/problem/452/F"],["二维凸包","计算几何","基础",["凸包","Andrew"],"求凸包周长。","Andrew算法。","4\n0 0\n1 0\n1 1\n0 1","4.00","https://www.luogu.com.cn/problem/P2742"],["平面最近点对","计算几何","提高",["分治","距离"],"求最近点对距离。","分治O(nlogn)。","4\n0 0\n1 1\n2 2\n3 3","1.41","https://www.luogu.com.cn/problem/P1429"],["点到直线距离","计算几何","入门",["叉积"],"点到直线最短距离。","叉积公式。","0 0\n1 1\n1 0","0.707","https://codeforces.com/problemset/problem/613/B"],["多边形面积","计算几何","基础",["叉积","面积"],"多边形面积。","叉积求面积。","4\n0 0\n4 0\n4 3\n0 3","12.00","https://codeforces.com/problemset/problem/1237/D"],["马的遍历","搜索与博弈","入门",["BFS"],"棋盘马到各点最短步数。","网格BFS。","3 3\n1 1","0 3 2\n3 4 1\n2 1 4","https://www.luogu.com.cn/problem/P1443"],["N皇后问题","搜索与博弈","基础",["回溯"],"N皇后方案数。","回溯+剪枝。","4","2","https://www.luogu.com.cn/problem/P1219"],["全排列","搜索与博弈","入门",["DFS","回溯"],"生成全排列。","DFS+used。","3","1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1","https://www.luogu.com.cn/problem/P1706"],["迷宫路径","搜索与博弈","基础",["DFS","BFS"],"迷宫找路径。","DFS/BFS。","5 5\nS....\n.###.\n..#..\n.###.\n....E","YES","https://codeforces.com/problemset/problem/616/C"],["数独求解","搜索与博弈","提高",["回溯","剪枝"],"解数独。","回溯+约束传播。","53..7....6..195...98....6.8...6...34..8.3..17...2...6.6....28...419..5....8..79","完整解","https://www.luogu.com.cn/problem/P1784"],["八数码","搜索与博弈","提高",["BFS","状态压缩"],"八数码最少步数。","BFS+状态哈希。","1 2 3\n4 0 5\n7 8 6\n1 2 3\n4 5 6\n7 8 0","2","https://codeforces.com/problemset/problem/773/B"],["HH的项链","杂项技巧","区域赛",["莫队"],"区间不同元素个数。","莫队。","5 3\n1 2 1 2 3\n1 3\n2 5\n1 5","2 3 3","https://www.luogu.com.cn/problem/P1903"],["割点","杂项技巧","提高",["Tarjan","割点"],"求无向图割点。","Tarjan。","6 7\n1 2\n2 3\n3 1\n3 4\n4 5\n5 6\n6 4","2 3 4","https://www.luogu.com.cn/problem/P3388"],["三维偏序","杂项技巧","区域赛",["CDQ","树状数组"],"三维偏序计数。","CDQ分治。","5\n2 3 4\n2 3 3\n2 2 4\n1 3 4\n2 2 3","2 1 0 3 1","https://www.luogu.com.cn/problem/P3810"],["整体二分","杂项技巧","区域赛",["整体二分"],"批量区间k小查询。","整体二分+BIT。","5 3\n3 1 2 5 4\n1 3 1\n2 4 2\n1 5 3","1 3 4","https://codeforces.com/problemset/problem/1208/F"],["bitset优化","杂项技巧","提高",["bitset"],"集合交集判断。","bitset位运算。","3 3\n110\n101\n011","YES","https://codeforces.com/problemset/problem/963/C"],["模板验收表","杂项技巧","入门",["模板库"],"10个模板最小样例。","覆盖边界。","10","OK","https://codeforces.com/"],["随机对拍器","杂项技巧","基础",["对拍"],"随机数据对比暴力与正解。","自动diff。","3\n10 20\n30 40\n50 60","OK","https://codeforces.com/"],["赛时题目分流","杂项技巧","基础",["策略"],"3人13题分配。","按难度分配。","13 3","OK","https://codeforces.com/"]];

const quizzes = [{"question":"n=1e5且每组1秒，最稳妥的复杂度是？","answers":["O(n!)","O(n³)","O(n log n)或O(n)"],"correct":2,"explain":"1e5规模通常需要线性或带log的算法。"},{"question":"二分答案必须具备什么性质？","answers":["答案越大越漂亮","可行性随答案单调变化","数组必须有序"],"correct":1,"explain":"二分答案依赖check(mid)的真假具有单调分界。"},{"question":"Dijkstra的基本前提是？","answers":["边权非负","图必须是树","只能用于无向图"],"correct":0,"explain":"存在负权边时Dijkstra的贪心会失效。"},{"question":"SCC缩点后得到的图一定是？","answers":["完全图","DAG","二叉树"],"correct":1,"explain":"缩点后若有环，环上分量本应属同一SCC。"},{"question":"01背包一维优化时容量循环方向是？","answers":["从小到大","从大到小","随便都行"],"correct":1,"explain":"倒序避免同一物品被重复使用。"},{"question":"最大流最小割定理说明什么？","answers":["最大流=最小割容量","流量越大边越少","割一定唯一"],"correct":0,"explain":"这是很多选择/割边建模题的核心依据。"},{"question":"AC自动机主要解决什么问题？","answers":["单源最短路","多模式串匹配","区间最大值"],"correct":1,"explain":"把多个模式串放进Trie用fail指针统一匹配。"},{"question":"凸包中最常用来判断转向的运算是？","answers":["叉积","取模","矩阵乘法"],"correct":0,"explain":"叉积符号能判断三点构成的方向。"},{"question":"线性基维护的是哪种空间？","answers":["异或线性空间","欧几里得空间","字符串字典序空间"],"correct":0,"explain":"线性基常用于最大异或和可表示性。"},{"question":"莫队算法的核心思想是？","answers":["在线贪心","排序询问减少区间指针移动","每次重建整张图"],"correct":1,"explain":"离线排序查询让add/remove总次数受控。"}];


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

function renderProgress(){const d=state.completed.size,t=lessons.length;progressText.textContent=d+' / '+t;progressFill.style.width=(t>0?d/t*100:0)+'%';}
function renderApp(){renderLessons();renderLessonContent();renderProgress();}

// 可视化
const algoInfo={binary:{t:'二分查找',tm:'O(log n)',s:'O(1)'},linear:{t:'顺序查找',tm:'O(n)',s:'O(1)'},bubble:{t:'冒泡排序',tm:'O(n²)',s:'O(1)'},selection:{t:'选择排序',tm:'O(n²)',s:'O(1)'},insertion:{t:'插入排序',tm:'O(n²)',s:'O(1)'},merge:{t:'归并排序',tm:'O(n log n)',s:'O(n)'},quick:{t:'快速排序',tm:'O(n log n)均摊',s:'O(log n)'},dijkstra:{t:'Dijkstra 最短路',tm:'O((V+E)logV)',s:'O(V)'},bfs:{t:'BFS 广搜',tm:'O(V+E)',s:'O(V)'},dfs:{t:'DFS 深搜',tm:'O(V+E)',s:'O(V)'}};
function mkLinear(vs,tgt){const s=[{values:[...vs],active:[],found:[],range:[],narration:'从头逐个比较。'}];for(let i=0;i<vs.length;i++){if(vs[i]===tgt){s.push({values:[...vs],active:[i],found:[i],range:[i],narration:'位置'+i+'='+vs[i]+'，找到了！'});return s;}s.push({values:[...vs],active:[i],found:[],range:[i],narration:'位置'+i+'='+vs[i]+'，继续。'});}s.push({values:[...vs],active:[],found:[],range:[],narration:'未找到。'});return s;}
function mkBinary(vs,tgt){let l=0,r=vs.length-1;const s=[{values:[...vs],active:[],found:[],range:vs.map((_,i)=>i),narration:'left='+l+',right='+r}];while(l<=r){const m=Math.floor((l+r)/2),rng=vs.map((_,i)=>i).filter(i=>i>=l&&i<=r);if(vs[m]===tgt){s.push({values:[...vs],active:[m],found:[m],range:rng,narration:'mid='+m+'='+vs[m]+'，找到！'});return s;}if(vs[m]<tgt){s.push({values:[...vs],active:[m],found:[],range:rng,narration:'mid='+m+'='+vs[m]+' less '+tgt});l=m+1;}else{s.push({values:[...vs],active:[m],found:[],range:rng,narration:'mid='+m+'='+vs[m]+' greater '+tgt});r=m-1;}}s.push({values:[...vs],active:[],found:[],range:[],narration:'未找到'});return s;}
function mkBubble(vs){const a=[...vs];const s=[{values:[...a],active:[],found:[],range:[],narration:'开始冒泡排序'}];for(let i=0;i<a.length-1;i++){for(let j=0;j<a.length-1-i;j++){if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];s.push({values:[...a],active:[j,j+1],found:[],range:[],narration:'交换'+j+','+(j+1)});}}s.push({values:[...a],active:[],found:[a.length-1-i],range:[],narration:'第'+(i+1)+'轮结束'});}s.push({values:[...a],active:[],found:a.map((_,i)=>i),range:[],narration:'排序完成'});return s;}
function mkSelection(vs){const a=[...vs];const s=[{values:[...a],active:[],found:[],range:[],narration:'开始选择排序'}];for(let i=0;i<a.length-1;i++){let minI=i;for(let j=i+1;j<a.length;j++){if(a[j]<a[minI])minI=j;}if(minI!==i){[a[i],a[minI]]=[a[minI],a[i]];s.push({values:[...a],active:[i,minI],found:[],range:[],narration:'最小值在位置'+minI+'='+a[i]+'，与位置'+i+'交换'});}s.push({values:[...a],active:[],found:[i],range:[],narration:'位置'+i+'确定为'+a[i]});}s.push({values:[...a],active:[],found:a.map((_,i)=>i),range:[],narration:'排序完成'});return s;}
function mkInsertion(vs){const a=[...vs];const s=[{values:[...a],active:[],found:[],range:[],narration:'开始插入排序'}];for(let i=1;i<a.length;i++){const key=a[i];let j=i-1;s.push({values:[...a],active:[i],found:[],range:[],narration:'取出'+key+'，向前寻找插入位置'});while(j>=0&&a[j]>key){a[j+1]=a[j];s.push({values:[...a],active:[j,j+1],found:[],range:[],narration:a[j]+'>'+key+'，后移'});j--;}a[j+1]=key;s.push({values:[...a],active:[j+1],found:[],range:[],narration:key+'插入到位置'+(j+1)});}s.push({values:[...a],active:[],found:a.map((_,i)=>i),range:[],narration:'排序完成'});return s;}
function mkMerge(vs){const a=[...vs];const s=[{values:[...a],active:[],found:[],range:[],narration:'开始归并排序'}];function mergeSort(l,r){if(l>=r)return;const m=Math.floor((l+r)/2);s.push({values:[...a],active:[],found:[],range:Array.from({length:r-l+1},(_,i)=>l+i),narration:'分解 ['+l+'..'+m+'] 和 ['+(m+1)+'..'+r+']'});mergeSort(l,m);mergeSort(m+1,r);const tmp=[];let i=l,j=m+1;while(i<=m&&j<=r){if(a[i]<=a[j]){tmp.push(a[i++]);}else{tmp.push(a[j++]);}}while(i<=m)tmp.push(a[i++]);while(j<=r)tmp.push(a[j++]);for(let k=0;k<tmp.length;k++)a[l+k]=tmp[k];s.push({values:[...a],active:Array.from({length:r-l+1},(_,i)=>l+i),found:[],range:[],narration:'合并 ['+l+'..'+r+'] 完成'});}mergeSort(0,a.length-1);s.push({values:[...a],active:[],found:a.map((_,i)=>i),range:[],narration:'排序完成'});return s;}
function mkQuick(vs){const a=[...vs];const s=[{values:[...a],active:[],found:[],range:[],narration:'开始快速排序'}];function qs(lo,hi){if(lo>=hi)return;const pivot=a[hi];let p=lo;s.push({values:[...a],active:[hi],found:[],range:Array.from({length:hi-lo+1},(_,i)=>lo+i),narration:'pivot='+pivot+'，分区 ['+lo+'..'+hi+']'});for(let i=lo;i<hi;i++){if(a[i]<pivot){if(i!==p){[a[i],a[p]]=[a[p],a[i]];s.push({values:[...a],active:[i,p],found:[],range:[],narration:a[i]+'<'+pivot+'，交换'});}p++;}}if(p!==hi){[a[p],a[hi]]=[a[hi],a[p]];s.push({values:[...a],active:[p,hi],found:[],range:[],narration:'pivot归位到'+p});}s.push({values:[...a],active:[],found:[p],range:[],narration:'pivot'+pivot+'在位置'+p});qs(lo,p-1);qs(p+1,hi);}qs(0,a.length-1);s.push({values:[...a],active:[],found:a.map((_,i)=>i),range:[],narration:'排序完成'});return s;}
function mkDijkstra(){const nodes=[{id:0,label:'A',x:0.15,y:0.3},{id:1,label:'B',x:0.45,y:0.12},{id:2,label:'C',x:0.8,y:0.25},{id:3,label:'D',x:0.15,y:0.75},{id:4,label:'E',x:0.48,y:0.6},{id:5,label:'F',x:0.82,y:0.72}];const edges=[[0,1,4],[0,3,2],[1,2,5],[1,4,10],[2,5,3],[3,4,6],[4,5,1]];const adj=Array.from({length:6},()=>[]);for(const[u,v,w]of edges){adj[u].push([v,w]);adj[v].push([u,w]);}const s=[];const visited=new Set();const dist=Array(6).fill(Infinity);const pq=[{node:0,d:0}];dist[0]=0;const infStr='∞';function fmtDist(){return dist.map(d=>d===Infinity?infStr:d);}function fmtQueue(){return pq.filter(q=>!visited.has(q.node)).map(q=>q.node);}s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[],current:null,distances:fmtDist(),queue:pq.map(q=>q.node),narration:'初始化：起点A距离0，其余∞'});while(pq.length){pq.sort((a,b)=>a.d-b.d);const{node:u}=pq.shift();if(visited.has(u))continue;visited.add(u);s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:u,distances:fmtDist(),queue:fmtQueue(),narration:'取出'+nodes[u].label+'(距离'+dist[u]+')，标记已确定'});for(const[v,w]of adj[u]){if(visited.has(v))continue;const nd=dist[u]+w;if(nd<dist[v]){const old=dist[v];dist[v]=nd;pq.push({node:v,d:nd});s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:u,distances:fmtDist(),queue:fmtQueue(),narration:'松弛 '+nodes[u].label+'→'+nodes[v].label+'：'+(old===Infinity?'∞':old)+'更新为'+nd});}}}s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:null,distances:fmtDist(),queue:[],narration:'Dijkstra完成！最短距离：A=0, B='+dist[1]+', C='+dist[2]+', D='+dist[3]+', E='+dist[4]+', F='+dist[5]});return s;}
function mkBFS(){const nodes=[{id:0,label:'A',x:0.15,y:0.3},{id:1,label:'B',x:0.45,y:0.12},{id:2,label:'C',x:0.8,y:0.25},{id:3,label:'D',x:0.15,y:0.75},{id:4,label:'E',x:0.48,y:0.6},{id:5,label:'F',x:0.82,y:0.72}];const adj=[[1,3],[0,2,4],[1,5],[0,4],[1,3,5],[2,4]];const edges=[[0,1,1],[0,3,1],[1,2,1],[1,4,1],[2,5,1],[3,4,1],[4,5,1]];const s=[];const visited=new Set();const dist=Array(6).fill(-1);const queue=[0];dist[0]=0;visited.add(0);s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:null,distances:dist.slice(),queue:[0],narration:'起点A入队，距离0'});while(queue.length){const u=queue.shift();s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:u,distances:dist.slice(),queue:[...queue],narration:'出队'+nodes[u].label+'，距离'+dist[u]});for(const v of adj[u]){if(!visited.has(v)){visited.add(v);dist[v]=dist[u]+1;queue.push(v);s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:u,distances:dist.slice(),queue:[...queue],narration:nodes[v].label+'入队，距离'+dist[v]+'（'+nodes[u].label+'的邻居）'});}}}s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:null,distances:dist.slice(),queue:[],narration:'BFS完成！所有节点已访问'});return s;}
function mkDFS(){const nodes=[{id:0,label:'A',x:0.15,y:0.3},{id:1,label:'B',x:0.45,y:0.12},{id:2,label:'C',x:0.8,y:0.25},{id:3,label:'D',x:0.15,y:0.75},{id:4,label:'E',x:0.48,y:0.6},{id:5,label:'F',x:0.82,y:0.72}];const adj=[[1,3],[0,2,4],[1,5],[0,4],[1,3,5],[2,4]];const edges=[[0,1,1],[0,3,1],[1,2,1],[1,4,1],[2,5,1],[3,4,1],[4,5,1]];const s=[];const visited=new Set();const stack=[0];s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:null,distances:[],queue:[0],narration:'DFS开始，起点A入栈'});while(stack.length){const u=stack.pop();if(visited.has(u)){s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:u,distances:[],queue:[...stack],narration:'跳过已访问的'+nodes[u].label});continue;}visited.add(u);s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:u,distances:[],queue:[...stack],narration:'访问'+nodes[u].label+'，将邻居入栈'});const neighbors=adj[u].filter(v=>!visited.has(v)).reverse();for(const v of neighbors)stack.push(v);if(neighbors.length===0){s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:u,distances:[],queue:[...stack],narration:nodes[u].label+'无未访问邻居，回溯'});}}s.push({type:'graph',nodes:[...nodes],edges:[...edges],visited:[...visited],current:null,distances:[],queue:[],narration:'DFS完成！所有节点已访问'});return s;}
function genSteps(){const a=state.algorithm;if(a==='linear')return mkLinear(state.values,state.target);if(a==='binary')return mkBinary(state.values,state.target);if(a==='selection')return mkSelection(state.values);if(a==='insertion')return mkInsertion(state.values);if(a==='merge')return mkMerge(state.values);if(a==='quick')return mkQuick(state.values);if(a==='dijkstra')return mkDijkstra();if(a==='bfs')return mkBFS();if(a==='dfs')return mkDFS();return mkBubble(state.values);}
function renderStep(){const st=state.steps[state.stepIndex];if(!st)return;if(st.type==='graph'){renderGraphStep(st);}else{arrayCanvas.innerHTML='';st.values.forEach((v,i)=>{const c=document.createElement('div');c.className='array-cell';if(st.active.includes(i))c.classList.add('active');if(st.found.includes(i))c.classList.add('found');if(st.range&&st.range.includes(i))c.classList.add('range');c.innerHTML='<div class="bar" style="height:'+(v*2.5+20)+'px">'+v+'</div><span class="cell-index">'+i+'</span>';arrayCanvas.appendChild(c);});visualNarration.textContent=st.narration;}}
function renderGraphStep(st){const canvas=graphCanvas;const dpr=window.devicePixelRatio||1;const w=canvas.clientWidth||800;const h=canvas.clientHeight||320;canvas.width=w*dpr;canvas.height=h*dpr;const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);const pad=50;const gw=w-pad*2;const gh=h-pad*2;const nodeR=22;const colors={current:'#f97316',visited:'#22c55e',queue:'#eab308',unvisited:'#94a3b8'};function pos(n){return{x:pad+n.x*gw,y:pad+n.y*gh};}ctx.lineWidth=2;ctx.strokeStyle='#cbd5e1';ctx.font='12px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';for(const[e1,e2,w]of st.edges){const a=pos(st.nodes[e1]),b=pos(st.nodes[e2]);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.fillStyle='#64748b';const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;ctx.fillText(w,mx,my-10);}for(const n of st.nodes){const p=pos(n);let color=colors.unvisited;if(n.id===st.current)color=colors.current;else if(st.visited.includes(n.id))color=colors.visited;else if(st.queue&&st.queue.includes(n.id))color=colors.queue;ctx.beginPath();ctx.arc(p.x,p.y,nodeR,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#1e293b';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(n.label,p.x,p.y);if(st.distances&&st.distances[n.id]!==undefined&&st.distances[n.id]!==null){const d=st.distances[n.id];const label=d===Infinity||d==='∞'?'∞':String(d);ctx.fillStyle='#1e293b';ctx.font='12px sans-serif';ctx.fillText(label,p.x,p.y-nodeR-10);}}visualNarration.textContent=st.narration;}
function resetVisual(){state.steps=genSteps();state.stepIndex=0;state.playing=false;if(state.timer){clearInterval(state.timer);state.timer=null;}playBtn.innerHTML='<span class="button-icon">▶</span> 播放';const isGraph=['dijkstra','bfs','dfs'].includes(state.algorithm);arrayCanvas.style.display=isGraph?'none':'';graphCanvas.style.display=isGraph?'block':'none';const tgtLabel=targetInput.closest('label');if(tgtLabel)tgtLabel.style.display=isGraph?'none':'';renderStep();}
function shuffleArr(){state.values=Array.from({length:8},()=>Math.floor(Math.random()*90)+5);state.values.sort((a,b)=>a-b);resetVisual();}

// 小测
function renderQuiz(){if(!quizzes.length)return;const q=quizzes[state.quizIndex];quizQuestion.textContent=q.question;answerList.innerHTML='';q.answers.forEach((ans,i)=>{const btn=document.createElement('button');btn.className='answer-button';btn.textContent=ans;btn.addEventListener('click',()=>{const k=state.quizIndex+'-'+i;if(state.answeredQuestions.has(k))return;state.answeredQuestions.add(k);if(i===q.correct){btn.classList.add('correct');quizFeedback.textContent='✅ 正确！'+q.explain;state.correctAnswers++;launchFireworks();}else{btn.classList.add('wrong');quizFeedback.textContent='❌ 错误。'+q.explain;answerList.children[q.correct].classList.add('correct');saveToErrorBook(q,i);}quizScore.textContent=state.correctAnswers+' / '+state.answeredQuestions.size;recordActivity();try{const cu=JSON.parse(localStorage.getItem('blogCurrentUser')||'null');if(cu&&cu.username){localStorage.setItem('algo_quiz_'+cu.username,JSON.stringify({correctAnswers:state.correctAnswers,answeredQuestions:[...state.answeredQuestions]}));}}catch(e){}});answerList.appendChild(btn);});}

// ===== 烟花庆祝动画 =====
function launchFireworks(){
  const canvas=document.getElementById('fireworksCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  const particles=[];
  const colors=['#FFD700','#00FFFF','#FF00FF','#00FF00','#FF6600','#FF3366','#00CCFF','#FFFF00'];
  const burstCount=Math.floor(Math.random()*4)+5;
  for(let b=0;b<burstCount;b++){
    const cx=Math.random()*canvas.width*0.8+canvas.width*0.1;
    const cy=Math.random()*canvas.height*0.6+canvas.height*0.1;
    const count=Math.floor(Math.random()*21)+30;
    for(let j=0;j<count;j++){
      const angle=Math.random()*Math.PI*2;
      const speed=Math.random()*6+2;
      particles.push({x:cx,y:cy,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,color:colors[Math.floor(Math.random()*colors.length)],life:1.0,size:Math.random()*3+2});
    }
  }
  const startTime=performance.now();
  const duration=2000;
  function animate(now){
    const elapsed=now-startTime;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let alive=false;
    for(const p of particles){
      if(p.life<=0)continue;
      alive=true;
      p.x+=p.vx;p.y+=p.vy;p.vy+=0.1;p.life-=0.02;p.vx*=0.99;
      const alpha=Math.max(0,p.life);
      ctx.save();ctx.globalAlpha=alpha;ctx.shadowColor=p.color;ctx.shadowBlur=12;
      ctx.beginPath();ctx.arc(p.x,p.y,p.size*alpha,0,Math.PI*2);ctx.fillStyle=p.color;ctx.fill();ctx.restore();
    }
    if(elapsed<800){
      const textAlpha=Math.min(1,elapsed/400);
      const scale=0.5+0.5*Math.min(1,elapsed/500);
      ctx.save();ctx.globalAlpha=textAlpha;ctx.translate(canvas.width/2,canvas.height/2);ctx.scale(scale,scale);
      ctx.font='bold 64px "Microsoft YaHei",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.shadowColor='#FFD700';ctx.shadowBlur=20;ctx.fillStyle='#FFD700';ctx.fillText('🎉 答对了！',0,0);ctx.restore();
    }
    if(alive||elapsed<duration)requestAnimationFrame(animate);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  requestAnimationFrame(animate);
  const popup=document.createElement('div');
  popup.textContent='+1';popup.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:48px;font-weight:bold;color:#FFD700;z-index:10000;pointer-events:none;text-shadow:0 0 10px #FFD700;animation:scorePopup 1.5s ease-out forwards;';
  if(!document.getElementById('scorePopupStyle')){
    const style=document.createElement('style');style.id='scorePopupStyle';
    style.textContent='@keyframes scorePopup{0%{opacity:1;transform:translate(-50%,-50%) scale(0.5);}50%{opacity:1;transform:translate(-50%,-70%) scale(1.2);}100%{opacity:0;transform:translate(-50%,-120%) scale(1);}}';
    document.head.appendChild(style);
  }
  document.body.appendChild(popup);setTimeout(()=>popup.remove(),1500);
}

// ===== 讨论区 =====
const LS_DISCUSSIONS='algo_discussions';
function getDiscussions(){return JSON.parse(localStorage.getItem(LS_DISCUSSIONS)||'[]');}
function saveDiscussions(d){localStorage.setItem(LS_DISCUSSIONS,JSON.stringify(d));}
function formatTime(ts){const diff=Date.now()-ts;if(diff<60000)return'刚刚';if(diff<3600000)return Math.floor(diff/60000)+' 分钟前';if(diff<86400000)return Math.floor(diff/3600000)+' 小时前';const d=new Date(ts);return d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();}
function renderDiscussionSection(title){
  const all=getDiscussions();
  const posts=all.filter(d=>d.exerciseTitle===title);
  const user=JSON.parse(localStorage.getItem('blogCurrentUser')||'null');
  let html='<div class="discussion-section"><div class="discussion-title">💬 讨论区 ('+posts.length+')</div>';
  if(posts.length===0){html+='<div class="empty-state">暂无讨论，快来发表第一条吧！</div>';}
  posts.forEach(function(p){
    html+='<div class="discussion-post"><div class="discussion-header"><span class="discussion-author">'+escapeHtml(p.username)+'</span><span class="discussion-time">'+formatTime(p.timestamp)+'</span></div><div class="discussion-content">'+escapeHtml(p.content)+'</div>';
    (p.replies||[]).forEach(function(r){
      html+='<div class="discussion-reply"><div class="discussion-header"><span class="discussion-author">'+escapeHtml(r.username)+'</span><span class="discussion-time">'+formatTime(r.timestamp)+'</span></div><div class="discussion-content">'+escapeHtml(r.content)+'</div></div>';
    });
    if(user){
      html+='<button class="discussion-reply-btn" onclick="var n=this.nextElementSibling;n.style.display=n.style.display===\'none\'?\'block\':\'none\'">↩ 回复</button><div class="discussion-input" style="display:none;"><textarea id="reply-'+p.id+'" placeholder="写下回复..."></textarea><button class="primary-button" onclick="postReply(\''+p.id+'\')">回复</button></div>';
    }
    html+='</div>';
  });
  if(user){
    html+='<div class="discussion-input"><textarea id="discussionNewPost" placeholder="发表你的看法..."></textarea><button class="primary-button" onclick="postDiscussion()">发表讨论</button></div>';
  }else{
    html+='<div class="discussion-login-hint">💡 登录后即可参与讨论</div>';
  }
  html+='</div>';
  return html;
}
function postDiscussion(){
  var ta=document.getElementById('discussionNewPost');if(!ta||!ta.value.trim())return;
  var user=JSON.parse(localStorage.getItem('blogCurrentUser')||'null');if(!user)return;
  var all=getDiscussions();
  var title=document.getElementById('modalTitle').textContent;
  all.push({id:Date.now()+'_'+Math.random().toString(36).slice(2,7),exerciseTitle:title,username:user.username,content:ta.value.trim(),timestamp:Date.now(),replies:[]});
  saveDiscussions(all);
  problemSamples.innerHTML=renderDiscussionSection(title);
}
function postReply(postId){
  var ta=document.getElementById('reply-'+postId);if(!ta||!ta.value.trim())return;
  var user=JSON.parse(localStorage.getItem('blogCurrentUser')||'null');if(!user)return;
  var all=getDiscussions();var post=all.find(function(p){return String(p.id)===String(postId);});if(!post)return;
  if(!post.replies)post.replies=[];
  post.replies.push({username:user.username,content:ta.value.trim(),timestamp:Date.now()});
  saveDiscussions(all);
  var title=document.getElementById('modalTitle').textContent;
  problemSamples.innerHTML=renderDiscussionSection(title);
}

// 题库
function renderProblemFilters(){const cats=['全部',...new Set(exercises.map(e=>e[1]))];const diffs=['全部','入门','基础','提高','区域赛'];problemCategoryFilter.innerHTML=cats.map(c=>'<option>'+escapeHtml(c)+'</option>').join('');problemDifficultyFilter.innerHTML=diffs.map(d=>'<option>'+escapeHtml(d)+'</option>').join('');}
function getFiltered(){const kw=state.problemSearch.trim().toLowerCase();return exercises.filter(ex=>{const mc=state.problemCategory==='全部'||ex[1]===state.problemCategory;const md=state.problemDifficulty==='全部'||ex[2]===state.problemDifficulty;const mk=!kw||[ex[0],ex[1],ex[2],...(ex[3]||[]),ex[4],ex[5]].join(' ').toLowerCase().includes(kw);return mc&&md&&mk;});}
function renderProblems(){const f=getFiltered();problemCount.textContent=f.length+' 题';if(!f.length){problemList.innerHTML='<div class="empty-state">没有匹配的题目。</div>';return;}problemList.innerHTML='';f.forEach(ex=>{const card=document.createElement('div');card.className='problem-card';card.innerHTML='<div class="problem-meta"><span class="tag-chip">'+escapeHtml(ex[1])+'</span><span class="difficulty-pill">'+escapeHtml(ex[2])+'</span></div><h3>'+escapeHtml(ex[0])+'</h3><p>'+escapeHtml(ex[4])+'</p><div class="problem-tags">'+(ex[3]||[]).map(t=>'<span class="tag-chip">'+escapeHtml(t)+'</span>').join('')+'</div><p class="hint"><strong>提示：</strong>'+escapeHtml(ex[5])+'</p>';card.addEventListener('click',()=>{modalTitle.textContent=ex[0];const sol=typeof SOLUTIONS!=='undefined'&&SOLUTIONS[ex[0]]?SOLUTIONS[ex[0]]:'';problemDescription.innerHTML='<h3>题目描述</h3><p>'+escapeHtml(ex[4])+'</p>'+(ex[6]?'<h3>示例输入</h3><pre class="sample-content">'+escapeHtml(ex[6])+'</pre>':'')+(ex[7]?'<h3>示例输出</h3><pre class="sample-content">'+escapeHtml(ex[7])+'</pre>':'')+'<h3>解题提示</h3><p>'+escapeHtml(ex[5])+'</p>'+(sol?'<h3>完整 C++ 解答</h3><pre class="sample-content"><code>'+escapeHtml(sol)+'</code></pre>':'')+(ex[8]?'<a class="problem-link" href="'+ex[8]+'" target="_blank">查看原题 →</a>':'');problemSamples.innerHTML=renderDiscussionSection(ex[0]);
var split=document.getElementById('modalSplit');if(split)split.style.gridTemplateColumns='1fr 6px 320px';
var lp=split?split.children[0]:null,rp=split?split.children[2]:null;if(lp)lp.style.fontSize='';if(rp)rp.style.fontSize='';
problemModal.classList.add('active');});problemList.appendChild(card);});}

// AI
const aiKB={'动态规划':'DP核心：最优子结构+重叠子问题。常见：线性/背包/区间/树形/状压/数位DP。','Dijkstra':'非负权单源最短路，每次取最小未确定节点更新邻居，O((V+E)logV)。','二分图匹配':'节点分两组，边连不同组。匈牙利/Hopcroft-Karp求最大匹配。','树链剖分':'树分链，路径O(log n)条链，配合线段树处理路径查询修改。'};
function addMsg(c,bot){const m=document.createElement('div');m.className='ai-message '+(bot?'bot':'user');m.innerHTML='<div class="ai-message-content">'+c+'</div>';aiChatMessages.appendChild(m);aiChatMessages.scrollTop=aiChatMessages.scrollHeight;}
function handleQ(q){addMsg('<p>'+escapeHtml(q)+'</p>',false);setTimeout(()=>{let a='暂无法回答，请询问DP/Dijkstra/二分图/树链剖分等问题。';for(const[k,v]of Object.entries(aiKB))if(q.includes(k)){a=v;break;}addMsg('<p>'+escapeHtml(a)+'</p>',true);},500);}

// ===== 错题本 (Error Book) =====
function getErrorBookKey(){
  const cu=JSON.parse(localStorage.getItem('blogCurrentUser')||'null');
  return cu&&cu.username?'algo_errorbook_'+cu.username:'algoErrorbook';
}
function getErrorBook(){
  try{return JSON.parse(localStorage.getItem(getErrorBookKey())||'[]');}catch(e){return [];}
}
function saveErrorBook(book){localStorage.setItem(getErrorBookKey(),JSON.stringify(book));}
function saveToErrorBook(q,userAnswerIdx){
  const book=getErrorBook();
  // Avoid duplicate entries for the same question
  const exists=book.findIndex(e=>e.question===q.question);
  if(exists>=0)book.splice(exists,1);
  book.unshift({question:q.question,answers:q.answers,correct:q.correct,userAnswer:userAnswerIdx,explain:q.explain,timestamp:Date.now()});
  saveErrorBook(book);
}
function renderErrorBook(){
  const area=document.getElementById('errorBookArea');
  if(!area)return;
  const book=getErrorBook();
  if(!book.length){
    area.innerHTML='<div class="error-book"><div class="empty-state">错题本是空的，太棒了！🎉</div></div>';
    return;
  }
  let html='<div class="error-book">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><h3 style="margin:0;">错题本 ('+book.length+' 题)</h3><button class="ghost-button" id="clearErrorBookBtn">🗑 清空错题本</button></div>';
  book.forEach((item,idx)=>{
    html+='<div class="error-item">';
    html+='<div class="error-item-question">'+escapeHtml(item.question)+'</div>';
    html+='<div style="margin-bottom:8px;">';
    item.answers.forEach((a,i)=>{
      if(i===item.correct)html+='<span class="correct">✓ '+escapeHtml(a)+'</span>　';
      else if(i===item.userAnswer)html+='<span class="wrong">✗ '+escapeHtml(a)+'</span>　';
      else html+='<span>'+escapeHtml(a)+'</span>　';
    });
    html+='</div>';
    html+='<div style="color:var(--muted);font-size:0.85rem;">'+escapeHtml(item.explain)+'</div>';
    html+='<div class="error-item-actions"><button class="ghost-button redo-error-btn" data-idx="'+idx+'">🔄 重做</button></div>';
    html+='</div>';
  });
  html+='</div>';
  area.innerHTML=html;
  const clearBtn=document.getElementById('clearErrorBookBtn');
  if(clearBtn)clearBtn.addEventListener('click',()=>{if(confirm('确定清空错题本？')){saveErrorBook([]);renderErrorBook();}});
  area.querySelectorAll('.redo-error-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const idx=parseInt(btn.getAttribute('data-idx'));
      const book=getErrorBook();
      const item=book[idx];
      if(!item)return;
      book.splice(idx,1);
      saveErrorBook(book);
      // Find the quiz and re-ask it
      const qi=quizzes.findIndex(q=>q.question===item.question);
      if(qi>=0){
        state.quizIndex=qi;
        state.answeredQuestions.delete(qi+'-'+item.userAnswer);
        state.answeredQuestions.delete(qi+'-'+item.correct);
      }
      // Switch to quiz tab
      [tabVisual,tabQuiz,tabProblems,tabCode].forEach(t=>t.classList.remove('active'));
      [visualArea,quizArea,problemArea,codeArea].forEach(a=>a.classList.remove('active'));
      tabQuiz.classList.add('active');quizArea.classList.add('active');
      renderQuiz();
      renderErrorBook();
    });
  });
}

// ===== 学习打卡日历 (Streak Calendar) =====
function getStreakKey(){
  const cu=JSON.parse(localStorage.getItem('blogCurrentUser')||'null');
  return cu&&cu.username?'algo_streak_'+cu.username:'algoStreak';
}
function getStreakData(){
  try{return JSON.parse(localStorage.getItem(getStreakKey())||'{}');}catch(e){return {};}
}
function saveStreakData(data){localStorage.setItem(getStreakKey(),JSON.stringify(data));}
function recordActivity(){
  const data=getStreakData();
  const today=new Date().toISOString().slice(0,10);
  data[today]=(data[today]||0)+1;
  saveStreakData(data);
  renderStreakCalendar();
}
function renderStreakCalendar(){
  const area=document.getElementById('streakCalendarArea');
  if(!area)return;
  const data=getStreakData();
  const today=new Date();
  const days=[];
  // Show last 20 weeks (140 days)
  for(let i=139;i>=0;i--){
    const d=new Date(today);d.setDate(d.getDate()-i);
    const key=d.toISOString().slice(0,10);
    const count=data[key]||0;
    let level=0;
    if(count>=4)level=4;else if(count>=3)level=3;else if(count>=2)level=2;else if(count>=1)level=1;
    days.push({date:key,count,level});
  }
  // Current streak
  let currentStreak=0;
  for(let i=0;i<365;i++){
    const d=new Date(today);d.setDate(d.getDate()-i);
    const key=d.toISOString().slice(0,10);
    if(data[key])currentStreak++;else break;
  }
  // Longest streak
  const sortedDates=Object.keys(data).sort();
  let longestStreak=0,tempStreak=0;
  for(let i=0;i<sortedDates.length;i++){
    if(i===0){tempStreak=1;}else{
      const prev=new Date(sortedDates[i-1]);const curr=new Date(sortedDates[i]);
      const diff=(curr-prev)/(1000*60*60*24);
      if(diff===1)tempStreak++;else tempStreak=1;
    }
    if(tempStreak>longestStreak)longestStreak=tempStreak;
  }
  let html='<div class="streak-calendar">';
  days.forEach(d=>{html+='<div class="streak-day'+(d.level>0?' level-'+d.level:'')+'" title="'+d.date+': '+d.count+' 次"></div>';});
  html+='</div>';
  html+='<div class="streak-info">🔥 当前连续: '+currentStreak+' 天　|　🏆 最长连续: '+longestStreak+' 天</div>';
  area.innerHTML=html;
}

// ===== 排行榜 (Leaderboard) =====
function renderLeaderboard(){
  const area=document.getElementById('leaderboardArea');
  if(!area)return;
  let users=[];
  try{users=JSON.parse(localStorage.getItem('blogUsers')||'[]');}catch(e){}
  const cu=JSON.parse(localStorage.getItem('blogCurrentUser')||'null');
  const scores=users.map(u=>{
    let completed=0,correct=0;
    try{completed=JSON.parse(localStorage.getItem('algo_progress_'+u.username)||'[]').length;}catch(e){}
    try{const q=JSON.parse(localStorage.getItem('algo_quiz_'+u.username)||'{}');correct=q.correctAnswers||0;}catch(e){}
    return{username:u.username,avatar:u.avatar||(u.username?u.username[0].toUpperCase():'?'),completed,correct,score:completed*10+correct*5};
  });
  scores.sort((a,b)=>b.score-a.score);
  const top=scores.slice(0,20);
  if(!top.length){
    area.innerHTML='<div class="leaderboard"><div class="empty-state">暂无排行数据，请先注册用户。</div></div>';
    return;
  }
  let html='<div class="leaderboard">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><h3 style="margin:0;">🏆 排行榜</h3></div>';
  top.forEach((u,i)=>{
    const isMe=cu&&cu.username===u.username;
    const rankClass=i===0?'gold':i===1?'silver':i===2?'bronze':'';
    html+='<div class="lb-item'+(isMe?' me':'')+'">';
    html+='<div class="lb-rank '+rankClass+'">'+(i+1)+'</div>';
    html+='<div class="lb-avatar">'+escapeHtml(u.avatar[0]||'?')+'</div>';
    html+='<div class="lb-info"><div class="lb-name">'+escapeHtml(u.username)+(isMe?' (我)':'')+'</div><div class="lb-stats">课程 '+u.completed+' | 测验 '+u.correct+'</div></div>';
    html+='<div class="lb-score">'+u.score+'</div>';
    html+='</div>';
  });
  html+='</div>';
  area.innerHTML=html;
}

// ===== Theme Toggle =====
(function(){
  const savedTheme=localStorage.getItem('blogTheme')||'light';
  document.documentElement.setAttribute('data-theme',savedTheme);
  function toggleTheme(){
    const current=document.documentElement.getAttribute('data-theme')||'light';
    const next=current==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    localStorage.setItem('blogTheme',next);
  }
  const btnLearn=document.getElementById('themeToggleLearn');
  const btnPractice=document.getElementById('themeTogglePractice');
  if(btnLearn)btnLearn.addEventListener('click',toggleTheme);
  if(btnPractice)btnPractice.addEventListener('click',toggleTheme);
})();

// ===== Global Search =====
function handleGlobalSearch(query,resultsId){
  const container=document.getElementById(resultsId);
  if(!container)return;
  const q=query.trim().toLowerCase();
  if(!q){container.style.display='none';container.innerHTML='';return;}
  const results=[];
  lessons.forEach((l,i)=>{
    const hay=[l.title,l.topics.join(' '),l.intro,l.category].join(' ').toLowerCase();
    if(hay.includes(q)){
      results.push({type:'课程',title:l.title,desc:l.category+' - '+l.minutes,index:i,kind:'lesson'});
    }
  });
  exercises.forEach((ex,idx)=>{
    const hay=[ex[0],ex[1],ex[2],(ex[3]||[]).join(' '),ex[4],ex[5]].join(' ').toLowerCase();
    if(hay.includes(q)){
      results.push({type:'题目',title:ex[0],desc:ex[1]+' / '+ex[2],index:idx,kind:'exercise'});
    }
  });
  if(!results.length){container.innerHTML='<div class="search-result-item"><span class="search-result-desc">没有找到匹配结果</span></div>';container.style.display='block';return;}
  container.innerHTML=results.slice(0,20).map(r=>'<div class="search-result-item" data-kind="'+r.kind+'" data-index="'+r.index+'"><div class="search-result-type">'+escapeHtml(r.type)+'</div><div class="search-result-title">'+escapeHtml(r.title)+'</div><div class="search-result-desc">'+escapeHtml(r.desc)+'</div></div>').join('');
  container.style.display='block';
  container.querySelectorAll('.search-result-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const kind=item.getAttribute('data-kind');
      const idx=parseInt(item.getAttribute('data-index'));
      if(kind==='lesson'){
        state.lessonIndex=idx;
        renderApp();
        container.style.display='none';
        const searchInput=document.getElementById('globalSearchLearn')||document.getElementById('globalSearchPractice');
        if(searchInput)searchInput.value='';
      } else if(kind==='exercise'){
        const ex=exercises[idx];
        if(ex){
          modalTitle.textContent=ex[0];
          const sol=typeof SOLUTIONS!=='undefined'&&SOLUTIONS[ex[0]]?SOLUTIONS[ex[0]]:'';
          problemDescription.innerHTML='<h3>题目描述</h3><p>'+escapeHtml(ex[4])+'</p>'+(ex[6]?'<h3>示例输入</h3><pre class="sample-content">'+escapeHtml(ex[6])+'</pre>':'')+(ex[7]?'<h3>示例输出</h3><pre class="sample-content">'+escapeHtml(ex[7])+'</pre>':'')+'<h3>解题提示</h3><p>'+escapeHtml(ex[5])+'</p>'+(sol?'<h3>完整 C++ 解答</h3><pre class="sample-content"><code>'+escapeHtml(sol)+'</code></pre>':'')+(ex[8]?'<a class="problem-link" href="'+ex[8]+'" target="_blank">查看原题 →</a>':'');
          problemSamples.innerHTML='';
          problemModal.classList.add('active');
          container.style.display='none';
        }
      }
    });
  });
}

document.addEventListener('click',function(e){
  ['searchResultsLearn','searchResultsPractice'].forEach(id=>{
    const container=document.getElementById(id);
    if(!container)return;
    const search=e.target.closest('.global-search');
    if(!search){container.style.display='none';}
  });
});

// ===== 在线编程 =====
const DEFAULT_CODE = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // 在这里写你的代码

    return 0;
}`;

function loadSavedCode() {
  const saved = localStorage.getItem('algo_saved_code');
  if (saved && codeEditor) codeEditor.value = saved;
}

function saveCode() {
  if (codeEditor) localStorage.setItem('algo_saved_code', codeEditor.value);
}

async function runCode() {
  if (!codeEditor || !codeOutput || !codeStatus || !runCodeBtn) return;
  const code = codeEditor.value.trim();
  if (!code) { codeStatus.textContent = '请先输入代码'; codeStatus.className = 'code-status error'; return; }

  codeStatus.textContent = '⏳ 编译运行中...';
  codeStatus.className = 'code-status running';
  codeOutput.textContent = '';
  runCodeBtn.disabled = true;
  runCodeBtn.innerHTML = '<span class="button-icon">⏳</span> 运行中...';

  const stdin = codeInput ? codeInput.value : '';

  try {
    const response = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
        compiler: 'gcc-head',
        stdin: stdin
      }),
      signal: AbortSignal.timeout(20000)
    });

    if (!response.ok) throw new Error('HTTP ' + response.status);

    const result = await response.json();
    const stdout = result.program_output || '';
    const stderr = result.compiler_error || result.program_error || '';
    const compilerMsg = result.compiler_message || '';

    if (result.status !== '0' || stderr) {
      const errMsg = stderr || compilerMsg || '编译失败';
      codeOutput.textContent = errMsg;
      codeStatus.textContent = '❌ 编译/运行出错';
      codeStatus.className = 'code-status error';
    } else {
      codeOutput.textContent = stdout || '(无输出)';
      codeStatus.textContent = '✅ 运行成功';
      codeStatus.className = 'code-status success';
    }
  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      codeOutput.textContent = '请求超时，请检查网络或稍后再试';
      codeStatus.textContent = '❌ 请求超时';
    } else {
      codeOutput.textContent = '网络错误: ' + err.message + '\n\n建议使用本地编译器（如 VS Code + MinGW）';
      codeStatus.textContent = '❌ 网络连接失败';
    }
    codeStatus.className = 'code-status error';
  } finally {
    runCodeBtn.disabled = false;
    runCodeBtn.innerHTML = '<span class="button-icon">▶</span> 运行代码';
  }
}

// 事件
btnGoLearn.addEventListener('click',()=>showPage('learnPage'));
btnGoPractice.addEventListener('click',()=>showPage('practicePage'));
btnBackFromLearn.addEventListener('click',()=>showPage('landingPage'));
btnBackFromPractice.addEventListener('click',()=>showPage('landingPage'));
completeLessonBtn.addEventListener('click',()=>{if(state.completed.has(state.lessonIndex))state.completed.delete(state.lessonIndex);else{state.completed.add(state.lessonIndex);recordActivity();}saveProgress();renderApp();});
resetProgressBtn.addEventListener('click',()=>{if(confirm('确定重置进度？')){state.completed.clear();saveProgress();renderApp();}});
copyCodeBtn.addEventListener('click',()=>{navigator.clipboard.writeText(lessonCode.textContent).then(()=>{copyCodeBtn.textContent='已复制！';setTimeout(()=>{copyCodeBtn.innerHTML='<span class="button-icon">⧉</span> 复制';},1500);});});
tabVisual.addEventListener('click',()=>{[tabVisual,tabQuiz,tabProblems,tabCode].forEach(t=>t.classList.remove('active'));[visualArea,quizArea,problemArea,codeArea].forEach(a=>a.classList.remove('active'));tabVisual.classList.add('active');visualArea.classList.add('active');});
tabQuiz.addEventListener('click',()=>{[tabVisual,tabQuiz,tabProblems,tabCode].forEach(t=>t.classList.remove('active'));[visualArea,quizArea,problemArea,codeArea].forEach(a=>a.classList.remove('active'));tabQuiz.classList.add('active');quizArea.classList.add('active');renderQuiz();});
tabProblems.addEventListener('click',()=>{[tabVisual,tabQuiz,tabProblems,tabCode].forEach(t=>t.classList.remove('active'));[visualArea,quizArea,problemArea,codeArea].forEach(a=>a.classList.remove('active'));tabProblems.classList.add('active');problemArea.classList.add('active');renderProblems();});
tabCode.addEventListener('click',()=>{[tabVisual,tabQuiz,tabProblems,tabCode].forEach(t=>t.classList.remove('active'));[visualArea,quizArea,problemArea,codeArea].forEach(a=>a.classList.remove('active'));tabCode.classList.add('active');codeArea.classList.add('active');});
algorithmSelect.addEventListener('change',()=>{state.algorithm=algorithmSelect.value;const info=algoInfo[state.algorithm];if(info){visualTitle.textContent=info.t;timeBadge.textContent='时间 '+info.tm;spaceBadge.textContent='空间 '+info.s;}resetVisual();});
prevStepBtn.addEventListener('click',()=>{if(state.stepIndex>0){state.stepIndex--;renderStep();}});
nextStepBtn.addEventListener('click',()=>{if(state.stepIndex<state.steps.length-1){state.stepIndex++;renderStep();}});
playBtn.addEventListener('click',()=>{if(state.playing){state.playing=false;clearInterval(state.timer);state.timer=null;playBtn.innerHTML='<span class="button-icon">▶</span> 播放';}else{state.playing=true;playBtn.innerHTML='<span class="button-icon">⏸</span> 暂停';state.timer=setInterval(()=>{if(state.stepIndex<state.steps.length-1){state.stepIndex++;renderStep();}else{state.playing=false;clearInterval(state.timer);state.timer=null;playBtn.innerHTML='<span class="button-icon">▶</span> 播放';}},parseInt(speedInput.value));}});
shuffleBtn.addEventListener('click',shuffleArr);
targetInput.addEventListener('change',()=>{state.target=parseInt(targetInput.value)||35;resetVisual();});
nextQuestionBtn.addEventListener('click',()=>{state.quizIndex=(state.quizIndex+1)%quizzes.length;renderQuiz();});
problemCategoryFilter.addEventListener('change',e=>{state.problemCategory=e.target.value;renderProblems();});
problemDifficultyFilter.addEventListener('change',e=>{state.problemDifficulty=e.target.value;renderProblems();});
problemSearchInput.addEventListener('input',e=>{state.problemSearch=e.target.value;renderProblems();});
modalCloseBtn.addEventListener('click',()=>problemModal.classList.remove('active'));
const modalBackdrop=problemModal.querySelector('.modal-backdrop');
if(modalBackdrop)modalBackdrop.addEventListener('click',()=>problemModal.classList.remove('active'));

// ===== 可拖拽分割线 =====
(function(){
  const splitHandle=document.getElementById('splitHandle');
  const splitContainer=document.getElementById('modalSplit');
  if(!splitHandle||!splitContainer)return;
  let dragging=false,startX=0,startLeftWidth=0;

  function onMouseDown(e){
    e.preventDefault();
    dragging=true;
    startX=e.clientX;
    const leftPanel=splitContainer.children[0];
    startLeftWidth=leftPanel.getBoundingClientRect().width;
    splitHandle.classList.add('active');
    document.body.style.cursor='col-resize';
    document.body.style.userSelect='none';
  }

  function onMouseMove(e){
    if(!dragging)return;
    const dx=e.clientX-startX;
    const totalWidth=splitContainer.getBoundingClientRect().width;
    const handleW=6;
    const minW=200;
    let newLeft=startLeftWidth+dx;
    newLeft=Math.max(minW,Math.min(newLeft,totalWidth-handleW-minW));
    const rightW=totalWidth-handleW-newLeft;
    splitContainer.style.gridTemplateColumns=newLeft+'px '+handleW+'px '+rightW+'px';
    // Dynamic font scaling based on panel width
    const leftPanel=splitContainer.children[0];
    const rightPanel=splitContainer.children[2];
    const leftScale=Math.max(0.75,Math.min(1,newLeft/500));
    const rightScale=Math.max(0.7,Math.min(1,rightW/320));
    leftPanel.style.fontSize=(leftScale*0.95+0.05)+'rem';
    rightPanel.style.fontSize=(rightScale*0.82+0.1)+'rem';
  }

  function onMouseUp(){
    if(!dragging)return;
    dragging=false;
    splitHandle.classList.remove('active');
    document.body.style.cursor='';
    document.body.style.userSelect='';
  }

  splitHandle.addEventListener('mousedown',onMouseDown);
  document.addEventListener('mousemove',onMouseMove);
  document.addEventListener('mouseup',onMouseUp);

  // Touch support
  splitHandle.addEventListener('touchstart',e=>{
    const t=e.touches[0];
    onMouseDown({clientX:t.clientX,preventDefault:()=>e.preventDefault()});
  },{passive:false});
  document.addEventListener('touchmove',e=>{
    if(!dragging)return;
    const t=e.touches[0];
    onMouseMove({clientX:t.clientX});
  });
  document.addEventListener('touchend',onMouseUp);
})();
if(aiChatToggle)aiChatToggle.addEventListener('click',()=>aiChatWindow.classList.toggle('hidden'));
if(aiChatClose)aiChatClose.addEventListener('click',()=>aiChatWindow.classList.add('hidden'));
if(aiChatSend)aiChatSend.addEventListener('click',()=>{const q=aiChatInput.value.trim();if(q){handleQ(q);aiChatInput.value='';}});
if(aiChatInput)aiChatInput.addEventListener('keypress',e=>{if(e.key==='Enter'){const q=aiChatInput.value.trim();if(q){handleQ(q);aiChatInput.value='';}}});
document.querySelectorAll('.ai-suggestion-btn').forEach(btn=>{btn.addEventListener('click',()=>{const q=btn.getAttribute('data-question');if(q)handleQ(q);});});

// ===== 错题本 & 排行榜按钮事件 =====
const errorBookToggleBtn=document.getElementById('errorBookToggle');
if(errorBookToggleBtn)errorBookToggleBtn.addEventListener('click',()=>{
  const area=document.getElementById('errorBookArea');
  if(!area)return;
  if(area.style.display==='none'){area.style.display='block';renderErrorBook();}
  else area.style.display='none';
});
const leaderboardToggleBtn=document.getElementById('leaderboardToggle');
if(leaderboardToggleBtn)leaderboardToggleBtn.addEventListener('click',()=>{
  const area=document.getElementById('leaderboardArea');
  if(!area)return;
  if(area.style.display==='none'){area.style.display='block';renderLeaderboard();}
  else area.style.display='none';
});

// ===== 登录/注册系统(主页按钮跳转博客页面) =====
// 博客功能已移至 blog.html + blog.js + blog.css

// ===== 在线编程事件监听 =====
if(runCodeBtn)runCodeBtn.addEventListener('click',runCode);
if(clearCodeBtn)clearCodeBtn.addEventListener('click',()=>{if(codeEditor){codeEditor.value='';saveCode();}});
if(resetCodeBtn)resetCodeBtn.addEventListener('click',()=>{if(codeEditor){codeEditor.value=DEFAULT_CODE;saveCode();}});
if(codeEditor){
  codeEditor.addEventListener('input',saveCode);
  codeEditor.addEventListener('keydown',e=>{
    if(e.key==='Tab'){
      e.preventDefault();
      const start=codeEditor.selectionStart;
      const end=codeEditor.selectionEnd;
      codeEditor.value=codeEditor.value.substring(0,start)+'    '+codeEditor.value.substring(end);
      codeEditor.selectionStart=codeEditor.selectionEnd=start+4;
      saveCode();
    }
  });
}

// ===== 学习路径图 =====
const LESSON_DEPS = {
  0:[],1:[0],2:[1],3:[1],4:[0],5:[4],6:[3,4],7:[5],8:[2,4],
  9:[0],10:[9],11:[9],12:[9,4],13:[12],14:[9],15:[9],16:[9],17:[9],18:[4,9],19:[9],
  20:[0],21:[0],22:[21],23:[0],24:[0],25:[4],26:[0],27:[4],28:[4],29:[4],30:[4],31:[8],32:[27],33:[0],
  34:[0],35:[0],36:[1],37:[0],38:[9],39:[9],40:[20],41:[9],42:[0],43:[4],44:[0],45:[4],46:[0]
};
function computePathLayout(){
  const layers={};const visited=new Set();const queue=[0];visited.add(0);layers[0]=0;
  while(queue.length){const u=queue.shift();
    for(const[v,deps]of Object.entries(LESSON_DEPS)){const vi=parseInt(v);
      if(deps.includes(u)&&!visited.has(vi)){if(deps.every(d=>visited.has(d))){visited.add(vi);layers[vi]=(layers[u]||0)+1;queue.push(vi);}}
    }}
  for(let i=0;i<lessons.length;i++){if(!(i in layers))layers[i]=0;}
  const lg={};for(const[idx,layer]of Object.entries(layers)){if(!lg[layer])lg[layer]=[];lg[layer].push(parseInt(idx));}
  const pos={};const ls=90,ns=130;
  for(const[layer,nodes]of Object.entries(lg)){const y=50+parseInt(layer)*ls;const tw=(nodes.length-1)*ns;const sx=500-tw/2;nodes.forEach((idx,i)=>{pos[idx]={x:sx+i*ns,y};});}
  return pos;
}
function renderPath(){
  const canvas=$('pathCanvas');if(!canvas)return;const ctx=canvas.getContext('2d');const dpr=window.devicePixelRatio||1;
  canvas.width=canvas.clientWidth*dpr;canvas.height=canvas.clientHeight*dpr;ctx.scale(dpr,dpr);
  const w=canvas.clientWidth,h=canvas.clientHeight;
  if(!window.pathState)window.pathState={ox:0,oy:0,scale:1,drag:false,lx:0,ly:0};
  const ps=window.pathState;ctx.clearRect(0,0,w,h);ctx.save();ctx.translate(ps.ox,ps.oy);ctx.scale(ps.scale,ps.scale);
  const positions=computePathLayout();const nw=110,nh=36;
  // Draw edges
  ctx.lineWidth=1.5;
  for(const[v,deps]of Object.entries(LESSON_DEPS)){const vi=parseInt(v);if(!positions[vi])continue;
    for(const d of deps){if(!positions[d])continue;const f=positions[d],t=positions[vi];
      ctx.strokeStyle='rgba(148,163,184,0.4)';ctx.beginPath();ctx.moveTo(f.x,f.y+nh/2);ctx.lineTo(t.x,t.y-nh/2);ctx.stroke();
      const a=Math.atan2(t.y-nh/2-(f.y+nh/2),t.x-f.x);ctx.beginPath();ctx.moveTo(t.x,t.y-nh/2);ctx.lineTo(t.x-7*Math.cos(a-0.4),t.y-nh/2-7*Math.sin(a-0.4));ctx.lineTo(t.x-7*Math.cos(a+0.4),t.y-nh/2-7*Math.sin(a+0.4));ctx.closePath();ctx.fillStyle='rgba(148,163,184,0.4)';ctx.fill();
    }}
  // Draw nodes
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  for(let i=0;i<lessons.length;i++){if(!positions[i])continue;const p=positions[i];const x=p.x-nw/2,y=p.y-nh/2;
    let bg,border,text;
    if(state.completed.has(i)){bg=isDark?'#14532d':'#dcfce7';border='#22c55e';text=isDark?'#86efac':'#166534';}
    else if(i===state.lessonIndex){bg=isDark?'#1e3a5f':'#dbeafe';border='#3b82f6';text=isDark?'#93c5fd':'#1e40af';}
    else{const deps=LESSON_DEPS[i]||[];const dd=deps.every(d=>state.completed.has(d));
      if(!dd&&deps.length>0){bg=isDark?'#422006':'#fef9c3';border='#eab308';text=isDark?'#fde68a':'#854d0e';}
      else{bg=isDark?'#1e293b':'#f8fafc';border=isDark?'#475569':'#94a3b8';text=isDark?'#cbd5e1':'#334155';}}
    ctx.beginPath();ctx.roundRect(x,y,nw,nh,8);ctx.fillStyle=bg;ctx.fill();ctx.strokeStyle=border;ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle=text;font='11px "Barlow","Noto Sans SC",sans-serif';ctx.font=ctx.font;ctx.textAlign='center';ctx.textBaseline='middle';
    const t=lessons[i].title;ctx.fillText(t.length>9?t.substring(0,9)+'…':t,p.x,p.y);
  }
  ctx.restore();
}
function initPathInteraction(){
  const canvas=$('pathCanvas');if(!canvas)return;const ps=window.pathState;
  let moved=false;
  canvas.addEventListener('mousedown',e=>{ps.drag=true;moved=false;ps.lx=e.clientX;ps.ly=e.clientY;canvas.style.cursor='grabbing';});
  canvas.addEventListener('mousemove',e=>{if(!ps.drag)return;moved=true;ps.ox+=e.clientX-ps.lx;ps.oy+=e.clientY-ps.ly;ps.lx=e.clientX;ps.ly=e.clientY;renderPath();});
  canvas.addEventListener('mouseup',()=>{ps.drag=false;canvas.style.cursor='grab';});
  canvas.addEventListener('mouseleave',()=>{ps.drag=false;canvas.style.cursor='grab';});
  canvas.addEventListener('wheel',e=>{e.preventDefault();ps.scale=Math.max(0.3,Math.min(2,ps.scale*(e.deltaY>0?0.9:1.1)));renderPath();});
  canvas.addEventListener('click',e=>{if(moved)return;const r=canvas.getBoundingClientRect();const mx=(e.clientX-r.left-ps.ox)/ps.scale,my=(e.clientY-r.top-ps.oy)/ps.scale;
    const positions=computePathLayout();for(let i=0;i<lessons.length;i++){if(!positions[i])continue;const p=positions[i];
      if(mx>p.x-55&&mx<p.x+55&&my>p.y-18&&my<p.y+18){state.lessonIndex=i;renderApp();if(pathView)pathView.style.display='none';break;}}});
}
const pathToggleBtn=$('pathToggleBtn'),pathView=$('pathView'),pathCloseBtn=$('pathCloseBtn');
if(pathToggleBtn)pathToggleBtn.addEventListener('click',()=>{if(pathView){pathView.style.display=pathView.style.display==='none'?'block':'none';if(pathView.style.display==='block'){setTimeout(()=>{renderPath();initPathInteraction();},100);}}});
if(pathCloseBtn)pathCloseBtn.addEventListener('click',()=>{if(pathView)pathView.style.display='none';});

// 初始化
if(totalProblemCount)totalProblemCount.textContent=exercises.length+' 题';
renderProblemFilters();resetVisual();renderApp();renderStreakCalendar();
loadSavedCode();
