from app.services.vector import VectorService
from app.services.pre_processing import PreProcessingService
from app.models.faq import FaqModel

class FaqService:
    
    @staticmethod
    def addFaq(question:str,answer:str):
        model = FaqModel()
        model.answer = answer
        model.question = question
        model.save()
        preProcess = PreProcessingService()
        newText = preProcess.preprocess_text(answer)
        encodeText = preProcess.encode_text(newText)
        vs = VectorService()
        vs.add_vector('faq',str(model.id),encodeText)

    @staticmethod
    def getFaq(page:int):
        per_page = 5
        skip = (page - 1) * per_page
        faqs = FaqModel.objects.skip(skip).limit(per_page)
        faq_data = [
            {**faq.to_mongo().to_dict(), "_id": str(faq.id)} for faq in faqs
        ]
        total_faqs = FaqModel.objects.count()
        data = {}
        data['faqs'] = faq_data
        data['total_faqs'] = total_faqs
        data['page'] = page
        data['total_pages'] = (total_faqs + per_page - 1) // per_page
        return data