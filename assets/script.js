let apiKey = `bce14d8aab9e4feb23181748e66debf1`
let url = `https://api.themoviedb.org/3/trending/movie/week?api_key=bce14d8aab9e4feb23181748e66debf1`


function trendingMoives(){
   
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=bce14d8aab9e4feb23181748e66debf1`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            // place the for loop through here 
            let firstMovie = data.results[0].original_title
            console.log(firstMovie)
            return data
        })
};

trendingMoives();

 



