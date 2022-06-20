

//client side 
const socket=io('http://localhost:8000');

const form=document.getElementById("send-container");
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".content");
const emoji=document.getElementsByClassName("face");
// const fileSend=document.getElementsByClassName("fileSend ");
// const file=document.getElementsByClassName("file");

var audio=new Audio("../doraemon-notification-tone-kids-cartoon-53795.mp3")

const currentUser=document.getElementsByClassName("header");
const div=document.createElement('h4');
div.innerText="Welcome ";


const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    audio.play();
    const message=messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message); 
    messageInput.value='';
});
// fileSend[0].addEventListener('submit',(e)=>{
//     e.preventDefault();
//     audio.play();
//     const message=file.data;
//     append(`You: ${message}`,'right');
//     socket.emit('send',message); 
//     messageInput.value='';
// });


for(const item of emoji){
    item.addEventListener("click",()=>{
        const emojiMsg=document.createElement('div');
    emojiMsg.innerText=item.innerText;
    emojiMsg.classList.add('emojiImg');
    emojiMsg.classList.add('right');
    messageContainer.append(emojiMsg);
    audio.play();
    
    socket.emit('send',item.innerText); 
    });
}
    

const nameUser=prompt("Enter your name to join");
div.innerText+="\n"+nameUser;
div.style.position="absolute";
div.style.zIndex=100;
div.style.top="2%";
div.style.fontSize="1.2rem";

currentUser[0].appendChild(div);
socket.emit('new-user-joined',nameUser);


socket.on('user-joined',name=>{
append(`${name} joined the chat`,'centre');
});
socket.on('receive',data=>{
    append(`${data.name} : ${data.message} `,'left');
    });
    
   
    
   

    