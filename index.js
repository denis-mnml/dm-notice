import DmNotice from './src/dm-notice'

const btn = document.querySelector('.btn');

const errorNotice = DmNotice.init({
  type: 'danger',
  style: 'dark',
  position: 'top-center'
})

btn.addEventListener('click', ()=> {
  errorNotice.show('Неизвестная ошибка')
})

