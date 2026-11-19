import { ClientOnly, Link } from "@tanstack/react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { ComponentProps, ReactNode } from "react";

/** Internal link; also takes "/#section" and "#section" targets. */
export const AppLink = ({
  to,
  className,
  children,
  ...rest
}: { to: string; className?: string; children: ReactNode } & Omit<
  ComponentProps<"a">,
  "href"
>) => {
  const [path, hash] = to.split("#");
  if (!path) {
    return (
      <a href={`#${hash}`} className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={path as "/"} hash={hash} className={className} {...rest}>
      {children}
    </Link>
  );
};

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** `primary` is reserved for "Start a project" and the form submit. */
export const Button = ({
  variant = "secondary",
  size = "md",
  to,
  href,
  type = "button",
  className,
  onClick,
  children,
}: {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  to?: string;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) => {
  const classes = cx(
    "btn",
    variant === "primary" ? "btn-primary" : "btn-secondary",
    size === "sm" && "btn-sm",
    className,
  );
  if (to) {
    return (
      <AppLink to={to} className={classes}>
        {children}
      </AppLink>
    );
  }
  if (href) {
    const newTab = /^https?:\/\//.test(href) || href.endsWith(".pdf");
    return (
      <a
        href={href}
        className={classes}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export const Brackets = () => {
  return (
    <>
      <span className="bracket bracket-tl" aria-hidden="true" />
      <span className="bracket bracket-tr" aria-hidden="true" />
      <span className="bracket bracket-bl" aria-hidden="true" />
      <span className="bracket bracket-br" aria-hidden="true" />
    </>
  );
};

export const Frame = ({
  label = "",
  index = "",
  brackets = false,
  as: Tag = "div",
  className,
  children,
}: {
  label?: string;
  index?: string;
  brackets?: boolean;
  as?: "div" | "article";
  className?: string;
  children: ReactNode;
}) => {
  return (
    <Tag className={cx("frame", className)}>
      <div className="frame-chrome mono text-body">
        <span className="flex flex-none gap-1.5" aria-hidden="true">
          <span className="frame-dot" />
          <span className="frame-dot" />
          <span className="frame-dot" />
        </span>
        <span className="min-w-0 flex-1 truncate text-2xs tracking-wider">
          {label}
        </span>
        {index && (
          <span className="flex-none text-2xs text-primary-gold">{index}</span>
        )}
      </div>
      {children}
      {brackets && <Brackets />}
    </Tag>
  );
};

const WIDTHS = [640, 1024, 1600];

/** Serves the WebP sizes `npm run images` makes next to the original `src`. */
export const ResponsiveImage = ({
  src,
  alt,
  sizes,
  eager = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  eager?: boolean;
  className?: string;
}) => {
  const base = src.replace(/\.(png|jpe?g)$/i, "");
  return (
    <img
      src={`${base}-1024.webp`}
      srcSet={WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
};

export const Lottie = ({
  src,
  size,
  className,
}: {
  src: string;
  size: string;
  className?: string;
}) => {
  return (
    <div style={{ width: size, height: size }} className={className}>
      <ClientOnly>
        <DotLottieReact src={src} autoplay loop style={{ width: size, height: size }} />
      </ClientOnly>
    </div>
  );
};

export const SectionRule = ({ label, className }: { label: string; className?: string }) => {
  return (
    <div className={cx("flex items-center gap-5", className)}>
      <div className="eyebrow">{label}</div>
      <div className="h-px flex-1 bg-primary-gold/20" />
    </div>
  );
};
