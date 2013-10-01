/* TRPL Templating : Core */
var trpl={process:function(s,d){return trpl.parse(s,[d],0,[],[],[])},parse:function(s,d,x,i,t,l){var
 pS=s.match(/^(\\[{}]|[^{}])*/g)[0],nS=s.substring(pS.length),rS=!x?pS.replace(/\\[{}]/g,function(m)
{return m[1]}):"";if(nS[0]==="{"){pS=nS.match(/^(\\[|}]|[^|}])*/g)[0];nS=nS.substring(pS.length);if(
x){if(nS[0]==="|"){x++}}else{var iO=trpl.interpret(pS.substring(1),d,i,l);if(nS[0]==="}"){if(iO.
length>0){for(var j=0;j<iO.length;j++){if(typeof iO[j]==="object"){rS+=JSON.stringify(iO[j])}else{rS
+=iO[j]}}}else{if(typeof iO==="boolean"){rS+=iO}}}else{if(nS[0]==="|"){if(iO.length>0){nS=nS.
substring(1);t.splice(0,0,"o");d.splice(0,0,null);i.splice(0,0,0);l.splice(0,0,iO.length);for(var j=
0;j<iO.length;j++){d[0]=iO[j];i[0]++;rS+=trpl.parse(nS,d,x,i,t,l)}nS=""}else{if(iO===true){t.splice(
0,0,"c")}else{x++}}}}}if(nS){rS+=trpl.parse(nS.substring(1),d,x,i,t,l)}}else{if(nS[0]==="}"){if(x){
x--}else{if(t[0]==="o"){if(i[0]>=l[0]){t.splice(0,1);d.splice(0,1);l.splice(0,1);i.splice(0,1)}else{
nS=""}}else{t.splice(0,1)}}if(nS){rS+=trpl.parse(nS.substring(1),d,x,i,t,l)}}}return rS},interpret:
function(s,d,i,l){var sA=s.split(";"),pS="",nS="",pN=0,pB=null,kA=[],nA=null,tB=false,qB=null,sB=
false,iB=false,qA=[];for(var j=0;j<sA.length;j++){nS+=sA[j];if(nS[nS.length-1]!=="\\"||j===sA.length
-1){pS=nS.match(/^[$\s]*/g)[0];nS=nS.substring(pS.length);pN=pS.split("$").length-1;qO=d[pN];pS=nS.
match(/^(\\[#%?!=<>]|[^#%?!=<>])*/g)[0];nS=nS.substring(pS.length);tB=false;nA=null;sB=false;iB=
false;pB=false;if(pS.length>0){kA=pS.split("$");pS="";for(var k=0;k<kA.length;k++){pS+=kA[k].replace
(/^\s+|\s+$/g,"").replace(/\\[#%?!=<>|}]/g,function(m){return m[1]});if(pS[pS.length-1]!=="\\"||k===
kA.length-1){if(pS.length>0&&typeof qO==="object"){if(qO.length!==undefined&&!isNaN(pS)){pS=parseInt
(pS);pS=pS>0?pS-1:pS<0?qO.length+pS:""}qO=qO[pS]}else{qO=undefined}pS=""}else{pS=pS.substring(0,pS.
length-1)+"$"}}tB=true}if(nS.length>0){pS=nS.match(/^(#\s*-?[0-9]*\s*)?/g)[0];nS=nS.substring(pS.
length);if(pS.length>0){if(typeof qO==="object"&&qO.length!==undefined){pS=parseInt(pS.substring(1))
;if(!isNaN(pS)){kA=qO.slice(0,qO.length);qO=[];for(var k=pS<0?-pS:pS;k>0;k--){qO.push(kA.splice(0,pS
<0?Math.floor(kA.length/k):Math.ceil(kA.length/k)))}pB=null}else{qO=qO.length}}else{qO=undefined}tB=
true}if(nS.length>0){pS=nS.match(/^(%\s*-?[0-9]*\s*)?/g)[0];nS=nS.substring(pS.length);if(pS.length>
0){pS=parseInt(pS.substring(1));if(!isNaN(pS)){if(typeof qO==="object"&&qO.length!==undefined){kA=qO
.slice(0,qO.length);nA=[];if(pS<0){pS*=-1;kA.reverse()}if(pS===1){for(var k=0;k<qO.length;k++){nA.
push(kA[k])}}else{for(var k=0;k<Math.ceil(qO.length/pS);k++){nA.push(kA.splice(0,pS))}}pB=null}qO=
undefined}else{if(!tB){qO=i[pN];iB=true}}tB=true}if(nS.length>0){pS=nS.match(/^\?\s*$/g);if(pS){sB=
true}else{pS=nS.match(/^[!=<>].*/g);if(pS&&pB!==null){nS=pS[0][0];pS=pS[0].substring(1);pB=false;if(
pS.length>0){if(!isNaN(pS)){pS=parseInt(pS);if(iB&&pS<0){pS=l[pN]+(pS+1)}}if(!isNaN(qO)){qO=parseInt
(qO)}if(nS==="!"&&qO!==pS||nS==="="&&qO===pS||nS==="<"&&qO<pS||nS===">"&&qO>pS){pB=true}}else{if(nS
==="!"&&(!qO&&qO!==0||qO.length===0)||nS==="="&&(qO&&qO.length!==0||qO===0)){pB=true}}if(qB===null||
pB){qB=pB}}qO=undefined}}}}if(nA===null){nA=[qO]}for(var k=0;k<nA.length;k++){if(sB||(nA[k]&&nA[k].
length!==0||nA[k]===0)){qA.push(nA[k])}}nS=""}else{nS=nS.substring(0,nS.length-1)+";"}}if(qB!==null)
{return qB}else{return qA}}};
