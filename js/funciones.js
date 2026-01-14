
/*
  ARCHIVO: funciones.js
  
  Propósito: Interactividad y comportamientos dinámicos del portfolio
  
  FUNCIONALIDADES PRINCIPALES:
  1. Menú móvil - toggle (abrir/cerrar) menú en pantallas pequeñas
  2. Animación de letras punk - cambio de imágenes al hover en menu links
  3. Rotación aleatoria de letras - efecto en textos del archivo
  4. Ordenar/desordenar - toggle de clases para grid principal
  5. Sobre interactivo - click para abrir/cerrar sobre de contacto
  6. Secciones interactivas - click para expandir/contraer (sobre mi)
*/

//desplegar menú en movil
const nav = document.querySelector(".menu");
const botonesSobre = document.querySelectorAll(".boton--abrir, .menu__boton--cerrar");


    botonesSobre.forEach(boton => {
        boton.addEventListener("click", () => {
            nav.classList.toggle("menu--desplegado");
            })
    });

//hover de enlaces de menu y animación letrtas landing page
const menuEnlaces = document.querySelectorAll(".menu__item a");

const punkImgsArchivo = [
 'imagenes/punk_letters/archivo_letras_01.svg',
    'imagenes/punk_letters/archivo_letras_02.svg',
    'imagenes/punk_letters/archivo_letras_03.svg'];

const punkImgsSobreMi = [
    'imagenes/punk_letters/sobremi_letras_01.svg',
    'imagenes/punk_letters/sobremi_letras_02.svg',
    'imagenes/punk_letters/sobremi_letras_03.svg'
];

const punkImgsContacto = [
    'imagenes/punk_letters/contacto_letras_01.svg',
    'imagenes/punk_letters/contacto_letras_02.svg',
    'imagenes/punk_letters/contacto_letras_03.svg'
];

const punkImagesSandrune = [
    'imagenes/landing/lg_sandrune_01.svg',
    'imagenes/landing/lg_sandrune_02.svg',
];


function animarLetras(img, imagenes) {

  if (!img || !imagenes || imagenes.length === 0) return null;

  let i = 0;
  const intervalo = setInterval(() => {

    if (!img || typeof img.src === 'undefined') {
      clearInterval(intervalo);
      return;
    }

    img.src = imagenes[i];
    i = (i + 1) % imagenes.length;
  }, 100);

  return intervalo;

}

function hoverMenu(enlace, imagenes) {
    let intervalo;
    const img = enlace.querySelector("img");
    const span = enlace.querySelector("span");

    enlace.addEventListener("mouseenter", () => {
        img.classList.add("menu__img--hover");
        span.classList.add("menu__span--hover");
        intervalo = animarLetras(img, imagenes);
    });

    enlace.addEventListener("mouseleave", () => {
        img.classList.remove("menu__img--hover");
        span.classList.remove("menu__span--hover");
        clearInterval(intervalo);
    });
}

hoverMenu(document.querySelector('.menu__link--archivo'), punkImgsArchivo);
hoverMenu(document.querySelector('.menu__link--sobremi'), punkImgsSobreMi);
hoverMenu(document.querySelector('.menu__link--contacto'), punkImgsContacto);

animarLetras(document.querySelector('.letras__img'), punkImagesSandrune);

//rotacion letras
const parrafos = document.querySelectorAll(".archivo__celda.archivo__celda--proyecto");

    parrafos.forEach(parrafo => {
    parrafo.innerHTML = parrafo.innerText.split('').map(letra => letra === ' ' ? ' ' : `<span class="archivo__celda--letra">${letra}</span>`).join('');

    const spans = parrafo.querySelectorAll('.archivo__celda--letra');
    spans.forEach(span => {
    span.style.display = 'inline-block';

    const rot = Math.floor(Math.random() * 21) - 10;
    const cambioTamaño = Math.random() * 0.2;
    const remactual = 0.4;

    span.style.transform = `rotate(${rot}deg)`;
    span.style.fontSize = `${remactual + cambioTamaño}rem`;
    });
    });

// ordenar/desordenar
const botonOrdenar = document.querySelector(".ventana__boton--ordenar");
const botonDesordenar = document.querySelector(".ventana__boton--desordenar");
const ventanaContenedor = document.querySelector(".ventana");
const itemsVentana = document.querySelectorAll(".ventana__item, .cinta");

if (botonOrdenar && botonDesordenar) {
    
    botonOrdenar.addEventListener("click", () => {
        ventanaContenedor.classList.add("ordenada"); 
    });

    botonDesordenar.addEventListener("click", () => {
        ventanaContenedor.classList.remove("ordenada");
    });
}


// click en el sobre de contacto.html
const sobre = document.querySelector(".sobre");
const cinta = document.querySelector(".sobre__cinta")

if (cinta && sobre) {
cinta.addEventListener('click', () => {
    sobre.classList.toggle('esta-abierto');
}); }


//función click secciones en sobremi.html
    const secciones = [
        { el: document.querySelector(".textosm"), nivel: 3 },
        { el: document.querySelector(".skills"), nivel: 2 },
        { el: document.querySelector(".experiencia"), nivel: 1 }
    ];

    secciones.forEach((seccion) => {
        if (!seccion.el) return;

        seccion.el.addEventListener("click", () => {
            const EstaEnfocada = seccion.el.classList.contains("seccion--enfocada");

            if (EstaEnfocada) {

                secciones.forEach(s => s.el.classList.remove("seccion--enfocada", "seccion--apartada"));
            } else {
                secciones.forEach(s => {

                    if (s.nivel > seccion.nivel) {
                        s.el.classList.add("seccion--apartada");
                        s.el.classList.remove("seccion--enfocada");
                    } else if (s.nivel === seccion.nivel) {
                        s.el.classList.add("seccion--enfocada");
                        s.el.classList.remove("seccion--apartada");
                    } else {
                        s.el.classList.remove("seccion--apartada", "seccion--enfocada");
                    }
                });
            }
        });
    });

   
    // Animación de movimiento aleatorio para imágenes

function animarBichos(selector, velocidad = 2) {
    const elementos = document.querySelectorAll(selector);
    const datosImagenes = [];

    elementos.forEach(el => {

        el.style.position = 'fixed';
        el.style.top = '0';
        el.style.left = '0';


        const xInicial = Math.random() * (window.innerWidth - el.offsetWidth);
        const yInicial = Math.random() * (window.innerHeight - el.offsetHeight);

        el.style.transform = `translate(${xInicial}px, ${yInicial}px) scale(1)`;

        const info = {
            el: el,
            x: xInicial,
            y: yInicial,
            horizontal: (Math.random() - 0.5) * velocidad,
            vertical: (Math.random() - 0.5) * velocidad,
            estaPausado: false
        };

        el.addEventListener('mouseenter', () => info.estaPausado = true);
        el.addEventListener('mouseleave', () => info.estaPausado = false);

        datosImagenes.push(info);
    });

    function actualizar() {
        datosImagenes.forEach(img => {
            if (!img.estaPausado) {
                img.x += img.horizontal;
                img.y += img.vertical;

                // Rebote en bordes
                if (img.x <= 0 || img.x + img.el.offsetWidth >= window.innerWidth) {
                    img.horizontal *= -1;
                }
                if (img.y <= 0 || img.y + img.el.offsetHeight >= window.innerHeight) {
                    img.vertical *= -1;
                }
            }

            const escalaActual = img.estaPausado ? 1.2 : 1;
            img.el.style.transform = `translate(${img.x}px, ${img.y}px) scale(${escalaActual})`;
            img.el.style.transition = 'transform 0.2s ease-out';
        });

        requestAnimationFrame(actualizar);
    }

    actualizar();
}

window.addEventListener('DOMContentLoaded', () => {
    animarBichos(".minibicho", 0.2);
});


document.addEventListener('DOMContentLoaded', () => {
    const zonaDibujo = document.querySelector('.dibujar');
    const botonCerrar = document.querySelector('.ventana__controles--boton-cerrar');

    // Al hacer clic en el área de dibujo, se expande
    zonaDibujo.addEventListener('click', (e) => {
        // Evitamos que se expanda si ya lo está o si clicamos específicamente en el lienzo para dibujar
        if (!zonaDibujo.classList.contains('expandido')) {
            zonaDibujo.classList.add('expandido');
        }
    });

    // Lógica para cerrar la ventana con el botón X
    botonCerrar.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el evento clic llegue al padre (.dibujar)
        zonaDibujo.classList.remove('expandido');
    });
});