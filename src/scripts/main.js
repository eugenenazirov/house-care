const popup = $('.popup');
const projects = $('.projects__project');
const seeMore = $('.see-more');


const orderProjectBlocks = () => {
    const projectImageBlocks = $('.project__image');
    for (let i = 1; i < projectImageBlocks.length; i += 2) {
        let imageBlock = $(projectImageBlocks[i]);
        imageBlock.css('order', '1');
    }
}

const hideThreeProjects = () => {
    projects.slice(-3).hide(1000);
    $('.see-more__text').text('Показать еще три проекта');
    $('.see-more__arrow').css({
        transform: 'rotate(180deg)'
    });
    seeMore.off().click(showThreeProjects);
}

const showThreeProjects = () => {
    projects.slice(-3).show(1000);
    $('.see-more__text').text('Скрыть последние три проекта');
    $('.see-more__arrow').css({
        transform: 'rotate(180deg)'
    });
    seeMore.off().click(hideThreeProjects);
}

const scrollToProjects = () => {
    let projects = document.getElementById('projects');
    projects.scrollIntoView({
        behavior: 'smooth'
    });
}

const openPopup = () => {
    popup.removeClass('closed').hide().fadeIn();
}

const hidePopup = () => {
    popup.fadeOut(400, () => {
        popup.addClass('closed');
    });
}

function main() {
    projects.slice(-3).hide();
    orderProjectBlocks();
    $('#tourBtn').click(openPopup);
    $('#scrollDown').click(scrollToProjects);
    $('#closeBtn').click(hidePopup);
    seeMore.click(showThreeProjects);
    new Glide('.glide', {
        autoplay: 3000,
        hoverpause: true,
    }).mount();
    $('.project__image').magnificPopup({
        delegate: 'a',
        gallery: {
            enabled: true
        },
        type: 'image'
    });
}

$(document).ready(main);
