import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as a,e}from"./app.91785a79.js";const t={},i=e(`<h2 id="基本设置" tabindex="-1"><a class="header-anchor" href="#基本设置" aria-hidden="true">#</a> 基本设置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--list</span>	<span class="token comment">#查看配置信息</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;wintrysec&quot;</span>	<span class="token comment">#配置用户信息-用户名</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&quot;wintrysec@gmail.com&quot;</span>	<span class="token comment">#配置用户信息-邮箱</span>
<span class="token function">git</span> init 	<span class="token comment">#初始化版本控制</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>	<span class="token comment">#添加文件追踪</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;这里是说明消息&quot;</span>	<span class="token comment">#提交文件</span>
<span class="token function">git</span> status	<span class="token comment">#查看当前修改状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="远程仓库" tabindex="-1"><a class="header-anchor" href="#远程仓库" aria-hidden="true">#</a> 远程仓库</h2><p>1、创建 SSH Key</p><p>【C盘—-&gt;用户/user—-&gt;Administrator（自己的用户名）】</p><p>看看有没有 .ssh 目录，如果有，再看看这个目录下有没有 <code>id_rsa</code> 和 <code>id_rsa.pub</code></p><p>如果已经有了，可直接跳到下一步。</p><p>如果没有，打开 Shell（Windows下打开Git Bash），创建 SSH Key</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;wintrysec@gmail.com&quot;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、登陆 GitHub，打开 “Settings”**</p><p>“SSH Keys” 页面，“New SSH key”，“粘贴公钥”</p><p>3、推送到远程仓库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> push <span class="token parameter variable">-f</span> https://github.com/wintrysec/wintrysec.github.io.git master:gh-pages
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="更新远程仓库" tabindex="-1"><a class="header-anchor" href="#更新远程仓库" aria-hidden="true">#</a> 更新远程仓库</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> pull	<span class="token comment">#拉取更新，每次必做防止团队合作干掉别人上传的代码</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>	<span class="token comment">#更新文件后添加追踪</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;deploy&quot;</span>	<span class="token comment">#提交文件和说明消息</span>
<span class="token function">git</span> status	<span class="token comment">#查看当前修改状态</span>
<span class="token function">git</span> branch	<span class="token comment">#查看当前分支</span>
<span class="token function">git</span> push	<span class="token comment">#推送向远程仓库（已添加远程仓库情况下这样，否则用-f指定远程仓库）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),c=[i];function l(o,p){return n(),a("div",null,c)}const m=s(t,[["render",l],["__file","Git使用手册.html.vue"]]);export{m as default};
