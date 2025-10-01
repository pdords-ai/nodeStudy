// CORS(Cross-Origin Resource Sharing) 설정 클래스
// React 프론트엔드에서 Spring Boot API를 호출할 수 있게 해주는 설정입니다
// 마치 다른 나라에서 온 관광객이 우리 나라의 시설을 이용할 수 있게 해주는 것과 같아요

package com.example.reactlearning.config;

// 필요한 Spring Boot 어노테이션들을 가져옵니다
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 이 클래스가 설정 클래스임을 나타내는 어노테이션
@Configuration
// WebMvcConfigurer 인터페이스를 구현하여 웹 설정을 담당합니다
public class CorsConfig implements WebMvcConfigurer {
    
    // CORS 설정을 오버라이드하는 메서드
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 경로("/**")에 대해 CORS 설정을 적용합니다
        registry.addMapping("/**")
                // 허용할 오리진(Origin) 설정
                // React 개발 서버의 주소를 허용합니다
                .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000")
                // 허용할 HTTP 메서드들
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                // 허용할 헤더들
                .allowedHeaders("*")
                // 인증 정보(쿠키, Authorization 헤더 등) 포함 허용
                .allowCredentials(true)
                // preflight 요청의 캐시 시간 (초 단위)
                .maxAge(3600);
        
        // API 전용 CORS 설정
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
        
        // 웹소켓 전용 CORS 설정
        registry.addMapping("/ws/**")
                .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000")
                .allowedMethods("GET", "POST")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
    
    // CORS 설정을 위한 Bean을 생성하는 메서드
    // 이 Bean은 Spring Security와 함께 사용할 때 필요합니다
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        // CORS 설정 객체를 생성합니다
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 허용할 오리진들을 추가합니다
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://127.0.0.1:3000");
        
        // 허용할 HTTP 메서드들을 추가합니다
        configuration.addAllowedMethod("GET");
        configuration.addAllowedMethod("POST");
        configuration.addAllowedMethod("PUT");
        configuration.addAllowedMethod("DELETE");
        configuration.addAllowedMethod("OPTIONS");
        configuration.addAllowedMethod("PATCH");
        
        // 허용할 헤더들을 추가합니다
        configuration.addAllowedHeader("*");
        
        // 인증 정보 포함을 허용합니다
        configuration.setAllowCredentials(true);
        
        // preflight 요청의 캐시 시간을 설정합니다
        configuration.setMaxAge(3600L);
        
        // URL 기반 CORS 설정 소스를 생성합니다
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        
        // 모든 경로에 대해 위에서 설정한 CORS 설정을 적용합니다
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}
