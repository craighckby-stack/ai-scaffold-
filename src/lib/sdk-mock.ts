// Mock SDK for when z-ai-web-dev-sdk is not available

export interface LLMResponse {
  text?: string;
  reasoning?: string;
  confidence?: number;
}

export interface CompletionResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

export class MockZAI {
  static async create(): Promise<MockZAI> {
    return new MockZAI();
  }

  private async callLLM(prompt: string): Promise<LLMResponse> {
    // Realistic mock implementation with varied responses
    const responses = [
      {
        text: "Based on my analysis, I can provide a detailed response on this topic.",
        reasoning: "I've reviewed the available information and can synthesize a comprehensive answer.",
        confidence: 0.85
      },
      {
        text: "The key factors to consider here are the underlying principles and practical applications.",
        reasoning: "I've identified the core concepts and can explain their interrelationships.",
        confidence: 0.78
      },
      {
        text: "This requires careful consideration of multiple perspectives to ensure a balanced approach.",
        reasoning: "I need to weigh different viewpoints and find common ground.",
        confidence: 0.72
      },
      {
        text: "The evidence suggests this is the most likely explanation given current understanding.",
        reasoning: "I've evaluated the available data and found strong support for this conclusion.",
        confidence: 0.88
      },
      {
        text: "While there's some uncertainty, this appears to be the best course of action based on available information.",
        reasoning: "I've assessed the risks and benefits of various options.",
        confidence: 0.65
      }
    ];

    // Return varied responses based on prompt content hash
    const hash = prompt.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
    const response = responses[hash % responses.length];

    return response;
  }

  get chat() {
    return {
      completions: {
        create: async (params: any) => {
          const prompt = params.messages?.[params.messages.length - 1]?.content || '';
          const response = await this.callLLM(prompt);

          // Return realistic response format
          return {
            choices: [
              {
                message: {
                  role: 'assistant',
                  content: response.text || ''
                }
              }
            ]
          } as any;
        }
      }
    };
  }
}

export default MockZAI;
