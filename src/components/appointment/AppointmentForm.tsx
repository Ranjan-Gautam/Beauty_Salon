"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  IoCheckmarkCircleOutline,
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import { branches } from "@/data/branch";

interface Service {
  id: string;
  name: string;
  price: number;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const trustPoints = [
  "Free First Consultation",
  "Flexible Rescheduling",
  "Certified Expert Staff",
  "Personalized Care Plans",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  branch: string;
  date: string;
  time: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  branch: "",
  date: "",
  time: "",
  message: "",
};

export default function AppointmentForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [createdAppointmentId, setCreatedAppointmentId] = useState<
    string | null
  >(null);
  const [payingNow, setPayingNow] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      }
    }
    loadServices();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function selectService(service: Service) {
    setForm((prev) => ({ ...prev, service: service.name }));
    setSelectedServicePrice(service.price);
    setErrors((prev) => ({ ...prev, service: "" }));
  }

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.service) newErrors.service = "Please select a service";
    if (!form.branch) newErrors.branch = "Please select a location";
    if (!form.date) newErrors.date = "Please select a date";
    if (!form.time) newErrors.time = "Please select a time";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to submit appointment");
      }

      const data = await res.json();
      setCreatedAppointmentId(data.appointment.id);
      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  }

  async function handlePayNow() {
    if (!createdAppointmentId) return;
    setPayingNow(true);

    try {
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: createdAppointmentId,
          amount: Math.floor(selectedServicePrice / 2),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to initiate payment");
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.paymentUrl;

      Object.entries(data.formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error(error);
      alert("Payment could not be started. Please try again.");
      setPayingNow(false);
    }
  }

  return (
    <section id="appointment-form" className="bg-white py-20">
      <div className="max-w-[1250px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="relative w-full aspect-[4/3.4] rounded-lg overflow-hidden mb-8">
            <Image
              src="/appointment/booking-side.jpg"
              alt="Salon consultation"
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-2xl font-serif text-[#2c1810] mb-4">
            Why Book With Us
          </h3>
          <ul className="space-y-3">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-[#2c1810]/80"
              >
                <IoCheckmarkCircleOutline
                  size={20}
                  className="text-[#c47c5a] shrink-0"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#f9f3f0] rounded-lg p-8 md:p-10 border-t-4 border-[#c47c5a]">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <IoCheckmarkCircleOutline
                  size={32}
                  className="text-green-600"
                />
              </div>

              <h2 className="text-2xl font-serif text-[#2c1810] mb-2">
                Appointment Requested!
              </h2>
              <p className="text-[#2c1810]/70 mb-8 max-w-sm mx-auto">
                Reserve your slot now with a small deposit — the rest is paid at
                the salon after your service.
              </p>

              {selectedServicePrice > 0 && (
                <div className="bg-white rounded-xl p-6 mb-6 max-w-sm mx-auto text-left shadow-sm border border-[#e0cfc8]">
                  <div className="flex justify-between text-sm text-[#2c1810]/70 mb-2">
                    <span>Service Total</span>
                    <span>Rs. {selectedServicePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#2c1810]/70 mb-4">
                    <span>Pay Later at Salon</span>
                    <span>
                      Rs. {Math.ceil(selectedServicePrice / 2).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-[#e0cfc8] pt-4 flex justify-between items-center mb-5">
                    <span className="text-[#2c1810] font-medium">
                      Reserve With
                    </span>
                    <span className="text-2xl font-serif text-[#c47c5a]">
                      Rs.{" "}
                      {Math.floor(selectedServicePrice / 2).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={handlePayNow}
                    disabled={payingNow}
                    className="w-full bg-[#60bb46] text-white py-3.5 rounded-lg font-medium hover:bg-[#4fa338] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {payingNow ? (
                      "Redirecting to eSewa..."
                    ) : (
                      <>Pay Deposit with eSewa</>
                    )}
                  </button>

                  <p className="text-xs text-[#2c1810]/50 mt-3 text-center">
                    Secured by eSewa. Your slot is held once payment is
                    confirmed.
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelectedServicePrice(0);
                  setCreatedAppointmentId(null);
                }}
                className="text-[#c47c5a] font-medium hover:underline text-sm"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <>
              <span className="text-[#c47c5a] font-semibold tracking-wide text-sm uppercase">
                Book Now
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#2c1810] mt-2 mb-8">
                Schedule Your Appointment
              </h2>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-[#2c1810] mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <IoPersonOutline
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
                    />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-white border border-[#e0cfc8] rounded pl-10 pr-4 py-2.5 text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30 focus:border-[#c47c5a]"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2c1810] mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <IoMailOutline
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
                      />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full bg-white border border-[#e0cfc8] rounded pl-10 pr-3 py-2.5 text-sm text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30 focus:border-[#c47c5a]"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2c1810] mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <IoCallOutline
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="98XXXXXXXX"
                        className="w-full bg-white border border-[#e0cfc8] rounded pl-10 pr-3 py-2.5 text-sm text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30 focus:border-[#c47c5a]"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-[#2c1810] mb-2">
                    Select a Service
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => selectService(s)}
                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                          form.service === s.name
                            ? "bg-[#c47c5a] text-white border-[#c47c5a]"
                            : "bg-white text-[#2c1810] border-[#e0cfc8] hover:border-[#c47c5a]"
                        }`}
                      >
                        {s.name} — Rs. {(s.price ?? 0).toLocaleString()}
                      </button>
                    ))}
                  </div>
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-[#2c1810] mb-2">
                    Location
                  </label>
                  <select
                    name="branch"
                    value={form.branch}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#e0cfc8] rounded px-4 py-2.5 text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30 focus:border-[#c47c5a]"
                  >
                    <option value="">Select a location</option>
                    {branches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.branch && (
                    <p className="text-red-500 text-xs mt-1">{errors.branch}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2c1810] mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-white border border-[#e0cfc8] rounded px-3 py-2.5 text-sm text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30 focus:border-[#c47c5a]"
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2c1810] mb-2">
                      Time
                    </label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#e0cfc8] rounded px-3 py-2.5 text-sm text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30 focus:border-[#c47c5a]"
                    >
                      <option value="">Select</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#2c1810] mb-2">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any specific requests or concerns?"
                    className="w-full bg-white border border-[#e0cfc8] rounded px-4 py-2.5 text-sm text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30 focus:border-[#c47c5a] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c47c5a] text-white py-3 rounded hover:bg-[#a8623f] transition-colors font-medium"
                >
                  Confirm Appointment
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
