package com.example.reactlearning.rest;

/**
 * 📨 클라이언트가 보내는 요청 바디를 담기 위한 DTO(Data Transfer Object)입니다.
 * - POST /todos : title 필드만 사용
 * - PUT /todos/{id} : title, completed 둘 다 사용 가능
 */
public class TodoRequest {

    /** 요청받은 제목 (필수). */
    private String title;

    /** 완료 여부 (선택). PUT 요청에서만 사용합니다. */
    private Boolean completed;

    public TodoRequest() {
        // JSON 역직렬화를 위한 기본 생성자
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
