package com.example.reactlearning.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;

/**
 * 🗄️ 간단한 인메모리 저장소입니다.
 * Spring Data JPA 대신 Map을 활용하여 REST 동작 흐름에 집중하도록 만들었어요.
 */
@Repository
public class TodoRepository {

    /** ConcurrentHashMap을 사용해 멀티스레드 환경에서도 안전하게 데이터를 다룹니다. */
    private final Map<String, TodoItem> storage = new ConcurrentHashMap<>();

    /** 모든 TodoItem을 조회합니다. */
    public List<TodoItem> findAll() {
        return new ArrayList<>(storage.values());
    }

    /** ID로 TodoItem을 조회합니다. */
    public Optional<TodoItem> findById(String id) {
        return Optional.ofNullable(storage.get(id));
    }

    /** TodoItem을 저장하거나 수정합니다. */
    public TodoItem save(TodoItem todoItem) {
        storage.put(todoItem.getId(), todoItem);
        return todoItem;
    }

    /** TodoItem을 삭제합니다. */
    public void deleteById(String id) {
        storage.remove(id);
    }

    /** 저장소가 비어 있는지 확인합니다. (샘플 데이터 초기화에 사용) */
    public boolean isEmpty() {
        return storage.isEmpty();
    }
}
