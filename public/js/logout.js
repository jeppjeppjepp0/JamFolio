const logout = async () => {
  const response = await fetch('/api/musician/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    sessionStorage.clear();
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout-link').addEventListener('click', logout);
