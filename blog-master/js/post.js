//Denna sida är för VG-nivå (Matilda)

async function thisPostOnly() {
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('id'));

    try {
    
        let response = await fetch('http://localhost:3000/posts/' + urlParams.get('id'));
        let data = await response.json();
        console.log(data);

        document.querySelector('#search-container').innerHTML = 

        `<div class="spacing"></div>` +
        `<h2 class="heading">${data.title}</h2>` +
        `<p class="date">${data.date.slice(0,10)} <span class="tags">|| ${data.tags}</span></p>` +
        `<p class=content-text>${data.content}</p>` +
        `<p class="author">// ${data.author}</p>`;

    } catch (message) {
            throw new Error(message);
    }
}

thisPostOnly();