(function ($) {

    var lastQuery = "",

        findRestaurantsInput = "#findRestaurants",
        restaurantResults = "#restaurantResults",
        rowTemplate = "#restaurantRow",

        $body = $("body"),

        frame = 0,

        bg = 255,
        red = 255,

        setState = function (state) {
            var $states = $("#loadingState, #noResults, #restaurantResults");

            $states.hide();

            if(state === false){
                return;
            }

            $("#" + state).show();
        },

        incrementBackground = function(){
            var hex = bg.toString(16);

            if(hex == "0"){
                hex = "00"
            }

            if(Math.random() < 0.33 && red > 0){
                red--;
            }
            console.log("Red: " + red);
            console.log("other: " + bg);

            var redHex = red.toString(16);

            var property =  "#" + redHex + hex + "" + hex;


            console.log("used: " + property);

            $body.css("background-color", property);

            if(bg > 0){
                bg--;
            }

        },

        enterHell = function(){
            var border;
            frame++;

            border = (frame / 150);
            if(frame % 2 === 0){
                border = border * -1;
            }

            if(frame === 1){
                $("nav").fadeOut(10000);
                $body.prepend("<div id='coverAll'></div>");
                $body.append('<iframe width="660" height="315" src="https://www.youtube.com/embed/6ZL3ofreuQo?autoplay=1;modestbranding=1;controls=0;showinfo=0;rel=0;fs=1" frameborder="0" allowfullscreen></iframe>');

            }

            if(frame === 100){
//                $("iframe").fadeIn(3);
                $("iframe").fadeIn(30000);
                startFire();
                meltPuppies();
            }

            if(frame === 400){
                $("#pentagram").fadeIn(30000);
            }

            if(frame === 666){
                $body.prepend('<iframe class="test" width="560" height="315" src="https://www.youtube.com/embed/6ZL3ofreuQo?autoplay=1;modestbranding=1;controls=0;showinfo=0;rel=0;fs=1" frameborder="0" allowfullscreen></iframe>');
                $("iframe.test").css("left", ($(window).width() - 500) + "px");
            }
            if(frame === 900){
                $(".test").fadeIn(6000);
            }

            if(frame % 3 === 0 && red > 0){
                incrementBackground();
            }

//            $("#pentagram").css("left", ((border / 2) * -1) + "px" );
            $body.css("margin-left", border + "px");

            //console.log("Frame: " + frame);

            setTimeout(enterHell, 30);
        },

        renderRestaurants = function (results) {
            var $resultContainer = $(restaurantResults),
                $rowTemplate = $(rowTemplate);

            $resultContainer.html("");

            $.each(results, function (i, item) {
                $resultContainer.loadTemplate($rowTemplate, item, {prepend : true});
            });

            if (results.length === 0) {
                setState("noResults");
            }
            else {
                setState("restaurantResults");
            }
        },

        getMatchingRestaurants = function (query, callback) {
            //don't duplicate queries.
            if(query === lastQuery){
                return;
            }

            lastQuery = query;

            if(query === ""){
                setState(false);
                return;
            }

            setState("loadingState");

            $.getJSON("/search/" + query, callback);
        },

        ready = function () {
            var started = false;

            $(findRestaurantsInput).keyup(function () {
                var query = $(this).val();
                getMatchingRestaurants(query, renderRestaurants);
            });

            $(".container.main").click(function(){
                if(started){
                    return;
                }
                started = true;
                enterHell();


            });
        };



    $(ready);
}(jQuery));