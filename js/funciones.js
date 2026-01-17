
/*
  ARCHIVO: funciones.js
  
  Propósito: Interactividad y comportamientos dinámicos del portfolio
  
  FUNCIONALIDADES PRINCIPALES:
  1. Menú móvil - toggle (abrir/cerrar) menú en pantallas pequeñas
  2. Animación de letras punk - cambio de imágenes al hover en menu links
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



// Hover en indice__enlace para mostrar solo la imagen correspondiente
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded disparado');
    
    const indiceEnlaces = document.querySelectorAll('.indice__enlace');
    const ventana = document.querySelector('.ventana');
    
    console.log('indiceEnlaces encontrados:', indiceEnlaces.length);
    console.log('ventana encontrada:', ventana);

    indiceEnlaces.forEach((enlace, index) => {
        console.log(`Configurando enlace ${index}:`, enlace.textContent);
        
        enlace.addEventListener('mouseenter', () => {
            console.log('HOVER en:', enlace.textContent);
            
            // Obtener el href del enlace
            const href = enlace.getAttribute('href');
            console.log('href:', href);
            
            // Mapeo de href a clase de ventana__item
            const mapeo = {
                '/fae': 'fae',
                '/comadeja': 'comadeja',
                '/vernalizacion': 'ilustracion',
                '/cortocircuito': 'cortocircuito',
                '/the-magnus-archives': 'comics'
            };
            
            const clase = mapeo[href];
            console.log('clase mapeada:', clase);
            
            if (clase && ventana) {
                console.log('Aplicando estilos...');
                // Oscurecer todos los items
                ventana.querySelectorAll('.ventana__item').forEach(item => {
                    item.style.opacity = '0';
                    item.style.filter = 'grayscale(1)';
                });
                
                // Mostrar solo el correspondiente
                const itemActivo = ventana.querySelector('.' + clase);
                console.log('itemActivo encontrado:', itemActivo);
                if (itemActivo) {
                    itemActivo.style.opacity = '1';
                    itemActivo.style.filter = 'none';
                    console.log('itemActivo mostrado');
                }
            } else {
                console.log('NO se cumple condición: clase=' + clase + ', ventana=' + ventana);
            }
        });
        
        enlace.addEventListener('mouseleave', () => {
            console.log('Mouse leave:', enlace.textContent);
            if (ventana) {
                // Restaurar opacidad
                ventana.querySelectorAll('.ventana__item').forEach(item => {
                    item.style.opacity = '';
                    item.style.filter = '';
                });
            }
        });

    });
});


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

// Archivo.html - Lógica combinada hover y auto-loop responsive*/

document.addEventListener('DOMContentLoaded', () => {
    const filas = document.querySelectorAll('.archivo__fila');
    const fotoArchivo = document.querySelector('.archivo__foto');
    
    let intervaloArchivo = null;
    let indiceActual = 0;
    // 1. Función para actualizar la imagen
    const actualizarImagen = (elemento) => {
        if (!elemento) return;
        const nuevaImagen = elemento.getAttribute('data-image');
        if (nuevaImagen && fotoArchivo && fotoArchivo.src !== nuevaImagen) {
            fotoArchivo.src = nuevaImagen;
        }
    };

    // 2. Para Escritorio
    filas.forEach(fila => {
        fila.addEventListener('mouseenter', () => {
            actualizarImagen(fila);
            indiceActual = Array.from(filas).indexOf(fila);
        });
    });

    // 3. Para Tablet/Móvil
    const iniciarAutoLoop = () => {
        if (!intervaloArchivo) {
            intervaloArchivo = setInterval(() => {
                indiceActual = (indiceActual + 1) % filas.length;
                actualizarImagen(filas[indiceActual]);
            }, 2000); 
        }
    };

    const detenerAutoLoop = () => {
        clearInterval(intervaloArchivo);
        intervaloArchivo = null;
    };

    // Control de Resposive (Breakpoint 960px)
    const gestionarComportamiento = () => {
        if (window.innerWidth <= 960) {
            iniciarAutoLoop();
        } else {
            detenerAutoLoop();
        }
    };

    gestionarComportamiento();
    window.addEventListener('resize', gestionarComportamiento);
});

        const animationInterval = animarLetras(document.querySelector("#marcador-palabra img"), [
            'imagenes/punk_letters/cargando_01.png',
            'imagenes/punk_letters/cargando_02.png',
            'imagenes/punk_letters/cargando_03.png'
        ]);


// --- Loader ---
const marcador = document.querySelector("#marcador--palabra img");
if (marcador) {
    animarLetras(marcador, [
        'imagenes/punk_letters/cargando_01.png',
        'imagenes/punk_letters/cargando_02.png',
        'imagenes/punk_letters/cargando_03.png'
    ]);
}

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.remove("pos-centro");
            loader.classList.add("pos-abajo");
            document.body.classList.remove("loading");
        }, 1200);
    }
});

// --- Navegación entre páginas ---
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hostname === window.location.hostname && !this.hash && this.target !== "_blank") {
            const urlDestino = this.href;
            const loader = document.getElementById("loader");

            if (loader) {
                e.preventDefault();
                loader.style.transition = "none";
                loader.classList.remove("pos-abajo");
                loader.classList.add("pos-arriba");

                setTimeout(() => {
                    loader.style.transition = "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)";
                    loader.classList.remove("pos-arriba");
                    loader.classList.add("pos-centro");
                }, 50);

                setTimeout(() => {
                    window.location.href = urlDestino;
                }, 650);
            }
        }
    });
});