"use client";

import { useState, useEffect } from "react";
import { User, Mail, Info, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("Sending...");
    setIsVisible(true);

    const now = new Date();
    const formattedTime = now
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");

    const dataToSend = {
      ...formData,
      timestamp: formattedTime,
    };

    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      });

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          timestamp: formattedTime,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => {
        setSuccessMessage(
          "Thank you for contacting us! We’ll reach out to you shortly!"
        );
        setIsVisible(true);

        setTimeout(() => {
          setIsVisible(false);
        }, 4000);
      }, 300);
    } catch (error) {
      setSuccessMessage("Failed to submit the form.");
      setIsVisible(true);
      console.error(error);

      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    }
  };

  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
  {
    id: "name",
    label: "Your Name",
    type: "text",
    Icon: User,
    required: true, // make only name required
  },
  {
    id: "email",
    label: "Your Email",
    type: "email",
    Icon: Mail,
    required: false, // email is optional
  },
].map(({ id, label, type, Icon, required }) => (
  <div key={id} className="space-y-2">
    <label
      htmlFor={id}
      className="text-sm font-medium text-slate-700 block"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={formData[id as keyof typeof formData]}
        onChange={handleChange}
        required={required} 
        className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
      />
      <Icon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
    </div>
  </div>
))}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-slate-700 block"
          >
            Your Phone Number
          </label>
          <div className="relative">
            <input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            />
            <Info className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-slate-700 block"
          >
            Your Query
          </label>
          <div className="relative">
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={1}
              style={{
                height: "150px",
                resize: "none",
                overflowY: "auto",
              }}
              className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            ></textarea>
            <MessageCircle className="absolute right-4 top-6 text-slate-400 h-4 w-4" />
          </div>
        </div>

        <div className="text-center pt-2">
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-8 py-4 text-base shadow-md"
          >
            Send Message
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>

      <div
        className={`transition-opacity duration-1000 ease-in-out mt-6 text-center text-teal-600 font-medium ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {successMessage}
      </div>

      <style jsx>{`
        textarea::-webkit-scrollbar {
          width: 0px;
        }

        textarea {
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
