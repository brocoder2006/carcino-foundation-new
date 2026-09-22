import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Studio')
    .items([
      S.documentTypeListItem('article').title('Articles'),
      S.documentTypeListItem('podcast').title('Podcasts'),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['article', 'podcast', 'post', 'category', 'author'].includes(item.getId()!),
      ),
    ])

