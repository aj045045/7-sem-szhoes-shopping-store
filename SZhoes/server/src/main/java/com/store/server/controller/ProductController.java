package com.store.server.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.server.container.enums.ItemColor;
import com.store.server.container.enums.ItemSize;
import com.store.server.container.request.ProductDTO;
import com.store.server.container.request.ProductUpdateDTO;
import com.store.server.container.response.ProductResponseDTO;
import com.store.server.service.ItemService;
import com.store.server.service.ProductService;
import com.store.server.util.ResponseUtil;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/auth/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ItemService itemService;

    @GetMapping("/colors")
    public ResponseEntity<?> getItemColors() {
        return ResponseUtil.createResponse("List of Colors", ItemColor.toList());
    }

    @GetMapping("/category")
    public ResponseEntity<?> getCategoryList() {
        return ResponseUtil.createResponse("List of category", itemService.getActiveCategories());
    }

    @GetMapping("/sizes")
    public ResponseEntity<?> getItemSizes() {
        return ResponseUtil.createResponse("List of Sizes", ItemSize.toList());
    }

    @PostMapping
    public ResponseEntity<?> postCreateProduct(@RequestBody ProductDTO dto) throws Exception {
        String id = itemService.createItem(dto.getSize(), dto.getPrice(), dto.getDiscount(), dto.getItems(),
                dto.getColor(), dto.getDetail(), dto.getWarehouseId(), dto.getQuantity(), dto.getMaxReorder(),
                dto.getMinReorder());
        ArrayList<String> ids = new ArrayList<>();
        ids.add(id);
        productService.createProduct(dto, ids);
        return ResponseUtil.createResponse("data");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductItem(@PathVariable String id) {
        ProductResponseDTO response = productService.findProductItems(id);
        return ResponseUtil.createResponse("Product Item", response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putProductData(@PathVariable String id, @RequestBody ProductUpdateDTO model)
            throws Exception {
        productService.updateProduct(id, model.getProducts(), model.getName(),
                model.getTitle(),
                model.getAbout(), model.getCategoryId(), model.getDescription());
        return ResponseUtil.createResponse("Data Updated");
    }

    @DeleteMapping("/image/{productId}")
    public ResponseEntity<?> deleteImage(@PathVariable("productId") String productId, @RequestParam String id)
            throws Exception {
        productService.deleteImage(productId, id);
        return ResponseUtil.createResponse("Image deleted");
    }

}
