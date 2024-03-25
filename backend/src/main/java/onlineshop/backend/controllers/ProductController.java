package onlineshop.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import onlineshop.backend.dtos.requests.ProductRequestDTO;
import onlineshop.backend.dtos.responses.BodyResponseDTO;
import onlineshop.backend.services.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<BodyResponseDTO> getProducts(@ModelAttribute ProductRequestDTO requestDTO) {
        return productService.getProducts(requestDTO);
    }
}
