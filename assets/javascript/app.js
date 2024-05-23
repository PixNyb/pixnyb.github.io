// Generate a function that copies a link to clipboard when a heading with an id is clicked
function copyLinkToClipboard() {
  // Get all headings with an id
  const headings = document.querySelectorAll(
    "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]",
  );

  // For each heading, add an event listener to copy the link to clipboard
  headings.forEach((heading) => {
    heading.addEventListener("click", () => {
      const link = `${window.location.origin}${window.location.pathname}#${heading.id}`;
      navigator.clipboard.writeText(link).then(() => {
        console.log("Link copied to clipboard:", link);
        heading.classList.add("link-copied");
        setTimeout(() => {
          heading.classList.remove("link-copied");
        }, 2000);
      });
    });
  });
}

// Call the function when the DOM is loaded
document.addEventListener("DOMContentLoaded", copyLinkToClipboard);
