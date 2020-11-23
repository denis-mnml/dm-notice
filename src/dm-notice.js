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
  constructor(options = {}) {
    this.options = {
      position: 'top-right',
      style: 'light',
      status: '',
      closeTimeout: 5000,
      showClose: true,
      autoClose: true,
      ...options
    }
  }

  static init(options) {
    return new this(options)
  }

  show(text) {
    this.text = text

    if (!document.body.querySelector(`.dm-notice--container.position_${this.options.position}`)) {
      document.body.append(this.#createContainer())
    }

    this.$container = document.body.querySelector(`.dm-notice--container.position_${this.options.position}`)

    if(this.isBottomPosition) {
      this.$container.prepend(this.#createNotice())
    } else {
      this.$container.append(this.#createNotice())
    }

    if(this.options.autoClose) {
      this.autoHideNotice(this.noticeCounter)
    }
  }

  static show(text, options = {}) {
    const notice = new this(options)
    notice.show(text)
  }

  success(text) {
    this.options.status = 'success'
    this.show(text)
  }

  static success(text, options = {}) {
    const notice = new this({
      ...options,
      status: 'success'
    })
    notice.show(text)
  }

  error(text) {
    this.options.status = 'error'
    this.show(text)
  }

  static error(text, options = {}) {
    const notice = new this({
      ...options,
      status: 'error'
    })
    notice.show(text)
  }


  /**
   * Create notice container
   */
  #createContainer() {
    this.$container = document.createElement('div')
    this.$container.className = `dm-notice--container position_${this.options.position}`

    this.$container.addEventListener('click', (e) => this.clickHandler(e))

    return this.$container
  }

  /**
   * Create notice
   */
  #createNotice() {
    const notice = document.createElement('div')
    this.noticeCounter = this.#getNoticeId()

    notice.className = `dm-notice ${this.options.status} ${this.options.style}`
    notice.setAttribute('data-id', this.noticeCounter)
    notice.insertAdjacentHTML('beforeend', `<div class="dm-notice__content">${this.text}</div>`)

    if(this.options.showClose) {
      notice.insertAdjacentHTML('beforeend', `
        <div class="dm-notice__close" data-type="close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>`
      )
    }

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
        notice.style.marginBottom = `-${notice.offsetHeight}px`
      } else {
        notice.style.marginTop = `-${notice.offsetHeight + 10}px`
      }

      setTimeout(() => {
        notice.remove()

        if (!this.$container.querySelector('.dm-notice')) {
          this.destroy()
        }
      }, 300)
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

  #getNoticeId() {
    return (~~(Math.random()*1e10)).toString(16)
  }
}


