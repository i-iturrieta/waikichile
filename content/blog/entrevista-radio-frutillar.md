---
titulo: "Waiki en Radio Frutillar: de Frutillar a más de 5.000 hogares"
slug: entrevista-radio-frutillar
# ⚠️ Esta nota estuvo publicada un día atribuida a **Disfruta Llanquihue**, y
# la atribución era incorrecta. El dueño lo corrigió el 08-09-2026: "ese fue
# en radio frutillar". El malentendido tiene una explicación concreta y vale
# dejarla escrita para que nadie la reintroduzca: la imagen que llegó junto a
# los audios es la placa de **Disfruta Llanquihue**, que publicó un reportaje
# sobre la entrevista. La placa es de ellos; la entrevista es de Radio
# Frutillar.
#
# El archivo, el slug y los dos .m4a se renombraron a `radio-frutillar`, y
# `/blog/entrevista-disfruta-llanquihue/` quedó como 301 en `public/_redirects`.
# `portada-disfruta-llanquihue.jpg` **conserva su nombre a propósito**: la
# imagen sí es de Disfruta Llanquihue, y renombrarla volvería a mezclar las
# dos cosas que este cambio vino a separar.
#
# `fecha` acá NO es la fecha de emisión: los archivos llegaron sin metadatos
# y ninguno la trae en pantalla. Es la fecha de incorporación al sitio, y su
# único trabajo es ordenar la colección — sin ella el artículo no sabría
# dónde ubicarse entre los demás.
#
# Por eso va con `ocultarFecha: true` (decisión de Ignacio, 07-09-2026): una
# fecha arriba de una nota de prensa se lee como la fecha de la entrevista, y
# esa no la sabemos. Antes que mostrar una que engaña, no se muestra ninguna.
fecha: "2026-09-07"
ocultarFecha: true
fuente: "Radio Frutillar"
resumen: "Carolina Espinoza y Ernesto Fuentes conversan con Radio Frutillar sobre cómo nació Waiki en Frutillar y cómo llegó a calefaccionar hogares dentro y fuera de Chile."
# La entrevista llegó como dos archivos .mp4, pero su pista de video es una
# placa fija con el titular del programa: es audio. Se extrajo el audio a
# .m4a (AAC 64 kbps mono, que es de sobra para voz hablada) y la placa se
# conserva como `poster` para que el reproductor tenga contexto. Los 30,8 MB
# del original no habrían pasado el techo de 25 MiB por archivo de
# Cloudflare; el audio pesa 7,8 MB.
medios:
  - tipo: audio
    archivo: /medios/entrevista-radio-frutillar-1.m4a
    titulo: "Entrevista completa — primera parte"
    poster: /medios/portada-disfruta-llanquihue.jpg
    duracion: "15:58"
  - tipo: audio
    archivo: /medios/entrevista-radio-frutillar-2.m4a
    titulo: "Entrevista completa — segunda parte"
    duracion: "6:04"
tags:
  - prensa
  - entrevistas
publicado: true
---

Radio Frutillar entrevistó a Carolina Espinoza y Ernesto Fuentes sobre la historia de Waiki: cómo empezó el proyecto en Frutillar y cómo los equipos de tiro natural a pellet terminaron calefaccionando hogares dentro y fuera del país.

La conversación está dividida en dos partes, arriba. Es audio: puedes escucharla mientras haces otra cosa.

## También en Disfruta Llanquihue

Disfruta Llanquihue publicó un reportaje sobre la entrevista, titulado **"Desde Frutillar a más de 5.000 hogares en cuatro países: la historia de éxito e innovación de Waiki"**. Se puede leer en [su publicación de Instagram](https://www.instagram.com/p/Dayxtx1O5In/).
