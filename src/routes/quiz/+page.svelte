<script>
	import './button-styles.css';

    const languages = ['German', 'Dutch', 'Portuguese'];
    let language = $state(languages[0]);
</script>

<div class='text-column quiz-settings'>
    <div class='select-language'>
        <label for="language" class='select label'>Select language:</label>
        <select name="language" id="language" bind:value={language} class='select'>
            {#each languages as language (language)}
                <option class='select' value={language}>{language}</option>
            {/each}
        </select>
    </div>
    <div class='start-button'>
        <a href='/quiz/{language}'>
            <div class='upsilon'>
                <button class='btn btn-dark'>Start the quiz</button>
            </div>
        </a>
    </div>
</div>

<style>
    .select-language {
        margin-top: auto;
    }

    .btn {
        font-size: 1.5rem;
    }

    .quiz-settings {
        align-items: center;
    }

    .select {
        font-size: 1.5rem;
        color: black;
    }

    .label {
        margin-bottom: 0.5rem;
    }

    .start-button {
        margin-top: auto;
    }
</style>