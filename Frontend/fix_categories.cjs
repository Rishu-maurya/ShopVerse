const fs = require('fs');
const path = 'd:/projects/e-com/Frontend/src/Components/Categories.jsx';
let content = fs.readFileSync(path, 'utf8');

// Find the problematic section
const search = '</div>\n))}\n        </div>\n    </section>\n  );\n};\n\nexport default Categories;';
const searchWin = '</div>\r\n))}\r\n        </div>\r\n    </section>\r\n  );\r\n};\r\n\r\nexport default Categories;';
const replaceStr = '</div>\n          ))}\n        </div>\n      </div>\n    </section>\n  );\n};\n\nexport default Categories;';
const replaceStrWin = '</div>\r\n          ))}\r\n        </div>\r\n      </div>\r\n    </section>\r\n  );\r\n};\r\n\r\nexport default Categories;';

if (content.includes(searchWin)) {
  content = content.replace(searchWin, replaceStrWin);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Fixed with Windows line endings');
} else if (content.includes(search)) {
  content = content.replace(search, replaceStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Fixed with Unix line endings');
} else {
  console.log('Could not find pattern.');
  // Debug: show what's around the end
  const endPart = content.slice(-250);
  console.log('End of file:', JSON.stringify(endPart));
}
