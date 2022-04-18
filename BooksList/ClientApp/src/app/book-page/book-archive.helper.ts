import { AppBook, AppBookChange } from '../models/book';

export const buildChangesFromArchive = (book: AppBook, archive: AppBook[]): AppBookChange[] => {
  const res: AppBookChange[] = [];
  archive = archive.sort((a, b) => (new Date(a.changeDate).getTime() - new Date(b.changeDate).getTime()));
  const changes = [...archive, book];
  res.push({
    changeDate: changes[0].changeDate,
    title: {new: changes[0].title},
    description: {new: changes[0].description},
    authors: {new: changes[0].authors},
    publishDate: {new: changes[0].publishDate}
  });
  for (let i = 1; i < changes.length; i++) {
    res.push({
      changeDate: changes[i].changeDate,
      title: changes[i - 1].title !== changes[i].title ? {old: changes[i - 1].title, new: changes[i].title} : undefined,
      description: changes[i - 1].description !== changes[i].description ? {
        old: changes[i - 1].description,
        new: changes[i].description
      } : undefined,
      authors: changes[i - 1].authors !== changes[i].authors ? {old: changes[i - 1].authors, new: changes[i].authors} : undefined,
      publishDate: changes[i - 1].publishDate !== changes[i].publishDate ? {
        old: changes[i - 1].publishDate,
        new: changes[i].publishDate
      } : undefined,
    });
  }
  return res.reverse();
};
