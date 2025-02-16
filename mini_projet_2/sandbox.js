let form_input = document.querySelector(".add");
let lista = document.querySelector("ul");
console.log(lista);


let list_deleate_button = document.querySelectorAll("i");
list_deleate_button = Array.from(list_deleate_button);

list_deleate_button.forEach((x) => {
    x.addEventListener("click", (event) => {
        event.target.parentNode.remove();
    })
});



form_input.addEventListener("submit", (event) => {
    event.preventDefault();
    let input = document.querySelector(".add .form-control");

    lista.innerHTML +=
        `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${input.value}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>`;

    let list_deleate_button = document.querySelectorAll("i");
    list_deleate_button = Array.from(list_deleate_button);


    list_deleate_button.forEach((x) => {
        x.addEventListener("click", (event) => {
            event.target.parentNode.remove();
        })
    });
    input.value = '';
})



let search_field = document.querySelector(".search input");
let search_form = document.querySelector(".search");
search_form.addEventListener("submit", (event) => { event.preventDefault() });



search_field.addEventListener("input", (event) => {
    let search = event.target.value;

    let task_list = document.querySelectorAll("li span");
    task_list = Array.from(task_list);


    task_list.forEach((x) => {
        if (!(x.textContent.includes(search)) && (search !== '')) {
            x.parentElement.classList.add("hidden");
        }
        else {
            x.parentElement.classList.remove("hidden");
        }
    });
});

