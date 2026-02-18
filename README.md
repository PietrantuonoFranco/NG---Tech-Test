# NG---Tech-Test

Job Application Portal - Aplicación de React para gestionar candidaturas de empleo.

## 📋 Descripción General

Esta es una aplicación web construida con **React** y **Vite** que permite a los candidatos:
1. Ingresarse en el sistema usando su email
2. Ver datos personales verificados
3. Explorar posiciones de trabajo disponibles
4. Aplicar a posiciones seleccionadas

La app consume una API backend para obtener datos de candidatos, listar posiciones disponibles y registrar aplicaciones.

---

## 🏗️ Estructura del Proyecto

```
ng---tech-test/
├── src/
│   ├── components/              # Componentes React reutilizables
│   │   ├── GetCandidateData.tsx   # Formulario de búsqueda de candidatos
│   │   ├── CandidateCard.tsx      # Tarjeta que muestra datos del candidato
│   │   ├── JobsTable.tsx          # Tabla de posiciones disponibles
│   │   └── AlertMessage.tsx       # Componentes de alertas/notificaciones
│   │
│   ├── contexts/                # Context API para estado global
│   │   ├── CandidateContext.ts    # Hook personalizado para acceso al contexto
│   │   └── CandidateProvider.tsx  # Proveedor de contexto del candidato
│   │
│   ├── lib/
│   │   ├── api/                   # Funciones de llamadas a API
│   │   │   ├── fetchCandidateByEmail.ts    # GET - obtener candidato por email
│   │   │   ├── fetchJobsList.ts            # GET - obtener lista de trabajos
│   │   │   └── applyToJob.ts               # POST - aplicar a un trabajo
│   │   │
│   │   ├── interfaces/            # Definiciones de tipos TypeScript
│   │   │   ├── contexts/
│   │   │   │   └── CandidateContextType.ts
│   │   │   ├── entities/
│   │   │   │   ├── Candidate.ts
│   │   │   │   └── Job.ts
│   │   │   └── ...
│   │   │
│   │   └── utils/                 # Funciones auxiliares
│   │       └── validateEmail.ts   # Validación de emails
│   │
│   ├── styles/                  # Archivos CSS modularizados
│   │   ├── index.css              # Variables globales del tema
│   │   ├── GetCandidateData.css   # Estilos del formulario
│   │   ├── JobsTable.css          # Estilos de la tabla de trabajos
│   │   └── AlertMessage.css       # Estilos de alertas
│   │
│   ├── App.jsx                  # Componente raíz de la aplicación
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Variables CSS globales
│
├── .env                         # Variables de entorno (NO comitear)
├── .env.example                 # Template de variables de entorno
├── vite.config.js              # Configuración de Vite
├── package.json                # Dependencias del proyecto
└── README.md                   # Este archivo
```

---

## 🔄 Flujo de la Aplicación

### Step 1: Búsqueda de Candidato
```
Usuario ingresa email
    ↓
GetCandidateData.tsx valida email
    ↓
fetchCandidateByEmail() → API GET /api/candidates?email={email}
    ↓
Datos de candidato se guardan en CandidateContext
    ↓
Se dispara callback onCandidateLoaded() en App
```

### Step 2: Carga de Posiciones
```
App.handleFetchJobs()
    ↓
fetchJobsList() → API GET /api/jobs/get-list
    ↓
Lista de trabajos se almacena en estado de App
    ↓
JobsTable recibe jobs como prop
```

### Step 3: Aplicar a un Trabajo
```
Usuario hace click en "Apply"
    ↓
JobsTable.handleApply(jobId)
    ↓
Validación de campos requeridos:
  - Datos del candidato (uuid, candidateId)
  - URL del repositorio (VITE_GITHUB_REPO_URL)
    ↓
applyToJob() → API POST /api/candidate/apply-to-job
    (Envía uuid, jobId, candidateId, applicationId, repoUrl)
    ↓
Botón cambia a "Applied ✓" y se deshabilita
    ↓
Se muestra notificación de éxito o error
```

---

## 🧊 Componentes Principales

### **GetCandidateData.tsx**
- **Responsabilidad**: Formulario principal para ingresar email de candidato
- **Props**: `onCandidateLoaded`, `onCandidateCleared` (callbacks)
- **Estado local**: email, lastSubmittedEmail, localError
- **Función**: Valida email y dispara búsqueda del candidato

### **CandidateCard.tsx**
- **Responsabilidad**: Mostrar datos del candidato identificado
- **Props**: `candidate` (objeto), `onClear` (callback)
- **Función**: Muestra nombre, email, candidateId, applicationId

### **JobsTable.tsx**
- **Responsabilidad**: Tabla interactiva de posiciones disponibles
- **Props**: `jobs` (array), `loading` (boolean)
- **Estado**: applyingJobId (para cargar), appliedJobs (para historial), error
- **Validaciones**: Datos del candidato, URL del repositorio
- **Función**: Permite aplicar a trabajos con feedback visual y manejo de errores

### **AlertMessage.tsx**
- **Responsabilidad**: Componente reutilizable de notificaciones
- **Props**: `message` (string), `type` ('error' | 'success')
- **Función**: Mostrar mensajes de éxito o error

---

## 🎨 Sistema de Diseño

### Variables de Color (index.css)
```css
--primary: #ec4899              /* Rosa - color principal */
--success: #10b981              /* Verde - para acciones exitosas */
--error: #ef4444                /* Rojo - para errores */
--text-primary: #111827         /* Gris oscuro - texto principal */
--text-secondary: #6b7280       /* Gris - texto secundario */
```

### Espaciado y Bordes
```css
--spacing-*: xs, sm, md, lg, xl, 2xl
--radius-*: sm, md, lg, full
--shadow-*: sm, md, lg, xl
```

---

## 📡 API Endpoints

### 1. Obtener Candidato
```
GET /api/candidates?email={email}

Respuesta (200):
{
  "uuid": "string",
  "candidateId": "string",
  "applicationId": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string"
}
```

### 2. Listar Trabajos
```
GET /api/jobs/get-list

Respuesta (200):
[
  { "id": "string", "title": "string" },
  ...
]
```

### 3. Aplicar a Trabajo
```
POST /api/candidate/apply-to-job
Content-Type: application/json

Body:
{
  "uuid": "string",
  "jobId": "string",
  "candidateId": "string",
  "applicationId": "string",  // Opcional pero recomendado
  "repoUrl": "string"
}

Respuesta (200):
{ "ok": true }

Respuesta (400):
{ "error": "Mensaje de error específico" }
```

---

## 🔐 Context API: CandidateContext

Centraliza el estado del candidato para acceso global.

**Funciones disponibles:**
- `setCandidateData(candidate)` - Guardar datos del candidato
- `clearCandidateData()` - Limpiar datos del candidato
- `setLoading(boolean)` - Indicador de carga
- `setError(message)` - Manejar errores

**Uso:**
```typescript
const { candidate, loading, error, setCandidateData, clearCandidateData } = useCandidateContext()
```

---

## ⚙️ Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://tu-api.com
VITE_GITHUB_REPO_URL=https://github.com/tu-usuario/tu-repo
```

**Referencia:** Ver `.env.example`

---

## 🚀 Instalación y Ejecución

### Instalación
```bash
cd ng---tech-test
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre [http://localhost:5173](http://localhost:5173)

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

---

## 🛠️ Tecnologías Utilizadas

- **React 18** - UI library
- **Vite** - Build tool y dev server
- **TypeScript** - Type safety
- **CSS Modules** - Estilos modularizados
- **Context API** - Estado global

---

## 📝 Validaciones

### Email
- Formato válido (regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`)
- No vacío

### Candidato
- Debe existir en el sistema
- Requiere uuid y candidateId
- ApplicationId se envía opcionalmente

### Aplicación a Trabajo
- Datos del candidato completos (uuid, candidateId)
- URL del repositorio configurada (VITE_GITHUB_REPO_URL)
- ID del trabajo válido
- Debe estar en la lista disponible

### Manejo de Errores
- Mensajes descriptivos para cada tipo de error
- Validación pre-envío para evitar llamadas fallidas
- Extracción de mensajes de error de respuestas API

---