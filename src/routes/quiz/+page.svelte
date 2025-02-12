<script>
	import './button-styles.css';

    const { data } = $props();
    const { questions } = data;

    let questionNumber = $state(0);

    let currentQuestion = $derived(questions[questionNumber]);
    let hasNextQuestion = $derived(questionNumber < questions.length - 1);
    
    let givenAnswer = $state('');

    let answered = $derived(givenAnswer !== '');
    let answeredCorrectly = $derived(givenAnswer === currentQuestion.answer);

    let message = $derived(answeredCorrectly ? 'Correct!' : 'Incorrect!');

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

<div class='quiz'>
	<div class='question'>{currentQuestion.question}</div>
    <div class='answer-grid upsilon'>
        {#each currentQuestion.options as option}
        <div>
            <button 
                onclick={() => checkAnswer(option)}
                class='btn btn-dark answer' 
                class:btn-light={option === givenAnswer}
                disabled={answered}
                class:btn-disabled={answered}
            >
                {option}
            </button>
        </div>
    {/each}
    </div>
    {#if answered}
        <p class='message' class:correct={answeredCorrectly}>{message}</p>
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
        <p>All questions answered.</p>
        {/if}

    {/if}
    
</div>

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
        grid-template-columns: auto auto;
        gap: 1rem;
    }

    .answer {
        font-size: 2rem;
        width: 100%;
        height: 100%;
    }

    .message {
        font-size: 2rem;
        color: #FF006A;
    }

    .correct {
        color: #52C11F;
    }

    /* .selected {
        background: rgba(0, 0, 0, 0.1);
        color: black;
    } */
</style>
