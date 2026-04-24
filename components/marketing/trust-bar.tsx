export function TrustBar() {
  return (
    <section className="border-y border-champagne-200/60 bg-sand/40" id="mds">
      <div className="container-wide flex flex-col items-center justify-between gap-6 py-10 md:flex-row md:gap-8">
        <p className="eyebrow text-navy-700">Em associação com</p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12">
          <div className="flex flex-col items-center">
            <span className="font-display text-2xl font-light tracking-widest text-navy-900 sm:text-3xl">
              MDS
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-navy-700/70">
              Group
            </span>
          </div>
          <div className="font-display text-xl font-light italic text-navy-900/80 sm:text-2xl">
            Ardonagh<span className="text-champagne-600">.</span>
          </div>
          <div className="font-display text-xl font-light tracking-wide text-navy-900/80 sm:text-2xl">
            Brokers<span className="font-normal">link</span>
          </div>
        </div>
        <p className="max-w-xs text-center text-xs text-navy-700/70 md:text-right">
          40 anos, rede global, capacidade técnica e mercadológica em todas as linhas de seguros.
        </p>
      </div>
    </section>
  );
}
