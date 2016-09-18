//@cc_on

var fname = "test.txt";
 function getTextFile (fname) {
 var text = null;
 var ajax = new XMLHttpRequest();
 with (ajax) {
 /*@if(1) onreadystatechange @else@*/ onload /*@end@*/ =
 function () { readyState == 4 && status == 200 && (text = responseText); };
 open('GET', fname, false);
 send(null);
 };
 return text;
 }
 

 var str =getTextFile('test.txt');
var data = str.split("\n");


