'use strict';

// put your own value below!
const apiKey = '2CuTZF3e8GCDY1kPEtepX0dmiDk62UPjxNB1v0qe';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 1; i < responseJson.data.length; i++) {  
    

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}</p></li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNationalParkResults(query, maxResults) {
  const params = {
    stateCode: query, //will be state code, ex: WY, TX
    limit: maxResults, //might need to be limit - check documentation 
    api_key: apiKey,
  };


  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


//listening, and defining variables for data inputs 
function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNationalParkResults(searchTerm, maxResults); //call function
  });
}

$(watchForm); //calling function



{/* <p>${responseJson.description}</p>
  <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>  */}

// return states.split(',').every(state => state.length === 2)

// states needs to be in correct format 


// const state = {
//   parks: [],
// }


// function generateParkHtml(park) {
//   return `<li> <p>${park.fullName}</p>
//   <p>
// }




