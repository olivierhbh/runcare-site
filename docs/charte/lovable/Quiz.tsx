import { useEffect, useMemo, useRef, useState } from "react";
import { compute, type Answers } from "@/lib/profil-coureur";
import { ChevronLeft, ChevronRight, ChevronDown, RotateCcw } from "lucide-react";
import romainLelio from "@/assets/romain-lelio.png.asset.json";

// Logo RunCare (fond clair) : le même fichier que sur les pages du tunnel systeme.io, hébergé sur le site.
const LOGO_URL = "https://argonnekinesportsante.fr/charte/logo-runcare-fond-clair.png";
// Page de vente du tunnel.
const VENTE_URL = "https://runcare.systeme.io/748f0635";

/*__QUESTIONS__*/
const PILLAR_STYLE: Record<string, string> = {
  CHARGE: "text-[color:var(--charge)]",
  "RÉCUPÉRATION": "text-[color:var(--recup)]",
  "BIOMÉCANIQUE": "text-[color:var(--biomec)]",
  ATTENTES: "text-brand",
};

// Intégration dans la page lead magnet de systeme.io (cadre) : on envoie la hauteur du contenu à la page
// parente pour qu'elle ajuste le cadre, et on lui demande de remonter en haut du cadre à chaque écran.
function useFrameSync(step: number) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.parent === window) return;
    const send = () =>
      window.parent.postMessage({ type: "runcare-profil:height", height: el.offsetHeight }, "*");
    const ro = new ResizeObserver(send);
    ro.observe(el);
    send();
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    if (window.parent !== window) window.parent.postMessage({ type: "runcare-profil:step", step }, "*");
  }, [step]);

  return ref;
}

export default function Quiz() {
  const [step, setStep] = useState(-1); // -1 intro, 0..n questions, n+1 result
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const rootRef = useFrameSync(step);

  const total = QUESTIONS.length;
  const done = step >= total;

  const result = useMemo(() => {
    if (!done) return null;
    return compute(answers as Answers);
  }, [done, answers]);

  let screen;
  if (step === -1) {
    screen = <Intro onStart={() => setStep(0)} />;
  } else if (done && result) {
    screen = <Results result={result} onRestart={() => { setAnswers({}); setStep(-1); }} />;
  } else {
    const q = QUESTIONS[step];
    screen = (
      <Question
        q={q}
        step={step}
        total={total}
        current={answers[q.key]}
        onSelect={(i) => setAnswers((a) => ({ ...a, [q.key]: i }))}
        onPrev={() => setStep((s) => s - 1)}
        onNext={() => setStep((s) => s + 1)}
      />
    );
  }

  return <div ref={rootRef}>{screen}</div>;
}

function Question({
  q,
  step,
  total,
  current,
  onSelect,
  onPrev,
  onNext,
}: {
  q: Q;
  step: number;
  total: number;
  current: number | undefined;
  onSelect: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const progress = (step / total) * 100;

  return (
    <main className="mx-auto max-w-2xl px-5 pt-8 pb-16">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className={`rc-eyebrow text-base sm:text-lg ${PILLAR_STYLE[q.pillar]}`}>{q.pillar}</span>
          <span className="text-sm font-semibold tabular-nums text-muted-foreground">{step + 1} / {total}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="text-[1.75rem] leading-[1.15] text-foreground sm:text-4xl">{q.title}</h2>
      {q.hint && <div className="mt-5 rounded bg-brand-soft p-4 text-base text-foreground/85">{q.hint}</div>}
      {q.hints && (
        <div className="mt-5 space-y-3">
          {q.hints.map((h) => (
            <div key={h.title} className="rounded bg-brand-soft p-4 text-base text-foreground/85 sm:p-5">
              <div className="rc-eyebrow mb-1 text-[0.8rem] text-brand">{h.title}</div>
              <div>{h.body}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {q.options.map((opt, i) => {
          const selected = current === i;
          return (
            <button
              key={i}
              aria-pressed={selected}
              onClick={() => onSelect(i)}
              className={`group w-full rounded border p-4 text-left transition-colors sm:p-5 ${
                selected ? "border-brand bg-brand-soft ring-1 ring-brand" : "border-border bg-card hover:border-brand/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    selected ? "border-brand bg-brand" : "border-border bg-card group-hover:border-brand/60"
                  }`}
                >
                  {selected && <span className="h-2 w-2 rounded-full bg-brand-foreground" />}
                </span>
                <span className="text-base leading-snug text-foreground sm:text-lg">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button className="rc-btn-ghost" disabled={step === 0} onClick={onPrev}>
          <ChevronLeft className="h-4 w-4" /> Précédent
        </button>
        <button className="rc-btn px-7 py-3.5 text-base" disabled={current === undefined} onClick={onNext}>
          {step === total - 1 ? "Voir mes résultats" : "Suivant"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex justify-center px-5 pt-7 pb-2 sm:pt-10">
      <img src={LOGO_URL} alt="RunCare Kiné & Coach" width={1253} height={348} className="h-11 w-auto sm:h-14" />
    </header>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-2xl px-5 pt-8 pb-16 sm:pt-12">
        <h1 className="text-center text-4xl leading-[1.08] text-foreground sm:text-5xl">
          Tu cours régulièrement,
          <br />
          <em className="text-brand">mais connais-tu vraiment ton profil&nbsp;?</em>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          <strong className="font-semibold text-foreground">Romain</strong> et{" "}
          <strong className="font-semibold text-foreground">Lélio</strong>, deux{" "}
          <strong className="font-semibold text-foreground">kinésithérapeutes</strong> spécialisés en course à pied et
          trail, t'ont préparé un questionnaire <strong className="font-semibold text-foreground">gratuit</strong> pour
          t'aider à mieux comprendre ton <strong className="font-semibold text-foreground">fonctionnement</strong> et tes{" "}
          <strong className="font-semibold text-foreground">axes de progression</strong>.
        </p>
        <div className="mt-10 flex justify-center">
          <button onClick={onStart} className="rc-btn w-full max-w-[30rem] text-lg sm:text-xl">
            Commencer le Test de Profil du Coureur&nbsp;!
            <ChevronRight className="h-5 w-5 shrink-0" />
          </button>
        </div>
      </main>
    </div>
  );
}

function Results({
  result,
  onRestart,
}: {
  result: { charge: number; recup: number; biomec: number };
  onRestart: () => void;
}) {
  const rows = [
    { label: "Charge", value: result.charge, color: "var(--charge)" },
    { label: "Récupération", value: result.recup, color: "var(--recup)" },
    { label: "Biomécanique", value: result.biomec, color: "var(--biomec)" },
  ];

  return (
    <main className="mx-auto max-w-2xl px-5 pt-8 pb-16">
      <div className="rounded bg-dark px-5 py-8 text-center sm:py-10">
        <h1 className="text-3xl tracking-[0.01em] text-dark-foreground sm:text-4xl">VOICI TON PROFIL DE COUREUR !</h1>
      </div>

      <p className="mt-6 text-center text-lg leading-relaxed text-muted-foreground">
        Voici ci-dessous ton score pour chacun des trois piliers de l'entraînement. Plus la barre tend vers la droite,
        meilleur est ton score.
      </p>

      <div className="mt-8 rounded border border-border bg-card p-5 sm:p-7">
        <h3 className="rc-eyebrow mb-5 font-sans text-muted-foreground">Scores par pilier</h3>
        <div className="space-y-5">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="mb-1.5 flex justify-between text-base">
                <span className="font-semibold">{r.label}</span>
                <span className="font-bold tabular-nums" style={{ color: r.color }}>{r.value}/100</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${r.value}%`, backgroundColor: r.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded bg-brand-soft p-5 sm:p-7">
        <h3 className="text-2xl text-foreground">La prochaine étape</h3>
        <p className="mt-3 text-lg leading-relaxed text-foreground/85">
          Si tu veux analyser et objectiver ce qui aura le plus d'impact sur ta progression, clique sur le bouton
          ci-dessous pour en savoir plus sur le <strong className="font-bold text-brand">Bilan Diagnostic RunCare</strong>.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex items-center justify-center gap-3 text-brand animate-bounce motion-reduce:animate-none">
          <ChevronDown className="h-7 w-7" strokeWidth={3} />
          <ChevronDown className="h-7 w-7" strokeWidth={3} />
          <ChevronDown className="h-7 w-7" strokeWidth={3} />
        </div>
        <a href={VENTE_URL} target="_top" className="rc-btn mt-2 w-full py-5 text-lg sm:text-xl">
          <span>
            👉 Découvrir le <strong>Bilan Diagnostic RunCare</strong>
          </span>
        </a>
      </div>

      <div className="mt-10 text-center">
        <img src={romainLelio.url} alt="Romain et Lélio, fondateurs de RunCare" className="mx-auto h-auto w-1/2 rounded" />
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          A très vite, Romain et Lélio, kinésithérapeutes spécialisés et Fondateurs de RunCare
        </p>
      </div>

      <button onClick={onRestart} className="rc-btn-ghost mt-8 px-0 text-sm">
        <RotateCcw className="h-4 w-4" /> Refaire le profil coureur
      </button>
    </main>
  );
}
