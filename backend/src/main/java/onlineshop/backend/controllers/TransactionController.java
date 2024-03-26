package onlineshop.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import onlineshop.backend.dtos.requests.CreateTransactionRequestDTO;
import onlineshop.backend.dtos.responses.BodyResponseDTO;
import onlineshop.backend.services.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    TransactionService transactionService;
    
    @PostMapping("/create")
    public ResponseEntity<BodyResponseDTO> createTransaction(@Valid @RequestBody CreateTransactionRequestDTO requestDTO) {
        return transactionService.createTransaction(requestDTO);
    }

    @GetMapping("")
    public ResponseEntity<BodyResponseDTO> getTransaction() {
        return transactionService.getTransactions();
    }
}
