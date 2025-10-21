# 💻 Frontend — Gestão de Funcionários

Aplicação **Angular 19** desenvolvida para consumo da API de **Gestão de Funcionários**, permitindo visualizar, cadastrar, editar, inativar e excluir registros de forma simples e moderna.

---

## ⚙️ Tecnologias utilizadas

* **Angular 19 (standalone components)**
* **PrimeNG + Tema Aura**
* **TypeScript / HTML / SCSS**
* **RxJS e HttpClient**

---

## 📚 Funcionalidades principais

* Tela inicial com mensagem de boas-vindas
* **Listagem de funcionários** com filtros por cargo e status (ativo/inativo)
* **Cadastro e edição** com validações básicas
* **Seleção de data** de admissão via componente de calendário
* **Filtros dinâmicos** e busca manual
* **Feedbacks visuais** e botões com ícones do PrimeNG

---

## 📁 Estrutura do projeto

```
src/app/
 ├─ navbar/            → Menu superior de navegação
 ├─ home/              → Tela inicial
 ├─ lista/             → Listagem e filtros
 ├─ cadastro/          → Formulário de cadastro/edição
 ├─ service/           → FuncionariosService (integração com API)
 ├─ app.routes.ts      → Rotas principais
 └─ app.component.*    → Componente raiz
```

---

## 🔗 Integração com o backend

* A API consumida está em **[http://localhost:8080/api/funcionarios](http://localhost:8080/api/funcionarios)**
* CORS já configurado no backend (`@CrossOrigin("*")`)
* O formato de data utilizado é **`dd/MM/yyyy`**

---

## ▶️ Como executar o projeto

1. Certifique-se de ter o **Node.js 18+** e o **Angular CLI 19** instalados.
2. No terminal, dentro da pasta do projeto:

   ```bash
   npm install
   ng serve
   ```
3. Acesse o app em **[http://localhost:4200](http://localhost:4200)**

---

## 🧠 Observações

* O projeto utiliza **PrimeNG** para todos os componentes visuais.
* Os **comboboxes** trazem opções pré-definidas de cargos na área de TI.
* Os dados exibidos dependem do backend estar em execução.
* O botão **“Buscar”** carrega os resultados conforme os filtros selecionados.

---

> Projeto desenvolvido para fins acadêmicos, integrado ao backend **Gestão de Funcionários API (Spring Boot 3)**.
