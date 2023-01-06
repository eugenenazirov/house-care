const popup = $('.popup');
const projects = $('.projects__project');
const seeMore = $('.see-more')
const seeMoreText = $('.see-more__text')
const seeMoreArrow = $('.see-more__arrow');
const popupMenu = $('#popupMenu');


const orderProjectBlocks = () => {
    const projectImageBlocks = $('.project__image');
    for (let i = 1; i < projectImageBlocks.length; i += 2) {
        let imageBlock = $(projectImageBlocks[i]);
        imageBlock.css('order', '1');
    }
}

const hideThreeProjects = () => {
    projects.slice(-3).hide(1000);
    seeMoreText.text('Показать еще три проекта');
    seeMoreArrow.css({
        transform: 'rotate(180deg)'
    });
    seeMore.off().click(showThreeProjects);
}

const showThreeProjects = () => {
    projects.slice(-3).show(1000);
    seeMoreText.text('Скрыть последние три проекта');
    seeMoreArrow.css({
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

const scrollToConsultation = () => {
    const consultationBlock = document.getElementById('consultationBlock');
    consultationBlock.scrollIntoView({
        behavior: 'smooth'
    });
}

const showPopup = () => {
    popup.removeClass('closed').hide().fadeIn();
}

const hidePopup = () => {
    popup.fadeOut(400, () => {
        popup.addClass('closed');
    });
}

const showMenu = () => {
    popupMenu.show(300);
    [
        $('#menuClose'),
        $('.menu__item'),
        $('.place-to-hide-menu'),
    ].forEach((obj) => {
        obj.click(hideMenu);
    })
}

const hideMenu = () => {
    popupMenu.hide(300);
}

const sendPostRequest = (formData) => {
    $.ajax({
        method: "POST",
        url: "https://testologia.site/checkout",
        data: formData
    })
        .done(function( msg ) {
            if (msg.success === 0) {
                alert('Произошла ошибка! Попробуйте снова')
                return false;
            }

            $('.consultation__form').hide(500, () => {
                $('.thanks').removeClass('closed').hide().fadeIn(500);
            });
        });
}

const clearForm = (inputs, checkbox) => {
    inputs.each(function () {
        let elem = $(this);
        elem.removeClass('invalid-input');
        elem.next().addClass('closed');
    })
    checkbox.removeClass('invalid-input');
}

const validateForm = (e) => {
    e.preventDefault();
    const formClass = e.target.parentElement.classList[0];
    const inputs = $(`.${formClass} .form__input`);
    const checkbox = $(`.${formClass} .form__checkbox`);
    let errors = [];

    clearForm(inputs, checkbox);

    inputs.each(function () {
        let trimmedValue = this.value.trim();
        if (!trimmedValue) {
            let elem = $(this);
            elem.addClass('invalid-input');
            elem.next().removeClass('closed');
            errors.push(`Input ${this.name} has invalid value.`);
        }
    });

    if (!checkbox[0].checked) {
        checkbox.addClass('invalid-input');
        errors.push(`Checkbox ${checkbox[0].name} isn't checked!`)
    }

    if (errors.length !== 0) {
        errors.forEach((e) => {
            console.log(e);
        })
        return false;
    }

    const formData = {
        name: inputs[0].value,
        phone: inputs[1].value
    }

    sendPostRequest(formData);
}

const showRelatedCard = (e) => {
    let target = $(e.target);
    $('.mobile-circle-cursor').removeClass('active');
    target.addClass('active');
    $('.schema__info-block').hide().removeClass('active');
    target.next().addClass('active').show();
}

const adaptiveCheck = (maxWidth) => {
    if ($(window).width() <= maxWidth) {
        projects.each(function () {
            let elem = $(this);
            let projectImagesContent = elem.children().first();
            let projectInfoContent = elem.children().last();

            projectInfoContent.html(projectInfoContent.html() + projectImagesContent.prop('outerHTML'));
            projectImagesContent.remove();
        });

        $('.mobile-circle-cursor').click(showRelatedCard);
    }
}

function main() {
    adaptiveCheck(320);

    projects.slice(-3).hide();
    orderProjectBlocks();
    $('#tourBtn').click(showPopup);
    $('#scrollDown').click(scrollToProjects);
    $('#closeBtn').click(hidePopup);
    $('#burger').click(showMenu);
    seeMore.click(showThreeProjects);
    $('.to-consultation').each(function () {
        $(this).click(scrollToConsultation);
    });
    $('.form__btn').click(validateForm);

    new Glide('.glide', {
        autoplay: 3000,
        hoverpause: true,
    }).mount();

    $('.form__input.phone').each(function () {
        new IMask(this, {
            mask: "+{7} (000) 000-00-00"
        });
    });

    $('.project__image').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            gallery: {
                enabled: true
            },
            type: 'image'
        });
    });
}

$(document).ready(main);
