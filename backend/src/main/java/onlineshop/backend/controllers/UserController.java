package onlineshop.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import onlineshop.backend.dtos.requests.SIgnInRequestDTO;
import onlineshop.backend.dtos.requests.SignUpRequestDTO;
import onlineshop.backend.dtos.responses.BodyResponseDTO;
import onlineshop.backend.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<Object> signUp(@RequestBody SignUpRequestDTO requestDTO) {
        return userService.signUp(requestDTO);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<BodyResponseDTO> signIn(@Valid @RequestBody SIgnInRequestDTO requestDTO) {
        return userService.signIn(requestDTO);
    }
}
