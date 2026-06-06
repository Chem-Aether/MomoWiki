// abcjsPlugin.js
export function abcjsPlugin(md) {
  md.block.ruler.before('fence', 'abcjs', function (state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    const tagStr = state.src.slice(pos, max);

    let compName = ''
    if (tagStr === ':::abcjs') compName = 'Abcjs'
    else if (tagStr === ':::abcplay') compName = 'AbcPlayer'
    else return false

    if (silent) return true

    let nextLine = startLine + 1
    let content = ''
    while (nextLine < endLine) {
      const linePos = state.bMarks[nextLine] + state.tShift[nextLine]
      const lineMax = state.eMarks[nextLine]
      const lineText = state.src.slice(linePos, lineMax)
      if (lineText.startsWith(':::')) break
      content += lineText + '\n'
      nextLine++
    }
    state.line = nextLine + 1

    function escapeHtml(str) {
      return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;')
    }
    const safeContent = escapeHtml(content.trim())
    const token = state.push('html_block', '', 0)
    token.content = `<ClientOnly><${compName} abc="${safeContent}"></${compName}></ClientOnly>`
    return true
  })
}