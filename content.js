chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getLargestImage') {
    var images = document.querySelectorAll('img');
    var largestImage = null;
    var largestDisplayedSize = 0;
    var blankImageCount = 0;

    images.forEach(function (img) {
      var displayedSize = img.clientWidth * img.clientHeight;
      if (img.src === '' || img.src === largestImage) {
        // Check for false positives
        blankImageCount++;
      }
      else if (displayedSize > largestDisplayedSize) {
        // Otherwise compare to current largest
        largestDisplayedSize = displayedSize;
        largestImage = img.src;
      }
    });

    var hasHtmlContent = document.body.childElementCount - blankImageCount > 1;
    
    if (largestImage && hasHtmlContent) {
      // Open the largest displayed image in the same tab
      window.open(largestImage, '_self');
    } else {
      // No images found or only a single image, go back to the previous page
      window.history.back();
    }
  }
});
