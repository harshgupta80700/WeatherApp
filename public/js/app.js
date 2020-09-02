console.log('Client Side JavaScript is loaded into the Page!')

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 =  document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = ''
    message2.textContent = ''
    const location = search.value
    message1.textContent = 'Loading...'
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log('Invalid address location')
                console.log(data.error)
                message1.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.tempinC)
                message1.textContent = 'Location: ' + data.location
                message2.textContent = 'Temp in C: ' + data.tempinC
            }
        })
    })
})