/*	배너처럼 화면을 이동하게 만들어주는 것.
	사용법
	var store = Ext.create('Ext.data.Store', {
        fields: ['title', 'imgSrc'],
        data: [{
            title: 'Cloud Forest',
            imgSrc: 'https://cdn.crowdpic.net/list-thumb/thumb_l_D623AE308211C3678E61EC0E3FF3C969.jpg'},
        {
            title: 'Cloud Forest 2',
            imgSrc: 'https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg'},
        {
            title: 'Cloud Forest',
            imgSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'}]
    });
	
	{	xtype: 'carousel',
		name	: 'apnd_imge',
		store	: store,
		flex	: 2
	}

*/

Ext.define('Axt.form.field.Carousel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.carousel',
	enlarge: true,
	dbclick: true,
	store: undefined,
	layout: 'border',
	enlarge: true,
	dbclick: true,
	listeners: {
		render: function() {
			window.enlarge = this.enlarge;
			window.dbclick = this.dbclick;
		},
	},
	items: [{
		xtype: 'image',
		alternateClassName: 'carousel',
		baseCls: 'x-carousel',
		buttons: false,
		store: this.store,
		nextButtonText: 'next',
		previousButtonText: 'previous',
		wrappedImage: undefined,
		region	: 'center',
		flex:1,
		listeners: {
			render: function() {
				var me = this,
					panel = this.up('panel')
				window.carouselCont = me;
				window.carousePos = 0;
				me.store = panel.store;
				if(me.store.getAt(0)){
					me.setSrc(me.store.getAt(0).get('imgSrc'));
				}
				panel.down('[name=keyEventField]').focus();
			},
			afterrender:function(){
				var panel = this.up('panel');
				this.setSize(panel.getWidth(),panel.getHeight());

			},
			el: {
				dblclick: function(event, target) {
					var elId = target.id;
					var me = Ext.getCmp(elId).up('panel');
					if (dbclick) {
						var po = (this.lastBox.width / 2);
						var max = window.carouselCont.store.getCount();
						$('.zoomCarousel').remove();
						if (event.getX() > this.lastBox.width / 2) {
							me.next(max);
						} else {
							me.back();
						}
					}
					me.down('[name=keyEventField]').focus();
				},
				click: function(event) {
					if (window.enlarge) {
						var a = $('.x-carousel').closest('div');
						var x, y;
						x = event.getX() - 13;
						y = event.getY() - 30;
						cx = event.getX() * (-1 * (1500 / this.lastBox.width)) + 160;
						cy = event.getY() * (-1 * (1500 / this.lastBox.height)) + 160;
						img = document.getElementsByClassName('x-carousel');
						if (x > this.lastBox.width - 250) {
							x = event.getX() - 263;
						}
						if (y > this.lastBox.height - 250) {
							y = event.getY() - 280;
						}
						$('.zoomCarousel').remove();
						imgTag = '<div class="zoomCarousel" style="z-index:999999;position: absolute;width:250;height:250;top:' + y + ';left:' + x +
							';background-image:url(\'' + window.carouselCont.store.getAt(window.carousePos).get('imgSrc') + '\');' +
							'background-size:1500px 1500px; background-position:' + cx + 'px ' + cy + 'px;">'
						a.append(imgTag);
					}
					var elId = this.id;
					var panel = Ext.getCmp(elId).up('panel');
					panel.down('[name=keyEventField]').focus();
				},
			}
		},
	}, {
		xtype: 'textfield',
		name: 'keyEventField',
		enableKeyEvents: true,
		height: 1,
		region	: 'south',
		listeners: {
			keydown: function(field, e) {
				var me = this.up('panel');
				if (e.getKey() === Ext.EventObject.LEFT) {
					me.back();
				} else if (e.getKey() === Ext.EventObject.RIGHT) {
					var max = window.carouselCont.store.getCount();
					me.next(max);
				}
			}
		}
	}
	],

	next: function(max) {
		this.down('[name=keyEventField]').focus();
		if (window.carousePos < max - 1) {
			window.carousePos++;
			window.carouselCont.setSrc(window.carouselCont.store.getAt(window.carousePos).get('imgSrc'));
		} else {
			return;
		}
	},
	back: function() {
		this.down('[name=keyEventField]').focus();
		if (window.carousePos != 0) {
			window.carousePos--;
			window.carouselCont.setSrc(window.carouselCont.store.getAt(window.carousePos).get('imgSrc'));
		} else {
			return;
		}
	}
});



/*Ext.define('Axt.form.field.Carousel', {
	extend: 'Ext.Img',
	alias: 'widget.carousel',
	alternateClassName: 'carousel',
	baseCls: 'x-carousel',
	buttons: false,
	store: undefined,
	nextButtonText: 'next',
	previousButtonText: 'previous',
	wrappedImage: undefined,
	enlarge: true,
	dbclick: true,
	listeners: {
		render: function() {
			var me = this;
			window.carouselCont = me;
			window.carousePos = 0;
			window.enlarge = me.enlarge; //dom에서는 extjs 의 comp를 찾을 수 없어 어쩔 수 없이 저장.
			window.dbclick = me.dbclick; //dom에서는 extjs 의 comp를 찾을 수 없어 어쩔 수 없이 저장.
		},
		el: {
			dblclick: function(event, target) {
				var elId = target.id;
				var me = Ext.getCmp(elId);
				if (dbclick) {
					var po = (this.lastBox.width / 2);
					var max = window.carouselCont.store.getCount();
					$('.zoomCarousel').remove();
					if (event.getX() > this.lastBox.width / 2) {
						me.next(max);
					} else {
						me.back();
					}
				}
			},
			click: function(event) {
				if (window.enlarge) {
					var a = $('.x-carousel').closest('div');
					var x, y;
					x = event.getX() - 13;
					y = event.getY() - 30;
					cx = event.getX() * (-1 * (1500 / this.lastBox.width)) + 160;
					cy = event.getY() * (-1 * (1500 / this.lastBox.height)) + 160;
					img = document.getElementsByClassName('x-carousel');
					if (x > this.lastBox.width - 250) {
						x = event.getX() - 263;
					}
					if (y > this.lastBox.height - 250) {
						y = event.getY() - 280;
					}
					console.log('x : '  + event.getX() + ' y : ' + event.getY());
					$('.zoomCarousel').remove();
					imgTag = '<div class="zoomCarousel" style="z-index:999999;position: absolute;width:250;height:250;top:' + y+ ';left:'  + x +
						';background-image:url(\'' + window.carouselCont.store.getAt(window.carousePos).get('imgSrc') + '\');' +
						'background-size:1500px 1500px; background-position:' + cx + 'px ' + cy + 'px;">'
					a.append(imgTag); // 이미지로 바꾸고 클릭시 확대된 이미지가 마우스 위치에 생성되게 해야함 z-index 도 높여야함.
				}
			},
		}
	},
	initComponent: function() {
		this.initView();
		return this.callParent(arguments);
	},
	initView: function() {
		var me = this;
		if(me.store.getCount() > 0) {
			this.src = me.store.getAt(0).get('imgSrc');
		} else {
			this.src = 'unknown'
		}
	},
	next: function(max) {
		if(window.carousePos < max - 1) {
			window.carousePos++;
			window.carouselCont.setSrc(window.carouselCont.store.getAt(window.carousePos).get('imgSrc'));
		} else {
			return;
		}
	},
	back: function() {
		if(window.carousePos != 0) {
			window.carousePos--;
			window.carouselCont.setSrc(window.carouselCont.store.getAt(window.carousePos).get('imgSrc'));
		} else {
			return;
		}
	}
});*/

//Ext.ux.Carousel code End
