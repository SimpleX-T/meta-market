import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyAaMI2rWlbn9dH2vTeRnljIiTmCDHBUKsY",
	authDomain: "nft-marketplace-280804.firebaseapp.com",
	projectId: "nft-marketplace-280804",
	storageBucket: "nft-marketplace-280804.appspot.com",
	messagingSenderId: "83843590787",
	appId: "1:83843590787:web:6309d0e889f302fb91c9b6",
	measurementId: "G-EYS4STZT8P",
};

const app = initializeApp(firebaseConfig);
export const useFirebaseAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
