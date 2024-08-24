"strict";

let createTaskbtn = document.querySelector(".add-btn");
createTaskbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const overlay = document.getElementById("popupTask");
  overlay.classList.toggle("show");
});

// Close form button
let closeTaskbtn = document.querySelector(".closeTask-form");
// console.log(closeTaskbtn);
closeTaskbtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const overlay = document.getElementById("popupTask");
  overlay.classList.toggle("show");
});
//////////////
//by clicking submit button create a card of todo list & log it into local storage
let submitTaskbtn = document.querySelector(".submit-btn");
let i = 1;
submitTaskbtn.addEventListener("click", (e) => {
  e.preventDefault();
  // e.stopPropagation();
  createCard(i);
  i++;
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
});
//////////////
let newcardBody = "";
let getcardTitle = "";
let getcardDesc = "";
let titleText = "";
let DescText = "";
let newcardTitle = "";
let newcardDesc = "";
////////////////
function createCard(cardIdNum) {
  //fetching card title from form
  getcardTitle = document.getElementById("taskTitle").value;

  //fetching card title from form
  getcardDesc = document.getElementById("taskDesc").value;
  if (getcardTitle === "" || getcardDesc === "") {
    alert("Empty field !");
  } else {
    //new card body
    newcardBody = document.createElement("div");
    newcardBody.classList.add("card-body"); // adding class to card body

    newcardBody.id = cardIdNum;

    //new title
    newcardTitle = document.createElement("div");
    newcardTitle.classList.add("card-title"); // adding class to card title
    newcardTitle.id = "taskTitle";
    // pushing value to card title
    titleText = document.createTextNode(getcardTitle);
    newcardTitle.appendChild(titleText); // pushing value to card title
    newcardBody.appendChild(newcardTitle); // pushing value to card body

    //CREATE CARD DATE ELEMENT
    let newDate = document.createElement("div");
    newDate.classList.add("taskDate");
    let getDate = new Date();
    let newCardDate = getDate.getDate();
    let newCardMonth = getDate.getMonth();
    let newCardYear = getDate.getFullYear();
    let cardDateText = document.createTextNode(
      `${newCardDate}/ ${newCardMonth + 1}/${newCardYear}`
    );
    newDate.appendChild(cardDateText);
    newcardBody.appendChild(newDate);

    ////////////////////// CREATE CARD DESCRIPTION ELEMENT
    newcardDesc = document.createElement("div");
    newcardDesc.classList.add("card-text");

    DescText = document.createTextNode(getcardDesc);
    newcardDesc.appendChild(DescText); // pushing value to card desc
    newcardBody.appendChild(newcardDesc); // pushing value to card body

    //////////// adding button to card
    let newcardBtnCont = document.createElement("div");
    newcardBtnCont.classList.add("card-container-btn");

    let newcardBtn1 = document.createElement("button");
    newcardBtn1.id = cardIdNum;
    newcardBtn1.classList.add("card-btn", "delete-task");
    const btnTxt1 = document.createTextNode("🗑"); // giving text to close button
    newcardBtn1.appendChild(btnTxt1);
    let newcardBtn2 = document.createElement("button");
    newcardBtn2.classList.add("card-btn", "done-task");
    newcardBtn2.id = cardIdNum;

    const btnTxt2 = document.createTextNode("✔"); // giving text to done button
    newcardBtn2.appendChild(btnTxt2);

    newcardBtnCont.appendChild(newcardBtn1);
    newcardBtnCont.appendChild(newcardBtn2);
    newcardBody.appendChild(newcardBtnCont); //pushing card btn into card body

    const cardContainer = document.querySelector(".card-container");
    cardContainer.prepend(newcardBody);

    delTaskBtn();
    doneTaskbtn();
    /////////
    listTodo(); //of local storage
    createItem(getcardTitle); //of local storage
    console.log(getcardTitle); // delete it
  }
}
////////////////// deleting task
const delTaskBtn = () => {
  let close = document.getElementsByClassName("delete-task");
  let k;
  for (k = 0; k < close.length; k++) {
    let closeEle = close[k];
    close[k].onclick = function () {
      let div = closeEle.parentElement.parentElement;
      div.style.display = "none";
      let data1 = div.getElementsByClassName("card-title").value;
      localStorage.removeItem(data1);
    };
  }
};
////////// done task
const doneTaskbtn = () => {
  let done = document.getElementsByClassName("done-task");
  let j;
  for (j = 0; j < done.length; j++) {
    let ele = done[j];
    done[j].onclick = (done) => {
      console.log(document);
      console.log("Task Done !");
      let div1 = ele.parentElement.parentElement;
      console.log(div1);
      div1.classList.toggle("tick");
    };
  }
};
delTaskBtn();
doneTaskbtn();

///////////
//local storage
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const displayItems = () => {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `

    `;
  }
};

function createItem(item) {
  itemsArray.push(item);
  localStorage.setItem("item", JSON.stringify(itemsArray));
  // location.reload();
}
console.log(itemsArray);

// Setting up local storage
// let setStorageData = (data1) => {
// let data = getData();
//   data = data != false ? data : [];
//   data.push(data1);
//   data = JSON.stringify(data);
//   localStorage.setItem(getcardTitle, data);
// };
///////////
let addTask = () => {
  let taskTextDesc = document.getElementById("taskDesc").value;
  let taskTextTitle = document.getElementById("taskTitle").value;

  if (taskTextDesc != "" && taskTextTitle != "") {
    // handler for adding item into local storage
    setData(taskTextTitle, taskTextDesc);
    listTask(); // handler for showing item from local storage
  }
};
////////////
let setData = (item1, item2) => {
  // call getdata handler for getting  data from list
  let data1 = getData();

  // call getdata handler for getting  data from list
  let data2 = getData();

  data1 = data1 != false ? data1 : [];
  data2 = data2 != false ? data2 : [];

  data1.push(item1);
  data2.push(item2);

  data1 = JSON.stringify(data1);
  data2 = JSON.stringify(data2);

  /*
   * localStorage.setItem(<itemname>,<itemvalue>) main method
   * (predefined method of js) for set item into localstorage
   */
  localStorage.setItem(data1, data2);
};
/////////
let getData = (item1 = null, item2 = null) => {
  /*
   * localStorage.getItem(<itemname>) main method
   * (predefined method of js) for getting item from localstorage
   */
  let taskTextTitle = document.getElementById("taskTitle").value;
  let taskTextDesc = document.getElementById("taskDesc").value;

  let data1 = JSON.parse(localStorage.getItem(taskTextTitle));
  let data2 = JSON.parse(localStorage.getItem(taskTextDesc));

  if ((data1, data2)) {
    if ((item1, item2)) {
      if (data1.indexOf(item1) != -1 && data2.indexOf(item2) != -1) {
        return data1[item1], data2[item2];
      } else {
        return false;
      }
    }
    return data1, data2;
  }
  return false;
};

//
let listTodo = () => {
  let html1 = "";
  let html2 = "";

  let data = getData(); // handler for getting item from local storage
  if (data) {
    html1 += data.forEach((value, _) => {
      // createCard();
      //new title
      titleText = document.createTextNode(value); // pushing value to card title
      newcardTitle.appendChild(titleText); // pushing value to card title
      newcardBody.appendChild(newcardTitle); // pushing value to card body
    });
    html2 += data.forEach((_, item) => {
      // createCard();
      DescText = document.createTextNode(item);
      newcardDesc.appendChild(DescText); // pushing value to card desc
      newcardBody.appendChild(newcardDesc); // pushing value to card body
    });
  }
  document.getElementById("taskTitle").innerHTML = html1;
  document.getElementById("taskDesc").innerHTML = html2;
};
listTodo();
