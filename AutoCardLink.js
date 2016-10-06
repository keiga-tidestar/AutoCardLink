// Auto card link v1.0
// by keiga / tidestar.jp

"use strict";

(function()
{
	var text = document.body.innerHTML;
	var regExp = /(《.+?》)|(<a.*?>.*?<\/a>)/g;
	text = text.replace(regExp,
	function()
	{
		if (arguments[2])
		{
			// 2番目にマッチしたら置換を行なわずそのまま返す
			return arguments[2];
		}
		else
		if (arguments[1])
		{
			return ReplaceCardLink(arguments[1]);
		}
	});
	document.body.innerHTML = text;
})()

function ReplaceCardLink(cardText)
{
	var cardInner = cardText.replace(/《(.+?)》/, "$1");
	log(cardInner);
	var cardUrlBody;
	if (cardInner.match(/\//))
	{
		var regExp = /([^\/]+)\/.*/;
		cardUrlBody = cardInner.replace(regExp, "$1");
	}
	else
	{
		var regExp = /(.+)\(\w{2,3}\)/;
		if (cardInner.match(regExp))
		{
			cardInner = cardInner.replace(regExp, "$1");
		}
		cardUrlBody = cardInner;
	}
	cardUrlBody = cardUrlBody.replace(/\"/g, '&quot;');
	cardUrlBody = cardUrlBody.replace(/\s/g, '+');
	var cardUrl = "http://whisper.wisdom-guild.net/card/" + cardUrlBody;
	var replaceText = '<a href="' + cardUrl + '" target="_blank" class="auto-card-link">' + cardText + '</a>';
	return replaceText;
}

function log(str) {
	console.log(str);
}