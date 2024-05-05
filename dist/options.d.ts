import { Options, Token } from 'markdown-it';
interface ImSizeOptions {
    defaultWidth?: string;
    customRender?: boolean;
}
declare const customRender: (tokens: Token[], idx: number, options: Options, env: any, slf: any) => any;
export { ImSizeOptions, customRender };
