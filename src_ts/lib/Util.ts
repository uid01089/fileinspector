class Util {
    public static string2floag(input: string | number): number {
        var stringInput = (input == null ? "0" : input.toString().replace(/,/g, '.'));

        var number = parseFloat(stringInput);
        return number;
    }
}




export { Util };