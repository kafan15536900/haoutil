<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
//	echo "Hello World!<br/>";    //helloworld
	echo "Tudou Header Fetcher DebugMod!!<br/><br/>";
	echo "JS传递参数前请使用escape()转换<br/>";
//   echo phpinfo();    //phpinfo()php环境信息
	$turl = isset($_GET['turl']) ? $_GET['turl']:'';
	if( preg_match('/tudou\.com\/.*\/v\.swf/i', $turl) != 0) {
		$url=$turl;
		echo "<br/>Url:<br/>";
		echo $url;
		echo "<br/>Header:<br/>";
		for ($i=0; $i < 10; $i++) { 
			$Headers = getHeaders($url);
			echo "第{$i}次重试<br/>";
			if( preg_match('/forbidden/i', $Headers) == 0) {break 1;}
		}
		echo $Headers; 
		echo "<br/><br/>Return Location:<br/>";
		if(preg_match_all('/iid=[\d]*|youkuid=[\d\w]*/i', $Headers , $matches, PREG_SET_ORDER) != 0){
//			print_r($matches);
			if(count($matches) == 2) {
				echo "&".$matches[0][0]."&".$matches[1][0];
			}else{
				echo "&".$matches[0][0];
			}	
		}
	}
// php 获取
	function getHeaders($url){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 10);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: */*','User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)','Connection: Keep-Alive'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION,0);  //是否抓取跳转后的页面
		ob_start();
		$Headers = curl_exec($ch);
//		echo $Headers; 
		ob_end_clean();
		curl_close($ch);
		return $Headers;
}
?>