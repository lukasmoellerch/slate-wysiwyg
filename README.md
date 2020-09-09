<h1 align="center">
  slate-wysiwyg
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">
 A WYSIWYG editor built using slate.js 
</p>
<p align="center" style="font-size: 1.2rem;">
  <img src="https://img.shields.io/npm/v/slate-wysiwyg">
</p>

`slate-wysiwyg` is an experimental WYSIWYG editor built on top of [slate.js](https://www.slatejs.org/examples/richtext) that tries to deliver a natural editing experience. It tries to be as similar as possible to existing WYSIWYG editors like Pages, Google Docs or Word while having features similar to markdown.

## Features

- Different Heading levels: H1, H2, H3, H4
  - If # is inserted at the beginning of a paragraph / H1 / H2 / H3 the block is changed to the next heading element, mimicking markdown.
- Lists (Currently only a single level is supported)
  - A list item is removed if enter is pressed and the list item is empty
- Bold, Italic, underline, monospace formatting
  - Familiar Keyboard shortcuts: CMD+B, CMD+U, CMD+I
- Math blocks + inline math rendered using [katex](https://katex.org)
- Code blocks are highlighted using [prismjs](https://prismjs.com)

## Demo

A demo application that is using parcel as a bundler can be found in the example directory.

A live demo is deployed using surge: [slate-wysiwyg.surge.sh](http://slate-wysiwyg.surge.sh) (Might not always be up to date)
