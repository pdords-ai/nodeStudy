// 사용자 관련 REST API를 처리하는 컨트롤러 클래스
// 컨트롤러는 클라이언트의 요청을 받아서 적절한 응답을 반환합니다
// 마치 레스토랑의 웨이터와 같아요 - 주문을 받고 주방에 전달한 후 음식을 가져다 줍니다

package com.example.reactlearning.controller;

// 필요한 Spring Boot 어노테이션들을 가져옵니다
import com.example.reactlearning.entity.User;
import com.example.reactlearning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Java의 List와 Optional을 사용하기 위한 import
import java.util.List;
import java.util.Optional;

// 이 클래스가 REST 컨트롤러임을 나타내는 어노테이션
@RestController
// 모든 API의 기본 경로를 설정합니다
@RequestMapping("/api/users")
// CORS(Cross-Origin Resource Sharing) 설정
// React 프론트엔드에서 이 API를 호출할 수 있게 해줍니다
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    // UserRepository를 자동으로 주입받습니다
    // @Autowired: Spring이 자동으로 객체를 생성해서 넣어줍니다
    @Autowired
    private UserRepository userRepository;
    
    // 모든 사용자 목록을 조회하는 API
    // GET /api/users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            // 데이터베이스에서 모든 사용자를 조회합니다
            List<User> users = userRepository.findAll();
            
            // 성공적으로 조회되면 200 OK 상태코드와 함께 데이터를 반환합니다
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            // 오류가 발생하면 500 Internal Server Error를 반환합니다
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // 특정 사용자를 조회하는 API
    // GET /api/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            // ID로 사용자를 조회합니다
            Optional<User> user = userRepository.findById(id);
            
            // 사용자가 존재하면 데이터를 반환하고, 없으면 404 Not Found를 반환합니다
            return user.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // 새 사용자를 생성하는 API
    // POST /api/users
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            // 이메일 중복 체크
            if (userRepository.existsByEmail(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            
            // 사용자를 데이터베이스에 저장합니다
            User savedUser = userRepository.save(user);
            
            // 성공적으로 생성되면 201 Created 상태코드와 함께 데이터를 반환합니다
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // 사용자 정보를 수정하는 API
    // PUT /api/users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            // ID로 사용자를 조회합니다
            Optional<User> optionalUser = userRepository.findById(id);
            
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                
                // 수정할 정보를 업데이트합니다
                user.setName(userDetails.getName());
                user.setEmail(userDetails.getEmail());
                user.setAge(userDetails.getAge());
                
                // 수정된 사용자를 저장합니다
                User updatedUser = userRepository.save(user);
                
                return ResponseEntity.ok(updatedUser);
            } else {
                // 사용자가 존재하지 않으면 404 Not Found를 반환합니다
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // 사용자를 삭제하는 API
    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            // 사용자가 존재하는지 확인합니다
            if (userRepository.existsById(id)) {
                // 사용자를 삭제합니다
                userRepository.deleteById(id);
                // 성공적으로 삭제되면 204 No Content를 반환합니다
                return ResponseEntity.noContent().build();
            } else {
                // 사용자가 존재하지 않으면 404 Not Found를 반환합니다
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // 이름으로 사용자를 검색하는 API
    // GET /api/users/search?name={name}
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsersByName(@RequestParam String name) {
        try {
            // 이름에 특정 문자열이 포함된 사용자들을 조회합니다
            List<User> users = userRepository.findByNameContaining(name);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // 나이 범위로 사용자를 검색하는 API
    // GET /api/users/age-range?minAge={minAge}&maxAge={maxAge}
    @GetMapping("/age-range")
    public ResponseEntity<List<User>> getUsersByAgeRange(
            @RequestParam Integer minAge, 
            @RequestParam Integer maxAge) {
        try {
            // 나이 범위에 해당하는 사용자들을 조회합니다
            List<User> users = userRepository.findByAgeBetween(minAge, maxAge);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // 사용자 통계를 조회하는 API
    // GET /api/users/statistics
    @GetMapping("/statistics")
    public ResponseEntity<Object> getUserStatistics() {
        try {
            // 전체 사용자 수
            long totalUsers = userRepository.count();
            
            // 평균 나이
            Double averageAge = userRepository.getAverageAge();
            
            // 나이대별 통계
            List<Object[]> ageGroupStats = userRepository.getAgeGroupStatistics();
            
            // 통계 정보를 담을 Map을 생성합니다
            java.util.Map<String, Object> statistics = new java.util.HashMap<>();
            statistics.put("totalUsers", totalUsers);
            statistics.put("averageAge", averageAge != null ? averageAge : 0);
            statistics.put("ageGroupStatistics", ageGroupStats);
            
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
