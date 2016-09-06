var ShowOverlayFor = function($element, $scope) {
    var body = $("body");

    var wScale = 1.3;
    var hScale = 2;

    var hintWidth = $($element).outerWidth() * wScale;
    var hintHeight = $($element).outerHeight() * hScale;
 
    var hintBottom = $($element).attr("hint-bottom");

    var d = $("<div>").addClass("tutorial-shadow")
                .css("left", $($element).offset().left)
                .css("top", $($element).offset().top)
                .css("width", hintWidth)
                .css("height", hintHeight)
                .css("background-size", hintWidth + "px " + hintHeight + "px")
                .appendTo(body);



    var leftShadow = $("<div>")
                        .addClass("tutorial-shadow-cover")
                        .css("top", 0)
                        .css("bottom", 0)
                        .css("left", 0)
                        .appendTo(body);

    var rightShadow = $("<div>")
                        .addClass("tutorial-shadow-cover")
                        .css("right", 0)
                        .css("top", 0)
                        .css("bottom", 0)
                        .appendTo(body);


                        
    var topShadow = $("<div>")
                        .addClass("tutorial-shadow-cover")
                        .css("top", 0)
                        .appendTo(body);

    var bottomShadow = $("<div>")
                        .addClass("tutorial-shadow-cover")
                        .css("bottom", 0)
                        .appendTo(body);


    var hintText = $("<div>")
                        .addClass("tutorial-text")
                        .text($($element).attr("hint-text"))
                        .appendTo(body);

    var hintArrow = $("<div>")
                        .addClass("tutorial-arrow")
                        .appendTo(body);

    if (hintBottom) {
        hintArrow.css("transform", "scaleY(-1)");
    }

    var oldLeft = 0;
    var oldTop = 0;
    var oldWidth = hintWidth;
    var oldHeight = hintHeight

    var SetPosition = function() {
        var o = $($element).offset();

        var w = $($element).outerWidth() * wScale;
        var h = $($element).outerHeight() * hScale;

        if (oldTop != o.top || oldLeft != o.left || oldHeight != h || oldWidth != w) {

            oldWidth = w;
            oldHeight = h;

            var ow = w;
            var oh = h;


            d.css("left", o.left - ow * 0.12)
             .css("top", o.top - oh * 0.25)
             .css("width", w)
             .css("height", h)
             .css("background-size", w + "px " + h + "px");

            oldLeft = o.left;
            oldTop = o.top;

            leftShadow.css("width", d.offset().left);
            rightShadow.css("left", d.offset().left + d.outerWidth());


            topShadow.css("left", d.offset().left);
            topShadow.css("width", d.outerWidth());
            topShadow.css("height", d.offset().top);

            bottomShadow.css("left", d.offset().left);
            bottomShadow.css("width", d.outerWidth());
            bottomShadow.css("top", d.offset().top + d.outerHeight());


            hintArrow.css("left", d.offset().left + ow - 10);

            if (hintBottom) {
                hintArrow.css("top", d.offset().top + hintArrow.outerHeight() - oh / 2);
            } else {
                hintArrow.css("top", d.offset().top - hintArrow.outerHeight() + oh / 2);
            }

            hintText.css("left", hintArrow.offset().left + hintArrow.outerWidth() - hintText.outerWidth() / 2);

            if (hintBottom) {
                hintText.css("top", d.offset().top + d.outerHeight() + hintArrow.outerHeight());
            } else {
                hintText.css("top", d.offset().top - hintArrow.outerHeight() - hintText.outerHeight() + oh/2);
            }

        }
    };


    var intervalId = setInterval(SetPosition, 100);
    SetPosition();


    var CloseHint = function() {
        d.remove();
        topShadow.remove();
        bottomShadow.remove();
        leftShadow.remove();
        rightShadow.remove();

        hintArrow.remove();
        hintText.remove();

        clearInterval(intervalId);
    };

    $scope.$on('$destroy', CloseHint);

    if ($($element).attr("hint-close-on-click")) {
        d.css("pointer-events", "auto");
        d.click(CloseHint);
    }
};

