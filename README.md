# Desvendando o Git

## 1. O que é o Git?

É um sisteme de controle de versão distribuido. Mas pq distribuido? pq consegue trabalhar offline

## 2. Adicionando o Git ao seu projeto

Para comeraçar um projeto com a ferramenta do Git existe duas formas a primeira seria inicializando o projeto em sua máquina e a outra fazendo um clone um de um repositório já existente, sendo elas Github, BitBucket entre outros

Caso queira iniciar um projeto em sua máquina, selecione qualquer pasta do sistema  digite o comando

```bash
git init
```

Quando houver um projeto em algum repositório remoto, basta fazer um clone do mesmo para sua máxima

```bash
git clone <url-do-repositório>
```

Contudo, vale a pena resaltar que, quando fazemos o clone de um projeto já vem configurada a conexão com repositório remoto. Mas quando criamos o projeto localmente é necessário fazer este vinculo manualmente

Visualizar conexos remotas

```bash
git remote -v
```

Criar conexão remota

```bash
git remote add <nome-conexao> <url-remote-repository>
```

Remover conexão

```bash
git remote rm <nome-da-conexao>
```

## 3. Fluxo de operação

O Git divide o fluxo de trabalho em três etapas, sendo elas Workspace, Local Repository e Remote Repository. No qual, o Workspace consiste nos arquivos que você está trabalhando no momento e o Local Repository contém as informações que foram efetivadas localmente em sua máquina, por meio de commits. 

Contudo, o Remote Reposository surge no momento que precisamos armazenar o projeto em um ambiente remoto, seja por que queremos compartilhar por alguem ou simplesmente para não deixar somente armazenado em sua máquina. Um dos ambientes mais conhecidos para gerenciados projetos/repositórios que utilizam Git é o Github.

Para gerenciar os arquivos que você está trabalhando no momento (Workspace) o Git classifica estes aquivos da seguinte forma:

- **Untracked File:** são arquivos que acabaram de ser adicionado no projeto, ou seja, nunca foram feitos commits com estes arquivos
- **Unstaged Area:** são arquivos que foram modificados e/ou adicionados
- **Stagged  Area:** estes já são arquivos que estão prontos para ser feito o commit e consequentemente efetivar a mudança no histórico do Git.

Um ponto que é importante ressaltar seria que os arquivos U**ntracked** ficam rotuulados como **Unstagged Area** caso não esteja pronto para ser feito o commit e posterior podem ser movidos para a **Stagged Area**.

A imagem abaixo ilustra o fluxo de operação do Git

![Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/workflow-git.jpg](Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/workflow-git.jpg)

Na imagem podemos ver algumas ações básicas que realiza a troca de informações entre os fluxos de trabalho, sendo elas **Commit**, **Pull**, **Push** e **Fetch**. Além disso, existe a troca de informações da **Unstaged Area** para a **Stagged Area**, vice versa.

Antes de irmos para os camandos, uma breve explicação sobre as ações:

- **Commit**: ação que perisiste as informações no Git, sempre é acompanhado por uma mensagem e por baixo dos panos cria uma hash para identifica-lo (explicação simplificada).
- **Fetch**: atualiza todas as referências dos commits/modificações feitos por outras pessoas para seu repositório local. Note que ele não atualiza de fato seu repositório local, somente a refência. Seria o equivalente a pergunta "Git o que tem de novo no repositório remoto?"
- **Pull**: atualiza o repositório local com os commits/modificações feitas no repositório remoto. Vale ressaltar que é sempre bom fazer um **Fetch** antes de fazer o **Pull**.
- **Push**: atualiza o repositório remoto com os commits/modificações que foram feitas no repositório local. Contudo, caso o repositório remoto esteja mais atualizado que o local é necessário fazer o **Pull** e posteriormente o **Push**. **Esta operação pode ocasionar conflitos**.

 

Agora vamos aos comandos!

Mover um ou mais arquivos da **Unstaged Area** para a **Stagged Area**

```bash
git add <nome-do-arquivo> <nome-do-outro-arquivo>...
```

Mover todos os  da  **Unstaged Area** para a **Stagged Area**

```bash
git add --all
```

Mover um ou mais arquivos da **Stagged Area** para **Unstaged Area**

```bash
git reset -- <nome-do-arquivo> <nome-do-outro-arquivo>...
```

Mover todos os arquivos da **Stagged Area** para **Unstaged Area**

```bash
git reset --soft
```

**Commit**:

```bash
git commit -m "<mesagem-expressando-o-que-foi-feito>"
```

**Fetch**:

```bash
git fetch --all
# OU
git fetch
```

**Pull** de uma branch específica no **Local Repository:**

```bash
git pull <conexão> <nome-da-branch> # Imediatamente tenta fazer o merge
git pull --no-commit <conexão> <nome-da-branch> # Não faz o merge
git pull --rebase <conexão> <nome-da-branch> # Realiza um rebase ao invés do merge
```

**Push:**

```bash
git push <conexão> <nome-da-branch>
```

Forçar a substituir todas as modificações/histórico que foram feitas na **Remote Repository** pelo o que está na **Local Repository**:

```bash
git push <conexão> --force <nome-da-branch>
```

Mostrar aquivos que serão removidos **Unstaged Area**

```bash
git clean -n # mostra os arquivos que vão ser removidos
git clean -nd # lista os arquivos untracked, também) dentro das pastas

```

Remover/descartar os arquivos modificados ou novos da **Unstaged Area**

```bash
git checkout -- <nome-arquivo> <nome-outro-arquivo>...
git clean -df <nome-arquivo> <nome-outro-arquivo>...
```

Remover/descartar todos os arquivos modificados ou novos da **Unstaged Area** e/ou **Stagged Area**

```bash
git reset --hard
git clean # não vai remover a menos que seja forçado (default)
git clean -df # forçar a remover
git checkout -- . # remove todas as modificações
```

Visualizar as informações que estão na **Stagged Area** e **Unstaged Area**

```bash
git status
git status -s -u # Visão Simplificado
```

Visualizar os commits feitos

```bash
git log
git log --oneline # Visão implificado
```

Renomear commit 

```bash
git commit --amend -m "<mensagem>"
```

## 5. O que são branchs?

As branchs são ramificações de uma do projeto. Imagine literalmente uma árvore, onde o tronco é o principal e os galhos são ramificações ou seja as branchs.

![Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/arvore.jpg](Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/arvore.jpg)

![Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/githist.png](Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/githist.png)

Criar uma branch

```bash
git branch <nome-branch>
git branch -c <nome-branch-base> <nome-nova-branch>
```

Selecionar uma branch ou commit

```bash
git checkout <nome-branch|id-commit>
```

Criar e selecionar a branch

```bash
git checkout -b <nome-branch>
```

Visualizar as branchs do projeto:

```bash
git branch
```

Remover branch

```bash
git branch -d <nome-branch> # Remover branch local
git push <conexao> --delete <nome-branch> # Remover branch remota
```

Renomar branch, selecione a branch para executar o comando

```bash
git branch -m "<novo-nome>"
```

## 4. Camada de configurações do Git

No Git existe três arquivos de configuração, cada um conseu escopo:

```bash
git config —system —edit # Configuração do sistema operacional (normalmente nem é utilizado)
git config —global —edit # Configuração do usuário
git config —edit # Configuração do usuário
git config —local —edit # Configuração do projeto
```

Configurar o Visual Code para default do usuário

```bash
git config —global core.editor code --wait # Wait é para funcionar o rebase
```

No caso, por hora utilizo estas configurações adicionar na configuração do git

```bash
[core]
	editor = code --wait
[alias]
	sts = !git status -s -u
	cmt = !git add --all && git commit -m
	lg = !git log --pretty=format:'%C(blue)%h %C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr'
	amend = !git add --all && git commit --amend --no-edit
	count = !git shortlog -s --grep
	undo = !git reset --soft HEAD~1
[push]
	followTags = true
```

Outra coisa que já havia me esquecendo! É possível configurar alias para os comandos do git, para ganho de produtividade. Alguns que utilizo estão na imagem acima.

## 6. Unificando branchs ou commits

A unificação de branchs pode ser realizada de duas formas com o **merge** ou o **rebase**. Para realizar ambas as operações precisamos de duas branchs a **Source (de onde vem)** e a **Target (para onde vai).**

O merge tem como fundamento juntar todas as modificações feitas no **Source** e criar um unico commit com base na branch **Target,** unificando tudo que estava no passado e presente da source ****Conforme mostra a imagem abaixo.

![Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/merge.jpg](Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/merge.jpg)

Para efetuar o merge, deixe selecionada a branch **Target**

```bash
git merge <nome-branch-source> # Resolva o conflito caso houver
git commit -m "<mensagem>" # Caso tenha algum conflito é necessário fazer o commit manual
```

Já o rebase faz algo parecido, contudo a diferença é que o rebase tenta presenvar a order em que os commits foram feitos a partir da data

![Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/rebase.jpg](Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/rebase.jpg)

Caso queira fazer um rebase, não recomendo muito por ocorrer bastante conflitos (na maioria das vezes), deixe selecionada a branch **Target**

```bash
git rebase <nome-branch-source> # Resolva os conflitos caso houver
git rebase --continue # Resolva os conflitos caso houver
#... faça o comando anterior até terminar o rebase, se não me engano percorre
# cada commit da branch source

```

Além do **rebase** e do **merge** existe uma outra forma de juntar modificações denominada **cherry-pick**, contudo, esta faz o junção de um commit específico à uma branch.

![Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/cherrypick.jpg](Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/cherrypick.jpg)

Para efetuar o cherry-pick, deixe selecionada a branch **Target**

```bash
git cherry-pick <identificação-commit> # Caso tenha conflitos resolva
git commit -m "<mensagem>" # Caso tenha algum conflito é necessário fazer o commit manual
```

## 7. Desfazendo Modificações de commits

Existe três formas de desfazer um commit, sendo elas **reset**, **revert** e **rebase**.

O **reset** como o nome já diz apaga os até aquele que foi especificado, contudo este em particular existe três formas de faze-lo sendo ela:

- Mixed: Apaga o commit e envia as modificações para a Unstaged Area
- Soft: Apaga o commit e envia as modificações para a Stagged Area
- Hard: Apaga o commit e as modificações

Para efetuar o **reset**

```bash
git reset --mixed HEAD~<numero-de-commits-que-quer-voltar>
git reset --soft HEAD~<numero-de-commits-que-quer-voltar>
git reset --hard HEAD~<numero-de-commits-que-quer-voltar>
# OU
git reset --mixed <identificador-commit>
git reset --soft <identificador-commit>
git reset --hard <identificador-commit>
```

Já o revert tem como propósito reverter um commit em específico e consequentemente cria um novo commit removendo as modificaões do commit selecionado ou um intervalo

```bash
git revert HEAD~<numero-de-commits-que-quer-voltar> # Reverte todos os commits do atual até o núemro informado
git revert -n <identificador-commit-source>..<identificador-commit-target> # Reverter intervalo entre commits
git revert <identifcador-commit> # Reverte o commit especificado
```

Outra forma de apagar um commit é por meio do rebase iterativo para isso execute

```bash
git rebase -i HEAD~<numero-de-commits-que-quer-voltar>
```

Posteriormente, caso esteja configurado o Visual Code com GitLens como editor do Git irá aparecer o menu abaixo, e selecione o **drop** para remover o commit e siga o processo do rebase. Note que rebase quase sempre irá gerar conflitos, pois ele sempre recria os commits seguintes da árvore.

![Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/Screenshot_from_2021-04-13_04-31-23.png](Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/Screenshot_from_2021-04-13_04-31-23.png)

## 8. Unificando commits

Aqui é bem simples, existe duas formas de unificar commits uma com o **rebase** e a outra com o parâmetro **amend**. Contudo a com o parâmetro amend irá unificar as modificações que estão na **Stagged Area** com o ultimo commit feito

Utiliando o amend

```bash
git commit --amend --no-edit
```

Utilizando o rebase (similar ao processo de delete, só que agora utilize a opção squash)

```bash
git rebase -i HEAD~<numero-de-commits-que-quer-voltar>
```

![Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/Screenshot_from_2021-04-13_04-37-36.png](Desvendando%20o%20Git%201b41b6fb12354f59a1f44a39aa416c23/Screenshot_from_2021-04-13_04-37-36.png)

Note que o rebase unifica os commits seguntes ao commit anterior, no caso da imagem o "Testeewrerm" foi unificado ao commit "Teste Fim" e o "refactor..." for unificado ao commit "Teste Fim 2"

## 10. Tags

As tags são marcadores que podemos colocar nos commits para marcar algum tipo de versão. Contudo vale ressaltar que por padrão as tags não sobem no processo de fazer push sem especificar.

Existem dois tipo de tag **Lightwait** e **Annotated.**

As  **Lightwait Tags** tem como proposito fazer anotações pessoas pois somente armazena o identificador do commit 

```bash
git tag <versao> # Criar
git tag -d <versao> # Remover
```

Já as **Annotated Tags** tem como contém mais informações do commit (o objeto em si sen não me engano). Está por si é recomentada utilizada para versionar produção

```bash
git tag <versão> -m <descricao> # Criar 
git tag -d <versao> # Remover
```

Para subir as **Annotated Tags** no repositório remoto

```bash
git push origin <nome-branch> --follow-tags
```

## 11. Stash

O stash tem como propósito salvar algo que tenha feito  e não queira commitar. Lembre de mover os arquivos para a **Unstaged Area** antes de fazer o stash para ele salvar todos os arquivos corretamente, caso contrário **Untracked Files** podem não ser armazenados.

```bash
git stash # Cria um stash id stage@{0}
git stash push -m <mensagem> # Cria um stash com uma mensage

git stash list # Lista os stashes criado

git stash apply <identificador> # Aplica um stash específico
git stash apply # Aplica o primeiro stash da pilha

git stash pop <identificador> # Aplica um stash específico e remove
git stash pop # Aplica o primeiro stash da pilha e remove

git stash drop <identificador> # Remove um stash especifico da pilha
git stash drop # Remove o primeiro da pilha

git stash clear # Apaga todos os stashes

git stash show <identificador> # Exibe as modificações do stash especificado
git stash show # Exibe as modificações do primerio stash da pilha
```

## 12. Adicional

Remover arquivos gerenciados pelo Git para "nunca mais" serem commitados novamente. Arquivos que esquece de ignorar por exemplo

```bash
git rm <nome-do-arquivo> —cached
```

Mostrar o que foi modificado no commit

```bash
git show <nome-da-branch|identifcador-commit>
```

Fiz merda! Apaguei o que não devia, o que fazer?! 

Toda a ação do Git é reversivel, mesmo os resets, os rebases e tudo mais. O git somente remove ele de uma "área vísivel", mas caso seja necessário recurar algo... Este é o comando que mostra todo o histórico de objetos do Git

```bash
git reflog
git checkout -b <identifcador-commit> # Caso queira recuperar e criar uma branch
git checkout <identifcador-commit> # Caso queira testar ou visualizar com mais calma :)
```