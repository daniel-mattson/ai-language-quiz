export async function load({ fetch, params, url }) {
    const { language } = params;
    const { searchParams } = url;
    const key = searchParams.get('key');

    const response = await fetch(`/quiz/${language}?key=${key}`);
    const data = await response.json();

    if (response.ok) {
        return data;
    }

    return {
        status: response.status,
        error: new Error('Could not fetch questions'),
    };
};