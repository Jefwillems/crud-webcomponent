export enum Page {
  list,
  detail,
}

export type GoToDetailPageEvent = {
  page: Page,
  id: string
}
