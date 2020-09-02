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
const message3 = document.querySelector('#message-3')
const message4 =  document.querySelector('#message-4')
const message5 = document.querySelector('#message-5')
const message6 =  document.querySelector('#message-6')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = ''
    message2.textContent = ''
    message3.textContent = ''
    message4.textContent = ''
    message5.textContent = ''
    message6.textContent = ''
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
                message2.textContent = 'Country: ' + data.country
                message3.textContent = 'Latitude: ' + data.latitude
                message4.textContent = 'Longitude: ' + data.longitude
                message5.textContent = 'Temp in C: ' + data.tempinC
                message6.textContent = 'Temp in F: ' + data.tempinF
            }
        })
    })
})