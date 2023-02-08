





async function userMessage(event) {
  try {
    event.preventDefault();
    const token = localStorage.getItem('token')
    const decodedToken = parseJwt(token);

    const msg = event.target.message.value;
    const username = decodedToken.name;

    const obj = {
      msg,
      username
    }
  //   localStorage.setItem('message',JSON.stringify(obj));
     


    await axios.post("http://localhost:3000/message/add-message", obj, { headers: { "Authorization": token } })
      .then((response) => {
        console.log(response);

      })

      .catch(err => console.log(err));
  }
  catch (err) {
    console.log(err);
  }
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", () => {

  const token = localStorage.getItem('token')
  const decodedToken = parseJwt(token)
  console.log(decodedToken);
  const isUser = decodedToken.userId;
  console.log(isUser)
 
  axios.get("http://localhost:3000/message/getuser")
    .then(res=>{
      console.log(res);
      showChatBar(res.data.users);
  
    }) 
  // showMessageScreen()
  const Message=localStorage.getItem('message');//read the message from LS
 
// push the value in  an array
   let msgArray=[];
   msgArray.push(JSON.parse(Message))
  
  console.log(msgArray[0].length);
  const lastmsg= msgArray[0][(msgArray[0].length-1)]
  console.log(lastmsg) //lastmessage stored in ls
 

axios.get("http://localhost:3000/message/get-message", { headers: { "Authorization": token } })
  .then(response => {
    console.log(response);
    const messageData = response.data.msg;

    localStorage.setItem('message',JSON.stringify(messageData))

//if there is nothing in localstorage,then below condition works

    if(lastmsg == undefined){
     lastmsg = -1;
    }
    showMessageScreen(msgArray[0])

 //showMessageOnScreen(messageData);

  }).catch(err => {
    console.log(err);
  })

 


})

function showChatBar(userdata){
  const userbar=document.getElementById('userbar'); 
  userbar.innerHTML='';
  userdata.forEach(user=>{
    const userList=`<li class="chatbar">  ${user.name}</li>`;
    userbar.innerHTML +=userList;
  })

}




//no localstorage only when get message api call is done
function showMessageOnScreen(messageData) {
  const token = localStorage.getItem('token')
  const decodedToken = parseJwt(token)
  const userName = decodedToken.name;
  //console.log(userName)
  const parent = document.getElementById('messagePop');
  parent.innerHTML = `${userName} logged in`;


  console.log(messageData)

  messageData.forEach(message => {
    
    childNode =
      `<ul style="list-style-type:none">
    <li> ${message.username}:<p style="border:1px solid purple;border-radius:5px;background:white;height:35px;width:305px;color:#9400D3;padding:10px; ">${message.msg}</p></li>
     </ul>`;
    parent.innerHTML = parent.innerHTML + childNode;
  })

}
function showMessageScreen(msgdata){
  const token = localStorage.getItem('token')
  const decodedToken = parseJwt(token)
  const userName = decodedToken.name;
  console.log(userName)
  const parent = document.getElementById('messagePop');
  parent.innerHTML = `${userName} logged in`;


  msgdata.forEach(msg=>{
   
    childNode =
    `<ul style="list-style-type:none">
  <li> ${msg.username}:<p style="border:1px solid purple;border-radius:5px;background:white;height:35px;width:305px;color:#9400D3;padding:10px; ">${msg.msg}</p></li>
   </ul>`;
  parent.innerHTML = parent.innerHTML + childNode;
  })
  
  
  
}