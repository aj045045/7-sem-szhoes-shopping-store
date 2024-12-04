from pinecone import Pinecone
import numpy as np

class VectorService:
    def __init__(self) -> None:    
        api_key = "pcsk_7K5vsV_HkbqxtMiUVA3fzqCD8ginQFuhtJHBo5DrwLhruycNxTChEUkMPw89BotFESP9Vo"
        self.pc = Pinecone(api_key=api_key)

    def list_indexes(self) -> None:
        indexes = self.pc.list_indexes().names()
        print("Available indexes:", indexes)

    def add_vector(self, index: str, vector_id: str, values: list[float], metadata: dict = None) -> None:
        if index in self.pc.list_indexes().names():
            index_client = self.pc.Index(index)
            index_client.upsert(vectors=[(vector_id, values, metadata)])
            print(f"Vector '{vector_id}' added to index '{index}' successfully!")
        else:
            print(f"Index '{index}' does not exist. Please create it first.")

    def query_vector(self, index: str, query_values: list[float], top_k: int = 3) -> None:
        if index in self.pc.list_indexes().names():
            index_client = self.pc.Index(index)
            results = index_client.query(vector=[query_values], top_k=top_k)
            value = [(i.id, i.score) for i in results.matches]
            return [x[0] for x in sorted(value, key=lambda x: x[1], reverse=True)]
        else:
            print(f"Index '{index}' does not exist.")

    def delete_vector(self, index: str, vector_id: str) -> None:
        if index in self.pc.list_indexes().names():
            index_client = self.pc.Index(index)
            index_client.delete(ids=[vector_id])
            print(f"Vector '{vector_id}' deleted from index '{index}' successfully!")
        else:
            print(f"Index '{index}' does not exist.")
            
    def update_vector(self, index: str, vector_id: str, values: list[float], metadata: dict = None) -> None:
        if index in self.pc.list_indexes().names():
            index_client = self.pc.Index(index)
            vector_info = index_client.fetch(ids=[vector_id])
            if vector_id in vector_info.get("vectors", {}):
                index_client.upsert(vectors=[(vector_id, values, metadata)])
                print(f"Vector '{vector_id}' updated in index '{index}' successfully!")
            else:
                print(f"Vector '{vector_id}' does not exist in index '{index}'. Cannot update non-existent vector.")
        else:
            print(f"Index '{index}' does not exist. Please create it first.")