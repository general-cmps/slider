'use strict';
/**
 * slider.js
 * @version 1.0
 * @description xxx
 * @author Xxx
 */


var $slider = $('.slider-bigul'),
    $sliderLi = $slider.find('li'),
    $sliderBtn = $('.slider-btn'),
    $sliderL = $('.slider-l'),
    $sliderR = $('.slider-r'),
    $sliderBtns = $sliderBtn.find('a');

/**
*首页轮播
*/
function slider(opts) {
    this.time = opts.time || 0;
    this.w = $sliderLi.eq(0).width();
    this.len = $sliderLi.length;
    this.iTimer = 0;
    this.init();

}

slider.prototype = {
    constructor: slider,
    init: function () {
        $sliderBtns.eq(0).addClass('active');

        $slider.append($sliderLi.eq(0).clone());
        $slider.prepend($sliderLi.last().clone().css('margin-left',-this.w));
        this.handleEvent();
    },
    handleEvent: function () {
        var This = this;
        $sliderBtn.on('click', 'a', function () {
            clearInterval(This.timer);
            This.iTimer = $(this).index();
            This.go({
                btn: $(this),
                i: This.iTimer,
                // isRight: true,
                cb: function () {
                    This.goAuto();
                }

            });
        });
        $sliderL.on('click',function () {
            clearInterval(This.timer);

            This.iTimer = (This.iTimer<= 0)?This.len-1:This.iTimer-1;

            This.go({
                btn: $sliderBtns.eq(This.iTimer),
                i: This.iTimer,
                isLeft: true,
                cb: function () {
                    This.goAuto();
                }

            });
        });
        $sliderR.on('click',function () {
            clearInterval(This.timer);
            This.iTimer = (This.iTimer>=This.len-1)?0:This.iTimer+1;

            This.go({
                btn: $sliderBtns.eq(This.iTimer),
                i: This.iTimer,
                isRight: true,
                cb: function () {
                    This.goAuto();
                }

            });
        })
        This.goAuto();

    },
    goAuto: function () {
        var This = this;
        this.timer = setInterval(function () {

            This.iTimer = (This.iTimer>=This.len-1)?0:This.iTimer+1;
            This.go({
                btn: $sliderBtns.eq(This.iTimer),
                i: This.iTimer,
                isRight: true
            });
        },this.time);
    },
    go: function (opts) {
        var This = this;
        var l = null,
            resetL = null;
        if (opts.i <= 0 && opts.isRight) {
            l = -this.len*This.w;
            resetL = 0;
        }else if (opts.i >= This.len-1 && opts.isLeft) {
            l = This.w;
            resetL = -(this.len-1)*This.w;

        }else{
            l = -opts.i*This.w;
        }
        This.move({
            l: l,
            resetL: (!resetL&&resetL!=0) ? null: resetL,
            cb: opts.cb|| ''
        });
        opts.btn.addClass('active').siblings().removeClass('active');
    },
    move: function (opts) {
        $slider.stop().animate({'margin-left': opts.l},400,'linear',function(){
            (opts.resetL||opts.resetL==0)&& ($(this).css({'margin-left': opts.resetL}));
            opts.cb && opts.cb();
        });
    }
};
new slider({
    time: 4000
});

