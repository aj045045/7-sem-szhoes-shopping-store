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
        encodeText = preProcess.encode_text(answer)
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

    @staticmethod
    def searchFaq(query:str):
        preProcess = PreProcessingService()
        encodedText = preProcess.encode_text(query)
        vs = VectorService()
        value = vs.query_vector('faq',encodedText.tolist())
        faq_items = FaqModel.objects(id__in=value)
        faq_data = [ {**faq.to_mongo().to_dict(), "_id": str(faq.id)} for faq in faq_items ]
        return faq_data
    
    @staticmethod
    def updateFaq(faqId:str,question:str,answer:str):
        model = FaqModel.objects(id=faqId).first()
        model.answer = answer
        model.question = question
        model.save()
        preProcess = PreProcessingService()
        encodeText = preProcess.encode_text(answer)
        vs = VectorService()
        vs.update_vector('faq',str(model.id),encodeText)
        
    @staticmethod
    def deleteFaq(faqId:str):
        model = FaqModel.objects(id=faqId).first()
        vs = VectorService()
        vs.delete_vector('faq',str(model.id))
        model.delete()
        
    @staticmethod
    def faqBot(query:str):
        preProcess = PreProcessingService()
        encodedText = preProcess.encode_text(query)
        vs = VectorService()
        value = vs.query_vector('faq',encodedText.tolist(),1)
        faq_items = FaqModel.objects(id=value[0]).first()
        faq_data = {**faq_items.to_mongo().to_dict(), "_id": str(faq_items.id)}
        return faq_data['answer']