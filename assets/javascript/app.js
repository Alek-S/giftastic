$(document).ready(function(){

	//movie array used for buttons
	var topics = [	'Blade Runner',
						'Fight Club',
						'Little Shop of Horrors',
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
	for(var i=0; i < topics.length; i++){
		addButton( topics[i] );
	}



	// ===== CLICK EVENTS ====

	//user adds new movie using the form
	$('form button').on('click',function(){
		event.preventDefault();

		var inputVal= $('input').val();

		//if form has a value
		if(inputVal){
			topics.push(inputVal);
			addButton( inputVal );
		}

		//clear form input
		$('input').val('');
	});

	//user clicks on a movie button, get gifs and prepend static version
	$('#buttonArea').on('click','button',function(){

		if( $('#clearDiv').is(":visible" ) === false ){
			$('#clearDiv').show();
		}

		getGifs( $(this).text() );  
	});

	//user clicks on a gif, swap between static and dynamic(animated) version
	$('main').on('click','img',function(){
		var movieName = $(this).attr('data-name');
		var saticURL = $(this).attr('data-static');
		var dynamicURL = $(this).attr('data-dynamic');
		var currentImg = $(this).attr('src');
		
		// if current image source is a static image ...
		if( currentImg === saticURL){
			//switch to dynamic url
			$(this).attr('src', dynamicURL);
		} else {
			//otherwise switch to static url
			$(this).attr('src', saticURL);
		}
	});

	//clear main area
	$('#clearBtn').on('click', function(){
		$('main').empty();
		$('#clearDiv').hide();
	});



	// ===== FUNCTIONS ====

	//add another button
	function addButton(input){
		var idVal = topics.indexOf(input);

		var $button = $('<button>').attr('id',idVal).text(input);
		$('#buttonArea').append($button);
	}

	//request URLS from Giphy API
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

				var $div = $('<div>').addClass('gif');
				var img = $('<img>');
				var $p = $('<p>').html('<strong>rating:</strong> ' + reply[i].rating);

				//name
				img.attr('data-name', search );

				//static
				img.attr('data-static',reply[i].images.fixed_height_still.url );

				//dynamic
				img.attr('data-dynamic',reply[i].images.fixed_height.url );

				$div.append(img).append($p);

				img.attr('src', reply[i].images.fixed_height_still.url);
				$('main').prepend($div);
			}
		});
	}
}); //.ready done