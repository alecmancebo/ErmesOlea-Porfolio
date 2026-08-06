/* jshint esversion: 6 */

(function () {
    const DATA_URL = 'data/projects.json';

    function getProjectHref(project) {
        if (project.detailMode === 'external' && project.externalUrl) {
            return project.externalUrl;
        }

        if (project.detailMode === 'dynamic' && project.slug) {
            return `proyecto.html?slug=${encodeURIComponent(project.slug)}`;
        }

        return 'archivo.html';
    }

    function buildProjectRow(project) {
        const href = getProjectHref(project);
        const isExternal = project.detailMode === 'external';

        return `
            <a href="${href}" class="archivo__fila" data-image="${project.thumbnail || ''}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}>
                <span class="archivo__celda archivo__celda--nombre">${project.shortTitle || ''}</span>
                <span class="archivo__celda archivo__celda--proyecto">${project.summary || ''}</span>
                <span class="archivo__celda archivo__celda--numero">${project.version || ''}</span>
            </a>
        `;
    }

    function renderArchive(projects) {
        const contenedor = document.querySelector('.archivo');
        if (!contenedor) return;

        const listas = contenedor.querySelectorAll('.archivo__lista[data-category]');
        if (listas.length === 0) return;

        listas.forEach((lista) => {
            const category = lista.getAttribute('data-category');
            const items = projects.filter((project) => project.category === category);
            const sorted = items.sort((a, b) => (a.version || '').localeCompare(b.version || '', undefined, { numeric: true }));
            lista.innerHTML = sorted.map(buildProjectRow).join('');
        });

        document.dispatchEvent(new CustomEvent('proyectos:archivo-rendered'));
    }

    async function initArchiveFromData() {
        const isArchivoPage = document.querySelector('.archivo') && document.querySelector('.archivo__lista[data-category]');
        if (!isArchivoPage) return;

        try {
            const response = await fetch(DATA_URL, { cache: 'no-store' });
            if (!response.ok) return;

            const data = await response.json();
            const projects = Array.isArray(data.projects) ? data.projects : [];

            if (projects.length === 0) return;

            renderArchive(projects);
        } catch (error) {
            // Fallback: se mantiene el contenido HTML ya existente.
        }
    }

    document.addEventListener('DOMContentLoaded', initArchiveFromData);
})();
