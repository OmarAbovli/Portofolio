require('dotenv').config();
const authHandler = require('./api/auth').default;
const projectsHandler = require('./api/projects').default;

const mockRes = {
  status: (code) => ({
    json: (data) => {
      console.log(`[Status ${code}]`, data);
      return { code, data };
    }
  })
};

async function test() {
  console.log('--- Testing Auth ---');
  await authHandler({
    method: 'POST',
    body: { username: 'omarabovli', password: 'Qwer@04034550590103321153201551978306#' }
  }, mockRes);

  console.log('\n--- Testing GET Projects ---');
  await projectsHandler({ method: 'GET' }, mockRes);
}

test().catch(console.error);
