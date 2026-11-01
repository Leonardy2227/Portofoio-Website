"use client";

import { useState, type SubmitEvent } from "react";
import Star from "../components/star";
import "./contact.css";

const recipientEmail = "leonardymalvin061995@gmail.com";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio Contact from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href =
      `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-section" id="contact">
      <Star/>
      <div className="contact-heading">

        <h2>
          Contact
        </h2>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <p className="contact-label">GET IN TOUCH</p>

          <h3>Lets build something
            <span> meaningful.</span>
          </h3>

          <a
            href={`mailto:${recipientEmail}`}
            className="contact-item"
          >
            <div className="contact-icon">@</div>

            <div className="contact-item-text">
              <span>Email</span>
              <p>{recipientEmail}</p>
            </div>

            <span className="contact-arrow">↗</span>
          </a>

          <a
            href="https://github.com/Leonardy2227"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <div className="contact-icon">GH</div>

            <div className="contact-item-text">
              <span>GitHub</span>
              <p>Leonardy2227</p>
            </div>

            <span className="contact-arrow">↗</span>
          </a>

          <div className="contact-note">
            <span className="contact-status-dot"></span>

            <p>
              Always open to learning and new opportunities.
            </p>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="contact-form-heading">
            <h3>Send Me a Message</h3>

            <p>
              Have something to discuss? Drop me a message!
            </p>
          </div>

          <div className="contact-form-group">
            <label htmlFor="contact-name">Your Name</label>

            <input
              type="text"
              id="contact-name"
              name="name"
              placeholder="Enter your name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="contact-email">Your Email</label>

            <input
              type="email"
              id="contact-email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="contact-message">Your Message</label>

            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message here..."
              rows={5}
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="contact-submit-button"
          >
            <span>Send Message</span>
            <span className="contact-submit-arrow">↗</span>
          </button>

          <p className="contact-form-note">
            Your message will be prepared in your email app.
          </p>
        </form>
      </div>

      <div className="contact-bottom">
        <p>Designed & built by Leonardy.</p>
      </div>
    </section>
  );
}