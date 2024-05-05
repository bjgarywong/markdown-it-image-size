!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e||self).markdownItImageSize={})}(this,function(e){var r;function t(e){return e>=r.NUMBER_ZERO&&e<=r.NUMBER_NINE}function i(e,i,n){var o=function(e,i,n){for(var o=e;o<i;o+=1){var a=n.charCodeAt(o);if(!t(a)&&a!==r.PERCENTAGE)return o}return i}(i,n,e);return{position:o,value:e.slice(i,o)}}!function(e){e[e.EXCLAMATION_MARK=33]="EXCLAMATION_MARK",e[e.OPENING_BRACKET=91]="OPENING_BRACKET",e[e.OPENING_PARENTHESIS=40]="OPENING_PARENTHESIS",e[e.WHITESPACE=32]="WHITESPACE",e[e.NEW_LINE=10]="NEW_LINE",e[e.EQUALS=61]="EQUALS",e[e.LOWER_CASE_X=120]="LOWER_CASE_X",e[e.NUMBER_ZERO=48]="NUMBER_ZERO",e[e.NUMBER_NINE=57]="NUMBER_NINE",e[e.PERCENTAGE=37]="PERCENTAGE"}(r||(r={}));var n=function(e,r,t,i,n){var o=e[r],a=o.attrs;a[o.attrIndex("alt")][1]=n.renderInlineAsText(o.children,t,i);var s=n.renderToken(e,r,t);return a.find(function(e){return"width"==e[0]||"height"==e[0]})||(s.endsWith("/>")?s=s.slice(0,-2)+' style="max-width:100%"/>':s.endsWith(">")&&(s=s.slice(0,-1)+' style="max-width:100%">')),s},o=function(e,t){for(var i=e;i<t.posMax;){var n=t.src.charCodeAt(i);if(n!==r.WHITESPACE&&n!==r.NEW_LINE)break;i+=1}return i},a=function e(t,n){var a,s,E,d="",f="",c="",u=t.pos,h=t.posMax;if(!function(e){return e.src.charCodeAt(e.pos)===r.EXCLAMATION_MARK&&e.src.charCodeAt(e.pos+1)===r.OPENING_BRACKET}(t))return!1;var l=t.pos+2,p=t.md.helpers.parseLinkLabel(t,t.pos+1,!1);if(p<0)return!1;if((a=p+1)<h&&t.src.charCodeAt(a)===r.OPENING_PARENTHESIS){if((a=o(a+=1,t))>=h)return!1;var N=function(e,r){var t=e.md.helpers.parseLinkDestination(e.src,r,e.posMax);if(t.ok){var i=e.md.normalizeLink(t.str);return e.md.validateLink(i)?{position:t.pos,href:i}:{position:r,href:""}}}(t,a);if(!N)return!1;d=N.href,E=a=N.position,a=o(a,t);var A=t.md.helpers.parseLinkTitle(t.src,a,t.posMax);a<h&&E!==a&&A.ok?(s=A.str,a=o(a=A.pos,t)):s="";var v=function(e,t){if(!(e-1<0)&&t.src.charCodeAt(e-1)===r.WHITESPACE){var n=function(e,t,n){if(!(t>=n)){var o=t;if(e.charCodeAt(o)===r.EQUALS&&((E=e.charCodeAt(o+=1))===r.LOWER_CASE_X||E>=r.NUMBER_ZERO&&E<=r.NUMBER_NINE)){var a=i(e,o,n);if(e.charCodeAt(o=a.position)===r.LOWER_CASE_X){var s=i(e,o+=1,n);return{width:a.value,height:s.value,position:o=s.position}}}}var E}(t.src,e,t.posMax);if(n)return{position:o(n.position,t),width:n.width,height:n.height}}}(a,t);if(v&&(a=v.position,f=v.width,c=v.height),a>=h||41!==t.src.charCodeAt(a))return t.pos=u,!1;a+=1}else{if(void 0===t.env.references)return!1;var R;(a=o(a,t))<h&&91===t.src.charCodeAt(a)?(E=a+1,(a=t.md.helpers.parseLinkLabel(t,a))>=0?R=t.src.slice(E,a+=1):a=p+1):a=p+1,R||(R=t.src.slice(l,p));var m=t.env.references[t.md.utils.normalizeReference(R)];if(!m)return t.pos=u,!1;d=m.href,s=m.title}if(!n){if(""==f&&""==c&&!e.customRender){var C=e.defaultWidth;void 0!==C&&(f=C)}!function(e,r,t,i,n,o,a){e.pos=r,e.posMax=t;var s=e.push("image","img",0);s.children=[];var E=new e.md.inline.State(e.src.slice(r,t),e.md,e.env,s.children);E.md.inline.tokenize(E),s.attrSet("src",i),s.attrSet("alt",""),n&&s.attrSet("title",n),""!==o&&s.attrSet("width",o),""!==a&&s.attrSet("height",a)}(t,l,p,d,s,f,c)}return t.pos=a,t.posMax=h,!0};e.imageSize=function(e,r){void 0!==r&&(r.defaultWidth&&(a.defaultWidth=r.defaultWidth),r.customRender&&(a.customRender=r.customRender,e.renderer.rules.image=n)),e.inline.ruler.before("emphasis","image",a)}});
//# sourceMappingURL=index.umd.js.map