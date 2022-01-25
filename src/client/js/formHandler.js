function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('text').value;

    const newLink = `http://localhost:8081/add?ff=${formText}`;
    Client.checkForText(formText)

    postData(newLink)
    .then((data) => {
        console.log(data);
    })
}

const postData = async (url= '') => {
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    try {
        const newData = await res.json();
        console.log(newData);
        document.getElementById('agreement').innerHTML = `${newData.agreement}`
        document.getElementById('subjectivity').innerHTML = `${newData.subjectivity}`
        document.getElementById('confidence').innerHTML = `${newData.confidence}`
        document.getElementById('irony').innerHTML = `${newData.irony}`
        return newData
    } catch(error) {
        console.log('error', error)
    }
}

export { handleSubmit }
