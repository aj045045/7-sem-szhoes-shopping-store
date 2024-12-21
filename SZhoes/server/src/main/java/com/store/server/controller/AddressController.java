package com.store.server.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.server.service.AddressService;
import com.store.server.util.ResponseUtil;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public ResponseEntity<?> postCreateAddress(@RequestBody Map<String, String> entityJson) {
        String id = addressService.createAddress(entityJson.get("street"), entityJson.get("city"),
                entityJson.get("state"), entityJson.get("country"), entityJson.get("zip"));
        return ResponseUtil.createResponse("New address added", id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllAddress(@PathVariable String id) throws Exception {
        Map<String, Object> addresses = addressService.findAddress(id);
        return ResponseUtil.createResponse("All Address", addresses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putUpdateAddress(@PathVariable String id, @RequestBody Map<String, String> entityJson)
            throws Exception {
        String responseId = addressService.updateAddress(id, entityJson.get("street"), entityJson.get("city"),
                entityJson.get("state"), entityJson.get("country"), entityJson.get("zip"));
        return ResponseUtil.createResponse("Your address is changed", responseId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable String id) {
        addressService.deleteAddress(id);
        return ResponseUtil.createResponse("Delete address successful");
    }
}
