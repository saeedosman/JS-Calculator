function evaluate(s,ans) {
  s = s.replace(/x/g,"*");
  s = s.replace(/?/g,"/");
  s = s.replace(/ANS/g,ans);
  return eval(s);
}

function clearAll() {
  $(".curr").text("0");
  $(".prev").html("&nbsp;");
}

var keys = {
  13: "=",
  27: "ac",
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: {
    0:"8",
    1:"*",
  },
  57: "9",
  187: {
    0:"=",
    1:"+"
  },
  189: "-",
  190: ".",
  191: "/",
  shiftDown: false,
};

$( document ).ready(function() {
  var ans = 0;
  var ansState = false;
  $(".b").click(function(){
    var id = this.id;
    var currText = jQuery.trim($(".curr").text());
    var prevText = jQuery.trim($(".prev").text());
    var lastChar = currText.length-1;
    

    if ("0123456789.".indexOf(id) > -1) {
      if (ansState) {
        $(".prev").text("Ans = " + ans);
      }

      if ((currText) == "0" || ansState == true) {
        $(".curr").text(id);
        ansState = false;
      }
      else {
        $(".curr").append(id);
      }

    }

    else if ("/*-+".indexOf(id) > -1) {
      if (ansState) {
        $(".prev").text("Ans = " + ans);
        ansState = false;
      }

      if ("/*-+".indexOf(currText[lastChar]) == -1) {
        if (id=="/") {
          $(".curr").append(" ? ");
        }
        else if (id=="*") {
          $(".curr").append(" x ");
        }
        else {
          $(".curr").append(" " + id + " ");
        }
      }
    }

    else if (id == "=") {
      console.log("equals");
      $(".prev").text(currText.replace(/ANS/g,ans) + " =");
      $(".curr").text(evaluate(currText,ans));
      ans = evaluate(currText,ans);
      ansState = true;
    }

    else if (id == "ac") {
      clearAll();
      ans = 0;
      ansState = false;
    }

    else if (id == "ce") {
      if (prevText.indexOf("Ans") == -1) {
        clearAll();
        ans = 0;
      }
      else {
        $(".curr").text(ans);
      }
    }

    else if (id == "ANS") {
      if (ansState) {
        $(".prev").text("Ans = " + ans);
      }

      if ((currText) == "0" || ansState == true) {
        $(".curr").text(id);
        ansState = false;
      }
      else {
        $(".curr").append(id);
      }
    }

  });

  $(document).keydown(function(e) {
    if (e.which == 16) {
      keys["shiftDown"] = true;
    }
  });

  $(document).keyup(function(e) {
    if (e.which == 16) {
      keys["shiftDown"] = false;
    }

    
    if (!jQuery.isEmptyObject(keys[e.which])) {
      var n = Object.keys(keys[e.which]).length;
      
      if (!keys.shiftDown && n <= 1) {
        console.log("#" + keys[e.which]);
        $(document.getElementById(keys[e.which])).trigger("click");
      }
      else if (!keys.shiftDown && n > 1 && keys[e.which]!="ac") {
        console.log("#" + keys[e.which][0]);
        $(document.getElementById(keys[e.which][0])).trigger("click");
      }
      else if (keys.shiftDown && n > 1) {
        console.log("#" + keys[e.which][1]);
        $(document.getElementById(keys[e.which][1])).trigger("click");
      }
      else {
        console.log("#" + keys[e.which]);
        $(document.getElementById(keys[e.which])).trigger("click");
      }
    }


  });
});