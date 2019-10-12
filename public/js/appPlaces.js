const weatherForm = document.querySelector('form')

const messageOne = document.querySelector("#message-1")



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'This is a test'
})