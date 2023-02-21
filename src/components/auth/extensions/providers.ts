import { getAnalytics } from 'firebase/analytics';
import { getApp, initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
    getAuth,
} from 'firebase/auth';

export const firebase = () => {

}

export type providersType = 'Google' | 'Facebook' | 'Twitter' | 'Github' | 'Microsoft';

export type IAuth = {
    [key in providersType]: { instance: any, provider: any };
}

//! ;TODO
const firebaseConfig = {
    apiKey: "AIzaSyAmJWBXLOP36D1xlzvmzMAGUaHoCQEm6_k",
    authDomain: "defialert.firebaseapp.com",
    projectId: "defialert",
    storageBucket: "defialert.appspot.com",
    messagingSenderId: "867536086452",
    appId: "1:867536086452:web:6f7e1ca260823dc6c9bee1",
    measurementId: "G-V5L5EFNMTP"
};


function createFirebaseApp(config: any) {
    try {
      return getApp();
    } catch {
      return initializeApp(config);
    }
}

const firebaseApp = createFirebaseApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
export const _googleAuthProvider = new GoogleAuthProvider();
_googleAuthProvider.addScope('email');
export const googleAuthProvider = _googleAuthProvider;
export const facebookAuthProvider = new FacebookAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();
export const twitterAuthProvider = new TwitterAuthProvider();
export const microsoftAuthProvider = new OAuthProvider('microsoft.com');
microsoftAuthProvider.setCustomParameters({
    prompt: "consent",
    tenant: "f993463f-c323-4838-bb31-9efcf04fc3ad"
})

export const authProviders: IAuth = {
    Google: { instance: googleAuthProvider, provider: GoogleAuthProvider },
    Facebook: {
      instance: facebookAuthProvider,
      provider: FacebookAuthProvider,
    },
    Twitter: { instance: twitterAuthProvider, provider: TwitterAuthProvider },
    Github: { instance: githubAuthProvider, provider: GithubAuthProvider },
    Microsoft: { instance: microsoftAuthProvider, provider: OAuthProvider },
};