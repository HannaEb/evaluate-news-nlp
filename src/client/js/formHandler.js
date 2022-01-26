const handleSubmit = event => {
  event.preventDefault()

  let formText = document.getElementById('text').value;
  const data = {
      'txt': formText
  }

  if (Client.checkForText(formText)) {
      postData(data)
  }
}

const postData = async (data) => {
    const res = await fetch('http://localhost:8081/postData', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
        const newData = await res.json();
        document.getElementById('agreement').innerHTML = `${newData.agreement}`
        document.getElementById('subjectivity').innerHTML = `${newData.subjectivity}`
        document.getElementById('confidence').innerHTML = `${newData.confidence}`
        document.getElementById('irony').innerHTML = `${newData.irony}`
        return newData
    } catch(error) {
        console.log('error', error)
    }
}

export { handleSubmit, postData }
