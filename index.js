import DmNotice from './src/dm-notice'

const btn = document.querySelector('.btn');
const notice = DmNotice.init({
  position: 'top-center',
  style: 'dark',
  status: 'danger'
})

btn.addEventListener('click', () => {
  notice.show('Неизвестная ошибка')
})


const btn2 = document.querySelector('.btn2');
const notice2 = DmNotice.init({
  position: 'bottom-center',
  status: 'success'
})

btn2.addEventListener('click', () => {
  notice2.show('Операция завершена успешно')
})

