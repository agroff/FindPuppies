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
            frame++;

            var border = (frame / 4);
            if(frame % 2 === 0){
                border = border * -1;
            }

            if(frame % 5 === 0){
                incrementBackground();
            }

            $body.css("margin-left", border + "px");

            console.log("Frame: " + frame);

            setTimeout(enterHell, 14);
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