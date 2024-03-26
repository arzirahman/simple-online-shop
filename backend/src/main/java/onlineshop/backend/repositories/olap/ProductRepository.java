package onlineshop.backend.repositories.olap;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import onlineshop.backend.dtos.responses.ProductResponseDTO;
import onlineshop.backend.models.olap.Products;

public interface ProductRepository extends JpaRepository<Products, UUID> {
    @Query("SELECT NEW onlineshop.backend.dtos.responses.ProductResponseDTO("+
            "p.productId, p.name, p.image, p.rating, p.price, COALESCE(COUNT(t), 0)) " +
            "FROM Products p " +
            "LEFT JOIN p.transactions t ON t.status = 'completed' " +
            "WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "GROUP BY p.productId " +
            "ORDER BY COALESCE(COUNT(t), 0) DESC")
    List<ProductResponseDTO> findAllProduct(String search);
}
