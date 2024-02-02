import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as a,e as s}from"./app.1994d791.js";const t={},r=s('<h2 id="何为攻防对抗" tabindex="-1"><a class="header-anchor" href="#何为攻防对抗" aria-hidden="true">#</a> 何为攻防对抗</h2><p>攻防对抗又叫攻防演练、红蓝对抗，来自于军事演习，但是国内习惯称红队为攻击队，蓝队为防守队。</p><p>即红队扮演黑客对防守队的应用资产发起模拟黑客攻击，手段基本上都是真实的但是不能破坏数据。</p><details class="custom-container details"><summary>网络安全五要素</summary><p>保密性：信息不可泄露给未经授权的人（信息泄露、主机和数据库弱口令、SQL注入漏洞）</p><p>完整性：信息未经授权不可更改（越权漏洞、SQL注入、XSS、文件上传漏洞等）</p><p>可用性：用户在需要时能访问数据，即使受到攻击也不能影响正常使用（DOS拒绝服务）</p><p>可控性：对信息和信息系统实施安全监控管理，防止非法利用（如安装WAF、杀软、IDS）</p><p>不可否认性：防止信息源用户对发送的信息事后否认，或用户接到信息后不承认（记录日志）</p></details><p>综合以上安全要素，需要进行渗透测试的漏洞种类共三种：</p><p>Web应用漏洞：SQL注入、文件上传、命令执行、请求伪造等</p><p>主机系统漏洞：MS-17010 Windows SMB协议远程命令执行漏洞（Windows 7、Windows 2008）</p><p>弱口令漏洞：Web应用的弱口令、数据库弱口令、操作系统的弱口令</p><h2 id="攻击队常用的打点方式" tabindex="-1"><a class="header-anchor" href="#攻击队常用的打点方式" aria-hidden="true">#</a> 攻击队常用的打点方式</h2><div class="custom-container tip"><p class="custom-container-title">提示</p><p>其实在没有0day、1day漏洞时，最容易突破边界的方法就是钓鱼;</p><p>死磕打点的时代已经过去了，死磕边界太难了。</p></div><p><strong>一、弱口令+文件上传</strong></p><p>事实证明弱口令还是存在很多的，大多是一些正在开发测试的站点</p><p>弱口令进去后台，找文件上传点Getshell</p><p>Web后台：admin、123456、111111、admin@123、654321、000000、qazwsx</p><p><strong>二、高危组件</strong></p><p>Shiro反序列化</p><p>Weblogic反序列化（T3和IIOP协议反序列化导致的代码执行）</p><p>Struts2命令执行（很少见了-重点关注016、045和046）</p><p><strong>三、OA办公平台</strong></p><p>致远OA（Seeyon）</p><p>通达OA（Tongda）</p><p>泛微OA（Weaver）</p><p>蓝凌OA（Landray）</p><p>万户OA</p><p>燃之OA</p><p>RCE、文件上传、SQL注入等历史漏洞</p><p><strong>四、SQL注入</strong></p><p>SQL注入解出密码进后台或者直接shell、文件上传</p><p>高校类的站点有很多Asp和PHP的网站，在登录、注册、查询功能等交互处存在SQL注入漏洞可能性较大。</p><p><strong>五、VPN &amp; 邮箱</strong></p><p>通过信息收集和社工的方式获取目标的VPN账号，直接到内网</p><p>注意收集目标邮箱，尝试破解进去一个，可以获得大量资料，或者精准邮件钓鱼</p><h2 id="攻击队技战思路" tabindex="-1"><a class="header-anchor" href="#攻击队技战思路" aria-hidden="true">#</a> 攻击队技战思路</h2><p>网络层级：互联网、办公网（PC机）、业务内网（OA等服务器）、生产网（核心服务器）</p><p>互联网暴露面：Web网站、邮箱&amp;VPN、APP&amp;小程序、第三方供应链_链路接口</p><p>获取权限：邮箱、OA、SSO身份管理、堡垒机和运维机、域控系统、云平台控制权、服务器、数据库、Web应用和FTP、网络设备、工业互联网系统权限、物联网控制权限</p><p>攻击手段：弱口令（Web\\VPN\\邮箱）、应用漏洞（Nday\\0day）、Web漏洞（SQLi\\文件上传）、钓鱼邮件（PC机维权\\账号）</p><h2 id="防守队的防守策略" tabindex="-1"><a class="header-anchor" href="#防守队的防守策略" aria-hidden="true">#</a> 防守队的防守策略</h2><p>一、资产梳理</p><p>摸清自己的家底，把存在漏洞的资产提前处理掉</p><p>二、设备研判</p><p>WAF等攻击阻断设备+流量监控设备 进行研判根据攻击日志出防守日报</p><p>攻击队进入内网后可能会对内网进行无差别扫描攻击。</p><p>内网自己部署低交互蜜罐，这是最后一道防线，做到可感知攻击。</p><p>三、应急响应</p><p>一定要熟悉应急响应的流程，被入侵后快速响应，处理安全事件梳理报告。</p><p>四、溯源反制</p><p>反日攻击者VPS</p><p>蜜罐给攻击者画像获取社交账号，比如MySQL蜜罐获取攻击者微信号</p><p>MySQL服务端可以利用 <strong>LOAD DATA LOCAL</strong>命令来读取MYSQL客户端的任意文件，保存到数据表</p>',50),n=[r];function o(d,i){return e(),a("div",null,n)}const l=p(t,[["render",o],["__file","index.html.vue"]]);export{l as default};
