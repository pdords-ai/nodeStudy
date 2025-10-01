// 사용자 정보를 저장하는 엔티티 클래스
// 엔티티는 데이터베이스의 테이블과 매핑되는 Java 클래스입니다
// 마치 데이터베이스의 한 행(레코드)을 나타내는 것과 같아요

package com.example.reactlearning.entity;

// 필요한 JPA 어노테이션들을 가져옵니다
import jakarta.persistence.*;
// 데이터 검증을 위한 어노테이션들을 가져옵니다
import jakarta.validation.constraints.*;
// 날짜와 시간을 다루기 위한 클래스들을 가져옵니다
import java.time.LocalDateTime;

// 이 클래스가 JPA 엔티티임을 나타내는 어노테이션
@Entity
// 데이터베이스 테이블 이름을 지정합니다
@Table(name = "users")
public class User {
    
    // 기본키(Primary Key)임을 나타내는 어노테이션
    // 데이터베이스에서 각 레코드를 고유하게 식별하는 필드입니다
    @Id
    // 자동 증가되는 값으로 설정합니다 (데이터베이스가 자동으로 번호를 할당)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // 사용자 이름 필드
    // @Column: 데이터베이스 컬럼과 매핑
    // @NotBlank: 빈 값이 아니어야 함
    // @Size: 길이 제한 (최소 2글자, 최대 50글자)
    @Column(name = "name", nullable = false, length = 50)
    @NotBlank(message = "이름은 필수입니다")
    @Size(min = 2, max = 50, message = "이름은 2-50글자 사이여야 합니다")
    private String name;
    
    // 이메일 필드
    @Column(name = "email", nullable = false, unique = true, length = 100)
    @NotBlank(message = "이메일은 필수입니다")
    @Email(message = "올바른 이메일 형식이 아닙니다")
    @Size(max = 100, message = "이메일은 100글자를 초과할 수 없습니다")
    private String email;
    
    // 나이 필드
    @Column(name = "age")
    @Min(value = 1, message = "나이는 1세 이상이어야 합니다")
    @Max(value = 120, message = "나이는 120세 이하여야 합니다")
    private Integer age;
    
    // 생성일시 필드 (자동으로 현재 시간이 저장됩니다)
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    // 수정일시 필드
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // 기본 생성자 (JPA에서 필요합니다)
    public User() {
        // 객체가 생성될 때 현재 시간을 자동으로 설정합니다
        this.createdAt = LocalDateTime.now();
    }
    
    // 모든 필드를 받는 생성자 (편의를 위해 제공)
    public User(String name, String email, Integer age) {
        this(); // 기본 생성자 호출 (createdAt 설정)
        this.name = name;
        this.email = email;
        this.age = age;
    }
    
    // Getter와 Setter 메서드들
    // JPA가 데이터베이스와 객체 간의 데이터를 주고받을 때 사용됩니다
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    // 엔티티가 저장되기 전에 실행되는 메서드
    // @PrePersist: 데이터베이스에 저장되기 전에 실행
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    // 엔티티가 업데이트되기 전에 실행되는 메서드
    // @PreUpdate: 데이터베이스에서 업데이트되기 전에 실행
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // 객체를 문자열로 표현하는 메서드 (디버깅 시 유용)
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
