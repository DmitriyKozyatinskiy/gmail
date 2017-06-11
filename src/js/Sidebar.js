import $ from 'jquery';
import Mustache from 'mustache';
import sidebarTemplate from './../html/sidebar.html';
import crmTemplate from './../html/crm.html';
import interactionsTemplate from './../html/interactions.html';
import menuTemplate from './../html/menu.html';
import './../styles/Sidebar.scss';
import './../styles/Menu.scss';

const SIDEBAR_WIDTH = 400;

export default class Sidebar {
  constructor(data, type) {
    this._data = data;
    this._type = type;
    this._render();
  }

  _getSidebarHtml() {
    const sidebarHtml = Mustache.render(sidebarTemplate, this._data);
    const crmHtml = Mustache.render(crmTemplate, this._data);
    const interactionsHtml = Mustache.render(interactionsTemplate, this._data);
    const menuHtml = Mustache.render(menuTemplate, this._data);
    const $sidebar = $(sidebarHtml);
    $sidebar.append($(crmHtml)).append($(interactionsHtml)).append($(menuHtml));
    return $sidebar.wrap('<div>').parent().html();
  }

  _setEmailSidebar() {
    const sidebarHtml = this._getSidebarHtml();
    const $sidebarContainer = $('[role="presentation"] [role="complementary"]').closest('td');
    $sidebarContainer.html(sidebarHtml);
  }

  _setContactSidebar() {
    const sidebarHtml = this._getSidebarHtml();
      const contactSelector = 'div > .nH > .nH > .nH > .nH.age.abe.Tm:visible, .XoqCub.EGSDee > .XoqCub.SKc6ve .XoqCub.NUxIad.bsvFKf.oLaOvc > .XoqCub';
    var interval = window.setInterval(() => {
      const $mainContent = $(contactSelector);
      if ($mainContent.length) {
        window.clearInterval(interval);
        const oldContentWidth = $mainContent.width();
        const contentWidth = oldContentWidth - SIDEBAR_WIDTH - 30;
        $mainContent.wrapInner($('<div>', {
          class: 'js-content-wrapper',
          style: 'float: left; overflow-x: auto; width: ' + contentWidth + 'px;'
        }));
        $mainContent.append($('<div>', {
          html: sidebarHtml,
          class: 'js-sidebar-wrapper',
          style: 'float: right'
        }));
      }
    }, 1000);
  }

  _setCalendarSidebar() {
    const sidebarHtml = this._getSidebarHtml();
    var interval = window.setInterval(() => {
      this.$mainContent = $('.ep-ro.ep');
      if (this.$mainContent.length) {
        window.clearInterval(interval);
        const $sidebarContainer = this.$mainContent.parent();
        this.oldContentWidth = this.$mainContent.width();
        const contentWidth = this.oldContentWidth - SIDEBAR_WIDTH - 30;
        this.$mainContent.width(contentWidth).css('float', 'left');
        $sidebarContainer.append($('<div>', {
          html: sidebarHtml,
          class: 'js-sidebar-wrapper',
          style: 'float: right'
        }));
      }
    }, 1000);
  }

  _render() {
    this._destroy();
    if (this._type === 'email') {
      this._setEmailSidebar();
    } else if (this._type === 'contact') {
      this._setContactSidebar();
    } else if (this._type === 'calendar') {
      this._setCalendarSidebar();
    }
  }

  _destroy() {
    $('.js-sidebar').remove();
    $('.js-content-wrapper').find('> .nH').unwrap();
    $('.js-sidebar-wrapper').remove();
    if (this.$mainContent) {
      this.$mainContent.width(this.oldContentWidth).css('float', 'none');
    }
  }

  show(data) {
    this._data = data;
    this._render();
  }
}
