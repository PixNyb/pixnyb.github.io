const clientSettings = {
  analytics: false, // Temporarily disable analytics before move to self-hosted analytics solution
}

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

function copyLinkToClipboard() {
  const headings = document.querySelectorAll(
    "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]",
  );

  headings.forEach((heading) => {
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
      if (
        currentActive &&
        link.hasAttribute("href") &&
        link.getAttribute("href").substring(1) === currentActive.id
      ) {
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

function isExternalLink(link) {
  return link.hostname !== window.location.hostname;
}

function getLinkType(link) {
  url = link.getAttribute('href');
  type = url.split(':')[0];
  return type;
}

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
      iconId = "location-dot";
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

function appendLinkIcons() {
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    if (isExternalLink(link)) {
      if (!(
        link.children.length === 1 &&
        link.children[0].tagName.toLowerCase() === 'i' &&
        Array.from(link.children[0].classList).some(cls => cls.startsWith('fa-'))
      )) {
        const icon = createLinkIcon(getLinkType(link));
        link.appendChild(icon);
      }
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer noopener");
    }
  });
}

function scrollScrollers() {
  const scrollers = document.querySelectorAll('.scroller');

  scrollers.forEach(scroller => {
    const content = scroller.querySelector('.scroller__content');
    const items = content.querySelectorAll('span');
    // Get the computed style for the scroller content
    const lineHeight = getComputedStyle(content).lineHeight;

    let index = 0;
    setInterval(() => {
      content.style.transform = `translateY(-${index * parseFloat(lineHeight)}px)`;
      index = (index + 1) % items.length;
    }, 2000);
  });
}

function toggleMenu() {
  const menuButton = document.getElementById('menu-toggle');
  const menu = document.getElementById(menuButton.getAttribute('data-toggles'));

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuButton.classList.toggle('active');
  });
}

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
  const regex = new RegExp(`^${from}`);
  links.forEach(link => link.setAttribute('href', link.getAttribute('href').replace(regex, to)));
}

function promptCookieNotice() {
  if (!clientSettings.analytics) return;

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
    function gtag() { dataLayer.push(arguments); }
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
  else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}

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
