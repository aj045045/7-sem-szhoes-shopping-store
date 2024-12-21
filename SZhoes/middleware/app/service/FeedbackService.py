import nltk
from nltk import pos_tag, word_tokenize
from autocorrect import Speller
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords, wordnet
import unidecode
import contractions
from . import MongoCollection

nltk.download('punkt', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

class FeedbackService:
    
    def __init__(self):
        self.stemmer = PorterStemmer()
        self.stop_words = set(stopwords.words('english'))
        self.ecommerce_terms = {'shop', 'sell', 'purchase', 'cart', 'checkout', 'order', 'customer', 'review', 'price', 'discount', 'shoe', 'sneaker', 'footwear'}

    def descriptionKeys(self):
        collection = MongoCollection().get_collection('feedback')
        descriptions = []
        for feedback in collection.find():
            descriptions.append(feedback['description'])
        return self._preprocess(' '.join(descriptions))

    def _preprocess(self, text: str) -> list:
        """Run all preprocessing steps and return a list of e-commerce-related keywords."""
        text = self._remove_accents(text)
        text = self._checking_text(text)
        text = self._removing_words(text)
        return self._semantic_filter(text)

    def _remove_accents(self, text: str) -> str:
        return unidecode.unidecode(text)

    def _checking_text(self, text: str) -> str:
        spell = Speller(lang='en')
        text = contractions.fix(text)
        return ' '.join([spell(word) for word in text.split()])

    def _removing_words(self, text: str) -> list:
        """Filter words by parts of speech and initial semantic filtering."""
        words = word_tokenize(text)
        tagged_words = pos_tag(words)
        unique_words = []
        for word, pos in tagged_words:
            if pos not in ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 'MD', 'DT', 'IN', 'CC', 'TO', 'PRP'] and word not in unique_words:
                unique_words.append(word)
        tokens = [word for word in unique_words if word.isalpha() and word.lower() not in self.stop_words]
        return [self.stemmer.stem(word) for word in tokens]

    def _semantic_filter(self, words: list) -> list:
        """Refine list to only include words semantically related to e-commerce and shoes."""
        filtered_words = []
        for word in words:
            synsets = wordnet.synsets(word)
            for syn in synsets:
                # Check if any hypernym matches our e-commerce terms or shoe-related categories
                if any(ecom_term in syn.lemma_names() for ecom_term in self.ecommerce_terms) or any(hypo in syn.definition() for hypo in ['shoe', 'footwear', 'sell', 'purchase', 'commerce']):
                    filtered_words.append(word)
                    break
        return list(set(filtered_words))  # Return unique words only
