const fs = require('fs');
const s = fs.readFileSync('C:\\Users\\apple\\Desktop\\剑修哥_网站完整包\\index.html', 'utf8');

// 检查HTML结构
console.log('=== HTML结构检查 ===');
console.log('文件大小:', s.length);
console.log('DOCTYPE:', s.startsWith('<!DOCTYPE html>'));
console.log('</html>:', s.trimEnd().endsWith('</html>'));
console.log('body标签数:', (s.match(/<body/g) || []).length, '/', (s.match(/<\/body>/g) || []).length);
console.log('script标签数:', (s.match(/<script/g) || []).length, '/', (s.match(/<\/script>/g) || []).length);
console.log('style标签数:', (s.match(/<style/g) || []).length, '/', (s.match(/<\/style>/g) || []).length);

// 检查JS语法
console.log('\n=== JS语法检查 ===');
const scripts = s.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g) || [];
scripts.forEach((sc, i) => {
  const code = sc.replace(/<\/?script[^>]*>/g, '');
  if (!code.trim()) return;
  try {
    new Function(code);
    console.log(`script ${i}: OK (${code.length} chars)`);
  } catch(e) {
    console.log(`script ${i}: ERROR - ${e.message}`);
    // 找到错误位置
    const lines = code.split('\n');
    const match = e.stack.match(/<anonymous>:(\d+):(\d+)/);
    if (match) {
      const lineNum = parseInt(match[1]);
      console.log('  错误附近代码:');
      for (let j = Math.max(0, lineNum-3); j < Math.min(lines.length, lineNum+2); j++) {
        console.log(`  ${j+1}: ${lines[j].substring(0, 100)}`);
      }
    }
  }
});
