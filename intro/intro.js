$(document).ready(function() {
    $("body").css("background-color", "black").hide().fadeIn(4000);
    $(".quote1 > p").hide();

    $(".logoimg").click(function() {
        $(this).css("opacity", "0");
        $(".instructions").css("opacity", "0");
    });
});


function IntroQuote() {
    var p = $(".quote1 > p").hide();
    setTimeout(function() {}, 100);
    (function oneParagraph(i) {
        if (p.length <= i)
            return;
        var cur = p.eq(i),
            words = cur.text().split(/\s/),
            span = $("<span>"),
            before = document.createTextNode("");
        cur.empty().show().append(before, span);
        (function oneWord(j) {
            if (j < words.length) {
                span.hide().text(words[j]).fadeIn(350, function() {
                    span.empty();
                    before.data += words[j] + " ";
                    oneWord(j + 1);
                });
            } else {
                span.remove();
                before.data = words.join(" ");
                if ((p.length - 1) > i) {
                    setTimeout(function() {
                        p.hide();
                    }, 750);
                } else {
                    // replace the original paragraph with the link
                    var link = $("<a>")
                        .text(words.join(" "))
                        .attr("href", "#")
                        .css({
                            "color": "white",
                            "text-decoration": "none",
                            "font-weight": "bold"
                        })
                        .click(function(event) {
                            event.preventDefault();
                            $("body").fadeOut(2000, function(){
                                window.location.href = "choice/choice.html";
                            });
                        });
                    cur.replaceWith($("<p>").append(link));
                }
                setTimeout(function() {
                    oneParagraph(i + 1);
                }, 1000);
            }
        })(0);
    })(0);
}

