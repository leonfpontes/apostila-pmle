import { MdInline } from "@/components/shared/markdown"

// Cartão que vira em 3D. As duas faces ocupam a mesma célula do grid, então a
// altura acompanha a face mais longa (estilos .flip-* em index.css).

const FACE = "flip-face flex flex-col items-center justify-center rounded-2xl border p-8 text-center text-xl leading-snug shadow-sm md:p-12 md:text-2xl"

export function CartaoGiratorio({ pergunta, resposta, virado, aoVirar }: { pergunta: string; resposta: string; virado: boolean; aoVirar: () => void }) {
  return (
    <div className="flip-stage">
      <button type="button" onClick={aoVirar} aria-label={virado ? "Mostrar a pergunta" : "Mostrar a resposta"} className="flip-card grid min-h-72 w-full cursor-pointer rounded-2xl" data-flipped={virado}>
        <div className={`${FACE} relative! col-start-1 row-start-1 bg-card`}>
          <span className="absolute top-3.5 left-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Pergunta</span>
          <MdInline>{pergunta}</MdInline>
          <span className="absolute bottom-3 text-xs text-muted-foreground">Toque ou espaço para virar</span>
        </div>
        <div className={`${FACE} flip-back relative! col-start-1 row-start-1 border-primary/30 bg-brand-tint`}>
          <span className="absolute top-3.5 left-4 text-xs font-semibold tracking-widest text-primary uppercase">Resposta</span>
          <MdInline className="[&_strong]:text-primary">{resposta}</MdInline>
        </div>
      </button>
    </div>
  )
}
