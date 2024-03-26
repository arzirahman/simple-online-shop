package onlineshop.backend.repositories.olap;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import onlineshop.backend.models.olap.OlapTransactions;

public interface OlapTransactionRepository extends JpaRepository<OlapTransactions, UUID> {

}
