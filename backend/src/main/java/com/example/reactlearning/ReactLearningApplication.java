// Spring Boot 메인 애플리케이션 클래스
// 이 클래스는 Spring Boot 애플리케이션의 시작점입니다
// 마치 프로그램의 main 함수와 같아요

package com.example.reactlearning;

// 필요한 Spring Boot 어노테이션들을 가져옵니다
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

// Spring Boot 애플리케이션임을 나타내는 어노테이션
// 이 어노테이션이 있어야 Spring Boot가 이 클래스를 인식하고 실행합니다
@SpringBootApplication
// 웹소켓 기능을 활성화하는 어노테이션
// 실시간 통신을 위해 필요합니다
@EnableWebSocket
public class ReactLearningApplication {

    // Java 프로그램의 시작점 (main 메서드)
    // 이 메서드가 실행되면 Spring Boot 애플리케이션이 시작됩니다
    public static void main(String[] args) {
        // Spring Boot 애플리케이션을 실행합니다
        // args는 명령행 인수들입니다 (프로그램 실행 시 전달되는 옵션들)
        SpringApplication.run(ReactLearningApplication.class, args);
        
        // 애플리케이션이 시작되면 이 메시지가 출력됩니다
        System.out.println("🚀 React Learning Backend Server가 시작되었습니다!");
        System.out.println("📡 서버 주소: http://localhost:8080");
        System.out.println("🗄️ H2 데이터베이스 콘솔: http://localhost:8080/h2-console");
        System.out.println("📚 API 문서: http://localhost:8080/api");
    }
}
