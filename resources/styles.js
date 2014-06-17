/*
[{"btnName":"Inline Code","className":"redactor_format_pre","wrap":"code","forceBlock":"0"}]
 */

if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.styles = {
	init: function ()
	{
		try { this.opts.stylesJson = jQuery.parseJSON(this.opts.stylesJson); } catch(e) {} 
		//if(typeof this.opts.stylesJson === 'undefined' || !this.opts.stylesJson.length) return;
		var that = this;
		var dropdown = {};

		jQuery.each(this.opts.stylesJson, function(i, s)
		{
			dropdown['s' + i] = { title: s.btnName, className:s.className, callback: function() { that.setCustomFormat(s); }};
		});

		dropdown['remove'] = { title: 'Remove style', callback: function() { that.resetCustomFormat(); }};
		(this.buttonGet('formatting').length) ? this.buttonAddAfter('formatting','styles', this.opts.curLang.customStyles, false, dropdown) : this.buttonAdd('styles', this.opts.curLang.customStyles, false, dropdown);
	},
	setCustomFormat: function (s)
	{
		if (s.forceBlock != -1 && (s.forceBlock == 1 || (s.wrap && !(jQuery.inArray(s.wrap,['a','em','strong','small','s','cite','q','dfn','abbr','data','time','var','samp','kbd','i','b','u','mark','ruby','rt','rp','bdi','bdo','span','sub','sup','code']) > -1)))) {
			this.selectionWrap(s.wrap); 
			//this.inlineFormat(s.wrap);
			if(s.style) this.blockSetAttr('style',s.style);
			if(s.spanClass) this.blockSetClass(s.spanClass);
		}
		else {
			if(s.wrap) this.inlineFormat(s.wrap);
			if(s.style) this.inlineSetAttr('style', s.style);
			if(s.spanClass) this.inlineSetClass(s.spanClass);
		}
	},
	resetCustomFormat: function()
	{
		var that = this;
		jQuery.each(this.opts.stylesJson, function(i,s) {
			if(s.spanClass) {
				that.inlineRemoveClass(s.spanClass);
				that.blockRemoveClass(s.spanClass);
				that.formatBlocks('p');
			}
		});
		this.inlineSetAttr('style','');
	}
};

