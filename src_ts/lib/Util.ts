class Util {
    public static string2floag(input: string | number): number {
        var stringInput = (input == null ? "0" : input.toString().replace(/,/g, '.'));

        var number = parseFloat(stringInput);
        return number;
    }

    public static isScrolledIntoView(elementToCheck: HTMLElement, container: HTMLElement): boolean {
        var rect = elementToCheck.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        // Only completely visible elements return true:
        var isVisible = (elemTop >= 0) && (elemBottom <= container.clientHeight);
        // Partially visible elements return true:
        //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
        return isVisible;
    }
}




export { Util };