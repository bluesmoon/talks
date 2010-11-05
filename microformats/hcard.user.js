// ==UserScript==
// @name           hcard discoverer
// @namespace      http://bluesmoon.info
// @description    Discover hcards within a webpage
// @include        *
// ==/UserScript==

var style = document.createElement('style');
style.type='text/css';
style.innerHTML = 'div#microformats {border:solid 1px #aaa;background-color:#ccc;opacity:0.9;padding:12px 0 0 0;position:absolute;width:240px;top:4em;left:-230px;display:none;background-image:url("http://www.crowley.nl/images/hcard.png");background-position:top right;background-repeat:no-repeat;}\n'
            + 'div#microformats:hover {left:0px;}\n'
            + 'div#microformats div.vcard {border:solid 1px #048;padding:0.5em;margin:1em;background-color:#fff;overflow:hidden;}\n'
            + 'div#microformats div.vcard h1.fn {color:#d82; font-size:1em; font-weight:bold; margin:-0.2em 0 0.2em -0.2em;}\n'
            + 'div#microformats div.vcard h2.title {font-size: 0.9em; margin:0.2em 0 0.2em 0;}\n'
            + 'div#microformats div.vcard a {display:block; font-size:0.8em; color:#28d;}';

document.getElementsByTagName('head')[0].appendChild(style);

var microformats = document.createElement('div');
microformats.id='microformats';
document.body.appendChild(microformats);



function getElementsByClassName(className, tag, root)
{
   tag = tag || '*';
   var re = new RegExp('\\b' + className + '\\b');
            
   var nodes = [];
            
   if (!root)
      root = document;
            

   var elements = root.getElementsByTagName(tag);
            
   if ( !elements.length && (tag == '*' && root.all) ) {
      elements = root.all; // IE < 6
   }
            
   for (var i = 0, len = elements.length; i < len; ++i) {
      if ( re.test(elements[i].className) ) { nodes[nodes.length] = elements[i]; }
   }

   return nodes;
}

function run()
{
   var vcard_els = getElementsByClassName('vcard');
   var i;
   var vcards = {};

   for(i=0; i<vcard_els.length; i++)
   {
      var vcard = extractVcard(vcard_els[i]);
      if(vcard && !vcards[vcard.name])
         vcards[vcard.name] = vcard.obj;
   }

   renderVcards(vcards);
}

renderVcards = function(vcards)
{
   var microformats = document.getElementById('microformats');
   var i;
   for(i in vcards)
   {
      microformats.appendChild(vcards[i]);
      microformats.style.display='block';
   }
};

extractVcard = function(el)
{
   var fn = extractFoo('innerHTML', 'fn', null, el);
   if(!fn)
      return null;
   var url = extractFoo('href', 'url', 'a', el);
   var email = extractFoo('href', 'email', 'a', el);
   var title = extractFoo('innerHTML', 'title', null, el);

   var vcard = document.createElement('div');
   vcard.className = 'vcard';
   
   var h1 = document.createElement('h1');
   h1.className = 'fn';
   h1.innerHTML = fn;
   vcard.appendChild(h1);

   if(title)
   {
      var h2 = document.createElement('h2');
      h2.className = 'title';
      h2.innerHTML = title;
      vcard.appendChild(h2);
   }

   if(url)
   {
      var a = document.createElement('a');
      a.className = 'url';
      a.href = url;
      a.innerHTML = url;
      vcard.appendChild(a);
   }

   if(email)
   {
      var a = document.createElement('a');
      a.className = 'email';
      a.href = email;
      a.innerHTML = email.replace(/^mailto:/, '');
      vcard.appendChild(a);
   }

   return {name: fn, obj: vcard};
};

extractFoo = function(property, class, tag, parent)
{
   var foo = getElementsByClassName(class, tag, parent);
   if(foo.length > 0)
      return foo[0][property];
   return null;
};

run();
