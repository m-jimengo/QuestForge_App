import Image from "next/image";
import "./UserProfile.css";
// Mock data
const user = {
    name: "Arthorius",
    age: 32,
    location: "Neverwinter",
    quote: "The dice never lie, but fate is always watching.",
    bio: "Veteran dungeon master and bard. Loves epic quests, tavern tales, and rolling for initiative.",
    availability: "Weekends & Evenings",
    rolTypes: ["Dungeon Master", "Player"],
    playStyles: ["Roleplay-heavy", "Combat", "Exploration"],
    img: "/assets/3.jpg"
};

export default function UserProfilePage() {
    return (
        <div className="profileContainer" style={{ justifyContent: "flex-end" }}>
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
            </div>
            <div className="profileRight">
                <div>
                    <h1 className="profileSectionTitle gold">BIO</h1>
                    <div className="profileBio">{user.bio}</div>
                    <div className="profileDivider" style={{paddingTop: "0.22rem"}}></div>
                </div>
                <div>
                    <h2 className="profileSectionTitle gold">AVAILABILITY</h2>
                    <div className="profileBio">{user.availability}</div>
                    <div className="profileDivider" style={{paddingTop: "0.22rem"}}></div>
                </div>
                <div>
                    <h2 className="profileSectionTitle gold">ROL TYPE</h2>
                    <div className="profileBio">{user.rolTypes.join(", ")}</div>
                    <div className="profileDivider" style={{paddingTop: "0.22rem"}}></div>
                </div>
                <div>
                    <h2 className="profileSectionTitle gold">PLAY STYLE</h2>
                    <div className="profileBio">{user.playStyles.join(", ")}</div>
                    <div className="profileDivider" style={{paddingTop: "0.22rem"}}></div>
                </div>
            </div>
        </div>
    );
}
