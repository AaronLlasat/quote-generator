//Variable declaration
let apiQuotes = [];
let quote = "";

//DOM manipulation
let quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let newQuoteBtn = document.getElementById("new-quote");
let tweetBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

//Show or hide loader
const stateOfLoader = (loading) => {
    if (loading) {
        loader.hidden = false;
        quoteContainer.hidden = true;
    } else {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

//Get Quotes From API
async function getQuotes() {
    stateOfLoader(true);
    const apiUrl = "https://type.fit/api/quotes";
    try {
        //awaits: it forces the assignment to wait until the data is fetched (otherwise you'd get an error because the data isn't fetched prior to the assignment)
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //If it fails to fetch the quotes from the API, we're using the local quotes located in the "quotes.js" file
        if (localQuotes.length<=0) {
            stateOfLoader(false);
            quoteText.innerText = "If the local quotes file exists does not and the API URL wrong is, I cannot find where the f*ck this quote lives";
            authorText.innerText = "Drunken Master Yoda";
        } else {
            apiQuotes = localQuotes;
            newQuote();
        }
        
    }
    
}


//Random Quote On Click
const newQuote = () => {
    stateOfLoader(true);
    //We select a random quote
    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //If the quote is longer than 120 characters, we add the "long-quote" CSS class to the HTML element
    quote.text.length > 120 ? quoteText.classList.add("long-quote") : quoteText.classList.remove("long-quote");
    quoteText.innerText = quote.text;
    //We check if the author of the quote is unknown
    quote.author === null ? authorText.innerText = "Unknown" : authorText.innerText = quote.author;
    stateOfLoader(false);
}


//Tweet Quote
const tweetQuote = () => {
    //We open a new blank tab to tweet the quote
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//We add the event listeners to the buttons
newQuoteBtn.addEventListener("click", newQuote);
tweetBtn.addEventListener("click", tweetQuote);


//On load
getQuotes();