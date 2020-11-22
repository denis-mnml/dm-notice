/**
 * Parameters
 *
 * position: top-right || top-left || top-center || bottom-right || bottom-left || bottom-center
 * style: light, dark
 * status: success, danger, warning
 * timeout: timeout closing
 * transition: transition closing
 */




export default class DmNotice {
  constructor(text = '', options = {}) {
    this.text = text
    this.options = {
      position: 'top-right',
      style: 'light',
      status: '',
      timeout: 5000,
      transition: 300,
      ...options
    }
    this.deleted = false;
    this.notices = []
  }

  static init(options) {
    return new this('', options)
  }

  show(noticeText) {
    this.text = noticeText

    if (!document.querySelector('.dm-notice--container')) {
      this.#createContainer()
    }

    this.#createNotice()
  }

  /**
   * Create notice container
   */
  #createContainer() {
    const container = `<div class="dm-notice--container position_${this.options.position}"
                            style="transition: transform ${this.options.transition / 1000}s ease"></div>`
    document.body.insertAdjacentHTML('beforeend', container)
  }

  /**
   * Create notice
   */
  #createNotice() {
    this.$notice = document.createElement('div')

    this.$notice.className = `dm-notice ${this.options.status} ${this.options.style}`
    this.$notice.innerHTML = `
      <div class="dm-notice__content">${this.text}</div>
      <div class="dm-notice__close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>`

    this.$closeButton = this.$notice.querySelector('.dm-notice__close')
    this.$closeButton.addEventListener('click', () => this.close())

    document.querySelector('.dm-notice--container').append(this.$notice)

    setTimeout(() => {
      this.$notice.classList.add('show')
    }, 100)

    setTimeout(() => {
      this.close()
    }, this.options.timeout)
  }

  /**
   * Close notice
   */
  close() {
    if (!this.deleted) {
      this.deleted = true
      this.$notice.classList.remove('show')

      this.#closeAnimation()

      setTimeout(() => {
        this.$closeButton.removeEventListener('click', this.close);
        this.$notice.remove();

        if (!document.body.querySelector('.dm-notice')) {
          this.removeContainer();
        }
      }, this.options.transition);
    }
  }

  #closeAnimation() {
    if (/top-/.test(this.options.position)) {
      this.$notice.style.marginTop = `-${this.$notice.offsetHeight + 10}px`;
    } else {
      this.$notice.style.marginBottom = `-${this.$notice.offsetHeight + 10}px`;
    }
  }

  removeContainer() {
    const container = document.querySelector('.dm-notice--container');
    container.remove();
  }
}


