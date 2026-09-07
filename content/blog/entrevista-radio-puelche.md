---
titulo: "Waiki en Radio Puelche 90.5 FM"
slug: entrevista-radio-puelche
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
fuente: "Radio Puelche 90.5 FM"
resumen: "Carolina Espinoza y Ernesto Fuentes en el estudio de Radio Puelche 90.5 FM, hablando de los equipos de calefacción a pellet que fabrican."
# Este sí es video real —la entrevista grabada en el estudio— así que se
# publica como video, con `+faststart` para que empiece a reproducir sin
# descargar el archivo completo. Pesa 14,9 MB, bajo el techo de 25 MiB por
# archivo de Cloudflare.
#
# Recortado a 576 × 324 desde y=350, que es **exactamente 16:9**: la emisión
# original era apaisada y el marco vertical (576 × 1024) se le agregó después
# para redes. Recortar acá no mutila el video, lo devuelve a su forma.
#
# La primera pasada solo quitó la franja de arriba y dejó 576 × 674, con un
# 41% de negro abajo. El error fue medir con cuatro muestras de `cropdetect`
# en vez del video completo: una cayó justo en el único tramo con contenido
# bajo y=324 y la tomé por representativa. El barrido completo (14.142
# muestras) dice otra cosa:
#
#   - 99,3% del tiempo el contenido termina en y=324.
#   - 0,7% (t = 29,3s a 32,8s, 3,5 segundos) llega a y=550.
#   - Bajo y=550 no hay absolutamente nada, nunca.
#
# ⚠️ Lo que se pierde con este recorte son esos 3,5 segundos de un rótulo
# promocional del propio programa ("Te invitamos a recordar nuestra
# entrevista"), sobreimpreso fuera del cuadro original. No es contenido de la
# entrevista: es un añadido para redes, igual que el marco vertical.
#
# El recorte se hizo a raíz de una pregunta de Ignacio (07-09-2026) sobre por
# qué no se había quitado la franja de abajo, y el criterio es que no vale
# sostener un 41% de pantalla negra durante 468 segundos para conservar un
# rótulo que dura 3,5. Si esos segundos importan, se revierte recodificando
# desde `imagenes-cliente/videos-noticias/` con `crop=576:550:0:350` — que es
# el recorte máximo sin pérdida alguna, porque bajo y=550 el video está vacío
# de principio a fin.
#
# ⚠️ El zócalo del programa lleva quemada en pantalla la marca anterior de la
# empresa (AUDITORIA §6.13), junto a los nombres de Carolina y Ernesto. No se
# puede quitar: es material de archivo emitido por el medio, no una foto
# nuestra que se pueda reemplazar. Es la única parte del sitio donde esa
# marca sigue visible, y por eso no se escribe acá tal cual — el guardián de
# `lib/contenido/guardia.test.ts` vigila que no aparezca en el código ni en
# el contenido. Ver PENDIENTES.md.
medios:
  - tipo: video
    archivo: /medios/entrevista-radio-puelche.mp4
    titulo: "Entrevista en el estudio de Radio Puelche"
    poster: /medios/portada-radio-puelche.jpg
    duracion: "7:51"
tags:
  - prensa
  - entrevistas
publicado: true
---

Carolina Espinoza y Ernesto Fuentes pasaron por el estudio de Radio Puelche 90.5 FM para hablar de los equipos de calefacción a pellet que fabrican: cómo funcionan, por qué son de tiro natural y qué significa que no dependan de la electricidad.

La entrevista completa está arriba.
