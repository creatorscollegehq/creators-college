import { MapPin, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white dark:bg-[#090d16] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Student Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-blue dark:text-white">
            Telugu Students. Real Progress.
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            Learners from across Andhra Pradesh and Telangana sharing what changed after joining Creators College.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]"
            >
              <div>
                <div className="flex items-center gap-1 text-brand-orange mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-6 pt-5 border-t border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-orange text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    {t.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-brand-blue dark:text-white">{t.name}</div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
                      <MapPin size={11} />
                      <span className="truncate">{t.city}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 inline-flex rounded-full bg-brand-orange/10 text-brand-orange px-2.5 py-1 text-[10px] font-semibold">
                  {t.result}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-gray-400 dark:text-gray-600">
          Results vary by individual effort, consistency, and practice.
        </p>
      </div>
    </section>
  );
}
