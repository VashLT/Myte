window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  svg: {
    fontCache: 'global'
  }
};

(function () {
    var script = document.createElement('script');
    var code = `
    <script type="text/javascript">
        if (window.MathJax) {
            MathJax.Hub.Queue(
                ["resetEquationNumbers",MathJax.InputJax.TeX],
                ["Typeset",MathJax.Hub]
            );  
        }
    </script>`
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    script.async = true;
    script.appendChild(document.createTextNode(code));
    document.head.appendChild(script);
    
})();