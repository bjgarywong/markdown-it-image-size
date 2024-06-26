/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt from 'markdown-it'

import { imageSize } from './index'
import { describe, expect, it } from '@jest/globals'

describe('markdown-it-imsize', function () {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  }).use(imageSize)

  it('renders a image without size or title', () => {
    expect(md.renderInline('![test](x)')).toBe('<img src="x" alt="test">')
  })

  it('renders a image with title', () => {
    expect(md.renderInline('![test](x "thisisthetitle")')).toBe('<img src="x" alt="test" title="thisisthetitle">')
  })

  it('renders an image with absolute width and height', () => {
    expect(md.renderInline('![test](x =100x200)')).toBe('<img src="x" alt="test" width="100" height="200">')
  })

  it('renders an image with relative width and height', () => {
    expect(md.renderInline('![test](x =100%x200%)')).toBe('<img src="x" alt="test" width="100%" height="200%">')
  })

  it('renders an image with title and size', () => {
    expect(md.renderInline('![test](x "thisisthetitle" =100x200)')).toBe(
      '<img src="x" alt="test" title="thisisthetitle" width="100" height="200">'
    )
  })

  it('renders an image with no size but x', () => {
    expect(md.renderInline('![test](x "thisisthetitle" =x)')).toBe('<img src="x" alt="test" title="thisisthetitle">')
  })

  it("doesn't render an image with invalid size syntax", () => {
    expect(md.renderInline('![test](x "thisisthetitle" =xx)')).toBe('![test](x “thisisthetitle” =xx)')
  })

  it('renders an image with only width', () => {
    expect(md.renderInline('![test](x =100x)')).toBe('<img src="x" alt="test" width="100">')
  })

  it('renders an image with only height', () => {
    expect(md.renderInline('![test](x =x200)')).toBe('<img src="x" alt="test" height="200">')
  })

  it('default width', () => {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    }).use(imageSize, {defaultWidth: '100%'})
    expect(md.renderInline('![test](http://foo.bar.zoo/a.png)', {})).toBe('<img src="http://foo.bar.zoo/a.png" alt="test" width="100%">')
  })

  it('custom render', () => {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    }).use(imageSize, {customRender: true})
    expect(md.renderInline('![test](http://foo.bar.zoo/a.png)', {})).toBe('<img src="http://foo.bar.zoo/a.png" alt="test" style="max-width:100%">')
  })
})
