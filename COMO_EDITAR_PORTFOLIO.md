# Como editar el portfolio sin saber codigo

Este portfolio ahora lee los proyectos desde un unico archivo:

- data/projects.json

Tambien tiene una pagina de detalle dinamica:

- proyecto.html?slug=tu-slug

Y un panel CMS base:

- admin/index.html

## Opcion A: Edicion visual con CMS (recomendada)

1. Publica el sitio en Netlify.
2. Activa Identity en Netlify.
3. Activa Git Gateway en Netlify Identity.
4. Entra en /admin/.
5. Edita el bloque "Proyectos" con formulario.
6. Guarda y publica.

Con eso podras:
- Modificar textos y miniaturas de proyectos existentes.
- Cambiar enlaces.
- Subir imagenes.
- Anadir proyectos nuevos.

## Opcion B: Edicion directa del JSON

Abre data/projects.json y edita un objeto dentro de "projects".

Campos clave:
- slug: identificador unico, sin espacios (ej: mi-proyecto-2026)
- category: EDITORIAL | ILUSTRACIONES | DIY
- shortTitle: titulo en Archivo
- summary: descripcion corta en Archivo
- version: numero mostrado en Archivo
- thumbnail: imagen de preview en Archivo
- detailMode:
  - dynamic: abre la pagina proyecto.html con galeria y textos
  - external: abre externalUrl (Instagram, Behance, etc.)

Si detailMode = dynamic, rellena tambien:
- title
- year
- type
- size
- detailText
- detailDescription
- logo
- ctaLabel
- ctaUrl
- gallery (lista de imagenes)

## Plantilla minima para proyecto nuevo (dynamic)

{
  "slug": "mi-proyecto",
  "category": "EDITORIAL",
  "shortTitle": "MI PROYECTO",
  "title": "MI PROYECTO 2026",
  "summary": "Resumen corto del proyecto",
  "version": "0.1.3",
  "thumbnail": "imagenes/trabajos/mi-proyecto/cover.jpg",
  "detailMode": "dynamic",
  "year": "2026",
  "type": "LIBRO",
  "size": "20 x 15 cm",
  "detailText": "Texto principal",
  "detailDescription": "Descripcion tecnica",
  "logo": "imagenes/trabajos/mi-proyecto/logo.png",
  "ctaLabel": "VER PROYECTO",
  "ctaUrl": "https://...",
  "gallery": [
    "imagenes/trabajos/mi-proyecto/01.jpg",
    "imagenes/trabajos/mi-proyecto/02.jpg"
  ]
}

## Recomendaciones de rendimiento para imagenes

- Usa .jpg para fotos y .png solo si necesitas transparencia.
- Exporta imagenes a un ancho maximo de 1800px para galerias.
- Intenta mantener cada imagen por debajo de 350 KB cuando sea posible.
- Para portada/thumbnail, intenta estar por debajo de 220 KB.
