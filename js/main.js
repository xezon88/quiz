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
            question: "",
            answers: [],
        },
        step1: {
            question: "",
            answers: [],
        },
        step2: {
            question: "",
            answers: [],
        },
        step3: {
            question: "",
            answers: [],
        },
        step4: {
            question: "",
            answers: [],
        },
        step5: {
            name: "",
            phone: "",
            email: "",
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
        if (formItemIndex !== formItems.length - 1) {
            formItem.addEventListener('change', (event) => {
                const target = event.target;
                const inputsChecked = formItem.querySelectorAll("input:checked");


                inputsChecked.forEach((inputChecked, indexInputCheked) => {
                    answersObj[`step${formItemIndex}`].answers.length = 0;
                    answersObj[`step${formItemIndex}`].answers.push(inputChecked.value);
                });





                if (inputsChecked.length > 0) {
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
        }

    });

    inputs.forEach((input) => {
        const parent = input.parentNode;
        input.checked = false;
        parent.classList.remove("active-checkbox");
    });

    const sendForm = () => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            answersObj.step5.name = document.getElementById("quiz-name").value;
            answersObj.step5.phone = document.getElementById("quiz-phone").value;
            answersObj.step5.email = document.getElementById("quiz-email").value;


            // for (let key in answersObj.step5) {
            //     console.log(key);
            //     if (answersObj.step5[key] === "") {
            //         console.log(answersObj.step5[key]);
            //         alert("Введите даные во все поля");
            //         return false;
            //     }
            // }

            if (document.getElementById("quiz-policy").checked) {
                postData(answersObj)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res["status"] === "ok") {

                            form.reset();
                            alert(res["message"]);
                        } else if (res["status"] === "error") {
                            alert(res["message"]);

                        }
                    });
            } else {
                alert("Дайте согласие на обработку персональных данных");
            }
        });
    };

    const postData = (body) => {
        return fetch("./server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    };



    passTestButton.addEventListener('click', () => {
        overlay.style.display = "block";
        quiz.style.display = "block";
    });
    sendForm();

    function progress() {
        let elem = document.getElementById('progress__line'),
            width = 20,
            id = setInterval(progressStatus, 1000);

        function progressStatus() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
                elem.innerHTML = width * 1 + '%';
            }
        }
    }
    progress();
});