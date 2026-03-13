# La Reina de las Nieves - Cuento Interactivo Infantil

Cuento animado e interactivo basado en el clasico de **Hans Christian Andersen**, desarrollado como experiencia web inmersiva para publico infantil (a partir de 1 año).

Acompana a **Gerda** en su valiente viaje para rescatar a su mejor amigo **Kay**, atrapado por la **Reina de las Nieves**. Atraviesa jardines magicos, conoce cuervos sabios, ninas ladronas y tormentas de nieve en esta aventura donde el amor verdadero puede derretir el corazon mas frio.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| **React 19** | Interfaz de usuario con componentes interactivos |
| **Next.js 16** | Framework con SSR, optimizacion de imagenes y SEO |
| **GSAP** | Animaciones cinematograficas (ScrollTrigger, timelines) |
| **Lenis.js** | Scroll suave y controlado entre secciones |
| **Tailwind CSS 4** | Sistema de diseno responsive |
| **TypeScript** | Tipado estatico |

## Estructura del cuento

El cuento se compone de **15 secciones** a pantalla completa (100vw x 100vh) con navegacion por scroll:

1. **Intro** - Aurora boreal y titulo con efecto de cristalizacion
2. **El Jardin Feliz** - Gerda y Kay jugando entre rosas interactivas
3. **El Espejo Magico** - El espejo del diablo se rompe
4. **El Corazon de Hielo** - Un fragmento hiere a Kay
5. **La Reina de las Nieves** - La Reina se lleva a Kay
6. **La Busqueda** - Gerda sale a buscar a Kay
7. **El Jardin Magico** - La anciana hechicera y su jardin encantado
8. **El Cuervo Sabio** - El cuervo y la princesa ayudan a Gerda
9. **La Nina Ladrona** - La nina ladrona le da un reno a Gerda
10. **La Tormenta** - Gerda y el reno cruzan la ventisca
11. **El Palacio de Hielo** - Llegan al palacio de la Reina
12. **El Prisionero** - Gerda encuentra a Kay
13. **Las Lagrimas** - Las lagrimas de Gerda derriten el hielo
14. **La Reina Vencida** - La Reina se desvanece ante el amor verdadero
15. **Final Feliz** - Gerda y Kay vuelven a casa

## Caracteristicas interactivas

- **Rosas tocables** en el jardin que reaccionan con sonido y animacion
- **Titulo con explosion de copos** al pasar el raton por las letras
- **Personajes con efecto pop-out** al hacer hover
- **Bocadillos de dialogo** animados entre personajes
- **Narrador Lumi** que guia la historia seccion a seccion
- **Narrador de voz** con Web Speech API (lectura en voz alta)
- **Sonido ambiental** en escenas del jardin y el bosque
- **Efectos climaticos**: nieve, tormenta, petalos, corazones flotantes
- **Particulas de cursor** que siguen al raton con copos de nieve

## Responsive

Disenado para funcionar en **Desktop** y **Tablet** con soporte tactil completo.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Despliegue

Desplegado en **Vercel** con repositorio publico en GitHub.

---

Proyecto academico - Diseno de Interfaces Web
