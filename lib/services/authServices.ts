import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, FacebookAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';

import { User } from '../../contexts/AuthContext';
import firebase from '../firebase';

const authServices = {

    loginWithGoogle: async () => {
        try {

            const provider = new GoogleAuthProvider();
            provider.addScope("profile");
            provider.addScope("email");

            const result = await signInWithPopup(firebase.auth, provider);
            return {
                data: {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                }
            };

        } catch (error: any) {
            return { error: error.message }
        }
    },

    loginWithEmail: async (email: string, password: string) => {

        try {

            const result = await signInWithEmailAndPassword(firebase.auth, email, password);
            if (result.user.email) {
                return {
                    data: {
                        uid: result.user.uid,
                        email: result.user.email,
                        displayName: result.user.displayName,
                    }
                }
            }

            return { error: "Invalid Email or Password" }

        } catch (error: any) {
            return { error: error.message }
        }

    },

    signUp: async (email: string, password: string) => {
        try {

            const result = await createUserWithEmailAndPassword(firebase.auth, email, password);
            return {
                data: {
                    uid: result.user.uid!,
                    email: result.user.email!,
                    displayName: result.user.displayName!,
                }
            };

        } catch (error: any) {
            return { error: error.message }
        }
    },

    loginWithFacebook: async () => {

        const provider = new FacebookAuthProvider();

        try {

            provider.addScope("email");
            provider.addScope("public_profile");

            const redirectAct = await signInWithRedirect(firebase.auth, provider);
            const result = await getRedirectResult(firebase.auth, redirectAct);
            if (!result) return { error: "An error occured while logging in with Facebook." }

            return {
                data: {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                }
            }

        } catch (error: any) {
            return { error: error.message }
        }

    },

    logout: async (setUser: Dispatch<SetStateAction<User | null>>) => {
        try {

            await signOut(firebase.auth);
            setUser(null);

        } catch (error: any) {
            return { error: error.message }
        }
    }

}

export default authServices;