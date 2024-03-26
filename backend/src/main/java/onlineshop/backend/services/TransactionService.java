package onlineshop.backend.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import onlineshop.backend.dtos.requests.CreateTransactionRequestDTO;
import onlineshop.backend.dtos.responses.BodyResponseDTO;
import onlineshop.backend.models.oltp.OltpTransactions;
import onlineshop.backend.repositories.oltp.OltpTransactionRepository;
import onlineshop.backend.utils.JwtUtil;

@Service
@Transactional
public class TransactionService {
    @Autowired
    OltpTransactionRepository oltpTransactionRepository;

    @Autowired
    private KafkaTemplate<String, OltpTransactions> kafkaTemplate;

    public ResponseEntity<BodyResponseDTO> createTransaction(CreateTransactionRequestDTO requestDTO) {
        UUID userId = JwtUtil.getCurrentUser().getUserId();
        UUID transactionId = UUID.randomUUID();
        UUID productId = UUID.fromString(requestDTO.getProductId());
        LocalDateTime time = LocalDateTime.now();
        String status = "ongoing";

        OltpTransactions oltpTransactions = new OltpTransactions(transactionId, userId, productId, status, time, time);
        oltpTransactionRepository.save(oltpTransactions);
        kafkaTemplate.send("transaction", oltpTransactions);

        BodyResponseDTO bodyResponseDTO = BodyResponseDTO.builder()
            .statusCode(HttpStatus.OK.value())
            .status(HttpStatus.OK.name())
            .message("Successfully Create Transaction")
            .data(null)
            .build();

        return ResponseEntity.ok().body(bodyResponseDTO);
    }

    public ResponseEntity<BodyResponseDTO> getTransactions() {
        List<OltpTransactions> oltpTransactions = oltpTransactionRepository.findAll();

        BodyResponseDTO bodyResponseDTO = BodyResponseDTO.builder()
            .statusCode(HttpStatus.OK.value())
            .status(HttpStatus.OK.name())
            .message("Successfully retrieved the list of products")
            .data(oltpTransactions)
            .build();

        return ResponseEntity.ok().body(bodyResponseDTO);
    }
}
