<?php
$yql = "http://query.yahooapis.com/v1/public/yql?q=";
$q = "use 'http://airports.pidgets.com/v1/tables.xml' as airports;".
     "select * from airports(5) where near='Sydney' and direct_flights_min=20";

$x = simplexml_load_file($yql.urlencode($q).'&format=xml');
echo "<b>URLs accessed:</b><br>\n";
foreach($x->diagnostics->url as $u) {
  echo "<a href=\"$u\">$u</a><br>\n";
}
echo "<br>";
foreach($x->results->airport as $a) {
  echo <<<EOB
  {$a->code} <a href="{$a->url}">{$a->name}</a> {$a->dist}km<br>
EOB;
}
?> 
