/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt, { PluginSimple, PluginWithOptions } from 'markdown-it'
import { RuleInline } from 'markdown-it/lib/parser_inline.mjs'
import StateInline from 'markdown-it/lib/rules_inline/state_inline.mjs'
import { ParseImageSize, parseImageSize } from './parse-image-size.js'
import { SpecialCharacters } from './specialCharacters.js'
import { ImSizeOptions, customRender } from './options.js'

const checkForImageTagStart = (state: StateInline): boolean => {
  return (
    state.src.charCodeAt(state.pos) === SpecialCharacters.EXCLAMATION_MARK &&
    state.src.charCodeAt(state.pos + 1) === SpecialCharacters.OPENING_BRACKET
  )
}

const skipWhiteSpaces = (startPosition: number, state: StateInline): number => {
  let position = startPosition
  while (position < state.posMax) {
    const code = state.src.charCodeAt(position)
    if (code !== SpecialCharacters.WHITESPACE && code !== SpecialCharacters.NEW_LINE) {
      break
    }
    position += 1
  }
  return position
}

function createImageToken(
  state: StateInline,
  labelStartIndex: number,
  labelEndIndex: number,
  href: string,
  title: string,
  width: string,
  height: string
) {
  state.pos = labelStartIndex
  state.posMax = labelEndIndex

  const token = state.push('image', 'img', 0)
  token.children = []

  const newState = new state.md.inline.State(
    state.src.slice(labelStartIndex, labelEndIndex),
    state.md,
    state.env,
    token.children
  )
  newState.md.inline.tokenize(newState)

  token.attrSet('src', href)
  token.attrSet('alt', '')

  if (title) {
    token.attrSet('title', title)
  }

  if (width !== '') {
    token.attrSet('width', width)
  }

  if (height !== '') {
    token.attrSet('height', height)
  }
}

function parseSizeParameters(startPosition: number, state: StateInline): ParseImageSize | undefined {
  // [link](  <href>  "title" =WxH  )
  //                          ^^^^ parsing image size
  if (startPosition - 1 < 0) {
    return
  }
  const code = state.src.charCodeAt(startPosition - 1)
  if (code !== SpecialCharacters.WHITESPACE) {
    return
  }
  const res = parseImageSize(state.src, startPosition, state.posMax)
  if (!res) {
    return
  }

  // [link](  <href>  "title" =WxH  )
  //                              ^^ skipping these spaces
  return {
    position: skipWhiteSpaces(res.position, state),
    width: res.width,
    height: res.height
  }
}

export interface ParseLinkResult {
  position: number
  href: string
}

// [link](  <href>  "title"  )
//          ^^^^^^ parsing link destination
function parseLink(state: StateInline, startPosition: number): ParseLinkResult | undefined {
  const linkParseResult = state.md.helpers.parseLinkDestination(state.src, startPosition, state.posMax)
  if (!linkParseResult.ok) {
    return
  }
  const href = state.md.normalizeLink(linkParseResult.str)
  if (state.md.validateLink(href)) {
    return { position: linkParseResult.pos, href }
  } else {
    return { position: startPosition, href: '' }
  }
}

const imageWithSize: RuleInline = (state: any, silent: any) => {
  let position,
    title,
    start,
    href = '',
    width = '',
    height = ''
  const oldPos = state.pos,
    max = state.posMax

  if (!checkForImageTagStart(state)) {
    return false
  }

  const labelStartIndex = state.pos + 2
  const labelEndIndex = state.md.helpers.parseLinkLabel(state, state.pos + 1, false)

  // parser failed to find ']', so it's not a valid link
  if (labelEndIndex < 0) {
    return false
  }

  position = labelEndIndex + 1
  if (position < max && state.src.charCodeAt(position) === SpecialCharacters.OPENING_PARENTHESIS) {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    position += 1
    position = skipWhiteSpaces(position, state)
    if (position >= max) {
      return false
    }

    const parseLinkResult = parseLink(state, position)
    if (!parseLinkResult) {
      return false
    }
    position = parseLinkResult.position
    href = parseLinkResult.href

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = position
    position = skipWhiteSpaces(position, state)

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    const parseLinkTitleResult = state.md.helpers.parseLinkTitle(state.src, position, state.posMax)
    if (position < max && start !== position && parseLinkTitleResult.ok) {
      title = parseLinkTitleResult.str
      position = parseLinkTitleResult.pos

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      position = skipWhiteSpaces(position, state)
    } else {
      title = ''
    }

    const parseSizeParametersResult = parseSizeParameters(position, state)
    if (parseSizeParametersResult) {
      position = parseSizeParametersResult.position
      width = parseSizeParametersResult.width
      height = parseSizeParametersResult.height
    }

    if (position >= max || state.src.charCodeAt(position) !== 0x29 /* ) */) {
      state.pos = oldPos
      return false
    }
    position += 1
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') {
      return false
    }

    // [foo]  [bar]
    //      ^^ optional whitespace (can include newlines)
    position = skipWhiteSpaces(position, state)

    let label

    if (position < max && state.src.charCodeAt(position) === 0x5b /* [ */) {
      start = position + 1
      position = state.md.helpers.parseLinkLabel(state, position)
      if (position >= 0) {
        label = state.src.slice(start, (position += 1))
      } else {
        position = labelEndIndex + 1
      }
    } else {
      position = labelEndIndex + 1
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) {
      label = state.src.slice(labelStartIndex, labelEndIndex)
    }

    const ref = state.env.references[state.md.utils.normalizeReference(label)]
    if (!ref) {
      state.pos = oldPos
      return false
    }
    href = ref.href
    title = ref.title
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    if (width == '' && height == '' && !(imageWithSize as any).customRender) {      
      const defaultWidth: string = (imageWithSize as any).defaultWidth
      if (defaultWidth !== undefined) {
        width = defaultWidth
      }
    }
    createImageToken(state, labelStartIndex, labelEndIndex, href, title, width, height)
  }

  state.pos = position
  state.posMax = max
  return true
}

export const imageSize: PluginWithOptions = (md: MarkdownIt, options?: ImSizeOptions) => {
  if (options !== undefined) {
    if (options.defaultWidth) {
      (imageWithSize as any).defaultWidth = options.defaultWidth
    }
    if (options.customRender) {
      (imageWithSize as any).customRender = options.customRender
      md.renderer.rules.image = customRender
    }
  }
  md.inline.ruler.before('emphasis', 'image', imageWithSize as any)
}
