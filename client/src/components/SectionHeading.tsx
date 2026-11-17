export default function SectionHeading({ eyebrow, title, copy, number }: { eyebrow: string; title: string; copy?: string; number: string }) {
  return (
    <div className="section-heading reveal">
      <div className="section-index"><span>{number}</span><i /></div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {copy && <p className="section-copy">{copy}</p>}
      </div>
    </div>
  );
}
