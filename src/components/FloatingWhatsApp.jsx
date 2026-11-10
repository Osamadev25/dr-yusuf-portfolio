import { doctor } from "../data/doctor";

export function FloatingWhatsApp({ t }) {
  const message = encodeURIComponent(t("whatsapp.greeting"));
  const href = `https://wa.me/${doctor.contact.whatsappNumber}?text=${message}`;

  return (
    <aside
      aria-label={t("whatsapp.tooltip")}
      className="fixed bottom-6 end-6 z-50 flex items-center"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsapp.tooltip")}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-600/35 transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:shadow-emerald-600/50 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-900"
      >
        {/* Soft pulse ring effect */}
        <span
          className="absolute -inset-1 animate-ping rounded-full bg-emerald-400 opacity-40 duration-1000"
          aria-hidden="true"
        />

        {/* Crisp WhatsApp SVG Icon */}
        <svg
          className="relative h-7 w-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.101-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.175.201-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.634-.929-2.238-.244-.589-.493-.509-.678-.519-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.51c0 1.481 1.079 2.91 1.23 3.111.15.201 2.123 3.242 5.143 4.547.718.311 1.279.497 1.716.636.722.23 1.378.197 1.9.12.581-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.95.56 3.77 1.53 5.32L2 22l4.81-1.51c1.49.88 3.23 1.39 5.23 1.39 5.53 0 10.02-4.49 10.02-10.02C22.06 6.49 17.57 2 12.04 2zm0 18.25c-1.73 0-3.34-.48-4.73-1.32l-.34-.2-2.85.89.92-2.77-.22-.35c-.95-1.5-1.46-3.26-1.46-5.08 0-4.57 3.72-8.29 8.29-8.29 4.57 0 8.29 3.72 8.29 8.29 0 4.57-3.72 8.29-8.29 8.29z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute bottom-full mb-3 hidden whitespace-nowrap rounded-xl bg-navy-950 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg transition-opacity duration-200 group-hover:block dark:bg-slate-800">
          {t("whatsapp.tooltip")}
        </span>
      </a>
    </aside>
  );
}
