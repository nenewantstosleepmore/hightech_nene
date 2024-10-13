
//create.html
document.getElementById("createForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const topic = document.getElementById("topic").value;
    const writer = document.getElementById("writer").value;
    const content = document.getElementById("content").value; 

    if (!topic || !writer || !content) {
        alert("Please fill out all topic, writer, and content");
        return;
    }

    //save doc in LS
    const documents = JSON.parse(localStorage.getItem("documents")) || [];
    documents.push({ title: topic, writer: writer, content: content });
    localStorage.setItem("documents", JSON.stringify(documents));

    //back to main page
    window.location.href = "main.html";
});

//main.html
document.addEventListener("DOMContentLoaded", function() {
    const documents = JSON.parse(localStorage.getItem("documents")) || [];
    const documentList = document.getElementById("fileList");

    documents.forEach((doc, index) => {
        const listItem = document.createElement("li");
        listItem.className = "fileEach";
        listItem.textContent = `Title : ${doc.title}, Writer : ${doc.writer}`;
        
        //download btn
        const downBtn = document.createElement("button");
        downBtn.className = "downBtn";
        downBtn.innerHTML = '<i class="fa-solid fa-download"></i>';


        //download file
        downBtn.addEventListener("click", function() {
            const downloadLink = document.createElement("a");
            downloadLink.href = `data:text/plain;charset=utf-8,${encodeURIComponent(doc.content)}`;
            downloadLink.download = `${doc.title}.txt`; //filename
            downloadLink.click()
        });

        //edit file
        const editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editBtn.addEventListener("click", function() {
            localStorage.setItem("editIndex", index);
            window.location.href = "edit.html";
        });


        //delete file
        const delBtn = document.createElement("button");
        delBtn.className = "delBtn";
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

        delBtn.addEventListener("click", function() {
            const updateDoc = documents.filter((_, i) => i !== index);
            localStorage.setItem("documents", JSON.stringify(updateDoc));
            window.location.reload(); 
        });

        listItem.appendChild(downBtn);
        listItem.appendChild(editBtn);
        listItem.appendChild(delBtn);
        documentList.appendChild(listItem);
    });
});
