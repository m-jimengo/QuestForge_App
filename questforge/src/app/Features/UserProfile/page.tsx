import Image from "next/image";
import "./UserProfile.css";
import { IMAGES } from "../../Constants/Images/Images";
import Tooltip from "@/app/Components/Tooltip/Tooltip";
import { getRolDetailLabel } from "../../Constants/Labels/rolDetailsLabels";

// Mock data
const user = {
  name: "Eleonor",
  age: 32,
  location: "Neverwinter",
  quote: "The dice never lie, but fate is always watching.",
  bio: "Dungeon Player and bard. Loves epic quests, tavern tales, and rolling for initiative.",
  availability: "Weekends & Evenings",
  rolTypes: ["Dungeon Master", "Player"],
  playStyles: ["Roleplay-heavy", "Combat", "Exploration"],
  img: "/assets/users/3.jpg",
  userDetails: ["smallParty", "narrative", "tactical", "player", "friendsOnly"],
};

const getRolDetailImage = (detail: string): string => {
  const rol = IMAGES?.rolDetails as Record<string, string> | undefined;
  if (!rol) return "";
  return rol[detail] ?? "";
};

export default function UserProfilePage() {
  return (
    <div className="profileContainer">
      <Image
        src="/assets/scroll.png"
        alt="Fondo pergamino"
        fill
        priority
        className="profileBackground"
      />

      {/* Tooltip general para todos los detalles */}
      <Tooltip target=".profileDetailItem" position="top" />

      <div className="profileLeft">
        <div className="profileImageWrap">
          <Image
            src={user.img}
            alt={user.name}
            width={180}
            height={180}
            className="profileImage"
          />
        </div>
        <h1 className="profileName">{user.name}</h1>
        <div className="profileMeta">
          <span className="profileAge">{user.age} yrs</span>
          <span className="profileLocation">{user.location}</span>
        </div>
        <div className="profileQuote">
          <em>{user.quote}</em>
        </div>

        {/* Detalles de rol con tooltip */}
        <div className="profileDetailsRow">
          {user.userDetails.map((d) => {
            const src = getRolDetailImage(d);
            const label = getRolDetailLabel(d as any); // usa el label del tipado
            return src ? (
              <div
                key={d}
                className="profileDetailItem"
                data-pr-tooltip={label} // contenido del tooltip
                data-pr-position="bottom"
              >
                <Image src={src} alt={d} width={40} height={40} />
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="profileRight">
        <div>
          <h1 className="profileSectionTitle gold">BIO</h1>
          <div className="profileBio">{user.bio}</div>
          <div className="profileDivider"></div>
        </div>

        <div>
          <h2 className="profileSectionTitle gold">AVAILABILITY</h2>
          <div className="profileBio">{user.availability}</div>
          <div className="profileDivider"></div>
        </div>

        <div>
          <h2 className="profileSectionTitle gold">ROL TYPE</h2>
          <div className="profileBio">{user.rolTypes.join(", ")}</div>
          <div className="profileDivider"></div>
        </div>

        <div>
          <h2 className="profileSectionTitle gold">PLAY STYLE</h2>
          <div className="profileBio">{user.playStyles.join(", ")}</div>
          <div className="profileDivider"></div>
        </div>
      </div>
    </div>
  );
}
