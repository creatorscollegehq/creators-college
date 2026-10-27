"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqCategory = {
  key: string;
  label: string;
  items: { q: string; a: string }[];
};

export default function HomeFaq({ categories }: { categories: FaqCategory[] }) {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [activeFaqTab, setActiveFaqTab] = useState(categories[0]?.key ?? "");
  const activeFaqItems = categories.find((category) => category.key === activeFaqTab)?.items ?? categories[0]?.items ?? [];

  return (
    <section className="bg-[#F8FAFC] py-5 dark:bg-white/[0.03] md:py-7">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            Everything you need to know before enrolling.
          </p>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-5">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setActiveFaqTab(category.key);
                  setActiveFAQ(null);
                }}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-left text-xs font-bold transition sm:text-sm lg:w-full ${
                  activeFaqTab === category.key
                    ? "bg-[#0B1B4B] text-white shadow-md dark:bg-brand-orange"
                    : "bg-white text-gray-600 hover:text-brand-orange dark:bg-white/5 dark:text-gray-300"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {activeFaqItems.map((faq, index) => {
              const isOpen = activeFAQ === index;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]"
                >
                  <button
                    onClick={() => setActiveFAQ(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left sm:px-5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-[#0B1B4B] dark:text-white sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-brand-orange transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-gray-100 px-4 py-3 dark:border-white/5 sm:px-5">
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Still have questions?{" "}
          <a
            href="https://wa.me/918143937367?text=Hi%2C%20I%20have%20a%20question%20about%20the%20Telugu%20Content%20Creation%20Course"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-brand-orange hover:underline"
          >
            Chat on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
