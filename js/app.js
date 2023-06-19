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

    totalTipPerPerson.textContent = `\$${(
        (+billInput.value * (+tip / 100)) /
        +numberOfPeopleInput.value
    ).toFixed(2)}`;
};

calcTotal();

billInput.addEventListener("input", () => {
    calcTotal();
});

numberOfPeopleInput.addEventListener("input", () => {
    calcTotal();
});

tipsBtns.forEach((tipBtn) => {
    tipBtn.addEventListener("click", () => {
        tip = tipBtn.getAttribute("data-percent");
        calcTotal();
    });
});

resetBtn.addEventListener("click", () => {
    billInput.value = "";
    numberOfPeopleInput.value = "";
    tip = "";
    calcTotal();
});
