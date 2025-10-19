"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./CreateUserDetails.css";
import { MultiSelect } from "primereact/multiselect";
import { IMAGES } from "@/app/Constants/Images/Images";

export default function CreateUserDetailsPage() {
  // estados para los dropdowns (valores iniciales de ejemplo)
  const [availability, setAvailability] = useState<string[]>(["weekends"]);
  const [playStyle, setPlayStyle] = useState<string[]>(["roleplay"]);
  const [favouriteRoles, setFavouriteRoles] = useState<string[]>(["bard"]);
  const [rolDetails, setRolDetails] = useState<string[]>(["narrative"]);

  // opciones de ejemplo (ajusta según tus datos reales)
  const availabilityOptions = [
    { label: "Weekends & Evenings", value: "weekends" },
    { label: "Weekdays", value: "weekdays" },
    { label: "Anytime", value: "anytime" },
  ];
  const playStyleOptions = [
    { label: "Roleplay-heavy", value: "roleplay" },
    { label: "Combat-focused", value: "combat" },
    { label: "Exploration", value: "exploration" },
  ];
  const favouriteRolesOptions = [
    { label: "Bard", value: "bard" },
    { label: "Ranger", value: "ranger" },
    { label: "Dungeon Master", value: "dm" },
  ];
  const rolDetailsOptions = [
    { label: "narrative", value: "narrative" },
    { label: "tactical", value: "tactical" },
    { label: "social", value: "social" },
  ];

  // normalizar ruta de la imagen del TS (asegura leading slash)
  let photoSrc = IMAGES.PHOTOUSER ?? "";
  if (photoSrc && !photoSrc.startsWith("/")) photoSrc = "/" + photoSrc;

  return (
    <div className="cud-root">
      <div className="cud-inner">
        {/* Imagen a la izquierda (bloque izquierdo) */}
        <div className="cud-left">
          <div className="cud-image-wrap" aria-hidden="true">
            <Image
              src={photoSrc}
              alt="PHOTOUSER"
              width={180}
              height={180}
              className="cud-image"
              priority
            />
            {/* texto pequeño debajo de la imagen en fuente normal */}
            <p className="cud-image-caption">Adventurer Image</p>
          </div>
        </div>

        {/* MultiSelects a la derecha (bloque derecho) */}
        <div className="cud-right">
          <div className="cud-field">
            <MultiSelect
              className="cud-multiselect board-filter"
              value={availability}
              options={availabilityOptions}
              onChange={(e) => setAvailability(e.value as string[])}
              placeholder="Availability"
              display="chip"
            />
          </div>

          <div className="cud-field">
            <MultiSelect
              className="cud-multiselect board-filter"
              value={playStyle}
              options={playStyleOptions}
              onChange={(e) => setPlayStyle(e.value as string[])}
              placeholder="Play Style"
              display="chip"
            />
          </div>

          <div className="cud-field">
            <MultiSelect
              className="cud-multiselect board-filter"
              value={favouriteRoles}
              options={favouriteRolesOptions}
              onChange={(e) => setFavouriteRoles(e.value as string[])}
              placeholder="Favourite Roles"
              display="chip"
            />
          </div>

          <div className="cud-field">
            <MultiSelect
              className="cud-multiselect board-filter"
              value={rolDetails}
              options={rolDetailsOptions}
              onChange={(e) => setRolDetails(e.value as string[])}
              placeholder="Rol Details"
              display="chip"
            />
          </div>
        </div>
      </div>
    </div>
  );
}