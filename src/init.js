$(document).ready(function(){
  window.dancers = [];
  window.dancing = false;

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    if (this.id === "Pokemon") {
      var dancer = new BananaDancer(
        $("body").height() * Math.random() * 0.95,
        $("body").width() * Math.random() * 0.95,
        Math.random() * 1000
      );
    }
    if(this.id ==="BlinkyDancer") {
      var dancer = new BlinkyDancer(
        $("body").height() * Math.random() * 0.95,
        $("body").width() * Math.random() * 0.95,
        Math.random() * 1000
      );
    }
    if(this.id ==="RainbowDancer") {
      var dancer = new RainbowDancer(
        $("body").height() * Math.random() * 0.95,
        $("body").width() * Math.random() * 0.95,
        Math.random() * 1000
      );
    }
    dancers.push(dancer);
    $('body').append(dancer.$node);
  });
//if we have time, make lineup temporary
  $(".Lineup").on("click", function(event){
    dancing = true;
    $(".dancer").animate({left: ($('body').width()*.25).toString()}, 2000);
    $(".gif").animate({left: ($('body').width()*.75).toString()}, 2000);
    setTimeout(function(){
      dancing = false;
      for(var i = 0; i < dancers.length; i++) {
        var top = dancers[i].top;
        var left = dancers[i].left;
        dancers[i].$node.animate({left: left, top: top}, 2000);
      }
    }, 5000);
  });
  $(".Dosido").on("click", function(){
    dancing = true;
    for(var i = 0; i < dancers.length; i+=2){
      if(dancers[i+1]) {
        doSiDo(dancers[i], dancers[i+1]);
      }
    }
  });
  $(document).on("mouseover",".gif", function(){
    $('body').css({cursor:'url(src/pokeball.png), auto'});
  }).on("mouseleave",".gif", function(){
    $('body').css({cursor:'auto'});
  }).on("click", ".gif", function(){
    $('body').css({cursor:'auto'});
    $(this).animate({height: "0px", width: "0px"}, 1000);
  });
});

