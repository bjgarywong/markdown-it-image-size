var e;function t(t){return t>=e.NUMBER_ZERO&&t<=e.NUMBER_NINE}function r(r,n,i){const s=function(r,n,i){for(let s=r;s<n;s+=1){const r=i.charCodeAt(s);if(!t(r)&&r!==e.PERCENTAGE)return s}return n}(n,i,r);return{position:s,value:r.slice(n,s)}}!function(e){e[e.EXCLAMATION_MARK=33]="EXCLAMATION_MARK",e[e.OPENING_BRACKET=91]="OPENING_BRACKET",e[e.OPENING_PARENTHESIS=40]="OPENING_PARENTHESIS",e[e.WHITESPACE=32]="WHITESPACE",e[e.NEW_LINE=10]="NEW_LINE",e[e.EQUALS=61]="EQUALS",e[e.LOWER_CASE_X=120]="LOWER_CASE_X",e[e.NUMBER_ZERO=48]="NUMBER_ZERO",e[e.NUMBER_NINE=57]="NUMBER_NINE",e[e.PERCENTAGE=37]="PERCENTAGE"}(e||(e={}));const n=(e,t,r,n,i)=>{const s=e[t],o=s.attrs;o[s.attrIndex("alt")][1]=i.renderInlineAsText(s.children,r,n);let c=i.renderToken(e,t,r);return o.find(e=>"width"==e[0]||"height"==e[0])||(c.endsWith("/>")?c=c.slice(0,-2)+' style="max-width:100%"/>':c.endsWith(">")&&(c=c.slice(0,-1)+' style="max-width:100%">')),c},i=(t,r)=>{let n=t;for(;n<r.posMax;){const t=r.src.charCodeAt(n);if(t!==e.WHITESPACE&&t!==e.NEW_LINE)break;n+=1}return n},s=(t,n)=>{let o,c,E,d="",a="",h="";const u=t.pos,l=t.posMax;if(!(t=>t.src.charCodeAt(t.pos)===e.EXCLAMATION_MARK&&t.src.charCodeAt(t.pos+1)===e.OPENING_BRACKET)(t))return!1;const N=t.pos+2,f=t.md.helpers.parseLinkLabel(t,t.pos+1,!1);if(f<0)return!1;if(o=f+1,o<l&&t.src.charCodeAt(o)===e.OPENING_PARENTHESIS){if(o+=1,o=i(o,t),o>=l)return!1;const n=function(e,t){const r=e.md.helpers.parseLinkDestination(e.src,t,e.posMax);if(!r.ok)return;const n=e.md.normalizeLink(r.str);return e.md.validateLink(n)?{position:r.pos,href:n}:{position:t,href:""}}(t,o);if(!n)return!1;o=n.position,d=n.href,E=o,o=i(o,t);const s=t.md.helpers.parseLinkTitle(t.src,o,t.posMax);o<l&&E!==o&&s.ok?(c=s.str,o=s.pos,o=i(o,t)):c="";const N=function(t,n){if(t-1<0)return;if(n.src.charCodeAt(t-1)!==e.WHITESPACE)return;const s=function(t,n,i){if(n>=i)return;let s=n;if(t.charCodeAt(s)!==e.EQUALS)return;if(s+=1,!((o=t.charCodeAt(s))===e.LOWER_CASE_X||o>=e.NUMBER_ZERO&&o<=e.NUMBER_NINE))return;var o;const c=r(t,s,i);if(s=c.position,t.charCodeAt(s)!==e.LOWER_CASE_X)return;s+=1;const E=r(t,s,i);return s=E.position,{width:c.value,height:E.value,position:s}}(n.src,t,n.posMax);return s?{position:i(s.position,n),width:s.width,height:s.height}:void 0}(o,t);if(N&&(o=N.position,a=N.width,h=N.height),o>=l||41!==t.src.charCodeAt(o))return t.pos=u,!1;o+=1}else{if(void 0===t.env.references)return!1;let e;o=i(o,t),o<l&&91===t.src.charCodeAt(o)?(E=o+1,o=t.md.helpers.parseLinkLabel(t,o),o>=0?e=t.src.slice(E,o+=1):o=f+1):o=f+1,e||(e=t.src.slice(N,f));const r=t.env.references[t.md.utils.normalizeReference(e)];if(!r)return t.pos=u,!1;d=r.href,c=r.title}if(!n){if(""==a&&""==h&&!s.customRender){const e=s.defaultWidth;void 0!==e&&(a=e)}!function(e,t,r,n,i,s,o){e.pos=t,e.posMax=r;const c=e.push("image","img",0);c.children=[];const E=new e.md.inline.State(e.src.slice(t,r),e.md,e.env,c.children);E.md.inline.tokenize(E),c.attrSet("src",n),c.attrSet("alt",""),i&&c.attrSet("title",i),""!==s&&c.attrSet("width",s),""!==o&&c.attrSet("height",o)}(t,N,f,d,c,a,h)}return t.pos=o,t.posMax=l,!0},o=(e,t)=>{void 0!==t&&(t.defaultWidth&&(s.defaultWidth=t.defaultWidth),t.customRender&&(s.customRender=t.customRender,e.renderer.rules.image=n)),e.inline.ruler.before("emphasis","image",s)};export{o as imageSize};
//# sourceMappingURL=index.mjs.map