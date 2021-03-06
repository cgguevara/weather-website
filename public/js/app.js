
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

//messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value

    if(location.length > 0){

        messageOne.textContent = 'loading...'
        messageTwo.textContent = ''

        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                }else{
                    messageOne.textContent = 'Pronostico del tiempo para: ' + data.location
                    messageTwo.textContent = data.forecastData
                }
            })
        })
    }else{
        console.log('You should provide a location')
    }
    
})
