const billInput = document.querySelector(".calculation__bill-input");
const numberOfPeopleInput = document.querySelector(
    ".calculation__number-of-people-input"
);
const tipsBtns = document.querySelectorAll(".calculation__tip-list-item");
const totalPerPerson = document.querySelector(".amout__tip-total");
const totalTipPerPerson = document.querySelector(".amout__tip-total-amount");
const resetBtn = document.querySelector(".amount__reset-btn");
let tip;

const calcTotal = () => {
    if (!+billInput.value || !+numberOfPeopleInput.value || !+tip) {
        totalPerPerson.textContent = "$0.00";
        totalTipPerPerson.textContent = "$0.00";
        return;
    }

    totalPerPerson.textContent = `\$${(
        (+billInput.value - +billInput.value * (+tip / 100)) /
        +numberOfPeopleInput.value
    ).toFixed(2)}`;

    localStorage.setItem(
        "totalPerPerson",
        (
            (+billInput.value - +billInput.value * (+tip / 100)) /
            +numberOfPeopleInput.value
        ).toFixed(2)
    );

    totalTipPerPerson.textContent = `\$${(
        (+billInput.value * (+tip / 100)) /
        +numberOfPeopleInput.value
    ).toFixed(2)}`;

    localStorage.setItem(
        "totalTipPerPerson",
        (
            (+billInput.value * (+tip / 100)) /
            +numberOfPeopleInput.value
        ).toFixed(2)
    );
};

calcTotal();

if (localStorage.getItem("totalTipPerPerson")) {
    billInput.value = localStorage.getItem("bill");
    numberOfPeopleInput.value = localStorage.getItem("numberOfPeople");
    tip = localStorage.getItem("tip");
    calcTotal();
}

billInput.addEventListener("input", () => {
    localStorage.setItem("bill", +billInput.value);
    calcTotal();
});

numberOfPeopleInput.addEventListener("input", () => {
    localStorage.setItem("numberOfPeople", +numberOfPeopleInput.value);
    calcTotal();
});

tipsBtns.forEach((tipBtn) => {
    tipBtn.addEventListener("click", () => {
        tip = tipBtn.getAttribute("data-percent");
        localStorage.setItem("tip", +tip);
        calcTotal();
    });
});

resetBtn.addEventListener("click", () => {
    billInput.value = "";
    numberOfPeopleInput.value = "";
    tip = "";
    localStorage.clear();
    calcTotal();
});
