
// to get images of the anime  "data.data[0].images.jpg.image_url"
// to get the movie background story "data.data[0].background"
// to get the movie rating "data.data[0].rating"
// to get the movie title "data.data[0].title"
// to get the movie duration and episod "data.data[0].duration,  data.data[0].episodes"


async function countrys() {
    try {
        let res = await fetch("https://api.jikan.moe/v4/anime")
        let data = await res.json()
        // console.log(data)

        let r = Math.floor(Math.random() * 26)
        // assign all created element 
        createElem(data.data[r].images.jpg.image_url)
        events(data.data[r].background, data.data[r].rating, data.data[r].title, data.data[r].duration)
        document.querySelector('.empty-container').style.display = 'none'
    }catch(e) {
        alert('Faild to fetch', e)
    }
}

function createElem(img) {
    let div = document.createElement('div')
    div.className = 'image'
    div.innerHTML = `
    <img src="${img}" alt="">
    <button id="info">i</button>
    `
    // <h3 id="title">${titles}</h3>
    // <p id="length">${length} hour</p>
    
    document.querySelector('.image_container').appendChild(div)
}

// dom elements
let info = document.querySelector('#clicked_info') 
let tit = document.querySelector('#title') 
let ratti = document.querySelector('#rating')
let lengath = document.querySelector('#length') 

function events(back, rett, titles, length) {
    document.addEventListener('click', e => {
        if (e.target.matches('#info')) {
            document.querySelector('.display_info').style.display = 'block'
            e.target.closest('.image_container').classList.add('popback')
 
            // e.target.closest('#clicked_info').textContent = back

            info.textContent = back
            tit.textContent = titles
            ratti.textContent = rett
            lengath.textContent = length
        }
        if (e.target.matches('#cancel')) {
            document.querySelector('.display_info').style.display = 'none'
            document.querySelector('.image_container').classList.remove('popback')
        }
    })
}

document.addEventListener('click', async e => {
    if (e.target.matches('img')) {
        let res = await fetch(e.target.src)
        let blobThingy = await res.blob()

        let ra = Math.floor(Math.random() * 100)

        let link = document.createElement('a')
        link.href = URL.createObjectURL(blobThingy)
        link.download = `Anime${ra}Image`
        link.click()

        URL.revokeObjectURL(link.href)
    }
})

document.querySelector('#btn').addEventListener('click', countrys)