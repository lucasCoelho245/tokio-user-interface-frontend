# Frontend da TokioMarine Seguradora

Aplicação front-end construída com Angular para o cadastro de clientes e consulta de endereços a partir do CEP.

## Requisitos do Sistema

- Node.js (versão recomendada: 16.x ou superior)
- Angular CLI
- npm (Node Package Manager)

## Instalação

1. Clone o repositório para sua máquina local.
    ```bash
    git clone https://github.com/lucasCoelho245/tokio-user-interface-frontend.git
    ```

2. Navegue até o diretório do projeto.
    ```bash
    cd frontend-tokiomarine
    ```

3. Instale as dependências do projeto.
    ```bash
    npm install
    ```

4. Inicie a aplicação.
    ```bash
    ng serve
    ```

A aplicação estará disponível em `http://localhost:4200`.

## Estrutura do Projeto

### Componentes

- **Cadastro de Cliente**: Componente para cadastrar um novo cliente, incluindo nome, CPF, email e endereço (CEP).
- **Lista de Clientes**: Componente para exibir a lista de clientes cadastrados, incluindo os endereços associados.
- **Formulário de Endereço**: Componente reutilizável para o cadastro de endereços com validações específicas.

### Validações de Entrada

- **Máscara de CPF**: O campo de CPF é validado para garantir que o formato seja correto (XXX.XXX.XXX-XX).
- **Máscara de CEP**: O campo de CEP é validado para garantir que esteja no formato correto (XXXXX-XXX).
- **Outras Validações**: O sistema valida campos obrigatórios e o formato do email.

### Comunicação com o Backend

A URL da API é configurada como `http://localhost:8080/clients`. O front-end se comunica com o backend por meio dos seguintes serviços:

- **`user.service.ts`**: Serviço que interage com o backend para cadastrar um cliente e consultar os dados de endereço a partir do CEP.
- **`cep.service.ts`**: Serviço que consulta o backend para obter o endereço baseado no CEP.

### Testes

A aplicação não utiliza Karma para testes automatizados. No entanto, o front-end realiza validações de inputs para impedir que o usuário forneça dados inválidos.

## Contribuições

Se você deseja contribuir com o projeto, faça um fork, crie uma branch e envie um pull request com suas modificações.
