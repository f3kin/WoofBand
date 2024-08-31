import { NextResponse } from 'next/server';
import { db } from '../../../config/firebaseConfig';
import { collection, addDoc } from "firebase/firestore"

export async function POST(request: Request) {
    const data = await request.json();

    try {
        const docRef = await addDoc(collection(db, "users"), {
            userName: data.userName,
            userEmail: data.userEmail,
            userPhone: data.userPhone,
            dogName: data.dogName,
            dogBreed: data.dogBreed,
        });
    
    console.log("Document written with ID: ", docRef.id);
    return NextResponse.json({ message: 'User registered successfully' });
    } catch (e) {
        console.error("Error adding document: ", e);
        return NextResponse.json({ message: "Error register user" }, { status: 500 });
    }
}