export function abcjsPlugin(md) {
  md.block.ruler.before('fence', 'abcjs', function (state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // 匹配 :::abcjs
    if (state.src.slice(pos, max) !== ':::abcjs') {
      return false;
    }

    if (silent) return true;

    let nextLine = startLine + 1;
    let content = '';

    // 读取内容直到 :::
    while (nextLine < endLine) {
      const linePos = state.bMarks[nextLine] + state.tShift[nextLine];
      const lineMax = state.eMarks[nextLine];
      const lineText = state.src.slice(linePos, lineMax);

      if (lineText.startsWith(':::')) break;

      content += lineText + '\n';
      nextLine++;
    }

    // 关键修复！！！
    state.line = nextLine + 1;

    // 输出正确的 Vue 组件代码
    const token = state.push('html_block', '', 0);
    token.content = `<ClientOnly><Abcjs abc='${content.trim()}'></Abcjs></ClientOnly>`;

    return true;
  });
}