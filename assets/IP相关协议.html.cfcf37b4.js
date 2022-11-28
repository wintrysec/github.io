import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as l,e as a}from"./app.97ace05d.js";const i="/assets/6-19110615133I57.0cb9ded6.gif",d="/assets/icmpbw.5be94a09.png",s="/assets/icmpgj.01bf7a9d.png",n={},r=a('<h2 id="ip协议" tabindex="-1"><a class="header-anchor" href="#ip协议" aria-hidden="true">#</a> IP协议</h2><p>IP（Internet Protocol , 网际协议）主要用于互联网通信。</p><p>IP协议用于将多个包交换网络连接起来，他在原地址和目的地址之间传输数据报，还提供对数据大小的重新组装功能，以适应不同网络的要求。</p><p>IP协议是TCP/IP协议族的核心协议，最常用的IP协议的版本号是IPV4 ，它的下一个版本是IPV6。</p><div class="custom-container info"><p class="custom-container-title">IP与MAC的关系</p><p>MAC地址是根据供应商的不同决定的唯一性标识，所以必然就导致其没有办法进行规律化和区域化，所以用同样唯一性的IP地址来代替，因为IP有其分类和区域性特点。</p><p>MAC地址是固定不变的，一个网卡，从制作出来之后其MAC地址是永远不会变化的，但是IP地址不一样，它是随机分配给网卡使用的，所以不是不变的。</p></div><h2 id="ip地址" tabindex="-1"><a class="header-anchor" href="#ip地址" aria-hidden="true">#</a> IP地址</h2><h3 id="ip地址定义" tabindex="-1"><a class="header-anchor" href="#ip地址定义" aria-hidden="true">#</a> IP地址定义</h3><p>IP地址是由32位二进制(32bit)组成，通常用四个点分十进制数字表示（192.168.1.1）</p><p>IP地址由网络标识（网络地址）和主机地址两个部分组成，根据网络地址进行路由判断网段。</p><p>IP地址的网络部分是由Internet地址分配机构来统一分配的，这样可以保证IP的唯一性。</p><p>IP地址中全为1即255.255.255.255，为限制广播地址，如果将其作为数据包的目标地址可以理解为发送到所有网络的所有主机；</p><p>IP地址0.0.0.0，表示启动时的IP地址，含义是尚未分配时的IP地址。</p><p>127是用来进行本机测试的，除了127.255.255.255外，其它的127开头的地址都代表本机</p><h3 id="ip地址分类" tabindex="-1"><a class="header-anchor" href="#ip地址分类" aria-hidden="true">#</a> IP地址分类</h3><table><thead><tr><th style="text-align:left;">地址分类</th><th style="text-align:left;">范围</th><th style="text-align:left;">解释</th><th style="text-align:left;">主机地址容纳上限</th></tr></thead><tbody><tr><td style="text-align:left;">A</td><td style="text-align:left;">0.0.0.0~127.0.0.0</td><td style="text-align:left;">首位以 0 开头，1~8位是网络标识</td><td style="text-align:left;">16777214</td></tr><tr><td style="text-align:left;">B</td><td style="text-align:left;">128.0.0.1~191.255.0.0</td><td style="text-align:left;">前两位为 10，1~16位是网络标识</td><td style="text-align:left;">65534</td></tr><tr><td style="text-align:left;">C</td><td style="text-align:left;">192.168.0.0~239.255.255.0</td><td style="text-align:left;">前三位为 110，1~24位为网络标识</td><td style="text-align:left;">254</td></tr><tr><td style="text-align:left;">D</td><td style="text-align:left;">224.0.0.0~239.255.255.0</td><td style="text-align:left;">前四位为 1110，1~32位为网络标识</td><td style="text-align:left;">多播</td></tr><tr><td style="text-align:left;">E</td><td style="text-align:left;">240-254</td><td style="text-align:left;">科研使用</td><td style="text-align:left;">科研使用</td></tr></tbody></table><p><img src="'+i+'" alt="IP地址分类示意图" loading="lazy"></p><h3 id="公有ip地址和私有ip地址" tabindex="-1"><a class="header-anchor" href="#公有ip地址和私有ip地址" aria-hidden="true">#</a> 公有IP地址和私有IP地址</h3><ul><li>A类网络的IP范围：1.0.0.0 ~ 127.0.0.0，其中A类私有IP：10.0.0.0 ~ 10.255.255.255</li><li>B类网络的IP范围：128.1.0.0-191.255.0.0，其中B类私有IP：172.16.0.0 ~ 172.31.255.255</li><li>C类网络的IP范围：192.0.1.0-223.255.255.0其中C类私有IP：192.168.0.0 ~ 192.168.255.255</li><li>各类网络除私有网络外均为公有IP地址</li></ul><p>公有网络就是在互联网内进行标识的IP号，而私有地址则不能用在互联网中用来标识主机地址，私有地址只能在私有网络或局域网中来标识主机。</p><h3 id="网关" tabindex="-1"><a class="header-anchor" href="#网关" aria-hidden="true">#</a> 网关</h3><p>网关（Gateway=GW）：一个网络的出口，一般在路由器上 主机向外发包：</p><ol><li>首先判断目标IP地址与自己是否在同一网段</li><li>如果在同一网段，则直接发出去，而不去找网关</li><li>如果不在同一网段，则直接发包给网关</li></ol><h3 id="子网掩码" tabindex="-1"><a class="header-anchor" href="#子网掩码" aria-hidden="true">#</a> 子网掩码</h3><p>子网掩码(subnet mask)又叫子网络遮罩，它是一种用来指明一个IP地址的哪些位标识的是主机所在的子网，以及哪些位标识的是主机。</p><p>子网掩码不能单独存在，它必须结合IP地址一起使用。它只有一个作用，就是将某个IP地址划分成网络地址和主机地址两部分。</p><p>子网掩码也是32个二进制位，对应IP的网络部分用1表示，对应IP地址的主机部分用0表示，IP地址和子网掩码做逻辑与运算得到网络地址。</p><ul><li>A类地址的默认子网掩码255.0.0.0</li><li>B类地址的默认子网掩码 255.255.0.0</li><li>C类地址的默认子网掩码 255.255.255.0</li></ul><p>局域网通讯规则：在同一个局域网中，所有的IP必须在同<strong>一段网段</strong>中才能互相通信。</p><p>网络标识相同的IP地址，为同一网段。</p><p>两个IP地址分别是172.20.0.18和172.20.1.16，子网掩码都是255.255.255.0。我们可以知道两者的网络标识分别是172.20.0和172.20.1，无法直接通信，也就无法PING通。要想能相互通信，需要将子网掩码改成255.255.0.0，反之可以通过子网掩码来分网。</p><h2 id="icmp互联网报文控制协议" tabindex="-1"><a class="header-anchor" href="#icmp互联网报文控制协议" aria-hidden="true">#</a> ICMP互联网报文控制协议</h2><p>ICMP（Internet Control Message Protocol）用于IP协议中发送控制消息。</p><div class="custom-container tip"><p class="custom-container-title">主要功能</p><p>1）确认IP包能否成功到达目标地址</p><p>2）进行网络诊断，测试两个设备之间是否能够互联和连接速度（常用ping 和 traceroute）</p></div><h3 id="icmp报文格式" tabindex="-1"><a class="header-anchor" href="#icmp报文格式" aria-hidden="true">#</a> ICMP报文格式</h3><p>每一个ICMP消息都将包含引发这条ICMP消息的数据包的完全IP包头，ICMP报文则作为IP数据包的数据部分封装在IP数据包内部。</p><p>ICMP包头中包含的三个固定字段就是源端设备确定发生错误的类型的主要依据。</p><div class="custom-container info"><p class="custom-container-title">ICMP包固定字段</p><ul><li>Type字段表示ICMP消息的类型；</li><li>Code字段表示ICMP消息类型细分的子类型；</li><li>Checksum字段表示ICMP报文的校验和。</li></ul></div><p><img src="'+d+'" alt="ICMP报文格式" loading="lazy"></p><h3 id="icmp消息" tabindex="-1"><a class="header-anchor" href="#icmp消息" aria-hidden="true">#</a> ICMP消息</h3><p>ICMP的消息可以分为两类，一是用于诊断是否有错的查询消息，即查询报文；</p><p>二是通知出错原因的消息，即差错报文。</p><table><thead><tr><th style="text-align:left;">通知类型</th><th style="text-align:left;">内容</th></tr></thead><tbody><tr><td style="text-align:left;">0</td><td style="text-align:left;">Echo响应报文（查询）</td></tr><tr><td style="text-align:left;">3</td><td style="text-align:left;">目标网络不可达报文（差错）</td></tr><tr><td style="text-align:left;">5</td><td style="text-align:left;">重定向报文（差错）</td></tr><tr><td style="text-align:left;">8</td><td style="text-align:left;">Echo请求报文（查询）</td></tr><tr><td style="text-align:left;">9</td><td style="text-align:left;">路由通告报文（查询）</td></tr><tr><td style="text-align:left;">10</td><td style="text-align:left;">路由器的发现/选择/请求报文（查询）</td></tr><tr><td style="text-align:left;">11</td><td style="text-align:left;">ICMP超时（0-TTL超时报文，1-分片重组超时报文）（差错）</td></tr></tbody></table><h3 id="icmp-目标不可达" tabindex="-1"><a class="header-anchor" href="#icmp-目标不可达" aria-hidden="true">#</a> ICMP 目标不可达</h3><p>路由器无法将 IP 数据报发送给目标地址时，会给发送端主机返回一个目标不可达的 ICMP 消息，并且会在消息中显示不可达的具体原因。以下是常见的错误消息。</p><table><thead><tr><th style="text-align:left;">错误号</th><th style="text-align:left;">错误原因</th></tr></thead><tbody><tr><td style="text-align:left;">0</td><td style="text-align:left;">网络不可达</td></tr><tr><td style="text-align:left;">1</td><td style="text-align:left;">主机不可达</td></tr><tr><td style="text-align:left;">2</td><td style="text-align:left;">协议不可达</td></tr><tr><td style="text-align:left;">3</td><td style="text-align:left;">端口不可达</td></tr><tr><td style="text-align:left;">4</td><td style="text-align:left;">需要进行分片但设置不支持分片比特</td></tr><tr><td style="text-align:left;">5</td><td style="text-align:left;">源站选路失败</td></tr></tbody></table><h3 id="icmp攻击" tabindex="-1"><a class="header-anchor" href="#icmp攻击" aria-hidden="true">#</a> ICMP攻击</h3><p>目前ICMP攻击绝大部分都可以归类为拒绝服务攻击（Denial of Service, DOS），其中最为常见的ICMP泛洪攻击，是指攻击者在短时间内向目标设备发送大量的ICMP虚假报文，导致目标设备忙于应付无用报文，而无法为用户提供正常服务。</p><p><img src="'+s+`" alt="ICMP泛洪攻击" loading="lazy"></p><p>ICMP泛洪攻击具体又可分为针对带宽的DOS攻击和端口扫描攻击（针对连接的DOS攻击）两类：</p><ul><li><p>针对带宽的DOS攻击</p><p>攻击者发送大量伪造的ICMP Echo请求报文，交换机、路由器等网络设备的CPU需要响应这种报文，会占用大量的带宽和CPU资源，这种DOS攻击和其他DOS攻击一样，消耗设备的资源而使得设备无法提供正常服务。</p><p>ICMP Echo响应报文具有较高的优先级，在一般情况下，网络总是允许内部主机使用Ping命令。 这种攻击仅限于攻击网络带宽，单个攻击者就能发起这种攻击。更厉害的攻击形式，如smurf和papa-smurf，可以使整个子网内的主机对目标主机进行攻击，从而扩大ICMP流量。</p></li><li><p>端口扫描攻击（针对连接的DOS攻击）</p><p>端口扫描是指攻击者发送大量的端口扫描报文，交换机需要回应大量的ICMP目的不可达报文，这种攻击既消耗系统的资源，同时攻击者能够很轻易获得设备开启的端口，然后可以针对这些端口进行攻击，可以影响所有IP设备的网络连接。</p></li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p>1 主机使用了代理软件会导致ping结果混乱，明明不存在的主机也能ping通</p><p>2 Socks5代理不支持ICMP协议</p></div><h2 id="arp地址解析协议" tabindex="-1"><a class="header-anchor" href="#arp地址解析协议" aria-hidden="true">#</a> ARP地址解析协议</h2><p>ARP（Address Resolution Protocol）地址解析协议，将动态 IP 地址映射到局域网 ( LAN )中的永久物理机器地址的过程，物理机地址也称为媒体访问控制 (MAC) 地址。</p><p>其消息由数据链路层协议封装，它是在同一局域网内部通信的，从不跨网络节点路由。</p><div class="custom-container info"><p class="custom-container-title">ARP工作原理</p><p>一、 检查 ARP 缓存表，该表由 IPv4 地址到 MAC 地址的映射组成。</p><p>二、缓存无匹配映射，则在局域网发送广播请求</p></div><p>查看 arp 缓存</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>arp <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="nat网络地址转换协议" tabindex="-1"><a class="header-anchor" href="#nat网络地址转换协议" aria-hidden="true">#</a> NAT网络地址转换协议</h2><p>随着网络应用的增多，IPv4地址枯竭的问题越来越严重。</p><p>尽管IPv6可以从根本上解决IPv4地址空间不足问题，但目前众多网络设备和网络应用大多是基于IPv4的，因此在IPv6广泛应用之前，使用一些过渡技术（如CIDR、私网地址等）是解决这个问题的主要方式，NAT就是这众多过渡技术中的一种。</p><p>NAT 协议是将在本地网络中使用的私有地址，在连接互联网的同时转换成为公共 IP 地址的技术。</p><p>我们在上网时很有可能处在一个NAT设备之后，NAT设备会在IP包通过时会修改其 源/目标IP地址，有时还会修改TCP/UDP协议的端口号，从而实现多台设备使用同一外网IP进行互联网通讯</p><table><thead><tr><th style="text-align:left;">内网地址</th><th style="text-align:left;">外网地址</th></tr></thead><tbody><tr><td style="text-align:left;">192.168.1.2:1122</td><td style="text-align:left;">46.232.120.202:9100</td></tr><tr><td style="text-align:left;">192.168.1.2:2233</td><td style="text-align:left;">46.232.120.202:9200</td></tr><tr><td style="text-align:left;">192.168.1.2:4455</td><td style="text-align:left;">46.232.120.202:9300</td></tr></tbody></table><div class="custom-container info"><p class="custom-container-title">VMware虚拟机NAT模式问题</p><p>虚拟机使用NAT模式上网时，自己开发的扫描器或nmap会有端口资产严重误报漏报的问题</p><p>具体原因不明，渗透测试用的机器切换到桥接上网就行</p></div>`,64),p=[r];function h(c,o){return e(),l("div",null,p)}const f=t(n,[["render",h],["__file","IP相关协议.html.vue"]]);export{f as default};
