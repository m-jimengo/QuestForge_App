"use client";
import React, { useState } from "react";
import "./CreateUser.css";
import { GiCrossedSwords } from "react-icons/gi";
import { FiKey } from "react-icons/fi";
import { RiFilePaper2Line } from "react-icons/ri";

export default function CreateUserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Procesamiento temporal
    console.log({ username, password, email });
  };

  return (
    <div className="cu-root">
      <h1 className="forge-title">FORGE YOUR LEGEND</h1>
      <h2 className="forge-subtitle">Adventurer identification</h2>

      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="cu-input-row">
          <div className="cu-input-wrap">
            <span className="cu-input-icon" aria-hidden="true">
              <GiCrossedSwords />
            </span>
            <input
              className="cu-input"
              type="text"
              name="username"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="User name"
            />
          </div>
        </div>

        <div className="cu-input-row">
          <div className="cu-input-wrap">
            <span className="cu-input-icon" aria-hidden="true">
              <FiKey />
            </span>
            <input
              className="cu-input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
          </div>
        </div>

        <div className="cu-input-row">
          <div className="cu-input-wrap">
            <span className="cu-input-icon" aria-hidden="true">
              <RiFilePaper2Line />
            </span>
            <input
              className="cu-input"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
          </div>
        </div>

        <button type="submit" className="cu-continue">
          CONTINUE
        </button>
      </form>
    </div>
  );
}
