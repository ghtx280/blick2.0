const fs = require('fs');

function unminifyCSS(css) {

  // Разделяем по селекторам
  let selectors = css.split('}');

  let output = '';

  selectors.forEach(selector => {

    // Удаляем лишние пробелы
    selector = selector.trim();

    // Добавляем перевод строки и отступ
    output += selector + '\n\t';

    // Разделяем блоки правил
    let rules = selector.split(';');

    rules.forEach(rule => {
      
      // Удаляем лишние пробелы
      rule = rule.trim();

      // Добавляем пробел после двоеточия
      rule = rule.replace(/([^:]*):([^]*)/, '$1: $2');

      // Добавляем распакованное правило
      output += rule + ';\n\t';

    });

    // Удаляем последний лишний отступ
    output = output.slice(0, -2) + '\n';

  });

  return output;

}


// Использование:

const minifiedCSS = fs.readFileSync('styles.min.css', 'utf8');

const unminifiedCSS = unminifyCSS(minifiedCSS);

fs.writeFileSync('styles.css', unminifiedCSS);