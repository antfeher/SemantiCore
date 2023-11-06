import express from 'express';
import { extract } from '@extractus/article-extractor';
import { convert } from 'html-to-text';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3100;

const meta = {
  service: 'article-parser',
  lang: 'javascript',
  server: 'express',
  platform: 'node',
  linkPresented: false,
};

app.use(cors());
app.use(express.json());

app.all('/', async (req, res) => {
  const open = req.query.open;
  const url = req.query.url;

  if (req.method === 'GET') {
    if (open) {
      // Handle GET request with open query parameter
      // Your existing code for open extraction and conversion
    } else if (url) {
      try {
        const data = await extract(url);
        const content = data?.content;
        const parsed = convert(content);
        console.log(parsed);

        return res.json({
          error: 0,
          data,
          message: 'Article has been extracted successfully',
          parsed,
          linkPresented: true,
        });
      } catch (err) {
        return res.json({
          error: 1,
          message: err.message,
          data: null,
          meta,
        });
      }
    } else {
      return res.json(meta);
    }
  } else if (req.method === 'POST') {
    const apiKey = 'sk-'; // replace with your key

    const temperature = parseFloat(req.body.tempRange);
    const n = parseInt(req.body.numResponses);
    const prompt = req.body.prompt;
    const markedSegment = req.body.indicator;
    console.log(markedSegment);
    console.log(prompt);

    const messages = [];

    if (req.body.systemRole) {
      messages.push({
        role: 'system',
        content: req.body.systemRole,
      });
    }

    if (req.body.assistantRole) {
      messages.push({
        role: 'assistant',
        content: req.body.assistantRole,
      });
    }

    if (req.body.prompt) {
      messages.push({
        role: 'user',
        content: req.body.prompt,
      });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).send({ response: 'Error: Prompt cannot be empty.' });
      return;
    }

    const postData = JSON.stringify({
      model: 'gpt-3.5-turbo-16k',
      messages: messages,
      max_tokens: 225,
      temperature: temperature,
      n: n,
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: postData,
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', options);
      const responseData = await response.json();
      console.log(responseData);
      console.log(responseData.choices[0].message.content); // Print the content of the first choice

      // Check if the indicator is 0 and modify the response if needed
      if (markedSegment === 0) {
        // Prepend "new document " to the content in the first choice
//        responseData.choices[0].message.content = '' + responseData.choices[0].message.content;

        // Add new key-value pair to response data JSON
        responseData.newKey = '***';
      } else if (markedSegment === 1) {
        // Add new key-value pair to response data JSON
        responseData.newKey = '';
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(responseData);
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ response: 'Error: ' + error.message });
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(405).send({ response: 'Method Not Allowed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
