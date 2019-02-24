const fs = require('fs');
const path = require('path');

class FileTree {
    trail: string;
    rootDir: Directory;
    currentPath: string;
    constructor(trail: string) {
        this.trail = trail;
        this.rootDir = new Directory(null, trail);
        this.currentPath = trail;

    }

    getCurrentPath(): string {
        return this.currentPath;
    }

    getRootDir(): Directory {
        return this.rootDir;
    }

    /**
     *Handling click event
     *
     * @param {string} trail
     * @memberof FileTree
     */
    clicked(trail: string) {
        var clickedElement = this.findElement(trail.trim());
        var allElements = this.getAllElements();

        // delete focus information
        allElements.forEach(element => {
            element.setFocus(false);
        });

        if (typeof clickedElement !== 'undefined') {

            clickedElement.setFocus(true);
            this.currentPath = trail;

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
        this.subDirectories.forEach(subContainer => {
            //subContainer.buildUp();
        })

        this.isExpanded = true;
    }

    getSubDirectories(): Array<Directory> {
        return this.subDirectories;
    }

    getFiles(): Array<File> {
        return this.files;
    }




}

class File extends DirElement {

    constructor(parent: Directory, name: string) {
        super(parent, name);
    }


}



export { FileTree, Directory, File };