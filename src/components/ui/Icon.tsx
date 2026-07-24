// Système d'icônes unifié (Ph. 13) — remplace les emojis dans les surfaces clés.
// SVG en trait, héritant de `currentColor`, cohérents avec l'identité navy/or.
// Une seule source : ajouter une icône = ajouter une entrée dans PATHS.

import type { SVGProps } from "react";

export type IconName =
  | "home" | "clipboard" | "cap" | "laptop" | "globe" | "coin" | "star"
  | "phone" | "chart" | "logout" | "target" | "teacher" | "handshake"
  | "tools" | "mail" | "pin" | "chat" | "inbox" | "arrow-right" | "check"
  | "search" | "rocket" | "book" | "ban" | "shield" | "bell" | "calendar" | "card" | "award" | "clock";

// Chaque icône : contenu interne d'un <svg viewBox="0 0 24 24">, trait 1.8.
const PATHS: Record<IconName, React.ReactNode> = {
  home: <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" />,
  clipboard: <><rect x="8" y="3" width="8" height="4" rx="1" /><path d="M9 5H6v16h12V5h-3M9 11h6M9 15h6" /></>,
  cap: <path d="M2 8l10-4 10 4-10 4L2 8zm4 3v5c0 1 3 2.5 6 2.5s6-1.5 6-2.5v-5" />,
  laptop: <><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 20h20" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" /></>,
  coin: <><ellipse cx="12" cy="7" rx="7" ry="3" /><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
  star: <path d="M12 3l2.6 5.6L20.5 9.4l-4.3 4 1 6-5.2-2.9L6.8 19.4l1-6-4.3-4 5.9-.8L12 3z" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L20 13l1 4v2a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />,
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" />,
  logout: <path d="M15 4h4a1 1 0 011 1v14a1 1 0 01-1 1h-4M10 12h9M16 8l4 4-4 4" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>,
  teacher: <><circle cx="12" cy="7" r="3" /><path d="M5 21v-1a5 5 0 015-5h4a5 5 0 015 5v1" /></>,
  handshake: <path d="M6 12l3-3 3 3 3-3 3 3M4 10l4-4 4 3M20 10l-4-4-2 1.5M8 14l2.5 2.5a1.5 1.5 0 002 0" />,
  tools: <path d="M14 6a3.5 3.5 0 00-4.7 4.3l-5 5a1.8 1.8 0 002.5 2.5l5-5A3.5 3.5 0 0018 8l-2.5 2.5L13 8 15.5 5.5" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 21s7-6.3 7-11a7 7 0 00-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  chat: <path d="M4 5h16v11H9l-4 3v-3H4V5z" />,
  inbox: <path d="M4 13l2-8h12l2 8v6H4v-6zm0 0h5a3 3 0 006 0h5" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12l4 4 10-10" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  rocket: <path d="M12 3c3 1 5 4 5 8l-2.5 2.5h-5L7 11c0-4 2-7 5-8zM9.5 14L7 16.5M14.5 14L17 16.5M10 18c0 1.5-1 3-3 3 0-2 1.5-3 3-3z" />,
  book: <path d="M5 4h11a2 2 0 012 2v14H7a2 2 0 01-2-2V4zM5 18h13" />,
  ban: <><circle cx="12" cy="12" r="8.5" /><path d="M6 6l12 12" /></>,
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM9 12l2 2 4-4" />,
  bell: <path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 004 0" />,
  calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>,
  award: <><circle cx="12" cy="9" r="5" /><path d="M9 13.5L8 21l4-2 4 2-1-7.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 18, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
