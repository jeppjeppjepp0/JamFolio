const signupFormHandler = async (event) => {
    event.preventDefault();
    const first_name = document.querySelector('#first-name').value.trim();
    const last_name = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const description = document.querySelector('#description').value.trim();

  
    if (first_name && last_name && email && password && description) {
      const response = await fetch('/api/musician/signup', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, email, password, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  
 
  