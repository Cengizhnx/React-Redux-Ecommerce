import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import toast from 'react-hot-toast';
import { store } from "./redux/store";
import { login, logout } from "./redux/users/userSlice";

const firebaseConfig = {
    apiKey: "AIzaSyCfktoXf8Vi5HwcX5g2NPvepSpyI4ZWD7c",
    authDomain: "e-commerce-8063e.firebaseapp.com",
    projectId: "e-commerce-8063e",
    storageBucket: "e-commerce-8063e.appspot.com",
    messagingSenderId: "1005372261880",
    appId: "1:1005372261880:web:9f4f56e48d986fac08820d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export const userRegister = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user);
        return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const userLogin = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        console.log(user);
        return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const userLogout = async () => {
    try {
        await signOut(auth)
        return auth
    } catch (error) {
        toast.error(error.message);
    }
}

onAuthStateChanged(auth, (user) => {

    if (user) {
        store.dispatch(login(user))
    } else {
        store.dispatch(logout())
    }
});

export const userVerified = async () => {
    try {
        await sendEmailVerification(auth.currentUser)
        toast.success(`Verification e-mail sent to ${auth.currentUser.email}, please check your mailbox.`)
    } catch (error) {
        toast.error(error.message)
    }
}