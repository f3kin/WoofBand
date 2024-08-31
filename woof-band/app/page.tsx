"use client";

import { useState } from 'react';
import styles from '../styles/signup.module.css';
import { useRouter } from 'next/navigation';

// Define form data interfaces (ensures type safety)
interface SignupFormData {
  userName: string;
  userEmail: string;
  userPhone: string;
  dogName: string;
  dogBreed: string;
}

// Create the signup form component, using the above interface to give all the states types
const Signup: React.FC = () => {
    const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    userName: '',
    userEmail: '',
    userPhone: '',
    dogName: '',
    dogBreed: ''
  });

  // Type-safe handler -> updates the form state as the user adds input to the fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Type-safe handler -> updates the form as the user submits, sends data to /api/register endpoint, and logs response
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form submission
    // Send the form data to the backend
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data.message);

    router.push('/dog-info')
  };

  // Render the UI in JSX (JavaScript XML) that translates into HTML elements
  return (
    <div className={styles.pageWrapper}>
        <div className={styles.container}>
        <h1 className={styles.header}>Woof Band Sign Up</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
            <label>What's your name:</label>
            <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
            />
            </div>
            <div className={styles.formGroup}>
            <label>Email:</label>
            <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                required
            />
            </div>
            <div className={styles.formGroup}>
            <label>Phone:</label>
            <input
                type="text"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleChange}
                required
            />
            </div>
            <div className={styles.formGroup}>
            <label>Dog's Name:</label>
            <input
                type="text"
                name="dogName"
                value={formData.dogName}
                onChange={handleChange}
                required
            />
            </div>
            <div className={styles.formGroup}>
            <label>Dog's Breed:</label>
            <input
                type="text"
                name="dogBreed"
                value={formData.dogBreed}
                onChange={handleChange}
                required
            />
            </div>
            <button type="submit" className={styles.submitButton}>
            Sign Up
            </button>
        </form>
        </div>
    </div>
    );
};

export default Signup;
