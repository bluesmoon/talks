<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Sometimes I talk</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<link rel="shortcut icon" href="http://i1.bluesmoon.info/favicon.ico" type="image/x-icon">
<link rel="openid.server" href="http://www.livejournal.com/openid/server.bml">
<link rel="openid.delegate" href="http://bluesmoon.livejournal.com/">

<link rel="pgpkeys" type="application/pgp-keys" title="Philip S Tellis's GPG Public Key" href="http://bluesmoon.info/bluesmoon.asc">
<link rel="pgpkeys" type="application/pgp-keys" title="Philip S Tellis's GPG Public Key (Key server)" href="http://pgpkeys.mit.edu:11371/pks/lookup?op=get&amp;search=0x1F140E17">

<link rel="stylesheet" type="text/css" href="http://a1.bluesmoon.info/blue.css">
<?php
function get_url($url, $filter=null)
{
	if(empty($url))
		return null;

	$hash = strftime("%Y-%m-%d-") . md5($url);
	$file = "/home/ptellis/cache/$hash";
	if(file_exists($file)) {
		return file_get_contents($file);
	}

	$str = file_get_contents($url);
	if($filter) {
		$str = call_user_func($filter, $str);
	}
	file_put_contents($file, $str, LOCK_EX);

	return $str;
}

function extract_talks_from_github($html)
{
	$d = @DOMDocument::loadHTML($html);

	$x = new DOMXPath($d);
	$nodes = $x->query("//li/a[1]");

	$talks = array();
	foreach($nodes as $node) {
		foreach($node->attributes as $a) {
			if($a->name == 'href') {
				$talks[] = array('url' => "http://bluesmoon.github.com/talks/" . $a->value, 'name' => $node->nodeValue);
				break;
			}
		}
	}

	return json_encode($talks);
}


function get_talks()
{
	include('talks.php');
	$github_talks = json_decode(get_url("http://bluesmoon.github.com/talks/", "extract_talks_from_github"), true);

	$t = array_merge($talks, $github_talks);

	$talks = array();
	foreach($t as $talk)
		$talks[strtolower($talk['name'])] = $talk;

	ksort($talks);
	return $talks;
}
	
?>

</head>
<body class="talks wide">

<div id="content">
<?php include "/home/ptellis/templates/header.html" ?>
 <div class="vcard">
  <h1>Sometimes <em><strong>blues</strong> talks</em></h1>
  <p>
   <img id="avatar" class="photo" src="http://img.avatars.yahoo.com/users/1xr7bvyKNAAIC_EF0AJbtg4wA.64.png" height="64" width="64" alt="[philiptellis]">
   I speak at conferences around the world on several topics including the spirit of the hack, web performance, opensource software, project management and everything in between.
   I'd love to come speak at your conference if you'll have me.
  </p>
  <br>
 </div> <!-- end vcard -->

 <div id="body">
  <div id="bodycontent">
<?php
$talks = get_talks();

if(isset($_GET['talk']) && array_key_exists(strtolower($_GET['talk']), $talks)) {
	$selected_talk = $talks[strtolower($_GET['talk'])];
?>
<div style="text-align: left;">
<h2><?php echo htmlentities($selected_talk['name']); ?></h2>
<?php
	if(isset($selected_talk['slideshare'])) {
?>
<div style="width:640px;text-align:left" id="<?php echo $selected_talk['slideshare']['id'] ?>">
  <object style="margin:0px" width="640" height="533">
    <param name="movie" value="http://static.slidesharecdn.com/swf/ssplayer2.swf?rel=0&doc=<?php echo urlencode($selected_talk['slideshare']['file']) ?>&stripped_title=<?php echo urlencode($selected_talk['slideshare']['title']); ?>" />
    <param name="allowFullScreen" value="true"/>
    <param name="allowScriptAccess" value="always"/>
    <embed src="http://static.slidesharecdn.com/swf/ssplayer2.swf?rel=0&doc=<?php echo urlencode($selected_talk['slideshare']['file']) ?>&stripped_title=<?php echo urlencode($selected_talk['slideshare']['title']); ?>" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="533"></embed>
  </object>
  <a href="http://www.slideshare.net/bluesmoon/<?php echo $selected_talk['slideshare']['title'] ?>#postComment">Comment on SlideShare</a> | <a href="<?php echo $selected_talk['source']?>">View Source</a>.
</div>
<?php
	}
	else {
?>
<a href="<?php echo $selected_talk['url'] ?>" target="_blank">Open in new window</a><br>
<iframe src="<?php echo $selected_talk['url'] ?>" style="height:600px; width:800px;"></iframe>
<?php
	}
?>
</div>
<?php
}
else {
?>
<h2>Hacking my talks</h2>
<p>
I've been lecturing at universities and speaking at conferences and user group events for a little over 10 years now.  At the start I used to write raw HTML by hand using frames to keep navigation on the left.  This worked well because if the machine I was using to present didn't have the required tools installed, I could ssh in to my box and do the presentation using lynx.  Many years later, Eric Meyer developed S5 and I switched to using that.  I wrote a custom perl script that generated the S5 file from a plain text file.  The perl script is available on my github account <a href="http://github.com/bluesmoon/talks">here</a>.
</p>
<p>
Late in 2009, in preparation for FOSS.IN, I decided to start learning LaTeX and build my presentations with that, then generate a PDF with pdflatex.  The primary motivation was to be able to upload my presentations to slideshare.  I first redid Being a Geek as a dry run.  At FOSS.IN, I got a bunch of help from other LaTeX experts to build my talk.  I haven't mastered it yet, but I'm getting there.
</p>
<p>
Click on any of the links on the right and they should show up here.
</p>
<?php
}
?>
  </div>
 </div> <!-- end body -->

 <div id="sidebar2">
<div class="repo">
<h2>Talks</h2>
<ul>
<?php
foreach($talks as $n => $talk) {
?>
 <li><a href="http://talks.bluesmoon.info/?talk=<?php echo urlencode($talk['name']) ?>"><?php echo htmlentities($talk['name'], ENT_QUOTES); ?></a></li>
<?php
}
?>
</ul>
</div>

 </div> <!-- end sidebar2 -->


 <div id="footer">

  <ul>
   <li class="feed"><a title="Flickr photostream" href="http://api.flickr.com/services/feeds/photos_public.gne?id=57155801@N00&amp;lang=en-us&amp;format=rss_200">PHOTO FEED</a></li>
   <li><a title="Validate this page's markup" href="http://validator.w3.org/check?uri=referer">HTML 4.01</a></li>
   <li><a title="Validate this page's CSS" href="http://jigsaw.w3.org/css-validator/check/referrer">CSS 2.1</a></li>
   <li>&copy; PHILIP TELLIS 2009</li>
  </ul>

 </div> <!-- end footer -->

</div> <!-- end content -->

<script type="text/javascript" src="http://a1.bluesmoon.info/piwik.js"></script>
<script type="text/javascript">
var pg=1;
try { var piwikTracker = Piwik.getTracker("http://bluesmoon.org/analytics/piwik/piwik.php", pg); piwikTracker.trackPageView(); piwikTracker.enableLinkTracking(); } catch( err ) {}</script><noscript><p><img src="http://bluesmoon.org/analytics/piwik/piwik.php?idsite=1" style="border:0;position:absolute;left:-9999em;" alt=""></p></noscript>
<script src="//lognormal.net/boomerang/37d0b5b1fbc200f53c0ffd9e680bb3fd8bc9e5c60b308b31087bf07f"></script>
</body>
</html>
