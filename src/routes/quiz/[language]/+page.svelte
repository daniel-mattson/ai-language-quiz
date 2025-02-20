<script>
	import '../button-styles.css';

    const { data } = $props();
    const questions = data.questions ?? [];

    let questionNumber = $state(0);

    let currentQuestion = $derived(questions[questionNumber]);
    let hasNextQuestion = $derived(questionNumber < questions.length - 1);
    
    let givenAnswer = $state('');

    let answered = $derived(givenAnswer !== '');
    let answeredCorrectly = $derived(givenAnswer === currentQuestion?.answer);

    const checkAnswer = (option) => {
        givenAnswer = option;
    };

    const loadNextQuestion = () => {
        questionNumber++;
        givenAnswer = '';
    };
</script>

<svelte:head>
	<title>Quiz</title>
</svelte:head>

{#if questions.length}
    <div class='quiz'>
    	<div class='question'>{currentQuestion.question}</div>
        <div class='answer-grid upsilon'>
            {#each currentQuestion.options as option}
                <button 
                    onclick={() => checkAnswer(option)}
                    class="btn answer {option === givenAnswer ? (answeredCorrectly ? 'btn-primary' : 'btn-tertiary') : 'btn-dark'}"
                    disabled={answered}
                    class:btn-disabled={answered}
                >
                    {option}
                </button>
            {/each}
        </div>
        {#if answered}
            {#if answeredCorrectly}
                <p class='message correct'>
                    Correct!
                </p>
            {:else}
                <p class='message'>
                    <span class='incorrect'>Incorrect!</span> The correct answer was <span class='correct'>{currentQuestion.answer}</span>.
                </p>
            {/if}

            {#if hasNextQuestion}
            <div class='upsilon'>
                <button 
                    class='btn btn-dark'
                    onclick={loadNextQuestion}
                >
                    Next Question
                </button>
            </div>
            {:else}
                <p class='message'>All questions answered.</p>
            {/if}
        {/if}
    </div>
{:else}
    <div class='error'>
        Error: {data.status} {data.statusText}<br /><br />
        Reason: {data.reason}
    </div>
{/if}


<style>
    .quiz {
        text-align: center;
    }

    .question {
        font-size: 3rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    .answer-grid {
        display: grid;
        grid-template-columns: 50% 50%;
        gap: 1rem;
    }

    .answer {
        font-size: 2rem;
        width: 100%;
        height: 100%;
    }

    .message {
        font-size: 2rem;
    }

    .correct {
        color: #52C11F;
    }

    .incorrect {
        color: #FF006A;
    }

    .error {
        text-align: center;
        margin-top: 1rem;
        color: #FF006A;
        font-size: 1.5rem;
    }
</style>
