import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, updateProfile } from "firebase/auth";
import toast from 'react-hot-toast';
import { store } from "../src/redux/store";
import { login, logout } from "../src/redux/users/userSlice";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { doc, serverTimestamp, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { setDatas } from "../src/redux/users/dataSlice";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import userImage from "./assets/user.jpg"
import { useCollectionData } from "react-firebase-hooks/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyCfktoXf8Vi5HwcX5g2NPvepSpyI4ZWD7c",
    authDomain: "e-commerce-8063e.firebaseapp.com",
    projectId: "e-commerce-8063e",
    storageBucket: "e-commerce-8063e.appspot.com",
    messagingSenderId: "1005372261880",
    appId: "1:1005372261880:web:9f4f56e48d986fac08820d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);

export const userRegister = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, "users", user.uid), {
            name: "",
            surname: "",
            mail: email,
            phone_number: "",
            country: "",
            addres: "",
            timeStamp: serverTimestamp()
        });
        const imageRef = ref(storage, `images/users/${user.uid}`)
        uploadBytes(imageRef, userImage)
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

onSnapshot(collection(db, "users"), (doc) => {
    store.dispatch(setDatas(doc.docs.reduce((datas, data) => [...datas, data.data()], [])))
})

export const userUpdate = async (values) => {
    try {
        await updateProfile(auth.currentUser, {
            displayName: values.name,
        })
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            name: values.name,
            surname: values.surname,
            mail: values.email,
            phone_number: values.phone_number,
            country: values.country,
            addres: values.address,
            timeStamp: serverTimestamp()
        });
        toast.success("Profile Updated")
    } catch (error) {
        toast.error(error.message)
    }
}

export const getUserPhoto = () => {
    getDownloadURL(ref(storage, `images/users/${auth.currentUser.uid}`))
        .then((url) => {
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
            return url;
        })
        .catch((error) => {
            toast.error(error);
        });
}

export const addProductCart = async (product) => {
    try {
        await addDoc(collection(db, "cart"), {
            uid: auth.currentUser.uid,
            product_id: product.id,
            product_name: product.title,
            product_price: product.price,
            product_category: product.category.name,
            timeStamp: serverTimestamp()
        }
        );
        toast.success("Product Add")

    } catch (error) {
        toast.error(error)
    }
}


export const deleteProductCart = async (id) => {
    try {
        await deleteDoc(doc(db, "cart", id));
        toast.success("Product Deleted")
    } catch (error) {
        console.log(error);
    }
}

const productConverter = {
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)

        return {
            id: snapshot.id,
            ...data
        }

    }
}

export const GetCarts = () => {
    const [cart] = useCollectionData(collection(db, "cart").withConverter(productConverter))
    return cart
}


// export let list = []

// export const getProductCart = async () => {
//     try {
//         const q = query(collection(db, "cart"), where("id", "==", auth.currentUser.uid));

//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             list.push(doc.data());
//         });

//     } catch (error) {
//         toast.error(error)
//     }
// }

