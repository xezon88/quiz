// тута будет жосе код
document.addEventListener("DOMContentLoaded", function() {
    "use strict"
    const overlay = document.querySelector(".overlay");
    const quiz = document.querySelector(".quiz");
    const passTestButton = document.querySelector(".pass-test__button");
    const form = document.querySelector(".quiz-body__form");
    const inputs = document.querySelectorAll("input");
    const formItems = form.querySelectorAll("fieldset");
    const btnsNext = form.querySelectorAll(".form-button_btn-next");
    const btnsPrev = form.querySelectorAll(".form-button_btn-prev");
    const answersObj = {
        step0: {
            question: '',
            answers: [],
        },
        step1: {
            question: '',
            answers: [],
        },
        step2: {
            question: '',
            answers: [],
        },
        step3: {
            question: '',
            answers: [],
        },
        step4: {
            question: '',
            answers: [],
        },
    };

    btnsNext.forEach((btn, i) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();


            formItems[i].style.display = "none";
            formItems[i + 1].style.display = "block"
        });

        btn.disabled = true;
    });

    btnsPrev.forEach((btn, btnIndex) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();


            formItems[btnIndex + 1].style.display = "none";
            formItems[btnIndex].style.display = "block";
        });
    });


    formItems.forEach((formItem, formItemIndex) => {
        const itemTitle = formItem.querySelector(".form__title");


        if (formItemIndex === 0) {
            formItem.style.display = "block";
        } else {
            formItem.style.display = "none";
        }

        formItem.addEventListener('change', (event) => {
            const target = event.target;
            const inputsCheck = formItem.querySelectorAll("input:checked");
            answersObj[`step${formItemIndex}`].answers.push('cjdsvsd');
            console.log(answersObj);

            if (inputsCheck.length > 0) {
                btnsNext[formItemIndex].disabled = false;
            } else {
                btnsNext[formItemIndex].disabled = true;
            }


            if (target.classList.contains("form__input")) {
                const inputs = formItem.querySelectorAll(".form__input");

                inputs.forEach((input) => {
                    if (input === target) {
                        input.parentNode.classList.toggle("active-checkbox");
                    } else {
                        input.parentNode.classList.remove("active-checkbox");
                        input.checked = false;

                    }
                });
            } else {
                return;
            }
        });
    });

    inputs.forEach((input) => {
        const parent = input.parentNode;
        input.checked = false;
        parent.classList.remove("active-radio");
        parent.classList.remove("active-checkbox");
    })

    overlay.style.display = "none";
    quiz.style.display = "none";

    passTestButton.addEventListener('click', () => {
        overlay.style.display = "block";
        quiz.style.display = "block";
    })

});