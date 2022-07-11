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
          line.alwaysPost = text; break;
        case 2:
          line.alwaysPut = text; break;
        case 3:
          line.type = text.trim().toLowerCase(); break;
        case 4:
          line.description = text; break;
        default:
      }
    });
    if (Object.keys(line).length) data.push(line);
  });
  return data.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
};
