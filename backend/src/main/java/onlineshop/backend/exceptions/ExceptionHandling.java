package onlineshop.backend.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import onlineshop.backend.dtos.responses.ErrorResponseDTO;

@RestControllerAdvice
public class ExceptionHandling {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleAllExceptions(Exception ex) {
        ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO();
        errorResponseDTO.setMessage("Internal Server Error");
        errorResponseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponseDTO.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.name());
        errorResponseDTO.setErrors(ex.getMessage());
        
        return ResponseEntity.internalServerError().body(errorResponseDTO);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponseDTO> handleAuthenticationException(AuthenticationException ex) {
        ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO();
        errorResponseDTO.setMessage("Invalid username or password");
        errorResponseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
        errorResponseDTO.setStatus(HttpStatus.BAD_REQUEST.name());
        errorResponseDTO.setErrors(null);
        
        return ResponseEntity.badRequest().body(errorResponseDTO);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errorsMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorsMap.put(error.getField(), error.getDefaultMessage());
        });
        
        ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO();
        errorResponseDTO.setMessage("Request Failed");
        errorResponseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
        errorResponseDTO.setStatus(HttpStatus.BAD_REQUEST.name());
        errorResponseDTO.setErrors(errorsMap);
        
        return ResponseEntity.badRequest().body(errorResponseDTO);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponseDTO> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO();
        errorResponseDTO.setMessage("Request Failed");
        errorResponseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
        errorResponseDTO.setStatus(HttpStatus.BAD_REQUEST.name());
        errorResponseDTO.setErrors(ex.getMessage());

        return ResponseEntity.badRequest().body(errorResponseDTO);
    }
}
