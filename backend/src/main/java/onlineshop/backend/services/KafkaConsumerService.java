package onlineshop.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.validation.Valid;
import onlineshop.backend.models.olap.OlapTransactions;
import onlineshop.backend.models.olap.Products;
import onlineshop.backend.models.olap.Users;
import onlineshop.backend.models.oltp.OltpTransactions;
import onlineshop.backend.repositories.olap.OlapTransactionRepository;
import onlineshop.backend.repositories.olap.ProductRepository;
import onlineshop.backend.repositories.olap.UserRepository;

@Service
@Transactional
public class KafkaConsumerService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OlapTransactionRepository olapTransactionRepository;

    @KafkaListener(topics = "transaction", groupId = "order")
    public void consume(@Valid OltpTransactions oltpTransactions) {
        Users user = userRepository.findById(oltpTransactions.getUserId()).orElse(null);
        Products product = productRepository.findById(oltpTransactions.getProductId()).orElse(null);
        
        OlapTransactions olapTransactions = OlapTransactions.builder()
            .transactionId(oltpTransactions.getTransactionId())
            .user(user)
            .product(product)
            .status(oltpTransactions.getStatus())
            .createdAt(oltpTransactions.getCreatedAt())
            .updatedAt(oltpTransactions.getUpdatedAt())
            .build();

        olapTransactionRepository.save(olapTransactions);
    }
}
