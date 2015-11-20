<?php view( 'header' ); ?>

	<div class="starter-template">
		<h1>Find Puppies Near You</h1>

		<p class="lead">Enter the name of the puppy you're looking for. </p>
	</div>

	<div class="row">


		<div class="col-lg-6 col-lg-offset-3">

			<form action="javascript:void(0);">
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="searchContainer">
					<input class="mdl-textfield__input main-input" type="text" id="findRestaurants" autocomplete="off">
					<label class="mdl-textfield__label" for="findRestaurants">Find a puppy!</label>
				</div>
			</form>


			<div id="loadingContainer">
				<i class="fa fa-lg fa-circle-o-notch fa-spin" id="loadingState"></i>
			</div>

		</div>

	</div>

<div class="resultsContainer">

	<p class="lead text-center" id="noResults">
		We couldn't find any matching restaurants.
	</p>

	<div id="restaurantResults"></div>
</div>



<?php template( 'restaurantRow' ); ?>
<?php view( 'footer' ); ?>