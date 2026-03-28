package com.example.reactlearning.rest;

import java.util.List;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * 💡 비즈니스 로직을 담당하는 서비스 계층입니다.
 * Controller는 요청/응답 형식만 관리하고, 실제 데이터 처리는 서비스가 맡아요.
 */
@Service
public class TodoService {

    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    /**
     * 애플리케이션 시작 시 샘플 데이터를 3건 등록해 줍니다.
     * REST 흐름을 실습할 때 빈 목록을 보는 것보다 훨씬 이해하기 쉽습니다.
     */
    @PostConstruct
    public void initSampleData() {
        if (repository.isEmpty()) {
            repository.save(new TodoItem("REST란 무엇인지 글로 정리하기"));
            repository.save(new TodoItem("POST /todos 호출해서 새 할 일 만들기"));
            repository.save(new TodoItem("PUT /todos/{id} 호출해서 완료 처리해보기"));
        }
    }

    /** 모든 TodoItem을 반환합니다. */
    public List<TodoItem> getAll() {
        return repository.findAll();
    }

    /** ID로 TodoItem을 찾아 반환합니다. (없으면 예외 발생) */
    public TodoItem getById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    /** 새 TodoItem을 생성합니다. */
    public TodoItem create(TodoRequest request) {
        validateTitle(request.getTitle());
        TodoItem todoItem = new TodoItem(request.getTitle());
        return repository.save(todoItem);
    }

    /** 기존 TodoItem을 수정합니다. */
    public TodoItem update(String id, TodoRequest request) {
        validateTitle(request.getTitle());
        TodoItem todoItem = getById(id);
        todoItem.update(request.getTitle(), request.getCompleted());
        return repository.save(todoItem);
    }

    /** TodoItem을 삭제합니다. */
    public void delete(String id) {
        // 존재하지 않으면 예외를 던져 사용자에게 친절한 메시지를 보여줍니다.
        TodoItem todoItem = getById(id);
        repository.deleteById(todoItem.getId());
    }

    /** 제목은 필수이므로 간단한 검증 로직을 넣어줍니다. */
    private void validateTitle(String title) {
        if (!StringUtils.hasText(title)) {
            throw new IllegalArgumentException("제목은 비워둘 수 없습니다.");
        }
    }
}
