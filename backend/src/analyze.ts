import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import ejs from 'ejs';
import { Context } from 'hono';

interface Data {
  jobDescription: string;
  resume: string;
}

interface Metric {
  name: string;
  content: string;
}

interface Category {
  category: string;
  metrics: Metric[];
}

export async function analyze(context: Context) {
  console.log('Analyzing...!');
  const req = context.req;
  try {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) {
      return context.json({ error: 'Unauthorized' }, 401);
    }

    const [authType, authToken] = authorizationHeader.split(' ');

    if (authType !== 'Basic' || !authToken) {
      return context.json({ error: 'Invalid Authorization header' }, 401);
    }

    const decodedToken = atob(authToken);
    const [email, password] = decodedToken.split(':');

    const expectedEmail = process.env.AUTH_EMAIL;
    const expectedPassword = process.env.AUTH_PASSWORD;

    if (!expectedEmail || !expectedPassword) {
      console.error('Missing authentication environment variables.');
      return context.json({ error: 'Internal Server Error' }, 500);
    }

    if (email !== expectedEmail || password !== expectedPassword) {
      return context.json({ error: 'Unauthorized' }, 401);
    }

    const data: Data = await req.json();
    if (!data.jobDescription || !data.resume) {
      return context.json({ error: 'Please enter job description and resume' }, 400);
    }

    const criteriaPath = path.join(__dirname, 'data', 'trainings');
    const categories = await fs.readdir(criteriaPath);

    const criteriaData: Category[] = [];

    for (const categoryDir of categories) {
      const categoryPath = path.join(criteriaPath, categoryDir);
      const categoryStat = await fs.stat(categoryPath);

      if (categoryStat.isDirectory()) {
        const files = await fs.readdir(categoryPath);
        const metrics: Metric[] = [];

        for (const file of files) {
          if (file.endsWith('.md')) {
            const filePath = path.join(categoryPath, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const fileName = file.replace('.md', '').replace(/-/g, ' ');

            metrics.push({
              name: fileName
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
              content: fileContent,
            });
          }
        }
        criteriaData.push({
          category: categoryDir
            .replace(/-/g, ' ')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          metrics: metrics.sort((a, b) => a.name.localeCompare(b.name)),
        });
      }
    }

    criteriaData.sort((a, b) => a.category.localeCompare(b.category));

    const usages: {
      [key: string]: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
      };
    } = {};

    const categoryResults = await Promise.all(
      criteriaData.map(async (category) => {
        const metricResults = await Promise.all(
          category.metrics.map(async (metric) => {
            const prompt = ejs.render(metric.content, {
              job_description_text: data.jobDescription,
              resume_text: data.resume,
            });

            const result = await generateObject({
              model: google('gemini-2.0-flash'),
              temperature: 0,
              schema: z.object({
                score: z.number(),
                reason: z.string(),
                tips: z.array(z.string()),
              }),
              prompt,
            });
            usages[metric.name] = result.usage;

            return {
              metricName: metric.name,
              result: result.object,
            };
          }),
        );

        return {
          category: category.category,
          metrics: metricResults,
        };
      }),
    );

    console.log('Usages:', usages);
    console.log(
      'Overall Usage:',
      Object.values(usages).reduce(
        (acc, usage) => {
          acc.promptTokens += usage.promptTokens;
          acc.completionTokens += usage.completionTokens;
          acc.totalTokens += usage.totalTokens;
          return acc;
        },
        { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      ),
    );

    return context.json(categoryResults, 200);
  } catch (error) {
    console.error('Error processing request:', error);
    return context.json({ error: 'Internal Server Error' }, 500);
  }
}
