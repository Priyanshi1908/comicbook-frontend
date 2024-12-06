export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { openaiKey, togetherApiKey, comicIdea } = req.body;

      try {
        const response = await fetch('https://comic-backend.priyanshideshpande19.workers.dev/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ openaiKey, togetherApiKey, comicIdea })
        });

        if (!response.ok) {
          return res.status(response.status).send(await response.text());
        }

        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }