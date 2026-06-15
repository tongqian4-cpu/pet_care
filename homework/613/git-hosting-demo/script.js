const statusButton = document.querySelector("#statusButton");
const statusText = document.querySelector("#status");

statusButton.addEventListener("click", () => {
  statusText.textContent = "Git 作业流程已完成";
});
