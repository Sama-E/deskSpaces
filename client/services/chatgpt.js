import bot from "/src/assets/images/bog.svg";
import user from "/src/assets/images/user.svg";

const chatForm = document.querySelector('#chatForm');
const chatContainer = document.querySelector('#chatContainer');

let loading;

//Loading - 300 miliseconds
function loader(element){
  element.textContent = '';

  loading = setInterval(() => {
    element.textContent += '.';

    if(element.textContent === '...') {
      element.textContent = '';
    }
  }, 300)
}