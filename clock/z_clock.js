$(document).ready(function() {

  var debuger = function(msg) {
    $("#debug").html($("#debug").html() + "<br/>" + msg);
  }

  var updateClock = function(face, showSec) {
    // debuger(face + ", " + showSec);
    var clock = $('.clock').FlipClock({
      clockFace: face,
      showSeconds: (showSec === "1")
    });
  }

  var set_background_color = function(color) {
    $("body").css("background-color", color);
  }

  var set_background_position_x = function(x) {
    var clock_width = 460; // writen in flipclock css
    var width = $(window).width() - clock_width;
    var pos_x = width * (x / 100.0);
    $(".clock").css({
      "margin-left": pos_x
    });
  }

  var set_background_position_y = function(y) {
    var clock_width = 460; // writen in flipclock css
    var height = $(window).height() - $(".clock").height();
    var pos_y = height * (y / 100.0);
    $(".clock").css({
      "top": pos_y
    });
  }

  var set_opacity = function(op) {
    $(".clock").css("opacity", op/100.0);
  }

  var fake_set_slider = function() {
    // ... do nothing.
    return true;
  }

  var init_random = function() {
    var r = parseInt(Math.random() * 100);
    for(var i=0; i<r; i++) {
      window.wallpaperRequestRandomFileForProperty('background_2_directory', fake_set_slider);
    }
  }

  // set_background_position(50,50);

  var view_mode = 0,
    duration = 3000, // used in view mode 3
    raw_duration = 3, // input from controler
    time_unit = 1, // time unit 1: second, 60: minute, 3600: hour
    image_src = "destroy", // used in view mode 2
    old_path = "destroy", // used in view mode 3
    clockFace = "", // ie: HH:MM:SS
    showSec = ""; // "1" or "0"

  var set_slider = function(propertyName, path) {
    // debuger(path);
    var old_src = 'file:///' + old_path,
      new_src = 'file:///' + path;
    var fade_time = Math.min(duration/5, 1000);
    $("#bg-cover").backstretch(new_src);
    $("#bg-cover").fadeIn((fade_time * 1.1), complete=function() {
      $("#bg-cover").hide();
    });
    setTimeout(function() {
      $("body").backstretch(new_src);
    }, fade_time);
    old_src = path;
  }

  window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
      if (properties.clockFace) {
        var options = properties.clockFace.value.split(' ');
        clockFace = options[0];
        showSec = options[1];
        updateClock(clockFace, showSec);
      }

      if (properties._customcombo) {
        var old_mode = view_mode;
        view_mode = properties._customcombo.value;
        if(view_mode == 1) {
          $("body").backstretch("destroy");
        }
        if(view_mode == 2) {
          // debuger(image_src);
          $("body").backstretch(image_src);
          $("#bg-cover").hide();
        }
        if(old_mode == 0) {
          init_random();
        }
      }

      if (properties.position_x) {
        var x = properties.position_x.value;
        set_background_position_x(x);
      }

      if (properties.position_y) {
        var y = properties.position_y.value;
        set_background_position_y(y);
      }

      if (properties.opacity) {
        var op = properties.opacity.value;
        set_opacity(op);
      }

      if (properties.schemecolor) {
        // Convert the scheme color to be applied as a CSS style
        var schemeColor = properties.schemecolor.value.split(' ');
        schemeColor = schemeColor.map(function(c) {
          return Math.ceil(c * 255);
        });
        var schemeColorAsCSS = 'rgb(' + schemeColor + ')';
        set_background_color(schemeColorAsCSS);
      }

      if (properties.background_4_unit) {
        time_unit = properties.background_4_unit.value;
        duration = raw_duration * 1000 * time_unit;
      }

      if (properties.background_3_duration) {
        raw_duration = properties.background_3_duration.value;
        duration = raw_duration * 1000 * time_unit;
      }

      if (properties.background_1_image) {
        image_src = 'file:///' + properties.background_1_image.value;
        if (!properties.background_1_image.value) {
          image_src = "destroy";
          $("body").backstretch(image_src);
        } else if(view_mode == 2) {
          $("body").backstretch(image_src);
        }
      }

    }
  };

  function slider_loop() {
    if(view_mode == 3) {
      window.wallpaperRequestRandomFileForProperty('background_2_directory', set_slider);
    }
  }

  function timer() {
    slider_loop();
    setTimeout(function(){ timer(); }, duration);
  }

  timer();

  $(".clock").click(function() {
    updateClock(clockFace, showSec);
  });

});