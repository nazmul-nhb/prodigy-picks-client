import {
	useState,
	createContext,
	useEffect,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { auth } from "../firebase/firebase.config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	updateProfile,
	UserCredential,
	User,
} from "firebase/auth";

export interface AuthContextType {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	createUser: ({ email, password }: Credentials) => Promise<UserCredential>;
	updateUserProfile: (name: string, photo: string) => Promise<void>;
	loginWithEmail: ({
		email,
		password,
	}: Credentials) => Promise<UserCredential>;
	googleLogin: () => Promise<UserCredential>;
	facebookLogin: () => Promise<UserCredential>;
	logOut: () => Promise<void>;
	userLoading: boolean;
	setUserLoading: Dispatch<SetStateAction<boolean>>;
}

interface AuthProviderProps {
	children: ReactNode;
}

export interface Credentials {
	email: string;
	password: string;
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [userLoading, setUserLoading] = useState<boolean>(true);
	const axiosPublic = useAxiosPublic();

	// Register with Email & Password
	const createUser = ({ email, password }: Credentials) => {
		setUserLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// update user profile
	const updateUserProfile = (name: string, photo: string) => {
		const currentUser = auth.currentUser;

		if (currentUser) {
			return updateProfile(currentUser, {
				displayName: name,
				photoURL: photo,
			});
		} else {
			return Promise.resolve();
		}
	};

	// Sign in with Email & Password
	const loginWithEmail = ({ email, password }: Credentials) => {
		setUserLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	// Sign in with Google
	const googleLogin = () => {
		setUserLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	// Sign in with Facebook
	const facebookLogin = () => {
		setUserLoading(true);
		return signInWithPopup(auth, facebookProvider);
	};

	// Sign Out
	const logOut = () => {
		setUserLoading(true);
		return signOut(auth);
	};

	// Observer Function for User States
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(currentUser: User | null) => {
				setUser(currentUser);
				if (currentUser) {
					// get token and store in the localStorage
					const userInfo = { email: currentUser.email };
					axiosPublic
						.post("/auth", userInfo)
						.then((res) => {
							if (res.data?.token) {
								localStorage.setItem(
									"prodigy-token",
									res.data.token
								);
								setUserLoading(false);
							}
						})
						.catch((error) => {
							console.error(error);
							setUserLoading(false);
						})
						.finally(() => setUserLoading(false));
				} else {
					// remove token if the token stored in the localStorage
					localStorage.removeItem("prodigy-token");
					setUserLoading(false);
				}
			}
		);
		return () => {
			unsubscribe();
		};
	}, [axiosPublic]);

	const authInfo = {
		user,
		setUser,
		createUser,
		updateUserProfile,
		loginWithEmail,
		googleLogin,
		facebookLogin,
		logOut,
		userLoading,
		setUserLoading,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
