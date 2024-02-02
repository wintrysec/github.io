import{_ as c}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c as h,d as a,w as s,a as t,b as e,e as m,r as n}from"./app.1994d791.js";const u="/assets/wirenet.11e9cedd.png",g="/assets/wirese.8bed68a7.png",b={},x=t("h2",{id:"抓取网络包",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#抓取网络包","aria-hidden":"true"},"#"),e(" 抓取网络包")],-1),f=t("div",{class:"language-powershell line-numbers-mode","data-ext":"powershell"},[t("pre",{class:"language-powershell"},[t("code",null,`直接使用wireshark选择对应网卡即可抓包
`)]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"})])],-1),v=t("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[t("pre",{class:"language-bash"},[t("code",null,[t("span",{class:"token comment"},"#使用Linux平台的抓包神器tcpdump"),e(`
tcpdump `),t("span",{class:"token parameter variable"},"-i"),e(" ens33 "),t("span",{class:"token parameter variable"},"-nn"),e(),t("span",{class:"token parameter variable"},"-s0"),e(),t("span",{class:"token parameter variable"},"-w"),e(` test.pcap

`),t("span",{class:"token parameter variable"},"-i"),e("     "),t("span",{class:"token comment"},"#指定要抓包的网卡"),e(`
`),t("span",{class:"token parameter variable"},"-nn"),e("    "),t("span",{class:"token comment"},"#单个 n 表示不解析域名，直接显示 IP；两个 n 表示不解析域名和端口"),e(`
`),t("span",{class:"token parameter variable"},"-s0"),e("    "),t("span",{class:"token comment"},"#tcpdump 默认只会截取前 96 字节的内容,0表示截取报文全部内容"),e(`
`),t("span",{class:"token parameter variable"},"-w"),e("     "),t("span",{class:"token comment"},"#将抓取的数据写入文件"),e(`
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"})])],-1),k=t("p",null,"抓到的包都可以导入到Wireshark中进行流量分析。",-1),y=t("h2",{id:"wireshak手册",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#wireshak手册","aria-hidden":"true"},"#"),e(" WireShak手册")],-1),_={href:"https://www.wireshark.org/docs/wsug_html_chunked/",target:"_blank",rel:"noopener noreferrer"},P=m('<p>不用去买书，看手册最全，多实战分析数据包，遇到不懂的就去翻看手册相关内容。</p><h2 id="网络层级" tabindex="-1"><a class="header-anchor" href="#网络层级" aria-hidden="true">#</a> 网络层级</h2><p>从上到下分别是：</p><p>物理层（数据帧）</p><p>数据链路层（以太网帧）</p><p>网络层（IP包头）</p><p>传输层（TCP）</p><p>应用层（HTTP）-选中有数据传送的数据包，右键-追送TCP/HTTP/TLS流可以查看具体网络流量数据</p><p><img src="'+u+`" alt="wirenet" loading="lazy"></p><h2 id="tcp连接状态标记字段" tabindex="-1"><a class="header-anchor" href="#tcp连接状态标记字段" aria-hidden="true">#</a> TCP连接状态标记字段</h2><table><thead><tr><th style="text-align:left;">状态标记</th><th style="text-align:left;">状态意义</th></tr></thead><tbody><tr><td style="text-align:left;">SYN</td><td style="text-align:left;">表示建立连接</td></tr><tr><td style="text-align:left;">ACK</td><td style="text-align:left;">确认响应</td></tr><tr><td style="text-align:left;">PSH</td><td style="text-align:left;">有DATA数据传送</td></tr><tr><td style="text-align:left;">FIN</td><td style="text-align:left;">表示关闭连接</td></tr><tr><td style="text-align:left;">RST</td><td style="text-align:left;">表示重置连接</td></tr></tbody></table><h2 id="wireshark提示" tabindex="-1"><a class="header-anchor" href="#wireshark提示" aria-hidden="true">#</a> WireShark提示</h2><table><thead><tr><th style="text-align:left;">提示消息</th><th style="text-align:left;">意义</th></tr></thead><tbody><tr><td style="text-align:left;">TCP previous segment lost</td><td style="text-align:left;">TCP前分段丢失</td></tr><tr><td style="text-align:left;">TCP acked lost segment</td><td style="text-align:left;">TCP应答丢失</td></tr><tr><td style="text-align:left;">TCP window Update</td><td style="text-align:left;">TCP窗口更新</td></tr><tr><td style="text-align:left;">TCP dup ack</td><td style="text-align:left;">TCP重复应答</td></tr><tr><td style="text-align:left;">TCP Keep alive</td><td style="text-align:left;">TCP保持活动</td></tr><tr><td style="text-align:left;">TCP Retransmission</td><td style="text-align:left;">TCP重传</td></tr><tr><td style="text-align:left;">TCP Fast retransmission</td><td style="text-align:left;">TCP快速重传</td></tr><tr><td style="text-align:left;">TCP Port numbers reused</td><td style="text-align:left;">TCP端口重复使用</td></tr><tr><td style="text-align:left;">TCP ACKed unseen segment</td><td style="text-align:left;">TCP看不见确认应答</td></tr><tr><td style="text-align:left;">TCP Previoussegment lost</td><td style="text-align:left;">发送方数据段丢失</td></tr><tr><td style="text-align:left;">TCP spurious retransmission</td><td style="text-align:left;">TCP伪重传</td></tr></tbody></table><h2 id="wireshark过滤器" tabindex="-1"><a class="header-anchor" href="#wireshark过滤器" aria-hidden="true">#</a> WireShark过滤器</h2><p>过滤器支持所有逻辑运算符</p><p>协议：TCP、ARP、HTTP等直接写协议名即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#IP地址过滤</span>
ip.addr <span class="token operator">==</span> <span class="token number">192.168</span>.65.15

<span class="token comment">#源IP</span>
<span class="token assign-left variable">ip.src</span><span class="token operator">==</span><span class="token string">&quot;xxx&quot;</span>

<span class="token comment">#目的IP</span>
<span class="token assign-left variable">ip.dst</span><span class="token operator">==</span><span class="token string">&quot;xx&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="着色规则" tabindex="-1"><a class="header-anchor" href="#着色规则" aria-hidden="true">#</a> 着色规则</h2><p><img src="`+g+'" alt="wirese" loading="lazy"></p>',19);function T(w,C){const l=n("CodeTabs"),r=n("ExternalLinkIcon");return p(),h("div",null,[x,a(l,{id:"3",data:[{title:"Windows"},{title:"Linux"}],"tab-id":"shell"},{tab0:s(({title:i,value:d,isActive:o})=>[f]),tab1:s(({title:i,value:d,isActive:o})=>[v]),_:1}),k,y,t("p",null,[t("a",_,[e("https://www.wireshark.org/docs/wsug_html_chunked/"),a(r)])]),P])}const A=c(b,[["render",T],["__file","Wireshark.html.vue"]]);export{A as default};
