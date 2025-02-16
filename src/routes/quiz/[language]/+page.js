export async function load({ fetch, params }) {
    const { language } = params; 
    const response = await fetch(`/quiz/${language}`);
    const questions = await response.json();

    if (response.ok) {
        return { questions };
    }

    return {
        status: response.status,
        error: new Error('Could not fetch questions'),
    };
};