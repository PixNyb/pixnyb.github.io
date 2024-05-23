function createHeadingIcon() {
  const icon = document.createElement("span");
  icon.classList.add("link-icon");
  icon.innerHTML = '<i class="fas fa-link"></i><i class="fas fa-check"></i>';
  return icon;
}

// Generate a function that copies a link to clipboard when a heading with an id is clicked
function copyLinkToClipboard() {
  // Get all headings with an id
  const headings = document.querySelectorAll(
    "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]",
  );

  // For each heading, add an event listener to copy the link to clipboard
  headings.forEach((heading) => {
    // Add a .link-icon span to the heading
    const icon = createHeadingIcon();
    heading.appendChild(icon);

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

function setHeadingOffset() {
  const headerHeight = document.querySelector('header').offsetHeight;
  const links = document.querySelectorAll('.toc-link');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const heading = document.getElementById(id);

      if (heading) {
        const offset = heading.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: offset,
          behavior: 'smooth',
        });
      }
    });
  });
}

// Function to check if a link is external
function isExternalLink(link) {
  return link.hostname !== window.location.hostname;
}

// Function to get the link's type
function getLinkType(link) {
  url = link.getAttribute('href');
  type = url.split(':')[0];
  return type;
}

// Function to create an icon element
function createLinkIcon(type) {
  var iconId = "link";
  switch (type) {
    case "mailto":
      iconId = "envelope";
      break;
    case "tel":
      iconId = "phone";
      break;
    default:
      break;
  }

  const icon = document.createElement('span');
  icon.classList.add('link-icon');
  icon.innerHTML = `<i class="fas fa-${iconId}"></i>`;
  return icon;
}

// Main function to append icons to external links
function appendLinkIcons() {
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    if (isExternalLink(link)) {
      const icon = createLinkIcon(getLinkType(link));
      link.appendChild(icon);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer noopener");
    }
  });
}

// For each scroller, add an animation that translates the scroller__content up by the line spacing.

function scrollScrollers() {
  const scrollers = document.querySelectorAll('.scroller');
  
  scrollers.forEach(scroller => {
    const content = scroller.querySelector('.scroller__content');
    const items = content.querySelectorAll('span');
    // Get the computed style for the scroller content
    const lineHeight = getComputedStyle(content).lineHeight;
    console.log(lineHeight);

    let index = 0;
    setInterval(() => {
      content.style.transform = `translateY(-${index * parseFloat(lineHeight)}px)`;
      index = (index + 1) % items.length;
    }, 2000);
  });
}

// Call the functions when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  copyLinkToClipboard();
  highlightActiveHeading();
  setHeadingOffset();
  appendLinkIcons();
  scrollScrollers();
});
