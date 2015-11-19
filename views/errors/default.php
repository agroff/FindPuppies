
<?php view( 'header' ); ?>


<div class="starter-template">
	<h1>An error occured!</h1>

	<p class="lead"><?php o($error->getMessage()); ?></p>
	<p class="lead"><?php o(\ORM::get_last_query()); ?></p>
	<div class="left-aligned">
		<?php dbg($error); ?>
	</div>
</div>

<?php view( 'footer' ); ?>