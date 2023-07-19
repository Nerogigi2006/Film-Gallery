

function searchMovies() {
  var searchInput = document.getElementById('searchInput').value; // Get the value of the search input

  // Call the API with the search query if search input is not empty
  if (searchInput !== '') {
    var Url = `https://api.themoviedb.org/3/search/movie?api_key=7222453552dd36431248d2aa6e20b01e&query=${(searchInput)}&language=en-US&page=1`;

    // Fetch data from the API
    fetch(Url, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        // If results are found, pass the data and the active tab content element to the updateui() function
        updateui(data, document.getElementById(movieType));
      } else {
        // If no results are found, display an alert
        alert(`${searchInput} is not found`);
      }
    })
    .catch(error => console.log(error));
  } else {
    // If search input is empty, call the function to display the trending tab
    changeTab('trending');
  }
}





function changeTab(ActiveContent) {
// var currentTab = e.target;
  // Hide all tab contents
  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }
  
  var element = document.getElementById(ActiveContent);
    element.style.display = "flex";
    element.style.flexWrap="wrap"
    element.style.width="100%";
    movieType = ActiveContent


    //API for trending movies
     if (ActiveContent === "trending") {
      Url =`https://api.themoviedb.org/3/${movieType}/all/day?api_key=7222453552dd36431248d2aa6e20b01e`;
    } else if (ActiveContent === "popular" || ActiveContent === "top_rated" || ActiveContent === "upcoming" || ActiveContent === "now_playing") {
      Url = `https://api.themoviedb.org/3/movie/${movieType}?api_key=7222453552dd36431248d2aa6e20b01e&language=en-US&page=1`;
    } else {
      Url = `https://api.themoviedb.org/3/discover/movie?api_key=7222453552dd36431248d2aa6e20b01e&with_genres=${ movieType}`;
    }

    fetch(Url, {
      method: 'GET',
      // headers: {
      //   'Authorization': 'Bearer {access-token}'
      // }
    })
    .then(response => response.json())
    .then(data => updateui(data,element))  // data and element are just carrying or holding values
    .catch(error => console.log(error));


}

window.onload = function() {
  changeTab('trending') 
 
}
var Overviewarray =[]
//  ActivetabContent And response are the real parameters
let truncatedOverview; // Declare truncatedOverview as a global variable

const updateui = (response, ActivetabContent) => {
  // Assuming geners is an array

  const genres = response.results;
  let html = '';
  genres.forEach(genre_ids => {
    const posterPath = genre_ids.poster_path ? `https://image.tmdb.org/t/p/w500${genre_ids.poster_path}` : 'placeholder.jpg';
    const backdrop = genre_ids.backdrop_path ? `https://image.tmdb.org/t/p/w500${genre_ids.backdrop_path}` : 'placeholder.jpg';
    const fullOverview = genre_ids.overview;

    // Set the truncated overview text to the full overview initially
    truncatedOverview = fullOverview;
    Overviewarray.push(fullOverview);

    // Check if the text needs to be truncated
    if (fullOverview.length > 95) {
      truncatedOverview = `${fullOverview.substring(0, 95)}...<a class="readMore" onclick="IncreaseOverview(event)">Read More</a>`;
    }
    html += `
      <div class="main col-lg-3 hoverable">
        <img src="/${posterPath ? posterPath : backdrop}" alt="" onerror=HideParentContainer(event)>
        <div class="text">
          <span class="overview">${truncatedOverview}</span>
          <h2>${genre_ids.title ? genre_ids.title : genre_ids.name}</h2>
        </div>
      </div>
    `;
  });

  ActivetabContent.innerHTML = `${html}`;
}

function HideParentContainer(event){
  event.target.parentElement.style.display = "none";
}
function IncreaseOverview(event) {
  let newString = event.target.parentElement.innerHTML.substring(0, 10)
  let fullOverview = Overviewarray.filter(fullover => fullover.includes(newString))
  event.target.parentElement.innerHTML = fullOverview + '<a class="readLess" onclick="DecreaseOverview(event)">Read Less</a>';
}

function DecreaseOverview(event) {
  let ReadlessString = event.target.parentElement.innerHTML.substring(0, 80) + '...<a class="readMore" onclick="IncreaseOverview(event)">Read More</a>'
  event.target.parentElement.innerHTML = ReadlessString;
}


 
  //  // store data in localstorage
  //  localStorage.setItem('name', 'nero');
  //  localStorage.setItem('age', 80);

  //  //get data from localstorage
  //  let Name = localStorage.getItem('name');
  //  let age = localStorage.getItem('age');

  //  console.log(Name,age);

  //  //updating data
  // //  localStorage.setItem('name', 'vincent');
  // //  localStorage.age = '50'
  // //  Name = localStorage.getItem('name');
  // //  age = localStorage.getItem('age');
  // //  console.log(Name,age); 

  //  // deleting from local storage

  //  //localStorage.removeItem('name');
  //   localStorage.clear();
  //  Name = localStorage.getItem('name');
  //  age = localStorage.getItem('age');
  //  console.log(Name,age);



