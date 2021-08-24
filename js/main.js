// тута будет жосе код
document.addEventListener("DOMContentLoaded", function() {
    "use strict"
    const overlay = document.querySelector(".overlay");
    const quiz = document.querySelector(".quiz");
    const passTestButton = document.querySelector(".pass-test__button");
    const form = document.querySelector(".quiz-body__form");
    const formItems = form.querySelectorAll("fieldset");


    formItems.forEach((formItem, formItemIndex) => {
        if (formItemIndex === 0) {
            formItem.style.display = "block";
        } else {
            formItem.style.display = "none";
        }

    });

    overlay.style.display = "none";
    quiz.style.display = "none";

    passTestButton.addEventListener('click', () => {
        overlay.style.display = "block";
        quiz.style.display = "block";
    })

});