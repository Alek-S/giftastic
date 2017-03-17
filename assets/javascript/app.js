$(document).ready(function(){

	//jQuery Cache

	//movie array used for buttons
	var movieList = [	'Blade Runner',
						'Fight Club',
						'Little Shop of Horrors',
						'A Clockwork Orange',
						'Trainspotting',
						'Back to the Future',
						'Samsara',
						'Fear and Loathing in Las Vegas',
						'Taxi Driver',
						'Shawshank Redemption',
						'The Shining',
						'Ferris Buellers Day Off',
						'Goodfellas',
						'Beasts of the Southern Wild',
						'Apocalypse Now',
						'The Hustler',
						'The Big Lebowski',
						'There Will be Blood',
						'Mad Max Fury Road',
						'Eraserhead',
						'The Wolf of Wall Street',
						'Amores Perros'
					];

	//add buttons for pre-selected movie list
	for(var i=0; i < movieList.length; i++){
		addButton( movieList[i] );
	}

	// ===== CLICK EVENTS ====

	//user adds new movie using the form
	$('form button').on('click',function(){
		event.preventDefault();
		console.log( $('input').val() );

		movieList.push($('input').val());
		addButton( $('input').val() );
	});

	$('#buttonArea').on('click','button',function(){
		console.log('clicked:', $(this).text() );
		getGifs( $(this).text() );  

	});

	// ===== FUNCTIONS ====
	function addButton(input){
		var idVal = movieList.indexOf(input);

		var $button = $('<button>').attr('id',idVal).text(input);
		$('#buttonArea').append($button);
	}

	function getGifs(search){
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: 'Get'
		})
		.done(function(response){
			var reply = response.data
			console.log('api url:', queryURL);

			for (var i = 0; i < 10; i++) {
				var img = $('<img>').addClass('gif');

				console.log('appending:', reply[i].images.fixed_height_still.url)
				img.attr('src', reply[i].images.fixed_height_still.url);
				$('main').prepend(img);
			}

		});
	}

}); //.ready done