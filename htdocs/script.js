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
