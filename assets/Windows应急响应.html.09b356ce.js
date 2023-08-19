import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as r,a as e,b as t,d as i,e as s,r as l}from"./app.0655d585.js";const o={},c=s(`<h2 id="检查系统账号" tabindex="-1"><a class="header-anchor" href="#检查系统账号" aria-hidden="true">#</a> 检查系统账号</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#查询当前登录系统的会话</span>
query user

<span class="token comment">#把用户踢出会话</span>
logoff ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开 lusrmgr.msc，查看是否有新增/可疑的账号</p><p>用D盾 -&gt; 查看服务器是否存在隐藏账号、克隆账号</p><h2 id="查看网络连接" tabindex="-1"><a class="header-anchor" href="#查看网络连接" aria-hidden="true">#</a> 查看网络连接</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#查看本机所有的tcp,udp端口连接及其对应的pid</span>
<span class="token comment">#可用findstr过滤，类似Linux的grep命令</span>
netstat <span class="token operator">-</span>ano


<span class="token comment">#打印路由表</span>
route print

<span class="token comment">#查看网络代理配置情况</span>
REG QUERY <span class="token string">&quot;HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检查进程" tabindex="-1"><a class="header-anchor" href="#检查进程" aria-hidden="true">#</a> 检查进程</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#列出所有进程</span>
Tasklist

<span class="token comment">#强制停止某进程</span>
taskkill <span class="token operator">/</span>T <span class="token operator">/</span>F <span class="token operator">/</span>PID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检查启动项" tabindex="-1"><a class="header-anchor" href="#检查启动项" aria-hidden="true">#</a> 检查启动项</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#查看系统开机时间</span>
net statistics workstation

<span class="token comment">#查看系统计划任务</span>
schtasks <span class="token operator">/</span>query <span class="token operator">/</span>fo LIST <span class="token operator">/</span>v

<span class="token comment">#查看程序启动信息</span>
wmic startup get command<span class="token punctuation">,</span>caption

<span class="token comment">#查看主机服务信息</span>
wmic service list brief
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检查浏览器访问记录" tabindex="-1"><a class="header-anchor" href="#检查浏览器访问记录" aria-hidden="true">#</a> 检查浏览器访问记录</h2><p>直接打开浏览器查看</p><h2 id="杀软工具" tabindex="-1"><a class="header-anchor" href="#杀软工具" aria-hidden="true">#</a> 杀软工具</h2>`,13),p={href:"http://devbuilds.kaspersky-labs.com/kvrt/latest/full/",target:"_blank",rel:"noopener noreferrer"},m=s('<h2 id="系统日志审计" tabindex="-1"><a class="header-anchor" href="#系统日志审计" aria-hidden="true">#</a> 系统日志审计</h2><p>运行框输入eventvwr.msc，打开事件查看器</p><p><strong>对于Windows事件日志分析，不同的EVENT ID代表了不同的意义</strong></p><table><thead><tr><th><strong>事件ID</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>4624</td><td>登录成功</td></tr><tr><td>4625</td><td>登录失败</td></tr><tr><td>4634</td><td>注销成功</td></tr><tr><td>4647</td><td>用户启动的注销</td></tr><tr><td>4672</td><td>使用超级用户（如管理员）进行登录</td></tr><tr><td>4720</td><td>创建用户</td></tr></tbody></table><p><strong>每个成功登录的事件都会标记一个登录类型，不同登录类型代表不同的方式：</strong></p><table><thead><tr><th><strong>登录类型</strong></th><th><strong>描述</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>2</td><td>c（Interactive）</td><td>用户在本地进行登录。</td></tr><tr><td>3</td><td>网络（Network）</td><td>最常见的情况就是连接到共享文件夹或共享打印机时。</td></tr><tr><td>4</td><td>批处理（Batch）</td><td>通常表明某计划任务启动。</td></tr><tr><td>5</td><td>服务（Service）</td><td>每种服务都被配置在某个特定的用户账号下运行。</td></tr><tr><td>7</td><td>解锁（Unlock）</td><td>屏保解锁。</td></tr><tr><td>8</td><td>网络明文（NetworkCleartext）</td><td>登录的密码在网络上是通过明文传输的，如FTP。</td></tr><tr><td>9</td><td>新凭证（NewCredentials）</td><td>使用带/Netonly参数的RUNAS命令运行一个程序。</td></tr><tr><td>10</td><td>远程交互，(RemoteInteractive）</td><td>通过终端服务、远程桌面或远程协助访问计算机。</td></tr><tr><td>11</td><td>缓存交互（CachedInteractive）</td><td>以一个域用户登录而又没有域控制器可</td></tr></tbody></table><details class="custom-container details"><summary>系统日志</summary><p>记录操作系统组件产生的事件，主要包括驱动程序、系统组件和应用软件的崩溃以及数据丢失错误等。</p><p>系统日志中记录的时间类型由Windows NT/2000操作系统预先定义。</p><p>默认位置：%SystemRoot%System32WinevtLogsSystem.evtx</p></details><details class="custom-container details"><summary>应用程序日志</summary><p>包含由应用程序或系统程序记录的事件，主要记录程序运行方面的事件</p><p>例如数据库程序可以在应用程序日志中记录文件错误，程序开发人员可以自行决定监视哪些事件。</p><p>如果某个应用程序出现崩溃情况，那么我们可以从程序事件日志中找到相应的记录，也许会有助于你解决问题。</p><p>默认位置：%SystemRoot%System32WinevtLogsApplication.evtx</p></details><details class="custom-container details"><summary>安全日志</summary><p>记录系统的安全审计事件，包含各种类型的登录日志、对象访问日志、进程追踪日志、特权使用、帐号管理、策略变更、系统事件。</p><p>安全日志也是调查取证中最常用到的日志。</p><p>默认设置下，安全性日志是关闭的，管理员可以使用组策略来启动安全性日志</p><p>或者在注册表中设置审核策略，以便当安全性日志满后使系统停止响应。</p><p>默认位置：%SystemRoot%System32WinevtLogsSecurity.evtx</p></details><p>系统和应用程序日志存储着故障排除信息，对于系统管理员更为有用。</p><p>安全日志记录着事件审计信息，包括用户验证（登录、远程访问等）</p><p>和特定用户在认证后对系统做了什么，对于调查人员而言，更有帮助。</p>',12);function v(u,h){const n=l("ExternalLinkIcon");return d(),r("div",null,[c,e("p",null,[t("卡巴斯基："),e("a",p,[t("http://devbuilds.kaspersky-labs.com/kvrt/latest/full/ "),i(n)])]),m])}const k=a(o,[["render",v],["__file","Windows应急响应.html.vue"]]);export{k as default};
