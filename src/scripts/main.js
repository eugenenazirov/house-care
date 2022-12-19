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

function main() {
    orderProjectBlocks();
    $('#scrollDown').click(scrollToProjects);
}

$(document).ready(main);
