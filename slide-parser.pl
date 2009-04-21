#!/usr/bin/perl
=doc
Usage:
   ./slide-parser directory/textfile.txt

   Will generate directory/textfile.html which is your presentation

   Requires:
      templates/header.html
      templates/footer.html
      templates/slide.html

      css files referenced by the header.html to exist in the right 
      place (you decide what that means)
=cut

use strict;
use warnings;
use Text::Markdown;

my $ROOT = $1 if $0 =~ m{^(.*/)[^/]+$};
$ROOT = "" unless $ROOT;

sub main(@)
{
   local $/=undef;

   my ($foot, $slide) = (get("${ROOT}templates/footer.html"), 
          get("${ROOT}templates/slide.html"));
   my $head = get("${ROOT}templates/header.html"); 

   my $name;
   while ($name = shift)
   {
      if($name =~ /-(\w+)/)
      {
         $head = get("${ROOT}templates/header-$1.html");
         $name = shift;
      }
      parse_slides($name, $head, $foot, $slide);
   }
}

sub get($)
{
   my $name = shift;
   open FOO, "$name" or die "Could not open $name: $!";
   my $content = <FOO>;
   close FOO;
   return $content;
}

sub parse_slides($$$$)
{
   my ($name, $head, $foot, $slide) = @_;
   my $output = $name;
   $output =~ s/txt$/html/;

   open OUTPUT, ">$output";

   local $/="\n";
   my ($title, $subtitle, $author, $company, $conference) = ("", "", "", "", "");
   my $date = sprintf "%4d-%02d-%02d", (localtime)[5]+1900, (localtime)[4]+1, (localtime)[3];
   open BODY, "$name";
   while(<BODY>)
   {
      chomp;
      last if $_ eq '%';
      $title = $1 if /^TITLE:\s*(.*)$/;
      $subtitle = $1 if /^SUBTITLE:\s*(.*)$/;
      $date = $1 if /^DATE:\s*(.*)$/;
      $author = $1 if /^AUTHOR:\s*(.*)$/;
      $company = $1 if /^COMPANY:\s*(.*)$/;
      $conference = $1 if /^CONFERENCE:\s*(.*)$/;
   }
   
   my $head_author = $author;
   $head_author =~ s/<[^>]+>//g;
   $head =~ s/\%TITLE\%/$title/g;
   $head =~ s/\%SUBTITLE\%/$subtitle/g;
   $head =~ s/(<meta[^>]+)\%AUTHOR\%/$1$head_author/g;
   $head =~ s/\%AUTHOR\%/$author/g;
   $head =~ s/\%COMPANY\%/$company/g;
   $head =~ s/\%DATE\%/$date/g;
   $head =~ s/\%CONFERENCE\%/$conference/g;

   print OUTPUT $head;

   local $/="\n\%\n";
   while(<BODY>)
   {
      chomp;
      ##  Read the first non blank line which is followed by a series 
      #   of '-','=','*', capture and remove it.
      s/^([\S ]*?)\n[-=*]+\n//s;
      my $slidetitle = $1 || "";

      $slidetitle =~ s/^(\d+)([a-z]?)\. /<span class="index">$1<span class="subindex">$2<\/span><\/span>/;
      (my $cleantitle = $slidetitle) =~ s/<[^>]+>//g;
	       
      s!\[bg ([\@\w]+)/(\w+)_(\w+)\.(jpg|png)\]!<p class="bgimage"><a href="http://flickr.com/photos/$1/$2/" style="background-image: url('images/$2_$3.$4');">flickr:$1/$2</a></p>!ig;
      s!\[bg ([\@\w]+)/(http://farm\d\.[^/]+/\d+/)(\w+)_(\w+)\.(jpg|png)\]!<p class="bgimage"><a href="http://flickr.com/photos/$1/$3/" style="background-image: url('$2$3_$4.$5');">flickr:$1/$3</a></p>!ig;
 
      my $slidebody = `/usr/bin/markdown <<EOF\n$_\nEOF`;
      $slidebody =~ s/<(li|p|div)> *\[([^\]]+)\]/<$1 $2>/g;
      my $slide2 = $slide;
      $slide2 =~ s/\%SLIDETITLE\%/$slidetitle/g;
      $slide2 =~ s/\%SLIDEBODY\%/$slidebody/g;

      print OUTPUT $slide2;
   }

   print OUTPUT $foot;
}

main(@ARGV);
