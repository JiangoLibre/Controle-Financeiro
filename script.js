const transactionUl = document.querySelector('#transactions')

const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const inputTransacionName = document.querySelector('#text')
const inputTransacionAmount = document.querySelector('#amount')

const form = document.querySelector('#form')

const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'))
let transactions = localStorage
  .getItem('transactions') !== null ? localStorageTransactions : []

//Quando adicionar a Li numa lsita de transações e ela for uma despesa: inserir a class "minus" e - no span
//E se for uma receita: inserir class plus e não colocar operador

const removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  updateLocalStorage()
  init()
}

const addTransactionIntoDOM = ({ amount, name, id}) => {
  const operator = amount < 0 ? "-" : "+";
  const CSSClass = amount < 0 ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(amount)
  const li = document.createElement('li')

  li.classList.add(CSSClass)
  li.innerHTML = `
    ${name} 
    <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn"onClick="removeTransaction(${id})">x</button>
  `
  transactionUl.append(li)
};

const getExpenses = (transactionsAmounts) =>
  Math.abs(
    transactionsAmounts
      .filter((value) => value < 0)
      .reduce((accumulator, value) => accumulator + value, 0)
  ).toFixed(2);

  const getIncome = (transactionsAmounts) =>
    transactionsAmounts
      .filter((value) => value > 0)
      .reduce((accumulator, value) => accumulator + value, 0)
      .toFixed(2);

  const getTotal = (transactionsAmounts) =>
    transactionsAmounts
      .reduce((accumulator, transaction) => accumulator + transaction, 0)
      .toFixed(2);

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(({ amount }) => amount)
  const total = getTotal(transactionsAmounts)
  const income = getIncome (transactionsAmounts)
  const expense = getExpenses(transactionsAmounts)
  
  balanceDisplay.textContent = `R$ ${total}`
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
  transactionUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}

init()

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions) )
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionArray = (transactionName, transactionsAmount) => {
  transactions.push({ 
    id: generateID(),
    name: transactionName, 
    amount: Number(transactionsAmount)
  })
}

const cleanInputs = () => {
  inputTransacionName.value = ''
  inputTransacionAmount.value = ''
}

const hadleFormsSubmit = event => {
  event.preventDefault()

  const transactionName = inputTransacionName.value.trim()
  const transactionsAmount = inputTransacionAmount.value.trim()
  const isSomeInputEmpty = transactionName === '' ||  transactionsAmount === ''

  if(isSomeInputEmpty) {
    alert('Por favor, preencha tanto o nome quanto o valor da transação')
    return
  }

  addToTransactionArray(transactionName,  transactionsAmount )
  init()
  updateLocalStorage()
  cleanInputs()
}

form.addEventListener("submit",hadleFormsSubmit)


  /* O append insere o elemento que ele recebeu como argumento, 
  como o ultimo filho do elemento ao qual ele foi encadeado, 
  a transaição mais recente vai ser a ultima li

  Agora se quando a adição for feita e é pra ser o primiero filho usamos o metodo prepend

  O valor que a InnerHTML tem que ser uma string
  */



  