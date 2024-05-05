import { Options, Token } from 'markdown-it'

interface ImSizeOptions {
  defaultWidth?: string
  customRender?: boolean
}

const customRender = (tokens: Token[], idx: number, options: Options, env: any, slf: any) => {
  const token = tokens[idx]!
  const attrs = token.attrs!
  attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children!, options, env);
  let result = slf.renderToken(tokens, idx, options);
  if (! attrs.find((attr) => attr[0] == 'width' || attr[0] == 'height')) {
    if (result.endsWith("/>")) {
      result = result.slice(0, -2) + ' style="max-width:100%"/>'
    }
    else if (result.endsWith(">")) {
      result = result.slice(0, -1) + ' style="max-width:100%">'
    }
  }
  return result
}

export {
  ImSizeOptions,
  customRender
}
