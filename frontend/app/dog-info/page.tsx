"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import styles from '../../styles/signup.module.css'; // Updated path to reflect subdirectory
import { useRouter } from 'next/navigation';

// Define form data interface for dog information
interface DogInfoFormData {
  dogAge: string;
  dogWeight: string;
  dogDescription: string;
  dogSize: string;
  dogActivityLevel: string;
  dogLocation: string;
}

// Create the dog info form component
const DogInfo: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<DogInfoFormData>({
        dogAge: '',
        dogWeight: '',
        dogDescription: '',
        dogSize: '',
        dogActivityLevel: '',
        dogLocation: ''
    });

    // Handler to update form state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handler to submit form data
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        // Send the form data to the backend
        const res = await fetch('/api/dog-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data.message);

        router.push('/next-page'); // Replace with the next page after dog info
    };

    // Render the UI similar to the login page format
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <h1 className={styles.header}>Tell Us More About Your Dog</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Dog's Age (in years):</label>
                        <input
                            type="number"
                            name="dogAge"
                            value={formData.dogAge}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Dog's Weight (in kg):</label>
                        <input
                            type="number"
                            name="dogWeight"
                            value={formData.dogWeight}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Dog's Description:</label>
                        <textarea
                            name="dogDescription"
                            value={formData.dogDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Dog's Size (small, medium, large):</label>
                        <input
                            type="text"
                            name="dogSize"
                            value={formData.dogSize}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Dog's Daily Activity:</label>
                        <input
                            type="text"
                            name="dogActivityLevel"
                            value={formData.dogActivityLevel}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Dog's Location (City, Suburban, Rural):</label>
                        <input
                            type="text"
                            name="dogLocation"
                            value={formData.dogLocation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DogInfo;
