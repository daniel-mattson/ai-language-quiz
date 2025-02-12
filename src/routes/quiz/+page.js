export async function load({ fetch }) {
    const response = await fetch('/quiz');
    const questions = await response.json();

    if (response.ok) {
        return { questions };
    }

    return {
        status: response.status,
        error: new Error('Could not fetch questions'),
    };
};