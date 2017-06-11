var j = document.createElement('script');
j.src = chrome.extension.getURL('./libs/jquery.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('./libs/gmail.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('./bundle.js');
(document.head || document.documentElement).appendChild(s);
