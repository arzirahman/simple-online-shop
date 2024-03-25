package onlineshop.backend.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import onlineshop.backend.models.Transactions;

public interface TransactionRepository extends JpaRepository<Transactions, UUID> {
    
}
