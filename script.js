const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true ;
}
 
// show new quote
function newQuote() {
    loading();
// pick a random quote from apiquotes array
console.log(apiQuotes);
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
console.log(quote);
// check if author filed is blank and replace it with 'unknown'
 if (!quote.author) {
     authorText.textContent = 'unknown';
 } else {
     authorText.textContent = quote.author;
 }
//  check quote length to deteremine styling
if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');


}
// set quote ,hide loader
quoteText.textContent = quote.text;
complete();
}


//  Get quotes from api 

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
   const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote();
    
  } catch (error) {
        // catch error here
    }

}
// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, `_blank`);
}
// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener(`click`, tweetQuote);

// on Load
 getQuotes();

