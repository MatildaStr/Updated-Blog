
var select = document.getElementById('tags2');
let tags = ["Food", "Travel", "Mindfulness", "Programming", "Sport", "Friends and family", "Casual stuffs"];

for (var i = 0; i < tags.length; i++) {
    var option = tags[i];
    var el = document.createElement('option');
    el.textContent = option;
    el.value = option;
    select.appendChild(el);
}



async function fetchAllPosts(){
    try{
        let response = await fetch('http://localhost:3000/posts')
        let posts =  await response.json();
        console.log(posts);
    

        let output = "";
             for (let post of posts.reverse()) {
                var postContent = post.content;
                if (postContent.length > 100) {
                    output += `
                    <div class="content-section">
                        <div class="text-box">
                            <h2 class="heading">${post.title}</h2>
                            <p class="date">${post.date.slice(0,10)} <span class="tags">|| ${post.tags}</span></p>  
                            <p class=content-text>${post.content.slice(0,100)}<a href="post.html?id=${post['_id']}" class="read-more-link">...read more</a></p>
                            <p class="author">// ${post.author}</p>
                        </div> 
                        <div class="spacing"></div>
                    </div>
             `;

                } else {

                 output += `
                            <div class="content-section">
                                <div class="text-box">
                                    <h2 class="heading">${post.title}</h2>
                                    <p class="date">${post.date.slice(0,10)} <span class="tags">|| ${post.tags}</span></p>  
                                    <p class=content-text>${post.content}</p>
                                    <p class="author">// ${post.author}</p>
                                </div> 
                                <div class="spacing"></div>
                            </div>
                     `;
             }}
            $('#content-container').html(output);

    
    }catch(error) {
        console.log(error);
    }
}

fetchAllPosts();


const inputValue = document.getElementById("tag-search-field");
const searchBtn = document.getElementById("search-by-tag-btn");
let searchValue;

//Sparar det användaren skriver in i en variabel "searchValue".
// inputValue.addEventListener('input', (e)=> {
//     searchValue = e.target.value;
// });
// console.log(searchValue);


searchBtn.addEventListener("click", filterPostsByTag);

inputValue.addEventListener("keyup", function(e) {
    if(e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
    }
});

async function filterPostsByTag() {

    try{
        let response = await fetch('http://localhost:3000/posts')
        let posts =  await response.json();
        console.log(posts);

        searchValue = $("option:selected").val();
        console.log(searchValue);
    
        let output = "";
        
             for (let post of posts.reverse()) {
                var readMore = "";
                var posting = post.content;

                 if (post.tags.includes(searchValue)) {

                    if (posting.length > 100) {
                        posting = post.content.slice(0, 100)
                        readMore = "...read more";
                    }

                    output += `
                               <div class="content-section">
                                   <div class="text-box">
                                       <h2 class="heading">${post.title}</h2>
                                       <p class="date">${post.date.slice(0,10)} <span class="tags">|| ${post.tags}</span></p>  
                                       <p class=content-text>${posting}<br><a href="post.html?id=${post['_id']}" class="read-more-link">${readMore}</a></p>
                                       <p class="author">// ${post.author}</p>
                                       </div> 
                                   <div class="spacing"></div>
                               </div>
                        `;
                 }
             }
            $('#content-container').html(output);

    
    }catch(error) {
        console.log(error);
    }
}
