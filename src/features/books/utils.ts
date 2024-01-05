
export const abbreviateAuthor = (author:string) => {
  const splited = author.split('^')

  if( splited.length <= 1) return author;

  else return `${splited[0]} 등 ${splited.length}인`;
}