import {
    ADVENTURE,
    COMEDY,
    DRAMA,
    ACTION,
    HORROR,
    THRILLER,
    ROMANCE,
    ANIMATION,
    FAMILY,
    DOCUMENTARY,
    CRIME,
    FANTASY,
    SCI_FI,
} from "./genres";

/* map mood -> select genres */
export const moodMapping = {
    happy: { genres: [COMEDY], emoji: "😊" },
    sad: { genres: [DRAMA], emoji: "😢" },
    angry: { genres: [ACTION], emoji: "😡" },
    scared: { genres: [ANIMATION], emoji: "😨" },
    thoughtful: { genres: [DOCUMENTARY], emoji: "🤔" },
    laughing: { genres: [COMEDY], emoji: "🤣" },
    "in love": { genres: [ROMANCE], emoji: "😍" },
    cool: { genres: [ACTION], emoji: "😎" },
    bored: { genres: [ADVENTURE], emoji: "🥱" },
    sleepy: { genres: [ANIMATION], emoji: "😴" },
};
