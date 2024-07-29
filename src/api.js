const API_BASE_URL = 'https://apitest.reachstar.io';

const handleResponse = async (response) => {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error: ${text}`);
    }
    return response.json();
};

export const fetchPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/blog/list`);
    return handleResponse(response);
};

export const deletePost = async (id) => {
    const response = await fetch(`${API_BASE_URL}/blog/delete/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
};

export const addPost = async (post) => {
    const response = await fetch(`${API_BASE_URL}/blog/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
    return handleResponse(response);
};

export const editPost = async (id, post) => {
    const response = await fetch(`${API_BASE_URL}/blog/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
    return handleResponse(response);
};

export const fetchPost = async (id) => {
    const response = await fetch(`${API_BASE_URL}/blog/get/${id}`);
    return handleResponse(response);
};


export const addComment = async (postId, comment) => {
    const response = await fetch(`${API_BASE_URL}/comment/add/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });
    return handleResponse(response);
};

export const deleteComment = async (commentId) => {
    const response = await fetch(`${API_BASE_URL}/comment/delete/${commentId}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
};


export const signUp = async (user) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return handleResponse(response);
};

export const signIn = async (user) => {
    const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return handleResponse(response);
};
