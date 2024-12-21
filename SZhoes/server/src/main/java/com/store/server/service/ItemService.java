package com.store.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import com.store.server.container.enums.ItemColor;
import com.store.server.container.response.ItemResponseDTO;
import com.store.server.document.ItemDiscount;
import com.store.server.model.ItemModel;
import com.store.server.repository.ItemRepo;

@Service
public class ItemService {
    private final MongoTemplate mongoTemplate;
    private final ItemRepo itemRepo;

    public ItemService(MongoTemplate mongoTemplate, ItemRepo itemRepo) {
        this.mongoTemplate = mongoTemplate;
        this.itemRepo = itemRepo;
    }

    public String createItem(int size, long price, ArrayList<ItemDiscount> discounts,
            ArrayList<String> images, ItemColor color,
            Map<String, String> detail, String warehouseId, long quantity,
            long maxReorder, int minReorder) throws Exception {
        ItemModel model = new ItemModel();
        model.setSize(size);
        model.setPrice(price);
        model.setColor(color);
        model.setDetail(detail);
        model.setQuantity(quantity);
        model.setMaxReorderLevel(maxReorder);
        model.setMinReorderLevel(minReorder);
        model.setImages(images);
        model.setCreatedAt();
        model.setWarehouseId(warehouseId);
        itemRepo.save(model);
        if (model.getId().isBlank()) {
            throw new Exception("Error occur try after some time");
        }
        return model.getId();
    }

    public void findItem() {

    }

    public void updateItem() {

    }

    public void deleteItem() {

    }

    public void addDiscount() {

    }

    public void updateDiscount() {

    }

    public void deleteDiscount() {

    }

    public void deactivateItem() {

    }

    public void updateReorderLevel() {

    }

    public void restock() {

    }

    public List<ItemResponseDTO> getActiveCategories() {
        AggregationOperation matchStage = Aggregation.match(Criteria.where("isActive").is(true));
        AggregationOperation projectStage = Aggregation.project("_id")
                .andExpression("concat(tag, ' -> ', title)").as("Category");
        Aggregation aggregation = Aggregation.newAggregation(matchStage, projectStage);
        AggregationResults<ItemResponseDTO> results = mongoTemplate.aggregate(aggregation, "category",
                ItemResponseDTO.class);
        return results.getMappedResults();
    }
}
