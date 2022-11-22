// Elements

// Add show & active classes to element
const showElement = (element, callback) => {
    !element.classList.contains("active") && element.classList.add("active");
    !element.classList.contains("show") && element.classList.add("show");
    element.addEventListener("animationend", () => {
        element.classList.remove("show");
        typeof callback === "function" && callback();
    }, { once: true });
}

// Add hide class to element & remove active class from it
const hideElement = (element, callback) => {
    !element.classList.contains("hide") && element.classList.add("hide");
    element.addEventListener("animationend", () => {
        element.classList.remove("hide");
        element.classList.contains("active") && element.classList.remove("active");
        element.classList.length === 0 && element.removeAttribute("class");
        typeof callback === "function" && callback();
    }, { once: true });
}

// Switch from current element to target element 
const switchElement = (elementsArray, targetElement) => {
    for (const element of elementsArray) {
        if (element !== targetElement && element.classList.contains("active")) {
            hideElement(element, () => {
                showElement(targetElement);
            });
        }
    }
};

// Toggle function
const navToggle = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 992) {
        const navList = document.querySelector(".nav__list");
        const toggleButton = document.querySelector(".toggle");
        if (!navList.classList.contains("active")) {
            toggleButton.classList.add("active");
            showElement(navList);
        }
        else {
            toggleButton.classList.remove("active");
            hideElement(navList);
        }
    }
};

// // Buttons & links elements
// const brandLink = document.querySelector('.nav__brand');
// const heroLink = document.querySelector('#hero .btn');
// const navLinks = document.querySelectorAll('.nav__list__item a');

// // Array with buttons & links elements
// const sectionLinks = [brandLink, heroLink, ...navLinks];

// // Add event listener to buttons & links elements
// sectionLinks.forEach(item => {
//     item.addEventListener("click", e => {
//         const sections = document.querySelectorAll("section")
//         const targetSectionId = e.currentTarget.href.split('#')[1];
//         const targetSection = document.getElementById(targetSectionId);
//         switchElement(sections, targetSection);
//     });
// });

// Add event listener to toggle button
const toggleButton = document.querySelector('.toggle');
toggleButton.addEventListener("click", navToggle);


// Navigation bar

// Add or remove active class from header when window is resized
const reportWindowSize = () => {
    const toggleButton = document.querySelector('.toggle');
    const navList = document.querySelector('.nav__list');
    const windowWidth = window.innerWidth;
    if (windowWidth >= 992) {
        !navList.classList.contains("active") && navList.classList.add("active");
        toggleButton.classList.contains("active") && toggleButton.classList.remove("active");
    }
    else {
        navList.classList.contains("active") && navList.classList.remove("active");
    }
};

// Execute function on resize
reportWindowSize();
window.onresize = reportWindowSize;



// Tabs
const tabActive = (id) => {
    const tabId = id.split('-')[2];
    const tabButton = document.getElementById(id);
    const tabPane = document.getElementById(`tab-pane-${tabId}`)
    const tabsPane = document.querySelectorAll(".panes__group");
    for (const button of tabsButton) {
        button.classList.contains("active") && button.classList.remove("active");
    }
    !tabButton.classList.contains("active") && tabButton.classList.add("active");
    switchElement(tabsPane, tabPane);
};

const tabsButton = document.querySelectorAll('.pills__item');
tabsButton.forEach(item => {
    item.addEventListener("click", e => tabActive(e.currentTarget.id));
});

// Reveal navigation bar when scrolling to position V1
function scrollFunction() {
    const header = document.querySelector("header");
    const position = window.innerHeight - header.clientHeight;
    if (document.documentElement.scrollTop >= position) {
        !header.classList.contains("active") && header.classList.add("active");
    } else {
        header.classList.contains("active") && header.classList.remove("active");
        !header.classList && header.removeAttribute("class");
    }
}
// Execute function on scroll
window.onscroll = scrollFunction;