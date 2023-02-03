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

  axios.get("http://localhost:3000/message/get-message", { headers: { "Authorization": token } })
    .then(response => {
      console.log(response);

      const messageData = response.data.msg;

      showMessageOnScreen(messageData);

    }).catch(err => {
      console.log(err);
    })
})
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
    <li> ${message.username}:<p style="border:1px solid purple;border-radius:5px;background:white;height:35px;width:305px;color:#9400D3 ">${message.msg}</p></li>
     </ul>`;
    parent.innerHTML = parent.innerHTML + childNode;
  })

}
