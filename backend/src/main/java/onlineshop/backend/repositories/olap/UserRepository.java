package onlineshop.backend.repositories.olap;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import onlineshop.backend.models.olap.Users;

public interface UserRepository extends JpaRepository<Users, UUID> {
    Boolean existsByUsername(String username);

    Users findByUsername(String username);
}
