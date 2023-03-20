
displayGallery();
displayCategory();

/*
* Get project from API
*/
function displayGallery() {
	var gallery = document.getElementsByClassName('gallery')[0];
	
	// Request work from API
	fetch("http://localhost:5678/api/works")
	.then(function(result) {
		return result.json();
	})

	.then(function(value) {
		value.forEach((work) => {
			// Create elements
			var figure = document.createElement('figure');
			var img = document.createElement('img');
			var figcaption = document.createElement('figcaption');

			// Set attributes for image
			img.setAttribute('src', work.imageUrl);
			img.setAttribute('alt', work.title);
			img.setAttribute('crossorigin', "anonymous");

			// Set attribute for figcaption
			figcaption.innerText = work.title

			figure.appendChild(img);
			figure.appendChild(figcaption);

			// Add the projects in the DOM
			gallery.appendChild(figure);
		})
	})

	.catch(function(e) {
		console.error(e);
		gallery.innerHTML = '<p><strong>Impossible de charger les éléments</strong></p>';
	});
}


/*
* Get category from API
*/
function displayCategory() {
	var filter = document.getElementById('filters');

	// Requête vers l'API suivante :
	fetch("http://localhost:5678/api/categories")
	.then(function(result) {
		return result.json();
	})

	.then(function(categories) {
		// Add "all" in category
		categories.unshift({
			"id": 0,
			"name": "Tous"
		})

		categories.forEach(category => {
			var button = document.createElement('button');

			// Add button's name
			button.innerText = category.name;

			// onload => 
			if (category.id == 0) {
				button.classList.add('active');
			}

			button.setAttribute('data-filter-test', 'category-id-' + category.id)

			filter.appendChild(button);

			// Event on click to change category
			button.addEventListener('click', function(e) {
				filter.querySelectorAll('button').forEach(btn => {
					btn.classList.remove('active');
				});

				button.classList.add('active');
			});
		})
	})

	.catch(function(e) {
		console.error(e);
		gallery.innerHTML = '<p><strong>Impossible de charger les éléments</strong></p>';
	});
}
