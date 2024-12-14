# Drawing App 🎨

Drawing App은 웹 브라우저에서 동작하는 직관적이고 다양한 기능을 갖춘 드로잉 애플리케이션입니다.

## 주요 기능 ✨

### 기본 드로잉 기능
- ✍️ 자유 드로잉
- 🎨 다양한 색상 선택
- 📏 선 두께 조절 (1-10px)
- ✋ DrawFill 모드 (채우면서 그리기)
- 📮 전체 화면 채우기

### 텍스트 및 이미지
- 👆 텍스트 삽입
- 🖼️ 배경 이미지 검색 및 적용 (Unsplash API 활용)
- ✚ 로컬 이미지 배경 적용

### 편집 도구
- ✊ 전체 지우기
- ❌ 지우개 기능
- 📲 작업 결과 이미지 저장

## 기술 스택 🛠

- HTML5 Canvas
- Vanilla JavaScript
- CSS3
- Unsplash API


## 사용 방법 📝

1. 시작 페이지에서 "Let's Start Drawing!" 버튼 클릭
2. 상단의 색상 팔레트에서 원하는 색상 선택
3. 선 두께 조절 슬라이더로 원하는 굵기 설정
4. 다양한 그리기 모드 선택:
   - Draw: 기본 그리기 모드
   - DrawFill: 채우면서 그리기 모드
   - FillScreen: 전체 화면 채우기
5. 추가 기능:
   - 텍스트 입력 후 TextFill 버튼으로 삽입
   - 배경 이미지 검색 및 적용
   - 로컬 이미지 업로드
   - 작업 결과 저장

## 시스템 아키텍처

```mermaid
graph TB
subgraph "Drawing App Architecture"
subgraph "Frontend Layer"
A[HTML5] --> |Structure| B[Canvas API]
C[CSS3] --> |Styling| D[UI Components]
E[Vanilla JS] --> |Logic| B
E --> |Event Handling| D
end
subgraph "Core Features"
B --> F[Drawing Tools]
B --> G[Image Processing]
B --> H[State Management]
end
subgraph "External Services"
I[Unsplash API] --> G
end
subgraph "File System"
J[Local Storage] --> G
K[File Export] --> G
end
end```

```mermaid
graph TB
subgraph "Technology Stack"
subgraph "Frontend Technologies"
A[HTML5] --> |Core Technologies| D[Canvas API]
B[CSS3] --> |Styling| E[UI/UX]
C[JavaScript] --> |Core Logic| F[Application Logic]
E --> G[Responsive Design]
E --> H[Animations]
E --> I[Layout System]
F --> J[Event Handling]
F --> K[State Management]
F --> L[API Integration]
end
subgraph "Features"
D --> M[Drawing Tools]
D --> N[Image Processing]
D --> O[Text Rendering]
M --> P[Free Drawing]
M --> Q[Fill Mode]
M --> R[Eraser]
N --> S[Image Upload]
N --> T[Image Search]
N --> U[Image Export]
end
subgraph "External API"
V[Unsplash API] --> W[Image Search Service]
W --> X[JSON Response]
X --> N
end
end```

```mermaid
sequenceDiagram
participant User
participant UI
participant EventHandler
participant StateManager
participant Canvas
participant API
User->>UI: 사용자 입력
UI->>EventHandler: 이벤트 발생
EventHandler->>StateManager: 상태 업데이트 요청
StateManager->>Canvas: 렌더링 요청
alt 이미지 검색
UI->>API: API 요청
API-->>StateManager: 데이터 반환
StateManager->>Canvas: 이미지 렌더링
end```

```mermaid
graph TB
subgraph "Component Structure"
A[App Container]
B[Canvas Container]
C[Tools Container]
D[Modal Container]
A --> B
A --> C
A --> D
B --> E[Canvas Element]
C --> F[Color Picker]
C --> G[Brush Tools]
C --> H[Action Buttons]
D --> I[Search Modal]
D --> J[Image Grid]
F --> K[Color Options]
F --> L[Custom Color]
G --> M[Brush Size]
G --> N[Drawing Modes]
H --> O[Save]
H --> P[Clear]
H --> Q[Undo]
end```


```mermaid
graph LR
subgraph "Event Handling System"
A[User Input] --> B{Event Type}
B -->|Mouse Events| C[Drawing Events]
B -->|File Input| D[Image Events]
B -->|Button Click| E[Tool Events]
C --> F[State Update]
D --> F
E --> F
F --> G[Canvas Render]
G --> H[UI Update]
end```