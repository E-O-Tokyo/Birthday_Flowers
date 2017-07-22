$(function(){


  $( this ).blur() ;

  $("body").append('<div id="modal-overlay"></div>');
  $("#modal-overlay").fadeIn("slow");


  centeringModalSyncer();

  $("#introduction_Modal").fadeIn("slow");

  $( "#modal-overlay,#modal-close" ).unbind().click(function(){

    $( "#introduction_Modal,#modal-overlay").fadeOut("slow", function(){
      $('#modal-overlay').remove();
    });
  });

  $(window).resize(centeringModalSyncer);

  function centeringModalSyncer() {
    var w =$(window).width();
    var h =$(window).height();

    //ここの文章抜いた

  }
});


$(function(){
  var nowModalSyncer=null;
  var modalClassSyncer="modal-syncer";

  var modals=document.getElementsByClassName(modalClassSyncer);

  for(var i=0, l=modals.length; l>i; i++){

    modals[i].onclick =function(){

      this.blur();

    var target=this.getAttribute("data-target");

  if(typeof(target)=="undefined" ||!target||target==null){
    return false;
  }
nowModalSyncer=document.getElementById(target);
if(nowModalSyncer==null){
  return false;
}

$("body").append('<div id="modal-overlay-01"></div>');
$("#modal-overlay-01").fadeIn("fast");

centeringModalSyncer();

$(nowModalSyncer).fadeIn("slow");

$("#modal-overlay-01,#modal-close-01").unbind().click(function(){

  $("#" + target + ",#modal-overlay-01").fadeOut("fast",function(){

    // $('#modal-overlay-01').remove(); いちいち消す必要がない
  });

  nowModalSyncer=null;
});

}

}
$(window).resize( centeringModalSyncer);

function centeringModalSyncer(){
  if(nowModalSyncer==null)
  return false;

  var w=$(window).width();
  var h=$(window).height();

  var cw=$(nowModalSyncer).outerWidth();
  var ch=$(nowModalSyncer).outerHeight();

  $(nowModalSyncer).css({"left": ((w-cw)/2)+"px","top":((h-ch)/2)+"px"});
}
});



window.onload = function exec() {
  var date=new Date();

  var year=date.getFullYear();
  var month=date.getMonth()+1;
  var day=date.getDate();

  month = ('0'+month).slice(-2);
  day = ('0'+day).slice(-2);

  format = 'YYYY-MM-DD';
  format = format.replace(/YYYY/g, year);
  format = format.replace(/MM/g, month);
  format =format.replace(/DD/g, day);

  target=document.getElementById("timeframe");
  target.innerHTML = format;
}


$(document).ready(function(){
  $.getJSON("test.json",function(data){
      console.log(data.month);
      // console.log("months",data[i].month);
      $("#flowers").append(data.month.items);
    })
});
