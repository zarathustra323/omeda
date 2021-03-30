const cheerio = require('cheerio');

module.exports = (type, html) => {
  const $ = cheerio.load(html);
  const data = [];
  data.type = type;
  $('tr').each(function handleRow() {
    const line = {};
    $(this).find('> td').each(function handleCell(col) {
      const text = $(this).text().trim();
      switch (col) {
        case 0:
          line.name = text; break;
        case 1:
          line.always = text; break;
        case 2:
          line.type = text; break;
        case 3:
          line.description = text; break;
        default:
      }
    });
    if (Object.keys(line).length) data.push(line);
  });
  return data;
};
