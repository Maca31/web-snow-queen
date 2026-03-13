'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ─────────────────────────────────────────────
// NARRACIONES COMPLETAS POR CAPÍTULO
// ─────────────────────────────────────────────
const NARRATIONS: Record<string, { title: string; text: string }> = {
  'section-01-hero': {
    title: 'La Reina de las Nieves',
    text: `Érase una vez, en un lugar donde el invierno dura mucho tiempo y las estrellas brillan como diamantes en el cielo, una historia de amor y valentía que nadie olvidará jamás.

Esta es la historia de Gerda, una niña valiente de corazón cálido, y de Kay, su mejor amigo en el mundo entero.

Una historia donde el frío más terrible no puede vencer al amor más verdadero.

Bienvenidos al mundo de La Reina de las Nieves.`,
  },

  'section-02-village': {
    title: 'Capítulo I — El Jardín Feliz',
    text: `Gerda y Kay eran los mejores amigos del mundo. Vivían en casas vecinas, separadas solo por una pequeña maceta de rosas rojas que crecía en el tejado entre sus ventanas.

Cada mañana, cuando el sol salía, los dos niños se asomaban a sus ventanas y se saludaban entre las flores.

¡Kay, mira qué bonitas están las rosas hoy!, decía Gerda con los ojos brillantes.
¡Son las más bonitas del mundo entero!, respondía Kay sonriendo.

Jugaban juntos todos los días. En verano corrían entre las flores. En invierno dibujaban copos de nieve en los cristales helados. Y en otoño coleccionaban hojas de colores para guardarlo todo en una caja especial.

Eran felices. Completamente felices. Como solo pueden serlo los mejores amigos del mundo.`,
  },

  'section-03-mirror': {
    title: 'Capítulo II — El Espejo Maldito',
    text: `Pero había en el mundo algo terrible que nadie sabía.

Un duende malvado y muy listo había creado un espejo especial. No era un espejo normal. Era un espejo maldito.

Quien se miraba en él, solo veía lo feo del mundo. Las flores hermosas parecían marchitas. Las personas buenas parecían malas. Todo lo bonito se volvía horrible, y todo lo horrible parecía peor aún.

El duende estaba muy orgulloso de su terrible invención. Quería llevarlo hasta el cielo para que los ángeles y el mismísimo sol se vieran horribles en él.

Pero mientras subía volando muy alto, el espejo se le escapó de las manos.

Cayó desde el cielo. Y se rompió. Se rompió en millones y millones de pedacitos pequeñísimos que volaron por todo el mundo como el polvo vuela con el viento.`,
  },

  'section-04-ice-heart': {
    title: 'Capítulo III — El Corazón de Hielo',
    text: `Fue un día de invierno. Kay y Gerda estaban mirando un libro de imágenes juntos, como hacían siempre.

De repente, Kay se frotó el ojo.
¡Ay!, dijo. Me ha entrado algo en el ojo.

Pero no era polvo. Era un fragmento del espejo malvado.

Desde ese momento, todo cambió.

Kay miró las rosas y dijo: ¡Qué flores tan aburridas y feas!
Gerda lo miró asustada. Esas son nuestras rosas favoritas, Kay.
Son tonterías, respondió él con voz fría.

Poco a poco, Kay fue cambiando. Ya no quería jugar con Gerda. Ya no le gustaban los libros de cuentos. Solo le gustaba el hielo, la nieve, las cosas frías y perfectas.

Y su corazón, su corazón se fue enfriando poco a poco. Como el invierno que él tanto amaba ahora.

Gerda lo miraba y sentía que su mejor amigo se estaba perdiendo. Que había algo dentro de él que ya no era el Kay que ella conocía.`,
  },

  'section-05-queen': {
    title: 'Capítulo IV — La Reina de las Nieves',
    text: `Una noche de invierno, cuando la nieve caía espesa y el viento aullaba por las calles, ocurrió algo que nadie esperaba.

Un trineo enorme apareció en el cielo. Era blanco como la nieve y brillaba como el hielo. Lo tiraban dos caballos hechos de viento y de ventisca.

Y en ese trineo iba ella. La Reina de las Nieves.

Era la mujer más bella que nadie hubiera visto jamás. Su pelo era blanco como la nieve más pura. Sus ojos eran azules como el hielo más profundo. Y su piel brillaba con una luz fría y perfecta.

Kay la vio desde la calle y no pudo moverse. Estaba hipnotizado.

La Reina descendió, lo miró, y le dio un beso en la frente.

Ese beso hizo que Kay olvidara todo. Olvidó a Gerda. Olvidó las rosas. Olvidó la risa y el calor y los libros y los juegos.

Y subió al trineo con ella.

Y se fueron volando hacia el norte, hacia el palacio de hielo eterno, entre la tormenta y las estrellas frías.`,
  },

  'section-06-search': {
    title: 'Capítulo V — Gerda parte en su búsqueda',
    text: `Cuando Gerda se enteró de que Kay había desaparecido, todos decían que quizás se había caído al río. Pero Gerda no lo creía.

Ella sabía, con toda la fuerza de su corazón, que Kay estaba vivo.

Así que una mañana de primavera, cuando el río empezó a deshelarse, Gerda hizo algo muy valiente.

Fue al río, se subió a un bote de madera y le habló al agua:
Río, llévame hasta donde esté Kay. Te daré mis zapatos rojos, los más bonitos que tengo, si me ayudas a encontrarlo.

Y el río la escuchó.

El bote empezó a moverse suavemente, llevándola lejos del pueblo, lejos de su casa, lejos de todo lo que conocía.

Gerda no tenía miedo. Tenía algo mucho más poderoso que el miedo. Tenía amor. Y ese amor la llevaría más lejos de lo que ella imaginaba.`,
  },

  'section-07-garden': {
    title: 'Capítulo VI — El Jardín Mágico',
    text: `El río llevó a Gerda hasta una orilla donde había un jardín tan hermoso que parecía imposible.

Rosas más grandes que su cabeza. Girasoles tan altos como árboles. Mariposas de todos los colores bailando en el aire. Y una casita con techo de paja cubierta de flores de todos los colores.

En la puerta estaba una anciana de pelo blanco, con sombrero de flores y bastón de madera con enredaderas.

¡Bienvenida, querida!, dijo con voz dulce como la miel. Quédate conmigo. Aquí hay flores que cantar historias y pasteles que saben a sueños.

Y Gerda se quedó.

Pero la anciana era una bruja buena que amaba tanto a Gerda que no quería que se fuera. Así que hizo algo: peinó el pelo de Gerda con un peine mágico y le hizo olvidar a Kay.

Los días pasaban. Gerda jugaba entre las flores. Pero algo en su corazón, algo muy pequeño, no olvidaba del todo.

Un día vio una rosa roja y de repente recordó. Recordó las rosas del tejado. Recordó a Kay.

Y salió corriendo del jardín mágico, hacia el mundo frío, a seguir buscando a su amigo.`,
  },

  'section-08-crow': {
    title: 'Capítulo VII — El Cuervo Sabio',
    text: `Gerda caminó y caminó hasta llegar a un gran bosque. Allí se encontró con un cuervo muy elegante, con una pequeña corona dorada torcida en la cabeza y un lacito rojo en el cuello.

El cuervo la miró con sus ojos dorados muy inteligentes, ladeó la cabeza y dijo:

Hmmm. Una niña sola en el bosque. Interesante. Muy interesante.

Gerda le contó todo sobre Kay. El cuervo lo pensó mucho y dijo que en el castillo real cercano había un príncipe que se parecía mucho a la descripción de Kay. ¡Quizás era él!

Gerda corrió al castillo con el corazón latiendo muy fuerte.

Pero cuando conoció al príncipe, no era Kay.

La princesa del castillo, una niña muy dulce de pelo oscuro y corona dorada, se emocionó mucho con la historia de Gerda.

Eres la persona más valiente que he conocido, le dijo. Y para que puedas seguir tu camino, te regalo mi abrigo más cálido, mis guantes más suaves y mi trineo dorado.

Gerda siguió adelante. Con ropa nueva, el corazón lleno de gratitud, y más determinada que nunca.`,
  },

  'section-09-robber': {
    title: 'Capítulo VIII — La Niña Ladrona',
    text: `Pero el viaje de Gerda no fue fácil.

En medio del bosque, unos bandidos pararon su trineo dorado. Eran ruidosos y salvajes. Gerda sintió miedo por primera vez.

Pero entonces apareció una niña. Era la hija de la jefa de los bandidos. Tenía el pelo rizado y oscuro, un abrigo de colores hecho de retazos de tela, y los ojos más curiosos e inteligentes que Gerda había visto.

¡Es mía!, dijo la niña ladrona señalando a Gerda. ¡Nadie la toca!

Y aunque al principio parecía brusca y salvaje, la niña ladrona escuchó la historia de Gerda con los ojos muy abiertos. Y algo en su corazón duro se ablandó un poco.

Tienes un amigo que vale mucho, dijo por fin. Y tú también vales mucho por buscarlo así.

Entonces hizo algo increíble. Le dio su reno más fuerte y más rápido, el que más quería.

Te llevará al norte, al palacio de la Reina de las Nieves. Es el único camino.

Y Gerda partió sobre el reno veloz, hacia el norte, hacia el frío, hacia Kay.`,
  },

  'section-10-storm': {
    title: 'Capítulo IX — La Tormenta del Norte',
    text: `El reno corría más rápido que el viento. Pero cuanto más al norte llegaban, más fría y terrible se volvía la tormenta.

La nieve caía en remolinos enormes. El viento aullaba como un lobo enfadado. El frío era tan intenso que quemaba los pómulos y helaba las pestañas.

Gerda temblaba. Pero no paraba.

¡Sigue!, le decía al reno. ¡Un poco más!

El reno galopaba con todas sus fuerzas, levantando nubes de nieve blanca con cada zancada.

En el horizonte, apenas visible entre la tormenta, brillaba algo. Algo enorme. Algo hecho de hielo y luz fría.

El palacio de la Reina de las Nieves.

Gerda lo vio y sintió algo extraño en el pecho. No era miedo. Era determinación. Pura y ardiente como una llama en medio de todo ese hielo.

Kay estaba ahí dentro. Y ella iba a entrar.`,
  },

  'section-11-palace': {
    title: 'Capítulo X — El Palacio de Hielo',
    text: `El palacio de la Reina de las Nieves era el edificio más grande y más frío que Gerda había visto jamás.

Sus torres llegaban hasta las nubes. Sus paredes eran de hielo azul transparente, tan gruesas que por ellas no pasaba ningún calor del mundo. Sus ventanas eran de viento congelado.

El reno se detuvo ante la entrada y bajó la cabeza.

No puedo entrar contigo, dijo con voz triste. Aquí acaba mi camino.

Gerda lo abrazó con fuerza, le dio un beso entre los cuernos, y caminó sola hacia la puerta enorme de hielo.

El frío era como un muro. Cada paso costaba el doble. El viento empujaba hacia atrás.

Pero Gerda seguía. Un paso. Otro paso. Otro más.

Y cuando el frío intentaba quitarle el aliento, ella pensaba en Kay. En su risa. En las rosas del tejado. En todos los días felices.

Y ese recuerdo la calentaba por dentro más que cualquier abrigo.

Entró al palacio.`,
  },

  'section-12-prisoner': {
    title: 'Capítulo XI — Kay Prisionero',
    text: `El interior del palacio era un silencio perfecto y helado.

El suelo era un lago congelado oscuro, tan liso como un espejo. Las paredes brillaban con una luz azul y fría. El techo estaba tan lejos que no se veía.

Y en el centro de todo ese hielo y ese silencio, estaba Kay.

Estaba sentado en el suelo frío, moviendo trozos de hielo de un lado a otro. Sus dedos estaban azules de frío. Sus ojos, sus ojos eran vacíos. Como si alguien hubiera apagado la luz que tenían dentro.

Intentaba formar una palabra con los trozos de hielo. La misma palabra una y otra vez: Eternidad. La Reina le había prometido que si formaba esa palabra, le daría el mundo entero y un par de patines nuevos.

Pero sus dedos congelados no obedecían. Y su mente vacía no recordaba.

No recordaba las rosas. No recordaba el jardín. No recordaba a Gerda.

No recordaba nada.`,
  },

  'section-13-tears': {
    title: 'Capítulo XII — Las Lágrimas Mágicas',
    text: `Gerda lo vio y corrió hacia él.

¡Kay! ¡Kay, soy yo, Gerda! ¡He venido a buscarte!

Kay la miró. La miró como se mira a un extraño. Sin reconocerla.

Gerda sintió que el corazón se le rompía. Pero no paró.

Lo abrazó con toda su fuerza. Lo abrazó como abraza quien ha viajado por todo el mundo buscando a alguien. Lo abrazó llorando.

Sus lágrimas eran calientes. Calientes de verdad, calientes de amor. Y cayeron sobre el pecho de Kay.

Y algo ocurrió.

El hielo empezó a derretirse. El fragmento del espejo malvado, ese trocito invisible que vivía en el corazón de Kay desde aquel día lejano, se calentó, se encogió, y desapareció.

Kay parpadeó.

Miró a Gerda. La miró de verdad esta vez.

Y sus ojos volvieron a tener luz.

¡Gerda!, dijo con voz rota. ¡Gerda, eres tú!

Y él también lloró. Y sus lágrimas arrastraron el último trozo de espejo que quedaba en su ojo.

Se abrazaron en medio del palacio de hielo que empezaba a derretirse a su alrededor. Y el amor fue más fuerte que todo el frío del mundo.`,
  },

  'section-queen-defeated': {
    title: 'Capitulo XIII — La Reina Vencida',
    text: `La Reina de las Nieves sintio algo que nunca habia sentido. Algo caliente dentro de su pecho de hielo.

Era el amor. El amor de Gerda por Kay, tan fuerte y tan puro que ni todo el hielo del mundo podia contra el.

La Reina los miro. Miro a Gerda, tan pequena pero tan valiente. Miro a Kay, con los ojos llenos de lagrimas calientes.

Que es esto que siento, susurro la Reina.

Y entonces empezo a brillar. Su cuerpo de hielo se fue volviendo transparente, como la escarcha cuando sale el sol.

Lo siento, dijo Gerda. Pero Kay tiene que volver a casa.

La Reina no dijo nada mas. Sonrio por primera vez, una sonrisa triste pero libre. Y se fue deshaciendo en el viento del norte, como copos de nieve que vuelven al cielo.

El palacio crujo. Las paredes de hielo empezaron a derretirse. Flores brotaron entre las grietas.

Y donde antes solo habia frio, ahora habia luz.`,
  },

  'section-14-finale': {
    title: 'Capitulo XIV — Final Feliz',
    text: `Salieron del palacio tomados de la mano.

El reno los esperaba fuera, dando saltitos de alegría en la nieve. Los llevó de vuelta al sur, hacia el calor, hacia casa.

En el camino, el invierno fue quedándose atrás. La nieve se fue convirtiendo en lluvia suave. La lluvia suave en sol de primavera.

Y cuando llegaron a su calle, a sus casas vecinas, algo maravilloso ocurrió.

Las rosas del tejado, las que Kay había dicho que eran feas y aburridas cuando tenía el corazón de hielo, estaban floreciendo. Más rojas y más hermosas que nunca.

Kay las miró y sonrió. Una sonrisa de verdad, caliente y llena de luz.

Son las más bonitas del mundo entero, dijo.

Y Gerda supo que su Kay había vuelto. El de verdad. El de siempre.

Se sentaron juntos entre las flores, como hacían de pequeños. Y aunque los dos habían crecido un poco durante ese largo viaje, en ese momento se sintieron exactamente igual que antes.

Felices. Completamente felices. Como solo pueden serlo los mejores amigos del mundo.

Y así termina este cuento. Pero el amor de Gerda y Kay, ese no termina nunca.

Fin.`,
  },
};

const SECTION_IDS = Object.keys(NARRATIONS);

// ─────────────────────────────────────────────
// HOOK — Web Speech API
// ─────────────────────────────────────────────
function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    setIsSupported(true);

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        voices.find(v => v.lang === 'es-ES') ??
        voices.find(v => v.lang === 'es-MX') ??
        voices.find(v => v.lang.startsWith('es')) ??
        null;
    };

    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pickVoice);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    if (voiceRef.current) utterance.voice = voiceRef.current;

    utterance.onstart = () => { setIsPlaying(true); setIsPaused(false); };
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onpause = () => setIsPaused(true);
    utterance.onresume = () => setIsPaused(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  return { speak, pause, resume, stop, isPlaying, isPaused, isSupported };
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL — StoryNarrator
// ─────────────────────────────────────────────
export function StoryNarrator() {
  const { speak, pause, resume, stop, isPlaying, isPaused, isSupported } = useSpeech();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);
  const prevSectionRef = useRef(SECTION_IDS[0]);
  const rafRef = useRef<number>(0);

  // Detección de sección activa via scroll + getBoundingClientRect
  // (mismo approach que Narrator.tsx — funciona con secciones pinneadas de GSAP)
  useEffect(() => {
    const sections: { id: string; el: HTMLElement }[] = [];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) sections.push({ id, el });
    }
    if (sections.length === 0) return;

    const checkActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      let closest: string | null = null;
      let closestDist = Infinity;

      for (const { id, el } of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          const sectionCenter = (rect.top + rect.bottom) / 2;
          const dist = Math.abs(sectionCenter - viewportCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closest = id;
          }
        }
      }

      if (!closest) {
        for (const { id, el } of sections) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = (rect.top + rect.bottom) / 2;
          const dist = Math.abs(sectionCenter - viewportCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closest = id;
          }
        }
      }

      if (closest) setActiveSection(closest);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(checkActiveSection);
    };

    checkActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Auto-stop cuando cambia de sección
  useEffect(() => {
    if (activeSection !== prevSectionRef.current) {
      if (isPlaying || isPaused) stop();
      prevSectionRef.current = activeSection;
    }
  }, [activeSection, isPlaying, isPaused, stop]);

  const narration = NARRATIONS[activeSection];

  const handlePlay = useCallback(() => {
    if (!narration) return;
    if (isPaused) {
      resume();
    } else {
      speak(narration.text);
    }
  }, [narration, isPaused, resume, speak]);

  if (!isSupported) return null;

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-3"
        style={{ fontFamily: 'var(--font-kids, sans-serif)' }}
      >
        {/* Panel expandido */}
        {isExpanded && narration && (
          <div
            className="flex flex-col gap-3 rounded-2xl p-4 shadow-2xl"
            style={{
              background: 'rgba(2, 11, 36, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(186,230,253,0.2)',
              width: 'clamp(260px, 30vw, 340px)',
              animation: 'narratorSlideIn 0.3s ease',
            }}
          >
            {/* Título del capítulo */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-sky-400/70">
                  Narrando ahora
                </p>
                <p
                  className="font-semibold leading-tight text-sky-100"
                  style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}
                >
                  {narration.title}
                </p>
              </div>
              {/* Indicador de onda cuando reproduce */}
              {isPlaying && !isPaused && (
                <div className="mt-1 flex h-6 shrink-0 items-end gap-0.5">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-sky-400"
                      style={{
                        animation: `soundWave 0.8s ease-in-out ${i * 0.15}s infinite`,
                        height: `${8 + i * 4}px`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Preview del texto */}
            <p
              className="line-clamp-3 leading-relaxed text-sky-200/60"
              style={{ fontSize: '0.7rem' }}
            >
              {narration.text.trim().substring(0, 120)}...
            </p>

            {/* Controles */}
            <div className="flex items-center gap-2">
              {/* Play / Pause */}
              <button
                onClick={isPlaying && !isPaused ? pause : handlePlay}
                className="flex items-center justify-center rounded-xl text-white transition-all active:scale-95"
                style={{
                  background: isPlaying && !isPaused
                    ? 'rgba(56,189,248,0.3)'
                    : 'linear-gradient(135deg, rgba(56,189,248,0.4), rgba(99,102,241,0.4))',
                  border: '1px solid rgba(186,230,253,0.3)',
                  width: 44,
                  height: 44,
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}
                aria-label={isPlaying && !isPaused ? 'Pausar narración' : 'Reproducir narración'}
              >
                {isPlaying && !isPaused ? '⏸' : '▶'}
              </button>

              {/* Stop */}
              {(isPlaying || isPaused) && (
                <button
                  onClick={stop}
                  className="flex items-center justify-center rounded-xl text-sky-300/70 transition-all hover:text-sky-300 active:scale-95"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(186,230,253,0.15)',
                    width: 36,
                    height: 36,
                    fontSize: '0.9rem',
                  }}
                  aria-label="Detener narración"
                >
                  ⏹
                </button>
              )}

              {/* Estado */}
              <p className="ml-1 text-xs text-sky-300/50">
                {isPlaying && !isPaused
                  ? 'Reproduciendo...'
                  : isPaused
                  ? 'En pausa'
                  : 'Listo para narrar'}
              </p>
            </div>

            <p className="text-center text-sky-400/30" style={{ fontSize: '0.6rem' }}>
              La voz varía según tu navegador
            </p>
          </div>
        )}

        {/* Botón principal */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="relative flex items-center justify-center rounded-full text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
          style={{
            width: 56,
            height: 56,
            background: isPlaying
              ? 'linear-gradient(135deg, #0ea5e9, #6366f1)'
              : 'linear-gradient(135deg, rgba(14,165,233,0.7), rgba(99,102,241,0.7))',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(186,230,253,0.4)',
            boxShadow: isPlaying
              ? '0 0 30px rgba(56,189,248,0.5), 0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(0,0,0,0.4)',
            animation: isPlaying ? 'narratorPulse 2s ease-in-out infinite' : 'none',
            fontSize: '1.4rem',
          }}
          aria-label="Narrador del cuento"
        >
          🎙️
          {isPlaying && (
            <span
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-white"
              style={{ fontSize: '0.5rem', fontWeight: 'bold' }}
            >
              ▶
            </span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes narratorSlideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes narratorPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(56,189,248,0.5), 0 8px 32px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 0 50px rgba(56,189,248,0.8), 0 8px 32px rgba(0,0,0,0.4); }
        }
        @keyframes soundWave {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50%       { transform: scaleY(1);   opacity: 1;   }
        }
      `}</style>
    </>
  );
}
