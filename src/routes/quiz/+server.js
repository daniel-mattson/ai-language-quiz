import { json } from "@sveltejs/kit";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Enter a valid API Key here. One can be obtained from https://aistudio.google.com/apikey
const apiKey = '';

const prompt = `
    You are an advanced language teacher, fluent in both English and German.

    I need a set of 10 multiple choice questions. 
    * Each question consists of a German word (the "question"), and four English words (the "options").
    * One (and only one) of the English words is the correct translation for the German word (the "answer").
    * Throughout your whole response, do NOT repeat any words.
    * Your response must be in the form of a valid JSON string, ready to use, without the triple backtick format specifier.

    Your response must be formatted like this (but don't use these exact questions):

    [{ "question": "Kolibri", "options": [ "Pigeon", "Eagle", "Parrot", "Hummingbird" ], "answer": "Hummingbird" }, { "question": "Kunstler", "options": [ "Builder", "Artist", "Magician", "Tailor" ], "answer": "Artist" }]
`;

export async function GET() {
    let questions;
    if (apiKey.length) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(prompt);
    
        let response = result.response.text();
    
        while (response[0] !== '[') {
            response = response.substring(1);
        }
        while (response.at(-1) !== ']') {
            response = response.substring(0, response.length - 1);
        }
    
        questions = JSON.parse(response);
    } else {
        // Uses prefetched dummy data in the absence of an API key
        questions = [
            {
                question: 'Apfel',
                options: [ 'Orange', 'Apple', 'Pear', 'Banana', ],
                answer: 'Apple',
            },
            {
                question: 'Tante',
                options: [ 'Uncle', 'Aunt', 'Niece', 'Nephew', ],
                answer: 'Aunt',
            },
            {
                question: 'Straße',
                options: [ 'Road', 'River', 'Building', 'Park' ],
                answer: 'Road'
            },
            {
                question: 'Baum',
                options: [ 'Car', 'Tree', 'Cat', 'Sun' ],
                answer: 'Tree'
            },
            {
                question: 'Buch',
                options: [ 'Pen', 'Book', 'Window', 'Door' ],
                answer: 'Book'
            },
            {
                question: 'Fenster',
                options: [ 'Wall', 'Window', 'Flower', 'Sky' ],
                answer: 'Window'
            },
            {
                question: 'Tisch',
                options: [ 'Chair', 'Table', 'Lamp', 'Bed' ],
                answer: 'Table'
            },
            {
                question: 'Blume',
                options: [ 'Rose', 'Tulip', 'Flower', 'Daisy' ],
                answer: 'Flower'
            },
            {
                question: 'Katze',
                options: [ 'Bird', 'Cow', 'Cat', 'Horse' ],
                answer: 'Cat'
            },
            {
                question: 'Sonne',
                options: [ 'Moon', 'Star', 'Sun', 'Planet' ],
                answer: 'Sun'
            },
          ]
    }

    return json(questions);
};