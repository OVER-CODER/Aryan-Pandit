const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y:"-10",
        opacity: 0,
        duration: 1.75,
        ease: Expo.easeInOut
        
    })
        .to(".boundingelem", {
            y: 0,
            duration: 2,
            ease: Expo.easeInOut,
            delay: -1,
            stagger: .2
        })
        .from("#herofooter",{
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}

var timeout;

function circleMouseAnim(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;
        xprev = dets.clientX;
        yprev = dets.clientY;
        
        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);
        circleMouseFollow(xscale, yscale);
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;    
        }, 100)
    });
}

function circleMouseFollow(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
circleMouseAnim();
circleMouseFollow();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(details){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 1
        });
    });
    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;
        
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff-100,
            left: details.clientX - 100,
            rotate: gsap.utils.clamp(-20,20, diffrot)
        });
    });
});

gsap.to("#circleanime",{
    rotate: 0,
    ease:Expo.easeInOut,
    duration: 3
})

var active =3;

var panelcircles = document.querySelectorAll(".panelcircle");
var secs = document.querySelectorAll(".sec");
gsap.to(panelcircles[active-1],{
    opacity: .7
})
gsap.to(secs[active-1],{
    opacity: 1
})
panelcircles.forEach(function(val, index){
    val.addEventListener("click", function(){
        gsap.to("#circleanime",{
            rotate: (3-(index+1))*10,
            ease: Expo.easeInOut,
            duration: 1.5
        })
        allgrey();
        gsap.to(this, {
            opacity: .7
        })

        gsap.to(secs[index],{
            opacity: 1
        })
    })
})

function allgrey(){
    gsap.to(panelcircles,{
        opacity: .3
    })

    gsap.to(secs,{
        opacity: .4
    })
}