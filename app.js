var express = require('express');
var ejs = require('ejs');
var path = require('path');
var utility = require('utility');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var app = express();

/*app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');*/
// app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
    $('.cell').each(function(idx,element){
    	var $element = $(element);
    	var $content = $element.find('#topic_list .topic_title');
    	var $useravatar = $element.find('.user_avatar');
    	var $author = $useravatar.find('img');
    	items.push({
          	title: $content.attr('title'),
          	href: $content.attr('href'),
          	author:$author.attr('title')
        });
    })
      res.send(items);
    });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/*res.render('index',{
		title:'抽奖小游戏'
	})*/
	/*var q = req.query.q;
	var md5value = utility.md5(q);
	res.send(md5value);*/