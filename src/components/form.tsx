"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface FormProps {
  onSuccessChange?: (success: boolean) => void;
}

export default function WaitlistForm({ onSuccessChange }: FormProps) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate both email and name
    if (!formData.email || !isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.name || formData.name.trim().length === 0) {
      toast.error("Please enter your name");
      return;
    }

    try {
      setLoading(true);

      // ========================================
      // TEMPORARY CHANGE: Email notifications disabled - only adding to database
      // ========================================
      // 
      // TO REVERT TO ORIGINAL SETUP (re-enable email notifications):
      // 1. DELETE the "ENABLED: Direct database insertion" section below (lines with fetch("/api/notion"))
      // 2. UNCOMMENT the "DISABLED: Email notification API call" section above
      // 3. The original flow will be restored: email API → Notion API
      // ========================================
      
      const promise = new Promise((resolve, reject) => {
        const { name, email } = formData;

        // DISABLED: Email notification API call (uncomment this entire block to restore)
        // fetch("/api/mail", {
        //   cache: "no-store",
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ firstname: name, email }),
        // })
        //   .then((mailResponse) => {
        //     if (!mailResponse.ok) {
        //       if (mailResponse.status === 429) {
        //         reject("Rate limited");
        //       } else {
        //         reject("Email sending failed");
        //       }
        //       return null;
        //     }

        //     return fetch("/api/notion", {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({ name, email }),
        //     });
        //   })
        //   .then((notionResponse) => {
        //     if (!notionResponse) return;

        //     if (!notionResponse.ok) {
        //       if (notionResponse.status === 429) {
        //         reject("Rate limited");
        //       } else {
        //         reject("Notion insertion failed");
        //       }
        //     } else {
        //       resolve({ name });
        //     }
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   });

        // ========================================
        // DELETE THIS ENTIRE SECTION WHEN REVERTING TO ORIGINAL SETUP
        // ========================================
        // ENABLED: Direct database insertion only (no email notification)
        fetch("/api/notion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        })
          .then((notionResponse) => {
            if (!notionResponse.ok) {
              if (notionResponse.status === 429) {
                reject("Rate limited");
              } else {
                reject("Notion insertion failed");
              }
            } else {
              resolve({ name });
            }
          })
          .catch((error) => {
            reject(error);
          });
        // ========================================
        // END OF SECTION TO DELETE WHEN REVERTING
        // ========================================
      });

      toast.promise(promise, {
        loading: "Getting you on the waitlist... 🚀",
        success: (data) => {
          setFormData({ email: "", name: "" });
          setSuccess(true);
          onSuccessChange?.(true);
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: [
                "#ff0000",
                "#00ff00",
                "#0000ff",
                "#ffff00",
                "#ff00ff",
                "#00ffff",
              ],
            });
          }, 100);
          return "Thank you for joining the waitlist 🎉";
        },
        error: (error) => {
          if (error === "Rate limited") {
            return "You're doing that too much. Please try again later";
          }
          if (error === "Email sending failed") {
            return "Failed to send email. Please try again 😢.";
          }
          if (error === "Notion insertion failed") {
            return "Failed to save your details. Please try again 😢.";
          }
          return "An error occurred. Please try again 😢.";
        },
      });

      promise.finally(() => {
        setLoading(false);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({ email: "", name: "" });
    setSuccess(false);
    onSuccessChange?.(false);
  };

  return (
    <div className="w-full relative px-4 sm:px-0">
      {success ? (
        <motion.div
          className="p-6 flex justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={resetForm}
            className="bg-[#e5ff00] text-black px-6 py-2 rounded-[12] font-semibold hover:bg-opacity-90 transition-all"
            type="button"
          >
            Join with another email
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-background border border-border text-foreground px-4 sm:px-4 py-3 rounded-[12] focus:outline-1 transition-all duration-300 focus:outline-offset-4 focus:outline-[#e5ff00]"
                disabled={loading}
                required
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-background border border-border text-foreground px-4 sm:px-4 py-3 rounded-[12] focus:outline-1 transition-all duration-300 focus:outline-offset-4 focus:outline-[#e5ff00]"
                disabled={loading}
                required
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="w-full font-semibold bg-[#e5ff00] text-black px-5 py-3 rounded-[12] hover:bg-opacity-90 transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <title>Loading spinner</title>
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  <span>Join waitlist</span>
                )}
              </button>
            </div>
          </motion.div>
        </form>
      )}
    </div>
  );
}
