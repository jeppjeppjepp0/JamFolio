const uploadedFile = async (event) => {
    event.preventDefault();

const fileOne = document.querySelector('#formFile1').value.trim();
const fileTwo = document.querySelector('#formFile2').value.trim();
const fileThree = document.querySelector('#formFile3').value.trim();

if (fileOne) {
    const uploadedFileOne = await fetch('/api/media/upload', {
        method: 'POST',
        body: JSON.stringify({})
    })
}
}