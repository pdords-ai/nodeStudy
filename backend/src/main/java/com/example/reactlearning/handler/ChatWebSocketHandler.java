// 채팅 웹소켓 핸들러 클래스
// 웹소켓을 통해 실시간 메시지를 주고받는 로직을 처리합니다
// 마치 채팅방의 관리자와 같아요 - 메시지를 받아서 모든 사람에게 전달합니다

package com.example.reactlearning.handler;

// 필요한 Spring Boot와 웹소켓 어노테이션들을 가져옵니다
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

// JSON 처리를 위한 라이브러리들을 가져옵니다
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

// Java의 컬렉션과 동시성 처리를 위한 클래스들을 가져옵니다
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.Map;
import java.util.HashMap;

// 이 클래스가 Spring 컴포넌트임을 나타내는 어노테이션
@Component
// TextWebSocketHandler를 상속받아 텍스트 메시지를 처리합니다
public class ChatWebSocketHandler extends TextWebSocketHandler {
    
    // 연결된 모든 클라이언트들을 저장하는 리스트
    // CopyOnWriteArrayList는 동시성 처리가 안전한 리스트입니다
    private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    
    // JSON 처리를 위한 ObjectMapper
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    // 새로운 클라이언트가 연결되었을 때 호출되는 메서드
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 새로운 세션을 리스트에 추가합니다
        sessions.add(session);
        
        // 연결 성공 메시지를 해당 클라이언트에게 전송합니다
        Map<String, Object> message = new HashMap<>();
        message.put("type", "system");
        message.put("content", "채팅방에 연결되었습니다!");
        message.put("timestamp", System.currentTimeMillis());
        
        sendMessageToSession(session, message);
        
        // 다른 모든 클라이언트에게 새 사용자 접속 알림을 전송합니다
        Map<String, Object> notification = new HashMap<>();
        notification.put("type", "notification");
        notification.put("content", "새로운 사용자가 접속했습니다.");
        notification.put("timestamp", System.currentTimeMillis());
        
        broadcastMessage(notification, session);
        
        // 서버 콘솔에 로그 출력
        System.out.println("🔌 새 클라이언트 연결: " + session.getId());
        System.out.println("📊 현재 연결된 클라이언트 수: " + sessions.size());
    }
    
    // 클라이언트로부터 메시지를 받았을 때 호출되는 메서드
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            // 받은 메시지를 JSON으로 파싱합니다
            JsonNode jsonNode = objectMapper.readTree(message.getPayload());
            
            // 메시지 타입에 따라 다른 처리를 합니다
            String messageType = jsonNode.get("type").asText();
            
            switch (messageType) {
                case "chat":
                    // 일반 채팅 메시지 처리
                    handleChatMessage(session, jsonNode);
                    break;
                case "typing":
                    // 타이핑 상태 메시지 처리
                    handleTypingMessage(session, jsonNode);
                    break;
                case "ping":
                    // 연결 상태 확인 메시지 처리
                    handlePingMessage(session);
                    break;
                default:
                    // 알 수 없는 메시지 타입
                    System.out.println("❓ 알 수 없는 메시지 타입: " + messageType);
            }
            
        } catch (Exception e) {
            // JSON 파싱 오류 처리
            System.err.println("❌ 메시지 파싱 오류: " + e.getMessage());
            
            // 오류 메시지를 클라이언트에게 전송합니다
            Map<String, Object> errorMessage = new HashMap<>();
            errorMessage.put("type", "error");
            errorMessage.put("content", "메시지 형식이 올바르지 않습니다.");
            errorMessage.put("timestamp", System.currentTimeMillis());
            
            sendMessageToSession(session, errorMessage);
        }
    }
    
    // 일반 채팅 메시지를 처리하는 메서드
    private void handleChatMessage(WebSocketSession session, JsonNode jsonNode) {
        try {
            // 메시지 정보를 추출합니다
            String content = jsonNode.get("content").asText();
            String username = jsonNode.has("username") ? jsonNode.get("username").asText() : "익명";
            
            // 모든 클라이언트에게 메시지를 브로드캐스트합니다
            Map<String, Object> chatMessage = new HashMap<>();
            chatMessage.put("type", "chat");
            chatMessage.put("username", username);
            chatMessage.put("content", content);
            chatMessage.put("timestamp", System.currentTimeMillis());
            
            broadcastMessage(chatMessage);
            
            // 서버 콘솔에 로그 출력
            System.out.println("💬 채팅 메시지: [" + username + "] " + content);
            
        } catch (Exception e) {
            System.err.println("❌ 채팅 메시지 처리 오류: " + e.getMessage());
        }
    }
    
    // 타이핑 상태 메시지를 처리하는 메서드
    private void handleTypingMessage(WebSocketSession session, JsonNode jsonNode) {
        try {
            String username = jsonNode.has("username") ? jsonNode.get("username").asText() : "익명";
            boolean isTyping = jsonNode.get("isTyping").asBoolean();
            
            // 다른 클라이언트들에게 타이핑 상태를 알립니다 (자신 제외)
            Map<String, Object> typingMessage = new HashMap<>();
            typingMessage.put("type", "typing");
            typingMessage.put("username", username);
            typingMessage.put("isTyping", isTyping);
            typingMessage.put("timestamp", System.currentTimeMillis());
            
            broadcastMessage(typingMessage, session);
            
        } catch (Exception e) {
            System.err.println("❌ 타이핑 메시지 처리 오류: " + e.getMessage());
        }
    }
    
    // 연결 상태 확인 메시지를 처리하는 메서드
    private void handlePingMessage(WebSocketSession session) {
        try {
            // Pong 메시지를 응답으로 전송합니다
            Map<String, Object> pongMessage = new HashMap<>();
            pongMessage.put("type", "pong");
            pongMessage.put("timestamp", System.currentTimeMillis());
            
            sendMessageToSession(session, pongMessage);
            
        } catch (Exception e) {
            System.err.println("❌ Ping 메시지 처리 오류: " + e.getMessage());
        }
    }
    
    // 특정 세션에게 메시지를 전송하는 메서드
    private void sendMessageToSession(WebSocketSession session, Map<String, Object> message) {
        try {
            if (session.isOpen()) {
                String jsonMessage = objectMapper.writeValueAsString(message);
                session.sendMessage(new TextMessage(jsonMessage));
            }
        } catch (Exception e) {
            System.err.println("❌ 메시지 전송 오류: " + e.getMessage());
        }
    }
    
    // 모든 클라이언트에게 메시지를 브로드캐스트하는 메서드
    private void broadcastMessage(Map<String, Object> message) {
        broadcastMessage(message, null);
    }
    
    // 특정 세션을 제외하고 모든 클라이언트에게 메시지를 브로드캐스트하는 메서드
    private void broadcastMessage(Map<String, Object> message, WebSocketSession excludeSession) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(message);
            TextMessage textMessage = new TextMessage(jsonMessage);
            
            // 모든 세션에 메시지를 전송합니다
            for (WebSocketSession session : sessions) {
                if (session.isOpen() && session != excludeSession) {
                    session.sendMessage(textMessage);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ 브로드캐스트 오류: " + e.getMessage());
        }
    }
    
    // 클라이언트 연결이 끊어졌을 때 호출되는 메서드
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 연결이 끊어진 세션을 리스트에서 제거합니다
        sessions.remove(session);
        
        // 다른 클라이언트들에게 연결 해제 알림을 전송합니다
        Map<String, Object> notification = new HashMap<>();
        notification.put("type", "notification");
        notification.put("content", "사용자가 연결을 해제했습니다.");
        notification.put("timestamp", System.currentTimeMillis());
        
        broadcastMessage(notification);
        
        // 서버 콘솔에 로그 출력
        System.out.println("🔌 클라이언트 연결 해제: " + session.getId());
        System.out.println("📊 현재 연결된 클라이언트 수: " + sessions.size());
    }
    
    // 연결 오류가 발생했을 때 호출되는 메서드
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.err.println("❌ 웹소켓 전송 오류: " + exception.getMessage());
        
        // 오류가 발생한 세션을 리스트에서 제거합니다
        sessions.remove(session);
    }
    
    // 연결이 지원하는 메시지 타입을 확인하는 메서드
    @Override
    public boolean supportsPartialMessages() {
        return false; // 부분 메시지는 지원하지 않습니다
    }
}
