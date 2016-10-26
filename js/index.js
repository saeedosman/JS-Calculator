function evaluate(s, ans) {
    s = s.replace(/x/g, "*");
    s = s.replace(/÷/, "/");
    s = s.replace(/ANS/g, ans);
    return eval(s);
}

function clearAll() {
    $(".curr").text("0");
    $(".prev").html("&nbsp;");
}

$(document).ready(function() {
    var ans = 0;
    var ansState = false;
    $(".b").click(function() {
        var id = this.id;
        var currText = jQuery.trim($(".curr").text());
        var prevText = jQuery.trim($(".prev").text());
        var lastChar = currText.length - 1;
        console.log(prevText);

        if ("0123456789.".indexOf(id) > -1) {
            if (ansState) {
                $(".prev").text("Ans = " + ans);
            }

            if ((currText) == "0" || ansState == true) {
                $(".curr").text(id);
                ansState = false;
            } else {
                $(".curr").append(id);
            }

        } else if ("/*-+".indexOf(id) > -1) {
            if (ansState) {
                $(".prev").text("Ans = " + ans);
                ansState = false;
            }

            if ("/*-+".indexOf(currText[lastChar]) == -1) {
                if (id == "/") {
                    $(".curr").append(" ÷ ");
                } else if (id == "*") {
                    $(".curr").append(" x ");
                } else {
                    $(".curr").append(" " + id + " ");
                }
            }
        } else if (id == "=") {
            console.log("equal");
            $(".prev").text(currText.replace(/ANS/g, ans) + " =");
            $(".curr").text(evaluate(currText, ans));
            ans = evaluate(currText, ans);
            ansState = true;
        } else if (id == "ac") {
            clearAll();
            ans = 0;
            ansState = false;
        } else if (id == "ce") {
            if (prevText.indexOf("Ans") == -1) {
                clearAll();
                ans = 0;
            } else {
                $(".curr").text(ans);
            }
        } else if (id == "ANS") {
            if (ansState) {
                $(".prev").text("Ans = " + ans);
            }

            if ((currText) == "0" || ansState == true) {
                $(".curr").text(id);
                ansState = false;
            } else {
                $(".curr").append(id);
            }
        }

    });
});