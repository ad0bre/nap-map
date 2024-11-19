import { Text, View } from "react-native";
import { firebase } from "./../firebaseConfig";
import { useState, useEffect, SetStateAction } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type User = FirebaseAuthTypes.User;
type UserCredential = FirebaseAuthTypes.UserCredential;

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: User) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential: UserCredential) => {
        setUser(userCredential.user);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  const handleSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential: UserCredential) => {
        setUser(userCredential.user);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Skill issue</Text>
    </View>
  );
}
