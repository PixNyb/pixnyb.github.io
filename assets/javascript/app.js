function createHeadingIcon() {
  const icon = document.createElement("span");
  icon.classList.add("link-icon");
  icon.innerHTML = '<i class="fas fa-link"></i><i class="fas fa-check"></i>';
  return icon;
}

function createCopyIcon() {
  const icon = document.createElement("span");
  icon.classList.add("code-icon");
  icon.innerHTML = '<i class="fas fa-copy"></i><i class="fas fa-check"></i>';
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
        heading.classList.add("link-copied");
        setTimeout(() => {
          heading.classList.remove("link-copied");
        }, 2000);
      });
    });
  });
}

// Add a copy icon to code blocks
function copyCodeToClipboard() {
  const codeBlocks = document.querySelectorAll('pre>code');
  codeBlocks.forEach(block => {
    const copySpan = createCopyIcon();
    block.appendChild(copySpan);

    copySpan.addEventListener('click', () => {
      navigator.clipboard.writeText(block.innerText).then(() => {
        block.classList.add('code-copied');
        setTimeout(() => {
          block.classList.remove('code-copied');
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
    case "geo":
    case "maps":
      iconId = "globe";
      break;
    default:
      break;
  }

  if (url.includes('github.com')) iconId = 'code';

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
      // const icon = createLinkIcon(getLinkType(link));
      // link.appendChild(icon);
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

// Add the click listener to the #menu-button
function toggleMenu() {
  const menuButton = document.getElementById('menu-toggle');
  const menu = document.getElementById(menuButton.getAttribute('data-toggles'));

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuButton.classList.toggle('active');
  });
}

// Change geo: links to maps: on apple devices
function adaptToAgent() {
  let parsedNavigator = 'unknown';
  const lowercaseAgent = window.navigator.userAgent.toLowerCase();

  if (
    lowercaseAgent.includes('mac')
    || lowercaseAgent.includes('iphone')
    || lowercaseAgent.includes('ipad')
  )
    parsedNavigator = 'apple';

  switch (parsedNavigator) {
    case 'apple':
      convertLinkProtocol('geo:', 'maps:');
      break;
    default:
      convertLinkProtocol('maps:', 'geo:');
      break;
  }
}

function convertLinkProtocol(from, to) {
  const links = document.querySelectorAll(`[href^="${from}"]`);
  console.log(links);
  const regex = new RegExp(`^${from}`);
  links.forEach(link => {
    link.setAttribute('href', link.getAttribute('href').replace(regex, to));
    console.log(link.getAttribute('href'));
  });
}

// If the cookies aren't set, prompt the user
function promptCookieNotice() {
  const cookieSelection = getCookie('cookie-consent');

  if (cookieSelection === null || cookieSelection === undefined) {
    const cookieNoticeTemplate = document.getElementById('cookie-notice');
    // The cookieNotice element is a template
    const cookieNotice = document.createElement('div');
    cookieNotice.classList.add('cookie-notice');
    cookieNotice.innerHTML = cookieNoticeTemplate.innerHTML;
    document.body.appendChild(cookieNotice);

    const acceptButton = document.getElementById('cookie-notice-accept');
    const rejectButton = document.getElementById('cookie-notice-reject');

    acceptButton.addEventListener('click', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 10);
      document.cookie = `cookie-consent=true; expires=${date.toUTCString()}; path=/`;
      cookieNotice.classList.add('hidden');
      setTimeout(() => {
        cookieNotice.remove();
      }, 1000);
    });

    rejectButton.addEventListener('click', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 10);
      document.cookie = `cookie-consent=false; expires=${date.toUTCString()}; path=/`;
      cookieNotice.classList.add('hidden');
      setTimeout(() => {
        cookieNotice.remove();
      }, 1000);
    });
  }

  if (cookieSelection === 'true') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-2MRW7WDSPF');
  }
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
      end = dc.length;
      }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}

// Call the functions when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  copyLinkToClipboard();
  copyCodeToClipboard();
  highlightActiveHeading();
  setHeadingOffset();
  adaptToAgent();
  appendLinkIcons();
  scrollScrollers();
  toggleMenu();
  promptCookieNotice();
});
