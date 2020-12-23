window.onload = function() {
    prefillPost();
    // updatePostEvent();
}

async function prefillPost() {
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('id'));

    try {
        let response = await fetch('http://localhost:3000/posts/' + urlParams.get('id'));
        let data = await response.json();
        console.log(data.content);

        document.getElementById('title').value = data.title;
        document.getElementById('author').value = data.author;
        document.getElementById('tags').value = data.tags;
        document.getElementById('content-textarea').value = data.content;

    } catch (message) {
        throw new Error(message);
    }
}



let form = document.getElementById('update-post-form');
form.addEventListener('submit', updatePost);


var inputTitle = document.getElementById('title');
var inputAuthor = document.getElementById('author');
var inputTags = document.getElementById('tags');
var inputContent = document.getElementById('content-textarea');
var contentSearchValue;
var titleSearchValue;
var tagsSearchValue;
var authorSearchValue;

inputTitle.addEventListener('input', (e)=> {
    titleSearchValue = e.target.value;
});
inputAuthor.addEventListener('input', (e)=> {
    authorSearchValue = e.target.value;
});
inputTags.addEventListener('input', (e)=> {
    tagsSearchValue = e.target.value;
});

inputContent.addEventListener('input', (e)=> {
    contentSearchValue = e.target.value;
});


async function updatePost(e) {
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('id'));
    e.preventDefault();

    // this => is the form it self
    let formData = new FormData(this);


    try {
        await fetch('http://localhost:3000/posts/' + urlParams.get('id'), {
            method: 'PATCH', // GET, POST, PATCH, DELETE
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title:     titleSearchValue,
                author:    authorSearchValue,
                tags:      tagsSearchValue,
                content:   contentSearchValue

            }),
        });

        window.location.replace('index.html') // redirects to the index.html page
    } catch (message) {
        throw new Error(message);
    }
}


function formatFormData(formData) {
    let obj = {};
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }

    return obj;
}
