export function abcjsPlugin(md) {
  md.block.ruler.before('fence', 'abcjs', function (state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    if (state.src.slice(pos, max) !== ':::abcjs') {
      return false;
    }

    if (silent) return true;

    let nextLine = startLine + 1;
    let content = '';

    while (nextLine < endLine) {
      const linePos = state.bMarks[nextLine] + state.tShift[nextLine];
      const lineMax = state.eMarks[nextLine];
      const lineText = state.src.slice(linePos, lineMax);

      if (lineText.startsWith(':::')) break;

      content += lineText + '\n';
      nextLine++;
    }

    state.line = nextLine + 1;

    // ========== 核心转义函数 ==========
    function escapeHtml(str) {
      return str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    const safeContent = escapeHtml(content.trim());

    // 使用 双引号 包裹属性值，内部引号全部实体转义，彻底兼容
    const token = state.push('html_block', '', 0);
    token.content = `<ClientOnly><Abcjs abc="${safeContent}"></Abcjs></ClientOnly>`;

    return true;
  });
}