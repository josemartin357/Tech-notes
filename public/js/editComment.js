const updateButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute("data-id")) {
    console.log(event.target);

    // const id = document
    //   .querySelector("#comment-content")
    //   .getAttribute("data-id");
    const id = event.target.getAttribute("data-id");

    const comment = document.querySelector("#comment-content").value.trim();

    console.log(comment);
    console.log(id);
    if (comment) {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          comment,
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to update comment");
      }
    }
  }
};

document
  .querySelector(".update-comment-form")
  .addEventListener("click", updateButtonHandler);
