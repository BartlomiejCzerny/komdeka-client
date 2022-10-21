import { MatPaginatorIntl } from '@angular/material/paginator';

const polishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 z ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} z ${length}`;
};

export function customPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Liczba elementów na stronie:';
  customPaginatorIntl.nextPageLabel = 'Następna strona';
  customPaginatorIntl.previousPageLabel = 'Poprzednia strona';
  customPaginatorIntl.firstPageLabel = 'Pierwsza strona';
  customPaginatorIntl.lastPageLabel = 'Ostatnia strona';
  customPaginatorIntl.getRangeLabel = polishRangeLabel;

  return customPaginatorIntl;
}
