import type { WorkItem, WorkLabels } from "../../content";
import { Button, Frame, ResponsiveImage } from "../ui";

type CardProps = {
  project: WorkItem;
  labels: WorkLabels;
  detailed?: boolean;
  headingTag?: "h3" | "h4";
};

const StackTags = ({ stack }: { stack?: string[] }) =>
  stack?.length ? (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tag) => (
        <li key={tag} className="chip min-h-7 text-2xs">
          {tag}
        </li>
      ))}
    </ul>
  ) : null;

export const ProductCard = ({
  project,
  labels,
  detailed = false,
  headingTag: Heading = "h4",
}: CardProps) => (
  <Frame
    as="article"
    label={project.domain}
    index={project.index}
    brackets
    className="flex h-full flex-col"
  >
    <ResponsiveImage
      src={project.image}
      alt={`${project.title} screenshot`}
      sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
      className="block aspect-video w-full object-cover object-top"
    />
    <div className="flex flex-1 flex-col gap-3 p-[clamp(20px,2vw,28px)] md:gap-3.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="badge-product">{labels.productBadge}</span>
        {detailed && project.category && (
          <span className="mono text-2xs tracking-caps uppercase">
            {project.category}
          </span>
        )}
      </div>
      <Heading className="text-[length:clamp(24px,0.4vw_+_22px,28px)] leading-tight font-black tracking-tight text-heading">
        {project.title}
      </Heading>
      <p className="leading-relaxed">{project.description}</p>
      {project.metric?.value && (
        <div className="flex items-baseline gap-3 border border-dashed border-primary-gold/45 px-4 py-3.5">
          <span className="mono text-xl font-bold text-light-gold md:text-xl">
            {project.metric.value}
          </span>
          <span className="mono text-2xs tracking-caps uppercase">
            {project.metric.label}
          </span>
        </div>
      )}
      {detailed && <StackTags stack={project.stack} />}
      <div className="mt-auto pt-1">
        <Button size="sm" href={project.link}>
          {labels.visit}
          <span className="-ml-1 max-[359px]:hidden">{project.domain}</span>
        </Button>
      </div>
    </div>
  </Frame>
);

export const ClientCard = ({
  project,
  labels,
  detailed = false,
  headingTag: Heading = "h4",
}: CardProps) => (
  <article
    className={`frame h-full ${
      detailed
        ? "flex flex-col"
        : "flex flex-col sm:grid sm:grid-cols-[minmax(170px,38%)_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)]"
    }`}
  >
    <ResponsiveImage
      src={project.image}
      alt={`${project.title} screenshot`}
      sizes={
        detailed
          ? "(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
          : "(min-width: 1280px) 480px, (min-width: 640px) 60vw, 100vw"
      }
      className={`block w-full object-cover ${
        detailed
          ? "aspect-video object-top"
          : "aspect-video object-top sm:aspect-auto sm:h-full sm:min-h-56 sm:object-left-top"
      }`}
    />
    <div className="flex flex-1 flex-col gap-2.5 p-5 md:px-6.5 md:py-6">
      <p className="mono flex min-w-0 gap-3 text-2xs tracking-wider text-primary-gold">
        <span className="truncate">{project.domain}</span>
        <span className="flex-none">{project.index}</span>
      </p>
      {detailed && project.category && (
        <p className="mono text-2xs tracking-caps uppercase">
          {labels.clientLabel} · {project.category}
        </p>
      )}
      <Heading className="text-xl leading-tight font-black tracking-tight text-heading md:text-xl">
        {project.title}
      </Heading>
      <p className="leading-relaxed md:text-base">{project.description}</p>
      {detailed && <StackTags stack={project.stack} />}
      <div className="mt-auto grid grid-cols-2 gap-2.5 pt-1 sm:flex sm:flex-wrap">
        <Button size="sm" href={project.link}>
          {labels.visit}
        </Button>
        {project.referralLetter && (
          <Button size="sm" href={project.referralLetter}>
            {labels.referral}
          </Button>
        )}
      </div>
    </div>
  </article>
);
