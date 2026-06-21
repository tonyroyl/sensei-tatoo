import { theme as reablocksDefault } from "reablocks";

/**
 * reablocks ships a full Tailwind v4 stylesheet (with global resets) that would
 * fight this project's Tailwind v3 setup. Instead of importing its CSS, we use
 * reablocks' intended extensibility: components are styled by a theme made of
 * class strings — so we feed them ICARE's own Tailwind classes. No global CSS,
 * no conflict; we get reablocks' behaviour (positioning, portals) on-brand.
 */
export const icareReablocksTheme = {
  ...reablocksDefault,
  components: {
    ...reablocksDefault.components,
    tooltip: {
      base: "whitespace-nowrap text-center will-change-[transform,opacity] px-2.5 py-1.5 rounded-md border border-gold/25 bg-[#161210] text-xs font-medium text-solar shadow-ember",
      disablePointer: "pointer-events-none",
      arrow: "w-2 h-2 rotate-45 border-b border-r border-gold/25 bg-[#161210]",
    },
  },
};
