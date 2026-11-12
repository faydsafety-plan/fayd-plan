// Bingkai HP sederhana untuk screenshot aplikasi (rasio layar 780x1688).
export function Phone({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[2.2rem] border border-line-strong bg-[#0b0b0b] p-2 shadow-2xl shadow-black/60 ${className}`}
    >
      <div className="aspect-[780/1688] overflow-hidden rounded-[1.7rem] bg-coal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={780}
          height={1688}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}
