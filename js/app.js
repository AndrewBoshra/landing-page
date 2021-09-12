/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.getElementsByTagName('section');
const nav = document.getElementById('navbar__list');
let selectedSection = sections[0];

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

function selectSectionWhenVisible() {
    // the line when crossed considered active section
    //half of the screen
    const updateLineY = scrollY + window.innerHeight / 2;

    for (const section of sections) {
        const sectionBottom = section.offsetTop + section.offsetHeight;
        if (sectionBottom > updateLineY) {
            if (selectedSection != section) {
                updateNav(section);
                setNewActiveSection(section);
            }

            break;
        }
    }
}

function createNavItemForSection(section, isSelected) {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    if (isSelected) {
        item.classList.add('menu__active');
    }

    anchor.textContent = section.dataset.nav;
    anchor.className = 'menu__link';

    anchor.href = ''; //to make it clickable
    //could use href= section id also
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        scrollTo({ top: section.offsetTop, behavior: "smooth" });
    })

    item.appendChild(anchor);
    return item;
}

function updateNav(section) {
    for (const navItem of nav.children) {
        if (navItem.textContent === selectedSection.dataset.nav) {
            navItem.classList.remove('menu__active');
        }
        if (navItem.textContent === section.dataset.nav) {
            navItem.classList.add('menu__active');
        }
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav() {
    const items = document.createDocumentFragment();
    for (const section of sections) {
        const isSelected = section === selectedSection;
        const navItem = createNavItemForSection(section, isSelected);
        items.appendChild(navItem);
    }
    nav.appendChild(items);
}

// Add class 'active' to section when near top of viewport
function setNewActiveSection(section) {
    //deactivate old section
    selectedSection.classList.toggle('your-active-class');
    //activate new section
    section.classList.toggle('your-active-class');

    selectedSection = section;
}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
buildNav();
// Scroll to section on link click

// Set sections as active
document.addEventListener('scroll', selectSectionWhenVisible);

