// 사용자 데이터를 데이터베이스에서 조회하고 저장하는 리포지토리 인터페이스
// 리포지토리는 데이터베이스와의 모든 작업을 담당합니다
// 마치 도서관의 사서와 같아요 - 책을 찾고, 빌려주고, 반납받는 일을 합니다

package com.example.reactlearning.repository;

// 필요한 Spring Data JPA 인터페이스들을 가져옵니다
import com.example.reactlearning.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// Java의 List와 Optional을 사용하기 위한 import
import java.util.List;
import java.util.Optional;

// 이 인터페이스가 리포지토리임을 나타내는 어노테이션
@Repository
// JpaRepository를 상속받습니다
// JpaRepository<엔티티타입, 기본키타입> 형태로 제네릭을 사용합니다
public interface UserRepository extends JpaRepository<User, Long> {
    
    // 이메일로 사용자를 찾는 메서드
    // Spring Data JPA가 메서드 이름을 분석하여 자동으로 쿼리를 생성합니다
    // "findBy" + 필드명 + "And" + 다른필드명 형태로 작성하면 됩니다
    Optional<User> findByEmail(String email);
    
    // 이름으로 사용자를 찾는 메서드 (여러 명이 있을 수 있으므로 List 사용)
    List<User> findByName(String name);
    
    // 이름에 특정 문자열이 포함된 사용자들을 찾는 메서드
    // "Containing"을 사용하면 LIKE 쿼리가 자동으로 생성됩니다
    List<User> findByNameContaining(String name);
    
    // 나이 범위로 사용자를 찾는 메서드
    // "Between"을 사용하면 BETWEEN 쿼리가 자동으로 생성됩니다
    List<User> findByAgeBetween(Integer minAge, Integer maxAge);
    
    // 나이가 특정 값 이상인 사용자들을 찾는 메서드
    // "GreaterThanEqual"을 사용하면 >= 쿼리가 자동으로 생성됩니다
    List<User> findByAgeGreaterThanEqual(Integer age);
    
    // 나이가 특정 값 이하인 사용자들을 찾는 메서드
    List<User> findByAgeLessThanEqual(Integer age);
    
    // 이메일과 이름으로 사용자를 찾는 메서드
    List<User> findByEmailAndName(String email, String name);
    
    // 이름으로 정렬하여 사용자들을 찾는 메서드
    // "OrderBy" + 필드명 + "Asc/Desc" 형태로 작성합니다
    List<User> findByNameOrderByCreatedAtDesc(String name);
    
    // 사용자 수를 세는 메서드
    // "Count"를 사용하면 COUNT 쿼리가 자동으로 생성됩니다
    long countByAgeGreaterThan(Integer age);
    
    // 이메일이 존재하는지 확인하는 메서드
    // "Exists"를 사용하면 EXISTS 쿼리가 자동으로 생성됩니다
    boolean existsByEmail(String email);
    
    // 사용자명으로 삭제하는 메서드
    // "DeleteBy"를 사용하면 DELETE 쿼리가 자동으로 생성됩니다
    void deleteByName(String name);
    
    // 커스텀 쿼리를 작성하는 예제
    // @Query 어노테이션을 사용하여 직접 SQL 쿼리를 작성할 수 있습니다
    @Query("SELECT u FROM User u WHERE u.age >= :minAge AND u.age <= :maxAge ORDER BY u.createdAt DESC")
    List<User> findUsersByAgeRange(@Param("minAge") Integer minAge, @Param("maxAge") Integer maxAge);
    
    // 네이티브 SQL 쿼리를 사용하는 예제
    // nativeQuery = true로 설정하면 실제 SQL 문법을 사용할 수 있습니다
    @Query(value = "SELECT * FROM users WHERE name LIKE %:keyword% ORDER BY created_at DESC", nativeQuery = true)
    List<User> findUsersByNameKeyword(@Param("keyword") String keyword);
    
    // 통계 쿼리 예제 (평균 나이 구하기)
    @Query("SELECT AVG(u.age) FROM User u")
    Double getAverageAge();
    
    // 그룹별 통계 쿼리 예제 (나이대별 사용자 수)
    @Query("SELECT u.age, COUNT(u) FROM User u GROUP BY u.age ORDER BY u.age")
    List<Object[]> getAgeGroupStatistics();
}
