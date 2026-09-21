# 🏋️ App de Treinos (Academia & Casa) — com IA

Aplicativo mobile para treinos personalizados, feito para quem treina **na academia** ou **em casa**. Projeto acadêmico do curso de **Análise e Desenvolvimento de Sistemas (ADS)**, construído em **React Native + TypeScript + Expo**.

> 🤖 **Este projeto está sendo desenvolvido com apoio de Inteligência Artificial.**
> Parte do código (telas, componentes, fluxos de navegação e tipagens) foi criada e refatorada com o auxílio de assistentes de IA (Claude), usados como par de programação durante o desenvolvimento. Além disso, a **personalização dos treinos** é a proposta central do produto: os dados coletados no cadastro (objetivo, nível, local de treino, frequência semanal, restrições) serão usados por um modelo de IA para gerar treinos sob medida para cada usuário — funcionalidade prevista no roadmap do projeto.

---

## 🆕 O que mudou nesta versão

- **Removida** a tela inicial de demonstração do template base (cards genéricos de "Cross-Platform / TypeScript / Temas").
- **Nova tela de Cadastro** (`RegisterScreen`), reformulada como um formulário em **3 etapas**, voltada a coletar informações relevantes para treino:
  1. **Sua conta** — nome, e-mail, senha
  2. **Seus dados** — idade, sexo, peso, altura
  3. **Seu treino** — local de treino (academia/casa/ambos), nível de experiência, objetivo principal, frequência semanal e restrições/lesões (opcional)
- **Home** redesenhada para exibir um resumo do perfil de treino do usuário (local, nível, frequência, objetivo) em vez do conteúdo de exemplo do template.
- **Perfil** atualizado com os cards "Dados Pessoais" e "Perfil de Treino", exibindo tudo o que foi coletado no cadastro.
- Novo componente reutilizável **`Chip`** (seleção tipo "pílula"), usado nas escolhas do cadastro.
- Novos tipos (`Gender`, `TrainingLocation`, `ExperienceLevel`, `TrainingGoal`, `WeeklyFrequency`) e campos estendidos em `User` e `RegisterCredentials`.
- Arquivo `src/utils/fitnessLabels.ts` centralizando os textos exibidos para cada opção (usado no Cadastro, Home e Perfil).

---

## 📁 Arquitetura e Estrutura de Diretórios

```text
react-native-base/
├── assets/                       # Ícones e splash screen nativos
├── src/
│   ├── assets/                   # Recursos estáticos internos (fontes, imagens)
│   ├── components/               # Componentes reutilizáveis
│   │   ├── common/               # Componentes atômicos (Button, Input, Loading, Card, Chip)
│   │   └── layout/                # Estruturas de layout (ScreenContainer, Header)
│   ├── constants/                # Design tokens (colors, typography, layout)
│   ├── contexts/                 # Gerenciamento de estado global (Auth, Theme)
│   ├── hooks/                    # Custom hooks (useAuth, useTheme, useDebounce)
│   ├── navigation/                # Rotas tipadas (Stacks, Bottom Tabs, Root)
│   ├── screens/                   # Telas organizadas por domínio
│   │   ├── auth/                  # LoginScreen, RegisterScreen (cadastro em 3 etapas)
│   │   ├── home/                  # HomeScreen (Dashboard com perfil de treino)
│   │   ├── profile/                # ProfileScreen (dados pessoais + perfil de treino)
│   │   └── settings/               # SettingsScreen (Theme switch, Sobre)
│   ├── services/                  # API (Axios + interceptors) e Storage local tipado
│   ├── types/                     # Tipagens TypeScript (User, Theme, Navigation)
│   └── utils/                     # Formatadores, validadores e labels de treino (fitnessLabels.ts)
├── .env.example                   # Template de variáveis de ambiente
├── app.json                       # Configuração Expo (Android package, iOS bundleId)
├── babel.config.js                # Babel com Path Aliases (@/...)
├── tsconfig.json                  # TypeScript com suporte a aliases
└── package.json                   # Dependências e scripts
```

---

## 🧬 Modelo de Dados do Usuário

Definido em `src/types/user.ts`. Os campos coletados no cadastro alimentam a personalização do treino:

| Campo               | Tipo                                                                 | Descrição                              |
|----------------------|-----------------------------------------------------------------------|------------------------------------------|
| `name`, `email`      | `string`                                                              | Dados de conta                         |
| `age`                | `number`                                                              | Idade                                   |
| `gender`             | `'masculino' \| 'feminino' \| 'prefiro_nao_informar'`                 | Sexo                                     |
| `weightKg`           | `number`                                                              | Peso em kg                              |
| `heightCm`           | `number`                                                              | Altura em cm                            |
| `trainingLocation`   | `'academia' \| 'casa' \| 'ambos'`                                     | Onde o usuário treina                   |
| `experienceLevel`    | `'iniciante' \| 'intermediario' \| 'avancado'`                        | Nível de experiência                    |
| `goal`               | `'emagrecimento' \| 'hipertrofia' \| 'condicionamento' \| 'saude_geral'` | Objetivo principal                   |
| `weeklyFrequency`    | `'1_2' \| '3_4' \| '5_6' \| 'todos_os_dias'`                          | Frequência semanal de treino             |
| `restrictions`       | `string` (opcional)                                                   | Lesões ou restrições físicas            |

Os textos exibidos para cada valor ficam em `src/utils/fitnessLabels.ts`, para manter Cadastro, Home e Perfil sempre consistentes.

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

### 0. Instalar as dependências (necessário na primeira vez / após atualizações)
```bash
npm install
```

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
import { Button, Input, Card, Chip } from '@/components/common';
import { ScreenContainer } from '@/components/layout';
import { useAuth, useTheme } from '@/hooks';
import { api, storage } from '@/services';
import { goalLabels, experienceLevelLabels } from '@/utils/fitnessLabels';
```

### 2. Autenticação Persistente (`AuthContext`)
O `AuthContext` gerencia o ciclo completo de autenticação com persistência no `AsyncStorage`, redirecionamento de tela automático no `RootNavigator` e injeção do token no header `Authorization: Bearer <token>` em todas as requisições HTTP do `api.ts`. O `register()` agora também recebe e persiste todo o perfil de treino coletado no cadastro.

### 3. Cadastro em Etapas (`RegisterScreen`)
A tela usa um estado local de `step` (0 a 2) para alternar entre os blocos de campos, com validação própria por etapa antes de liberar o botão "Continuar". As opções de seleção (sexo, local de treino, nível, objetivo, frequência) usam o componente `Chip`, que aceita `label`, `icon` (Ionicons) e estado `selected`.

### 4. Alternância de Tema (`ThemeContext`)
Suporta 3 modos:
- `light` (Claro)
- `dark` (Escuro)
- `system` (Sincronizado automaticamente com o sistema operacional)

---

## 📂 Guia para Adicionar Novas Funcionalidades

1. **Nova Tela**: Crie o componente em `src/screens/<dominio>/<NomeScreen>/` e exporte no `index.ts`.
2. **Nova Rota**: Adicione o nome e parâmetros no arquivo `src/types/navigation.ts` e adicione o `<Stack.Screen />` ou `<Tab.Screen />` correspondente no `src/navigation/`.
3. **Novos Serviços/APIs**: Adicione chamadas HTTP tipadas em `src/services/` utilizando a instância compartilhada do `api`.
4. **Novo campo de perfil de treino**: adicione o tipo em `src/types/user.ts`, o rótulo correspondente em `src/utils/fitnessLabels.ts` e o campo no formulário de `RegisterScreen` — assim ele já aparece automaticamente disponível para uso em Home e Perfil.

---

## 🗺️ Roadmap

- [ ] Geração de treino personalizado por IA com base no perfil cadastrado (objetivo, nível, local, frequência, restrições)
- [ ] Histórico e acompanhamento de treinos realizados
- [ ] Edição do perfil de treino após o cadastro (tela de edição em `ProfileScreen`)
- [ ] Integração com um backend real (hoje o cadastro/login usa dados simulados no `AuthContext`)
