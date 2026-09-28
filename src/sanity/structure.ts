import type { StructureResolver } from 'sanity/structure'
import { LaunchIcon, DocumentTextIcon, TagIcon, UserIcon, StarIcon, PlayIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Studio')
    .items([
      // 1. Flagship Section: Carcino Pathway CMS
      S.listItem()
        .title('The Carcino Pathway (Flagship Section)')
        .icon(StarIcon)
        .child(
          S.list()
            .title('Carcino Pathway CMS')
            .items([
              S.listItem()
                .title('All Pathway Campaigns')
                .icon(LaunchIcon)
                .child(
                  S.documentTypeList('campaign')
                    .title('All Pathway Campaigns')
                ),
              S.listItem()
                .title('Campaigns by Stage')
                .icon(LaunchIcon)
                .child(
                  S.list()
                    .title('Pathway Stages')
                    .items([
                      S.listItem()
                        .title('Stage 01: Clinical Navigation (TCF PATHWAY)')
                        .child(
                          S.documentList()
                            .title('Stage 01: Clinical Navigation')
                            .filter('_type == "campaign" && pathwayStage == "stage-01"')
                        ),
                      S.listItem()
                        .title('Stage 02: Integrative Care (TCF ADVOCACY)')
                        .child(
                          S.documentList()
                            .title('Stage 02: Integrative Care')
                            .filter('_type == "campaign" && pathwayStage == "stage-02"')
                        ),
                      S.listItem()
                        .title('Stage 03: Moderated Spaces (TCF CONNECTION)')
                        .child(
                          S.documentList()
                            .title('Stage 03: Moderated Spaces')
                            .filter('_type == "campaign" && pathwayStage == "stage-03"')
                        ),
                      S.listItem()
                        .title('Stage 04: Survivorship Plans (TCF VOICES)')
                        .child(
                          S.documentList()
                            .title('Stage 04: Survivorship Plans')
                            .filter('_type == "campaign" && pathwayStage == "stage-04"')
                        ),
                      S.listItem()
                        .title('General Flagship Campaigns')
                        .child(
                          S.documentList()
                            .title('General Flagship Campaigns')
                            .filter('_type == "campaign" && pathwayStage == "general-flagship"')
                        ),
                    ])
                ),
              S.documentTypeListItem('category')
                .title('Campaign Categories')
                .icon(TagIcon),
            ])
        ),

      S.divider(),

      // 2. Direct Quick Access to Pathway Campaigns (Flagship Posting CMS)
      S.documentTypeListItem('campaign')
        .title('Pathway Campaigns (Flagship CMS)')
        .icon(LaunchIcon),

      S.divider(),

      // 3. Articles & Publications Section
      S.listItem()
        .title('Articles & Publications')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Publications')
            .items([
              S.documentTypeListItem('article').title('Articles').icon(DocumentTextIcon),
              S.documentTypeListItem('podcast').title('Podcasts').icon(PlayIcon),
              S.documentTypeListItem('post').title('Blog Posts').icon(DocumentTextIcon),
            ])
        ),

      S.documentTypeListItem('article').title('Articles').icon(DocumentTextIcon),
      S.documentTypeListItem('podcast').title('Podcasts').icon(PlayIcon),

      S.divider(),

      // 4. Authors & Categories
      S.documentTypeListItem('category').title('Categories').icon(TagIcon),
      S.documentTypeListItem('author').title('Authors').icon(UserIcon),

      S.divider(),

      // Catch-all for any other document types
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['campaign', 'article', 'podcast', 'post', 'category', 'author'].includes(item.getId()!)
      ),
    ])
