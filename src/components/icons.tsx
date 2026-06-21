// Single icon family — Lucide-style, 1.6 stroke, currentColor. No emoji.
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const BagIcon = ({ className }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const PlusIcon = ({ className }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ className }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M5 12h14" />
  </svg>
);

export const CloseIcon = ({ className }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowDownIcon = ({ className }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const TrashIcon = ({ className }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13" />
  </svg>
);

export const CheckIcon = ({ className }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M5 12l5 5L20 6" />
  </svg>
);
