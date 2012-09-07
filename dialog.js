define(['overlay',
        'view',
        'class',
        'sail'],
function(Overlay, View, clazz, sail) {
  
  // TODO: Implement support for effects.
  
  function Dialog(el, options) {
    Dialog.super_.call(this, el, options);
    options = options || {};
    this._cselector = options.contentSelector || 'body';
    this._autoRemove = options.autoRemove !== undefined ? options.autoRemove : true;
    
    var self = this
      , el = this.el;
    
    el.find('.close').on('click', function(){
      self.emit('close');
      self.hide();
      return false;
    });
    this.on('escape', this.hide.bind(this));
  }
  clazz.inherits(Dialog, View);
  
  Dialog.prototype.overlay = function(options) {
    options = options || {};
    
    var self = this
      , template = options.template || 'overlay';

    this.el.addClass('modal');
    this._overlay = new Overlay(template, options);
    this._overlay.on('hide', function(){
      self._overlay = null;
      self.hide();
    });
    return this;
  };
  
  Dialog.prototype.escapable = function() {
    this._onkeydown = keydown.bind(this);
    sail.$(document).on('keydown', this._onkeydown);
    
    function keydown(e) {
      if (27 != e.which) return true;
      this.emit('escape');
      return false;
    }
  };
  
  Dialog.prototype.show = function() {
    var el = this.el
      , overlay = this._overlay;
    
    this.emit('show');
    if (overlay) overlay.show();
    el.appendTo(document.body);
    el.removeClass('hide');
    return this;
  }
  
  Dialog.prototype.hide = function() {
    var self = this;
    this.emit('hide');
    this.el.addClass('hide');
    if (this._autoRemove) {
      setTimeout(function() {
        self.remove();
      }, 10);
    }
    return this;
  }
  
  Dialog.prototype.content = function(el) {
    this.el.find(this._cselector).empty().append(el);
    return this;
  };
  
  Dialog.prototype.remove = function() {
    if (this._onkeydown) sail.$(document).off('keydown', this._onkeydown);
    if (this._overlay) this._overlay.remove();
    this.el.remove();
    return this;
  };
  
  return Dialog;
});
