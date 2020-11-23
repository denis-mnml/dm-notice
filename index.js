import DmNotice from './src/dm-notice'

const btns = document.querySelectorAll('.btn');

const noticeTopLeft = DmNotice.init({
  position: 'top-left',
})

const noticeTopCenter = DmNotice.init({
  position: 'top-center',
  status: 'success'
})

const noticeTopRight = new DmNotice({
  position: 'top-right',
  status: 'warning',
  autoClose: false
})

const noticeBottomLeft = new DmNotice({
  position: 'bottom-left',
  status: 'error',
  style: 'dark'
})

for(const btn of btns) {
  btn.addEventListener('click', function() {
    const {position} = this.dataset;

    switch(position) {
      case 'top-left':
        noticeTopLeft.error('Top left notification')
        break;
      case 'top-center':
        noticeTopCenter.show('Top center notification')
        break;
      case 'top-right':
        noticeTopRight.show('Top right notification without autoclose')
        break;
      case 'bottom-left':
        noticeBottomLeft.show('Bottom left notification')
        break;
      case 'bottom-center':
        DmNotice.success('Bottom left notification without close', {
          position: 'bottom-center',
          style: 'dark',
          showClose: false
        });
        break;
      case 'bottom-right':
        DmNotice.show('Bottom right notification', {
          position: 'bottom-right',
          status: 'warning',
          style: 'dark'
        });
        break;
    }
  })
}