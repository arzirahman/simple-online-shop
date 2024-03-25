package onlineshop.backend.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import onlineshop.backend.models.Users;

public interface UserRepository extends JpaRepository<Users, UUID> {
    Boolean existsByUsername(String username);

    Users findByUsername(String username);
}
