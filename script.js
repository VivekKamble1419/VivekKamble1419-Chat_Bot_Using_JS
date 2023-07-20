//all code is based on open ai

const chatInput= document.querySelector(".chat-input textarea");
const sendChatBtn= document.querySelector(".chat-input span");
const chatbox= document.querySelector(".chatbox");
const chatbotToggler= document.querySelector(".chatbot-toggler");
const chatbotcloseBtn= document.querySelector(".close-btn");




let userMessage;
const API_KEY ="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";
const inputInHeight= chatInput.scrollHeight;
    //reflacts user message to outgoing box
const createChatLi = (message, className) => {
    const chatli = document.createElement("li");
    chatli.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">Smart_toy</span><p></p>`;
    chatli.innerHTML = chatContent;
    chatli.querySelector("p").textContent=message;
    return chatli;
  }

  const genrateResponce =(incomingChatli) =>{
    const API_URL ="https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatli.querySelector("p");

    const requestOptions ={
        method:"POST",
        headers:{
            "content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: userMessage}]          
        })
    }
    // send post request to api
    fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
        messageElement.textContent =data.choices[0].message.content;
    }).catch((error)=>{
        messageElement.classList.add("error");
        messageElement.textContent ="Opps! Somthing gets wrong Ravan. Please try again..";
     
        console.log(error);
    }).finally(()=> chatbox.scrollTo(0, chatbox.scrollHeight));
  }
  


const handlechat=()=>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value ="";
    chatInput.style.height=`${inputInHeight}px`


    //reflacts user message to chat box
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    // console.log(userMessage);

    setTimeout(()=>{
        const incomingChatli=createChatLi("Ravan is Thinking...","incoming")
    chatbox.appendChild(incomingChatli);
    chatbox.scrollTo(0,chatbox.scrollHeight);

    genrateResponce(incomingChatli);
        
    },600);
}

chatInput.addEventListener("input", ()=>{
    chatInput.style.height=`${inputInHeight}px`
    chatInput.style.height=`${chatInput.scrollHeight}px`
});

chatInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" && ! e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handlechat();
    }
});
sendChatBtn.addEventListener("click",handlechat);
chatbotToggler.addEventListener("click",()=>document.body.classList.toggle("show-chatbot"));
chatbotcloseBtn.addEventListener("click",()=>document.body.classList.remove("show-chatbot"));

