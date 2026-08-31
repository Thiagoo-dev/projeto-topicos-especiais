# 🚀 React Native Base App (Android & iOS)

Estrutura base completa, moderna e escalável em **React Native** com **TypeScript** e **Expo**, projetada para rodar perfeitamente em dispositivos **Android** e **iOS**.

---

## 📁 Arquitetura e Estrutura de Diretórios

```text
react-native-base/
├── assets/                       # Ícones e splash screen nativos
├── src/
│   ├── assets/                   # Recursos estáticos internos (fontes, imagens)
│   ├── components/               # Componentes reutilizáveis
│   │   ├── common/               # Componentes atômicos (Button, Input, Loading, Card)
│   │   └── layout/               # Estruturas de layout (ScreenContainer, Header)
│   ├── constants/                # Design tokens (colors, typography, layout)
│   ├── contexts/                 # Gerenciamento de estado global (Auth, Theme)
│   ├── hooks/                    # Custom hooks (useAuth, useTheme, useDebounce)
│   ├── navigation/               # Rotas tipadas (Stacks, Bottom Tabs, Root)
│   ├── screens/                  # Telas organizadas por domínio
│   │   ├── auth/                 # LoginScreen, RegisterScreen
│   │   ├── home/                 # HomeScreen (Dashboard)
│   │   ├── profile/              # ProfileScreen
│   │   └── settings/             # SettingsScreen (Theme switch, Sobre)
│   ├── services/                 # API (Axios + interceptors) e Storage local tipado
│   ├── types/                    # Tipagens TypeScript (User, Theme, Navigation)
│   └── utils/                    # Formatadores e validadores (CPF, Email, Moeda, etc.)
├── .env.example                  # Template de variáveis de ambiente
├── app.json                      # Configuração Expo (Android package, iOS bundleId)
├── babel.config.js               # Babel com Path Aliases (@/...)
├── tsconfig.json                 # TypeScript com suporte a aliases
└── package.json                  # Dependências e scripts
```

---

## 🛠️ Tecnologias e Bibliotecas

- **Core**: React Native 0.76+, Expo SDK 52, TypeScript 5+
- **Navegação**: React Navigation v7 (Native Stack & Bottom Tabs)
- **Segurança e Layout**: `react-native-safe-area-context`, `react-native-screens`
- **Armazenamento Local**: `@react-native-async-storage/async-storage`
- **Cliente HTTP**: Axios com interceptor automático de token JWT
- **Ícones**: `@expo/vector-icons` (Ionicons)
- **Temas**: Suporte completo a Tema Claro (Light) e Escuro (Dark) com alternância dinâmica

---

## 📱 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (v18+)
- Para Android: Android Studio com emulador configurado (ou dispositivo físico via Expo Go)
- Para iOS: macOS com Xcode configurado (ou dispositivo físico via Expo Go)

### 1. Iniciar o Servidor de Desenvolvimento
```bash
npm start
```

### 2. Rodar no Emulador/Dispositivo Android
```bash
npm run android
```

### 3. Rodar no Simulador/Dispositivo iOS
```bash
npm run ios
```

### 4. Rodar na Web
```bash
npm run web
```

---

## 💡 Exemplos de Uso e Recursos Prontos

### 1. Importações com Path Aliases (`@/`)
```typescript
import { Button, Input, Card } from '@/components/common';
import { ScreenContainer } from '@/components/layout';
import { useAuth, useTheme } from '@/hooks';
import { api, storage } from '@/services';
import { formatCurrency } from '@/utils';
```

### 2. Autenticação Persistente (`AuthContext`)
O `AuthContext` gerencia o ciclo completo de autenticação com persistência no `AsyncStorage`, redirecionamento de tela automático no `RootNavigator` e injeção do token no header `Authorization: Bearer <token>` em todas as requisições HTTP do `api.ts`.

### 3. Alternância de Tema (`ThemeContext`)
Suporta 3 modos:
- `light` (Claro)
- `dark` (Escuro)
- `system` (Sincronizado automaticamente com o sistema operacional)

---

## 📂 Guia para Adicionar Novas Funcionalidades

1. **Nova Tela**: Crie o componente em `src/screens/<dominio>/<NomeScreen>/` e exporte no `index.ts`.
2. **Nova Rota**: Adicione o nome e parâmetros no arquivo `src/types/navigation.ts` e adicione o `<Stack.Screen />` ou `<Tab.Screen />` correspondente no `src/navigation/`.
3. **Novos Serviços/APIs**: Adicione chamadas HTTP tipadas em `src/services/` utilizando a instância compartilhada do `api`.
