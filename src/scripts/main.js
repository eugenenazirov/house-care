const popup = $('.popup');
const projects = $('.projects__project');
const seeMore = $('.see-more')
const seeMoreText = $('.see-more__text')
const seeMoreArrow = $('.see-more__arrow');


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

const openPopup = () => {
    popup.removeClass('closed').hide().fadeIn();
}

const hidePopup = () => {
    popup.fadeOut(400, () => {
        popup.addClass('closed');
    });
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

function main() {
    projects.slice(-3).hide();
    orderProjectBlocks();
    $('#tourBtn').click(openPopup);
    $('#scrollDown').click(scrollToProjects);
    $('#closeBtn').click(hidePopup);
    seeMore.click(showThreeProjects);
    $('.to-consultation').each(function () {
        $(this).click(scrollToConsultation);
    });
    $('.form__btn').click(validateForm);

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

    $('.form__input.phone').each(function () {
        new IMask(this, {
            mask: "+{7} (000) 000-00-00"
        });
    });
}

$(document).ready(main);
