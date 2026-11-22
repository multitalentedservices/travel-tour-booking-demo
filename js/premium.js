// Premium signature (Travel): Lenis smooth scroll + ONE pinned horizontal Hunza chapter.
// Default (no JS / reduced motion): the chapter is a complete vertical stack — see CSS.
(function(){var STATIC=/[?&]static=1(?:&|$)/.test(window.location.search)||document.documentElement.hasAttribute("data-static");if(STATIC){document.documentElement.setAttribute("data-static","");return;} /* static capture mode: chapter stays the complete vertical stack */
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(!window.gsap||!window.ScrollTrigger)return;gsap.registerPlugin(ScrollTrigger);
var wrap=document.querySelector(".htrack-wrap"),track=document.querySelector(".htrack");if(!wrap||!track)return;
document.documentElement.classList.add("premium-on");
if(window.Lenis){var lenis=new Lenis({lerp:0.09});lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000);});gsap.ticker.lagSmoothing(0);}
function dist(){return Math.max(0,track.scrollWidth-window.innerWidth);}
var tween=gsap.to(track,{x:function(){return -dist();},ease:"none",
 scrollTrigger:{trigger:wrap,start:"top top",end:function(){return "+="+dist();},scrub:1,pin:true,anticipatePin:1,invalidateOnRefresh:true}});
window.addEventListener("load",function(){ScrollTrigger.refresh();});})();
