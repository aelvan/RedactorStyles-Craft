if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.styles = function () {
	return {
		init: function () {
			try {
				this.opts.stylesJson = jQuery.parseJSON(this.opts.stylesJson);
			} catch (e) {
			}
			if(typeof this.opts.stylesJson === 'undefined' || !this.opts.stylesJson.length) return;
			
			var that = this;
			var dropdown = {};

			jQuery.each(this.opts.stylesJson, function (i, s) {
				dropdown[s.className] = {
					title: s.btnName, func: function () {
						that.styles.setCustomFormat(s);
					}
				};
			});

			dropdown['remove-styles'] = {
				title: 'Remove style', func: function () {
					that.styles.resetCustomFormat();
				}
			};
			
			var button = this.button.add('styles', 'Styles');
			this.button.setAwesome('styles', 'fa-list-alt');
			this.button.addDropdown(button, dropdown);
		},
		
		setCustomFormat: function (s) {
			
			if ((s.forceBlock == 1 || (s.wrap && !(jQuery.inArray(s.wrap, ['a', 'em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'data', 'time', 'var', 'samp', 'kbd', 'i', 'b', 'u', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo', 'span', 'sub', 'sup', 'code']) > -1)))) {
				// add to block level
				if (s.wrap) {
					this.block.format(s.wrap);
				}
				
				if (s.spanClass) this.block.setClass(s.spanClass);
				if (s.style) this.block.setAttr('style', s.style);
			}
			else {
				// add inline wrapper
				this.inline.format(s.wrap ? s.wrap : 'span');
				if (s.spanClass) this.inline.toggleClass(s.spanClass);
				if (s.style) this.inline.setStyleRule(s.style);
			}
			
		},
		
		resetCustomFormat: function () {
			var that = this;
			jQuery.each(this.opts.stylesJson, function (i, s) {
				that.inline.removeFormat();
				that.block.format('p');
				that.block.removeClass(s.spanClass);
				that.block.removeAttr('style');
			});
		}
	};
};
