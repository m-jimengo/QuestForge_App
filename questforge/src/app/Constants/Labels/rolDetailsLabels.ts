export const ROL_DETAILS_LABELS = {
  smallParty: "Small Party",
  tactical: "Tactical",
  narrative: "Narrative",
  player: "Player",
  friendsOnly: "Friends Only",
  dungeonMaster: "Dungeon Master",
  openParty: "Open Party",
  bigParty: "Big Party",
} as const;

export type RolDetailKey = keyof typeof ROL_DETAILS_LABELS;

export const getRolDetailLabel = (key: RolDetailKey): string => {
  return ROL_DETAILS_LABELS[key];
};
