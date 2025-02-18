import { json } from "@sveltejs/kit";
import { GoogleGenerativeAI } from "@google/generative-ai";

import germanQuestions from './questions/German.json';
import dutchQuestions from './questions/Dutch.json';
import portugueseQuestions from './questions/Portuguese.json';

// Enter a valid API Key here. One can be obtained from https://aistudio.google.com/apikey
const apiKey = '';

export async function GET({ params }) {
    const { language } = params;
    let questions;
    if (apiKey.length) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            You are an advanced language teacher, fluent in both English and ${language}.

            I need a set of 10 multiple choice questions. 
            * Each question consists of a ${language} word (the "question"), and four English words (the "options").
            * One (and only one) of the English words is the correct translation for the ${language} word (the "answer").
            * Throughout your whole response, do NOT repeat any words.
            * Your response must be in the form of a valid JSON string, ready to use, without the triple backtick format specifier.

            Your response must be formatted like this (but don't use these exact questions):

            [{ "question": "Kolibri", "options": [ "Pigeon", "Eagle", "Parrot", "Hummingbird" ], "answer": "Hummingbird" }, { "question": "Kunstler", "options": [ "Builder", "Artist", "Magician", "Tailor" ], "answer": "Artist" }]
        `;
        
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
        questions = {
            German: germanQuestions,
            Dutch: dutchQuestions,
            Portuguese: portugueseQuestions,
        }[language];
    }

    return json(questions);
};