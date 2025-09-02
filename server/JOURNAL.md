# 📓 Journal

Detalhamento de ideias, decisões e descobertas durante o desenvolvimento do sistema.

## 📑 Sumário

- [🔐 Permissões [RBAC, ABAC]](#permissões)

## 🔐 Permissões

Nesse sistema irei juntar `RBAC` + `ABAC`. Pelos seguintes motivos:
- **RBAC (Role-Based Access Control)**: Permissões default para grupos
  - 👨‍💼 MANAGER: `read:users`, `update:users`...
  - 👩‍💻 EMPLOYEE: `read:customers`, `create:customers`...

- **ABAC (Attribute-Based Access Control)**: Permissões personalizadas
  - 👨‍💼 MANAGER: `deactivate:employee`...
  - 👩‍💻 EMPLOYEE: `deactivate:user`, caso cumpra determinados requisitos

Nesse projeto, até então, o `RBAC` servirá majoritariamente para definição, podendo posteriormente abrigar permissões default.