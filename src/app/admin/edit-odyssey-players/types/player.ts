export interface Player {
  id: number;
  name: string;
  number: number;

  team: "Boys" | "Girls";

  position: "Forward" | "Midfielder" | "Defender" | "Goalkeeper";

  role: string;

  foot: "Left" | "Right" | "Ambidextrous";

  image: string;
}

// schema for a player in the database () = > Player

// model Player {
//   id        Int      @id @default(autoincrement())

//   name      String
//   number    Int

//   position  Position
//   role      String
//   foot      Foot

//   image     String

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// enum Position {
//   Forward
//   Midfielder
//   Defender
//   Goalkeeper
// }

// enum Foot {
//   Left
//   Right
//   Ambidextrous
// }
