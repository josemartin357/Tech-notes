const updateButtonHandler = async (event) => {
  event.preventDefault();
  console.log("first line!");
  if (event.target.hasAttribute("data-id")) {
    console.log(event.target);
    const id = event.target.getAttribute("data-id");
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();
    console.log(title, content);
    console.log(id);
    if (title && content) {
      //   check this route
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to update post");
      }
    }
  }
};

// TO UPDATE
document
  .querySelector(".update-post-form")
  .addEventListener("click", updateButtonHandler);
