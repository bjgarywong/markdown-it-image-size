export interface ParseImageSize {
    position: number;
    width: string;
    height: string;
}
export interface ParseNextNumber {
    position: number;
    value: string;
}
export declare function parseImageSize(imageSize: string, startCharacterPosition: number, maximalCharacterPosition: number): ParseImageSize | undefined;
