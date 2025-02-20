<script>
	import './button-styles.css';

    // Enter a valid API Key here. One can be obtained from https://aistudio.google.com/apikey

    const languages = ['German', 'Dutch', 'Portuguese'];

    let language = $state(languages[0]);
    let useSavedQuestions = $state(false);
    let key = $state('');

    let cannotStart = $derived(!useSavedQuestions && key === '')
</script>

<form method="POST" action="/quiz/{language}" class='text-column quiz-settings'>
    <div class='select-language'>
        <label for="language" class='label'>Select language:</label>
        <select name="language" id="language" bind:value={language} class='select'>
            {#each languages as language (language)}
                <option value={language}>{language}</option>
            {/each}
        </select>
    </div>

    <div class='use-saved-questions'>
        <label class='radio'>
            <input class='radio' type='radio' name='use-saved-questions' value={false} bind:group={useSavedQuestions} />
            Get questions from Gemini
        </label>
        <br />
        <label class='text-input-label {useSavedQuestions ? 'disabled-label' : ''}'>
            Gemini API Key:
            <input class='text-input' type='text' disabled={useSavedQuestions} bind:value={key} name='key' />
            <br />
            <span class='info'>API Keys can be obtained from <a href='https://aistudio.google.com/apikey' target='_blank' rel='noopener noreferrer'>aistudio.google.com/apikey</a></span>
        </label>
        <br />
        <label>
            <input class='radio' type='radio' name='use-saved-questions' value={true} bind:group={useSavedQuestions} />
            Use saved questions
        </label>
    </div>

    <div class='start-button'>
        <div class='upsilon'>
            <button class="btn btn-dark {cannotStart ? 'btn-disabled' : ''}" disabled={cannotStart}>Start the quiz</button>
        </div>
    </div>
</form>

<style>
    .quiz-settings {
        align-items: center;
        font-size: 1.5rem;
        color: black;
    }

    .select-language {
        margin-top: auto;
    }

    .select {
        font-size: 1.5rem;
    }

    .use-saved-questions {
        margin-top: auto;
    }

    .info {
        font-size: 1rem;
        padding-left: 2.5rem;
    }

    .radio {
        margin-top: 2rem;
    }

    .disabled-label {
        color: rgba(0, 0, 0, 0.5)
    }

    .text-input-label {
        padding-left: 2.5rem;
    }

    .text-input {
        margin-top: 0.5rem;
    }

    .start-button {
        margin-top: auto;
    }
</style>