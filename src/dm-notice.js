/**
 * Parameters
 *
 * position: top-right || top-left || top-center || bottom-right || bottom-left || bottom-center
 * style: light, dark
 * status: success, danger, warning
 * timeout: timeout closing
 * transition: transition closing
 */
// export default function dmNotice(text, options) {
//   return new Notification(text, options)
// }

export default class DmNotice {
  constructor(text = '', options = {}) {
    this.text = text
    this.options = {
      position: 'top-right',
      style: 'light',
      status: '',
      closeTimeout: 5000,
      showClose: true,
      autoClose: true,
      ...options
    }
    this.noticeCounter = 0

    this.#createContainer()
  }

  static init(options) {
    return new this('', options)
  }

  show(text) {
    this.text = text + ' ' + this.noticeCounter

    if (!document.querySelector('.dm-notice--container')) {
      document.body.append(this.$container)
    }

    if(this.isBottomPosition) {
      this.$container.prepend(this.#createNotice())
    } else {
      this.$container.append(this.#createNotice())
    }



    if(this.options.autoClose) {
      this.autoHideNotice(this.noticeCounter)
    }
  }

  /**
   * Create notice container
   */
  #createContainer() {
    this.$container = document.createElement('div')
    this.$container.className = `dm-notice--container position_${this.options.position}`

    this.$container.addEventListener('click', (e) => this.clickHandler(e))
  }

  /**
   * Create notice
   */
  #createNotice() {
    const notice = document.createElement('div')

    this.noticeCounter++

    notice.className = `dm-notice ${this.options.status} ${this.options.style}`
    notice.setAttribute('data-id', this.noticeCounter)
    notice.innerHTML = `
      <div class="dm-notice__content">${this.text}</div>
      <div class="dm-notice__close" data-type="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>`

    return notice
  }

  /**
   * Click close handler
   * @param e
   */
  clickHandler(e) {
    if(e.target.closest('.dm-notice__close') || e.target.classList.contains('dm-notice__close')) {
      const noticeId = e.target.closest('.dm-notice[data-id]').getAttribute('data-id')
      this.hideNotice(noticeId)
    }
  }


  /**
   * Close notice
   *
   * @param id (id notice)
   */
  hideNotice(id) {
    const notice = this.$container.querySelector(`.dm-notice[data-id="${id}"]`)

    if(notice) {
      notice.classList.add('closing')

      if (this.isBottomPosition) {
        notice.style.marginBottom = `-${notice.offsetHeight}px`;
      } else {
        notice.style.marginTop = `-${notice.offsetHeight + 10}px`;
      }

      setTimeout(() => {
        notice.remove();

        if (!this.$container.querySelector('.dm-notice')) {
          this.destroy();
        }
      }, 1000);
    }
  }

  autoHideNotice(id) {
    setTimeout(() => {
      this.hideNotice(id)
    }, this.options.closeTimeout)
  }

  destroy() {
    this.$container.removeEventListener('click', () => this.clickHandler())
    this.$container.remove()
    this.noticeCounter = 0
  }

  get isBottomPosition() {
    return /bottom-/.test(this.options.position)
  }
}


