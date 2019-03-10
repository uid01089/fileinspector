const fs = require('fs');
const path = require('path');

class FileTree {

    trail: string;
    rootDir: Directory;
    constructor(trail: string) {
        this.trail = trail;
        this.rootDir = new Directory(null, trail);


    }

    getCurrentPath(): string {
        return this.getCurrentElement().getPath();
    }

    getRootDir(): Directory {
        return this.rootDir;
    }

    getCurrentElement(): DirElement {
        var focusedElement = this.getFocusedElement();
        if (typeof focusedElement === 'undefined') {
            focusedElement = this.findElement(this.trail);
            focusedElement.setFocus(true);
        }

        return focusedElement;
    }

    removeFocus() {
        var allElements = this.getAllElements();

        // delete focus information
        allElements.forEach(element => {
            element.setFocus(false);
        });
    }

    /**
     *Handling click event
     *
     * @param {string} trail
     * @memberof FileTree
     */
    clicked(trail: string) {
        var clickedElement = this.findElement(trail.trim());
        this.removeFocus();

        if (typeof clickedElement !== 'undefined') {

            clickedElement.setFocus(true);


            if (clickedElement instanceof Directory) {
                var clickedDirectory = clickedElement as Directory;

                if (clickedDirectory.isExpanded) {
                    clickedDirectory.unExpand();
                } else {
                    clickedDirectory.expand();
                }

            } else if (clickedElement instanceof File) {
                var clickedFile = clickedElement as File;

            } else {

            }
        }

    }

    keyPressed(keyCode: number): any {

        var currentElement = this.getCurrentElement();
        var parent = currentElement.getParent();


        switch (keyCode) {
            case 37: //left
                if (currentElement instanceof Directory) {
                    if (currentElement.isExpanded) {
                        currentElement.unExpand();
                    }
                }

                break;
            case 39: //right
                if (currentElement instanceof Directory) {
                    if (!currentElement.isExpanded) {
                        currentElement.expand();

                        if (currentElement.isRoot) {
                            if ((currentElement as Directory).subDirectories.length > 0) {
                                currentElement.setFocus(false);
                                (currentElement as Directory).subDirectories[0].setFocus(true);
                            } else if ((currentElement as Directory).files.length > 0) {
                                currentElement.setFocus(false);
                                (currentElement as Directory).files[0].setFocus(true);
                            }
                        }


                    }
                }

                break;
            case 38: //up
                if (parent != null) {
                    parent.moveFocusUp();
                }

                break;

            case 40: //down
                if (parent != null) {
                    parent.moveFocusDown();
                } break;
        }
    }

    /**
     *This operation finds the element with the certain trail.
     *
     * @private
     * @param {string} trail
     * @returns {DirElement}
     * @memberof FileTree
     */
    private findElement(trail: string): DirElement {

        var allElements = new Map<string, DirElement>();
        this.treeWalkder(this.rootDir, allElements, (element): boolean => {
            return (trail === element.getPath());
        });
        return allElements.get(trail);
    }

    private getAllElements(): Array<DirElement> {
        var allElements = new Map<string, DirElement>();
        this.treeWalkder(this.rootDir, allElements, (element): boolean => {
            return true;
        });

        return Array.from(allElements.values());

    }

    private getFocusedElement(): DirElement {
        var allElements = new Map<string, DirElement>();
        this.treeWalkder(this.rootDir, allElements, (element): boolean => {
            return element.getFocus();
        });

        return Array.from(allElements.values())[0];

    }

    /**
     * Walked recursively through the tree and test func(). If func() return true, the elemnt
     * is stored then into the reuslt map.
     *
     * @private
     * @param {Directory} element
     * @param {Map<string, DirElement>} result
     * @param {(element: DirElement) => boolean} func
     * @memberof FileTree
     */
    private treeWalkder(element: Directory, result: Map<string, DirElement>, func: (element: DirElement) => boolean) {
        element.getSubDirectories().forEach(directory => {
            this.treeWalkder(directory, result, func);

        });

        if (func(element)) {
            result.set(element.getPath(), element);
        }

        element.getFiles().forEach(file => {
            if (func(file)) {
                result.set(file.getPath(), file);
            }
        });
    }


}
/**
 *
 * Base element for Directory and File
 * @class DirElement
 */
class DirElement {
    protected parent: Directory;
    protected name: string;
    protected focus: boolean;

    constructor(parent: Directory, name: string) {
        this.parent = parent;
        this.name = name;
        this.focus = false;
    }

    getPath(): string {
        var trail = this.name;
        if (null != this.parent) {
            trail = path.join(this.parent.getPath(), this.name);
        }
        return trail;
    }

    getName(): string {
        return this.name;
    }

    getFocus(): boolean {
        return this.focus;
    }

    setFocus(focus: boolean) {
        this.focus = focus;
    }

    getParent(): Directory {
        return this.parent;
    }
}


class Directory extends DirElement {

    isExpanded: boolean;
    isLocked: boolean;
    isRoot: boolean;
    subDirectories: Array<Directory>;
    files: Array<File>;

    constructor(parent: Directory, name: string) {

        super(parent, name);


        if (null == parent) {
            this.isRoot = true;
        } else {
            this.isRoot = false;
        }


        this.isExpanded = false;
        this.isLocked = false;

        this.subDirectories = new Array();
        this.files = new Array();
    }

    /**
     * This operation build up the directory element by reading in the file system
     * and populating the subDirectories- und file-collections
     *
     * @memberof Directory
     */
    buildUp() {
        try {
            var trailStart = this.getPath();
            var dirContent = fs.readdirSync(trailStart, { withFileTypes: true });
            dirContent.forEach(dirEnt => {
                if (dirEnt.isDirectory()) {
                    this.subDirectories.push(new Directory(this, dirEnt.name));
                } else if (dirEnt.isFile()) {
                    this.files.push(new File(this, dirEnt.name));
                }
            });
        } catch (e) {
            this.isLocked = true;
            console.log("Dir is locked: " + this.getPath);
        }


    }

    /**
     *Remove all content of the directory node
     *
     * @memberof Directory
     */
    unExpand() {
        this.isExpanded = false;
        this.isLocked = false;

        this.subDirectories = new Array();
        this.files = new Array();
    }

    /**
     * Operation expands the directory node
     *
     * @memberof Directory
     */
    expand() {
        this.buildUp();


        if ((this.subDirectories.length > 0) || this.files.length) {

            this.isExpanded = true;
        }

    }

    getSubDirectories(): Array<Directory> {
        return this.subDirectories;
    }

    getFiles(): Array<File> {
        return this.files;
    }

    getFocusedElement(): DirElement {

        var focusedElement: DirElement = null;

        this.subDirectories.forEach(dir => {
            if (dir.getFocus()) {
                focusedElement = dir;

            }
        })

        if (null == focusedElement) {
            this.files.forEach(file => {
                if (file.getFocus()) {
                    focusedElement = file;

                }
            })
        }

        return focusedElement;
    }

    /**
     * Moves the focus upwards. In case the focus reached the most upper element,
     * the operation returns false, otherwise true
     *
     * @returns {boolean}
     * @memberof Directory
     */
    moveFocusUp(): boolean {
        var successfull = false;
        var focusedElement = this.getFocusedElement();

        var indexDir = this.subDirectories.indexOf(focusedElement as Directory);
        var indexFile = this.files.indexOf(focusedElement as File);

        if ((indexDir == 0 && this.subDirectories.length > 0 && !(focusedElement as Directory).isRoot) || //
            ((indexFile == 0) && (this.files.length > 0) && (this.subDirectories.length == 0))) {
            // We reached the first element
            var parent = (focusedElement as Directory).parent;
            focusedElement.setFocus(false);
            parent.setFocus(true);
            successfull = true;

        } else if (indexFile > 0) {
            // We are in the file section
            focusedElement.setFocus(false);
            this.files[--indexFile].setFocus(true);
            successfull = true;
        } else if (indexFile == 0) {
            // We are in the middle
            focusedElement.setFocus(false);
            this.subDirectories[this.subDirectories.length - 1].setFocus(true);
            successfull = true;
        } else if (indexDir > 0) {
            focusedElement.setFocus(false);
            this.subDirectories[--indexDir].setFocus(true);
            successfull = true;
        }



        return successfull;
    }

    /**
    * Moves the focus downwards. In case the focus reached the last element,
    * the operation returns false, otherwise true
    *
    * @returns {boolean}
    * @memberof Directory
    */
    moveFocusDown(): boolean {
        var successfull = false;
        var focusedElement = this.getFocusedElement();
        if ((focusedElement instanceof Directory) && (focusedElement as Directory).isExpanded) {

            successfull = this.moveDownServiceChildDir(focusedElement as Directory);

        } else {

            var indexDir = this.subDirectories.indexOf(focusedElement as Directory);
            var indexFile = this.files.indexOf(focusedElement as File);

            if (indexDir > -1 && indexDir < (this.subDirectories.length - 1)) {
                // We are in the directory section
                focusedElement.setFocus(false);
                this.subDirectories[++indexDir].setFocus(true);
                successfull = true;
            } else if (indexDir == (this.subDirectories.length - 1) && (this.subDirectories.length > 0) && (this.files.length > 0)) {
                // We are in the middle
                focusedElement.setFocus(false);
                this.files[0].setFocus(true);
                successfull = true;

            } else if (indexFile > -1 && indexFile < (this.files.length - 1)) {
                // We are in the file section
                focusedElement.setFocus(false);
                this.files[++indexFile].setFocus(true);
                successfull = true;
            }
        }

        return successfull;
    }

    /**
     * This operation sets the focus on the first child of the expanded directory
     *
     * @private
     * @param {Directory} dir
     * @returns {boolean}
     * @memberof Directory
     */
    private moveDownServiceChildDir(dir: Directory): boolean {
        var successfull = false;
        var subDir = dir.getSubDirectories();
        var subFiles = dir.getFiles();
        if (subDir.length > 0) {
            dir.setFocus(false);
            subDir[0].setFocus(true);
            successfull = true;
        } else if (subFiles.length > 0) {
            dir.setFocus(false);
            subFiles[0].setFocus(true);
            successfull = true;
        }
        return successfull;

    }



}






class File extends DirElement {

    constructor(parent: Directory, name: string) {
        super(parent, name);
    }


}



export { FileTree, Directory, File };