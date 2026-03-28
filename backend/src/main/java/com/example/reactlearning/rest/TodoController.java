package com.example.reactlearning.rest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * 🌐 RESTful API의 핵심: HTTP 요청을 받아 서비스에 위임하고, HTTP 응답을 돌려줍니다.
 * 이 클래스 한 파일만으로도 REST의 CRUD 흐름을 한눈에 살펴볼 수 있습니다.
 */
@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    /**
     * [GET] /todos
     * - 모든 할 일 목록을 조회합니다.
     * - 브라우저 주소창에서 http://localhost:8080/api/todos 로 바로 테스트할 수 있습니다.
     */
    @GetMapping
    public List<TodoItem> getTodos() {
        return todoService.getAll();
    }

    /**
     * [GET] /todos/{id}
     * - 단일 할 일을 조회합니다.
     * - 존재하지 않는 경우 TodoNotFoundException이 발생합니다.
     */
    @GetMapping("/{id}")
    public TodoItem getTodo(@PathVariable String id) {
        return todoService.getById(id);
    }

    /**
     * [POST] /todos
     * - 새 할 일을 생성합니다.
     * - 요청 바디 예시: { "title": "REST 공부하기" }
     * - 201(CREATED) 상태 코드를 반환하여 리소스가 생성되었음을 알려줍니다.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TodoItem createTodo(@RequestBody TodoRequest request) {
        return todoService.create(request);
    }

    /**
     * [PUT] /todos/{id}
     * - 기존 할 일을 수정합니다.
     * - 전체 리소스를 교체한다는 의미에서 PUT을 사용했습니다.
     */
    @PutMapping("/{id}")
    public TodoItem updateTodo(@PathVariable String id, @RequestBody TodoRequest request) {
        return todoService.update(id, request);
    }

    /**
     * [DELETE] /todos/{id}
     * - 특정 할 일을 삭제합니다.
     * - 성공 시 204(NO_CONTENT) 상태 코드만 내려서 응답 본문은 비워둡니다.
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable String id) {
        todoService.delete(id);
    }

    /**
     * TodoNotFoundException 발생 시 404 상태 코드를 반환하도록 처리합니다.
     * REST에서는 에러도 HTTP 상태 코드와 JSON 바디로 명확하게 표현하는 것이 중요합니다.
     */
    @ExceptionHandler(TodoNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleTodoNotFound(TodoNotFoundException ex) {
        ErrorResponse response = new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /**
     * 잘못된 요청(예: 제목이 비어 있는 경우)에는 400 상태 코드를 반환합니다.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(IllegalArgumentException ex) {
        ErrorResponse response = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    /**
     * 간단한 에러 응답 모델. status/message 구조로 되어 있어 사람이 읽기 쉽습니다.
     */
    public record ErrorResponse(int status, String message) {
    }
}
