import { PluginSimple } from 'markdown-it';
export interface ParseLinkResult {
    position: number;
    href: string;
}
export declare const imageSize: PluginSimple;
