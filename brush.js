var BrushBase = require('brush-base');
var regexLib = require('syntaxhighlighter-regex').commonRegExp;

function Brush() {
  var keywords = 'abstract annotation as break by catch class companion const constructor continue' +
                 ' crossinline data do dynamic else enum external false final finally for fun get if' +
                 ' import in infix init inline inner interface internal is lateinit noinline null object' +
                 ' open operator out override package private protected public reified return sealed' +
                 ' set super tailrec this throw trait true try type val var vararg when where while' +
                 ' String Array Unit Int';

  this.regexList = [
    {
      // line comment
      regex: regexLib.singleLineCComments,
      css: 'comments'
    },
    {
      // block comment
      regex: /\/\*([^\*][\s\S]*?)?\*\//gm,
      css: 'comments'
    },
    {
      // javadoc
      regex: /\/\*(?!\*\/)\*[\s\S]*?\*\//gm,
      css: 'preprocessor'
    },
    {
      regex: regexLib.doubleQuotedString,
      css: 'string'
    },
    {
      regex: regexLib.singleQuotedString,
      css: 'string'
    },
    {
      // numbers
      regex: /\b([\d]+(\.[\d]+)?f?|[\d]+l?|0x[a-f0-9]+)\b/gi,
      css: 'value'
    },
    {
      // annotations
      regex: /\@(Target|Retention|Repeatable|MustBeDocumented|Test|Deprecated)/g,
      css: 'color2'
    },
    { 
      // User-site targets
      regex: /\@(file|property|field|get|set|receiver|param|setparam|delegate):/g,
      css: 'color2'
    },  
    { 
      // @Inject annotation
      regex: /\@(Inject)\b/g,
      css: 'color3'
    },
    {
      regex: new RegExp(this.getKeywords(keywords), 'gm'),
      css: 'keyword'
    }
  ];

  this.forHtmlScript({
    left: /(&lt;|<)%[@!=]?/g,
    right: /%(&gt;|>)/g
  });
};

Brush.prototype = new BrushBase();
Brush.aliases = ['kotlin'];
module.exports = Brush;