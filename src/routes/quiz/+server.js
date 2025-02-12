import { json } from "@sveltejs/kit";
/*import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = '';

const prompt = `
    I need a set of 10 multiple choice questions. 
    * Each question consists of a German word (the "question"), and four English words (the "options").
    * One (and only one) of the English words is the correct translation for the German word (the "answer").
    * Throughout your whole response, do not repeat any words.
    * Your response must be in the form of a valid JSON string, ready to use, without the triple backtick format specifier.

    Your response must be formatted like this (but don't use these exact questions):

    [{ "question": "Vogel", "options": [ "Deer", "Frog", "Bird", "Goat" ], "answer": "Bird" }, { "question": "Hemd", "options": [ "Shirt", "Hat", "Trousers", "Dress" ], "answer": "Shirt" }]
`;*/

export async function GET() {
    /*const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);

    let response = result.response.text();

    console.log({ responseBefore: response } );

    while (response[0] !== '[') {
        response = response.substring(1);
    }
    while (response.at(-1) !== ']') {
        response = response.substring(0, response.length - 1)
    }

    console.log({ responseAfter: response } );

    const questions = JSON.parse(response);

    console.log({ questions });*/

    const questions = [
        {
            question: 'Apfel',
            options: [
                'Orange',
                'Apple',
                'Pear',
                'Banana',
            ],
            answer: 'Apple',
        },
        {
            question: 'Tante',
            options: [
                'Uncle',
                'Aunt',
                'Niece',
                'Nephew',
            ],
            answer: 'Aunt',
        },
    ];

    return json(questions);
};