// window.addEventListener("scroll", function () {
//     var navbar = document.querySelector(".navbar");
//     navbar.classList.toggle("sticky", window.scrollY > 0);
//   });

// login
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
// في ايروو مش عارف ليه؟؟؟؟؟؟؟؟؟؟؟؟؟
// form.addEventListener("submit", (e) => {
//   if (!validateInputs()) {
//     e.preventDefault();
//   }
// });

function validateInputs() {
  const emailVal = email.value.trim();
  const passwordVal = password.value.trim();
  let success = true;

  if (emailVal === "") {
    success = false;
    setError(email, "* Email is required");
  } else if (!validateEmail(emailVal)) {
    success = false;
    setError(email, "* Please enter a valid email");
  } else {
    setSuccess(email);
  }

  if (passwordVal === "") {
    success = false;
    setError(password, "* Password is required");
  } else if (passwordVal.length < 8) {
    success = false;
    setError(password, "* Password must be atleast 8 characters long");
  } else {
    setSuccess(password);
  }

  return success;
}
//element - password, msg- pwd is reqd
function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}

function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
// sssssssssssss
document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message");
  const sendButton = document.getElementById("send-btn");

  sendButton.addEventListener("click", function () {
    sendMessage();
  });

  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      appendMessage("You: " + messageText);
      // You can replace this with logic to send message to the other person
      receiveMessage("Friend: Hello! How are you?");
      messageInput.value = "";
    }
  }

  function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function receiveMessage(message) {
    setTimeout(function () {
      appendMessage(message);
    }, 500);
  }
});
// qustionnaire
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSapnContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");

//set object
let currentIndex = 0;
let rightAnswers = 0;
//Ajex

function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;
      // //create bullets + set questions count
      // createBullets(qCount);

      //Add questios Data
      addQuestionData(questionsObject[currentIndex], qCount);

      //click on submit
      submitButton.onclick = () => {
        //get right answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        //increase index
        currentIndex++;

        //check the answer
        checkAnswer(theRightAnswer, qCount);

        //empty previous question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        //Add questios Data
        addQuestionData(questionsObject[currentIndex], qCount);

        //handle bullets classes
        handleBullets();

        //show results
        showResults(qCount);
      };
    }
  };
  // url ==> ده هتاخده كوبي من اللينك اللي حاطط في الاسئله علشان متتلخبطش
  myRequest.open("GET", "Html_Question.json", true);
  myRequest.send();
}
getQuestions();

// //countSpan CREATEBULLETS
// function createBullets(num) {
//   countSpan.innerHTML = num;
//   //create sapns

//   for (let i = 0; i < num; i++) {
//     //create Bullets
//     let theBullet = document.createElement("span");
//     //check if the first span
//     if (i === 0) {
//       theBullet.className = "on";
//     }
//     //Append Bullets to main Bullet container
//     bulletsSapnContainer.appendChild(theBullet);
//   }
// }

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    //create h2 questions title
    let questionTitle = document.createElement("h2");

    //create question text
    let questionText = document.createTextNode(obj["title"]);

    //append text to h2
    questionTitle.appendChild(questionText);

    //append h2 to quizArea
    quizArea.appendChild(questionTitle);

    //create the answers
    for (let i = 1; i <= 2; i++) {
      //create main answer div
      let mainDiv = document.createElement("div");

      //add class to main div
      mainDiv.className = "answer";

      //create radio input
      let radioInput = document.createElement("input");

      //add type + Name + id + data attrbiute

      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      //create lable
      let theLabel = document.createElement("label");

      //add for attribute
      theLabel.htmlFor = `answer_${i}`;

      //create label text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      //add the text to label
      theLabel.appendChild(theLabelText);
      // add input + label to main div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      //append all div to answer area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulltesSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulltesSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > (count / 2 && rightAnswers < count)) {
      theResults = `<span class="good">The deppression is high</span> , ${rightAnswers} from ${count} `;
    } else if (rightAnswers === count) {
      theResults = `<span class="Prefect">The deppression is meduim</span>  `;
    } else if (rightAnswers != count) {
      theResults = `<span class="bad">You must answer the question</span> , ${rightAnswers} from ${count} `;
    } else {
      theResults = `<span class="bad">You Are Good</span> , ${rightAnswers} from ${count} `;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
}

// qustionnaire end
