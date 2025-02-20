export async function load({ fetch, params }) {
    const { language } = params;

    const response = await fetch(`/quiz/${language}`);
    const data = await response.json();

    if (response.ok) {
        return data;
    }

    return {
        status: response.status,
        error: new Error('Could not fetch questions'),
    };
};

export const actions = {
	default: async ({ fetch, request }) => {
		const formData = await request.formData();
		const key = formData.get('key');
        const language = formData.get('language');

        if (key) {
            const response = await fetch(`/quiz/${language}?key=${key}`);
            const data = await response.json();

            if (response.ok) {
                return data;
            }

            return {
                status: response.status,
                error: new Error('Could not fetch questions'),
            };
        }

        return null;
	},
};