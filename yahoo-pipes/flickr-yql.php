<?php
$url = "http://query.yahooapis.com/v1/public/yql?q=";
$q   = "select * from flickr.photos.search(100) where text='webdu'";
$fmt = "xml";

$x = simplexml_load_file($url.urlencode($q)."&format=$fmt");

foreach($x->attributes('http://www.yahooapis.com/v1/base.rng') as $k=>$v) {
  $$k=(string)$v;
}

echo <<<EOB
 $count photos fetched from
 {$x->diagnostics->url} in 
 {$x->diagnostics->url['execution-time']} seconds<br>
EOB;

$flickr = "http://static.flickr.com/";
foreach($x->results->photo as $p) {
  echo "<img src=\"$flickr{$p['server']}/{$p['id']}_{$p['secret']}_s.jpg\"/>\n";
}
?>
