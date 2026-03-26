const db = require('../config/db');
const handlerMap = require('../engine/handlerMap');

async function routes(fastify, options) {
  
  fastify.get('/', async (request, reply) => {
    return { status: 'ok', message: 'All-in-One Tools API is running' };
  });

  fastify.get('/tools', async (request, reply) => {
    const { rows } = await db.query(`
      SELECT t.id, t.name, t.slug, t.config, c.name as category_name, c.slug as category_slug
      FROM tools t
      LEFT JOIN categories c ON t.category_id = c.id
      ORDER BY t.created_at DESC
    `);
    return { data: rows };
  });

  fastify.get('/tool/:slug', async (request, reply) => {
    const { slug } = request.params;
    const { rows } = await db.query(`SELECT * FROM tools WHERE slug = $1`, [slug]);
    if (rows.length === 0) {
      return reply.code(404).send({ error: 'Tool not found' });
    }
    return { data: rows[0] };
  });

  fastify.get('/search', async (request, reply) => {
    const { q } = request.query;
    if (!q) return { data: [] };
    const { rows } = await db.query(
      `SELECT name, slug FROM tools WHERE name ILIKE $1 LIMIT 10`,
      [`%${q}%`]
    );
    return { data: rows };
  });

  fastify.post('/execute-tool', async (request, reply) => {
    const { slug, payload } = request.body;
    
    if (!slug || !payload) {
      return reply.code(400).send({ error: 'Missing slug or payload' });
    }

    const handler = handlerMap[slug];
    if (!handler) {
      return reply.code(404).send({ error: 'Tool execution handler not implemented' });
    }

    try {
      const result = await handler(payload);
      return { success: true, data: result };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ success: false, error: err.message });
    }
  });

}

module.exports = routes;
