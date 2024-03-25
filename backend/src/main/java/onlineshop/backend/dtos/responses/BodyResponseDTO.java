package onlineshop.backend.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BodyResponseDTO {
    private String message;
    private int statusCode;
    private String status;
    private Object data;
}
