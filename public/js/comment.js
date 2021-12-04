const newCommentHandler = async (event) => {
  event.preventDefault();
  // console.log(
  //   document.querySelector("#comment-content").getAttribute("data-id")
  // );
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
      //   check this route
      // document.location.replace("/profile");
      // document.location.replace("/post/");
      document.location.reload();
    } else {
      alert("Failed to create comment");
      // console.log(response.statusText);
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentHandler);
