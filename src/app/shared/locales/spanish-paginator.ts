import { MatPaginatorIntl } from '@angular/material/paginator';


export function getSpanishPaginator() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Items por pagina:';
    paginatorIntl.nextPageLabel = 'Siguiente pagina';
    paginatorIntl.previousPageLabel = 'Anterior pagina';

    return paginatorIntl;
}