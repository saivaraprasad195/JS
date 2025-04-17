import data from "./employeeData.js";

let selectedEmployee = data[0];
const employeeList = document.querySelector(".employee_names-list");
const employeeDetails = document.querySelector(".employee_details-container");
const modalOverlay = document.querySelector(".modal_overlay");
const addEmployee = document.querySelector(".add_employee");
const addEmployeeForm = document.querySelector(".addEmployee_form");

//render EmployeeList
function renderEmployeeList() {
  employeeList.innerHTML = "";
  data.forEach((item) => {
    const span = document.createElement("span");
    span.innerHTML = `${item.firstName}  ${item.lastName}  <i class="employee_delete">⛔</i> `;
    span.classList.add("employee_item");
    span.id = `${item.id}`;

    if (selectedEmployee.id === item.id) {
      span.classList.add("selected");
      selectedEmployee = item;
    }
    employeeList.append(span);
  });
}

//Show Selected Employee Details
employeeList.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN" && selectedEmployee.id !== e.target.id) {
    selectedEmployee = data.find((emp) => emp.id === Number(e.target.id));
    renderEmployeeList();
    renderEmployeeDetails();
  }
  //Delete Employee Details from List
  if (e.target.tagName === "I") {
    const employee_deleteId = Number(e.target.parentNode.id);
    let index = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === employee_deleteId) {
        index = i;
        break;
      }
    }
    data.splice(index, 1);
    selectedEmployee = data[0] || {};
    renderEmployeeList();
    renderEmployeeDetails();
  }
});

const renderEmployeeDetails = () => {
  if (!selectedEmployee) {
    employeeDetails.innerHTML = `<p>No Employee Selected</p>`;
  } else {
    employeeDetails.innerHTML = `
      <h5 class="heading">Employee Details</h5>
      <img src="${selectedEmployee.imageUrl}" />
      <span class="employees__single--heading">
      ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
      </span>
      <span>${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>Mobile - ${selectedEmployee.contactNumber}</span>
      <span>DOB - ${selectedEmployee.dob}</span>
    `;
  }
};

//Add New Employee Details
modalOverlay.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") {
    modalOverlay.style.display = "none";
  }
});

addEmployee.addEventListener("click", (e) => {
  modalOverlay.style.display = "flex";
});

addEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addEmployeeForm);
  const values = [...formData.entries()];
  const newEmployeeData = {};
  values.forEach((emp) => {
    newEmployeeData[emp[0]] = emp[1];
  });

  newEmployeeData.id = data[data.length - 1].id + 1;
  newEmployeeData.imageUrl =
    newEmployeeData.imageUrl ||
    "https://cdn-icons-png.flaticon.com/512/0/93.png";
  data.push(newEmployeeData);
  renderEmployeeList();
  addEmployeeForm.reset();
  modalOverlay.style.display = "none";
});

renderEmployeeList();
renderEmployeeDetails();
