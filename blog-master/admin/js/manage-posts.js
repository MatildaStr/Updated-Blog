const postTable = document.getElementById("post-table-admin");

async function fetchAndPrintAllPosts(){
    try{
        let response = await fetch('http://localhost:3000/posts')
        let data =  await response.json();
        console.log(data);
        let output = "";
             for (let post of data.reverse()) {
                 output += `
                 <tr>
                    <th>${post.title}</th>
                    <th>${post.author}</th>
                    <th>${post.tags}</th>
                    <th>${post.date.slice(0, 10)}</th>
                    <th>
                        <a href="update-post.html?id=${post["_id"]}">Update</a> <span>/</span>
                        <a href="#" data-id=${post["_id"]} class="delete-post-link">Delete</a>
                    </th>
                </tr>
                     `;
             }

        postTable.innerHTML += output;
            

    
    }catch(error) {
        console.log(error);
    }
    deletePunEvent();
    
}



fetchAndPrintAllPosts();

function deletePunEvent() {
    let deleteBtns = document.getElementsByClassName('delete-post-link');
    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', async function(e) {
            e.preventDefault()

            let punId = this.dataset.id
            console.log(punId);

            try {
                await fetch('http://localhost:3000/posts/' + punId, {
                    method: 'DELETE', // GET, POST, PATCH, DELETE
                });

                this.parentNode.parentNode.remove();
            } catch (message) {
                throw new Error(message);
            }

        })
    }
}