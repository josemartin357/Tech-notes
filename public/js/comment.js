// event handler to create a comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector("#comment-content").getAttribute("data-id");
  const comment = document.querySelector("#comment-content").value.trim();
  console.log(comment);
  if (comment) {
    const response = await fetch(`/api/comments/`, {
      method: "POST",
      body: JSON.stringify({
        comment,
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // document.location.replace("/profile");
      // document.location.replace("/post/");
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

// event handler to delete comment
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/");
      // document.location.reload;
    } else {
      alert("Failed to delete comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentHandler);

document
  .querySelector(".comment-list")
  .addEventListener("click", delButtonHandler);
