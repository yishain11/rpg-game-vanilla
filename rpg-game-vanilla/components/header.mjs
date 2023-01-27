export function genHeader() {
    let header = document.createElement('header');
    const nav = document.createElement('nav');
    const links = ["Main Screen", "worldMap"];
    links.forEach(link => {
        let a = document.createElement('a');
        const innerText = document.createTextNode(link);
        a.append(innerText);
        a = styleA(a, link);
        nav.append(a);
    });
    header.append(nav);
    header = (styleHeader(header));
    return header;
}

function styleA(a, link) {
    if (link === 'Main Screen') {
        a.setAttribute('href', `/`);
    } else {
        a.setAttribute('href', `/pages/${link}/${link}.html`);
    }
    a.style.marginLeft = '5rem';
    a.style.fontSize = '2rem';
    return a;
}

function styleHeader(header) {
    header.style.display = 'flex';
    header.style.height = '5vh';
    header.style.backgroundColor = 'darkgray';
    header.style.alignItems = 'center';
    return header;
}