const billInput = document.querySelector(".calculation__bill-input");
const numberOfPeopleInput = document.querySelector(
    ".calculation__number-of-people-input"
);
const tipsBtns = document.querySelectorAll(".calculation__tip-list-item");
const totalPerPerson = document.querySelector(".amout__tip-total");
const totalTipPerPerson = document.querySelector(".amout__tip-total-amount");
const resetBtn = document.querySelector(".amount__reset-btn");
const customTip = document.querySelector(".calculation__tip-list-custom input");
let tip;

const calcTotal = () => {
    if (!+billInput.value || !+numberOfPeopleInput.value || !+tip) {
        totalPerPerson.textContent = "$0.00";
        totalTipPerPerson.textContent = "$0.00";
        return;
    }

    totalPerPerson.textContent = `\$${(
        (+billInput.value + +billInput.value * (+tip / 100)) /
        +numberOfPeopleInput.value
    ).toFixed(2)}`;

    localStorage.setItem(
        "totalPerPerson",
        (
            (+billInput.value + +billInput.value * (+tip / 100)) /
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
    tipsBtns.forEach((tipBtn) => {
        if (
            tipBtn.getAttribute("data-percent") == localStorage.getItem("tip")
        ) {
            tipBtn.classList.add("active");
        }
    });
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
        customTip.value = "Custom";
        customTip.style.width = "100%";
        customTip.style.textAlign = "center";
        customTip.setAttribute("type", "button");
        tipsBtns.forEach((tip) => tip.classList.remove("active"));
        tipBtn.classList.add("active");
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
    tipsBtns.forEach((tipBtn) => {
        tipBtn.classList.remove("active");
    });
    calcTotal();
});

customTip.addEventListener("click", () => {
    tipsBtns.forEach((tipBtn) => {
        tipBtn.classList.remove("active");
    });
    customTip.setAttribute("type", "number");
    customTip.style.width = "50%";
    customTip.style.textAlign = "right";
    customTip.addEventListener("input", () => {
        tip = customTip.value;
        localStorage.setItem("tip", +customTip.value);
        calcTotal();
    });
});
