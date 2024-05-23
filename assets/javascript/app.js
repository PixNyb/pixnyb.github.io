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

// Highlight the currently active heading in the Table of Contents
function highlightActiveHeading() {
  const tocLinks = document.querySelectorAll(".toc-link");
  const headings = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");
  const offset = 8 * parseFloat(getComputedStyle(document.documentElement).fontSize);

  window.addEventListener("scroll", () => {
    let currentActive = null;

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      let minDistance = 0
      if (rect.top <= offset && rect.top - offset < minDistance) {
        currentActive = heading;
        minDistance = rect.top;
      }
    });

    tocLinks.forEach((link) => {
      link.classList.remove("active");
      if (currentActive && link.getAttribute("href").substring(1) === currentActive.id) {
        link.classList.add("active");
      }
    });
  });
}

// Function to check if a link is external
function isExternalLink(link) {
  return link.hostname !== window.location.hostname;
}

// Function to create an icon element
function createLinkIcon() {
  const icon = document.createElement('span');
  icon.classList.add('link-icon');
  icon.innerHTML = '<i class="fas fa-link"></i>';
  return icon;
}

// Main function to append icons to external links
function appendLinkIcons() {
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    if (isExternalLink(link)) {
      const icon = createLinkIcon();
      link.appendChild(icon);
    }
  });
}

// Call the functions when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  copyLinkToClipboard();
  highlightActiveHeading();
  appendLinkIcons();
});
