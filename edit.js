document.addEventListener("DOMContentLoaded", function () {
    const documents = JSON.parse(localStorage.getItem("documents")) || [];
    const editIndex = localStorage.getItem("editIndex");

    if (editIndex !== null) {
        const doc = documents[editIndex];
        document.getElementById("topic").value = doc.title;
        document.getElementById("writer").value = doc.writer;
        document.getElementById("content").value = doc.content;
    }

    document.getElementById("editForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const edtTopic = document.getElementById("topic").value;
        const edtWriter = document.getElementById("writer").value;
        const edtContent = document.getElementById("content").value;

        if (!edtTopic || !edtWriter || !edtContent) {
            alert("Please fill out all topic, writer, and content");
            return;
        }

        documents[editIndex] = {
            title: edtTopic,
            writer: edtWriter,
            content: edtContent,
        };

        localStorage.setItem("documents", JSON.stringify(documents));
        window.location.href = "main.html";
    });
});
