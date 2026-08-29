"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createBookingRequest } from "@/app/lib/api";
import styles from "./BookingForm.module.css";
interface BookingFormProps {
  camperId: string;
}
interface FormErrors {
  name?: string;
  email?: string;
}
export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = () => {
    const newErrors: FormErrors = {};
    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter your email.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await createBookingRequest(camperId, {
        name: name.trim(),
        email: email.trim(),
      });
      toast.success(response.message);
      setName("");
      setEmail("");
      setErrors({});
    } catch (error) {
      console.error("Booking request failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className={styles.bookingCard}>
      <Toaster position="top-right" />
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.inputWrapper}>
          <div
            className={`${styles.fieldContainer} ${errors.name ? styles.fieldError : ""}`}
          >
            {errors.name && <span className={styles.floatingLabel}>Name*</span>}
            <input
              type="text"
              placeholder={errors.name ? "" : "Name*"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              className={styles.input}
            />
            {errors.name && (
              <span className={styles.errorIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="#E44848"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 6V11"
                    stroke="#E44848"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="14" r="1" fill="#E44848" />
                </svg>
              </span>
            )}
          </div>
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.inputWrapper}>
          <div
            className={`${styles.fieldContainer} ${errors.email ? styles.fieldError : ""}`}
          >
            {errors.email && (
              <span className={styles.floatingLabel}>Email*</span>
            )}
            <input
              type="email"
              placeholder={errors.email ? "" : "Email*"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              className={styles.input}
            />
            {errors.email && (
              <span className={styles.errorIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="#E44848"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 6V11"
                    stroke="#E44848"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="14" r="1" fill="#E44848" />
                </svg>
              </span>
            )}
          </div>
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.btnSubmit}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
