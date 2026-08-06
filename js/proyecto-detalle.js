/* jshint esversion: 6 */

(function () {
    const DATA_URL = 'data/projects.json';

    function getSlugFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('slug');
    }

    function escapeHtml(text) {
        const tmp = document.createElement('div');
        tmp.textContent = text || '';
        return tmp.innerHTML;
    }

    function renderGallery(project) {
        const galeria = document.querySelector('[data-project-gallery]');
        if (!galeria) return;

        const images = Array.isArray(project.gallery) ? project.gallery : [];
        galeria.innerHTML = images.map((src) => {
            const sourcePath = typeof src === 'string' ? src : (src && src.image ? src.image : '');
            const safeSrc = escapeHtml(sourcePath);
            const alt = escapeHtml(project.title || project.shortTitle || 'Proyecto');
            return `<img loading="lazy" decoding="async" class="trabajos__imagen" src="${safeSrc}" alt="${alt}">`;
        }).join('');
    }

    function renderFicha(project) {
        const ficha = document.querySelector('[data-project-ficha]');
        if (!ficha) return;

        ficha.innerHTML = `
            <span>TIPO</span>
            <span>${escapeHtml(project.type || '')}</span>
            <span>DESCRIPCION</span>
            <span>${escapeHtml(project.detailDescription || '')}</span>
            <span>TAMANO</span>
            <span>${escapeHtml(project.size || '')}</span>
            <span>ANO</span>
            <span>${escapeHtml(project.year || '')}</span>
        `;
    }

    function renderCTA(project) {
        const cta = document.querySelector('[data-project-cta]');
        if (!cta) return;

        if (!project.ctaUrl || !project.ctaLabel) {
            cta.innerHTML = '';
            return;
        }

        cta.innerHTML = `<a href="${escapeHtml(project.ctaUrl)}" class="enlace" target="_blank" rel="noopener noreferrer">${escapeHtml(project.ctaLabel)}</a>`;
    }

    function renderProject(project) {
        document.title = `Ermes Olea - ${project.shortTitle || 'Proyecto'}`;

        const categoria = document.querySelector('[data-project-category]');
        const titulo = document.querySelector('[data-project-title]');
        const texto = document.querySelector('[data-project-text]');
        const logo = document.querySelector('[data-project-logo]');

        if (categoria) categoria.textContent = `${project.category || ''}//`;
        if (titulo) titulo.textContent = project.title || '';
        if (texto) texto.textContent = project.detailText || '';

        if (logo) {
            if (project.logo) {
                logo.src = project.logo;
                logo.alt = `Logo del proyecto ${project.shortTitle || project.title || ''}`;
            } else {
                logo.remove();
            }
        }

        renderGallery(project);
        renderFicha(project);
        renderCTA(project);
    }

    function renderError(message) {
        const titulo = document.querySelector('[data-project-title]');
        const texto = document.querySelector('[data-project-text]');
        const galeria = document.querySelector('[data-project-gallery]');

        if (titulo) titulo.textContent = 'Proyecto no encontrado';
        if (texto) texto.textContent = message;
        if (galeria) galeria.innerHTML = '';
    }

    async function initProjectDetail() {
        const slug = getSlugFromUrl();
        if (!slug) {
            renderError('Falta el parametro slug en la URL.');
            return;
        }

        try {
            const response = await fetch(DATA_URL, { cache: 'no-store' });
            if (!response.ok) {
                renderError('No se pudo cargar la base de proyectos.');
                return;
            }

            const data = await response.json();
            const projects = Array.isArray(data.projects) ? data.projects : [];
            const project = projects.find((item) => item.slug === slug && item.detailMode === 'dynamic');

            if (!project) {
                renderError('Ese proyecto no existe en data/projects.json o no es de tipo dynamic.');
                return;
            }

            renderProject(project);
        } catch (error) {
            renderError('Ha ocurrido un error al cargar el proyecto.');
        }
    }

    document.addEventListener('DOMContentLoaded', initProjectDetail);
})();
