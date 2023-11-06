#!/usr/bin/perl
use CGI qw(param);
use utf8;
use Encode;
use strict;
use warnings;
use GraphViz;

use GraphViz;

my $g = GraphViz->new(
    directed => 1,
#    layout   => 'circo',
#    layout => 'twopi',
     layout => 'fdp',
);
#my $g = GraphViz->new(
#    directed => 1,
#    layout   => 'circo',
#);

my @default_attrs = (
                     fontsize => '8',
                     fontname => 'arial',
                     style=>'filled',
                     fillcolor=>'green'
                    );

my @bbig_attrs = (
                     fontsize => '16',
                     fontcolor => 'white',
                     fontname => 'arial',
                     style=>'filled',
                     fillcolor=>'red'
                    );

my @mbig_attrs = (
                     fontsize => '14',
                     fontcolor => 'white',
                     fontname => 'arial',
                     style=>'filled',
                     fillcolor=>'blue'
                    );
my @big_attrs = (
                     fontsize => '12',
                     fontname => 'arial',
                     style=>'filled',
                     fillcolor=>'green'
                    );

my @small_attrs = (
                     fontsize => '8',
                     fontname => 'arial',
                     style=>'filled',
                     fillcolor=>'yellow'
                    );


my $dr=0;
my $link="GN";
my $url="";
my $csv=param("csv");
$dr=param("direct");
$link=param("links");

$csv=~s/&#1040;/А/gi;   $csv=~s/&#1041;/Б/gi;   $csv=~s/&#1042;/В/gi;
$csv=~s/&#1043;/Г/gi;   $csv=~s/&#1044;/Д/gi;   $csv=~s/&#1045;/Е/gi;
$csv=~s/&#1046;/Ж/gi;   $csv=~s/&#1047;/З/gi;   $csv=~s/&#1048;/И/gi;;
$csv=~s/&#1049;/Й/gi;   $csv=~s/&#1050;/К/gi;   $csv=~s/&#1051;/Л/gi;
$csv=~s/&#1052;/М/gi;   $csv=~s/&#1053;/Н/gi;   $csv=~s/&#1054;/О/gi;
$csv=~s/&#1055;/П/gi;   $csv=~s/&#1056;/Р/gi;   $csv=~s/&#1057;/С/gi;
$csv=~s/&#1058;/Т/gi;   $csv=~s/&#1059;/У/gi;   $csv=~s/&#1060;/Ф/gi;
$csv=~s/&#1061;/Х/gi;   $csv=~s/&#1062;/Ц/gi;   $csv=~s/&#1063;/Ч/gi;
$csv=~s/&#1064;/Ш/gi;   $csv=~s/&#1065;/Щ/gi;   $csv=~s/&#1066;/Ъ/gi;
$csv=~s/&#1067;/Ы/gi;   $csv=~s/&#1068;/Ь/gi;   $csv=~s/&#1069;/Э/gi;
$csv=~s/&#1070;/Ю/gi;   $csv=~s/&#1071;/Я/gi;
$csv=~s/&#1072;/а/gi;   $csv=~s/&#1073;/б/gi;   $csv=~s/&#1074;/в/gi;
$csv=~s/&#1075;/г/gi;   $csv=~s/&#1076;/д/gi;   $csv=~s/&#1077;/е/gi;
$csv=~s/&#1078;/ж/gi;   $csv=~s/&#1079;/з/gi;   $csv=~s/&#1080;/и/gi;
$csv=~s/&#1081;/й/gi;   $csv=~s/&#1082;/к/gi;   $csv=~s/&#1083;/л/gi;
$csv=~s/&#1084;/м/gi;   $csv=~s/&#1085;/н/gi;   $csv=~s/&#1086;/о/gi;
$csv=~s/&#1087;/п/gi;   $csv=~s/&#1088;/р/gi;   $csv=~s/&#1089;/с/gi;
$csv=~s/&#1090;/т/gi;   $csv=~s/&#1091;/у/gi;   $csv=~s/&#1092;/ф/gi;
$csv=~s/&#1093;/х/gi;   $csv=~s/&#1094;/ц/gi;   $csv=~s/&#1095;/ч/gi;
$csv=~s/&#1096;/ш/gi;   $csv=~s/&#1097;/щ/gi;   $csv=~s/&#1098;/ъ/gi;
$csv=~s/&#1099;/ы/gi;   $csv=~s/&#1100;/ь/gi;   $csv=~s/&#1101;/э/gi;
$csv=~s/&#1102;/ю/gi;   $csv=~s/&#1103;/я/gi;   $csv=~s/&#1110;/і/gi;
$csv=~s/&#1105;/ё/gi;   $csv=~s/&#1025;/Ё/gi;

$csv=~s/&#1030;/I/gi;
$csv=~s/&#1111;/ї/gi;
$csv=~s/&#1031;/Ї/gi;
$csv=~s/&#1028;/Є/gi;
$csv=~s/&#1108;/є/gi;

$csv=~s/&#8211;/-/gi;
$csv=~s/&#8212;/-/gi;
$csv=~s/&#8217;/'/gi;
$csv=~s/&#8218;/,/gi;
$csv=~s/&#8220;/\"/gi;
$csv=~s/&#8221;/\"/gi;
$csv=~s/&#8222;/\"/gi;
$csv=~s/&#8243;/\"/gi;
$csv=~s/&#8470;/No./gi;
$csv=~s/&#146;/'/gi;
$csv=~s/&#180;/'/gi;
$csv=~s/&#0146;/'/gi;
$csv=~s/&#149;/*/gi;
$csv=~s/&#150;/-/gi;
$csv=~s/&#151;/-/gi;
$csv=~s/&#160;/ /gi;
$csv=~s/&#132;/\"/gi;
$csv=~s/&#147;/\"/gi;
$csv=~s/&#148;/\"/gi;
$csv=~s/&#171;/\"/gi;
$csv=~s/&#187;/\"/gi;

print "Content-type: text/html; charset=UTF-8\n\n<center>";

#print "$link<br>";
#utf8::encode($csv);

#print ("<h1>Perl is working! $csv</h1>");
#exit;
###print "dr=_ $dr _=";
my @y=();

$csv=~s/\r//ig;
$csv=uc($csv);
##utf8::decode($csv);
@y=split("\n",$csv);

my $i;

#for ($i=0; $i<=$#y; $i++) {
#    print "<br>$y[$i]";
#}
#exit;

my $a1;
my $a2;
my %name={};
my $z="";

for ($i=0; $i<=$#y; $i++) {
 utf8::decode($y[$i]);
# print "<br>$y[$i]";
 my $zz=$y[$i];
 $zz=~s/"/'/g;
# $zz="社会不满；公众抗议";
 if ($zz=~m/^(.+?)[；;](.+)$/) {
 #  print  "<br>$i: $y[$i]\n";
   $a1=$1;
   $a2=$2;
   $a1=~s/^\s+//g;
   $a2=~s/^\s+//g;
   $a1=~s/\s+$//g;
   $a2=~s/\s+$//g;
   if (exists $name{$a1}) { $name{$a1}++; }
   else { $name{$a1}=1; }
   if (exists $name{$a2}) { $name{$a2}++; }
   else { $name{$a2}=1; }
   $y[$i]=$a1."; ".$a2;
 }

}
#exit;

my $key;
my @nam;
my @num;

$i=0;
foreach my $key (sort { $name{$a} <=> $name{$b} } keys %name) {
#foreach my $key (keys %name) {
 if ($key!~/^HASH/) {
#   if (length($key)>0) {
     $nam[$i]=$key;
     $num[$i]=$name{$key};
#     print STDERR  "$i: $nam[$i]: $num[$i]\n";
     $i++;
#   }
 }
}

print STDERR "\n-----------------------\n";

for ($i=0; $i<=$#nam; $i++) {
# $url="https://www.google.ru/search?q=".$nam[$i];
 $url="https://www.google.ru/search?newwindow=1&amp;q=".$nam[$i]."&amp;tbm=nws";
 if ($link eq "G") {
  $url="https://www.google.ru/search?q=".$nam[$i];
 }
 if ($link eq "B") {
  $url="https://www.bing.com/search?q=".$nam[$i];
 }
 if ($link eq "BN") {
  $url="https://www.bing.com/news/search?q=".$nam[$i];
 }

 print STDERR  "$i: $nam[$i]: $num[$i]\n";
  if ($num[$i]>4) {
    $g->add_node($nam[$i], URL => $url, @bbig_attrs);
  }
  else {
     if ($num[$i]>2) {
        $g->add_node($nam[$i], URL => $url, @mbig_attrs);
     }
     else {
       if ($num[$i]>1) {
         $g->add_node($nam[$i], URL => $url, @big_attrs);
       }
       else {
        $g->add_node($nam[$i], URL => $url, @small_attrs);
       }
     }
  }
}

#$g->add_node('London', cluster=>$eurocluster, @default_attrs);
my $j=0;
my $k=0;
print STDERR "\n==============\n$#nam\n================\n";
my %pair;
if ($dr eq "on") {
for ($i=0;$i<=$#nam;$i++) {
  for ($j=0;$j<=$#nam;$j++) {
    $z=$nam[$i]."; ".$nam[$j];
#    $url="https://www.google.ru/search?q=".$nam[$i]."+".$nam[$j];
    $url="https://www.google.ru/search?newwindow=1&amp;q=".$nam[$i]."+".$nam[$j]."&amp;tbm=nws";
    if ($link eq "G") {
       $url="https://www.google.ru/search?q=".$nam[$i]."+".$nam[$j];
    }
    if ($link eq "B") {
       $url="https://www.bing.com/search?q=".$nam[$i]."+".$nam[$j];
    }
    if ($link eq "BN") {
       $url="https://www.bing.com/news/search?q=".$nam[$i]."+".$nam[$j];
    }

    for ($k=0;$k<=$#y;$k++) {
       if ($y[$k] eq $z) {
         if ($num[$i]>4) {
           if (exists $pair{$z}) {$pair{$z}++;}
             else {
             $g->add_edge($nam[$i] => $nam[$j], penwidth => 2, layersep => 'back', URL => $url, @bbig_attrs);
             $pair{$z}=1;
           }

         }
         else {
           if ($num[$i]>2) {
           if (exists $pair{$z}) {$pair{$z}++;}
             else {
             $g->add_edge($nam[$i] => $nam[$j], penwidth => 1,  URL => $url, @mbig_attrs);
             $pair{$z}=1;
           }

           }
           else {
             if ($num[$i]>1) {
             if (exists $pair{$z}) {$pair{$z}++;}
             else {

                $g->add_edge($nam[$i] => $nam[$j],style => 'dashed', penwidth => 1, URL => $url, @big_attrs);

                $pair{$z}=1;
           }

             }
             else {
               $g->add_edge($nam[$i] => $nam[$j], style => 'dashed', penwidth => 1,  URL => $url, @small_attrs);
             }
           }
         }
       }
    }
  }
}
} # end $dr eq "on"
else {
for ($i=0;$i<=$#nam;$i++) {
  for ($j=0;$j<=$#nam;$j++) {
    $z=$nam[$i]."; ".$nam[$j];
    for ($k=0;$k<=$#y;$k++) {
       if ($y[$k] eq $z) {
           # arrowhead => 'normal', penwidth => 4,
           # penwidth => 2
           if (exists $pair{$z}) {$pair{$z}++;}
             else {
             my $xzc=$num[$j];
             if ($xzc>3) {
                $xzc=2;
             }
#           $url="https://www.google.ru/search?q=".$nam[$i]."+".$nam[$j];
           $url="https://www.google.ru/search?newwindow=1&amp;q=".$nam[$i]."+".$nam[$j]."&amp;tbm=nws";
           if ($link eq "G") {
              $url="https://www.google.ru/search?q=".$nam[$i]."+".$nam[$j];
           }
           if ($link eq "B") {
              $url="https://www.bing.com/search?q=".$nam[$i]."+".$nam[$j];
           }
           if ($link eq "BN") {
              $url="https://www.bing.com/news/search?q=".$nam[$i]."+".$nam[$j];
           }

           $g->add_edge($nam[$i] => $nam[$j],  penwidth => $xzc, dir => 'none', URL => $url, @big_attrs);
           $pair{$z}++;
           }
       }
    }

  }
}
}

#$g->add_edge($nam[0] => $nam[1], @default_attrs);
#$g->add_edge($nam[1] => $nam[2]);
#my $fl = $ARGV[0] || 'res.png';

#$g->attr('rotate', 90);


srand();
my $ts=int(rand(10000));

my $f1="/var/www/html/tmp/net-".$ts.".svg";  #png

my $f2="/tmp/net-".$ts.".svg"; #png

open my $zf, '>', $f1;
print {$zf} $g->as_svg; # or $g->as_png;
close $zf;

print "
<center>\n
<h1><font color=brown>CSV =&gt; Graph</font></h1>
<p><table bgcolor=white border=0>
<tr>
<td bgcolor=white>
<table width=100% border=0><tr><td>
<b>
&nbsp;Term
</b>
</td>
<td bgcolor=white>
<p align=right><b>Frequency&nbsp;</b>
</td>
</tr>
</table>
</td>
<td bgcolor=white>
<center>
&nbsp;<b>Graph</b>
</td>
</tr>
<tr>
<td bgcolor='white' valign=top>\n";
print "<table>\n";
for ($i=$#nam; $i>=0; $i--) {
# $url="https://www.google.ru/search?q=".$nam[$i];
 $url="https://www.google.ru/search?newwindow=1&amp;q=".$nam[$i]."&amp;tbm=nws";
 if ($link eq "G") {
    $url="https://www.google.ru/search?q=".$nam[$i];
 }
 if ($link eq "B") {
    $url="https://www.bing.com/search?q=".$nam[$i];
 }
 if ($link eq "BN") {
    $url="https://www.bing.com/news/search?q=".$nam[$i];
 }

 print "<tr><td>&nbsp;<a href=\"$url\">$nam[$i]</a>&nbsp;\n<br>";
 print "</td>
 <td bgcolor='white' valign=top>";
 print "&nbsp;",$num[$i],"&nbsp;\n<br></td></tr>";
}
print "</table>\n";

