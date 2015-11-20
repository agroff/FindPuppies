(function ($) {

    var lastQuery = "",

        findRestaurantsInput = "#findRestaurants",
        restaurantResults = "#restaurantResults",
        rowTemplate = "#restaurantRow",

        $body = $("body"),

        frame = 0,

        bg = 255,

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
            $body.css("background-color", "#FF" + hex + "" + hex);
            bg--;
        },

        enterHell = function(){
            var border;
            frame++;

            if(frame < 300){
                border = (frame / 100);
            }
            else {
                border = (frame / 4);
            }
            if(frame % 2 === 0){
                border = border * -1;
            }

            if(frame === 2){
                $body.prepend("<div id='coverAll'></div>");
                $body.prepend('<iframe width="560" height="315" src="https://www.youtube.com/embed/6ZL3ofreuQo?autoplay=1;modestbranding=1;controls=0;showinfo=0;rel=0;fs=1" frameborder="0" allowfullscreen></iframe>');

            }

            if(frame === 200){
                $("iframe").fadeIn(60000);
            }

            if(frame === 666){
                $body.prepend('<iframe class="test" width="560" height="315" src="https://www.youtube.com/embed/6ZL3ofreuQo?autoplay=1;modestbranding=1;controls=0;showinfo=0;rel=0;fs=1" frameborder="0" allowfullscreen></iframe>');
            }
            if(frame === 900){
                $(".test").fadeIn(6000);
            }

            if(frame % 5 === 0 && bg > 0){
                incrementBackground();
            }

            $body.css("margin-left", border + "px");

            console.log("Frame: " + frame);

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

            $(findRestaurantsInput).keyup(function () {
                var query = $(this).val();
                getMatchingRestaurants(query, renderRestaurants);
            });

            $(".container.main").click(function(){
                enterHell();
            });
        };

    $(ready);
}(jQuery));