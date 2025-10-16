"use client";

import { useState, useEffect } from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./boardFilters.module.css";

import {
  LocationService,
  PlayStyleService,
  RolTypeService,
} from "@/app/Services/Board/board-service";
import Loader from "@/app/Components/DiceSpin/SpinnerDice";
import { useComboQuery } from "@/app/Utils/Hooks/useComboQuery";
import type {
  LocationFilter,
  PlayStyleFilter,
  RolTypeFilter,
} from "@/app/Interfaces/Board/board-interface";

import { getErrorsFromBack } from "@/app/Errors/getErrorsFromBack";

export interface BoardFiltersValue {
  locations: string[];
  games: string[];
  roles: string[];
  query: string;
}

export default function BoardFilters({
  onChange,
}: {
  onChange?: (v: BoardFiltersValue) => void;
}) {
  const [locations, setLocations] = useState<string[]>([]);
  const [games, setGames] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const [openL, setOpenL] = useState(false);
  const [openG, setOpenG] = useState(false);
  const [openR, setOpenR] = useState(false);

  const {
    options: locationOptions,
    isLoading: isLocLoading,
    isError: isLocError,
    error: locError,
  } = useComboQuery<LocationFilter>({
    queryKey: ["locations"],
    fetcher: () => LocationService.getAllLocations(),
    labelKey: "name",
    valueKey: "name",
  });

  const {
    options: playStyleOptions,
    isLoading: isPsLoading,
    isError: isPsError,
    error: psError,
  } = useComboQuery<PlayStyleFilter>({
    queryKey: ["play-styles"],
    fetcher: () => PlayStyleService.getAllPlayStyles(),
    labelKey: "name",
    valueKey: "name",
  });

  const {
    options: rolTypeOptions,
    isLoading: isRtLoading,
    isError: isRtError,
    error: rtError,
  } = useComboQuery<RolTypeFilter>({
    queryKey: ["rol-types"],
    fetcher: () => RolTypeService.getAllRolTypes(),
    labelKey: "name",
    valueKey: "name",
  });

  const isLoading = isLocLoading || isPsLoading || isRtLoading;
  const anyError = isLocError || isPsError || isRtError;

  useEffect(() => {
    onChange?.({ locations, games, roles, query });
  }, [locations, games, roles, query, onChange]);

  if (isLoading) return <Loader />;

  if (anyError) {
    const errorMessage = getErrorsFromBack(locError || psError || rtError);
    return <p className={styles.errorText}>{errorMessage}</p>;
  }

  return (
    <div className={styles.filtersBar}>
      <div className={`${styles.filter} ${openL ? styles.active : ""}`}>
        <MultiSelect
          value={locations}
          options={locationOptions}
          onChange={(e: MultiSelectChangeEvent) =>
            setLocations(e.value as string[])
          }
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
          options={playStyleOptions}
          onChange={(e: MultiSelectChangeEvent) =>
            setGames(e.value as string[])
          }
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
          options={rolTypeOptions}
          onChange={(e: MultiSelectChangeEvent) =>
            setRoles(e.value as string[])
          }
          onShow={() => setOpenR(true)}
          onHide={() => setOpenR(false)}
          optionLabel="label"
          optionValue="value"
          display="chip"
          filter
          panelClassName={styles.panel}
          className={styles.ms}
          placeholder="Role Type"
        />
      </div>

      <div className={styles.searchWrap}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        <InputText
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
        />
      </div>
    </div>
  );
}
