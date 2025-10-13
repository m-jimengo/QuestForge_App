"use client";

import { useQuery } from "@tanstack/react-query";
import GenericScrollbar from "@/app/Components/ScrollBar/GenericScrollBar";
import styles from "./board.module.css";
import BoardFilters from "./BoardFilters/boardFilters";
import UserCard from "./UserCard/UserCard";
import Loader from "@/app/Components/DiceSpin/SpinnerDice";
import UserCardService from "@/app/Services/Board/user-card-service";
import { User } from "@/app/Interfaces/Board/user-card-interface";

export default function BoardPage() {
  // 👇 Aquí llamamos al backend real usando React Query
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"], // clave de caché
    queryFn: async () => {
      const res = await UserCardService.getAllUsers();
      if (!res.success) throw new Error("Error fetching users");
      return res.response ?? [];
    },
    staleTime: 1000 * 60 * 5, // cache de 5 min
    refetchOnWindowFocus: false, // no recargar al cambiar de pestaña
  });

  const handleUserClick = (user: User) => {
    console.log("Usuario seleccionado:", user);
  };

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
    return (
      <div className={styles.loadingOverlay}>
        <p>Error loading users 😢</p>
        <pre style={{ color: "red" }}>{String(error)}</pre>
      </div>
    );
  }

  return (
    <div className={styles.boardFrame}>
      <BoardFilters />

      <GenericScrollbar className={styles.boardScrollbar}>
        <div className={styles.userCardsGrid}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} onClick={handleUserClick} />
          ))}
        </div>
      </GenericScrollbar>
    </div>
  );
}
