package onlineshop.backend.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import onlineshop.backend.dtos.requests.SIgnInRequestDTO;
import onlineshop.backend.dtos.requests.SignUpRequestDTO;
import onlineshop.backend.dtos.responses.BodyResponseDTO;
import onlineshop.backend.dtos.responses.ErrorResponseDTO;
import onlineshop.backend.dtos.responses.SignInResponseDTO;
import onlineshop.backend.models.UserDetail;
import onlineshop.backend.models.Users;
import onlineshop.backend.repositories.UserRepository;
import onlineshop.backend.utils.JwtUtil;

@Service
public class UserService {
    @Autowired
    private Validator validator;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<Object> signUp(SignUpRequestDTO requestDTO) {
        Set<ConstraintViolation<SignUpRequestDTO>> constraintViolations = validator.validate(requestDTO);
        Map<String, String> errMap = new HashMap<>();

        for (ConstraintViolation<SignUpRequestDTO> violation : constraintViolations) {
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errMap.put(fieldName, errorMessage);
        }

        if (requestDTO.getRetypePassword() != null
            && requestDTO.getPassword() != null
            && !requestDTO.getPassword().equals(requestDTO.getRetypePassword())
        ) {
            errMap.put("retypePassword", "Retype Password is Mismatch");
        }

        if (requestDTO.getUsername() != null && userRepository.existsByUsername(requestDTO.getUsername())) {
            errMap.put("username", "Username already exist");
        }

        if (!errMap.isEmpty()) {
            ErrorResponseDTO errorResponseDTO = ErrorResponseDTO.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .status(HttpStatus.BAD_REQUEST.name())
                .message("Sign Up Failed")
                .errors(errMap)
                .build();

            return ResponseEntity.badRequest().body(errorResponseDTO);
        }

        Users user = Users.builder()
            .username(requestDTO.getUsername())
            .password(BCrypt.hashpw(requestDTO.getPassword(), BCrypt.gensalt()))
            .build();
        
        userRepository.save(user);

        BodyResponseDTO bodyResponseDTO = BodyResponseDTO.builder()
            .statusCode(HttpStatus.OK.value())
            .status(HttpStatus.OK.name())
            .message("Sign Up Success")
            .data(null)
            .build();

        return ResponseEntity.ok().body(bodyResponseDTO);
    }

    public ResponseEntity<BodyResponseDTO> signIn(SIgnInRequestDTO requestDTO) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(requestDTO.getUsername(), requestDTO.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtUtil.generateJwtToken(authentication);

        UserDetail userDetail = (UserDetail) authentication.getPrincipal();

        SignInResponseDTO signInResponseDTO = SignInResponseDTO.builder()
            .id(userDetail.getUserId())
            .username(userDetail.getUsername())
            .token(jwtToken)
            .build();

        BodyResponseDTO bodyResponseDTO = BodyResponseDTO.builder()
            .statusCode(HttpStatus.OK.value())
            .status(HttpStatus.OK.name())
            .message("Sign Up Success")
            .data(signInResponseDTO)
            .build();

        return ResponseEntity.ok().body(bodyResponseDTO);
    }
}
