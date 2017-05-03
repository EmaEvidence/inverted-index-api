
/**
 *
 */
class InvertedIndex {

  /**
   * constructor - description
   *
   * @param  {type} fileName    description
   * @param  {type} fileContent description
   * @return {type}             description
   */
  constructor(fileName, fileContent) {
    this.fileName = fileName;
    this.fileContent = fileContent;
    this.indexObject = {};
  }

  /**
   * checkIfArrayIsValid - description
   *
   * @return {type}  description
   */
  checkIfArrayIsValid() {
    let result = '';
    if (typeof this.fileContent === 'object') {
      if (this.fileContent.length === undefined && this.fileContent[0] === undefined) {
        result = false;
        throw new Error('An Object but not a JSON Array');
      } else {
        if (this.fileContent.length === 0) {
          result = false;
          throw new Error('Book is Empty');
        } else {
          this.fileContent.forEach((file) => {
            const fileType = typeof file.text;
            if (fileType !== 'string') {
              result = 'Malformed Array';
              throw new Error('file is malformed');
            } else {
              result = true;
            }
          });
        }
      }
    } else {
      result = false;
      throw new Error('Not an Object');
    }
    return result;
  }
  }
