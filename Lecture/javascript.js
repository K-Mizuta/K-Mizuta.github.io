// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime_Scroll(){

    // ふわっ
    $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
      var elemPos = $(this).offset().top+100;//要素より、50px上の
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
      $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
      }else{
      $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
      }
      });

     // 枠線の描写
      $('.lineTrigger').each(function(){ //lineTriggerというクラス名が
        var elemPos = $(this).offset().top+100;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight){
          $(this).addClass('lineanime');// 画面内に入ったらlineanimeというクラス名を追記
        }else{
          $(this).removeClass('lineanime');// 画面外に出たらlineanimeというクラス名を外す
        }
      }); 
  }
  
  // 画面をスクロールをしたら動かしたい場合の記述
    $(window).scroll(function (){
      fadeAnime_Scroll();/* アニメーション用の関数を呼ぶ*/
    });// ここまで画面をスクロールをしたら動かしたい場合の記述


// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime_Load(){
    // ふわっ
    $('.fadeUpLoad').each(function(){ //fadeUpTriggerというクラス名が
        var elemPos = $(this).offset().top-50;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight){
        $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
        }else{
        $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
        }
        });

     // パタッ

  $('.flipDownTrigger').each(function(){ //flipDownTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('flipDown');// 画面内に入ったらflipDownというクラス名を追記
    }else{
    $(this).removeClass('flipDown');// 画面外に出たらflipDownというクラス名を外す
    }
    });
  
  $('.flipLeftTrigger').each(function(){ //flipLeftTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('flipLeft');// 画面内に入ったらflipLeftというクラス名を追記
    }else{
    $(this).removeClass('flipLeft');// 画面外に出たらflipLeftというクラス名を外す
    }
    });

  $('.flipLeftTopTrigger').each(function(){ //flipLeftTopTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('flipLeftTop');// 画面内に入ったらflipLeftTopというクラス名を追記
    }else{
    $(this).removeClass('flipLeftTop');// 画面外に出たらflipLeftTopというクラス名を外す
    }
    });

  $('.flipRightTrigger').each(function(){ //flipRightTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('flipRight');// 画面内に入ったらflipRightというクラス名を追記
    }else{
    $(this).removeClass('flipRight');// 画面外に出たらflipRightというクラス名を外す
    }
    });

  $('.flipRightTopTrigger').each(function(){ //flipRightTopTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('flipRightTop');// 画面内に入ったらflipRightTopというクラス名を追記
    }else{
    $(this).removeClass('flipRightTop');// 画面外に出たらflipRightTopというクラス名を外す
    }
    });
    
  }

  // 画面が読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function(){
    fadeAnime_Load();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

    