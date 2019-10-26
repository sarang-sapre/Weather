
var inputLocation = document.querySelector('form')
var search = document.querySelector('input')
var message1 = document.querySelector('#msg-1')
var message2 = document.querySelector('#msg-2')
var message3 = document.querySelector('#msg-3')
var message4 = document.querySelector('#msg-4')

inputLocation.addEventListener('submit',(e) =>{
    e.preventDefault()

    var location = search.value
    message1.textContent = 'Loading........'
    message2.textContent = ''
    message3.textContent = ''
    message4.textContent = ''
    fetch('/weather?address=' + location).then((response)=>{

    response.json().then((data) => {
    if(!data.error){
        message1.textContent=data.location
        message2.textContent=data.summary
        message3.textContent =data.temperature
        message4.textContent =data.pressure
    }else{
        message1.textContent=data.error
    }
})
})

    
})