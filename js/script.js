/* --- SIDE-MENU --- */

document.querySelector('.burger').addEventListener('click', function (event) {
    document.querySelector('.burger span').classList.toggle('active');
    let sidebar = document.querySelector(".sidebar");
    sidebar.hidden = !sidebar.hidden;
    event.stopPropagation();
})


let click = new Event("click");
document.documentElement.addEventListener("click", function (e) {
    let sidebar = document.querySelector(".sidebar");
    if (!sidebar.hidden) {
        document.querySelector('.burger').dispatchEvent(click);
    }
})



/* --- BLOCK ANIMATION --- */
const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll() {
        for (let i = 0; i < animItems.length; ++i) {
            const animItem = animItems[i];
            const animItemHeigth = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;
            const animItemPoint = (animItemHeigth > window.innerHeight) ?
                window.innerHeight - window.innerHeight / animStart
                :
                window.innerHeight - animItemHeigth / animStart;

            if ((pageYOffset > animItemOffset - animItemPoint && pageYOffset < (animItemOffset + animItemHeigth))) {
                animItem.classList.add(`_active`);
            } else if (animItem.classList.contains("_anim-repeat")) {
                animItem.classList.remove(`_active`);
            }
        }
    }

    function offset(element) {
        const rect = element.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}


/* --- BUTTONS ONCLICK --- */

function getResponse(selects) {
    const response = {};
    for (let i of selects) {
        response[i.name] = i.value;
    }
    return response;
}

function makeAlertFromResponse(obj) {
    let string = "Fake request\n\n";
    for (let i in obj) {
        string += `${i} — ${obj[i]}\n`;
    }
    return string;
}

function fakeSubmit(e) {
    const searchForm = document.querySelector(".search__form");
    const selects = searchForm.querySelectorAll(".form__option");
    const response = getResponse(selects);
    const data = makeAlertFromResponse(response);
    confirm(data);
    e.preventDefault();
}

function fakeSubscribe(e) {
    const email = document.querySelector(".footer__email").value;
    let string = `Fake request\n\nEmail has been registred — ${email}`;
    alert(string);
    e.preventDefault();
}

/* --- FAKE ROUTING --- */
const links = Array.from(document.body.getElementsByTagName(`A`));
links.forEach((link) => {
    link.addEventListener("click", function (e) {
        alert("Fake routing");
        e.preventDefault();
    })
})