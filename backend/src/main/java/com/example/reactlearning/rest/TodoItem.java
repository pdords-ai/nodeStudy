package com.example.reactlearning.rest;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 📦 TodoItem 클래스는 REST API에서 주고받는 "할 일" 한 건을 표현합니다.
 * REST 학습을 쉽게 하기 위해 필드를 단순하게 구성했어요.
 */
public class TodoItem {

    /** 고유 식별자 (UUID 형식). 클라이언트가 각 리소스를 식별할 때 사용합니다. */
    private String id;

    /** 할 일 제목. */
    private String title;

    /** 할 일이 완료되었는지 여부. */
    private boolean completed;

    /** 리소스가 생성된 시각. */
    private LocalDateTime createdAt;

    /** 리소스가 마지막으로 수정된 시각. */
    private LocalDateTime updatedAt;

    /**
     * 기본 생성자. (JSON 직렬화/역직렬화를 위해 반드시 필요)
     * 프레임워크가 객체를 만들고 값을 주입할 때 사용합니다.
     */
    public TodoItem() {
        // Jackson 이라는 JSON 라이브러리가 사용할 기본 생성자입니다.
    }

    /**
     * 새 TodoItem을 생성할 때 사용하는 생성자.
     * ID와 생성/수정 시각은 서버에서 책임지고 만들어 줍니다.
     */
    public TodoItem(String title) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.completed = false;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    /**
     * 할 일을 수정할 때 사용되는 헬퍼 메서드.
     * 제목/완료 여부를 바꾸고 수정 시각을 자동으로 갱신합니다.
     */
    public void update(String title, Boolean completed) {
        if (title != null) {
            this.title = title;
        }
        if (completed != null) {
            this.completed = completed;
        }
        this.updatedAt = LocalDateTime.now();
    }

    // --- Getter/Setter ---

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
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
}
