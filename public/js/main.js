(function ($) {

    var lastQuery = "",

        findRestaurantsInput = "#findRestaurants",
        restaurantResults = "#restaurantResults",
        rowTemplate = "#restaurantRow",

        setState = function (state) {
            var $states = $("#loadingState, #noResults, #restaurantResults");

            $states.hide();

            if(state === false){
                return;
            }

            $("#" + state).show();
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


        };

    $(ready);
}(jQuery));