package onlineshop.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import onlineshop.backend.dtos.requests.ProductRequestDTO;
import onlineshop.backend.dtos.responses.BodyResponseDTO;
import onlineshop.backend.dtos.responses.ProductResponseDTO;
import onlineshop.backend.repositories.olap.ProductRepository;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public ResponseEntity<BodyResponseDTO> getProducts(ProductRequestDTO request) {
        String search = request.getSearch() == null ? "" : request.getSearch();

        List<ProductResponseDTO> products = productRepository.findAllProduct(search);

        BodyResponseDTO bodyResponseDTO = BodyResponseDTO.builder()
            .statusCode(HttpStatus.OK.value())
            .status(HttpStatus.OK.name())
            .message("Successfully retrieved the list of products")
            .data(products)
            .build();

        return ResponseEntity.ok().body(bodyResponseDTO);
    }
}
