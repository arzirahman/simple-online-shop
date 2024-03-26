package onlineshop.backend.dtos.responses;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponseDTO {
    private UUID productId;
    private String name;
    private String image;
    private BigDecimal rating;
    private Integer price;
    private long sold;
}
