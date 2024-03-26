package onlineshop.backend.repositories.oltp;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import onlineshop.backend.models.oltp.OltpTransactions;

public interface OltpTransactionRepository extends MongoRepository<OltpTransactions, UUID> {
    
}
