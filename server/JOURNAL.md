# 📓 Journal

Detalhamento de ideias, decisões e descobertas durante o desenvolvimento do sistema.

## 📑 Sumário

- [🔐 Permissões [RBAC, ABAC]](#permissões)
- [🛠️ Serviços](#serviços)
  - [✉️ Zoho Mail + Nodemailer](#️-zoho-mail--nodemailer)

## 🔐 Permissões

Nesse sistema irei juntar `RBAC` + `ABAC`. Pelos seguintes motivos:
- **RBAC (Role-Based Access Control)**: Permissões default para grupos
  - 👨‍💼 MANAGER: `read:users`, `update:users`...
  - 👩‍💻 EMPLOYEE: `read:customers`, `create:customers`...

- **ABAC (Attribute-Based Access Control)**: Permissões personalizadas
  - 👨‍💼 MANAGER: `deactivate:employee` caso cumpra determinados requisitos
  - 👩‍💻 EMPLOYEE: `deactivate:user`, caso cumpra determinados requisitos

## 🛠️ Serviços

### **✉️ Zoho Mail + Nodemailer**