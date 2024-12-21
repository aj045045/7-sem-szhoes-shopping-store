package com.store.server.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.server.container.request.ProductDTO;
import com.store.server.container.response.ProductResponseDTO;
import com.store.server.model.ProductModel;
import com.store.server.repository.ItemRepo;
import com.store.server.repository.ProductRepo;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private ItemRepo itemRepo;

    public void createProduct(ProductDTO dto, ArrayList<String> id) throws Exception {
        ProductModel model = new ProductModel();
        model.setName(dto.getName());
        model.setTitle(dto.getTitle());
        model.setCategoryId(dto.getCategoryId());
        model.setAbout(dto.getAbout());
        model.setDescription(dto.getDescription());
        model.setCreatedAt();
        model.setImages(dto.getProducts());
        model.setItemIds(dto.getItemIds());
        model.setItemIds(id);
        model.setReferenceProductId(dto.getReferenceProductId());
        productRepo.save(model);
        if (model.getId().isBlank()) {
            throw new Exception("Error occur try after some time");
        }
    }

    public ProductResponseDTO findProductItems(String id) {
        ProductModel product = productRepo.findById(id).orElse(new ProductModel());
        ProductResponseDTO responseDTO = new ProductResponseDTO();
        responseDTO.setProduct(product);
        responseDTO.setItems(itemRepo.findAllById(product.getItemIds()));
        return responseDTO;
    }

    public void updateProduct(String id, ArrayList<String> images, String name, String title, String about,
            String category, String description) throws Exception {
        Map<String, String> descriptionMap = new HashMap<>();
        ProductModel model = productRepo.findById(id).orElseThrow(() -> new Exception("Error occur product not found"));
        ArrayList<String> img = model.getImages();
        if (img == null) {
            img = new ArrayList<>();
        }
        if (images != null) {
            img.addAll(images);
        }
        model.setImages(img);
        model.setName(name);
        model.setTitle(title);
        model.setAbout(about);

        String[] pairs = description.split(",");
        for (String pair : pairs) {
            String[] keyValue = pair.split(":");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();
                descriptionMap.put(key, value);
            }
        }
        model.setDescription(descriptionMap);
        model.setCategoryId(category);
        productRepo.save(model);
    }

    public void deleteImage(String productId, String imageId) throws Exception {
        ProductModel model = productRepo.findById(productId)
                .orElseThrow(() -> new Exception("Error occur product not found"));
        ArrayList<String> image = model.getImages();
        image.remove("/" + imageId);
        model.setImages(image);
        productRepo.save(model);
    }

    public void deactivateProduct() {

    }
}
