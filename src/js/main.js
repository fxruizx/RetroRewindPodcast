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

