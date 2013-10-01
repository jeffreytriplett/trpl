/* TRPL Templating : HTML */
trpl.processElement=function(e,d){if(e){var n=e.childNodes,s="";for(var i=0;i<n.length;i++){if(n[i].
nodeType===8){s=n[i].data;break}}e.innerHTML=trpl.process(s,d)}};
