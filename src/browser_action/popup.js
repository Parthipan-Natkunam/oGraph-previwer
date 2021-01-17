const switchTab = (event) => {
  if (event && event.target) {
    if (event.target.tagName !== "BUTTON") {
      return;
    }
    const tabToSwitch = event.target.dataset.tab;
    if (tabToSwitch) {
      document
        .querySelector(".popup__tab-btn.active")
        .classList.remove("active");
      document.querySelector(".content-box.active").classList.remove("active");
      event.target.classList.add("active");
      document.getElementById(tabToSwitch).classList.add("active");
    }
  }
};

document.getElementById("tabs").addEventListener("click", switchTab);
