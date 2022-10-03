import ICell from "../interfaces/ICell";
export default class Cell implements ICell {
  content: string;
  index: number;
  /* constructor(content: string, index: number) {
    this.content = content;
    this.index = index;
  }*/
  constructor({ content, index }: ICell) {
    this.content = content;
    this.index = index;
  }
}
