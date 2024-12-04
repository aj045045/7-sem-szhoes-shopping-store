import re
import nltk
import spacy
from textblob import TextBlob
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from transformers import BertTokenizer, BertModel
import torch

# Download necessary NLTK resources
nltk.download('punkt',quiet=True)
nltk.download('stopwords',quiet=True)
nltk.download('wordnet',quiet=True)

# Load SpaCy model for entity recognition
nlp = spacy.load("en_core_web_sm")

class PreProcessingService:
    
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')
    
    def preprocess_text(self, text: str) -> str:
        """
        Preprocess the text by applying several techniques:
        - Lowercasing
        - Removing punctuation
        - Removing stop words
        - Spell correction
        - Lemmatization
        - Entity recognition (optional: removing entities or keeping them)
        - Removing duplicates

        Args:
            text (str): The input text to preprocess.

        Returns:
            str: The preprocessed text.
        """
        # Lowercasing
        text = text.lower()

        # Remove punctuation
        text = re.sub(r'[^\w\s]', '', text)

        # Tokenize the text
        words = word_tokenize(text)

        # Stop word removal
        stop_words = set(stopwords.words('english'))
        words = [word for word in words if word not in stop_words]

        # Spell correction using TextBlob
        corrected_words = [str(TextBlob(word).correct()) for word in words]

        # Lemmatization
        lemmatizer = WordNetLemmatizer()
        lemmatized_words = [lemmatizer.lemmatize(word) for word in corrected_words]

        # Remove duplicate words
        lemmatized_words = list(dict.fromkeys(lemmatized_words))

        # Optional: Named entity recognition (keeping only entities or removing them)
        doc = nlp(" ".join(lemmatized_words))
        entities = [ent.text for ent in doc.ents]

        # For example, removing named entities (comment out if you want to keep them)
        lemmatized_words = [word for word in lemmatized_words if word not in entities]

        # Join the words back into a single string
        preprocessed_text = " ".join(lemmatized_words)

        return preprocessed_text

    def encode_text(self, text: str):
        """
        Encodes preprocessed text into BERT embeddings.

        Args:
            text (str): The input text to encode.

        Returns:
            numpy.ndarray: The embedding of the input text.
        """
        # Preprocess the text
        preprocessed_text = self.preprocess_text(text)

        # Tokenize and encode the preprocessed text
        inputs = self.tokenizer(preprocessed_text, return_tensors="pt", truncation=True, padding=True, max_length=512)
        
        with torch.no_grad():
            # Forward pass through the BERT model
            outputs = self.model(**inputs)
        
        # Use the [CLS] token's embedding as the text representation
        return outputs.last_hidden_state[:, 0, :].squeeze().numpy()  # Shape: (768,)
