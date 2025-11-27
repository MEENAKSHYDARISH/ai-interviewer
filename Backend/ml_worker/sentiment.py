# simple sentiment + confidence using transformers or nltk (VADER)
from textblob import TextBlob

def analyze(text: str):
    tb = TextBlob(text)
    polarity = tb.sentiment.polarity
    subjectivity = tb.sentiment.subjectivity
    score = {
        'polarity': polarity,
        'subjectivity': subjectivity,
        'pass': polarity>0.0
    }
    return score
