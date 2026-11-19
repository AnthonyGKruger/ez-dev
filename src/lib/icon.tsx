import icons from "./icons.json";

// icons.json holds only the Iconify icons the site uses; add new ones there.
type IconName = keyof typeof icons;

export const Icon = ({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number | string;
  className?: string;
}) => {
  const icon = icons[name as IconName];
  if (!icon) {
    if (import.meta.env.DEV) console.warn(`[Icon] Unknown icon: ${name}`);
    return null;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
};
