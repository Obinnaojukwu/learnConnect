import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://learnconnect-backend.onrender.com";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to fetch levels
const fetchLevels = async () => {
    try {
        const response = await api.get('/levels');
        return response.data;
    } catch (error) {
        console.error('Error fetching levels:', error);
        throw error;
    }
};

// Function to get user profile using a token
const getUserProfile = async (token) => {
    try {
        const response = await api.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Function to update user profile using a token
const updateUserProfile = async (token, profileData) => {
    const formData = new FormData();
    formData.append("bio", profileData.bio);
    if (profileData.profileImage) {
        formData.append("profileImage", profileData.profileImage);
    }

    console.log("Updating user profile:", profileData); // Debug log

    try {
        const response = await api.put('/user/profile', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("Profile updated:", response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

// Function to register a new user
const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Function to login a user
const login = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

// Function to fetch audios by course ID
const fetchAudiosByCourseId = async (courseId) => {
    try {
        console.log('Fetching audios for course ID:', courseId);
        const response = await api.get(`/audios/${courseId}`);
        
        if (response.data && response.data.length === 0) {
            console.warn('No audios found for the given course ID.');
            return [];
        }
        
        return response.data;
    } catch (error) {
        console.error('Error details:', error.response || error.message);
        console.error('Error fetching audios:', error);
        throw new Error('Error fetching audios');
    }
};

// Function to fetch downloaded audios
const fetchDownloads = async (token) => {
    try {
        const response = await api.get('/purchase/purchased-audios', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching downloaded audios:', error);
        throw error;
    }
};

// Function to upload audio
const uploadAudio = async (level, faculty, course, audioFile) => {
    const formData = new FormData();
    formData.append('level', level);
    formData.append('faculty', faculty);
    formData.append('course', course);
    formData.append('audio', audioFile);

    try {
        const response = await api.post('/audios/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error uploading audio');
    }
};

// Function to send reset code for password reset
const sendResetCode = async (email) => {
    try {
        const response = await api.post('/auth/send-reset-code', { email });
        return response.data;
    } catch (error) {
        console.error('Error sending reset code:', error);
        throw error;
    }
};

// Function to reset password
const resetPassword = async (email, resetCode, newPassword) => {
    try {
        const response = await api.post('/auth/reset-password', { email, resetCode, newPassword });
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};

// Function to get ChatGPT response for an educational question
const getChatGPTResponse = async (question) => {
    try {
        console.log('Sending question to ChatGPT:', question);
        const response = await api.post('/chat', { question });
        console.log('ChatGPT response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting ChatGPT response:', error);
        console.error('Error response data:', error.response ? error.response.data : null);
        throw error;
    }
};

// Export all functions
export {
    fetchLevels,
    getUserProfile,
    updateUserProfile,
    register,
    login,
    fetchAudiosByCourseId,
    fetchDownloads,
    uploadAudio,
    sendResetCode,
    resetPassword,
    getChatGPTResponse // Exporting the new function
};

export default api;