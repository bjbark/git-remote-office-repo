Ext.define('module.custom.hantop.prod.labelprint1.view.labelPrint1Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-labelprint1-search',
	height	: 1085,

	listeners:{
		render : function(){
			var me = this;
			setTimeout(function() {
				me.select({
					callback:function(records, operation, success) {
					if (success) {
					} else {}
					}
				}, Ext.merge( {stor_id : _global.stor_id, invc_numb : null}) );
			}, 100);
		},
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},

	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic()
		];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'south',
				width	: '100%',
				height	: 400,
				margin	: '350 40 0 40',
				items	: [
					{	name		: 'brcd'	,
						fieldCls	: 'textTemp field-c-80',
						xtype		: 'searchfield'	,
						flex		: 1,
						value		: null,
						margin		: '6 50 0 100',
						height		: 200,
						emptyText	: '바코드를 읽어주세요.',
						style		: 'text-align:center',
						enableKeyEvents : true			,
						listeners:{
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == 9) {
									var value = self.getValue().replace(/\//gi,'-');
									var searchButton = self.up('form').down('[action=selectAction]');
									searchButton.fireEvent('click', searchButton); //조회버튼클릭
									self.setValue('');
								}
							}
						}
					},{	xtype	: 'textfield', name: 'search_val', hidden : true
					},{	xtype	: 'button'  ,action : Const.SELECT.action, hidden : true
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:4.5em;">닫기</span>',
						cls			: 'button-right btn btn-danger',
						width		: 165,
						height		: 180,
						margin		: '12 0 0 0',
						style		: 'text-decoration:none;',
						handler:function(){
							var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
							sideButton.click();
							me.up('panel').close();
						}
					}
				]
			};
		return line;
	},

});