
const electron = require('electron');
const path = require('path');
const fs = require('fs');




class JsonDataStore {
  path_: string;


  constructor(fileName) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path_ = path.join(userDataPath, fileName + '.json');
  }

  // This will just return the property on the `data` object
  read(): any {
    return JsonDataStore.parseDataFile_(this.path_);
  }

  setPath(path: string) {
    this.path_ = path;
  }

  write(object: any) {
    fs.writeFileSync(this.path_, JSON.stringify(object));
  }

  static parseDataFile_(filePath: String): any {
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      // if there was some kind of error, return the passed in defaults instead.
      return new Object();
    }
  }
}



// expose the class
export { JsonDataStore };