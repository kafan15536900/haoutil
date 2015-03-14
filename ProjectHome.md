#### 1. YoukuAntiADs 支持对<font color='red'>youku，ku6，iqiyi，tudou</font>视频前广告（黑屏）的过滤 ####
同时不排除由于15536900大神高超的技术也过滤了其他广告！

---

YoukuAntiADs 提供三种解决方案！<br>
Firefox用户推荐安装扩展或者UC脚本，效果更佳！<br>
<h4>遇到问题请到<b><a href='http://bbs.kafan.cn/thread-1509944-1-1.html'>卡饭</a></b>或<b><a href='https://code.google.com/p/haoutil/issues/list'>Issues</a></b>反馈，反馈请提供您<font color='red'>使用的方案，问题具体描述，遇到问题的网址</font>！</h4>
<hr />
<font color='red'><b>GM脚本</b></font>：<i><b><a href='http://userscripts.org/scripts/show/119622'>youkuantiads.user.js</a></b></i><br>
支持大部分浏览器，需要安装脚本管理器<br>
Firefox请安装<a href='https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/'>GreaseMonkey</a>/<a href='https://addons.mozilla.org/zh-cn/firefox/addon/scriptish/'>Scriptish</a><br>
Chrome请安装<a href='https://chrome.google.com/webstore/detail/tampermonkey%3Cbr%3E/dhdgffkkebhmkfjojejmpbldmpobfkfo'>TamperMonkey</a><br>
Opera请安装<a href='https://addons.opera.com/extensions/details/violent-monkey/'>ViolentMonkey</a><br>
Maxthon请安装<a href='http://extension.maxthon.com/detail/index.php?view_id=1680'>ViolentMonkey</a><br>
缺点是不能同步Cookies，youku播放完后不能加载推荐视频<br>
<hr />
<font color='red'><b>UC脚本</b></font>：<i><b><a href='https://j.mozest.com/zh-CN/ucscript/script/92/'>youkuantiads.uc.js</a></b></i><br>
适用于Firefox<br>
安装完需要 <font color='blue'><b>清空缓存（必要时请重启Firefox）</b></font>
<hr />
<font color='red'><b>Firefox扩展</b></font>：<i><b><a href='https://haoutil.googlecode.com/svn/trunk/firefox/xpi/youkuantiads.xpi'>youkuantiads.xpi</a></b></i><br>
自带播放器版 <i><b><a href='https://haoutil.googlecode.com/svn/trunk/firefox/xpi/youkuantiads_with_player.xpi'>youkuantiads_with_player.xpi</a></b></i><br>
适用于Firefox<br>
安装完需要 <font color='blue'><b>清空缓存（必要时请重启Firefox）</b></font>
<hr />
可以自行修改播放器地址为国内地址，地址见<a href='http://haoutil.cdn.duapp.com/'>http://haoutil.cdn.duapp.com/</a> ，<br>
但不保证可以长期使用！<br>
<br>
<br>
<br>
<br>
<br>
<br>
<h1>以下内容可能过期，使用前请仔细斟酌</h1>
<h4>2. YoukuV 提供优酷第三方播放器和播放列表反向代理功能，用于规避使用AdBlock Plus屏蔽广告时，优酷显示黑色倒计时提示</h4>
<hr />
<font color='red'>由于最新AdBlock Plus规则已经放弃对优酷视频前广告的屏蔽，所以安装脚本后需要手动禁用以下规则</font><br><del><h3></del><code>@@||valf.atm.youku.com/valf?</code><del></h3>
<hr />
<ol><li>安装GM脚本 <a href='http://userscripts.org/scripts/show/119622'>YoukuAntiADs</a></del><br>按下图修改播放器链接<br><img src='https://haoutil.googlecode.com/svn/trunk/misc/youkuantiads.user.js.png' />
</li><li>下载 <a href='https://haoutil.googlecode.com/svn/trunk/youkuv/binary/youkuv.7z'>YoukuV</a><br>解压运行 youkuv.exe (推荐使用 <a href='http://wangye.org/blog/archives/644/'>SrvanyUI</a> 将 youkuv.exe 添加为系统服务开机运行)<br>
<hr />
<b>FAQ</b>
</li><li>优酷播放结束后报 <b><i>数据加载失败</i></b> 的错误<br>
</li></ol><blockquote>这是由cookie的跨域问题造成的，可以使用如下方法解决：<br>
<ol><li>在 hosts 文件中写入 <code>127.0.0.1 local.youku.com</code>
</li><li>将 <code>var loader = 'http://127.0.0.1:8008/loader.swf';</code><br>改为 <code>var loader = 'http://local.youku.com:8008/loader.swf';</code>