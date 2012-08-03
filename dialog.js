define(['view',
        'overlay',
        'anchor/class'],
function(View, Overlay, clazz) {
  
  // TODO: Track active dialog
  function Dialog(el, options) {
    options = options || {};
    
    Dialog.super_.call(this, el, options);
    this._init(options);
  }
  clazz.inherits(Dialog, View);
  
  Dialog.prototype._init = function(options) {
    var el = this.el
      , self = this;
    
    el.find('.close').on('click', function(){
      self.emit('close');
      self.hide();
      return false;
    });
  }
  
  Dialog.prototype.modal = function(options) {
    this.overlay(options);
    return this;
  };
  
  Dialog.prototype.overlay = function(options) {
    options = options || {};
    var self = this
      , template = options.template || 'overlay';

    this._overlay = new Overlay(template, options);
    this._overlay.on('hide', function(){
      self._closedOverlay = true;
      self.el.removeClass('modal');
      self.hide();
    });

    return this;
  };
  
  
  Dialog.prototype.show = function() {
    var el = this.el
      , overlay = this._overlay;
    
    this.emit('show');
    
    if (overlay) {
      overlay.show();
      el.addClass('modal');
    }
    
    // TODO: Only append elements if they are not already present
    el.appendTo(document.body);
    el.removeClass('hide');
    return this;
  }
  
  Dialog.prototype.hide = function() {
    var self = this;
    this.el.hide();
    
    if (this._overlay && !this._closedOverlay) this._overlay.hide();
    
    // TODO: Add autoRemove option, and respect it with overlay
    setTimeout(function() {
      self.el.remove();
    }, 2000); // FIXME: These timeouts need to be more immediate
    
    return this;
  }
  
  return Dialog;
});
