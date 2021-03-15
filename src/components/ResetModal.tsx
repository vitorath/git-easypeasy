export const ResetModal: React.FC = () => {
  return (
    <div>
      <div>
        <header>
          <h2>Reset até o commit 12DS34 - Mensagem</h2>
        </header>
        <form>
          <label htmlFor="reset-options">
            <span>Selecione a opção de reset</span>
            <select name="" id="reset-options">
              <option>Mixed</option>
              <option>Soft</option>
              <option>Hard</option>
            </select>
          </label>
          <button>Confirmar</button>
        </form>
        <button>Close</button>
      </div>
    </div>
  )
};