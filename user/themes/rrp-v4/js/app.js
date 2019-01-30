$(function(){
    //Add mobile class if window starts as 640px or lower
    if( window.innerWidth <=640 ) {
        $('.header-block').addClass("mobile");
    }
    
    //Add mobile class if window resizes below 640px or lower
    $( window ).resize(function() {
        if($(window).width() <=640) $('.header-block').addClass("mobile");
        else $('.header-block').removeClass("mobile");
    });
    
    //Toggle class for adding a transition to the nav being clicked
    $('.header-block__mobile-icon a').click(function(e){
        e.preventDefault();
        var selectedElm = $(this).parents('.header-block');
        console.info('selectedElm: ', selectedElm);
        
        if( $(selectedElm).hasClass('mobile') ){
            if( $(selectedElm).has('.slider__from-left') ) $(selectedElm).find('.slider__from-left').toggleClass('slider__from-left--transition');
            if( $(selectedElm).has('.slider__from-right') ) $(selectedElm).find('.slider__from-right').toggleClass('slider__from-right--transition');
        }

    });

    //Play/Pause Functionality 
    var playIconPath = "M1576 927l-1328 738q-23 13-39.5 3t-16.5-36v-1472q0-26 16.5-36t39.5 3l1328 738q23 13 23 31t-23 31z",
        pauseIconPath = "M1664 192v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45zm-896 0v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45z",
        currentPlayBtn = null,
        currentAudio = null;
        
    //Add class jQ-audtio-btn to btn blocks that need to be controlled by all 
    //  play/pause buttons on the same page
    $('.jQ-audio-btn').click(function(e){
        e.preventDefault();
        var audioInst = $(this).siblings('audio').get(0);
        
        // Check if audio is already playing on the page, and that it isn't being
        //  paused by the same button that started it
        if(currentAudio && (currentAudio != audioInst)){
            currentAudio.pause();
            currentAudio = audioInst;
            currentPlayBtn.find('svg path').attr('d',playIconPath);
            currentPlayBtn = $(this);
            
            audioInst.play();
            $(this).find('svg path').attr('d',pauseIconPath);

        }else{
            if(audioInst.paused){
                currentPlayBtn = $(this);
                currentAudio = audioInst;
                audioInst.play();
                var fadableImg = $(this).parent().siblings('.ep-intro-block__cover-art--to-fade');
                if(fadableImg && !fadableImg.hasClass('fade-out')){
                    $('.ep-intro-block__cover-art--to-fade').addClass('fade-out');
                }
                $(this).find('svg path').attr('d',pauseIconPath);
            }else{
                audioInst.pause();
                $(this).find('svg path').attr('d',playIconPath);
            }
        }
    });
    
    //Change Icon on any Audio when it finishes playing
    $('audio').on('ended',function(){
       $(this).siblings('.jQ-audio-btn').find('svg path').attr('d',playIconPath);
    });
    
    //Jump to timecodes on single episode page
    $('.timestamps-block__time').click(function(e){
        var timecode = $(this).attr('data-time'),
            audioInst = $('audio'),
            totalsec = 0;
        
        console.log("timecode = " + timecode);
        if(!audioInst.get(0).paused){
           totalsec = hmsToSecondsOnly(timecode);
           audioInst.get(0).currentTime = totalsec;
           console.log("totalsec = " + totalsec);
        }else{
            console.log("nothing playing");
        }
        
    });
    
    //Convert hh:mm:ss time code to just seconds
    function hmsToSecondsOnly(str) {
        var p = str.split(':'),
            s = 0, m = 1;
    
        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }
        return s;
    }
});


/*!
 * tablesort v4.1.0 (2016-12-29)
 * http://tristen.ca/tablesort/demo/
 * Copyright (c) 2016 ; Licensed MIT
*/!function(){function a(b,c){if(!(this instanceof a))return new a(b,c);if(!b||"TABLE"!==b.tagName)throw new Error("Element must be a table");this.init(b,c||{})}var b=[],c=function(a){var b;return window.CustomEvent&&"function"==typeof window.CustomEvent?b=new CustomEvent(a):(b=document.createEvent("CustomEvent"),b.initCustomEvent(a,!1,!1,void 0)),b},d=function(a){return a.getAttribute("data-sort")||a.textContent||a.innerText||""},e=function(a,b){return a=a.toLowerCase(),b=b.toLowerCase(),a===b?0:a<b?1:-1},f=function(a,b){return function(c,d){var e=a(c.td,d.td);return 0===e?b?d.index-c.index:c.index-d.index:e}};a.extend=function(a,c,d){if("function"!=typeof c||"function"!=typeof d)throw new Error("Pattern and sort must be a function");b.push({name:a,pattern:c,sort:d})},a.prototype={init:function(a,b){var c,d,e,f,g=this;if(g.table=a,g.thead=!1,g.options=b,a.rows&&a.rows.length>0)if(a.tHead&&a.tHead.rows.length>0){for(e=0;e<a.tHead.rows.length;e++)if("thead"===a.tHead.rows[e].getAttribute("data-sort-method")){c=a.tHead.rows[e];break}c||(c=a.tHead.rows[a.tHead.rows.length-1]),g.thead=!0}else c=a.rows[0];if(c){var h=function(){g.current&&g.current!==this&&g.current.removeAttribute("aria-sort"),g.current=this,g.sortTable(this)};for(e=0;e<c.cells.length;e++)f=c.cells[e],f.setAttribute("role","columnheader"),"none"!==f.getAttribute("data-sort-method")&&(f.tabindex=0,f.addEventListener("click",h,!1),null!==f.getAttribute("data-sort-default")&&(d=f));d&&(g.current=d,g.sortTable(d))}},sortTable:function(a,g){var h=this,i=a.cellIndex,j=e,k="",l=[],m=h.thead?0:1,n=a.getAttribute("data-sort-method"),o=a.getAttribute("aria-sort");if(h.table.dispatchEvent(c("beforeSort")),g||(o="ascending"===o?"descending":"descending"===o?"ascending":h.options.descending?"ascending":"descending",a.setAttribute("aria-sort",o)),!(h.table.rows.length<2)){if(!n){for(;l.length<3&&m<h.table.tBodies[0].rows.length;)k=d(h.table.tBodies[0].rows[m].cells[i]),k=k.trim(),k.length>0&&l.push(k),m++;if(!l)return}for(m=0;m<b.length;m++)if(k=b[m],n){if(k.name===n){j=k.sort;break}}else if(l.every(k.pattern)){j=k.sort;break}for(h.col=i,m=0;m<h.table.tBodies.length;m++){var p,q=[],r={},s=0,t=0;if(!(h.table.tBodies[m].rows.length<2)){for(p=0;p<h.table.tBodies[m].rows.length;p++)k=h.table.tBodies[m].rows[p],"none"===k.getAttribute("data-sort-method")?r[s]=k:q.push({tr:k,td:d(k.cells[h.col]),index:s}),s++;for("descending"===o?(q.sort(f(j,!0)),q.reverse()):q.sort(f(j,!1)),p=0;p<s;p++)r[p]?(k=r[p],t++):k=q[p-t].tr,h.table.tBodies[m].appendChild(k)}}h.table.dispatchEvent(c("afterSort"))}},refresh:function(){void 0!==this.current&&this.sortTable(this.current,!0)}},"undefined"!=typeof module&&module.exports?module.exports=a:window.Tablesort=a}();

//Including number sort add on
(function(){
  var cleanNumber = function(i) {
    return i.replace(/[^\-?0-9.]/g, '');
  },

  compareNumber = function(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    a = isNaN(a) ? 0 : a;
    b = isNaN(b) ? 0 : b;

    return a - b;
  };

  Tablesort.extend('number', function(item) {
    return item.match(/^-?[£\x24Û¢´€]?\d+\s*([,\.]\d{0,2})/) || // Prefixed currency
      item.match(/^-?\d+\s*([,\.]\d{0,2})?[£\x24Û¢´€]/) || // Suffixed currency
      item.match(/^-?(\d)*-?([,\.]){0,1}-?(\d)+([E,e][\-+][\d]+)?%?$/); // Number
  }, function(a, b) {
    a = cleanNumber(a);
    b = cleanNumber(b);

    return compareNumber(b, a);
  });
}());
//# sourceMappingURL=app.js.map
