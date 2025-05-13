async function logout(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/login/logout', {
        method: 'POST',
        credentials: 'include', // ⬅️ important: allows cookies to be sent and received
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const lastRes = await res.json();

    if (lastRes) {
        localStorage.removeItem('user_details');
        window.location.href = 'index.html';

    }
    else {
        console.error("Logout failed:", lastRes.message);
    }
};

module.exports={
    logout
}
