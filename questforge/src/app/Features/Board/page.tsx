"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GenericScrollbar from "@/app/Components/ScrollBar/GenericScrollBar";
import styles from "./board.module.css";
import BoardFilters, { BoardFiltersValue } from "./BoardFilters/boardFilters";
import UserCard from "./UserCard/UserCard";
import Loader from "@/app/Components/DiceSpin/SpinnerDice";
import { User } from "@/app/Interfaces/User/user-interface";
import { UserBoardFilter } from "@/app/Services/Board/board-service";
import { getErrorsFromBack } from "@/app/Errors/getErrorsFromBack";

export default function BoardPage() {
  const [filters, setFilters] = useState<BoardFiltersValue>({
    locations: [],
    games: [],
    roles: [],
    query: "",
  });

  const backendFilters = useMemo(
    () => ({
      locations: filters.locations,
      playStyles: filters.games,
      rolTypes: filters.roles,
    }),
    [filters]
  );

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-board-filter", backendFilters],
    queryFn: async () => {
      const res = await UserBoardFilter.searchUsers(backendFilters);
      if (!res?.success) throw res; 
      return res.response ?? [];
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.loaderBox}>
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    const errorMessage = getErrorsFromBack(error);
    return (
      <div className={styles.loadingOverlay}>
        <p className={styles.errorText}>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.boardFrame}>
      <BoardFilters onChange={setFilters} />
      <GenericScrollbar className={styles.boardScrollbar}>
        <div className={styles.userCardsGrid}>
          {users.map((user: User) => (
            <UserCard key={user.id} user={user} onClick={() => {}} />
          ))}
        </div>
      </GenericScrollbar>
    </div>
  );
}
