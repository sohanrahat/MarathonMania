import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const observer = onAuthStateChanged;
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create axios 
    const axiosSecure = axios.create({
        baseURL: 'https://marathon-mania-server.vercel.app'
    });

    // Create user 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in with email and password 
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                // token after login
                getJWTToken(loggedUser.email);
                return result;
            });
    };

    // Update user
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    // Sign in with Google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedUser = result.user;
                // Get JWT token after successful Google login
                getJWTToken(loggedUser.email);
                return result;
            });
    };

    // Get token
    const getJWTToken = async (email) => {
        try {
            const response = await axios.post('https://marathon-mania-server.vercel.app/jwt', { email });
            const token = response.data.token;
            localStorage.setItem('access-token', token);
            return token;
        } catch (error) {
            // console.error('Error getting JWT token:', error);
            return null;
        }
    };

    // Logout
    const logOut = () => {
        localStorage.removeItem('access-token');
        return signOut(auth);
    };

    // Set authorization header 
    useEffect(() => {
        //Add token to requests
        axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && error.response.status === 401 && user) {
                    // Token expired, get a new one
                    await getJWTToken(user.email);
                    // Retry the original request
                    const originalRequest = error.config;
                    originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`;
                    return axiosSecure(originalRequest);
                }
                return Promise.reject(error);
            }
        );
    }, [axiosSecure, user]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            // Check if we need a new token
            if (currentUser) {
                const token = localStorage.getItem('access-token');
                if (!token) {
                    getJWTToken(currentUser.email);
                }
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        auth,
        createUser,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logOut,
        axiosSecure
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;