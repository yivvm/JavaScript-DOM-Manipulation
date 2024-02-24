// import "./styles.css";

// ALAB 316.1.1: DOM Manipulation (Part One) =======================

// Part 1:

// 1. select and cache the <main> element in a variable name mainEl.
const mainEl = document.querySelector('main');

// 2. set the background color of mainEl to the value store in the --main-bg CSS custom property.
mainEl.style.backgroundColor = 'var(--main-bg)';

// 3. set the content of mainEl to <h1>DOM Manipulation</h1>.
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
// Step 1: Select and cache the <main> element in a variable named mainEl

// 4. add a class of flex-ctr to mainEl.
mainEl.classList.add('flex-ctr');

// Part 2:

// 1. select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById('top-menu');

// 2. set the height of the topMenuEl element to be 100%;
topMenuEl.style.height = '100%';

// 3. set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// 4. add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around');

// Part 3:

// Menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '#', subLinks: [
        {text: 'all', href: '/catalog/all'},
        {text: 'top selling', href: '/catalog/top'},
        {text: 'search', href: '/catalog/search'},
    ] },
    { text: 'orders', href: '#', subLinks: [
        {text: 'new', href: '/orders/new'},
        {text: 'pending', href: '/orders/pending'},
        {text: 'history', href: '/orders/history'},
    ] },
    { text: 'account', href: '#', subLinks: [
        {text: 'profile', href: '/account/profile'}, 
        {text: 'sign out', href: '/account/signout'},
    ] },
];

// 1. iterate over the entire menuLinks array and for each "link" object:
menuLinks.forEach((link) => {
    // 2. create an <a> element.
    const anchor = document.createElement('a');

    // 3. on the new element, add an href attribute with its value set to the href property of the "link" object.
    anchor.setAttribute('href', link.href);

    // 4. set the new element's content to the value of the text property of the "link" object.
    anchor.textContent = link.text;

    // 5. append the new element to the topMenuEl element.
    topMenuEl.appendChild(anchor)
})




// ALAB 316.3.1: DOM Manipulation (Part Two) =====================

// Part 2: Adding Additional HTML and CSS
// done in .html and .css files

// Part 3: Creating the Submenu

// 1. select and cache the <nav id="sub-menu"> element in a variable named subMenuEl
const subMenuEl = document.querySelector('#sub-menu');
// const subMenuEl = document.getElementById('sub-menu');
// console.log(subMenuEl)

// 2. set the height subMenuEl element to be 100%
subMenuEl.style.height = "100%";

// 3. set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

// 4. add the class of flex-around to the subMenuEl
subMenuEl.classList.add('flex-around');

// 5. set the css position property of subMenuEl to the value of absolute
subMenuEl.style.position = 'absolute';

// 6. set the CSS top property of subMenuEl to the value of 0
subMenuEl.style.top = '0';

// Part 4: Adding Menu Interaction
// update the menuLinks array above

// 1. select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks
const topMenuLinks = topMenuEl.querySelectorAll('a');

// 2. attach a delegated 'click' event listener to topMenuEl
topMenuEl.addEventListener('click', function(event) {
    // 2.1 the first line of code of the event listener function should call the event object's preventDefault() method
    event.preventDefault();

    // 2.2 the second line of code of the function should immediately return if the element clicked was not an <a> element
    if (event.target.tagName !== 'A') {
        return;
    }

    // 2.3 log the content of the <a> to verify the handler is working
    console.log(event.target.textContent);
    // console.log(event.target);

    // 3. the event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it
    event.target.classList.toggle('active');

    // 4. the event listener should remove the active class from each other <a> element in topMenuEl - whether the active class exists or not
    topMenuLinks.forEach(function(link) {
            link.classList.remove('active');
    })

    // Part 5: Adding Submenu Interaction
    const hasSubLinks = menuLinks.find((link) => link.text === event.target.textContent).subLinks;
    console.log(hasSubLinks);

    // 1. within the event listener, if the clicked <a> element does not yet have a class of 'active'
    if (event.target.classList !== 'active') {
        // 1.1 if the clicked <a> element's "link" object within menuLinks has a subLinks property, set the CSS top property of subMenuEl to 100%.
        if (hasSubLinks) {
            subMenuEl.style.top = "100%";

            // 5. include helper function in the event listener, pass the array of sub-links as an argument
            buildSubmenu(hasSubLinks);

        } else {
            // 1.2 otherwise, set the CSS top property of subMenuEl to 0
            subMenuEl.style.top = "0";
        }
    }

    // 10. if the ABOUT link is clicked, and <h1>About</h1> should be displayed.
    if (event.target.textContent === 'about') {
        mainEl.innerHTML = '<h1>ABOUT</h1>';
    } else {
        mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
    }
})
// console.log(subMenuEl)

// 2. create a helper function buildSubmenu
function buildSubmenu(subLinks) {
    // 3. clear the current contents of subMenuEl
    subMenuEl.innerHTML = "";
    
    // 4. iterate over the subLinks array, passed as an argument, and for each "link" object:
    subLinks.forEach((link) => {
        // 4.a create an <a> element
        const anchorsub = document.createElement('a');

        // 4.b add an href attribute to the <a>, with the value set by the href property of the "link" object
        anchorsub.setAttribute('href', link.href);

        // 4.c set the element's content to the value of the text property of the "link" object
        anchorsub.textContent = link.text;

        // 4.d append the new element to the subMenuEl
        subMenuEl.appendChild(anchorsub);
    })
}

// 6. attach a delegated 'click' event listener to subMenuEl
subMenuEl.addEventListener('click', function(event) {
    // 6.1 call event object's preventDefault() method
    event.preventDefault();

    // 6.2 immediately return if the element clicked was not an <a> element
    if (event.target.tagName !== 'A') {
        return;
    }

    // 6.3 log the content of the <a> to verify the handler is working
    console.log(event.target.textContent);

    // 7. set CSS top property of subMenuEl to 0
    // subMenuEl.style.top = "0";
    if (subMenuEl.style.top === '100%') {
        subMenuEl.style.top = '0';
    }

    // 8. remove the active class from each <a> element in topMenuLinks
    topMenuLinks.forEach((link) => {
            link.classList.remove('active');
    })

    // 9. update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked withiin subMenuEl
    const eventContent = `${event.target.textContent}`;
    const eventContentUpper = eventContent.toUpperCase();
    mainEl.innerHTML = `<h1>${eventContentUpper}</h1>`;

    // console.log(event.target.textContent)
})


