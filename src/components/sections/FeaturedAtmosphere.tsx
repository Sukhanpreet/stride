export function FeaturedAtmosphere() {
  return (
    <div className="featured-atmosphere pointer-events-none absolute inset-0" aria-hidden>
      <div className="featured-atmosphere__gradient absolute inset-0" />
      <div className="featured-atmosphere__grid absolute inset-0" />
      <div className="featured-atmosphere__floor absolute inset-x-0 bottom-0 h-[40%]" />
      <div className="featured-atmosphere__particles absolute inset-0" />
    </div>
  );
}
