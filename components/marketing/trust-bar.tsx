export function TrustBar() {
  return (
    <section className="border-y border-champagne-500/10 bg-navy-900" id="mds">
      <div className="container-wide flex flex-col items-center justify-between gap-6 py-10 md:flex-row md:gap-8">
        <p className="eyebrow text-champagne-500">Em associação com</p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12">
          <div className="flex flex-col items-center">
            <span className="font-display text-2xl font-light tracking-widest text-ivory sm:text-3xl">
              MDS
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-champagne-300/80">
              Group
            </span>
          </div>
          <div className="font-display text-xl font-light italic text-ivory/90 sm:text-2xl">
            Ardonagh<span className="text-champagne-400">.</span>
          </div>
          <div className="font-display text-xl font-light tracking-wide text-ivory/90 sm:text-2xl">
            Brokers<span className="font-normal">link</span>
          </div>
        </div>
        <p className="max-w-xs text-center text-xs text-ivory/65 md:text-right">
          40 anos, rede global, capacidade técnica e mercadológica em todas as linhas de seguros.
        </p>
      </div>
    </section>
  );
}
