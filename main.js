    // function to get all movies with those letters
    async function listenChangeMovie(q) {
        // if the title is longer than 2 characters then fetch movies.
        if (q >= 2) {
          await fetch('http://www.omdbapi.com/?s=' + q + '&apikey=1d0fe65e').then((res) => {
            res = res.json()
          }).then((data) => {
            console.log(data);
          }).catch((err) => {
            console.log(err);
          })
        }
      }
  
      document.getElementById('movieOne').addEventListener("change", (event) => listenChangeMovie(event.target.value))
        // document.querySelector('#dump').innerHTML = event.target.value 
