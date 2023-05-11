const newFormHandler = async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector('').valu
  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/projects/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };

// document
//   .querySelector('.new-project-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);

const addSongFormHandler = async (event) => {
  event.preventDefault();

  const song_name = document.querySelector('#song-name').value.trim();
  const genre = document.querySelector('#genre').value.trim();
  const song_description = document.querySelector('#song-description').value.trim();
  const original_author = document.querySelector('#original-author').value.trim();
  const song_file = document.querySelector('#song-file').files[0];

  if (song_name && genre && song_description && original_author && song_file) {
    const formData = new FormData();
    formData.append('name', song_name);
    formData.append('genre', genre);
    formData.append('description', song_description);
    formData.append('original_author', original_author);
    formData.append('song_file', song_file);

    const response = await fetch('/api/song/add-song', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#add-song-form')
  .addEventListener('submit', addSongFormHandler);