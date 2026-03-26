const db = require('../src/config/db');

const tools = [
  {
    name: 'Word Counter',
    slug: 'word-counter',
    category_slug: 'text',
    config: {
      inputs: [{ name: 'text', type: 'textarea', label: 'Enter text here', required: true }],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Text Case Converter',
    slug: 'text-case-converter',
    category_slug: 'text',
    config: {
      inputs: [
        { name: 'text', type: 'textarea', label: 'Enter text', required: true },
        { name: 'caseType', type: 'select', label: 'Convert to', options: ['uppercase', 'lowercase', 'titlecase'], required: true }
      ],
      output: { type: 'text' },
      realtime: true
    }
  },
  {
    name: 'Image Resizer',
    slug: 'image-resizer',
    category_slug: 'image',
    config: {
      inputs: [
        { name: 'image', type: 'file', label: 'Upload Image', required: true, accept: 'image/*' },
        { name: 'width', type: 'number', label: 'Width (px)', required: true },
        { name: 'height', type: 'number', label: 'Height (px)', required: true }
      ],
      output: { type: 'image' },
      realtime: false
    }
  },
  {
    name: 'BMI Calculator',
    slug: 'bmi-calculator',
    category_slug: 'health',
    config: {
      inputs: [
        { name: 'weight', type: 'number', label: 'Weight (kg)', required: true },
        { name: 'height', type: 'number', label: 'Height (cm)', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    category_slug: 'developer',
    config: {
      inputs: [
        { name: 'jsonString', type: 'textarea', label: 'Raw JSON', required: true }
      ],
      output: { type: 'code' },
      realtime: true
    }
  }
];

const categories = [
  { name: 'Text Tools', slug: 'text' },
  { name: 'Image Tools', slug: 'image' },
  { name: 'Health Calculators', slug: 'health' },
  { name: 'Developer Tools', slug: 'developer' }
];

async function init() {
  try {
    console.log('Dropping existing tables...');
    await db.query(`DROP TABLE IF EXISTS tools;`);
    await db.query(`DROP TABLE IF EXISTS categories;`);

    console.log('Creating categories table...');
    await db.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL
      );
    `);

    console.log('Creating tools table...');
    await db.query(`
      CREATE TABLE tools (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        config JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Inserting categories...');
    for (const c of categories) {
      await db.query(`INSERT INTO categories (name, slug) VALUES ($1, $2)`, [c.name, c.slug]);
    }

    console.log('Inserting tools...');
    for (const t of tools) {
      const catRes = await db.query(`SELECT id FROM categories WHERE slug = $1`, [t.category_slug]);
      const category_id = catRes.rows[0] ? catRes.rows[0].id : null;
      await db.query(
        `INSERT INTO tools (name, slug, category_id, config) VALUES ($1, $2, $3, $4)`,
         [t.name, t.slug, category_id, JSON.stringify(t.config)]
      );
    }

    console.log('Database initialized successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
}

init();
