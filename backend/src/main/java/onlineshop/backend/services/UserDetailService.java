package onlineshop.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import onlineshop.backend.models.UserDetail;
import onlineshop.backend.models.olap.Users;
import onlineshop.backend.repositories.olap.UserRepository;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    UserRepository usersRepository;

    @Override
    @Transactional
    public UserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = usersRepository.findByUsername(username);
        return UserDetail.build(user);
    }
}