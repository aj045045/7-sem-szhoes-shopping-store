from pinecone import Pinecone, ServerlessSpec

class VectorService:
    def __init__(self) -> None:    
        api_key = "pcsk_7K5vsV_HkbqxtMiUVA3fzqCD8ginQFuhtJHBo5DrwLhruycNxTChEUkMPw89BotFESP9Vo"
        self.pc = Pinecone(api_key=api_key)
                

    def list_indexes(self) -> None:
        indexes = self.pc.list_indexes().names()
        print("Available indexes:", indexes)

    def delete_index(self, index: str) -> None:
        if index in self.pc.list_indexes().names():
            self.pc.delete_index(index)
            print(f"Index '{index}' deleted successfully!")
        else:
            print(f"Index '{index}' does not exist.")

    def add_vector(self, index: str, vector_id: str, values: list[float], metadata: dict = None) -> None:
        if index in self.pc.list_indexes().names():
            index_client = self.pc.get_index(index)
            index_client.upsert(items=[(vector_id, values, metadata)])
            print(f"Vector '{vector_id}' added to index '{index}' successfully!")
        else:
            print(f"Index '{index}' does not exist. Please create it first.")

    def query_vector(self, index: str, query_values: list[float], top_k: int = 10) -> None:
        if index in self.pc.list_indexes().names():
            index_client = self.pc.get_index(index)
            results = index_client.query(queries=[query_values], top_k=top_k)
            print("Query Results:")
            for match in results.matches:
                print(f"ID: {match.id}, Score: {match.score}")
        else:
            print(f"Index '{index}' does not exist.")

    def delete_vector(self, index: str, vector_id: str) -> None:
        if index in self.pc.list_indexes().names():
            index_client = self.pc.get_index(index)
            index_client.delete(ids=[vector_id])
            print(f"Vector '{vector_id}' deleted from index '{index}' successfully!")
        else:
            print(f"Index '{index}' does not exist.")