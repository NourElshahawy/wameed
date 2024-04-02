// window.addEventListener("scroll", function () {
//     var navbar = document.querySelector(".navbar");
//     navbar.classList.toggle("sticky", window.scrollY > 0);
//   });

// login
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", (e) => {
    if (!validateInputs()) {
      e.preventDefault();
    }
  });

  
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
  }    
  // sssssssssssss
  document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send-btn");

    sendButton.addEventListener("click", function() {
        sendMessage();
    });

    messageInput.addEventListener("keypress", function(e) {
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
        setTimeout(function() {
            appendMessage(message);
        }, 500);
    }
});
 
