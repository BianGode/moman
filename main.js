// function to render a the data to the p
function renderData(data) {
  data.forEach(el => {
    let p = document.createElement('p')
    p.innerHTML = el.Title + '(' + el.Year + ')'
    let image = document.createElement('img')
    image.src = el.Poster
    console.log(el)
    document.getElementById('dump').append(p)
    document.getElementById('dump').append(image)
  });
}

// function to get all movies with those letters
async function listenChangeMovie(q) {
  console.log(q)
  // if the title is longer than 2 characters then fetch movies.
  if (q.length >= 2) {
    await fetch('http://www.omdbapi.com/?s=' + q + '&type=movie&apikey=1d0fe65e').then((res) => {
    // the res.json() didn't work because I didn't return the res = res.json() so data was undefined
    return res = res.json()
      // console.log(res)
    }).then((data) => {
      renderData(data.Search)
    }).catch((err) => {
      console.log(err);
    })
  }
}

document.getElementById('movieOne').addEventListener("change", (event) => listenChangeMovie(event.target.value))