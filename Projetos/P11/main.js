const input = document.querySelector("#input");
const output = document.querySelector("#output");

function printInput() {
    output.innerHTML = input.value;
}

input.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector("#button").click();
    }
});