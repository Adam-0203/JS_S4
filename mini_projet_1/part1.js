let form = document.querySelector("form");
let next_button = document.querySelector(".next div");
let list_questions = document.querySelectorAll(".question");
list_questions = Array.from(list_questions);
list_correct_responses = [2, 6, 9, 15, 16, 21, 26, 30, 34, 37];
let current_question = 0;
let check_box = document.querySelectorAll("input");
check_box = Array.from(check_box);
let begin = 1;

let my_timer = document.getElementById("clock");
let count = document.querySelector(".time");
let countdown;



function startCountDown() {
    let timeLeft = 21;

    clearInterval(countdown);

    countdown = setInterval(() => {
        timeLeft -= 1;
        my_timer.textContent = timeLeft;

        if (timeLeft <= 0 && current_question < 9) {
            next_button.click();
        }

        else if (timeLeft <= 0 && next_button.textContent === "Result") {
            next_button.click();
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    startCountDown();
})


next_button.addEventListener("click", (e) => {
    if (current_question < 8) {
        list_questions[current_question].classList.add("hidden");
        current_question += 1;
        list_questions[current_question].classList.remove("hidden");
        startCountDown();
    }

    else if (e.target.textContent === "Result") {
        let list_response = document.querySelectorAll("input");
        console.log(list_response);
        let responses = [];
        for (let i = 0; i < list_response.length; i++) {

            if (list_response[i].checked) {
                responses.push(i);
            }

            if ((i > 0) && ((i + 1) % 4 === 0) && !(list_response[i].checked || list_response[i - 1].checked || list_response[i - 2].checked || list_response[i - 3].checked)) {
                responses.push(-1);
            }

        }
        console.log(responses);
        score = 0;
        for (let i = 0; i < responses.length; i++) {
            if (responses[i] === list_correct_responses[i]) {
                score += 1;
            }
        }

        let result = document.querySelector(".score");
        console.log(result);
        result.textContent = `Score : ${score}/10`;
        result.classList.remove("hidden");
        count.remove();
        form.style.display = "none";
        next_button.style.display = "none";


        if (0 <= score && score <= 4) result.style.color = "red";
        else if (5 <= score && score <= 7) result.style.color = "#ddc214";
    }

    else if (current_question == 8) {
        list_questions[current_question].classList.add("hidden");
        current_question += 1;
        list_questions[current_question].classList.remove("hidden");
        next_button.textContent = "Result";
        next_button.style.color = "black";
        next_button.style.right = "45%";
    }
})
