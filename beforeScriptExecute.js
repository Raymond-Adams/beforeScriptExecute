(() => {
  if ('onbeforescriptexecute' in document) return;

  const scriptHandler = (script) => {
    class BseEvent extends Event {
      target = script;
    }
    const bse = new BseEvent('beforescriptexecute', { cancelable: true });
    const isCancelled = !document.dispatchEvent(bse);
    if (isCancelled) script.remove();
  };
  const observer = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; ++i) {
      for (let j = 0; j < mutations[i].addedNodes.length; ++j) {
        const node = mutations[i].addedNodes[j];
        if (node.tagName === 'SCRIPT') scriptHandler(node);
      }
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
})();
