package onlineshop.backend.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import onlineshop.backend.models.Products;

public interface ProductRepository extends JpaRepository<Products, UUID> {
    @Query("SELECT p FROM Products p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Products> findAllProduct(String search);
}
