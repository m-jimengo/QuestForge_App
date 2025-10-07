"use client";

import { useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faDiceD20,
  faUserShield,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./boardFilters.module.css";

type Option = { label: string; value: string };

const LOCATION_OPTIONS: Option[] = [
  { label: "Madrid", value: "madrid" },
  { label: "Barcelona", value: "barcelona" },
  { label: "Valencia", value: "valencia" },
  { label: "Málaga", value: "Málaga" },
  { label: "Jaén", value: "Jaén" },
  { label: "J", value: "J" },
];

const GAME_TYPE_OPTIONS: Option[] = [
  { label: "D&D", value: "dnd" },
  { label: "Vampire", value: "vampire" },
  { label: "Pathfinder", value: "pathfinder" },
];

const ROLE_TYPE_OPTIONS: Option[] = [
  { label: "GM / DM", value: "gm" },
  { label: "Player", value: "player" },
  { label: "Organizer", value: "organizer" },
];

interface BoardFiltersProps {
  onChange?: (filters: {
    locations: string[];
    games: string[];
    roles: string[];
    query: string;
  }) => void;
}

export default function BoardFilters({ onChange }: BoardFiltersProps) {
  const [locations, setLocations] = useState<string[]>([]);
  const [games, setGames] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const [openL, setOpenL] = useState(false);
  const [openG, setOpenG] = useState(false);
  const [openR, setOpenR] = useState(false);

  const emit = (next?: Partial<Parameters<NonNullable<typeof onChange>>[0]>) =>
    onChange?.({ locations, games, roles, query, ...next });


  return (
    <div className={styles.filtersBar}>
      <div className={`${styles.filter} ${openL ? styles.active : ""}`}>
        <MultiSelect
          value={locations}
          options={LOCATION_OPTIONS}
          onChange={(e: MultiSelectChangeEvent) => {
            const vals = e.value as string[];
            setLocations(vals);
            emit({ locations: vals });
          }}
          onShow={() => setOpenL(true)}
          onHide={() => setOpenL(false)}
          optionLabel="label"
          optionValue="value"
          display="chip"
          filter
          panelClassName={styles.panel}
          className={styles.ms}
          placeholder="Location"
        />
      </div>
      <div className={`${styles.filter} ${openG ? styles.active : ""}`}>
        <MultiSelect
          value={games}
          options={GAME_TYPE_OPTIONS}
          onChange={(e: MultiSelectChangeEvent) => {
            const vals = e.value as string[];
            setGames(vals);
            emit({ games: vals });
          }}
          onShow={() => setOpenG(true)}
          onHide={() => setOpenG(false)}
          optionLabel="label"
          optionValue="value"
          display="chip"
          filter
          panelClassName={styles.panel}
          className={styles.ms}
          placeholder="Game Type"
        />
      </div>

      <div className={`${styles.filter} ${openR ? styles.active : ""}`}>
        <MultiSelect
          value={roles}
          options={ROLE_TYPE_OPTIONS}
          onChange={(e: MultiSelectChangeEvent) => {
            const vals = e.value as string[];
            setRoles(vals);
            emit({ roles: vals });
          }}
          onShow={() => setOpenR(true)}
          onHide={() => setOpenR(false)}
          optionLabel="label"
          optionValue="value"
          display="chip"
          filter
          className={styles.ms} 
          panelClassName={styles.panel}
          placeholder="Role Type"
        />
      </div>

      <div className={styles.searchWrap}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        <InputText
          className={styles.searchInput}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            emit({ query: e.target.value });
          }}
          placeholder="Search…"
        />
      </div>
    </div>
  );
}
