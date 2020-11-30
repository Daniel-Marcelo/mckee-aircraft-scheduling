export const isScrollBarAtBottom = (element: HTMLElement) =>  
    Math.ceil(element.scrollTop) >= element.scrollHeight - element.offsetHeight;