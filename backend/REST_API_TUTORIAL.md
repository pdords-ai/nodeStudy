# 📘 RESTful API 학습용 예제 가이드

이 문서는 `backend` 모듈에 새로 추가된 `Todo` REST API 예제를 어떻게 학습하면 좋을지 안내합니다. 코드는 모두 한글 주석으로 작성되어 있으니, 소스와 함께 읽어보면 이해가 훨씬 빨라요!

## 1. 예제 개요
- **리소스 이름**: `Todo`
- **엔드포인트 기본 주소**: `http://localhost:8080/api/todos`
- **데이터 저장소**: 인메모리(Map) 저장소 → 복잡한 DB 설정 없이 REST 동작에 집중할 수 있습니다.
- **초기 데이터**: 서버 기동 시 3건의 샘플 Todo가 자동으로 생성됩니다.

## 2. 패키지 구조
```
rest
├── TodoController.java      // HTTP 요청/응답 담당
├── TodoService.java         // 비즈니스 로직 담당
├── TodoRepository.java      // 인메모리 저장소
├── TodoItem.java            // Todo 리소스 모델
├── TodoRequest.java         // 클라이언트 요청 바디 DTO
└── TodoNotFoundException.java // 커스텀 예외
```

각 계층이 어떤 책임을 가지는지 명확하게 나눠서, 실제 프로젝트에서도 그대로 확장할 수 있도록 했습니다.

## 3. 주요 HTTP 동작 흐름
| HTTP 메서드 | URL 패턴 | 설명 | 상태 코드 |
|-------------|----------|------|-----------|
| GET | `/api/todos` | 전체 Todo 목록 조회 | 200 OK |
| GET | `/api/todos/{id}` | ID로 Todo 단건 조회 | 200 OK (또는 404) |
| POST | `/api/todos` | 새 Todo 생성 | 201 Created |
| PUT | `/api/todos/{id}` | Todo 수정(제목/완료 여부) | 200 OK |
| DELETE | `/api/todos/{id}` | Todo 삭제 | 204 No Content |

> 💡 **Tip**: REST의 핵심은 리소스(Todo)를 URI로 식별하고, 상태를 HTTP 메서드로 표현하는 것입니다.

## 4. 샘플 요청
### 4.1. 할 일 생성
```bash
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "REST 연습하기"}'
```
응답 예시
```json
{
  "id": "1d074a23-3f94-4bf2-9a5b-f0efdbbe04fc",
  "title": "REST 연습하기",
  "completed": false,
  "createdAt": "2024-04-03T10:23:01.357522",
  "updatedAt": "2024-04-03T10:23:01.357522"
}
```

### 4.2. 할 일 수정
```bash
curl -X PUT http://localhost:8080/api/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"title": "REST 연습하기", "completed": true}'
```

### 4.3. 할 일 삭제
```bash
curl -X DELETE http://localhost:8080/api/todos/{id}
```
> 삭제는 성공하면 본문 없이 204 상태 코드만 내려옵니다.

## 5. 예외 처리 전략
- `TodoNotFoundException` → 404 Not Found
- `IllegalArgumentException` → 400 Bad Request

`TodoController`의 `@ExceptionHandler` 메서드를 참고하세요. REST에서는 오류 상황도 일관된 JSON 구조로 내려주는 것이 중요합니다.

## 6. 확장 아이디어
- `PATCH` 메서드로 부분 수정 구현해보기
- Spring Data JPA와 실제 데이터베이스 연동해보기
- Swagger/OpenAPI로 문서화해보기

---
행복한 REST 학습 되세요! ☕️
