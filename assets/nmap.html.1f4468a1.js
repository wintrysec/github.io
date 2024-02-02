import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as n,e}from"./app.1994d791.js";const t={},r=e(`<h2 id="常用参数" tabindex="-1"><a class="header-anchor" href="#常用参数" aria-hidden="true">#</a> 常用参数</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nmap <span class="token parameter variable">-T4</span> <span class="token parameter variable">-A</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-Pn</span> IP
<span class="token parameter variable">-T4</span>     	<span class="token comment">#设置时序，越高扫描越快</span>
<span class="token parameter variable">-A</span>      	<span class="token comment">#启用操作系统检测，版本检测，脚本扫描和跟踪路由</span>
<span class="token parameter variable">-v</span>      	<span class="token comment">#增加详细级别（使用-vv或更高级别以获得更好的效果）</span>
<span class="token parameter variable">-Pn</span>     	<span class="token comment">#无ping扫描</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="主机发现" tabindex="-1"><a class="header-anchor" href="#主机发现" aria-hidden="true">#</a> 主机发现</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#Scan Types 指探测类型：</span>
<span class="token parameter variable">-PS</span>	<span class="token comment">#TCP SYN Ping （快）</span>
<span class="token parameter variable">-PA</span>	<span class="token comment">#TCP ACK Ping</span>
<span class="token parameter variable">-PU</span>	<span class="token comment">#UDP Ping</span>
<span class="token parameter variable">-PE</span>	<span class="token comment">#ICMP Ping，现在很多主机封锁这些报文，适用于管理员监视内部网络</span>

<span class="token comment">#Options 指探测选项：</span>
<span class="token parameter variable">-n</span>	<span class="token comment">#不对活动的 IP 地址进行反向域名解析，用以提高扫描速度</span>

<span class="token comment">#只列出存活主机，速度最快,其它方式会扫端口</span>
nmap <span class="token parameter variable">-sP</span> <span class="token number">192.168</span>.0.1-255    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="端口扫描技术" tabindex="-1"><a class="header-anchor" href="#端口扫描技术" aria-hidden="true">#</a> 端口扫描技术</h2><details class="custom-container details"><summary>TCP连接扫描</summary><p>使用操作系统的网络连接系统调用 connect()，对目标主机发起 TCP 三路握手，待完成后 Nmap 立即中断此次连接。</p><p>Nmap 通过获取每个尝试连接的状态信息来判定侦测端口的状态</p></details><details class="custom-container details"><summary>SYN扫描</summary><p>Nmap 产生一个 SYN 数据报文，如果侦测端口开放并返回 SYN-ACK 响应报文</p><p>Nmap 据此发送 RST 报文给侦测端口结束当前连接，这样做的好处在于缩短了端口扫描时间</p></details><details class="custom-container details"><summary>UDP扫描</summary><p>UDP 本身是无连接的协议，Nmap 向目标主机的端口发送 UDP 探测报文</p><p>如果端口没有开放，被侦测主机将会发送一个 ICMP 端口不可到达的消息</p><p>Nmap 根据这个消息确定端口闭合（closed）或者被过滤 (unfiltered)</p><p>通常没有回复意味着端口是开放（open）状态 。</p></details><details class="custom-container details"><summary>ACK扫描</summary><p>这种扫描比较特殊，它不能确切知道端口的基本状态，而是主要用来探测防火墙是否存在以及其中设定的过滤规则</p></details><details class="custom-container details"><summary>FIN扫描</summary><p>和 SYN 扫描相比，这种方式更为隐蔽，因此能够穿过防火墙的过滤</p><p>关闭（closed）端口将会返回合适的 RST 报文，而开放端口将忽略这样的侦测报文</p><p>具备类似防火墙不敏感特性的还有 -sN NULL 扫描，-sX X-mas 扫描。</p></details><h2 id="nmap所识别的6个端口状态" tabindex="-1"><a class="header-anchor" href="#nmap所识别的6个端口状态" aria-hidden="true">#</a> Nmap所识别的6个端口状态</h2><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><strong>open(开放的)</strong></td><td>应用程序正在该端口接收TCP 连接或者UDP报文。</td></tr><tr><td><strong>closed(关闭的)</strong></td><td>关闭的端口对于Nmap也是可访问的(它接受Nmap的探测报文并作出响应) ，但没有应用程序在其上监听</td></tr><tr><td><strong>filtered(被过滤的)</strong></td><td>由于包过滤阻止探测报文到达端口， Nmap无法确定该端口是否开放。 过滤可能来自专业的防火墙设备，路由器规则 或者主机上的软件防火墙。</td></tr><tr><td><strong>unfiltered(未被过滤的)</strong></td><td>未被过滤状态意味着端口可访问，但Nmap不能确定它是开放还是关闭。 只有用于映射防火墙规则集的ACK扫描才会把端口分类到这种状态。 用其它类型的扫描如窗口扫描，SYN扫描， 或者FIN扫描来扫描未被过滤的端口可以帮助确定 端口是否开放。</td></tr><tr><td><strong>open|filtered(开放或者被过滤的)</strong></td><td>当无法确定端口是开放还是被过滤的，Nmap就把该端口划分成 这种状态。 开放的端口不响应就是一个例子。 没有响应也可能意味着报文过滤器丢弃 了探测报文或者它引发的任何响应。 因此Nmap无法确定该端口是开放的还是被过滤的。 UDP，IP协议， FIN，Null，和Xmas扫描可能把端口归入此类。</td></tr><tr><td><strong>closed|filtered(关闭或者被过滤的)</strong></td><td>该状态用于Nmap不能确定端口是关闭的还是被过滤的。 它只可能出现在IPID Idle扫描中。</td></tr></tbody></table><h2 id="防火墙-ids逃逸" tabindex="-1"><a class="header-anchor" href="#防火墙-ids逃逸" aria-hidden="true">#</a> 防火墙/IDS逃逸</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nmap <span class="token parameter variable">-f</span> <span class="token parameter variable">--mtu</span><span class="token operator">=</span><span class="token number">16</span> <span class="token number">192.168</span>.0.8	<span class="token comment">#报文分段，mtu必须是8的倍数</span>
nmap <span class="token parameter variable">-sI</span> www.0day.com:80 <span class="token number">192.168</span>.0.8    	<span class="token comment">#源IP欺骗</span>
nmap --source-port <span class="token number">53</span> <span class="token number">192.168</span>.0.8       	<span class="token comment">#源端口欺骗</span>

<span class="token comment">#防火墙对服务器的设置会根据端口选择是否信任数据流</span>
<span class="token comment">#管理员可能会认为这些端口不会有攻击发生，所以可以利用这些端口扫描</span>
nmap --data-length <span class="token number">30</span> <span class="token number">192.168</span>.0.8	<span class="token comment">#在原来报文基础上，附加随机数据，达到规避防火墙的效果</span>
nmap --spoof-mac <span class="token number">0</span> <span class="token number">192.168</span>.0.8	<span class="token comment">#指定一个随机的MAC地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),l=[r];function p(i,d){return s(),n("div",null,l)}const o=a(t,[["render",p],["__file","nmap.html.vue"]]);export{o as default};
