(function () {
  if (typeof EventTarget === 'undefined') return;
  const func = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    if (options === undefined) options = { passive: false };
    if (typeof options === 'boolean') {
      options = { capture: options, passive: false };
    } else {
      options.passive = false;
    }
    return func.call(this, type, listener, options);
  };
})();
