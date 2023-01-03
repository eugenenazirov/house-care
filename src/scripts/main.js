const orderProjectBlocks = () => {
    const projectImageBlocks = $('.project__image');
    for (let i = 1; i < projectImageBlocks.length; i += 2) {
        let imageBlock = $(projectImageBlocks[i]);
        imageBlock.css('order', '1');
    }
}

const scrollToProjects = () => {
    let projects = document.getElementById('projects');
    projects.scrollIntoView({
        behavior: 'smooth'
    });
}

const popup = $('.popup');

const openPopup = () => {
    popup.removeClass('closed').hide().fadeIn();
}

const hidePopup = () => {
    popup.fadeOut(400, () => {
        popup.addClass('closed');
    });
}

function main() {
    orderProjectBlocks();
    $('#tourBtn').click(openPopup);
    $('#scrollDown').click(scrollToProjects);
    $('#closeBtn').click(hidePopup);
    new Glide('.glide', {
        autoplay: 3000,
        hoverpause: true,
    }).mount();
}

$(document).ready(main);
