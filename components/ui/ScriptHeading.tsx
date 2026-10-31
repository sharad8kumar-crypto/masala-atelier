export function ScriptHeading({
  script,
  title,
  id,
  as: Tag = "h2",
  align = "left",
}: {
  script: string;
  title: string;
  id?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <span
        aria-hidden="true"
        className="block pl-1 font-script text-5xl leading-[1.2] text-gold sm:text-6xl"
      >
        {script}
      </span>
      <Tag
        id={id}
        className="mt-1 font-heading text-2xl font-semibold uppercase tracking-[0.16em] sm:text-4xl"
      >
        {title}
      </Tag>
    </div>
  );
}