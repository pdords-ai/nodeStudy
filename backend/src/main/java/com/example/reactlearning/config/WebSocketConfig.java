// 웹소켓 설정 클래스
// 웹소켓 연결을 위한 기본 설정을 담당합니다
// 마치 전화 교환원이 전화선을 연결해주는 것과 같아요

package com.example.reactlearning.config;

// 필요한 Spring Boot 어노테이션들을 가져옵니다
import com.example.reactlearning.handler.ChatWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

// 이 클래스가 설정 클래스임을 나타내는 어노테이션
@Configuration
// 웹소켓 기능을 활성화하는 어노테이션
@EnableWebSocket
// WebSocketConfigurer 인터페이스를 구현하여 웹소켓 설정을 담당합니다
public class WebSocketConfig implements WebSocketConfigurer {
    
    // 채팅 웹소켓 핸들러를 자동으로 주입받습니다
    @Autowired
    private ChatWebSocketHandler chatWebSocketHandler;
    
    // 웹소켓 핸들러를 등록하는 메서드
    // 이 메서드에서 어떤 URL로 웹소켓 연결을 받을지 설정합니다
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // 웹소켓 핸들러를 등록합니다
        // "/ws/chat": 웹소켓 연결 URL
        // chatWebSocketHandler: 실제 메시지를 처리할 핸들러
        registry.addHandler(chatWebSocketHandler, "/ws/chat")
                // CORS 설정 (React 프론트엔드에서 접근 허용)
                .setAllowedOrigins("http://localhost:3000");
        
        // 개발 시 디버깅을 위한 로그
        System.out.println("🔌 웹소켓 핸들러가 등록되었습니다: /ws/chat");
    }
}
