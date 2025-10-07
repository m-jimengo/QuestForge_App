"use client";

import { useState, useEffect } from "react";
import GenericScrollbar from "@/app/Components/ScrollBar/GenericScrollBar";
import styles from "./board.module.css";
import BoardFilters from "./BoardFilters/boardFilters";
import UserCard from "./UserCard/UserCard";
import UserCardService from "@/app/Services/Board/user-card-service";
import { User } from "@/app/Interfaces/Board/user-card-interface";
import Loader from "@/app/Components/DiceSpin/SpinnerDice";

export default function BoardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const userData = await UserCardService.getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleUserClick = (user: User) => {
    console.log("Usuario seleccionado:", user);
  };

  return (
    <div className={styles.boardFrame}>
      <BoardFilters />
      {!loading && (
        <GenericScrollbar className={styles.boardScrollbar}>
          <div className={styles.userCardsGrid}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} onClick={handleUserClick} />
            ))}
          </div>
        </GenericScrollbar>
      )}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loaderBox}>
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
}
